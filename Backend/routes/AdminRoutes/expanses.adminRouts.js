import express from "express"
import { createExpense } from "../../controllers/AdminOperations/expanses.adminOperations.controller.js"
import { gymAuth } from "../../middelwares/gymauth.middelware.js"
import { getExpenseDashboard } from "../../controllers/AdminOperations/expanses.adminOperations.controller.js"


const expanseRoute = express.Router()

expanseRoute.post('/create-expanse',gymAuth,createExpense)
expanseRoute.get('/dashboard',gymAuth,getExpenseDashboard)



export default expanseRoute