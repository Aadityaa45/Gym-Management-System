// // import React from "react";
// // import {
// //   ResponsiveContainer,
// //   AreaChart,
// //   Area,
// //   XAxis,
// //   YAxis,
// //   Tooltip,
// // } from "recharts";


// // const RevenueChart = ({total_revenue,percentage,revenueData}) => {
// //   return (
// //     <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 w-full">
      
// //       {/* Header */}
// //       <div className="flex items-center justify-between mb-6">
// //         <h2 className="text-white text-lg font-semibold">
// //           Revenue Overview
// //         </h2>

// //         <select className="bg-[#111827] border border-slate-700 text-slate-300 rounded-lg px-3 py-2 text-sm outline-none">
// //           <option>This Month</option>
// //           <option>Last Month</option>
// //           <option>This Year</option>
// //         </select>
// //       </div>

// //       {/* Revenue */}
// //       <div className="mb-5">
// //         <h1 className="text-white text-4xl font-bold">
// //           {total_revenue}
// //         </h1>

// //         <p className="text-green-500 text-sm mt-2">
// //           {`↑ ${percentage}% from last month`}
// //         </p>
// //       </div>

// //       {/* Chart */}
// //       <div className="h-[180px]">
// //         <ResponsiveContainer width="100%" height="100%">
// //           <AreaChart data={revenueData}>
            
// //             <defs>
// //               <linearGradient
// //                 id="revenueGradient"
// //                 x1="0"
// //                 y1="0"
// //                 x2="0"
// //                 y2="1"
// //               >
// //                 <stop
// //                   offset="5%"
// //                   stopColor="#8B5CF6"
// //                   stopOpacity={0.5}
// //                 />
// //                 <stop
// //                   offset="95%"
// //                   stopColor="#8B5CF6"
// //                   stopOpacity={0}
// //                 />
// //               </linearGradient>
// //             </defs>

// //             <XAxis
// //               dataKey="date"
// //               tick={{ fill: "#94A3B8" }}
// //               axisLine={false}
// //               tickLine={false}
// //             />

// //             <YAxis
// //               tick={{ fill: "#94A3B8" }}
// //               axisLine={false}
// //               tickLine={false}
// //               tickFormatter={(value) => `₹${value / 1000}K`}
// //             />

// //             <Tooltip
// //               contentStyle={{
// //                 backgroundColor: "#1E293B",
// //                 border: "1px solid #334155",
// //                 borderRadius: "10px",
// //                 color: "#fff",
// //               }}
// //               formatter={(value) => [
// //                 `₹${value.toLocaleString()}`,
// //                 "Revenue",
// //               ]}
// //             />

// //             <Area
// //               type="monotone"
// //               dataKey="revenue"
// //               stroke="#8B5CF6"
// //               strokeWidth={4}
// //               fill="url(#revenueGradient)"
// //               activeDot={{
// //                 r: 8,
// //                 fill: "#8B5CF6",
// //                 stroke: "#fff",
// //                 strokeWidth: 3,
// //               }}
// //             />
// //           </AreaChart>
// //         </ResponsiveContainer>
// //       </div>
// //     </div>
// //   );
// // };

// // export default RevenueChart;
// import React from "react";

// import {
//     ResponsiveContainer,
//     AreaChart,
//     Area,
//     XAxis,
//     YAxis,
//     Tooltip
// } from "recharts";

// const RevenueChart = ({
//     total_revenue,
//     percentage,
//     revenueData = []
// }) => {

//     return (

//         <div
//             className="
//                 bg-[#0B1220]
//                 border border-slate-800/80
//                 rounded-2xl
//                 p-6
//                 w-full
//                 shadow-xl
//             "
//         >

//             <div className="flex items-center justify-between mb-5">

//                 <div>

//                     <p className="text-sm text-slate-400">
//                         Revenue Overview
//                     </p>

//                     <h2 className="text-3xl font-bold text-white mt-2">
//                         {total_revenue}
//                     </h2>

//                     <p className="text-green-400 text-sm mt-2">
//                         ↑ {percentage}% from last month
//                     </p>

//                 </div>


//                 <select
//                     className="
//                         bg-[#111827]
//                         border border-slate-700
//                         text-slate-300
//                         rounded-lg
//                         px-3
//                         py-2
//                         text-sm
//                         outline-none
//                         focus:border-purple-500
//                     "
//                 >

//                     <option>This Month</option>
//                     <option>Last Month</option>
//                     <option>This Year</option>

//                 </select>

//             </div>


//             <div className="h-[230px]">

//                 <ResponsiveContainer
//                     width="100%"
//                     height="100%"
//                 >

//                     <AreaChart
//                         data={revenueData}
//                     >

//                         <defs>

//                             <linearGradient
//                                 id="revenueGradient"
//                                 x1="0"
//                                 y1="0"
//                                 x2="0"
//                                 y2="1"
//                             >

//                                 <stop
//                                     offset="5%"
//                                     stopColor="#8B5CF6"
//                                     stopOpacity={0.45}
//                                 />

//                                 <stop
//                                     offset="95%"
//                                     stopColor="#8B5CF6"
//                                     stopOpacity={0}
//                                 />

//                             </linearGradient>

//                         </defs>


//                         <XAxis
//                             dataKey="date"
//                             tick={{
//                                 fill: "#64748B",
//                                 fontSize: 12
//                             }}
//                             axisLine={false}
//                             tickLine={false}
//                         />


