// import mongoose from "mongoose";

// const invoiceCategories = ["membership", "product", "registration", "other"];
// const invoiceStatuses = ["pending", "paid", "partially_paid", "cancelled"];

// const billAndInvoiceSchema = new mongoose.Schema({
    
//     billNumber : {type: String, required: true},
//     gym : {type: mongoose.Types.ObjectId, ref: "GymDetails", required: true},
//     category : {type: String, enum: invoiceCategories, required: true},
//     member : {type: mongoose.Types.ObjectId, ref: "members", required: true},
//     membership : {type: mongoose.Types.ObjectId, ref: "membershipPlans"},
//     items:[
// {
//     product:ObjectId,
//     quantity:Number,
//     unitPrice:Number,
//     total:Number
// }
// ],
//     quantity : {type: Number, default: 1},
//     amount : {type: Number, required: true},
//     discountAmount : {type: Number, default: 0},
//     taxAmount : {type: Number, default: 0},
//     finalAmount : {type: Number, required: true},
//     status : {type: String, enum: invoiceStatuses, default: "pending"},
//     paymentMethod : {type: String, enum: ["cash","upi","card","bank_transfer","other"]},
//     transactionReference : String,
//     invoiceDate : {type: Date, default: Date.now},
//     dueDate : Date,
//     notes : String,
//     processedBy : {type:String, required: true},
//     paymentReceived: {
//     type: Number,
//     default: 0,
//     required: true
// },

// remainingAmount: {
//     type: Number,
//     default: 0
// }

// }, { timestamps: true });

// billAndInvoiceSchema.index({ gym: 1, billNumber: 1 }, { unique: true });

// const billAndInvoiceModel = mongoose.model("billandinvoices", billAndInvoiceSchema);

// export default billAndInvoiceModel
import mongoose from "mongoose";

const invoiceCategories = [
  "membership",
  "product",
  "registration",
  "other",
];

const invoiceStatuses = [
  "pending",
  "paid",
  "partially_paid",
  "cancelled",
];

const billAndInvoiceSchema = new mongoose.Schema(
  {
    billNumber: {
      type: String,
      required: true,
    },

    gym: {
      type: mongoose.Types.ObjectId,
      ref: "GymDetails",
      required: true,
    },

    category: {
      type: String,
      enum: invoiceCategories,
      required: true,
    },

    member: {
      type: mongoose.Types.ObjectId,
      ref: "members",
      required: true,
    },

    // Membership Invoice
    membership: {
      type: mongoose.Types.ObjectId,
      ref: "membershipPlans",
      default: null,
    },

    // Product Invoice (Cart)
    items: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "product",
          required: true,
        },

        productName: {
          type: String,
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
        },

        unitPrice: {
          type: Number,
          required: true,
        },

        total: {
          type: Number,
          required: true,
        },
      },
    ],

    amount: {
      type: Number,
      required: true,
    },

    discountAmount: {
      type: Number,
      default: 0,
    },

    taxAmount: {
      type: Number,
      default: 0,
    },

    finalAmount: {
      type: Number,
      required: true,
    },

    paymentReceived: {
      type: Number,
      required: true,
      default: 0,
    },

    remainingAmount: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: invoiceStatuses,
      default: "pending",
    },

    paymentMethod: {
      type: String,
      enum: [
        "cash",
        "upi",
        "card",
        "bank_transfer",
        "other",
      ],
    },

    transactionReference: String,

    invoiceDate: {
      type: Date,
      default: Date.now,
    },

    dueDate: Date,

    notes: String,

    processedBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

billAndInvoiceSchema.index(
  {
    gym: 1,
    billNumber: 1,
  },
  {
    unique: true,
  }
);

const billAndInvoiceModel = mongoose.model(
  "billandinvoices",
  billAndInvoiceSchema
);

export default billAndInvoiceModel;