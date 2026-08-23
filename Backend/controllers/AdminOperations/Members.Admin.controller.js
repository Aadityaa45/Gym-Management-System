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
import InvoiceService from "../../services/invoice.service.js";
import { generateInvoice } from "./invoice.controller.admin.js";
import genrateBillInvoiceNumber from "../../utils/generateBillNumber.js";
import mongoose from "mongoose";
import getNextDayInIndia from "../../utils/getNextDayDate.utils.js";

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

        //here, we dont want the moongose object as we are not going to perform any operation on the gym details so we will use lean() method to get the plain javascript object instead of moongose object
        const gymExist = await GymDetails.findById(gymId).lean()

        appAssert(gymExist,"Gym Not Found! Please Login Again!")

        
        //Lets get the data from the frontend and validate it properly with all the edge cases
        const {
            fullname,
            email,
            phone,
            address,
            dob,
            fee,
            membership,
            registeredBy
        } = req.body
        console.log(req.body)
        
        //full Name Validation
        appAssert(fullname,"Full Name is Required!")
        appAssert(typeof fullname === "string","Full Name Must be a String!")
        
        //email validation
        appAssert(email,"Email is Required!")
        appAssert(typeof email === "string","Email Must be a String!")
        
        //Phone Validation
        appAssert(phone,"Phone Number is Required!")
        appAssert(typeof phone === "string","Phone Number Must be a String!")
        appAssert(/^[0-9]{10}$/.test(phone),"Invalid Phone Number")

        //Joining Date Validation
        // appAssert(joiningdate,"Joining Date is Required!")
        // appAssert(typeof joiningdate === "string","Joining Date Must be a String!")
        // appAssert(!isNaN(Date.parse(joiningdate)),"Invalid Joining Date")
        // // appAssert(!isNaN(new Date(joiningdate)),"Invalid Joining Date")
            
                
        appAssert(address,"Address is Required!")
        appAssert(dob,"Date of Birth is Required!")
        
        appAssert(typeof fee.total === "number","Fee total is required")

        appAssert(typeof fee.paid === "number","Paid amount is required")
    
        appAssert(fee.paid <= fee.total,"Paid amount cannot exceed total fee")
            
        appAssert(membership,"Membership is Required!")
                
        appAssert(typeof membership === "object","Membership Must be an Object!")
        
        appAssert(registeredBy,"Registered By is Required!")

        const joiningDate = getNextDayInIndia()


        //------------------------------------ENTERED PLAN VALIDATION--------------------------------------------
        //we get the data and now we have to check weather the entered plan already exist or not in the database and if it exist then we will check weather the plan is active or not and if it is active then we will allow the registration otherwise we will not allow the registration
        
        
        //-------------------------------------ENTERED KEY INFO OF MEMBER VALIDATION-----------------------------------------
        //now we will check weather any member with the same email,phone,fullname and gym exist or not
        //the inution behind checking this is that if in MMA section there are two kids and have same father info for email and phone so in that case we will check names also because in that case the names will be different so we will check all the three fields to avoid any confusion

        //here botth the db queries are independent of each other so we can run them in parallel using Promise.all() to improve performance and reduce the overall execution time

        const [isPlanExist, isMemberExist] = await Promise.all([
            MembershipPlanModel.findById(membership.plan).lean(),
            membersModel.findOne({
                email:email,
                phone:phone,
                fullName:fullname,
                gym:gymId
            })
        ])

        appAssert(isPlanExist,"Membership Plan Not Found!")
        appAssert(isPlanExist.active === true,"Membership Plan is not Active!")
        appAssert(!isMemberExist,"Member with the same email, phone, or full name already exists!")

        //now sending the response to the frontend that the otp has been sent successfully and now we will send the otp to the user email
        //here we are not returning with response because a
        res.json({
            success:true,
            message:"OTP sent Successfully"
        })

        //--------------------------------------------SAVING THE DATA IN OTP AND SENDING OTP TO USER EMAIL----------------------------
        await createUpdateOtp({
            gym:gymId,
            email:email,
            purpose:"registration",
            registrationData:{
                ...req.body,
                joiningDate
            }
        })
        
    }catch(error){
        if (error instanceof AppError) {
                    return res.json({success: false, message:error.message});
                }
    }
    
}

// //-------------------------------------------REGISTRATION OTP VERIFICATION AND MEMBER DATA SAVING IN DATABASE---------------------------------------------
// export const verifyRegistrationOtp = async (req,res) =>{
//     //lets implement transaction in this 
//     const session = await mongoose.startSession()
//     try{
//         session.startTransaction()
//         const gymId = req.gym.gymId
//         const {email,otp} = req.body
//         appAssert(email,"Email is Required!")
//         appAssert(otp,"OTP is Required!")

