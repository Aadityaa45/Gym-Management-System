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


//--------------------------------------------------------------------FETCH ALL PLANS CONTROLLERS----------------------------------------------------
export const fetchPlans = async (req,res) =>{
    //since we will always have a very few amount of plans so we can directly give it to the frontend it will not slowdown our app
    try {
        const gymId = req.gym.gymId
        const plans = await membershipPlanModel.find({
            gym:gymId
        })

        return res.json({success:true,plans})
    } catch (error) {
        if (error instanceof AppError) {
            return res.json({success: false, message:error.message});
        }
        return res.json({success: false, message:"An error occured while loging in!"});
    }
}

//---------------------------------------------------------------------UPDATE MEMBERSHIP PLAN CONTROLLER-------------------------------------------------------------------

export const updateMembershipPlans = async (req, res) => {
    try {

        const gymId = req.gym.gymId;
        const { planId } = req.params;

        appAssert(planId, "Plan Id is required!");

        // Find plan belonging to current gym only
        const existingPlan = await membershipPlanModel.findOne({
            _id: planId,
            gym: gymId
        });

        appAssert(existingPlan, "Membership Plan not found!");

        const {
            name,
            features,
            description,
            active,
            durationInDays,
            price,
            priorityOrder
        } = req.body;

        // ---------------- VALIDATIONS ----------------

        if (name) {
            const duplicatePlan = await membershipPlanModel.findOne({
                gym: gymId,
                name,
                _id: { $ne: planId } // Ignore current plan
            });

            appAssert(!duplicatePlan, "Another plan with this name already exists.");
        }

        if (durationInDays !== undefined) {
            appAssert(durationInDays > 0, "Duration must be greater than 0.");
        }

        if (price !== undefined) {
            appAssert(price > 0, "Price must be greater than 0.");
        }

        if (features !== undefined) {
            appAssert(Array.isArray(features), "Features must be an array.");
        }

        // ---------------- UPDATE ONLY PROVIDED FIELDS ----------------

        if (name !== undefined) existingPlan.name = name;
        if (features !== undefined) existingPlan.features = features;
        if (description !== undefined) existingPlan.description = description;
        if (active !== undefined) existingPlan.active = active;
        if (durationInDays !== undefined) existingPlan.durationInDays = durationInDays;
        if (price !== undefined) existingPlan.price = price;
        if (priorityOrder !== undefined) existingPlan.priorityOrder = priorityOrder;

        await existingPlan.save();

        // ---------------- SEND EMAIL ----------------

        const gymOwner = await GymDetails.findById(gymId)
            .select("ownerEmail gymName");

        await emailService.sendEmail({

            to: gymOwner.ownerEmail,

            subject: "Membership Plan Updated Successfully",

            html: `
                <h2>Membership Plan Updated</h2>

                <p>Hello <b>${gymOwner.gymName}</b>,</p>

                <p>Your membership plan has been updated successfully.</p>

                <table cellpadding="8">

                    <tr>
                        <td><b>Plan Name</b></td>
                        <td>${existingPlan.name}</td>
                    </tr>

                    <tr>
                        <td><b>Duration</b></td>
                        <td>${existingPlan.durationInDays} Days</td>
                    </tr>

                    <tr>
                        <td><b>Price</b></td>
                        <td>₹${existingPlan.price}</td>
                    </tr>

                    <tr>
                        <td><b>Status</b></td>
                        <td>${existingPlan.active ? "Active" : "Inactive"}</td>
                    </tr>

                </table>

                <br/>

                <p>If you did not perform this action, please contact support immediately.</p>

                <p><b>Fitness Beast Gym Management System</b></p>
            `
        });

        return res.json({
            success: true,
            message: "Membership Plan Updated Successfully",
            plan: existingPlan
        });

    } catch (error) {

        if (error instanceof AppError) {
            return res.json({
                success: false,
                message: error.message
            });
        }

        return res.json({
            success: false,
            message: "An error occurred while updating the membership plan."
        });

    }
};

//-------------------------------------------------------------ACTIVE/INACTIVE SETTER----------------------------------------------------------------------
export const activeInactiveToggler = async (req,res) =>{
    try {
        const gymId = req.gym.gymId
        const {planId} = req.params

        const selectedPlan = await membershipPlanModel.findOne({
            gym:gymId,
            _id:planId
        })

        appAssert(selectedPlan,"No such Plan Exist!")

        //now take the state from the frontend, we will implement a toggle state for it with default value true
        const {active} = req.body
        appAssert(typeof active===Boolean,"The active value can only be boolean")

        if (active !== undefined) selectedPlan.active = active;

        await selectedPlan.save()

        const gymOwner = await GymDetails.findById(gymId)
            .select("ownerEmail gymName");

        await emailService.sendEmail({
            to: gymOwner.ownerEmail,

            subject: `Membership Plan : ${selectedPlan.name}'s Status changed to: ${active}`,

            html: `
                <h2>Membership Plan Updated</h2>

                <p>Hello <b>${gymOwner.gymName}</b>,</p>

                <p>Your membership plan status has been changed.</p>
                <p>If set to Inactive you wont' longer use it for further operations</p>


                <br/>

                <p>If you did not perform this action, please contact support immediately.</p>

                <p><b>Fitness Beast Gym Management System</b></p>
            `
        })
        return res.json({
success:true,
message:`Plan ${selectedPlan.active ? "Activated" : "Deactivated"} Successfully`,
plan:selectedPlan
})


    } catch (error) {
         if (error instanceof AppError) {
            return res.json({
                success: false,
                message: error.message
            });
        }

        return res.json({
            success: false,
            message: "An error occurred while updating the membership plan."
        });
    }
}