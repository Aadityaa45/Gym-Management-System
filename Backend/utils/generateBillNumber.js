import billAndInvoiceModel from "../models/invoice.modals.js";

const genrateBillInvoiceNumber = async (gymId)=>{
    const totalBills = await billAndInvoiceModel.countDocuments({
        gym:gymId
    })
    return `FBMG - ${new Date().getFullYear()}-${String(totalBills+1).padStart(5,"0")}`
}

export default genrateBillInvoiceNumber