//         //lets store the verification result in a variable 
//        const verificationResult = await verifyOtpRecord({
//             gym:gymId,
//             email:email,
//             otp:otp,
//             purpose:"registration"
//         })

//         //now we will generate a random password for the user and save it in the database after hashing it
//         const password = randomPasswordGenerator(8) // Generate a random password of length 8

//         //if the otp is verified then we will save the data in the database
//         if(verificationResult.verified){
//             const finalRegistrationData = new membersModel({
//                 fullName: verificationResult.registrationData.fullname,
//                 email: verificationResult.registrationData.email,
//                 phone: verificationResult.registrationData.phone,
//                 joiningdate: verificationResult.registrationData.joiningdate,
//                 address: verificationResult.registrationData.address,
//                 dob:verificationResult.registrationData.dob,
//                 gym:gymId,
//                 password: await bcrypt.hash(password, 12), // Hash the generated password
//                 fee: verificationResult.registrationData.fee,
//                 membership: verificationResult.registrationData.membership,
//                 registeredBy: verificationResult.registrationData.registeredBy

//             })
//             await finalRegistrationData.save({session})

//             //now we will delete the otp record from the database as it is no longer needed

//             await otpModel.deleteMany({
//                 gym:gymId,
//                 email:email,
//                 purpose:"registration"
//             },
//             {session}
//         )

//             //now lets generate the invoice const invoice =
//               const invoice =  await InvoiceService.generateInvoice({

//                     gymId,

//                     category:"membership",

//                     memberId:finalRegistrationData._id,

//                     membershipId:finalRegistrationData.membership.plan,

//                     items:[],

//                     amount:finalRegistrationData.fee.total,

//                     discountAmount:finalRegistrationData.fee.discount,

//                     paymentMethod:"upi",

//                     paymentReceived:finalRegistrationData.fee.paid,

//                     processedBy:finalRegistrationData.registeredBy,

//                     session
//                 })

//                 await session.commitTransaction();

//                 // Close Session
//                 session.endSession();
//             res.json({
//                 success: true,
//                 message: "Member Registered Successfully",
//                 memberId: finalRegistrationData._id,
//                 invoiceId: invoice._id
//             });

//             //now we will send the email to the user with his/her credentials and other details such as invoice/bill
//             await EmailService.sendWelcomeEmail(verificationResult.registrationData.fullname, email, password,"Fitness Beast Gym & MMA")

//         }

//     }catch(error){
//          await session.abortTransaction();
//         session.endSession();

//         if (error instanceof AppError) {
//             return res.json({
//                 success: false,
//                 message: error.message
//             });
//         }

//         console.error(error);

