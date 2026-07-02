import GymDetails from "../models/gym.modals.js";
import jwt from "jsonwebtoken"
import { appAssert } from "../utils/errorAssertion.utils.js";
import { AppError } from "../utils/errorAssertion.utils.js";
//here we will create a gym auth middelware which will be used to check weather the gym is logged in or not by using cookies and jwt tokens nd this we will use in frontend with protected routes

export const gymAuth = async (req,res,next)=>{
    try {
        console.log("Gym auth middleware");
        console.log(req.cookies)
        const {accessToken} = req.cookies  //requesting from cookies as we have stored the token in the cookie
        appAssert(accessToken,"Unauthorized Login Again!")

         console.log("Access Token:", accessToken);
        //now, verifying the token with the signature key
        const tokenDecode = jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET
        )

        // if(tokenDecode.gymId){
        //     req.gym = {
        //         gymId:tokenDecode.gymId
        //     }
        //     next()
        // }else{
        //     return res.json({
        //         success:false,
        //         message:"Unauthorized! Login Again!"
        //     })
        // }
        req.gym = {
    gymId: tokenDecode.gymId
};

        next()
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(401).json({
                success:false,
                message:error.message
            });
        }

        return res.status(401).json({
            success:false,
            message:"Invalid or Expired Token"
        });
    }
}