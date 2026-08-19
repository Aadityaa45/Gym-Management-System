import billAndInvoiceModel from "../../models/invoice.modals.js";
import { appAssert } from "../../utils/errorAssertion.utils.js";
import invoiceTemplate from "../../templates/invoice.template.js";
import { AppError } from "../../utils/errorAssertion.utils.js";
import membersModel from "../../models/members.modals.js";
import mongoose from "mongoose";

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


//----------------------------------------------------------THIS IS THE CONTROLLER FOR SEARCHING AND FILTERING INVOICES----------------------------------------------------------

export const searchInvoices = async (req, res) => {

    try {

        // --------------------------------------------------
        // GET PAGINATION PARAMETERS
        // --------------------------------------------------

        const page = Math.max(
            Number(req.query.page) || 1,
            1
        );

        const limit = Math.min(
            Math.max(
                Number(req.query.limit) || 10,
                1
            ),
            100
        );

        const skip = (page - 1) * limit;


        // --------------------------------------------------
        // GET GYM ID
        // --------------------------------------------------

        const gymId = req.gym?.gymId;

        appAssert(
            gymId,
            "No Authorized!!"
        );

        const gymObjectId = new mongoose.Types.ObjectId(gymId);


        // --------------------------------------------------
        // GET FILTER PARAMETERS
        // --------------------------------------------------

        const {
            search,
            category,
            status,
            paymentMethod,
            dateFrom,
            dateTo,
            minAmount,
            maxAmount,
            processedBy
        } = req.query;


        // --------------------------------------------------
        // BASIC FILTER
        // --------------------------------------------------

        const filter = {
            gym: gymObjectId
        };


        // --------------------------------------------------
        // GENERAL SEARCH
        // --------------------------------------------------

        if (search && search.trim()) {

            const searchValue = search
                .trim()
                .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

            filter.$or = [

                {
                    billNumber: {
                        $regex: searchValue,
                        $options: "i"
                    }
                },

                {
                    invoiceTo: {
                        $regex: searchValue,
                        $options: "i"
                    }
                },

                {
                    transactionReference: {
                        $regex: searchValue,
                        $options: "i"
                    }
                },

                {
                    processedBy: {
                        $regex: searchValue,
                        $options: "i"
                    }
                }

            ];

        }

        if (processedBy && processedBy.trim()) {

    filter.processedBy = {
        $regex: processedBy.trim(),
        $options: "i"
    };

}
        // --------------------------------------------------
        // CATEGORY FILTER
        // --------------------------------------------------

        if (
            category &&
            category !== "all"
        ) {

            filter.category = category;

        }


        // --------------------------------------------------
        // STATUS FILTER
        // --------------------------------------------------

        if (
            status &&
            status !== "all"
        ) {

            filter.status = status;

        }


        // --------------------------------------------------
        // PAYMENT METHOD FILTER
        // --------------------------------------------------

        if (
            paymentMethod &&
            paymentMethod !== "all"
        ) {

            filter.paymentMethod = paymentMethod;

        }


        // --------------------------------------------------
        // DATE FILTER
        // --------------------------------------------------

        if (dateFrom || dateTo) {

            filter.invoiceDate = {};


            if (dateFrom) {

                const startDate = new Date(dateFrom);

                appAssert(
                    !isNaN(startDate.getTime()),
                    "Invalid start date"
                );

                startDate.setHours(
                    0,
                    0,
                    0,
                    0
                );

                filter.invoiceDate.$gte = startDate;

            }


            if (dateTo) {

                const endDate = new Date(dateTo);

                appAssert(
                    !isNaN(endDate.getTime()),
                    "Invalid end date"
                );

                endDate.setHours(
                    23,
                    59,
                    59,
                    999
                );

                filter.invoiceDate.$lte = endDate;

            }


            // --------------------------------------------------
            // CHECK DATE RANGE
            // --------------------------------------------------

            if (
                filter.invoiceDate.$gte &&
                filter.invoiceDate.$lte
            ) {

                appAssert(
                    filter.invoiceDate.$gte <=
                    filter.invoiceDate.$lte,
                    "Start date cannot be greater than end date"
                );

            }

        }


        // --------------------------------------------------
        // AMOUNT FILTER
        // --------------------------------------------------

        // --------------------------------------------------
// AMOUNT FILTER
// --------------------------------------------------

const hasMinAmount =
    minAmount !== undefined &&
    minAmount !== null &&
    minAmount !== "";

const hasMaxAmount =
    maxAmount !== undefined &&
    maxAmount !== null &&
    maxAmount !== "";

if (hasMinAmount || hasMaxAmount) {

    filter.finalAmount = {};

    if (hasMinAmount) {

        const minimum = Number(minAmount);

        appAssert(
            Number.isFinite(minimum) &&
            minimum >= 0,
            "Invalid minimum amount"
        );

        filter.finalAmount.$gte = minimum;
    }

    if (hasMaxAmount) {

        const maximum = Number(maxAmount);

        appAssert(
            Number.isFinite(maximum) &&
            maximum >= 0,
            "Invalid maximum amount"
        );

        filter.finalAmount.$lte = maximum;
    }

    // Check range only when both exist
    if (
        filter.finalAmount.$gte !== undefined &&
        filter.finalAmount.$lte !== undefined
    ) {

        appAssert(
            filter.finalAmount.$gte <=
            filter.finalAmount.$lte,
            "Minimum amount cannot be greater than maximum amount"
        );
    }



        }

        console.log("REQ QUERY:", req.query);

console.log("GYM ID:", gymId);

console.log("FILTER:", filter);
        // --------------------------------------------------
        // FETCH INVOICES + PAGINATION + SUMMARY
        // --------------------------------------------------

        const result =
            await billAndInvoiceModel.aggregate([

                {
                    $match: filter
                },

                {
                    $facet: {

                        // ==========================================
                        // PAGINATED INVOICES
                        // ==========================================

                        invoices: [

                            {
                                $sort: {
                                    invoiceDate: -1,
                                    _id: -1
                                }
                            },

                            {
                                $skip: skip
                            },

                            {
                                $limit: limit
                            }

                        ],


                        // ==========================================
                        // TOTAL INVOICE COUNT
                        // ==========================================

                        pagination: [

                            {
                                $count: "totalInvoices"
                            }

                        ],


                        // ==========================================
                        // INVOICE SUMMARY
                        // ==========================================

                        summary: [

                            {
                                $group: {

                                    _id: null,


                                    // --------------------------------
                                    // TOTAL INVOICES
                                    // --------------------------------

                                    total: {
                                        $sum: 1
                                    },


                                    // --------------------------------
                                    // PAID INVOICES
                                    // --------------------------------

                                    paid: {

                                        $sum: {

                                            $cond: [

                                                {
                                                    $eq: [
                                                        "$status",
                                                        "paid"
                                                    ]
                                                },

                                                1,

                                                0

                                            ]

                                        }

                                    },


                                    // --------------------------------
                                    // OUTSTANDING INVOICES
                                    // --------------------------------

                                    outstandingInvoices: {

                                        $sum: {

                                            $cond: [

                                                {
                                                    $in: [

                                                        "$status",

                                                        [
                                                            "pending",
                                                            "partially_paid"
                                                        ]

                                                    ]
                                                },

                                                1,

                                                0

                                            ]

                                        }

                                    },


                                    // --------------------------------
                                    // OUTSTANDING AMOUNT
                                    // --------------------------------

                                    outstandingAmount: {

                                        $sum: "$remainingAmount"

                                    }

                                }

                            }

                        ]

                    }

                }

            ]);


        // --------------------------------------------------
        // EXTRACT AGGREGATION RESULT
        // --------------------------------------------------

        const data = result[0];


        // --------------------------------------------------
        // GET TOTAL INVOICES
        // --------------------------------------------------

        const totalInvoices =
            data.pagination[0]?.totalInvoices || 0;


        // --------------------------------------------------
        // GET SUMMARY
        // --------------------------------------------------

        const summary =
            data.summary[0] || {

                total: 0,

                paid: 0,

                outstandingInvoices: 0,

                outstandingAmount: 0

            };


        // --------------------------------------------------
        // CALCULATE TOTAL PAGES
        // --------------------------------------------------

        const totalPages =
            Math.ceil(
                totalInvoices / limit
            );


        // --------------------------------------------------
        // RESPONSE
        // --------------------------------------------------

        return res.status(200).json({

            success: true,

            invoices: data.invoices,

            summary: {

                total:
                    summary.total,

                paid:
                    summary.paid,

                outstandingInvoices:
                    summary.outstandingInvoices,

                outstandingAmount:
                    summary.outstandingAmount

            },

            pagination: {

                totalInvoices,

                totalPages,

                currentPage: page,

                pageSize: limit,

                hasNextPage:
                    page < totalPages,

                hasPreviousPage:
                    page > 1

            }

        });


    } catch (error) {

        console.error(
            "SEARCH INVOICES ERROR:",
            error
        );


        if (error instanceof AppError) {

            return res.status(
                error.statusCode || 400
            ).json({

                success: false,

                message:
                    error.message

            });

        }


        return res.status(500).json({

            success: false,

            message:
                "An error occurred while searching invoices."

        });

    }

};


//---------------------------------------------------------------THIS CONTROLLER FUNCTION IS TO SEARCH FOR THE MEMBERS IN THE INVOICE GENERATION---------------------------------
export const searchMembersForInvoice = async (req, res) => {
    try {

        const gymId = req.gym?.gymId;

        appAssert(
            gymId,
            "Gym information is required"
        );

        const search = req.query.search?.trim();

        appAssert(
            search && search.length >= 2,
            "Please enter at least 2 characters"
        );

        const members = await membersModel
            .find({
                gym: gymId,

                $or: [
                    {
                        fullName: {
                            $regex: search,
                            $options: "i"
                        }
                    },
                    {
                        email: {
                            $regex: search,
                            $options: "i"
                        }
                    }
                ]
            })
            .select("_id fullName email")
            .limit(10)
            .lean();

        return res.status(200).json({

            success: true,

            members

        });

    } catch (error) {

        console.error(
            "SEARCH MEMBERS ERROR:",
            error
        );

        if (error instanceof AppError) {

            return res.status(
                error.statusCode || 400
            ).json({

                success: false,
                message: error.message

            });

        }

        return res.status(500).json({

            success: false,
            message: "Unable to search members"

        });

    }
};