//         return res.json({
//             success: false,
//             message: "Something went wrong while registering member."
//         });
//     }
// }
export const verifyRegistrationOtp = async (req, res) => {

    const session = await mongoose.startSession();

    try {

        // --------------------------------------------------
        // START TRANSACTION
        // --------------------------------------------------

        session.startTransaction();


        // --------------------------------------------------
        // GET GYM ID
        // --------------------------------------------------

        const gymId = req.gym?.gymId;

        appAssert(
            gymId,
            "Gym information is required"
        );


        // --------------------------------------------------
        // GET OTP DATA
        // --------------------------------------------------

        const {
            email,
            otp
        } = req.body;


        appAssert(
            email,
            "Email is Required!"
        );

        appAssert(
            otp,
            "OTP is Required!"
        );


        // --------------------------------------------------
        // VERIFY OTP
        // --------------------------------------------------

        const verificationResult =
            await verifyOtpRecord({

                gym: gymId,

                email: email,

                otp: otp,

                purpose: "registration"

            });


        appAssert(
            verificationResult?.verified,
            "Invalid or expired OTP"
        );


        // --------------------------------------------------
        // GET REGISTRATION DATA
        // --------------------------------------------------

        const registrationData =
            verificationResult.registrationData;


        appAssert(
            registrationData,
            "Registration data not found"
        );


        // --------------------------------------------------
        // FETCH MEMBERSHIP PLAN AGAIN
        // --------------------------------------------------

        const membershipPlan =
            await MembershipPlanModel
                .findOne({
                    _id: registrationData.membership?.plan,
                    gym: gymId
                })
                .lean();


        appAssert(
            membershipPlan,
            "Membership Plan Not Found!"
        );


        // --------------------------------------------------
        // CHECK PLAN STATUS
        // --------------------------------------------------

        appAssert(
            membershipPlan.active === true,
            "Membership Plan is not Active!"
        );


        // --------------------------------------------------
        // VALIDATE PLAN DURATION
        // --------------------------------------------------

        appAssert(
            Number.isFinite(
                membershipPlan.durationInDays
            ) &&
            membershipPlan.durationInDays > 0,
            "Membership Plan has invalid duration"
        );


        // --------------------------------------------------
        // CONVERT JOINING DATE
        // --------------------------------------------------

        const planStartDate =
            new Date(
                registrationData.joiningDate
            );


        appAssert(
            !isNaN(
                planStartDate.getTime()
            ),
            "Invalid Joining Date"
        );


        // --------------------------------------------------
        // CALCULATE MEMBERSHIP END DATE
        // --------------------------------------------------

        const planEndDate =
            new Date(planStartDate);


        planEndDate.setDate(
            planEndDate.getDate() +
            membershipPlan.durationInDays
        );


        // --------------------------------------------------
        // GENERATE RANDOM PASSWORD
        // --------------------------------------------------

        const password =
            randomPasswordGenerator(8);


        const hashedPassword =
            await bcrypt.hash(
                password,
                12
            );


        // --------------------------------------------------
        // CREATE MEMBER
        // --------------------------------------------------

        const finalRegistrationData =
            new membersModel({

                fullName:
                    registrationData.fullname,

                email:
                    registrationData.email,

                phone:
                    registrationData.phone,

                // ------------------------------------------
                // JOINING DATE
                // ------------------------------------------

                joiningdate:
                    planStartDate,

                address:
                    registrationData.address,

                dob:
                    registrationData.dob,

                gym:
                    gymId,

                password:
                    hashedPassword,

                fee:
                    registrationData.fee,

                // ------------------------------------------
                // MEMBERSHIP
                // ------------------------------------------

                membership: {

                    plan:
                        membershipPlan._id,

                    planStartDate:
                        planStartDate,

                    planEndDate:
                        planEndDate

                },

                registeredBy:
                    registrationData.registeredBy

            });


        // --------------------------------------------------
        // SAVE MEMBER
        // --------------------------------------------------

        await finalRegistrationData.save({
            session
        });


        // --------------------------------------------------
        // DELETE OTP
        // --------------------------------------------------

        await otpModel.deleteMany({

            gym: gymId,

            email: email,

            purpose: "registration"

        }, {
            session
        });


        // --------------------------------------------------
        // GENERATE MEMBERSHIP INVOICE
        // --------------------------------------------------

        const invoice =
            await InvoiceService.generateInvoice({

                gymId,

                category: "membership",

                memberId:
                    finalRegistrationData._id,

                membershipId:
                    finalRegistrationData.membership.plan,

                items: [],

                amount:
                    finalRegistrationData.fee.total,

                discountAmount:
                    finalRegistrationData.fee.discount,

                paymentMethod:
                    "upi",

                paymentReceived:
                    finalRegistrationData.fee.paid,

                processedBy:
                    finalRegistrationData.registeredBy,

                session

            });


        // --------------------------------------------------
        // COMMIT TRANSACTION
        // --------------------------------------------------

        await session.commitTransaction();


        // --------------------------------------------------
        // CLOSE SESSION
        // --------------------------------------------------

        session.endSession();


        // --------------------------------------------------
        // SEND RESPONSE
        // --------------------------------------------------

        res.status(200).json({

            success: true,

            message:
                "Member Registered Successfully",

            memberId:
                finalRegistrationData._id,

            invoiceId:
                invoice._id,

            membership: {

                plan:
                    membershipPlan.name,

                startDate:
                    planStartDate,

                endDate:
                    planEndDate,

                durationInDays:
                    membershipPlan.durationInDays

            }

        });


        // --------------------------------------------------
        // SEND WELCOME EMAIL
        // --------------------------------------------------

        try {

            await EmailService.sendWelcomeEmail(
                registrationData.fullname,
                email,
                "Fitness Beast Gym & MMA",
                {
                    plan: membershipPlan,
                    planStartDate: planStartDate,
                    planEndDate: planEndDate
                },
            finalRegistrationData.fee
        );

        } catch (emailError) {

            console.error(
                "WELCOME EMAIL ERROR:",
                emailError
            );

        }


    } catch (error) {

        // --------------------------------------------------
        // ABORT TRANSACTION
        // --------------------------------------------------

        if (
            session.inTransaction()
        ) {

            await session.abortTransaction();

        }


        session.endSession();


        // --------------------------------------------------
        // ERROR HANDLING
        // --------------------------------------------------

        console.error(
            "VERIFY REGISTRATION ERROR:",
            error
        );


        if (error instanceof AppError) {

            return res.status(
                error.statusCode || 400
            ).json({

                success: false,

                message:
                    error.message

            });

        }


        return res.status(500).json({

            success: false,

            message:
                "Something went wrong while registering member."

        });

    }

};



