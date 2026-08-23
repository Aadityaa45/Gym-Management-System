import mongoose from "mongoose";
import membersModel from "../../models/members.modals.js";
import membershipPlanModel from "../../models/plans.modals.js";
import productModel from "../../models/product.models.js";
import billAndInvoiceModel from "../../models/invoice.modals.js";
import { ExpenseModel } from "../../models/expanse.modals.js";

import { appAssert } from "../../utils/errorAssertion.utils.js";
import { AppError } from "../../utils/errorAssertion.utils.js";


/*
|--------------------------------------------------------------------------
| ADMIN DASHBOARD
|--------------------------------------------------------------------------
|
| This controller provides all dashboard data:
|
| 1. Total members
| 2. Active memberships
| 3. Monthly revenue
| 4. Monthly expenses
| 5. Revenue chart
| 6. Expense chart
| 7. Members by membership plan
| 8. Upcoming membership expiries
| 9. Product stock information
|
| Attendance intentionally excluded for now.
|
|--------------------------------------------------------------------------
*/


export const getAdminDashboard = async (req, res) => {

    try {

        // ============================================================
        // 1. GET GYM
        // ============================================================

        const gymId = req.gym?.gymId;

        appAssert(
            gymId,
            "Gym information is required"
        );

        const gymObjectId =
            new mongoose.Types.ObjectId(gymId);


        // ============================================================
        // 2. DATE RANGES
        // ============================================================

        const now = new Date();


        // Current month

        const currentMonthStart =
            new Date(
                now.getFullYear(),
                now.getMonth(),
                1
            );


        const currentMonthEnd =
            new Date(
                now.getFullYear(),
                now.getMonth() + 1,
                0,
                23,
                59,
                59,
                999
            );


        // Previous month

        const previousMonthStart =
            new Date(
                now.getFullYear(),
                now.getMonth() - 1,
                1
            );


        const previousMonthEnd =
            new Date(
                now.getFullYear(),
                now.getMonth(),
                0,
                23,
                59,
                59,
                999
            );


        // Last 6 months

        const sixMonthsAgo =
            new Date(
                now.getFullYear(),
                now.getMonth() - 5,
                1
            );


        // ============================================================
        // 3. KPI QUERIES
        // ============================================================

        const [

            totalMembers,

            activeMembers,

            monthlyRevenueResult,

            previousMonthRevenueResult,

            monthlyExpenseResult,

            previousMonthExpenseResult,

            totalProducts,

            lowStockProducts,

            outOfStockProducts

        ] = await Promise.all([


            // ========================================================
            // TOTAL MEMBERS
            // ========================================================

            membersModel.countDocuments({
                gym: gymObjectId
            }),


            // ========================================================
            // ACTIVE MEMBERS
            // ========================================================

            membersModel.countDocuments({

                gym: gymObjectId,

                status: "active",

                "membership.planEndDate": {
                    $gte: now
                }

            }),


            // ========================================================
            // CURRENT MONTH REVENUE
            // ========================================================

            billAndInvoiceModel.aggregate([

                {
                    $match: {

                        gym: gymObjectId,

                        invoiceDate: {
                            $gte: currentMonthStart,
                            $lte: currentMonthEnd
                        },

                        status: {
                            $in: [
                                "paid",
                                "partially_paid"
                            ]
                        }

                    }
                },

                {
                    $group: {

                        _id: null,

                        total: {
                            $sum: "$paymentReceived"
                        }

                    }
                }

            ]),


            // ========================================================
            // PREVIOUS MONTH REVENUE
            // ========================================================

            billAndInvoiceModel.aggregate([

                {
                    $match: {

                        gym: gymObjectId,

                        invoiceDate: {
                            $gte: previousMonthStart,
                            $lte: previousMonthEnd
                        },

                        status: {
                            $in: [
                                "paid",
                                "partially_paid"
                            ]
                        }

                    }
                },

                {
                    $group: {

                        _id: null,

                        total: {
                            $sum: "$paymentReceived"
                        }

                    }
                }

            ]),


            // ========================================================
            // CURRENT MONTH EXPENSE
            // ========================================================

            ExpenseModel.aggregate([

                {
                    $match: {

                        gym: gymObjectId,

                        expenseDate: {
                            $gte: currentMonthStart,
                            $lte: currentMonthEnd
                        },

                        status: "active"

                    }
                },

                {
                    $group: {

                        _id: null,

                        total: {
                            $sum: "$amount"
                        }

                    }
                }

            ]),


            // ========================================================
            // PREVIOUS MONTH EXPENSE
            // ========================================================

            ExpenseModel.aggregate([

                {
                    $match: {

                        gym: gymObjectId,

                        expenseDate: {
                            $gte: previousMonthStart,
                            $lte: previousMonthEnd
                        },

                        status: "active"

                    }
                },

                {
                    $group: {

                        _id: null,

                        total: {
                            $sum: "$amount"
                        }

                    }
                }

            ]),


            // ========================================================
            // TOTAL PRODUCTS
            // ========================================================

            productModel.countDocuments({
                gym: gymObjectId
            }),


            // ========================================================
            // LOW STOCK
            // ========================================================

            productModel.countDocuments({

                gym: gymObjectId,

                quantity: {
                    $gt: 0,
                    $lte: 5
                }

            }),


            // ========================================================
            // OUT OF STOCK
            // ========================================================

            productModel.countDocuments({

                gym: gymObjectId,

                quantity: 0

            })

        ]);


        // ============================================================
        // 4. EXTRACT KPI VALUES
        // ============================================================

        const monthlyRevenue =
            monthlyRevenueResult[0]?.total || 0;


        const previousMonthRevenue =
            previousMonthRevenueResult[0]?.total || 0;


        const monthlyExpenses =
            monthlyExpenseResult[0]?.total || 0;


        const previousMonthExpenses =
            previousMonthExpenseResult[0]?.total || 0;


        // ============================================================
        // 5. PERCENTAGE CALCULATIONS
        // ============================================================

        const calculatePercentageChange = (
            current,
            previous
        ) => {

            if (previous === 0) {

                if (current === 0) {
                    return 0;
                }

                return 100;
            }

            return Number(
                (
                    ((current - previous) / previous) *
                    100
                ).toFixed(1)
            );

        };


        const revenuePercentage =
            calculatePercentageChange(
                monthlyRevenue,
                previousMonthRevenue
            );


        const expensePercentage =
            calculatePercentageChange(
                monthlyExpenses,
                previousMonthExpenses
            );


        // ============================================================
        // 6. REVENUE OVERVIEW
        // ============================================================

        const revenueOverview =
            await billAndInvoiceModel.aggregate([

                {
                    $match: {

                        gym: gymObjectId,

                        invoiceDate: {
                            $gte: sixMonthsAgo,
                            $lte: currentMonthEnd
                        },

                        status: {
                            $in: [
                                "paid",
                                "partially_paid"
                            ]
                        }

                    }
                },

                {
                    $group: {

                        _id: {

                            year: {
                                $year: "$invoiceDate"
                            },

                            month: {
                                $month: "$invoiceDate"
                            }

                        },

                        revenue: {
                            $sum: "$paymentReceived"
                        },

                        transactions: {
                            $sum: 1
                        }

                    }

                },

                {
                    $sort: {

                        "_id.year": 1,
                        "_id.month": 1

                    }

                }

            ]);


        // ============================================================
        // 7. FORMAT REVENUE DATA
        // ============================================================

        const formattedRevenueOverview =
            revenueOverview.map((item) => {

                const monthName =
                    new Date(
                        item._id.year,
                        item._id.month - 1,
                        1
                    ).toLocaleString(
                        "en-IN",
                        {
                            month: "short"
                        }
                    );


                return {

                    year: item._id.year,

                    month: item._id.month,

                    date:
                        `${monthName} ${item._id.year}`,

                    revenue: item.revenue,

                    transactions:
                        item.transactions

                };

            });


        // ============================================================
        // 8. EXPENSE OVERVIEW
        // ============================================================

        const expenseOverview =
            await ExpenseModel.aggregate([

                {
                    $match: {

                        gym: gymObjectId,

                        expenseDate: {
                            $gte: sixMonthsAgo,
                            $lte: currentMonthEnd
                        },

                        status: "active"

                    }

                },

                {
                    $group: {

                        _id: {

                            year: {
                                $year: "$expenseDate"
                            },

                            month: {
                                $month: "$expenseDate"
                            }

                        },

                        expenses: {
                            $sum: "$amount"
                        },

                        transactions: {
                            $sum: 1
                        }

                    }

                },

                {
                    $sort: {

                        "_id.year": 1,
                        "_id.month": 1

                    }

                }

            ]);


        // ============================================================
        // 9. FORMAT EXPENSE DATA
        // ============================================================

        const formattedExpenseOverview =
            expenseOverview.map((item) => {

                const monthName =
                    new Date(
                        item._id.year,
                        item._id.month - 1,
                        1
                    ).toLocaleString(
                        "en-IN",
                        {
                            month: "short"
                        }
                    );


                return {

                    year: item._id.year,

                    month: item._id.month,

                    date:
                        `${monthName} ${item._id.year}`,

                    expenses:
                        item.expenses,

                    transactions:
                        item.transactions

                };

            });


        // ============================================================
        // 10. CATEGORY BREAKDOWN
        // ============================================================

        const spendingCategories =
            await ExpenseModel.aggregate([

                {
                    $match: {

                        gym: gymObjectId,

                        expenseDate: {
                            $gte: currentMonthStart,
                            $lte: currentMonthEnd
                        },

                        status: "active"

                    }

                },

                {
                    $group: {

                        _id: "$category",

                        total: {
                            $sum: "$amount"
                        },

                        count: {
                            $sum: 1
                        }

                    }

                },

                {
                    $sort: {
                        total: -1
                    }

                }

            ]);


        const formattedCategories =
            spendingCategories.map((item) => ({

                category: item._id,

                total: item.total,

                count: item.count

            }));


        // ============================================================
        // 11. MEMBERS BY MEMBERSHIP PLAN
        // ============================================================

        const membersByPlan =
            await membersModel.aggregate([

                {
                    $match: {

                        gym: gymObjectId,

                        status: "active",

                        "membership.plan": {
                            $ne: null
                        }

                    }

                },

                {
                    $lookup: {

                        from: "membershipplans",

                        localField: "membership.plan",

                        foreignField: "_id",

                        as: "plan"

                    }

                },

                {
                    $unwind: {

                        path: "$plan",

                        preserveNullAndEmptyArrays: false

                    }

                },

                {
                    $group: {

                        _id: "$plan._id",

                        planName: {
                            $first: "$plan.name"
                        },

                        members: {
                            $sum: 1
                        }

                    }

                },

                {
                    $sort: {
                        members: -1
                    }

                }

            ]);


        // ============================================================
        // 12. TOTAL ACTIVE MEMBERS WITH PLAN
        // ============================================================

        const totalMembersWithPlan =
            membersByPlan.reduce(
                (sum, item) =>
                    sum + item.members,
                0
            );


        const formattedMembersByPlan =
            membersByPlan.map((item) => ({

                planId: item._id,

                planName: item.planName,

                members: item.members,

                percentage:
                    totalMembersWithPlan > 0
                        ? Number(
                            (
                                (item.members /
                                    totalMembersWithPlan) *
                                100
                            ).toFixed(1)
                        )
                        : 0

            }));


        // ============================================================
        // 13. UPCOMING MEMBERSHIP EXPIRIES
        // ============================================================

        const expiryLimit =
            new Date(
                now.getTime() +
                30 * 24 * 60 * 60 * 1000
            );


        const upcomingExpiries =
            await membersModel.find({

                gym: gymObjectId,

                status: "active",

                "membership.planEndDate": {

                    $gte: now,

                    $lte: expiryLimit

                }

            })

            .populate(
                "membership.plan",
                "name"
            )

            .sort({
                "membership.planEndDate": 1
            })

            .limit(10)

            .select(
                "fullName membership.plan membership.planEndDate"
            )

            .lean();


        const formattedExpiries =
            upcomingExpiries.map((member) => {

                const expiryDate =
                    new Date(
                        member.membership.planEndDate
                    );


                const millisecondsRemaining =
                    expiryDate.getTime() -
                    now.getTime();


                const daysRemaining =
                    Math.ceil(
                        millisecondsRemaining /
                        (
                            1000 *
                            60 *
                            60 *
                            24
                        )
                    );


                return {

                    memberId: member._id,

                    memberName:
                        member.fullName,

                    plan:
                        member.membership.plan?.name ||
                        "Unknown Plan",

                    expiryDate,

                    daysRemaining

                };

            });


        // ============================================================
        // 14. PRODUCT INFORMATION
        // ============================================================

        const productStock =
            await productModel.find({

                gym: gymObjectId

            })

            .sort({
                quantity: 1
            })

            .limit(10)

            .select(
                "name quantity price category status"
            )

            .lean();


        // ============================================================
        // 15. NET CASH FLOW
        // ============================================================

        const netCashFlow =
            monthlyRevenue -
            monthlyExpenses;


        // ============================================================
        // 16. RESPONSE
        // ============================================================

        return res.status(200).json({

            success: true,

            dashboard: {

                // ====================================================
                // KPI
                // ====================================================

                kpis: {

                    totalMembers: {

                        value:
                            totalMembers,

                        label:
                            "Total Members"

                    },


                    activeMemberships: {

                        value:
                            activeMembers,

                        label:
                            "Active Memberships"

                    },


                    monthlyRevenue: {

                        value:
                            monthlyRevenue,

                        percentage:
                            revenuePercentage,

                        label:
                            "This Month"

                    },


                    monthlyExpenses: {

                        value:
                            monthlyExpenses,

                        percentage:
                            expensePercentage,

                        label:
                            "This Month"

                    },


                    netCashFlow: {

                        value:
                            netCashFlow,

                        label:
                            "Revenue - Expenses"

                    }

                },


                // ====================================================
                // CHARTS
                // ====================================================

                revenueOverview:
                    formattedRevenueOverview,

                expenseOverview:
                    formattedExpenseOverview,

                spendingCategories:
                    formattedCategories,


                membersByPlan:
                    formattedMembersByPlan,


                // ====================================================
                // UPCOMING EXPIRIES
                // ====================================================

                membershipExpiries:
                    formattedExpiries,


                // ====================================================
                // PRODUCTS
                // ====================================================

                products: {

                    total:
                        totalProducts,

                    lowStock:
                        lowStockProducts,

                    outOfStock:
                        outOfStockProducts,

                    items:
                        productStock

                }

            }

        });

    }

    catch (error) {

        console.error(
            "ADMIN DASHBOARD ERROR:",
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
                "Unable to load dashboard"

        });

    }

};