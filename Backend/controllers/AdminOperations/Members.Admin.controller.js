import MembersModel from "../../models/Members.model.js";
import express from "express"
import { appAssert } from "../../utils/errorAssertion.utils.js";
import { AppError } from "../../utils/errorAssertion.utils.js";
import GymDetails from "../../models/gym.modals.js";

//this controllers will be having all the operations related to members including resgistrations to filterations 

export const registerMember = async (req,res)=>{
    //The steps we will follow
    //step1: first we will get the gym id from our middelware
    //step2: then we will check weather the gym exist or not
    //step 3: get all the data from the frontend
    //step4 : will validate each and every field correctly by considering all the edge cases
    //step5 : we will generate a otp in real time and send it to user email
    //step6 : once the otp is validated then only we will save the data into our database and send the response to frontend
    //step 7: we will generate the invoice/bill
    //step8 : we will also send the email to user with his/her credentials and other details such as invoice/bill 

    // fullName : { type:String, required:true, trim: true },
    //     email : { type:String, required:true, lowercase: true, trim: true },
    //     phone : { type:String, required:true },
    //     password : {type: String},
    //     joiningdate : { type:Date },
    //     registrationdate : { type:Date, default:Date.now },
    //     address : { type:String },
    //     dob : { type:Date, required:true },
    //     status : { type:String, enum:member_statuses, default:member_statuses[3]},
    //     lastLoginAt : Date,
    //     gym : { type:mongoose.Types.ObjectId, ref:"GymDetails"},
        
    //     physique : {
    //         heightInCm : { type:Number },
    //         weightInKg : { type:Number },
    //         targetWeightInKg : { type:Number },
    //     },
        
    //     fee : {
    //         total : { type:Number, default:0 },
    //         paid : { type:Number, default:0 },
    //     },
    
    //     membership : { 
    //         plan : { type:mongoose.Types.ObjectId, ref: "membershipplans" },
    //         planStartDate : { type:Date },
    //         planEndDate : { type:Date }
    //     },
    
    //     diet : { 
    //         plan : { type:mongoose.Types.ObjectId, ref: "dietplans" },
    //         planStartDate : { type:Date },
    //         planEndDate : { type:Date }
    //     },
    
    //     workout : { 
    //         plan : { type:mongoose.Types.ObjectId, ref: "workoutplans" },
    //         planStartDate : { type:Date },
    //         planEndDate : { type:Date }
    //     },
    
    //     registeredBy : { type:mongoose.Types.ObjectId, ref: "users" },
    try{
        //get the gym id from the middleware
        const gymId = req.gym.gymId

        //check weather the gym exist or not
        const gymExist = await GymDetails.findById(gymId)

        appAssert(gymExist,"Gym Not Found! Please Login Again!")

        //lets get the 


        //now we have the gym
    }catch(error){

    }
    

}