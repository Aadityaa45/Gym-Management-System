import mongoose from "mongoose";

const otp_purposes =  ["login","forgot_password","registration"];

const otpSchema = new mongoose.Schema({

    email: {type: String, lowercase: true, trim: true, required:true},
    gym: {type: mongoose.Types.ObjectId, ref: "GymDetails", required: true},
    otp: {type: String, required: true},
    purpose: {type: String, enum: otp_purposes, required: true},
    expiresAt: {type: Date, required: true},
    verified: {type: Boolean, default: false},
    attempts: {type: Number, default:0},
    
    //this temporary field will be used to store the data of the register form as with the otp this data will also will be deleted if the otp is not verified within the time limit
    registrationData: {

    fullname: {
        type: String,
        trim: true
    },

    phone: {
        type: String,
        trim: true
    },

    email:{
        type: String,
        lowercase: true,
        trim: true
    },

    address: {
        type: String,
        trim: true
    },

    dob: {
        type: Date
    },
    joiningDate:{
    type:Date
},
fee : {
        total : { type:Number, default:0 },
        paid : { type:Number, default:0 },
        remaining : { type:Number, default:0 },
        discount : { type:Number, default:0 }
    },
    membership: {

        plan: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "membershipplans"
        },

        // additionalDiscount: {
        //     type: Number,
        //     default: 0
        // },

        // totalFee: {
        //     type: Number,
        //     default: 0
        // },

        // amountPaid: {
        //     type: Number,
        //     default: 0
        // },

        // paymentLeft: {
        //     type: Number,
        //     default: 0
        // },

        paymentMode: {
            type: String,
            enum: ["Cash", "UPI", "Card"]
        }

    },

    registeredBy: {
        type: String,
    }
}

}, { timestamps: true });

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
otpSchema.index({ gym: 1, email: 1, purpose: 1 },{ unique: true });

const otpModel = mongoose.model("otps", otpSchema);

export default otpModel