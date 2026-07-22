import billAndInvoiceModel from "../../models/invoice.modals.js";
import { appAssert } from "../../utils/errorAssertion.utils.js";
import invoiceTemplate from "../../templates/invoice.template.js";
import { AppError } from "../../utils/errorAssertion.utils.js";

//------------------------------------------THIS IS THE CONTROLLER TO FETCH THE DATA FOR THE INVOICE GENERATION--------------
export const generateInvoice = async (req,res)=>{
    try {
        const invoiceId = req.params.invoiceId
        const invoice = await billAndInvoiceModel.findById(invoiceId).populate("member").populate("membership").populate("gym").populate({
    path:"items.product",
    select:"name price"
});
        appAssert(invoice,"Invoice didn't found")

        const html = invoiceTemplate(invoice)

        res.send(html)


    } catch (error) {
        if (error instanceof AppError) {
                    return res.json({success: false, message:error.message});
                }
                console.error(error);
    }
}