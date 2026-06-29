import express from 'express'
import { gymAuth } from '../../middelwares/gymauth.middelware.js'
import { addNewMembershipPlan } from '../../controllers/AdminOperations/membershipPlans.controller.js'
import { fetchPlans } from '../../controllers/AdminOperations/membershipPlans.controller.js'

const membershiPlansRoutes = express.Router()

membershiPlansRoutes.post('/new-plan',gymAuth,addNewMembershipPlan)
membershiPlansRoutes.get('/membership-plans',gymAuth,fetchPlans)

export default membershiPlansRoutes