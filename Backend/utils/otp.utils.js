import otpModel from "../models/otp.modals.js";
import crypto from 'crypto'
import bcrypt from "bcryptjs";
import EmailService from "../services/email.service.js";

import { appAssert } from "../utils/errorAssertion.utils.js";

//here, we have used special crypto based approach for the unpredictive otp 
export const generateOtp = async () =>{
    return crypto.randomInt(100000,1000000).toString()
}


//this is the function to create or update the otp
export const createUpdateOtp = async ({gym,email,purpose,registrationData}) =>{
    const otpExpiryMinutes = 5
    const otp = await generateOtp()
    const hashedOtp = await bcrypt.hash(otp,12)
    const otpExpiresAt = new Date(Date.now()+otpExpiryMinutes*60*1000)

    await otpModel.findOneAndUpdate(
        {gym, email, purpose},
        {
            otp:hashedOtp,
            expiresAt:otpExpiresAt,
            verified: false,
            attempts: 0,
            registrationData: registrationData || {}
        },
        {
            upsert: true,
            new: true
        }
    );

    //sending OTP to the email
    await EmailService.sendOtpEmail(email,otp)
    return otp
}

//this function is to verify otp records 
export const verifyOtpRecord = async ({gym,email,otp,purpose})=>{
    const otp_entry = await otpModel.findOne({gym, email, purpose});
    appAssert(otp_entry, "OTP not found !!!");
    appAssert(otp_entry.expiresAt.getTime() > Date.now(), "OTP expired. Resend to continue.");

    if (otp_entry.attempts >= 3) {
        await otpModel.deleteOne({ _id: otp_entry._id});
        throw new Error("Max attempts exceeded");
    }

    const otpMatched = await bcrypt.compare(otp,otp_entry.otp)
    if (!otpMatched) {
        otp_entry.attempts += 1;
        await otp_entry.save();
        throw new Error("Invalid OTP");
    }

    otp_entry.verified = true;
    await otp_entry.save();
    return otp_entry;
}