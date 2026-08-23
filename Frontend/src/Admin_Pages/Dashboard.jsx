// // import react, { useEffect, useState } from 'react'
// // import KPI_cards from '../components/Dashbaord_components/Kpi_cards';
// // import { Users } from 'lucide-react';
// // import { dashboardData } from '../assets/hardcoded_content.js/dummydahbaorddata';
// // import RevenueChart from '../components/Dashbaord_components/Revenue_Chart';
// // const Dashboard = () =>{
// //     const [dashboardKPIData,setDashboardKPIData] = useState([])
// //     const [revenueChartData,setRevenueChartData] = useState([])

// //     useEffect(()=>{
// //         setDashboardKPIData(dashboardData.stats)
// //         setRevenueChartData(dashboardData.revenueChart)
// //     },[])
// //     return(
// //         <div>
// //             {/* kPI section */}
// //             <div className='flex items-start justify-start gap-5 mt-5 ml-5'>
// //                 {dashboardKPIData.map((item)=>(
// //                     <KPI_cards
// //                         key={item.id}
// //                         title={item.title}
// //                         numbers={item.number}
// //                         percentage={item.percentage}
// //                         color={item.color}
// //                         chartData={item.trend}
// //                     />
// //                 ))}
// //             </div>

// //             {/* charts secttion */}
// //             <div className='flex items-center justify-start gap-4 mt-5 ml-5'>
// //                 <RevenueChart 
// //                     total_revenue={"₹2,45,680"}
// //                     percentage={15.7}
// //                     revenueData={revenueChartData}
// //                 />
// //                 <RevenueChart 
// //                     total_revenue={"₹2,45,680"}
// //                     percentage={15.7}
// //                     revenueData={revenueChartData}
// //                 />
                
// //             </div>
            
// //         </div>
// //     )
// // }

// // export default Dashboard;

// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import toast from "react-hot-toast";

// // import KPI_cards from "../components/Dashbaord_components/Kpi_cards";
// // import RevenueChart from "../components/Dashbaord_components/Revenue_Chart";
// // import MembersByPlan from "../components/Dashbaord_components/Members_By_Plan";
// // import RecentActivities from "../components/Dashbaord_components/recent_activities";
// // import ProductSales from "../components/Dashbaord_components/product_sales";
// // import UpcomingExpiries from "../components/Dashbaord_components/upcoming_expiries";

// // const Dashboard = () => {

// //     const [dashboard, setDashboard] = useState(null);

// //     const [loading, setLoading] = useState(true);

// //     const fetchDashboard = async () => {

// //         try {

// //             setLoading(true);

// //             const backendUrl =
// //                 import.meta.env.VITE_BACKEND_URL;

// //             const response = await axios.get(
// //                 `${backendUrl}/api/admin/dashboard`,
// //                 {
// //                     withCredentials: true
// //                 }
// //             );

// //             if (response.data.success) {

// //                 setDashboard(
// //                     response.data.dashboard
// //                 );

// //             }

// //         } catch (error) {

// //             console.error(
// //                 "Dashboard fetch error:",
// //                 error
// //             );

// //             toast.error(
// //                 error.response?.data?.message ||
// //                 "Failed to load dashboard"
// //             );

// //         } finally {

// //             setLoading(false);

// //         }

// //     };

// //     useEffect(() => {

// //         fetchDashboard();

// //     }, []);

// //     if (loading) {

// //         return (
// //             <div className="min-h-screen bg-[#050505] flex items-center justify-center">

// //                 <div className="flex flex-col items-center gap-4">

// //                     <div className="w-10 h-10 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin" />

// //                     <p className="text-slate-400 text-sm">
// //                         Loading dashboard...
// //                     </p>

// //                 </div>

// //             </div>
// //         );

// //     }

// //     if (!dashboard) {

// //         return (
// //             <div className="min-h-screen bg-[#050505] flex items-center justify-center">

// //                 <p className="text-slate-400">
// //                     Unable to load dashboard
// //                 </p>

// //             </div>
// //         );

// //     }

