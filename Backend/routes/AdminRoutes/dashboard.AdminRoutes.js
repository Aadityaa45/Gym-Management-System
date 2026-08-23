import express from "express";

import { gymAuth } from "../../middelwares/gymauth.middelware.js";
import { getAdminDashboard } from "../../controllers/AdminOperations/dashboard.AdminOperations.js";


const dashboardRoute = express.Router();


dashboardRoute.get(
    "/",
    gymAuth,
    getAdminDashboard
);


export default dashboardRoute;