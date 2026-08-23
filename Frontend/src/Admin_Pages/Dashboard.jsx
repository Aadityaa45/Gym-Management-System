// import react, { useEffect, useState } from 'react'
// import KPI_cards from '../components/Dashbaord_components/Kpi_cards';
// import { Users } from 'lucide-react';
// import { dashboardData } from '../assets/hardcoded_content.js/dummydahbaorddata';
// import RevenueChart from '../components/Dashbaord_components/Revenue_Chart';
// const Dashboard = () =>{
//     const [dashboardKPIData,setDashboardKPIData] = useState([])
//     const [revenueChartData,setRevenueChartData] = useState([])

//     useEffect(()=>{
//         setDashboardKPIData(dashboardData.stats)
//         setRevenueChartData(dashboardData.revenueChart)
//     },[])
//     return(
//         <div>
//             {/* kPI section */}
//             <div className='flex items-start justify-start gap-5 mt-5 ml-5'>
//                 {dashboardKPIData.map((item)=>(
//                     <KPI_cards
//                         key={item.id}
//                         title={item.title}
//                         numbers={item.number}
//                         percentage={item.percentage}
//                         color={item.color}
//                         chartData={item.trend}
//                     />
//                 ))}
//             </div>

//             {/* charts secttion */}
//             <div className='flex items-center justify-start gap-4 mt-5 ml-5'>
//                 <RevenueChart 
//                     total_revenue={"₹2,45,680"}
//                     percentage={15.7}
//                     revenueData={revenueChartData}
//                 />
//                 <RevenueChart 
//                     total_revenue={"₹2,45,680"}
//                     percentage={15.7}
//                     revenueData={revenueChartData}
//                 />
                
//             </div>
            
//         </div>
//     )
// }

// export default Dashboard;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import toast from "react-hot-toast";

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

//             const backendUrl =
//                 import.meta.env.VITE_BACKEND_URL;

//             const response = await axios.get(
//                 `${backendUrl}/api/admin/dashboard`,
//                 {
//                     withCredentials: true
//                 }
//             );

//             if (response.data.success) {

//                 setDashboard(
//                     response.data.dashboard
//                 );

//             }

//         } catch (error) {

//             console.error(
//                 "Dashboard fetch error:",
//                 error
//             );

//             toast.error(
//                 error.response?.data?.message ||
//                 "Failed to load dashboard"
//             );

//         } finally {

//             setLoading(false);

//         }

//     };

//     useEffect(() => {

//         fetchDashboard();

//     }, []);

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

//     if (!dashboard) {

//         return (
//             <div className="min-h-screen bg-[#050505] flex items-center justify-center">

//                 <p className="text-slate-400">
//                     Unable to load dashboard
//                 </p>

//             </div>
//         );

//     }

//     const {
//         kpis,
//         revenueOverview,
//         membersByPlan,
//         upcomingExpiries,
//         recentActivities,
//         productSales
//     } = dashboard;

//     return (

//         <div className="min-h-screen bg-[#050505] text-white p-5 md:p-7">

//             {/* ================================================= */}
//             {/* KPI SECTION */}
//             {/* ================================================= */}

//             <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

//                 <KPI_cards
//                     title="Total Members"
//                     numbers={kpis.totalMembers.toLocaleString("en-IN")}
//                     percentage={12.5}
//                     color="#8B5CF6"
//                     icon="👥"
//                     chartData={[]}
//                 />

//                 <KPI_cards
//                     title="Today's Attendance"
//                     numbers={kpis.todayAttendance.toLocaleString("en-IN")}
//                     percentage={8.4}
//                     color="#22C55E"
//                     icon="✓"
//                     chartData={[]}
//                 />

//                 <KPI_cards
//                     title="Monthly Revenue"
//                     numbers={`₹${Number(
//                         kpis.monthlyRevenue
//                     ).toLocaleString("en-IN")}`}
//                     percentage={
//                         revenueOverview.percentageChange
//                     }
//                     color="#F97316"
//                     icon="₹"
//                     chartData={
//                         revenueOverview.chart
//                     }
//                 />