// //-----------------------------------------------------CONTROLLER FOR FETCHING MEMBERS WITH PAGINATION AS WELL AS SEARCH WITH DEBOUNCING---------------------------------
// export const fetchMembers = async (req,res) =>{
//     try {
//         const gymId = req.gym.gymId
//         const page = Number(req.query.page)||1
//         const limit = Number(req.query.limit)||10
//         const search = req.query.search?.trim()
//         const memberShipPlan = req.query.plan
//         const status = req.query.status
//         const paymentStatus = req.query.payment

//         const skip = (page-1)*limit

//         let filter = {
//             gym:gymId
//         }

//         //if the search parameter exist in the url
//         if(search){
//             filter.fullName={
//                 $regex: search,
//                 $options:"i"
//             }
//         }

//         // Membership Plan Filter
//         if (memberShipPlan) {
//             filter["membership.plan"] = memberShipPlan;
//         }

//         // Status Filter
//         if (status) {
//             filter.status = status;
//         }

//         //payment filter
//         if(paymentStatus==="true"){
//             filter["fee.remaining"] = {
//                 $gt:0
//             }
//         }

//         //total members 
//         const totalMembers = await membersModel.countDocuments(filter)
//         //now we will find the members based on the parameters
//         const members = await membersModel.find(filter)
//             .populate("membership.plan","name")
//             .sort({createdAt:-1})
//             .skip(skip)
//             .limit(limit)
        
//         appAssert(members,"Doesnt'found Any Member")

//         return res.json({
//             success:true,
//             members,
//             pagination:{
//                 totalMembers,
//                 totalPages : Math.ceil(totalMembers/limit),
//                 pageSize :limit,
//                 currentPage:page
//             },
//         })
//     } catch (error) {
//         if (error instanceof AppError) {
//                     return res.json({success: false, message:error.message});
//                 }
//                 console.error(error);
//     }
// }


// //
export const fetchMembers = async (req, res) => {

    try {

        // --------------------------------------------------
        // BASIC PARAMETERS
        // --------------------------------------------------

        const gymId = req.gym?.gymId;

        appAssert(
            gymId,
            "Gym information is required"
        );

        const page = Math.max(
            Number(req.query.page) || 1,
            1
        );

        const limit = Math.min(
            Math.max(
                Number(req.query.limit) || 10,
                1
            ),
            100
        );

        const search = req.query.search?.trim();

        const memberShipPlan = req.query.plan?.trim();

        const status = req.query.status?.trim();

        const paymentStatus = req.query.payment;


        // --------------------------------------------------
        // PAGINATION
        // --------------------------------------------------

        const skip = (page - 1) * limit;


        // --------------------------------------------------
        // BASE FILTER
        // --------------------------------------------------

        const filter = {
            gym: gymId
        };


        // --------------------------------------------------
        // SEARCH
        // --------------------------------------------------

        if (search) {

            filter.fullName = {
                $regex: search.replace(
                    /[.*+?^${}()|[\]\\]/g,
                    "\\$&"
                ),
                $options: "i"
            };

        }


        // --------------------------------------------------
        // MEMBERSHIP PLAN FILTER
        // --------------------------------------------------

        if (memberShipPlan) {

            filter["membership.plan"] = memberShipPlan;

        }


        // --------------------------------------------------
        // STATUS FILTER
        // --------------------------------------------------

        if (status) {

            filter.status = status;

        }


        // --------------------------------------------------
        // PAYMENT FILTER
        // --------------------------------------------------

        if (paymentStatus === "true") {

            filter["fee.remaining"] = {
                $gt: 0
            };

        }


        // --------------------------------------------------
        // COUNT + FETCH IN PARALLEL
        // --------------------------------------------------

        const [totalMembers, members] = await Promise.all([

            membersModel.countDocuments(filter),

            membersModel
                .find(filter)
                .populate("membership.plan", "name durationInDays price")
                .sort({
                    createdAt: -1
                })
                .skip(skip)
                .limit(limit)
                .lean()

        ]);


        // --------------------------------------------------
        // CALCULATE MEMBERSHIP INFORMATION
        // --------------------------------------------------

        const now = new Date();


        const membersWithDetails = members.map((member) => {

            let daysRemaining = null;

            let membershipExpiryDate = null;

            let membershipStatus = "not_assigned";


            if (member.membership?.planEndDate) {

                const expiryDate =
                    new Date(member.membership.planEndDate);

                membershipExpiryDate = expiryDate;


                // Difference in milliseconds
                const difference =
                    expiryDate.getTime() - now.getTime();


                // Convert milliseconds → days
                daysRemaining =
                    Math.ceil(
                        difference /
                        (1000 * 60 * 60 * 24)
                    );


                // --------------------------------------------------
                // MEMBERSHIP STATUS
                // --------------------------------------------------

                if (daysRemaining < 0) {

                    membershipStatus = "expired";

                }
                else if (daysRemaining === 0) {

                    membershipStatus = "expires_today";

                }
                else if (daysRemaining <= 7) {

                    membershipStatus = "expiring_soon";

                }
                else {

                    membershipStatus = "active";

                }

            }


            return {

                ...member,

                joiningDate: member.joiningdate || null,

                membershipDaysRemaining: daysRemaining,

                membershipExpiryDate,

                membershipStatus

            };

        });


        // --------------------------------------------------
        // PAGINATION
        // --------------------------------------------------

        const totalPages =
            Math.ceil(totalMembers / limit);


        // --------------------------------------------------
        // RESPONSE
        // --------------------------------------------------

        return res.status(200).json({

            success: true,

            members: membersWithDetails,

            pagination: {

                totalMembers,

                totalPages,

                pageSize: limit,

                currentPage: page,

                hasNextPage:
                    page < totalPages,

                hasPreviousPage:
                    page > 1

            }

        });

    }
    catch (error) {

        console.error(
            "FETCH MEMBERS ERROR:",
            error
        );


        if (error instanceof AppError) {

            return res.status(
                error.statusCode || 400
            ).json({

                success: false,

                message: error.message

            });

        }


        return res.status(500).json({

            success: false,

            message:
                "Unable to fetch members"

        });

    }

};

