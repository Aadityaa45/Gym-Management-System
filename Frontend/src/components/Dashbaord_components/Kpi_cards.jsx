// // import React from "react";
// // import {
// //   ResponsiveContainer,
// //   LineChart,
// //   Line,
// //   Tooltip,
// // } from "recharts";

// // const KPI_cards = ({
// //   title,
// //   numbers,
// //   icon,
// //   percentage,
// //   color,
// //   chartData,
// // }) => {
// //   return (
// //     <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-5 h-[170px] hover:border-slate-700 transition-all duration-300">
// //     <div className="flex items-center justify-start gap-3">
// //         <div
// //               className="w-12 h-12 rounded-full flex items-center justify-center"
// //               style={{ backgroundColor: color }}
// //         >
// //               {icon}
// //         </div>
// //         <div className="flex flex-col items-center justify-start gap-2">
// //             <h3 className="text-slate-400 text-sm mt-3">
// //                 {title}
// //             </h3>
// //             <h2 className="text-white text-3xl font-bold">
// //                 {numbers}
// //             </h2>
// //         </div>
// //     </div>
// //     <div className="flex items-center justify-start gap-3">
// //         <p
// //             className="text-sm font-light"
// //           >
// //             ↑ {percentage} from last month
// //           </p>
        
// //         {/* Real Chart */}
// //         <div className="w-[120px] h-[60px] self-end">
// //           <ResponsiveContainer width="100%" height="100%">
// //             <Tooltip
// //   contentStyle={{
// //     backgroundColor: "#1E293B",
// //     border: "1px solid #334155",
// //     borderRadius: "8px",
// //     color: "#fff",
// //   }}
// //   labelStyle={{
// //     color: "#CBD5E1",
// //   }}
// // />
// //             <LineChart data={chartData}>
// //               <Line
// //                 type="monotone"
// //                 dataKey="value"
// //                 stroke={color}
// //                 strokeWidth={3}
// //                 dot={false}
// //               />
// //             </LineChart>
// //           </ResponsiveContainer>
// //         </div>
// //     </div>
// //     </div>
// //   );
// // };

// // export default KPI_cards;

// import React from "react";

// import {
//     ResponsiveContainer,
//     LineChart,
//     Line,
//     Tooltip
// } from "recharts";

// const KPI_cards = ({
//     title,
//     numbers,
//     icon,
//     percentage,
//     color,
//     chartData = []
// }) => {

//     return (

//         <div
//             className="
//                 relative
//                 overflow-hidden
//                 bg-[#0B1220]
//                 border border-slate-800/80
//                 rounded-2xl
//                 p-5
//                 h-[165px]
//                 group
//                 transition-all
//                 duration-300
//                 hover:-translate-y-1
//                 hover:border-slate-700
//                 hover:shadow-2xl
//             "
//         >

//             {/* Glow */}

//             <div
//                 className="
//                     absolute
//                     -right-10
//                     -top-10
//                     w-32
//                     h-32
//                     rounded-full
//                     blur-3xl
//                     opacity-10
//                     group-hover:opacity-20
//                     transition
//                 "
//                 style={{
//                     backgroundColor: color
//                 }}
//             />


//             <div className="relative z-10">

//                 <div className="flex justify-between">

//                     <div className="flex items-center gap-3">

//                         <div
//                             className="
//                                 w-12
//                                 h-12
//                                 rounded-full
//                                 flex
//                                 items-center
//                                 justify-center
//                                 text-white
//                                 font-bold
//                                 shadow-lg
//                             "
//                             style={{
//                                 backgroundColor: color
//                             }}
//                         >

//                             {icon}

//                         </div>

//                         <div>

//                             <p className="text-xs text-slate-400">
//                                 {title}
//                             </p>

//                             <h2 className="text-2xl font-bold text-white mt-1">
//                                 {numbers}
//                             </h2>

//                         </div>

//                     </div>

//                 </div>


//                 <div className="flex items-end justify-between mt-5">

//                     <p className="text-xs text-green-400">
//                         ↑ {percentage}% from last month
//                     </p>


//                     {chartData?.length > 0 && (

