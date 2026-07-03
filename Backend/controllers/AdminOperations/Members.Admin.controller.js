import membersModel from "../../models/members.modals.js";
import express from "express"
import { appAssert } from "../../utils/errorAssertion.utils.js";
import { AppError } from "../../utils/errorAssertion.utils.js";
import GymDetails from "../../models/gym.modals.js";
import MembershipPlanModel from "../../models/plans.modals.js";
import { createUpdateOtp, verifyOtpRecord } from "../../utils/otp.utils.js";
import { randomPasswordGenerator } from "../../utils/RandomPasswordGenerator.utils.js";
import bcrypt from "bcryptjs"
import EmailService from "../../services/email.service.js";
import otpModel from "../../models/otp.modals.js";

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

    try{
        console.log("Regsitration Api hit");
        //get the gym id from the middleware
        const gymId = req.gym.gymId

        //check weather the gym exist or not
        console.log(1)
        const gymExist = await GymDetails.findById(gymId)
        console.log(2)

        appAssert(gymExist,"Gym Not Found! Please Login Again!")

        //lets get the registration data from the body 
        const {
            fullname,
            email,
            phone,
            joiningdate,
            address,
            dob,
            fee,
            membership,
            registeredBy
        } = req.body
        appAssert(fullname,"Full Name is Required!")
        appAssert(typeof fullname === "string","Full Name Must be a String!")

        appAssert(email,"Email is Required!")
        appAssert(typeof email === "string","Email Must be a String!")

                    appAssert(
                /^[0-9]{10}$/.test(phone),
                "Invalid Phone Number"
            )

                    appAssert(
                !isNaN(new Date(joiningdate)),
                "Invalid Joining Date"
            )

                    appAssert(address,"Address is Required!")
                    appAssert(dob,"Date of Birth is Required!")

                    appAssert(
                typeof fee.total === "number",
                "Fee total is required"
            )

            appAssert(
                typeof fee.paid === "number",
                "Paid amount is required"
            )

            appAssert(
                fee.paid <= fee.total,
                "Paid amount cannot exceed total fee"
            )

        appAssert(membership,"Membership is Required!")

        appAssert(typeof membership === "object","Membership Must be an Object!")
        appAssert(registeredBy,"Registered By is Required!")


        //------------------------------------ENTERED PLAN VALIDATION--------------------------------------------
        //we get the data and now we have to check weather the entered plan already exist or not in the database and if it exist then we will check weather the plan is active or not and if it is active then we will allow the registration otherwise we will not allow the registration
        console.log(3)
        const isPlanExist = await MembershipPlanModel.findById(membership.plan)
        console.log(4)
        appAssert(isPlanExist,"Membership Plan Not Found!")
        appAssert(isPlanExist.active === true,"Membership Plan is not Active!")
        
        //-------------------------------------ENTERED KEY INFO OF MEMBER VALIDATION-----------------------------------------
        //now we will check weather any member with the same email,phone,fullname and gym exist or not
        //the inution behind checking this is that if in MMA section there are two kids and have same father info for email and phone so in that case we will check names also because in that case the names will be different so we will check all the three fields to avoid any confusion
        console.log(5)
        const isMemberExist = await membersModel.findOne({
            email:email,
            phone:phone,
            fullName:fullname,
            gym:gymId
        })
        console.log(6)
        appAssert(!isMemberExist,"Member with the same email, phone, or full name already exists!")

        //--------------------------------------------SAVING THE DATA IN OTP AND SENDING OTP TO USER EMAIL----------------------------
        console.log(7)
        await createUpdateOtp({
            gym:gymId,
            email:email,
            purpose:"registration",
            registrationData:req.body
        })
        console.log(8)

        return res.json({
            success:true,
            message:"OTP sent Successfully"
        })

    }catch(error){
        if (error instanceof AppError) {
                    return res.json({success: false, message:error.message});
                }
    }
    
}



//-------------------------------------------REGISTRATION OTP VERIFICATION AND MEMBER DATA SAVING IN DATABASE---------------------------------------------
export const verifyRegistrationOtp = async (req,res) =>{
    try{
        const gymId = req.gym.gymId
        const {email,otp} = req.body
        appAssert(email,"Email is Required!")
        appAssert(otp,"OTP is Required!")

        console.log(1)
       const verificationResult = await verifyOtpRecord({
            gym:gymId,
            email:email,
            otp:otp,
            purpose:"registration"
        })
        console.log(2)

        const password = randomPasswordGenerator(8) // Generate a random password of length 8

        //if the otp is verified then we will save the data in the database
        if(verificationResult.verified){
            const finalRegistrationData = new MembersModel({
                fullName: verificationResult.registrationData.fullname,
                email: verificationResult.registrationData.email,
                phone: verificationResult.registrationData.phone,
                joiningdate: verificationResult.registrationData.joiningdate,
                address: verificationResult.registrationData.address,
                dob:verificationResult.registrationData.dob,
                gym:gymId,
                password: await bcrypt.hash(password, 12), // Hash the generated password
                fee: verificationResult.registrationData.fee,
                membership: verificationResult.registrationData.membership,
                registeredBy: verificationResult.registrationData.registeredBy

            })
            console.log(3)
            await finalRegistrationData.save()
            console.log(4)

            //now we will delete the otp record from the database as it is no longer needed
            console.log(5)
            await otpModel.deleteMany({
                gym:gymId,
                email:email,
                purpose:"registration"
            })
            console.log(6)

            //now we will send the email to the user with his/her credentials and other details such as invoice/bill
            console.log(7)
            await emailService.sendWelcomeEmail(verificationResult.registrationData.fullname, email, password)
            console.log(8)
            return res.json({
                success:true,
                message:"Member Registered Successfully and Email Sent to the User with his/her Credentials"
            })
        }

    }catch(error){
         if (error instanceof AppError) {
                    return res.json({success: false, message:error.message});
                }
                console.error(error);
    }
}



