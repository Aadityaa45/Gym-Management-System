import billAndInvoiceModel from "../../models/invoice.modals.js";
import { appAssert } from "../../utils/errorAssertion.utils.js";

//------------------------------------------THIS IS THE CONTROLLER TO FETCH THE DATA FOR THE INVOICE GENERATION--------------
export const generateInvoice = async (req,res)=>{
    try {
        const invoiceId = req.params.invoiceId
        const invoice = await billAndInvoiceModel.findById(invoiceId).populate("member").populate("membership").populate("Gym")
        appAssert(invoice,"Invoice didn't found")
    } catch (error) {
        
    }
}