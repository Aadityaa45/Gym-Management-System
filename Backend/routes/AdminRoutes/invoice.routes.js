import express from "express"
import { gymAuth } from "../../middelwares/gymauth.middelware.js"
import { generateInvoice } from "../../controllers/AdminOperations/invoice.controller.admin.js"
import { searchInvoices } from "../../controllers/AdminOperations/invoice.controller.admin.js"
import { searchMembersForInvoice } from "../../controllers/AdminOperations/invoice.controller.admin.js"
const invoiceRoute = express.Router()

invoiceRoute.get('/fetch-invoices',gymAuth,searchInvoices)
invoiceRoute.get('/search-members',gymAuth,searchMembersForInvoice)
invoiceRoute.get('/:invoiceId',gymAuth,generateInvoice)



export default invoiceRoute;