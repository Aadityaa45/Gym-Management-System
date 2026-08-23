import genrateBillInvoiceNumber from "../utils/generateBillNumber.js";
import billAndInvoiceModel from "../models/invoice.modals.js";

class InvoiceService {
    static async generateInvoice({
    gymId,
    category,
    invoiceTo = null,
    memberId,
    membershipId = null,
    items = [],
    amount,
    discountAmount = 0,
    taxAmount = 0,
    paymentMethod,
    transactionReference = null,
    notes = null,
    dueDate = null,
    processedBy,
    paymentReceived = 0,
    session
}) {

    const finalAmount =
        Number(amount) +
        Number(taxAmount) -
        Number(discountAmount);

    const remainingAmount =
        finalAmount - Number(paymentReceived);

    let status = "paid";

    if (Number(paymentReceived) === 0) {
        status = "pending";
    } else if (remainingAmount > 0) {
        status = "partially_paid";
    }

    const billNumber = await genrateBillInvoiceNumber(gymId);

    const invoice = await billAndInvoiceModel.create([{
        billNumber,
        gym: gymId,
        category,
        invoiceTo :null,
        member: memberId,
        membership: membershipId,
        items,
        amount,
        discountAmount,
        taxAmount,
        finalAmount,
        status,
        paymentMethod,
        transactionReference,
        notes,
        dueDate,
        processedBy,
        paymentReceived,
        remainingAmount
    }], { session });

    return invoice[0];
}
}

export default InvoiceService;