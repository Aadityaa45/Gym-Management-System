import mongoose from "mongoose";
import { ExpenseModel } from "../../models/expanse.modals.js";
import { AppError } from "../../utils/errorAssertion.utils.js";
import { appAssert } from "../../utils/errorAssertion.utils.js";
import escapeRegex from "../../utils/escapeRegex.utils.js";

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


// ============================================================
// EXPENSE DASHBOARD CONTROLLER
// ============================================================

export const getExpenseDashboard = async (req, res) => {

    try {

        // ========================================================
        // 1. GYM AUTHENTICATION
        // ========================================================

        const gymId = req.gym?.gymId;

        appAssert(
            gymId,
            "Gym information is required"
        );


        // ========================================================
        // 2. QUERY PARAMETERS
        // ========================================================

        const {
            search = "",
            category = "",
            status = "",
            paymentMethod = "",
            dateFrom = "",
            dateTo = "",
            minAmount = "",
            maxAmount = "",
            recurring = "",

            page = 1,
            limit = 10,

            period = "6months"

        } = req.query;


        // ========================================================
        // 3. PAGINATION VALIDATION
        // ========================================================

        const currentPage =
            Math.max(
                Number.parseInt(page, 10) || 1,
                1
            );


        const pageLimit =
            Math.min(
                Math.max(
                    Number.parseInt(limit, 10) || 10,
                    1
                ),
                100
            );


        const skip =
            (currentPage - 1) * pageLimit;


        // ========================================================
        // 4. BASE FILTER
        // ========================================================

        const matchStage = {

            gym: new mongoose.Types.ObjectId(gymId)

        };


        // ========================================================
        // 5. SEARCH
        // ========================================================

        /*
            Search is performed on:

            - expenseId
            - title
            - paidTo
            - notes

            Regex is suitable for the current application scale.

            If the application reaches very large scale,
            MongoDB Atlas Search should replace this.
        */

        if (search.trim()) {

            const searchRegex =
                new RegExp(
                    escapeRegex(search.trim()),
                    "i"
                );


            matchStage.$or = [

                {
                    expenseId:
                        searchRegex
                },

                {
                    title:
                        searchRegex
                },

                {
                    paidTo:
                        searchRegex
                },

                {
                    notes:
                        searchRegex
                }

            ];

        }


        // ========================================================
        // 6. CATEGORY FILTER
        // ========================================================

        if (category.trim()) {

            matchStage.category =
                category.trim().toLowerCase();

        }


        // ========================================================
        // 7. STATUS FILTER
        // ========================================================

        if (status.trim()) {

            matchStage.status =
                status.trim().toLowerCase();

        }


        // ========================================================
        // 8. PAYMENT METHOD FILTER
        // ========================================================

        if (paymentMethod.trim()) {

            matchStage.paymentMethod =
                paymentMethod.trim().toLowerCase();

        }


        // ========================================================
        // 9. RECURRING FILTER
        // ========================================================

        if (recurring !== "") {

            if (
                recurring === "true" ||
                recurring === "false"
            ) {

                matchStage.isRecurring =
                    recurring === "true";

            }

        }


        // ========================================================
        // 10. DATE FILTER
        // ========================================================

        if (dateFrom) {

            const startDate =
                new Date(dateFrom);


            appAssert(
                !Number.isNaN(
                    startDate.getTime()
                ),
                "Invalid start date"
            );


            matchStage.expenseDate = {

                ...(matchStage.expenseDate || {}),

                $gte: startDate

            };

        }


        if (dateTo) {

            const endDate =
                new Date(dateTo);


            appAssert(
                !Number.isNaN(
                    endDate.getTime()
                ),
                "Invalid end date"
            );


            // Include complete selected day

            endDate.setHours(
                23,
                59,
                59,
                999
            );


            matchStage.expenseDate = {

                ...(matchStage.expenseDate || {}),

                $lte: endDate

            };

        }


        // ========================================================
        // 11. AMOUNT FILTER
        // ========================================================

        if (minAmount !== "") {

            const minimum =
                Number(minAmount);


            appAssert(
                Number.isFinite(minimum) &&
                minimum >= 0,
                "Invalid minimum amount"
            );


            matchStage.amount = {

                ...(matchStage.amount || {}),

                $gte: minimum

            };

        }


        if (maxAmount !== "") {

            const maximum =
                Number(maxAmount);


            appAssert(
                Number.isFinite(maximum) &&
                maximum >= 0,
                "Invalid maximum amount"
            );


            matchStage.amount = {

                ...(matchStage.amount || {}),

                $lte: maximum

            };

        }


        // ========================================================
        // 12. DASHBOARD DATE RANGE
        // ========================================================

        const now =
            new Date();


        const sixMonthsAgo =
            new Date(
                now.getFullYear(),
                now.getMonth() - 5,
                1
            );


        const dashboardDateFilter = {

            gym:
                new mongoose.Types.ObjectId(gymId),

            expenseDate: {

                $gte:
                    sixMonthsAgo,

                $lte:
                    now

            }

        };


        // ========================================================
        // 13. CURRENT MONTH RANGE
        // ========================================================

        const currentMonthStart =
            new Date(
                now.getFullYear(),
                now.getMonth(),
                1
            );


        const currentMonthEnd =
            new Date(
                now.getFullYear(),
                now.getMonth() + 1,
                0,
                23,
                59,
                59,
                999
            );


        const currentMonthFilter = {

            gym:
                new mongoose.Types.ObjectId(gymId),

            expenseDate: {

                $gte:
                    currentMonthStart,

                $lte:
                    currentMonthEnd

            }

        };


        // ========================================================
        // 14. AGGREGATION
        // ========================================================

        const result =
            await ExpenseModel.aggregate([

                // ==================================================
                // MAIN FILTER
                // ==================================================

                {
                    $match:
                        matchStage
                },


                // ==================================================
                // FACET
                // ==================================================

                {
                    $facet: {

                        // ==========================================
                        // EXPENSE RECORDS
                        // ==========================================

                        records: [

                            {
                                $sort: {

                                    expenseDate:
                                        -1,

                                    _id:
                                        -1

                                }

                            },

                            {
                                $skip:
                                    skip

                            },

                            {
                                $limit:
                                    pageLimit

                            }

                        ],


                        // ==========================================
                        // TOTAL RECORD COUNT
                        // ==========================================

                        totalRecords: [

                            {
                                $count:
                                    "count"

                            }

                        ]

                    }

                }

            ]);


        const filteredData =
            result[0] || {};


        const records =
            filteredData.records || [];


        const totalRecords =
            filteredData.totalRecords?.[0]?.count || 0;


        // ========================================================
        // 15. KPI DATA
        // ========================================================

        const [

            totalExpenseResult,

            paidExpenseResult,

            pendingExpenseResult,

            recurringExpenseResult

        ] = await Promise.all([


            // ====================================================
            // TOTAL EXPENSES
            // ====================================================

            ExpenseModel.aggregate([

                {
                    $match:
                        currentMonthFilter
                },

                {
                    $group: {

                        _id: null,

                        total:
                            {
                                $sum: "$amount"
                            }

                    }

                }

            ]),


            // ====================================================
            // PAID EXPENSES
            // ====================================================

            ExpenseModel.aggregate([

                {
                    $match: {

                        ...currentMonthFilter,

                        status:
                            "paid"

                    }

                },

                {
                    $group: {

                        _id: null,

                        total: {
                            $sum:
                                "$amount"
                        },

                        count: {
                            $sum: 1
                        }

                    }

                }

            ]),


            // ====================================================
            // PENDING EXPENSES
            // ====================================================

            ExpenseModel.aggregate([

                {
                    $match: {

                        ...currentMonthFilter,

                        status:
                            "pending"

                    }

                },

                {
                    $group: {

                        _id: null,

                        total: {
                            $sum:
                                "$amount"
                        },

                        count: {
                            $sum: 1
                        }

                    }

                }

            ]),


            // ====================================================
            // RECURRING EXPENSES
            // ====================================================

            ExpenseModel.aggregate([

                {
                    $match: {

                        gym:
                            new mongoose.Types.ObjectId(
                                gymId
                            ),

                        isRecurring:
                            true

                    }

                },

                {
                    $group: {

                        _id: null,

                        total: {
                            $sum:
                                "$amount"
                        },

                        count: {
                            $sum: 1
                        }

                    }

                }

            ])

        ]);


        // ========================================================
        // 16. EXPENSE OVERVIEW
        // ========================================================

        const monthlyOverview =
            await ExpenseModel.aggregate([

                {
                    $match:
                        dashboardDateFilter
                },

                {
                    $group: {

                        _id: {

                            year:
                                {
                                    $year:
                                        "$expenseDate"
                                },

                            month:
                                {
                                    $month:
                                        "$expenseDate"
                                }

                        },

                        total: {

                            $sum:
                                "$amount"

                        },

                        count: {

                            $sum:
                                1

                        }

                    }

                },

                {

                    $sort: {

                        "_id.year":
                            1,

                        "_id.month":
                            1

                    }

                }

            ]);


        // ========================================================
        // 17. CATEGORY BREAKDOWN
        // ========================================================

        const categoryBreakdown =
            await ExpenseModel.aggregate([

                {
                    $match:
                        currentMonthFilter
                },

                {
                    $group: {

                        _id:
                            "$category",

                        total: {

                            $sum:
                                "$amount"

                        },

                        count: {

                            $sum:
                                1

                        }

                    }

                },

                {

                    $sort: {

                        total:
                            -1

                    }

                }

            ]);


        // ========================================================
        // 18. FORMAT MONTHLY DATA
        // ========================================================

        const formattedMonthlyOverview =
            monthlyOverview.map(
                (item) => ({

                    year:
                        item._id.year,

                    month:
                        item._id.month,

                    total:
                        item.total,

                    count:
                        item.count

                })
            );


        // ========================================================
        // 19. FORMAT CATEGORY DATA
        // ========================================================

        const formattedCategories =
            categoryBreakdown.map(
                (item) => ({

                    category:
                        item._id,

                    total:
                        item.total,

                    count:
                        item.count

                })
            );


        // ========================================================
        // 20. PAGINATION
        // ========================================================

        const totalPages =
            Math.ceil(
                totalRecords /
                pageLimit
            );


        // ========================================================
        // 21. RESPONSE
        // ========================================================

        return res.status(200).json({

            success:
                true,


            dashboard: {

                // ================================================
                // KPI
                // ================================================

                kpis: {

                    totalExpenses: {

                        amount:
                            totalExpenseResult[0]?.total ||
                            0,

                        label:
                            "This Month"

                    },


                    paidExpenses: {

                        amount:
                            paidExpenseResult[0]?.total ||
                            0,

                        transactions:
                            paidExpenseResult[0]?.count ||
                            0

                    },


                    pendingExpenses: {

                        amount:
                            pendingExpenseResult[0]?.total ||
                            0,

                        transactions:
                            pendingExpenseResult[0]?.count ||
                            0

                    },


                    recurringExpenses: {

                        amount:
                            recurringExpenseResult[0]?.total ||
                            0,

                        transactions:
                            recurringExpenseResult[0]?.count ||
                            0,

                        label:
                            "Expected Monthly"

                    }

                },


                // ================================================
                // GRAPH
                // ================================================

                expenseOverview:
                    formattedMonthlyOverview,


                // ================================================
                // CATEGORY
                // ================================================

                spendingCategories:
                    formattedCategories

            },


            // ====================================================
            // TABLE
            // ====================================================

            expenses: {

                records,

                pagination: {

                    page:
                        currentPage,

                    limit:
                        pageLimit,

                    totalRecords,

                    totalPages,

                    hasNextPage:
                        currentPage <
                        totalPages,

                    hasPreviousPage:
                        currentPage >
                        1

                }

            }

        });

    }

    catch (error) {

        console.error(
            "EXPENSE DASHBOARD ERROR:",
            error
        );


        if (
            error instanceof AppError
        ) {

            return res.status(
                error.statusCode || 400
            ).json({

                success:
                    false,

                message:
                    error.message

            });

        }


        return res.status(500).json({

            success:
                false,

            message:
                "Unable to fetch expense dashboard"

        });

    }

};