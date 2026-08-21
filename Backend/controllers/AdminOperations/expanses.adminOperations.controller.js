import mongoose from "mongoose";
import { ExpenseModel } from "../../models/expanse.modals.js";
import { AppError } from "../../utils/errorAssertion.utils.js";
import { appAssert } from "../../utils/errorAssertion.utils.js";

// ==========================================================
// CREATE EXPENSE
// ==========================================================

export const createExpense = async (req, res) => {

    try {

        // ==================================================
        // 1. GYM AUTHENTICATION
        // ==================================================

        const gymId = req.gym?.gymId;

        appAssert(
            gymId,
            "Gym information is required"
        );


        // ==================================================
        // 3. REQUEST DATA
        // ==================================================

        const {
            title,
            category,
            amount,
            expenseDate,
            paidTo,
            paymentMethod,
            isRecurring = false,
            notes = "",
            recordedBy="Admin",
        } = req.body;


        // ==================================================
        // 4. REQUIRED FIELD VALIDATION
        // ==================================================

        appAssert(
            title?.trim(),
            "Expense title is required"
        );

        appAssert(
            category,
            "Expense category is required"
        );

        appAssert(
            amount !== undefined &&
            amount !== null &&
            amount !== "",
            "Expense amount is required"
        );

        appAssert(
            expenseDate,
            "Expense date is required"
        );

        appAssert(
            paidTo?.trim(),
            "Paid to / vendor is required"
        );

        appAssert(
            paymentMethod,
            "Payment method is required"
        );


        // ==================================================
        // 5. VALIDATE MONGOOSE OBJECT ID
        // ==================================================

        appAssert(
            mongoose.Types.ObjectId.isValid(gymId),
            "Invalid gym ID"
        );



        // ==================================================
        // 6. NORMALIZE + VALIDATE AMOUNT
        // ==================================================

        const expenseAmount = Number(amount);

        appAssert(
            Number.isFinite(expenseAmount),
            "Invalid expense amount"
        );

        appAssert(
            expenseAmount > 0,
            "Expense amount must be greater than zero"
        );


        // ==================================================
        // 7. CATEGORY VALIDATION
        // ==================================================

        const allowedCategories = [
            "utilities",
            "maintenance",
            "employee",
            "rent",
            "equipment",
            "supplies",
            "marketing",
            "other",
        ];

        appAssert(
            allowedCategories.includes(category),
            "Invalid expense category"
        );


        // ==================================================
        // 8. PAYMENT METHOD VALIDATION
        // ==================================================

        const allowedPaymentMethods = [
            "cash",
            "upi",
            "card",
            "bank_transfer",
            "cheque",
        ];

        appAssert(
            allowedPaymentMethods.includes(paymentMethod),
            "Invalid payment method"
        );


        // ==================================================
        // 9. DATE VALIDATION
        // ==================================================

        const parsedExpenseDate =
            new Date(expenseDate);

        appAssert(
            !Number.isNaN(
                parsedExpenseDate.getTime()
            ),
            "Invalid expense date"
        );


        // ==================================================
        // 10. RECURRING VALIDATION
        // ==================================================

        const recurring =
            Boolean(isRecurring);


        // ==================================================
        // 11. CREATE EXPENSE
        // ==================================================

        const expense =
            await ExpenseModel.create({

                gym: gymId,

                title:
                    title.trim(),

                category,

                amount:
                    expenseAmount,

                expenseDate:
                    parsedExpenseDate,

                paidTo:
                    paidTo.trim(),

                paymentMethod,

                isRecurring:
                    recurring,

                notes:
                    notes?.trim() || "",

                recordedBy

            });


        // ==================================================
        // 12. RESPONSE
        // ==================================================

        return res.status(201).json({

            success: true,

            message:
                "Expense recorded successfully",

            expense: {

                _id:
                    expense._id,

                title:
                    expense.title,

                category:
                    expense.category,

                amount:
                    expense.amount,

                expenseDate:
                    expense.expenseDate,

                paidTo:
                    expense.paidTo,

                paymentMethod:
                    expense.paymentMethod,

                isRecurring:
                    expense.isRecurring,

                notes:
                    expense.notes,

                status:
                    expense.status,

                recordedBy:
                    expense.recordedBy,

                createdAt:
                    expense.createdAt,

            },

        });

    }

    catch (error) {

        console.error(
            "CREATE EXPENSE ERROR:",
            error
        );


        // ==================================================
        // KNOWN APPLICATION ERROR
        // ==================================================

        if (
            error instanceof AppError
        ) {

            return res.status(
                error.statusCode || 400
            ).json({

                success: false,

                message:
                    error.message,

            });

        }


        // ==================================================
        // MONGOOSE VALIDATION ERROR
        // ==================================================

        if (
            error instanceof mongoose.Error.ValidationError
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Invalid expense data",

            });

        }


        // ==================================================
        // UNKNOWN ERROR
        // ==================================================

        return res.status(500).json({

            success: false,

            message:
                "Unable to record expense",

        });

    }

};