// //     const {
// //         kpis,
// //         revenueOverview,
// //         membersByPlan,
// //         upcomingExpiries,
// //         recentActivities,
// //         productSales
// //     } = dashboard;

// //     return (

// //         <div className="min-h-screen bg-[#050505] text-white p-5 md:p-7">

// //             {/* ================================================= */}
// //             {/* KPI SECTION */}
// //             {/* ================================================= */}

// //             <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

// //                 <KPI_cards
// //                     title="Total Members"
// //                     numbers={kpis.totalMembers.toLocaleString("en-IN")}
// //                     percentage={12.5}
// //                     color="#8B5CF6"
// //                     icon="👥"
// //                     chartData={[]}
// //                 />

// //                 <KPI_cards
// //                     title="Today's Attendance"
// //                     numbers={kpis.todayAttendance.toLocaleString("en-IN")}
// //                     percentage={8.4}
// //                     color="#22C55E"
// //                     icon="✓"
// //                     chartData={[]}
// //                 />

// //                 <KPI_cards
// //                     title="Monthly Revenue"
// //                     numbers={`₹${Number(
// //                         kpis.monthlyRevenue
// //                     ).toLocaleString("en-IN")}`}
// //                     percentage={
// //                         revenueOverview.percentageChange
// //                     }
// //                     color="#F97316"
// //                     icon="₹"
// //                     chartData={
// //                         revenueOverview.chart
// //                     }
// //                 />

// //                 <KPI_cards
// //                     title="Active Memberships"
// //                     numbers={kpis.activeMemberships.toLocaleString("en-IN")}
// //                     percentage={5.1}
// //                     color="#06B6D4"
// //                     icon="♛"
// //                     chartData={[]}
// //                 />

// //             </div>


// //             {/* ================================================= */}
// //             {/* MAIN ANALYTICS */}
// //             {/* ================================================= */}

// //             <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-5">

// //                 <RevenueChart
// //                     total_revenue={
// //                         `₹${Number(
// //                             revenueOverview.currentMonth
// //                         ).toLocaleString("en-IN")}`
// //                     }
// //                     percentage={
// //                         revenueOverview.percentageChange
// //                     }
// //                     revenueData={
// //                         revenueOverview.chart
// //                     }
// //                 />

// //                 <MembersByPlan
// //                     data={membersByPlan}
// //                 />

// //             </div>


// //             {/* ================================================= */}
// //             {/* LOWER SECTION */}
// //             {/* ================================================= */}

// //             <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mt-5">

// //                 <UpcomingExpiries
// //                     data={upcomingExpiries}
// //                 />

// //                 <RecentActivities
// //                     data={recentActivities}
// //                 />

// //                 <ProductSales
// //                     data={productSales}
// //                 />

// //             </div>

// //         </div>

// //     );

// // };

// // export default Dashboard;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

// import {
//     Users,
//     Crown,
//     IndianRupee,
//     UserCheck,
//     WalletCards,
//     TrendingUp,
//     ReceiptIndianRupee,
// } from "lucide-react";

// import KPI_cards from "../components/Dashbaord_components/Kpi_cards";
// import RevenueChart from "../components/Dashbaord_components/Revenue_Chart";
// import MembersByPlan from "../components/Dashbaord_components/Members_By_Plan";
// import RecentActivities from "../components/Dashbaord_components/recent_activities";
// import ProductSales from "../components/Dashbaord_components/product_sales";
// import UpcomingExpiries from "../components/Dashbaord_components/upcoming_expiries";

// const Dashboard = () => {
//     const [dashboard, setDashboard] = useState(null);
//     const [loading, setLoading] = useState(true);

//     const fetchDashboard = async () => {
//         try {
//             setLoading(true);

//             const backendUrl = import.meta.env.VITE_BACKEND_URL;

//             const response = await axios.get(
//                 `${backendUrl}/api/admin/dashboard`,
//                 {
//                     withCredentials: true,
//                 }
//             );

//             if (response.data.success) {
//                 setDashboard(response.data.dashboard);
//             }
//         } catch (error) {
//             console.error("Dashboard fetch error:", error);

