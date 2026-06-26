//this is the modal for the gym here we will be storing hardcoded value for now 
import mongoose from "mongoose";

const GymSchema = new mongoose.Schema({
    gymName:{
      type:String,
      required:true  
    },
    gymAddress:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true,
        unique:true,
        match:/^[0-9]{10}$/
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        
    },
    ownerEmail:{
        type:String,
        required:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    verifyOtp:{
        type:String,
        default:null
    },

    verifyOtpExpireAt:{
        type:Date
    },
    refreshToken:{
   type:String,
   default:null,
   select:false
}
})

const GymDetails = mongoose.model(
    "GymDetails",
    GymSchema
)

export default GymDetails