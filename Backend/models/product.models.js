import mongoose from "mongoose";

const statuses = ["available", "coming soon"];

const productSchema = new mongoose.Schema({

    gym : { type: mongoose.Types.ObjectId, ref:"GymDetails", required:true },
    name : { type: String, required:true },
    description : { type: String },
    status: { type: String, enum: statuses, default: true },
    quantity: { type: Number, required: true },
    price: { type: Number, default:0 },
    wholseSalePrice:{type:Number,required:true},
    category : { type: String, required:true },
    image : { type: String },
    priorityOrder : {type:Number, default:0 }

}, { timestamps:true });

const productModel = model("product", productSchema);

export default productModel