//----------------------------------------------------------
// GET COMPLETE MEMBER PROFILE
//----------------------------------------------------------

export const getMemberDetails = async (req, res) => {

    try {

        // --------------------------------------------------
        // GET GYM ID
        // --------------------------------------------------

        const gymId = req.gym?.gymId;

        appAssert(
            gymId,
            "Gym information is required"
        );


        // --------------------------------------------------
        // GET MEMBER ID
        // --------------------------------------------------

        const { memberId } = req.params;

        appAssert(
            memberId,
            "Member ID is required"
        );

        appAssert(
            mongoose.Types.ObjectId.isValid(memberId),
            "Invalid member ID"
        );


        // --------------------------------------------------
        // FETCH MEMBER
        // --------------------------------------------------

        const member = await membersModel
            .findOne({
                _id: memberId,
                gym: gymId
            })
            .select("-password")
            .populate({
                path: "membership.plan",
                select: "name description features durationInDays price active"
            })
            .populate({
                path: "diet.plan",
                select: "name description"
            })
            .populate({
                path: "workout.plan",
                select: "name description"
            })
            .lean();


        // --------------------------------------------------
        // MEMBER NOT FOUND
        // --------------------------------------------------

        appAssert(
            member,
            "Member not found"
        );


        // --------------------------------------------------
        // MEMBERSHIP INFORMATION
        // --------------------------------------------------

        const now = new Date();

        let membershipDaysRemaining = null;
        let membershipStatus = "not_assigned";
        let membershipExpiryDate = null;


        if (member.membership?.planEndDate) {

            membershipExpiryDate =
                new Date(member.membership.planEndDate);


            const difference =
                membershipExpiryDate.getTime() -
                now.getTime();


            membershipDaysRemaining =
                Math.ceil(
                    difference /
                    (1000 * 60 * 60 * 24)
                );


            if (membershipDaysRemaining < 0) {

                membershipStatus = "expired";

            }
            else if (membershipDaysRemaining === 0) {

                membershipStatus = "expires_today";

            }
            else if (membershipDaysRemaining <= 7) {

                membershipStatus = "expiring_soon";

            }
            else {

                membershipStatus = "active";

            }

        }


        // --------------------------------------------------
        // PAYMENT SUMMARY
        // --------------------------------------------------

        const feeTotal =
            Number(member.fee?.total || 0);

        const feePaid =
            Number(member.fee?.paid || 0);

        const feeRemaining =
            Number(member.fee?.remaining || 0);

        const discount =
            Number(member.fee?.discount || 0);


        // --------------------------------------------------
        // RESPONSE
        // --------------------------------------------------

        return res.status(200).json({

            success: true,

            member: {

                // ==========================================
                // BASIC INFORMATION
                // ==========================================

                _id: member._id,

                fullName: member.fullName,

                email: member.email,

                phone: member.phone,

                address: member.address,

                dob: member.dob,

                status: member.status,

                joiningDate:
                    member.joiningdate || null,

                registrationDate:
                    member.registrationdate || null,

                registeredBy:
                    member.registeredBy || null,


                // ==========================================
                // PHYSIQUE
                // ==========================================

                physique: {

                    heightInCm:
                        member.physique?.heightInCm ?? null,

                    weightInKg:
                        member.physique?.weightInKg ?? null,

                    targetWeightInKg:
                        member.physique?.targetWeightInKg ?? null

                },


                // ==========================================
                // MEMBERSHIP
                // ==========================================

                membership: {

                    plan:
                        member.membership?.plan || null,

                    planStartDate:
                        member.membership?.planStartDate || null,

                    planEndDate:
                        member.membership?.planEndDate || null,

                    daysRemaining:
                        membershipDaysRemaining,

                    status:
                        membershipStatus

                },


                // ==========================================
                // PAYMENT
                // ==========================================

                payment: {

                    total:
                        feeTotal,

                    paid:
                        feePaid,

                    remaining:
                        feeRemaining,

                    discount:
                        discount,

                    paymentCompleted:
                        feeRemaining <= 0

                },


                // ==========================================
                // DIET
                // ==========================================

                diet: {

                    plan:
                        member.diet?.plan || null,

                    startDate:
                        member.diet?.planStartDate || null,

                    endDate:
                        member.diet?.planEndDate || null

                },


                // ==========================================
                // WORKOUT
                // ==========================================

                workout: {

                    plan:
                        member.workout?.plan || null,

                    startDate:
                        member.workout?.planStartDate || null,

                    endDate:
                        member.workout?.planEndDate || null

                },


                // ==========================================
                // ACCOUNT INFORMATION
                // ==========================================

                account: {

                    lastLoginAt:
                        member.lastLoginAt || null,

                    createdAt:
                        member.createdAt,

                    updatedAt:
                        member.updatedAt

                }

            }

        });

    }
    catch (error) {

        console.error(
            "GET MEMBER DETAILS ERROR:",
            error
        );


        if (error instanceof AppError) {

            return res.status(
                error.statusCode || 400
            ).json({

                success: false,

                message:
                    error.message

            });

        }


        return res.status(500).json({

            success: false,

            message:
                "Unable to fetch member details"

        });

    }

};

