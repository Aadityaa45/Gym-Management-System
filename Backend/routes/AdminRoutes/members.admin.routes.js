console.log("MEMBER ROUTE FILE LOADED");
import express from "express"
import { gymAuth } from '../../middelwares/gymauth.middelware.js'
import {registerMember} from "../../controllers/AdminOperations/Members.Admin.controller.js"
import {verifyRegistrationOtp} from "../../controllers/AdminOperations/Members.Admin.controller.js"
import { fetchMembers } from "../../controllers/AdminOperations/Members.Admin.controller.js";

const memberRouter = express.Router()

memberRouter.post("/register-member",gymAuth,registerMember)
memberRouter.post("/verify-otp",gymAuth,verifyRegistrationOtp)
memberRouter.get("/fetch-members?page=1&limit=10",gymAuth,fetchMembers)

export default memberRouter