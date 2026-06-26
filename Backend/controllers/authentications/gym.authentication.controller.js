//this filee contains all the authentication functions regarding the Gym
import bcrypt from "bcryptjs"
import GymDetails from "../../models/gym.modals"
import { appAssert,AppError } from "../../utils/errorAssertion.utils"
import { generateAccessToken,generateRefreshToken } from "../../utils/tokens"
import emailService from "../../services/email.service"




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
        emailService.sendWelcomeEmail(gymName,email)

        return res.status(201).json({
            success: true,
            message:"Gym registered Successfully"
        });


    } catch (error) {
        if (error instanceof AppError) {
            return res.json({success: false, message:error.message});
        }
        return res.json({success: false, message:"An error occured while loging in!"});
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

        appAssert(!gymData,"Gym with the given email ID doesn't exist")

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
    

}