//             toast.error(
//                 error.response?.data?.message ||
//                     "Failed to load dashboard"
//             );
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchDashboard();
//     }, []);

//     /* -------------------------------------------------------
//        LOADING
//     ------------------------------------------------------- */

//     if (loading) {
//         return (
//             <div className="min-h-screen bg-[#050505] flex items-center justify-center">
//                 <div className="flex flex-col items-center gap-4">
//                     <div className="w-10 h-10 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin" />

//                     <p className="text-slate-400 text-sm">
//                         Loading dashboard...
//                     </p>
//                 </div>
//             </div>
//         );
//     }

//     /* -------------------------------------------------------
//        ERROR
//     ------------------------------------------------------- */

//     if (!dashboard) {
//         return (
//             <div className="min-h-screen bg-[#050505] flex items-center justify-center">
//                 <p className="text-slate-400">
//                     Unable to load dashboard
//                 </p>
//             </div>
//         );
//     }

//     /* -------------------------------------------------------
//        BACKEND DATA
//     ------------------------------------------------------- */

//     const {
//         kpis,
//         revenueOverview = [],
//         membersByPlan = [],
//         membershipExpiries = [],
//         products = {},
//     } = dashboard;

//     /* -------------------------------------------------------
//        SAFE VALUES
//     ------------------------------------------------------- */

//     const totalMembers =
//         kpis?.totalMembers?.value ?? 0;

//     const activeMemberships =
//         kpis?.activeMemberships?.value ?? 0;

//     const monthlyRevenue =
//         kpis?.monthlyRevenue?.value ?? 0;

//     const revenuePercentage =
//         kpis?.monthlyRevenue?.percentage ?? 0;

//     const monthlyExpenses =
//         kpis?.monthlyExpenses?.value ?? 0;

//     const netCashFlow =
//         kpis?.netCashFlow?.value ?? 0;

//     /* -------------------------------------------------------
//        REVENUE CHART DATA
//     ------------------------------------------------------- */

//     const revenueChartData = revenueOverview.map(
//         (item) => ({
//             date: item.date,
//             revenue: item.revenue,
//         })
//     );

//     /* -------------------------------------------------------
//        PRODUCT DATA
//     ------------------------------------------------------- */

//     const productItems = products?.items || [];

//     return (
//         <div className="min-h-screen bg-[#050505] text-white p-5 md:p-7">

//             {/* =====================================================
//                 HEADER
//             ===================================================== */}

//             <div className="
//                 mb-6
//                 flex
//                 flex-col
//                 md:flex-row
//                 md:items-center
//                 md:justify-between
//                 gap-4
//             ">

//                 <div>
//                     <p className="
//                         text-red-500
//                         text-xs
//                         uppercase
//                         tracking-[0.25em]
//                         font-semibold
//                     ">
//                         Gym Overview
//                     </p>

//                     <h1 className="
//                         text-2xl
//                         md:text-3xl
//                         font-bold
//                         text-white
//                         mt-1
//                     ">
//                         Dashboard
//                     </h1>

//                     <p className="
//                         text-sm
//                         text-slate-500
//                         mt-1
//                     ">
//                         Monitor your gym's performance and finances.
//                     </p>
//                 </div>

//                 <div className="
//                     flex
//                     items-center
//                     gap-2
//                     px-4
//                     py-2
//                     rounded-xl
//                     border
//                     border-slate-800
//                     bg-[#0B1220]
//                 ">
//                     <div className="
//                         w-2
//                         h-2
//                         rounded-full
//                         bg-green-500
//                         shadow-[0_0_10px_rgba(34,197,94,0.8)]
//                     " />

//                     <span className="
//                         text-xs
//                         text-slate-400
//                     ">
//                         System Operational
//                     </span>
//                 </div>

//             </div>


//             {/* =====================================================
//                 KPI CARDS
//             ===================================================== */}

//             <div className="
//                 grid
//                 grid-cols-1
//                 sm:grid-cols-2
//                 xl:grid-cols-4
//                 gap-4
//             ">

