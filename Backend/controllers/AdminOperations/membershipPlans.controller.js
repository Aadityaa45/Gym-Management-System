import express from "express"
import membershipPlanModel from "../../models/plans.modals.js"
import { appAssert } from "../../utils/errorAssertion.utils.js"
import { AppError } from "../../utils/errorAssertion.utils.js"
import emailService from "../../services/email.service.js"
import GymDetails from "../../models/gym.modals.js"
//here we have to implement all the functionality regarding the membership plans including all the CRUD operations and fetching searching



//---------------------------------------------------------------------Addition of new Plan Controller -------------------------------------------------------------------------------------------
export const addNewMembershipPlan = async (req,res) =>{
    try {
        const gymId = req.gym.gymId
        // name : { type:String, required:true },
        //     features : { type:[String] },
        //     description : { type:String },
        //     gym : { type:mongoose.Types.ObjectId, ref:"GymDetails", required:true },
        //     active: { type: Boolean, default: true },
        //     durationInDays: { type: Number, required: true },
        //     price: { type: Number, required: true },
        //     priorityOrder : {type:Number, default:0 }
        const{
            name,
            features,
            description,
            active,
            durationInDays,
            price,
            priorityOrder
        } = req.body
        appAssert(name,"Plan name is Required!")
        appAssert(durationInDays,"Please specify the duration of the plan!")
        appAssert(durationInDays>0,"There should be an duration in Plan")
        appAssert(price,"Plan Price is required")
        appAssert(price>0,"Price should be greater than 0.")
        if(features){
            appAssert(Array.isArray(features),"Features must be an Aarray")
        }

        //noe we will check weather there any plan exist with same name to make the difference 
        const isPlanExist = await membershipPlanModel.findOne({
            gym:gymId,
            name
        })

        appAssert(!isPlanExist,"There is plan exist with the entered Name")

        const newPlan = new membershipPlanModel({
            name,
            features,
            description,
            active,
            durationInDays,
            price,
            priorityOrder,
            gym:gymId
        })

        await newPlan.save()

        //now we will send success message to the gym owner about the new plan addition\
        //to, subject, html, text
        const gymOwner = await GymDetails.findById(gymId).select("ownerEmail gymName");
        await emailService.sendEmail({

    to: gymOwner.ownerEmail,

    subject: "New Membership Plan Added",

    html: `
        <h2>Membership Plan Added Successfully</h2>

        <p>Hello <b>${gymOwner.gymName}</b>,</p>

        <p>A new membership plan has been added to your gym.</p>

        <table>

            <tr>
                <td><b>Name</b></td>
                <td>${newPlan.name}</td>
            </tr>

            <tr>
                <td><b>Duration</b></td>
                <td>${newPlan.durationInDays} Days</td>
            </tr>

            <tr>
                <td><b>Price</b></td>
                <td>₹${newPlan.price}</td>
            </tr>

            <tr>
                <td><b>Status</b></td>
                <td>${newPlan.active ? "Active" : "Inactive"}</td>
            </tr>

        </table>

        <p>Thank you for using Fitness Beast.</p>
    `
});
        return res.json({
            success:true,
            message:"New Plan Added Successfully"
        })
        


    } catch (error) {
        if (error instanceof AppError) {
            return res.json({success: false, message:error.message});
        }
        return res.json({success: false, message:"An error occured while loging in!"});
    }
}