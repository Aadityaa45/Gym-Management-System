import express from "express"
import { gymAuth } from "../../middelwares/gymauth.middelware.js"
import { generateInvoice } from "../../controllers/AdminOperations/invoice.controller.admin.js"
const invoiceRoute = express.Router()

invoiceRoute.get('/:invoiceId',gymAuth,generateInvoice)

export default invoiceRoute;