//                 <KPI_cards
//                     title="Total Members"
//                     numbers={totalMembers.toLocaleString("en-IN")}
//                     percentage={12.5}
//                     color="#8B5CF6"
//                     icon={<Users size={20} />}
//                     chartData={[]}
//                 />

//                 <KPI_cards
//                     title="Active Memberships"
//                     numbers={activeMemberships.toLocaleString("en-IN")}
//                     percentage={5.1}
//                     color="#06B6D4"
//                     icon={<UserCheck size={20} />}
//                     chartData={[]}
//                 />

//                 <KPI_cards
//                     title="Monthly Revenue"
//                     numbers={`₹${monthlyRevenue.toLocaleString("en-IN")}`}
//                     percentage={revenuePercentage}
//                     color="#F97316"
//                     icon={<IndianRupee size={20} />}
//                     chartData={revenueChartData}
//                 />

//                 <KPI_cards
//                     title="Monthly Expenses"
//                     numbers={`₹${monthlyExpenses.toLocaleString("en-IN")}`}
//                     percentage={100}
//                     color="#EF4444"
//                     icon={<ReceiptIndianRupee size={20} />}
//                     chartData={[]}
//                 />

//             </div>


//             {/* =====================================================
//                 FINANCIAL SUMMARY
//             ===================================================== */}

//             <div className="
//                 grid
//                 grid-cols-1
//                 md:grid-cols-3
//                 gap-4
//                 mt-4
//             ">

//                 <div className="
//                     bg-[#0B1220]
//                     border border-slate-800/80
//                     rounded-2xl
//                     p-4
//                     flex
//                     items-center
//                     gap-4
//                 ">
//                     <div className="
//                         w-11
//                         h-11
//                         rounded-xl
//                         bg-green-500/10
//                         text-green-400
//                         flex
//                         items-center
//                         justify-center
//                     ">
//                         <TrendingUp size={20} />
//                     </div>

//                     <div>
//                         <p className="text-xs text-slate-500">
//                             Revenue
//                         </p>

//                         <p className="text-lg font-bold text-white">
//                             ₹{monthlyRevenue.toLocaleString("en-IN")}
//                         </p>
//                     </div>
//                 </div>


//                 <div className="
//                     bg-[#0B1220]
//                     border border-slate-800/80
//                     rounded-2xl
//                     p-4
//                     flex
//                     items-center
//                     gap-4
//                 ">
//                     <div className="
//                         w-11
//                         h-11
//                         rounded-xl
//                         bg-red-500/10
//                         text-red-400
//                         flex
//                         items-center
//                         justify-center
//                     ">
//                         <WalletCards size={20} />
//                     </div>

//                     <div>
//                         <p className="text-xs text-slate-500">
//                             Expenses
//                         </p>

//                         <p className="text-lg font-bold text-white">
//                             ₹{monthlyExpenses.toLocaleString("en-IN")}
//                         </p>
//                     </div>
//                 </div>


//                 <div className="
//                     bg-[#0B1220]
//                     border border-slate-800/80
//                     rounded-2xl
//                     p-4
//                     flex
//                     items-center
//                     gap-4
//                 ">
//                     <div className={`
//                         w-11
//                         h-11
//                         rounded-xl
//                         flex
//                         items-center
//                         justify-center
//                         ${
//                             netCashFlow >= 0
//                                 ? "bg-green-500/10 text-green-400"
//                                 : "bg-red-500/10 text-red-400"
//                         }
//                     `}>
//                         <IndianRupee size={20} />
//                     </div>

//                     <div>
//                         <p className="text-xs text-slate-500">
//                             Net Cash Flow
//                         </p>

//                         <p className={`
//                             text-lg
//                             font-bold
//                             ${
//                                 netCashFlow >= 0
//                                     ? "text-green-400"
//                                     : "text-red-400"
//                             }
//                         `}>
//                             ₹{netCashFlow.toLocaleString("en-IN")}
//                         </p>
//                     </div>
//                 </div>

//             </div>