//                         <YAxis
//                             tick={{
//                                 fill: "#64748B",
//                                 fontSize: 12
//                             }}
//                             axisLine={false}
//                             tickLine={false}
//                             tickFormatter={(value) =>
//                                 `₹${value / 1000}K`
//                             }
//                         />


//                         <Tooltip
//                             contentStyle={{
//                                 backgroundColor: "#0F172A",
//                                 border: "1px solid #334155",
//                                 borderRadius: "10px",
//                                 color: "#fff"
//                             }}
//                             formatter={(value) => [
//                                 `₹${Number(
//                                     value
//                                 ).toLocaleString("en-IN")}`,
//                                 "Revenue"
//                             ]}
//                         />


//                         <Area
//                             type="monotone"
//                             dataKey="revenue"
//                             stroke="#8B5CF6"
//                             strokeWidth={3}
//                             fill="url(#revenueGradient)"
//                             activeDot={{
//                                 r: 6
//                             }}
//                         />

//                     </AreaChart>

//                 </ResponsiveContainer>

//             </div>

//         </div>

//     );

// };

// export default RevenueChart;

import React from "react";

import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

const RevenueChart = ({
    total_revenue,
    percentage = 0,
    revenueData = [],
}) => {

    return (
        <div
            className="
                relative
                overflow-hidden
                bg-[#0B1220]
                border border-slate-800
                rounded-2xl
                p-6
                w-full
                min-h-[390px]
            "
        >

            {/* Background glow */}

            <div
                className="
                    absolute
                    -right-20
                    -top-20
                    w-56
                    h-56
                    rounded-full
                    bg-purple-600
                    blur-[100px]
                    opacity-[0.05]
                    pointer-events-none
                "
            />


            {/* HEADER */}

            <div className="
                relative
                z-10
                flex
                items-start
                justify-between
                mb-5
            ">

                <div>

                    <p className="
                        text-xs
                        uppercase
                        tracking-wider
                        text-slate-500
                    ">
                        Revenue Overview
                    </p>

                    <h2 className="
                        text-3xl
                        font-bold
                        text-white
                        mt-2
                    ">
                        {total_revenue}
                    </h2>

                    <div className="
                        flex
                        items-center
                        gap-2
                        mt-2
                    ">

                        <span className="
                            text-green-400
                            text-xs
                            font-semibold
                        ">
                            ↑ {percentage}%
                        </span>

                        <span className="
                            text-slate-600
                            text-xs
                        ">
                            from last month
                        </span>

                    </div>

                </div>


                <select
                    className="
                        bg-[#0F172A]
                        border
                        border-slate-700
                        text-slate-300
                        rounded-xl
                        px-3
                        py-2
                        text-xs
                        outline-none
                        cursor-pointer
                        hover:border-slate-600
                    "
                >
                    <option>This Year</option>
                    <option>This Month</option>
                    <option>Last Year</option>
                </select>

            </div>


            {/* CHART */}

            <div className="
                relative
                z-10
                h-[260px]
            ">

                {revenueData.length > 0 ? (

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <AreaChart
                            data={revenueData}
                            margin={{
                                top: 10,
                                right: 10,
                                left: -15,
                                bottom: 0,
                            }}
                        >

                            <defs>

                                <linearGradient
                                    id="revenueGradientPremium"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >

                                    <stop
                                        offset="0%"
                                        stopColor="#8B5CF6"
                                        stopOpacity={0.40}
                                    />

                                    <stop
                                        offset="100%"
                                        stopColor="#8B5CF6"
                                        stopOpacity={0}
                                    />

                                </linearGradient>

                            </defs>


                            <CartesianGrid
                                stroke="#1E293B"
                                strokeDasharray="3 5"
                                vertical={false}
                            />


                            <XAxis
                                dataKey="date"
                                tick={{
                                    fill: "#64748B",
                                    fontSize: 11,
                                }}
                                axisLine={false}
                                tickLine={false}
                            />


                            <YAxis
                                tick={{
                                    fill: "#64748B",
                                    fontSize: 11,
                                }}
                                axisLine={false}
                                tickLine={false}
                                tickFormatter={(value) =>
                                    value >= 1000
                                        ? `₹${(
                                              value / 1000
                                          ).toFixed(0)}K`
                                        : `₹${value}`
                                }
                            />


                            <Tooltip
                                cursor={{
                                    stroke: "#475569",
                                    strokeDasharray:
                                        "4 4",
                                }}
                                contentStyle={{
                                    backgroundColor:
                                        "#0F172A",
                                    border:
                                        "1px solid #334155",
                                    borderRadius:
                                        "12px",
                                    color:
                                        "#fff",
                                    boxShadow:
                                        "0 10px 30px rgba(0,0,0,0.4)",
                                }}
                                labelStyle={{
                                    color: "#94A3B8",
                                    marginBottom:
                                        "4px",
                                }}
                                formatter={(value) => [
                                    `₹${Number(
                                        value
                                    ).toLocaleString(
                                        "en-IN"
                                    )}`,
                                    "Revenue",
                                ]}
                            />


                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stroke="#8B5CF6"
                                strokeWidth={3}
                                fill="url(#revenueGradientPremium)"
                                activeDot={{
                                    r: 6,
                                    fill: "#8B5CF6",
                                    stroke: "#fff",
                                    strokeWidth: 2,
                                }}
                            />

                        </AreaChart>

                    </ResponsiveContainer>

                ) : (

                    <div className="
                        h-full
                        flex
                        items-center
                        justify-center
                        text-slate-600
                        text-sm
                    ">
                        No revenue data available
                    </div>

                )}

            </div>

        </div>
    );
};

export default RevenueChart;