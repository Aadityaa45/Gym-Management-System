import GymDetails from "../../models/gym.modals.js";
import { AppError } from "../../utils/errorAssertion.utils.js";
//this is the controller to get the data of logged in gym 

const getCurrentGym = async (req,res) =>{
    try {
        const {gymId} = req.gym;
        const gym = await GymDetails.findById(gymId).select("-password") //here we have used - passowrd that do not share the password with this because the entire shop details will be given to the frontend and even the hashed password so we are removing the passowrd parameter from the shop
        return res.json({
            success:true,
            gym
        })
    } catch (error) {
        if (error instanceof AppError) {
                    return res.json({success: false, message:error.message});
                }
                return res.json({success: false, message:"An error occured while loging in!"});
    }
}

export default getCurrentGym