//             {/* =====================================================
//                 MAIN ANALYTICS
//             ===================================================== */}

//             <div className="
//                 grid
//                 grid-cols-1
//                 xl:grid-cols-5
//                 gap-4
//                 mt-4
//             ">

//                 {/* Revenue = 3 columns */}

//                 <div className="xl:col-span-3">
//                     <RevenueChart
//                         total_revenue={`₹${monthlyRevenue.toLocaleString(
//                             "en-IN"
//                         )}`}
//                         percentage={revenuePercentage}
//                         revenueData={revenueChartData}
//                     />
//                 </div>


//                 {/* Members Plan = 2 columns */}

//                 <div className="xl:col-span-2">
//                     <MembersByPlan
//                         data={membersByPlan}
//                     />
//                 </div>

//             </div>


//             {/* =====================================================
//                 LOWER SECTION
//             ===================================================== */}

//             <div className="
//                 grid
//                 grid-cols-1
//                 lg:grid-cols-3
//                 gap-4
//                 mt-4
//             ">

//                 <UpcomingExpiries
//                     data={membershipExpiries}
//                 />

//                 <RecentActivities
//                     data={dashboard.recentActivities || []}
//                 />

//                 <ProductSales
//                     data={productItems}
//                 />

//             </div>

//         </div>
//     );
// };

// export default Dashboard;
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import {
Users,
IndianRupee,
UserCheck,
TrendingUp,
ReceiptIndianRupee,
WalletCards,
ArrowDownRight,
ArrowUpRight,
Activity,
} from "lucide-react";

import KPI_cards from "../components/Dashbaord_components/Kpi_cards";
import RevenueChart from "../components/Dashbaord_components/Revenue_Chart";
import MembersByPlan from "../components/Dashbaord_components/Members_By_Plan";
import RecentActivities from "../components/Dashbaord_components/recent_activities";
import ProductSales from "../components/Dashbaord_components/product_sales";
import UpcomingExpiries from "../components/Dashbaord_components/upcoming_expiries";

