import mongoose from "mongoose";

const membershipPlanSchema = new mongoose.Schema({

    name : { type:String, required:true },
    features : { type:[String] },
    description : { type:String },
    gym : { type:mongoose.Types.ObjectId, ref:"GymDetails", required:true },
    active: { type: Boolean, default: true },
    durationInDays: { type: Number, required: true },
    price: { type: Number, required: true },
    priorityOrder : {type:Number, default:0 }

}, { timestamps:true });

const membershipPlanModel = model("membershipPlan", membershipPlanSchema);

export default membershipPlanModel