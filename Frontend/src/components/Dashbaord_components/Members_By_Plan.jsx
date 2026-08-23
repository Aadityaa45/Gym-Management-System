// import React from "react";

// import {
//     ResponsiveContainer,
//     PieChart,
//     Pie,
//     Cell,
//     Tooltip
// } from "recharts";

// const COLORS = [
//     "#8B5CF6",
//     "#3B82F6",
//     "#22C55E",
//     "#F59E0B"
// ];

// const MembersByPlan = ({ data = [] }) => {

//     const total = data.reduce(
//         (sum, item) => sum + item.count,
//         0
//     );

//     return (

//         <div
//             className="
//                 bg-[#0B1220]
//                 border border-slate-800/80
//                 rounded-2xl
//                 p-6
//                 min-h-[330px]
//             "
//         >

//             <h2 className="text-white font-semibold">
//                 Members by Plan
//             </h2>


//             <div className="flex items-center justify-between h-[270px]">

//                 <div className="w-[55%] h-full">

//                     <ResponsiveContainer
//                         width="100%"
//                         height="100%"
//                     >

//                         <PieChart>

//                             <Pie
//                                 data={data}
//                                 dataKey="count"
//                                 nameKey="plan"
//                                 innerRadius={65}
//                                 outerRadius={95}
//                                 paddingAngle={3}
//                             >

//                                 {data.map(
//                                     (entry, index) => (

//                                         <Cell
//                                             key={entry.plan}
//                                             fill={
//                                                 COLORS[
//                                                     index %
//                                                     COLORS.length
//                                                 ]
//                                             }
//                                         />

//                                     )
//                                 )}

//                             </Pie>


//                             <Tooltip />

//                         </PieChart>

//                     </ResponsiveContainer>

//                 </div>


//                 <div className="w-[45%] space-y-4">

//                     {data.map(
//                         (item, index) => (

//                             <div
//                                 key={item.plan}
//                                 className="flex items-center justify-between"
//                             >

//                                 <div className="flex items-center gap-2">

//                                     <div
//                                         className="w-2.5 h-2.5 rounded-full"
//                                         style={{
//                                             backgroundColor:
//                                                 COLORS[
//                                                     index %
//                                                     COLORS.length
//                                                 ]
//                                         }}
//                                     />

//                                     <span className="text-xs text-slate-400">
//                                         {item.plan}
//                                     </span>

//                                 </div>

//                                 <div className="text-right">

//                                     <p className="text-xs text-white font-semibold">
//                                         {item.percentage}%
//                                     </p>

//                                     <p className="text-[10px] text-slate-500">
//                                         {item.count}
//                                     </p>

//                                 </div>

//                             </div>

//                         )
//                     )}

//                 </div>

//             </div>

//         </div>

//     );

// };

// export default MembersByPlan;
import React from "react";

import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
} from "recharts";

const COLORS = [
    "#8B5CF6",
    "#3B82F6",
    "#22C55E",
    "#F59E0B",
    "#EC4899",
];

const MembersByPlan = ({ data = [] }) => {

    const total = data.reduce(
        (sum, item) =>
            sum + Number(item.members || 0),
        0
    );

    return (
        <div
            className="
                relative
                overflow-hidden
                bg-[#0B1220]
                border border-slate-800
                rounded-2xl
                p-6
                min-h-[390px]
            "
        >

            <div
                className="
                    absolute
                    -right-16
                    -top-16
                    w-40
                    h-40
                    rounded-full
                    bg-purple-600
                    blur-[90px]
                    opacity-[0.05]
                "
            />


            {/* HEADER */}

            <div className="
                relative
                z-10
                flex
                items-center
                justify-between
            ">

                <div>

                    <p className="
                        text-xs
                        uppercase
                        tracking-wider
                        text-slate-500
                    ">
                        Membership Distribution
                    </p>

                    <h2 className="
                        text-lg
                        font-semibold
                        text-white
                        mt-1
                    ">
                        Members by Plan
                    </h2>

                </div>

                <div className="
                    px-3
                    py-1.5
                    rounded-lg
                    bg-slate-800/50
                    border
                    border-slate-700
                ">
                    <span className="
                        text-xs
                        text-slate-400
                    ">
                        {total} Members
                    </span>
                </div>

            </div>


            {/* BODY */}

            {data.length > 0 ? (

                <div className="
                    relative
                    z-10
                    flex
                    items-center
                    justify-between
                    h-[290px]
                ">

                    {/* DONUT */}

                    <div className="
                        w-[55%]
                        h-full
                    ">

                        <ResponsiveContainer
                            width="100%"
                            height="100%"
                        >

                            <PieChart>

                                <Pie
                                    data={data}
                                    dataKey="members"
                                    nameKey="planName"
                                    innerRadius={65}
                                    outerRadius={95}
                                    paddingAngle={4}
                                    stroke="none"
                                >

                                    {data.map(
                                        (
                                            entry,
                                            index
                                        ) => (

                                            <Cell
                                                key={
                                                    entry.planId ||
                                                    index
                                                }
                                                fill={
                                                    COLORS[
                                                        index %
                                                            COLORS.length
                                                    ]
                                                }
                                            />

                                        )
                                    )}

                                </Pie>


                                <Tooltip
                                    contentStyle={{
                                        backgroundColor:
                                            "#0F172A",
                                        border:
                                            "1px solid #334155",
                                        borderRadius:
                                            "10px",
                                        color:
                                            "#fff",
                                    }}
                                    formatter={(
                                        value,
                                        name
                                    ) => [
                                        `${value} Members`,
                                        name,
                                    ]}
                                />

                            </PieChart>

                        </ResponsiveContainer>

                    </div>


                    {/* LEGEND */}

                    <div className="
                        w-[45%]
                        space-y-5
                    ">

                        {data.map(
                            (
                                item,
                                index
                            ) => (

                                <div
                                    key={
                                        item.planId ||
                                        index
                                    }
                                    className="
                                        flex
                                        items-center
                                        justify-between
                                        gap-3
                                    "
                                >

                                    <div className="
                                        flex
                                        items-center
                                        gap-2
                                        min-w-0
                                    ">

                                        <div
                                            className="
                                                w-2.5
                                                h-2.5
                                                rounded-full
                                                shrink-0
                                            "
                                            style={{
                                                backgroundColor:
                                                    COLORS[
                                                        index %
                                                            COLORS.length
                                                    ],
                                            }}
                                        />

                                        <span className="
                                            text-xs
                                            text-slate-400
                                            truncate
                                        ">
                                            {item.planName}
                                        </span>

                                    </div>


                                    <div className="
                                        text-right
                                        shrink-0
                                    ">

                                        <p className="
                                            text-xs
                                            font-bold
                                            text-white
                                        ">
                                            {item.percentage}%
                                        </p>

                                        <p className="
                                            text-[10px]
                                            text-slate-600
                                        ">
                                            {item.members}
                                        </p>

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                </div>

            ) : (

                <div className="
                    h-[290px]
                    flex
                    items-center
                    justify-center
                    text-slate-600
                    text-sm
                ">
                    No membership data available
                </div>

            )}

        </div>
    );
};

export default MembersByPlan;