const Dashboard = () => {


const [dashboard, setDashboard] = useState(null);

const [loading, setLoading] = useState(true);


/* =========================================================
    FETCH DASHBOARD
========================================================= */

const fetchDashboard = async () => {

    try {

        setLoading(true);

        const backendUrl =
            import.meta.env.VITE_BACKEND_URL;


        const response = await axios.get(
            `${backendUrl}/api/admin/dashboard`,
            {
                withCredentials: true,
            }
        );


        if (response.data.success) {

            setDashboard(
                response.data.dashboard
            );

        }

    } catch (error) {

        console.error(
            "Dashboard fetch error:",
            error
        );


        toast.error(
            error.response?.data?.message ||
            "Failed to load dashboard"
        );

    } finally {

        setLoading(false);

    }

};


useEffect(() => {

    fetchDashboard();

}, []);


/* =========================================================
    LOADING
========================================================= */

if (loading) {

    return (

        <div className="
            min-h-screen
            bg-[#090807]
            flex
            items-center
            justify-center
        ">

            <div className="
                flex
                flex-col
                items-center
                gap-4
            ">

                <div className="
                    relative
                    w-11
                    h-11
                ">

                    <div className="
                        absolute
                        inset-0
                        rounded-full
                        border-2
                        border-[#2A2421]
                    " />

                    <div className="
                        absolute
                        inset-0
                        rounded-full
                        border-2
                        border-transparent
                        border-t-[#EF1616]
                        animate-spin
                    " />

                </div>


                <div className="text-center">

                    <p className="
                        text-sm
                        font-medium
                        text-[#F4F1EE]
                    ">
                        Loading Dashboard
                    </p>

                    <p className="
                        text-xs
                        text-[#706863]
                        mt-1
                    ">
                        Fetching your gym insights...
                    </p>

                </div>

            </div>

        </div>

    );

}


/* =========================================================
    ERROR STATE
========================================================= */

if (!dashboard) {

    return (

        <div className="
            min-h-screen
            bg-[#090807]
            flex
            items-center
            justify-center
            p-5
        ">

            <div className="
                w-full
                max-w-md
                bg-[#11100F]
                border
                border-[#2A2421]
                rounded-2xl
                p-8
                text-center
            ">

                <div className="
                    w-12
                    h-12
                    mx-auto
                    rounded-xl
                    bg-[#EF1616]/10
                    border
                    border-[#EF1616]/20
                    flex
                    items-center
                    justify-center
                    text-[#EF4444]
                ">
                    <Activity size={22} />
                </div>


                <h2 className="
                    text-[#F4F1EE]
                    font-semibold
                    text-lg
                    mt-4
                ">
                    Unable to load dashboard
                </h2>


                <p className="
                    text-sm
                    text-[#706863]
                    mt-2
                ">
                    We couldn't retrieve your gym data right now.
                </p>


                <button
                    onClick={fetchDashboard}
                    className="
                        mt-5
                        px-5
                        py-2.5
                        rounded-xl
                        bg-[#EF1616]
                        hover:bg-[#D90F0F]
                        text-white
                        text-sm
                        font-semibold
                        transition
                    "
                >
                    Try Again
                </button>

            </div>

        </div>

    );

}


/* =========================================================
    BACKEND DATA
========================================================= */

const {

    kpis,

    revenueOverview = [],

    membersByPlan = [],

    membershipExpiries = [],

    products = {},

} = dashboard;


/* =========================================================
    SAFE KPI VALUES
========================================================= */

const totalMembers =
    kpis?.totalMembers?.value ?? 0;


const activeMemberships =
    kpis?.activeMemberships?.value ?? 0;


const monthlyRevenue =
    kpis?.monthlyRevenue?.value ?? 0;


const revenuePercentage =
    kpis?.monthlyRevenue?.percentage ?? 0;


const monthlyExpenses =
    kpis?.monthlyExpenses?.value ?? 0;


const expensePercentage =
    kpis?.monthlyExpenses?.percentage ?? 0;


const netCashFlow =
    kpis?.netCashFlow?.value ?? 0;


/* =========================================================
    REVENUE CHART DATA
========================================================= */

const revenueChartData =
    revenueOverview.map((item) => ({

        date: item.date,

        revenue: item.revenue,

    }));


/* =========================================================
    PRODUCT DATA
========================================================= */

const productItems =
    products?.items || [];


/* =========================================================
    FINANCIAL SUMMARY CARD
========================================================= */

const FinancialCard = ({
    title,
    value,
    icon,
    type = "neutral",
    subtitle,
}) => {

    const styles = {

        revenue: {

            icon:
                "bg-green-500/10 text-green-400 border-green-500/15",

            value:
                "text-[#F4F1EE]",

        },


        expense: {

            icon:
                "bg-red-500/10 text-red-400 border-red-500/15",

            value:
                "text-[#F4F1EE]",

        },


        positive: {

            icon:
                "bg-green-500/10 text-green-400 border-green-500/15",

            value:
                "text-green-400",

        },


        negative: {

            icon:
                "bg-red-500/10 text-red-400 border-red-500/15",

            value:
                "text-red-400",

        },


        neutral: {

            icon:
                "bg-white/5 text-[#A69B94] border-white/5",

            value:
                "text-[#F4F1EE]",

        },

    };


    const currentStyle =
        styles[type] || styles.neutral;


    return (

        <div className="
            group
            relative
            overflow-hidden
            bg-[#11100F]
            border
            border-[#2A2421]
            rounded-2xl
            px-5
            py-4
            transition-all
            duration-300
            hover:border-[#3B302C]
            hover:-translate-y-[2px]
        ">

            {/* subtle top highlight */}

            <div className="
                absolute
                top-0
                left-0
                right-0
                h-px
                bg-gradient-to-r
                from-transparent
                via-white/10
                to-transparent
            " />


            <div className="
                flex
                items-center
                gap-4
            ">

                <div className={`
                    w-11
                    h-11
                    shrink-0
                    rounded-xl
                    border
                    flex
                    items-center
                    justify-center
                    ${currentStyle.icon}
                `}>
                    {icon}
                </div>


                <div className="
                    min-w-0
                    flex-1
                ">

                    <p className="
                        text-[11px]
                        uppercase
                        tracking-[0.14em]
                        text-[#706863]
                        font-semibold
                    ">
                        {title}
                    </p>


                    <p className={`
                        text-xl
                        font-bold
                        tracking-tight
                        mt-1
                        ${currentStyle.value}
                    `}>
                        {value}
                    </p>


                    {subtitle && (

                        <p className="
                            text-[11px]
                            text-[#706863]
                            mt-1
                        ">
                            {subtitle}
                        </p>

                    )}

                </div>

            </div>

        </div>

    );

};


return (

    <div className="
        min-h-screen
        bg-[#090807]
        text-[#F4F1EE]
    ">


        {/* =====================================================
            DASHBOARD CONTENT WRAPPER
        ===================================================== */}

        <div className="
            max-w-[1700px]
            mx-auto
            p-5
            md:p-7
            lg:p-8
        ">


            {/* =====================================================
                PAGE HEADER
            ===================================================== */}

            <div className="
                flex
                flex-col
                lg:flex-row
                lg:items-end
                lg:justify-between
                gap-5
                mb-7
                pb-6
                border-b
                border-[#211C1A]
            ">


                {/* Left */}

                <div>

                    <div className="
                        flex
                        items-center
                        gap-3
                    ">

                        <div className="
                            h-px
                            w-8
                            bg-[#EF1616]
                        " />

                        <p className="
                            text-[#EF4444]
                            text-[10px]
                            uppercase
                            tracking-[0.32em]
                            font-bold
                        ">
                            Gym Overview
                        </p>

                    </div>


                    <h1 className="
                        text-3xl
                        md:text-4xl
                        font-bold
                        tracking-tight
                        text-[#F4F1EE]
                        mt-3
                    ">
                        Dashboard
                    </h1>


                    <p className="
                        text-sm
                        md:text-[15px]
                        text-[#8D827B]
                        mt-2
                    ">
                        Monitor your gym's performance, memberships,
                        revenue and sales.
                    </p>

                </div>


                {/* System Status */}

                <div className="
                    inline-flex
                    items-center
                    self-start
                    lg:self-auto
                    gap-3
                    px-4
                    py-2.5
                    rounded-xl
                    bg-[#11100F]
                    border
                    border-[#2A2421]
                ">

                    <div className="
                        relative
                        flex
                        items-center
                        justify-center
                        w-4
                        h-4
                    ">

                        <span className="
                            absolute
                            w-2
                            h-2
                            rounded-full
                            bg-green-500
                            animate-ping
                            opacity-50
                        " />

                        <span className="
                            relative
                            w-2
                            h-2
                            rounded-full
                            bg-green-500
                            shadow-[0_0_10px_rgba(34,197,94,0.8)]
                        " />

                    </div>


                    <div>

                        <p className="
                            text-[10px]
                            uppercase
                            tracking-[0.16em]
                            text-[#706863]
                            font-semibold
                        ">
                            System Status
                        </p>

                        <p className="
                            text-xs
                            text-[#C7BDB7]
                            mt-0.5
                        ">
                            All systems operational
                        </p>

                    </div>

                </div>

            </div>


            {/* =====================================================
                KPI SECTION
            ===================================================== */}

            <div className="
                grid
                grid-cols-1
                sm:grid-cols-2
                xl:grid-cols-4
                gap-4
            ">

                <KPI_cards
                    title="Total Members"
                    numbers={totalMembers.toLocaleString("en-IN")}
                    percentage={12.5}
                    color="#8B5CF6"
                    icon={<Users size={20} />}
                    chartData={[]}
                />


                <KPI_cards
                    title="Active Memberships"
                    numbers={activeMemberships.toLocaleString("en-IN")}
                    percentage={5.1}
                    color="#22C55E"
                    icon={<UserCheck size={20} />}
                    chartData={[]}
                />


                <KPI_cards
                    title="Monthly Revenue"
                    numbers={`₹${monthlyRevenue.toLocaleString("en-IN")}`}
                    percentage={revenuePercentage}
                    color="#EF7A22"
                    icon={<IndianRupee size={20} />}
                    chartData={revenueChartData}
                />


                <KPI_cards
                    title="Monthly Expenses"
                    numbers={`₹${monthlyExpenses.toLocaleString("en-IN")}`}
                    percentage={expensePercentage}
                    color="#EF4444"
                    icon={<ReceiptIndianRupee size={20} />}
                    chartData={[]}
                />

            </div>


            {/* =====================================================
                FINANCIAL SNAPSHOT
            ===================================================== */}

            <div className="
                mt-7
            ">

                <div className="
                    flex
                    items-center
                    justify-between
                    mb-3
                ">

                    <div>

                        <p className="
                            text-[10px]
                            uppercase
                            tracking-[0.22em]
                            text-[#EF4444]
                            font-bold
                        ">
                            Financial Snapshot
                        </p>

                        <h2 className="
                            text-lg
                            font-semibold
                            text-[#F4F1EE]
                            mt-1
                        ">
                            This Month
                        </h2>

                    </div>

                </div>


                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-3
                    gap-4
                ">

                    <FinancialCard
                        title="Revenue"
                        value={`₹${monthlyRevenue.toLocaleString("en-IN")}`}
                        icon={<TrendingUp size={20} />}
                        type="revenue"
                        subtitle="Total amount received"
                    />


                    <FinancialCard
                        title="Expenses"
                        value={`₹${monthlyExpenses.toLocaleString("en-IN")}`}
                        icon={<WalletCards size={20} />}
                        type="expense"
                        subtitle="Total recorded expenses"
                    />


                    <FinancialCard
                        title="Net Cash Flow"
                        value={`${netCashFlow < 0 ? "-" : ""}₹${Math.abs(
                            netCashFlow
                        ).toLocaleString("en-IN")}`}
                        icon={
                            netCashFlow >= 0
                                ? <ArrowUpRight size={20} />
                                : <ArrowDownRight size={20} />
                        }
                        type={
                            netCashFlow >= 0
                                ? "positive"
                                : "negative"
                        }
                        subtitle={
                            netCashFlow >= 0
                                ? "Positive cash flow"
                                : "Expenses exceed revenue"
                        }
                    />

                </div>

            </div>


            {/* =====================================================
                MAIN ANALYTICS
            ===================================================== */}

            <div className="
                grid
                grid-cols-1
                xl:grid-cols-5
                gap-4
                mt-7
            ">


                {/* Revenue */}

                <div className="
                    xl:col-span-3
                ">

                    <RevenueChart
                        total_revenue={`₹${monthlyRevenue.toLocaleString(
                            "en-IN"
                        )}`}
                        percentage={revenuePercentage}
                        revenueData={revenueChartData}
                    />

                </div>


                {/* Membership Distribution */}

                <div className="
                    xl:col-span-2
                ">

                    <MembersByPlan
                        data={membersByPlan}
                    />

                </div>

            </div>


            {/* =====================================================
                LOWER INSIGHTS
            ===================================================== */}

            <div className="
                mt-7
            ">

                <div className="
                    mb-3
                ">

                    <p className="
                        text-[10px]
                        uppercase
                        tracking-[0.22em]
                        text-[#EF4444]
                        font-bold
                    ">
                        Gym Insights
                    </p>

                    <h2 className="
                        text-lg
                        font-semibold
                        text-[#F4F1EE]
                        mt-1
                    ">
                        Recent Activity & Operations
                    </h2>

                </div>


                <div className="
                    grid
                    grid-cols-1
                    lg:grid-cols-3
                    gap-4
                ">

                    <UpcomingExpiries
                        data={membershipExpiries}
                    />


                    <RecentActivities
                        data={
                            dashboard.recentActivities || []
                        }
                    />


                    <ProductSales
                        data={productItems}
                    />

                </div>

            </div>


            {/* Bottom Space */}

            <div className="h-5" />

        </div>

    </div>

);


};

export default Dashboard;
