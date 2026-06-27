//this filee contains all the authentication functions regarding the Gym
import bcrypt from "bcryptjs"
import GymDetails from "../../models/gym.modals.js"
import { appAssert,AppError } from "../../utils/errorAssertion.utils.js"
import { generateAccessToken,generateRefreshToken } from "../../utils/tokens.js"
import emailService from "../../services/email.service.js"
import { createUpdateOtp,verifyOtpRecord } from "../../utils/otp.utils.js"




//------------------------------------------------------------REGISTRATION CPNTROLLER----------------------------------------------------------------
export const registerGym = async (req,res) =>{
    //steps to perform the registration of the gym
    //1. get all the inormation from client
    //2. check  weather the existing data exists or not
    //3. if not exist then we will perform hashings and store the data in the database
    //4.generate the tokens access,refresh tokens 
    //5.send success mail to the organisation 

    const {
            gymName,
            gymAddress,
            contact,
            ownerEmail,
            email,
            password
        } = req.body
        appAssert(gymName,"Gym Name is Required")
        appAssert(gymAddress,"Gym Address is Required")
        appAssert(contact,"Contact information is Required")
        appAssert(ownerEmail,"Owner Email is Required")
        appAssert(email,"Organisation email is Required")
        appAssert(password,"Password is required")

    try {
        const Gym = await GymDetails.findOne({
            $or:[
                {email},
                {contact},
                {gymName}
            ]
        })
        appAssert(!Gym,"Gym already Registered!Please Login")

        //hashing the password that it provides the security and none can re hash the password
        const hashedPassword = await bcrypt.hash(password,10)

        

        const newGym = new GymDetails({
            gymName,
            gymAddress,
            contact,
            ownerEmail,
            email,
            password:hashedPassword
        })

        const refreshToken = generateRefreshToken({
            gymId: newGym._id
        })

        newGym.refreshToken = await bcrypt.hash(refreshToken,12) 
        await newGym.save()

        //Getting the access token and refresh token from the utils, in those util function we are taaking objects aas an argument
        const accessToken = generateAccessToken({
            gymId: newGym._id
        }) 

        //till here account creation is completed now we will use cookies to send token 

        res.cookie(
            "accessToken",
            accessToken,
            {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 15 * 60 * 1000,
            }
        );

        res.cookie(
            "refreshToken",
            refreshToken,
            {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
            }
        );

        //sending success mail to the gym and gym owner
        await emailService.sendWelcomeEmail(gymName,email)

        return res.status(201).json({
            success: true,
            message:"Gym registered Successfully"
        });


    } catch (error) {
    console.error(error);

    if (error instanceof AppError) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }

    return res.status(500).json({
        success: false,
        message: error.message,
        stack: error.stack
    });
}
    }





//-----------------------------------------------------------------------LOGIN CONTROLLER-----------------------------------------------------------------------------------

export const loginGym = async(req,res)=>{
    const{
        email,
        password
    } = req.body

    appAssert(email,"Email is Required!")
    appAssert(password,"Password is Required!")
    try {
        //step1 : first of all find weather the user with the give
        const gymData = await GymDetails.findOne({
            email
        }).select("+password +refreshToken");

        appAssert(gymData,"Gym with the given email ID doesn't exist")

        const isPasswordMatched = await bcrypt.compare(password,gymData.password)

        appAssert(isPasswordMatched,"Invalid email or Password")

        //lets generate the tokens
        const accessToken = generateAccessToken({
            gymId:gymData._id
        })

        const refreshToken = generateRefreshToken({
            gymId:gymData._id
        })

        gymData.refreshToken = await bcrypt.hash(refreshToken,10)

        await gymData.save()

        res.cookie(
    "accessToken",
    accessToken,
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    }
  );

  res.cookie(
    "refreshToken",
    refreshToken,
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    }
  );

    return res.status(200).json({
        success:true,
        message:"Successfully Login!!",
        gym:{
            id:gymData._id,
            gymName:gymData.gymName,
            email:gymData.email
        }
    })
    } catch (error) {
        if (error instanceof AppError) {
            return res.json({success: false, message:error.message});
        }
        return res.json({success: false, message:"An error occured while loging in!"});
    }
}

//---------------------------------------------------------------------UPDATE PASSWORD/ FORGOT PASSSWORD CONTROLLER-------------------------------------------------------------------------------------------------
export const updatePassword = async (req,res)=>{
    //here, for the admin password updation we will send the verification otp to owner email and from there only the new password can be generated 

    //STEP1: FIRST WE WILL TAKE THE EMAIL, GYM NAME AS A REQUEST
    //STEP2: THEN WE WILL FIND OUT FOR SUCH GYM EXIST OR NOT
    //STEP3: IF SUCH GYM EXIST WE WILL SEND THE PASSWORD CHANGE OTP ON THE OWNERS EMAIL
    //STEP4: IF OWNER EMAIL DOESNT EXIST THEN WE WILL SEND OTP ON GYM EMAIL
    //STEP 4: THEN WE WILL VERIFY THE OTP ENTERED BY THE USER
    //STEP 5: IF THE OTP VERIFIES THEN WE WILL ASK USER TO CHANGE THE PASSWORD
    //STEP6: SAVE THE NEW PASSWORD AND ALSO SEND THE COPY OF NEW PASSOWRD TO THE OWNERS EMAIL

     try {
        let {gym, email, otp, newPassword} = req.body;

        appAssert(gym, "Gym name is required");;
        appAssert(email, "Email is required!");
        appAssert(otp, "OTP is required!");
        appAssert(newPassword, "New password is required!");

        email = email.toLowerCase().trim();

        await verifyOtpRecord({
            gym,
            email,
            otp,
            purpose:"forgot_password"
        });

        const gymData = await GymDetails.findOne({gym, email});
        appAssert(gymData, "gym not found!");
        gymData.password = await bcrypt.hash(newPassword, 12);
        gymData.refreshToken = null
        await gymData.save();

        await otpModel.deleteMany({
            gym,
            email,
            purpose:"forgot_password"
        });
        return res.json({success: true,message:"New Password is succesfully updated"});
    }catch(error){
        if (error instanceof AppError) {
            return res.json({success: false, message:error.message});
        }
        return res.json({success: false, message:"An error occured while loging in!"});
    }
}

//this is the function to send otp on the email 
export const sentResetPasswordOtp =async (req,res)=>{
    try {
        const {
        gymName,
        email
    } = req.body

    appAssert(gymName,"Gym name is required to change the password!")
    appAssert(email,"Gym email is required to change the password!")

    
    const gym = await GymDetails.findOne({
        gymName,
        email
        })

        appAssert(gym,"No data found with the given credentials!")

        const ownerEmail = gym.ownerEmail.toLowerCase().trim()

        //if owner email exist we will send otp to that email otherwise on the official gym email
        // ownerEmail? await createUpdateOtp(gym,email:ownerEmail,purpose="forgot_password"): await createUpdateOtp(gym,email,purpose="forgot_password")
        await createUpdateOtp({

            gym,

            email:ownerEmail,

            purpose:"forgot_password"

        });
    } catch (error) {
        if (error instanceof AppError) {
            return res.json({success: false, message:error.message});
        }
        return res.json({success: false, message:"An error occured while loging in!"});
    }
}



//-------------------------------------------------------------------------------LOGOUT CONTROLLER-----------------------------------------------------------------------------------------
export const logoutGym = async(req,res) =>{

}