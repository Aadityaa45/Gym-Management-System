import mongoose from "mongoose";

const member_statuses = ["active", "inactive", "suspended"];

const membersSchema = new mongoose.Schema({
    
    fullName : { type:String, required:true, trim: true },
    email : { type:String, required:true, lowercase: true, trim: true },
    phone : { type:String, required:true },
    password : {type: String},
    joiningdate : { type:Date },
    registrationdate : { type:Date, default:Date.now },
    address : { type:String },
    dob : { type:Date, required:true },
    status : { type:String, enum:member_statuses, default:member_statuses[0]},
    lastLoginAt : Date,
    gym : { type:mongoose.Types.ObjectId, ref:"GymDetails"},
    
    physique : {
        heightInCm : { type:Number },
        weightInKg : { type:Number },
        targetWeightInKg : { type:Number },
    },
    
    fee : {
        total : { type:Number, default:0 },
        paid : { type:Number, default:0 },
        remaining : { type:Number, default:0 },
        discount : { type:Number, default:0 }
    },

    membership : { 
        plan : { type:mongoose.Types.ObjectId, ref: "membershipPlan" },
        planStartDate : { type:Date },
        planEndDate : { type:Date }
    },

    diet : { 
        plan : { type:mongoose.Types.ObjectId, ref: "dietplans" },
        planStartDate : { type:Date },
        planEndDate : { type:Date }
    },

    workout : { 
        plan : { type:mongoose.Types.ObjectId, ref: "workoutplans" },
        planStartDate : { type:Date },
        planEndDate : { type:Date }
    },

    // registeredBy : { type:mongoose.Types.ObjectId, ref: "users" },
    registeredBy : {type: String, required:true}

}, { timestamps:true });

membersSchema.index({ gym: 1, email: 1 }, { unique: true });

const membersModel = mongoose.model("member", membersSchema);

export default membersModel
