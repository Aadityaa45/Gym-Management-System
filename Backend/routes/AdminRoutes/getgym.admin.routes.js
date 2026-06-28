import express from "express"
import { gymAuth } from "../../middelwares/gymauth.middelware.js"
import getCurrentGym from "../../controllers/getMe/gym.getme.controller.js"

const getGymRoute = express.Router()

getGymRoute.get('/my-gym',gymAuth,getCurrentGym)


export default getGymRoute