//                 <KPI_cards
//                     title="Active Memberships"
//                     numbers={kpis.activeMemberships.toLocaleString("en-IN")}
//                     percentage={5.1}
//                     color="#06B6D4"
//                     icon="♛"
//                     chartData={[]}
//                 />

//             </div>


//             {/* ================================================= */}
//             {/* MAIN ANALYTICS */}
//             {/* ================================================= */}

//             <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 mt-5">

//                 <RevenueChart
//                     total_revenue={
//                         `₹${Number(
//                             revenueOverview.currentMonth
//                         ).toLocaleString("en-IN")}`
//                     }
//                     percentage={
//                         revenueOverview.percentageChange
//                     }
//                     revenueData={
//                         revenueOverview.chart
//                     }
//                 />

//                 <MembersByPlan
//                     data={membersByPlan}
//                 />

//             </div>


//             {/* ================================================= */}
//             {/* LOWER SECTION */}
//             {/* ================================================= */}

//             <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mt-5">

//                 <UpcomingExpiries
//                     data={upcomingExpiries}
//                 />

//                 <RecentActivities
//                     data={recentActivities}
//                 />

//                 <ProductSales
//                     data={productSales}
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
    Crown,
    IndianRupee,
    UserCheck,
    WalletCards,
    TrendingUp,
    ReceiptIndianRupee,
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

    const fetchDashboard = async () => {
        try {
            setLoading(true);

            const backendUrl = import.meta.env.VITE_BACKEND_URL;

            const response = await axios.get(
                `${backendUrl}/api/admin/dashboard`,
                {
                    withCredentials: true,
                }
            );

            if (response.data.success) {
                setDashboard(response.data.dashboard);
            }
        } catch (error) {
            console.error("Dashboard fetch error:", error);

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

    /* -------------------------------------------------------
       LOADING
    ------------------------------------------------------- */

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-4 border-red-500/20 border-t-red-500 rounded-full animate-spin" />

                    <p className="text-slate-400 text-sm">
                        Loading dashboard...
                    </p>
                </div>
            </div>
        );
    }

    /* -------------------------------------------------------
       ERROR
    ------------------------------------------------------- */

    if (!dashboard) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <p className="text-slate-400">
                    Unable to load dashboard
                </p>
            </div>
        );
    }

    /* -------------------------------------------------------
       BACKEND DATA
    ------------------------------------------------------- */

    const {
        kpis,
        revenueOverview = [],
        membersByPlan = [],
        membershipExpiries = [],
        products = {},
    } = dashboard;

    /* -------------------------------------------------------
       SAFE VALUES
    ------------------------------------------------------- */

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

    const netCashFlow =
        kpis?.netCashFlow?.value ?? 0;

    /* -------------------------------------------------------
       REVENUE CHART DATA
    ------------------------------------------------------- */

    const revenueChartData = revenueOverview.map(
        (item) => ({
            date: item.date,
            revenue: item.revenue,
        })
    );

    /* -------------------------------------------------------
       PRODUCT DATA
    ------------------------------------------------------- */

    const productItems = products?.items || [];

    return (
        <div className="min-h-screen bg-[#050505] text-white p-5 md:p-7">

            {/* =====================================================
                HEADER
            ===================================================== */}

            <div className="
                mb-6
                flex
                flex-col
                md:flex-row
                md:items-center
                md:justify-between
                gap-4
            ">

                <div>
                    <p className="
                        text-red-500
                        text-xs
                        uppercase
                        tracking-[0.25em]
                        font-semibold
                    ">
                        Gym Overview
                    </p>

                    <h1 className="
                        text-2xl
                        md:text-3xl
                        font-bold
                        text-white
                        mt-1
                    ">
                        Dashboard
                    </h1>

                    <p className="
                        text-sm
                        text-slate-500
                        mt-1
                    ">
                        Monitor your gym's performance and finances.
                    </p>
                </div>

                <div className="
                    flex
                    items-center
                    gap-2
                    px-4
                    py-2
                    rounded-xl
                    border
                    border-slate-800
                    bg-[#0B1220]
                ">
                    <div className="
                        w-2
                        h-2
                        rounded-full
                        bg-green-500
                        shadow-[0_0_10px_rgba(34,197,94,0.8)]
                    " />

                    <span className="
                        text-xs
                        text-slate-400
                    ">
                        System Operational
                    </span>
                </div>

            </div>


            {/* =====================================================
                KPI CARDS
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
                    color="#06B6D4"
                    icon={<UserCheck size={20} />}
                    chartData={[]}
                />

                <KPI_cards
                    title="Monthly Revenue"
                    numbers={`₹${monthlyRevenue.toLocaleString("en-IN")}`}
                    percentage={revenuePercentage}
                    color="#F97316"
                    icon={<IndianRupee size={20} />}
                    chartData={revenueChartData}
                />

                <KPI_cards
                    title="Monthly Expenses"
                    numbers={`₹${monthlyExpenses.toLocaleString("en-IN")}`}
                    percentage={100}
                    color="#EF4444"
                    icon={<ReceiptIndianRupee size={20} />}
                    chartData={[]}
                />

            </div>


            {/* =====================================================
                FINANCIAL SUMMARY
            ===================================================== */}

            <div className="
                grid
                grid-cols-1
                md:grid-cols-3
                gap-4
                mt-4
            ">

                <div className="
                    bg-[#0B1220]
                    border border-slate-800/80
                    rounded-2xl
                    p-4
                    flex
                    items-center
                    gap-4
                ">
                    <div className="
                        w-11
                        h-11
                        rounded-xl
                        bg-green-500/10
                        text-green-400
                        flex
                        items-center
                        justify-center
                    ">
                        <TrendingUp size={20} />
                    </div>

                    <div>
                        <p className="text-xs text-slate-500">
                            Revenue
                        </p>

                        <p className="text-lg font-bold text-white">
                            ₹{monthlyRevenue.toLocaleString("en-IN")}
                        </p>
                    </div>
                </div>


                <div className="
                    bg-[#0B1220]
                    border border-slate-800/80
                    rounded-2xl
                    p-4
                    flex
                    items-center
                    gap-4
                ">
                    <div className="
                        w-11
                        h-11
                        rounded-xl
                        bg-red-500/10
                        text-red-400
                        flex
                        items-center
                        justify-center
                    ">
                        <WalletCards size={20} />
                    </div>

                    <div>
                        <p className="text-xs text-slate-500">
                            Expenses
                        </p>

                        <p className="text-lg font-bold text-white">
                            ₹{monthlyExpenses.toLocaleString("en-IN")}
                        </p>
                    </div>
                </div>


                <div className="
                    bg-[#0B1220]
                    border border-slate-800/80
                    rounded-2xl
                    p-4
                    flex
                    items-center
                    gap-4
                ">
                    <div className={`
                        w-11
                        h-11
                        rounded-xl
                        flex
                        items-center
                        justify-center
                        ${
                            netCashFlow >= 0
                                ? "bg-green-500/10 text-green-400"
                                : "bg-red-500/10 text-red-400"
                        }
                    `}>
                        <IndianRupee size={20} />
                    </div>

                    <div>
                        <p className="text-xs text-slate-500">
                            Net Cash Flow
                        </p>

                        <p className={`
                            text-lg
                            font-bold
                            ${
                                netCashFlow >= 0
                                    ? "text-green-400"
                                    : "text-red-400"
                            }
                        `}>
                            ₹{netCashFlow.toLocaleString("en-IN")}
                        </p>
                    </div>
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
                mt-4
            ">

                {/* Revenue = 3 columns */}

                <div className="xl:col-span-3">
                    <RevenueChart
                        total_revenue={`₹${monthlyRevenue.toLocaleString(
                            "en-IN"
                        )}`}
                        percentage={revenuePercentage}
                        revenueData={revenueChartData}
                    />
                </div>


                {/* Members Plan = 2 columns */}

                <div className="xl:col-span-2">
                    <MembersByPlan
                        data={membersByPlan}
                    />
                </div>

            </div>


            {/* =====================================================
                LOWER SECTION
            ===================================================== */}

            <div className="
                grid
                grid-cols-1
                lg:grid-cols-3
                gap-4
                mt-4
            ">

                <UpcomingExpiries
                    data={membershipExpiries}
                />

                <RecentActivities
                    data={dashboard.recentActivities || []}
                />

                <ProductSales
                    data={productItems}
                />

            </div>

        </div>
    );
};

export default Dashboard;