// ==========================================================
// UPGRADE / PAYMENT CONTROLLER
// ==========================================================

export const upgradeMemberMembership = async (req, res) => {

    const session = await mongoose.startSession();

    try {

        // ==================================================
        // 1. GYM AUTHENTICATION
        // ==================================================

        const gymId = req.gym?.gymId;

        appAssert(
            gymId,
            "Gym information is required"
        );


        // ==================================================
        // 2. REQUEST DATA
        // ==================================================

        const {
            memberId,
            newPlanId = null,
            startDate = null,
            oldDuePayment = 0,
            discount = 0,
            newMembershipPayment = 0
        } = req.body;


        // ==================================================
        // 3. BASIC VALIDATION
        // ==================================================

        appAssert(
            memberId,
            "Member ID is required"
        );

        appAssert(
            mongoose.Types.ObjectId.isValid(memberId),
            "Invalid member ID"
        );


        if (newPlanId !== null) {

            appAssert(
                mongoose.Types.ObjectId.isValid(newPlanId),
                "Invalid membership plan ID"
            );

        }


        // ==================================================
        // 4. NUMERIC VALIDATION
        // ==================================================

        const oldDuePaymentAmount =
            Number(oldDuePayment);

        const discountAmount =
            Number(discount);

        const newMembershipPaymentAmount =
            Number(newMembershipPayment);


        appAssert(
            Number.isFinite(oldDuePaymentAmount) &&
            oldDuePaymentAmount >= 0,
            "Invalid previous due payment"
        );

        appAssert(
            Number.isFinite(discountAmount) &&
            discountAmount >= 0,
            "Invalid discount"
        );

        appAssert(
            Number.isFinite(newMembershipPaymentAmount) &&
            newMembershipPaymentAmount >= 0,
            "Invalid membership payment"
        );


        // ==================================================
        // 5. START TRANSACTION
        // ==================================================

        session.startTransaction();


        // ==================================================
        // 6. FETCH MEMBER
        // ==================================================

        const member = await membersModel
            .findOne({
                _id: memberId,
                gym: gymId
            })
            .session(session);


        appAssert(
            member,
            "Member not found"
        );


        // ==================================================
        // 7. FETCH NEW PLAN
        // ==================================================

        let newPlan = null;

        if (newPlanId) {

            newPlan = await MembershipPlanModel
                .findOne({
                    _id: newPlanId,
                    gym: gymId
                })
                .session(session)
                .lean();


            appAssert(
                newPlan,
                "Membership plan not found"
            );


            appAssert(
                newPlan.active === true,
                "Selected membership plan is not active"
            );

        }


        // ==================================================
        // 8. CURRENT PAYMENT STATE
        // ==================================================

        const currentTotal =
            Number(member.fee?.total || 0);

        const currentPaid =
            Number(member.fee?.paid || 0);

        const currentRemaining =
            Number(member.fee?.remaining || 0);


        // ==================================================
        // 9. VALIDATE OLD DUE PAYMENT
        // ==================================================

        appAssert(
            oldDuePaymentAmount <= currentRemaining,
            `Previous outstanding amount is only ₹${currentRemaining}`
        );


        // ==================================================
        // 10. IF NO PLAN SELECTED
        //     THEN THIS IS ONLY DUE SETTLEMENT
        // ==================================================

        if (!newPlan) {

            appAssert(
                oldDuePaymentAmount > 0,
                "No membership upgrade or payment settlement requested"
            );


            const updatedPaid =
                currentPaid +
                oldDuePaymentAmount;


            const updatedRemaining =
                Math.max(
                    currentTotal - updatedPaid,
                    0
                );


            // ----------------------------------------------
            // UPDATE MEMBER PAYMENT
            // ----------------------------------------------

            member.fee.paid =
                updatedPaid;

            member.fee.remaining =
                updatedRemaining;


            await member.save({
                session
            });


            // ----------------------------------------------
            // GENERATE PAYMENT INVOICE
            // ----------------------------------------------

            const invoice =
                await InvoiceService.generateInvoice({

                    gymId,

                    category: "membership_payment",

                    memberId: member._id,

                    membershipId:
                        member.membership?.plan || null,

                    items: [],

                    amount:
                        oldDuePaymentAmount,

                    discountAmount: 0,

                    paymentMethod: "upi",

                    paymentReceived:
                        oldDuePaymentAmount,

                    processedBy:
                        req.user?.fullName ||
                        req.user?.name ||
                        "Admin",

                    session

                });


            // ----------------------------------------------
            // COMMIT
            // ----------------------------------------------

            await session.commitTransaction();

            session.endSession();


            return res.status(200).json({

                success: true,

                operation: "payment_settlement",

                message:
                    "Previous outstanding payment settled successfully",

                member: {

                    memberId: member._id,

                    payment: {

                        total: currentTotal,

                        paid: updatedPaid,

                        remaining: updatedRemaining

                    }

                },

                invoiceId: invoice?._id || null

            });

        }


        // ==================================================
        // 11. MEMBERSHIP UPGRADE VALIDATION
        // ==================================================

        appAssert(
            newPlan.durationInDays > 0,
            "Invalid membership duration"
        );

        appAssert(
            newPlan.price >= 0,
            "Invalid membership plan price"
        );


        // ==================================================
        // 12. PREVENT SAME PLAN UPGRADE
        // ==================================================

        const currentPlanId =
            member.membership?.plan?._id ||
            member.membership?.plan;


        if (
            currentPlanId &&
            currentPlanId.toString() ===
            newPlan._id.toString()
        ) {

            throw new AppError(
                "Member is already subscribed to this membership plan",
                400
            );

        }


        // ==================================================
        // 13. VALIDATE START DATE
        // ==================================================

        let membershipStartDate;

        if (startDate) {

            membershipStartDate =
                new Date(startDate);

        }
        else {

            membershipStartDate =
                new Date();

        }


        appAssert(
            !isNaN(
                membershipStartDate.getTime()
            ),
            "Invalid membership start date"
        );


        // ==================================================
        // 14. CALCULATE NEW MEMBERSHIP
        // ==================================================

        const planPrice =
            Number(newPlan.price);


        appAssert(
            discountAmount <= planPrice,
            "Discount cannot exceed membership price"
        );


        const membershipPayable =
            Math.max(
                planPrice -
                discountAmount,
                0
            );


        appAssert(
            newMembershipPaymentAmount <=
            membershipPayable,
            `Membership payment cannot exceed ₹${membershipPayable}`
        );


        const newMembershipRemaining =
            Math.max(
                membershipPayable -
                newMembershipPaymentAmount,
                0
            );


        // ==================================================
        // 15. CALCULATE OLD DUE AFTER PAYMENT
        // ==================================================

        const oldDueRemaining =
            Math.max(
                currentRemaining -
                oldDuePaymentAmount,
                0
            );


        // ==================================================
        // 16. CALCULATE NEW EXPIRY
        // ==================================================

        const membershipEndDate =
            new Date(
                membershipStartDate.getTime() +
                (
                    newPlan.durationInDays *
                    24 *
                    60 *
                    60 *
                    1000
                )
            );


        // ==================================================
        // 17. UPDATE MEMBER MEMBERSHIP
        // ==================================================

        member.membership.plan =
            newPlan._id;

        member.membership.planStartDate =
            membershipStartDate;

        member.membership.planEndDate =
            membershipEndDate;


        // ==================================================
        // 18. UPDATE PAYMENT STATE
        // ==================================================

        /*
            Important:

            Old due + new membership are two different
            financial obligations.

            We don't simply overwrite the old amount.

            The member's new outstanding balance becomes:

                previous outstanding after settlement
                +
                new membership outstanding
        */

        const finalRemaining =
            oldDueRemaining +
            newMembershipRemaining;


        const finalPaid =
            newMembershipPaymentAmount +
            oldDuePaymentAmount;


        const finalTotal =
            finalRemaining +
            finalPaid;


        member.fee = {

            total: finalTotal,

            paid: finalPaid,

            remaining: finalRemaining,

            discount: discountAmount

        };


        // ==================================================
        // 19. SAVE MEMBER
        // ==================================================

        await member.save({
            session
        });


        // ==================================================
        // 20. GENERATE MEMBERSHIP INVOICE
        // ==================================================

        const invoice =
            await InvoiceService.generateInvoice({

                gymId,

                category: "membership_upgrade",

                memberId: member._id,

                membershipId: newPlan._id,

                items: [],

                amount: planPrice,

                discountAmount,

                paymentMethod: "upi",

                paymentReceived:
                    newMembershipPaymentAmount,

                processedBy:
                    req.user?.fullName ||
                    req.user?.name ||
                    "Admin",

                session

            });


        // ==================================================
        // 21. GENERATE OLD DUE PAYMENT INVOICE
        // ==================================================

        let oldDueInvoice = null;


        if (oldDuePaymentAmount > 0) {

            oldDueInvoice =
                await InvoiceService.generateInvoice({

                    gymId,

                    category: "membership_payment",

                    memberId: member._id,

                    membershipId:
                        newPlan._id,

                    items: [],

                    amount:
                        oldDuePaymentAmount,

                    discountAmount: 0,

                    paymentMethod: "upi",

                    paymentReceived:
                        oldDuePaymentAmount,

                    processedBy:
                        req.user?.fullName ||
                        req.user?.name ||
                        "Admin",

                    session

                });

        }


        // ==================================================
        // 22. COMMIT TRANSACTION
        // ==================================================

        await session.commitTransaction();

        session.endSession();


        // ==================================================
        // 23. RESPONSE
        // ==================================================

        return res.status(200).json({

            success: true,

            operation: "membership_upgrade",

            message:
                "Membership upgraded successfully",

            member: {

                memberId:
                    member._id,

                membership: {

                    previousPlanId:
                        currentPlanId || null,

                    newPlan: {

                        _id:
                            newPlan._id,

                        name:
                            newPlan.name,

                        durationInDays:
                            newPlan.durationInDays,

                        price:
                            newPlan.price

                    },

                    planStartDate:
                        membershipStartDate,

                    planEndDate:
                        membershipEndDate

                },

                payment: {

                    previousDue: {

                        before:
                            currentRemaining,

                        paidNow:
                            oldDuePaymentAmount,

                        remaining:
                            oldDueRemaining

                    },

                    newMembership: {

                        price:
                            planPrice,

                        discount:
                            discountAmount,

                        payable:
                            membershipPayable,

                        paidNow:
                            newMembershipPaymentAmount,

                        remaining:
                            newMembershipRemaining

                    },

                    final: {

                        total:
                            finalTotal,

                        paid:
                            finalPaid,

                        remaining:
                            finalRemaining

                    }

                }

            },

            invoices: {

                membership:
                    invoice?._id || null,

                previousDue:
                    oldDueInvoice?._id || null

            }

        });

    }
    catch (error) {

        // ==================================================
        // ROLLBACK
        // ==================================================

        if (
            session.inTransaction()
        ) {

            await session.abortTransaction();

        }


        // ==================================================
        // CLOSE SESSION
        // ==================================================

        await session.endSession();


        // ==================================================
        // ERROR RESPONSE
        // ==================================================

        console.error(
            "MEMBERSHIP UPGRADE ERROR:",
            error
        );


        if (
            error instanceof AppError
        ) {

            return res.status(
                error.statusCode || 400
            ).json({

                success: false,

                message:
                    error.message

            });

        }


        return res.status(500).json({

            success: false,

            message:
                "Unable to process membership upgrade"

        });

    }

};