//                         <div className="w-[100px] h-[45px]">

//                             <ResponsiveContainer
//                                 width="100%"
//                                 height="100%"
//                             >

//                                 <LineChart
//                                     data={chartData}
//                                 >

//                                     <Tooltip
//                                         contentStyle={{
//                                             backgroundColor: "#111827",
//                                             border: "1px solid #334155",
//                                             borderRadius: "8px",
//                                             color: "#fff"
//                                         }}
//                                     />

//                                     <Line
//                                         type="monotone"
//                                         dataKey="revenue"
//                                         stroke={color}
//                                         strokeWidth={3}
//                                         dot={false}
//                                     />

//                                 </LineChart>

//                             </ResponsiveContainer>

//                         </div>

//                     )}

//                 </div>

//             </div>

//         </div>

//     );

// };

// export default KPI_cards;
import React from "react";

import {
    ResponsiveContainer,
    LineChart,
    Line,
    Tooltip,
} from "recharts";

const KPI_cards = ({
    title,
    numbers,
    icon,
    percentage = 0,
    color,
    chartData = [],
}) => {

    return (
        <div
            className="
                relative
                overflow-hidden
                bg-[#0B1220]
                border
                border-slate-800
                rounded-2xl
                p-5
                min-h-[155px]
                group
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-slate-700
                hover:shadow-[0_15px_40px_rgba(0,0,0,0.35)]
            "
        >

            {/* Background Glow */}

            <div
                className="
                    absolute
                    -right-12
                    -top-12
                    w-36
                    h-36
                    rounded-full
                    blur-3xl
                    opacity-[0.08]
                    group-hover:opacity-[0.15]
                    transition-all
                    duration-500
                "
                style={{
                    backgroundColor: color,
                }}
            />


            {/* Top subtle line */}

            <div
                className="
                    absolute
                    top-0
                    left-8
                    right-8
                    h-[1px]
                    opacity-20
                "
                style={{
                    backgroundColor: color,
                }}
            />


            <div className="relative z-10">

                {/* HEADER */}

                <div className="flex items-start justify-between">

                    <div className="flex items-center gap-3">

                        <div
                            className="
                                w-11
                                h-11
                                rounded-xl
                                flex
                                items-center
                                justify-center
                                text-white
                                shadow-lg
                            "
                            style={{
                                backgroundColor: `${color}20`,
                                color: color,
                                boxShadow: `0 0 25px ${color}15`,
                            }}
                        >
                            {icon}
                        </div>


                        <div>

                            <p className="
                                text-xs
                                text-slate-500
                                font-medium
                            ">
                                {title}
                            </p>

                            <h2 className="
                                text-2xl
                                font-bold
                                text-white
                                mt-1
                                tracking-tight
                            ">
                                {numbers}
                            </h2>

                        </div>

                    </div>

                </div>


                {/* BOTTOM */}

                <div className="
                    flex
                    items-end
                    justify-between
                    mt-5
                ">

                    <div>

                        <p className="
                            text-xs
                            text-green-400
                            font-medium
                        ">
                            ↑ {percentage}%
                        </p>

                        <p className="
                            text-[10px]
                            text-slate-600
                            mt-0.5
                        ">
                            from last month
                        </p>

                    </div>


                    {chartData?.length > 1 && (

                        <div className="
                            w-[105px]
                            h-[42px]
                        ">

                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >

                                <LineChart
                                    data={chartData}
                                >

                                    <Tooltip
                                        cursor={false}
                                        contentStyle={{
                                            backgroundColor:
                                                "#0F172A",
                                            border:
                                                "1px solid #334155",
                                            borderRadius:
                                                "8px",
                                            color:
                                                "#fff",
                                            fontSize:
                                                "11px",
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

                                    <Line
                                        type="monotone"
                                        dataKey="revenue"
                                        stroke={color}
                                        strokeWidth={2.5}
                                        dot={false}
                                        activeDot={{
                                            r: 4,
                                        }}
                                    />

                                </LineChart>

                            </ResponsiveContainer>

                        </div>

                    )}

                </div>

            </div>

        </div>
    );
};

export default KPI_cards;