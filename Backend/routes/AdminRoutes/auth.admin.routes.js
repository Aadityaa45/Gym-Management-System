import express from 'express'
import { registerGym } from '../../controllers/authentications/gym.authentication.controller.js'
import { loginGym } from '../../controllers/authentications/gym.authentication.controller.js'

const adminAuthRoutes = express.Router()

adminAuthRoutes.post('/register',registerGym)
adminAuthRoutes.post('/login',loginGym)


export default adminAuthRoutes