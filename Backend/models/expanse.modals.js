import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
    {
        gym: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Gym",
            required: true,
            index: true,
        },

        title: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150,
        },

        category: {
            type: String,
            required: true,
            enum: [
                "utilities",
                "maintenance",
                "employee",
                "rent",
                "equipment",
                "supplies",
                "marketing",
                "other",
            ],
            index: true,
        },

        amount: {
            type: Number,
            required: true,
            min: 0.01,
        },

        expenseDate: {
            type: Date,
            required: true,
            index: true,
        },

        paidTo: {
            type: String,
            required: true,
            trim: true,
            maxlength: 150,
        },

        paymentMethod: {
            type: String,
            required: true,
            enum: [
                "cash",
                "upi",
                "card",
                "bank_transfer",
                "cheque",
            ],
        },

        isRecurring: {
            type: Boolean,
            default: false,
        },

        notes: {
            type: String,
            trim: true,
            maxlength: 1000,
            default: "",
        },

        // Audit fields
        recordedBy: {
            type: String,
            required: true,
        },

        status: {
            type: String,
            enum: ["active", "cancelled"],
            default: "active",
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

/*
 * Useful for expense listing/filtering.
 */
expenseSchema.index({
    gym: 1,
    expenseDate: -1,
});

expenseSchema.index({
    gym: 1,
    category: 1,
    expenseDate: -1,
});

export const ExpenseModel = mongoose.model(
    "Expense",
    expenseSchema
);