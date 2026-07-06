import genrateBillInvoiceNumber from "../utils/generateBillNumber.js";
import billAndInvoiceModel from "../models/invoice.modals.js";

class InvoiceService{
    static async generateInvoice({
        gymId,
        category,
        memberId,
        membershipId=null,
        productId=null,
        quantity=1,
        amount,
        discountAmount=0,
        taxAmount=0,
        paymentMethod,
        transactionReference=null,
        notes=null,
        dueDate=null,
        processedBy,
        paymentReceived
    }){
        //calculating the final amount
        const finalAmount = Number(amount)+Number(taxAmount)-Number(discountAmount)

        //calculating the remainingAmount
        const remainingAmount = finalAmount-Number(paymentReceived)

        let status = "paid"

        if(Number(paymentReceived)===0){
            status = "pending";
        }
        else if(remainingAmount>0){
            status = "partially_paid"
        }

        const billNumber = await genrateBillInvoiceNumber(gymId)

        const invoice = await billAndInvoiceModel.create({
            billNumber,
            gym:gymId,
            category,
            member:memberId,
            membership:membershipId,
            product:productId,
            quantity,
            amount,
            discountAmount,
            taxAmount,
            finalAmount,
            status,
            paymentMethod,
            transactionReference,
            dueDate,
            processedBy,
            paymentReceived,
            remainingAmount
        })
        return invoice
    }
}

export default InvoiceService