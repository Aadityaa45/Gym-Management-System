import express from "express"
import { createExpense } from "../../controllers/AdminOperations/expanses.adminOperations.controller.js"
import { gymAuth } from "../../middelwares/gymauth.middelware.js"

const expanseRoute = express.Router()

expanseRoute.post('/create-expanse',gymAuth,createExpense)


export default expanseRoute