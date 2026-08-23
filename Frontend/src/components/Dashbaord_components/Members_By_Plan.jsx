import React from "react";

import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
} from "recharts";

import { Users } from "lucide-react";


const PLAN_COLORS = [
    "#EF1010", // Red
    "#FF6B00", // Orange
    "#F5B800", // Gold
    "#B91C1C",
    "#EA580C",
];


const MembersByPlan = ({ data = [] }) => {

    const chartData = data.filter(
        (item) => Number(item.members || 0) > 0
    );

    const total = chartData.reduce(
        (sum, item) =>
            sum + Number(item.members || 0),
        0
    );


    /*
    |--------------------------------------------------------------------------
    | EMPTY STATE
    |--------------------------------------------------------------------------
    */

    if (!chartData.length) {
        return (
            <div
                className="
                    relative
                    overflow-hidden
                    bg-[#0A0808]
                    border border-[#2A2020]
                    rounded-2xl
                    h-[340px]
                    p-5
                "
            >

                <div
                    className="
                        absolute
                        top-0
                        left-8
                        right-8
                        h-px
                        bg-red-600/70
                    "
                />

                <div className="relative z-10">

                    <p
                        className="
                            text-[10px]
                            uppercase
                            tracking-[0.2em]
                            font-semibold
                            text-red-500
                        "
                    >
                        Membership Distribution
                    </p>

                    <h2
                        className="
                            text-lg
                            font-bold
                            text-white
                            mt-1
                        "
                    >
                        Members by Plan
                    </h2>

                </div>


                <div
                    className="
                        h-[250px]
                        flex
                        flex-col
                        items-center
                        justify-center
                    "
                >

                    <Users
                        size={28}
                        className="text-red-500 mb-3"
                    />

                    <p className="text-sm text-gray-400">
                        No membership data available
                    </p>

                </div>

            </div>
        );
    }


    return (
        <div
            className="
                relative
                overflow-hidden
                bg-[#0A0808]
                border border-[#2A2020]
                rounded-2xl
                h-[340px]
                p-5
                group
                transition-all
                duration-300
                hover:border-[#432626]
            "
        >

            {/* =====================================================
                TOP ACCENT
            ===================================================== */}

            <div
                className="
                    absolute
                    top-0
                    left-8
                    right-8
                    h-px
                    bg-red-600/70
                "
            />


            {/* =====================================================
                BACKGROUND GLOW
            ===================================================== */}

            <div
                className="
                    absolute
                    -top-20
                    -right-20
                    w-40
                    h-40
                    rounded-full
                    bg-red-600
                    blur-[90px]
                    opacity-[0.04]
                "
            />


            {/* =====================================================
                HEADER
            ===================================================== */}

            <div
                className="
                    relative
                    z-10
                    flex
                    items-center
                    justify-between
                "
            >

                <div>

                    <p
                        className="
                            text-[10px]
                            uppercase
                            tracking-[0.2em]
                            font-semibold
                            text-red-500
                        "
                    >
                        Membership Distribution
                    </p>

                    <h2
                        className="
                            text-lg
                            font-bold
                            text-white
                            mt-1
                        "
                    >
                        Members by Plan
                    </h2>

                </div>


                {/* Total */}

                <div
                    className="
                        flex
                        items-center
                        gap-1.5
                        px-2.5
                        py-1.5
                        rounded-lg
                        bg-[#100D0D]
                        border border-[#302525]
                    "
                >

                    <Users
                        size={13}
                        className="text-red-500"
                    />

                    <span
                        className="
                            text-[11px]
                            font-semibold
                            text-gray-400
                        "
                    >
                        {total} Members
                    </span>

                </div>

            </div>


            {/* =====================================================
                CONTENT
            ===================================================== */}

            <div
                className="
                    relative
                    z-10
                    grid
                    grid-cols-[1fr_1fr]
                    gap-2
                    items-center
                    h-[260px]
                "
            >


                {/* =================================================
                    DONUT
                ================================================= */}

                <div
                    className="
                        relative
                        w-full
                        h-[230px]
                    "
                >

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <PieChart>

                            <Pie
                                data={chartData}
                                dataKey="members"
                                nameKey="planName"

                                cx="50%"
                                cy="50%"

                                innerRadius={55}
                                outerRadius={82}

                                paddingAngle={4}
                                cornerRadius={3}

                                stroke="none"

                                startAngle={90}
                                endAngle={-270}
                            >

                                {chartData.map(
                                    (item, index) => (

                                        <Cell
                                            key={
                                                item.planId ||
                                                item.planName ||
                                                index
                                            }
                                            fill={
                                                PLAN_COLORS[
                                                    index %
                                                    PLAN_COLORS.length
                                                ]
                                            }
                                        />

                                    )
                                )}

                            </Pie>


                            <Tooltip
                                cursor={false}
                                contentStyle={{
                                    backgroundColor: "#100D0D",
                                    border: "1px solid #3A2929",
                                    borderRadius: "8px",
                                    color: "#FFFFFF",
                                    fontSize: "11px",
                                }}
                                formatter={(
                                    value,
                                    name
                                ) => [
                                    `${value} ${
                                        Number(value) === 1
                                            ? "Member"
                                            : "Members"
                                    }`,
                                    name,
                                ]}
                            />

                        </PieChart>

                    </ResponsiveContainer>


                    {/* CENTER */}

                    <div
                        className="
                            absolute
                            inset-0
                            flex
                            flex-col
                            items-center
                            justify-center
                            pointer-events-none
                        "
                    >

                        <p
                            className="
                                text-2xl
                                font-bold
                                text-white
                                leading-none
                            "
                        >
                            {total}
                        </p>

                        <p
                            className="
                                text-[10px]
                                text-gray-600
                                mt-1
                            "
                        >
                            Members
                        </p>

                    </div>

                </div>


                {/* =================================================
                    LEGEND
                ================================================= */}

                <div
                    className="
                        space-y-2.5
                        min-w-0
                    "
                >

                    {chartData.map(
                        (item, index) => {

                            const color =
                                PLAN_COLORS[
                                    index %
                                    PLAN_COLORS.length
                                ];


                            const percentage =
                                Number(
                                    item.percentage ??
                                    (
                                        total > 0
                                            ? (
                                                Number(
                                                    item.members || 0
                                                ) /
                                                total
                                            ) * 100
                                            : 0
                                    )
                                );


                            return (
                                <div
                                    key={
                                        item.planId ||
                                        item.planName ||
                                        index
                                    }
                                    className="
                                        relative
                                        rounded-lg
                                        border
                                        border-[#292020]
                                        bg-[#100D0D]
                                        px-3
                                        py-2.5
                                        transition-all
                                        duration-200
                                        hover:border-[#493030]
                                    "
                                >

                                    {/* Accent */}

                                    <div
                                        className="
                                            absolute
                                            left-0
                                            top-2
                                            bottom-2
                                            w-[2px]
                                            rounded-r-full
                                        "
                                        style={{
                                            backgroundColor: color,
                                        }}
                                    />


                                    <div
                                        className="
                                            flex
                                            items-center
                                            justify-between
                                            gap-2
                                        "
                                    >

                                        {/* Plan */}

                                        <div
                                            className="
                                                min-w-0
                                                flex
                                                items-center
                                                gap-2
                                            "
                                        >

                                            <div
                                                className="
                                                    w-2
                                                    h-2
                                                    rounded-full
                                                    shrink-0
                                                "
                                                style={{
                                                    backgroundColor:
                                                        color,
                                                }}
                                            />


                                            <div className="min-w-0">

                                                <p
                                                    className="
                                                        text-xs
                                                        font-semibold
                                                        text-gray-300
                                                        truncate
                                                    "
                                                >
                                                    {item.planName}
                                                </p>

                                                <p
                                                    className="
                                                        text-[9px]
                                                        text-gray-600
                                                        mt-0.5
                                                    "
                                                >
                                                    {item.members}{" "}
                                                    {Number(
                                                        item.members
                                                    ) === 1
                                                        ? "member"
                                                        : "members"}
                                                </p>

                                            </div>

                                        </div>


                                        {/* Percentage */}

                                        <p
                                            className="
                                                text-xs
                                                font-bold
                                                text-white
                                                shrink-0
                                            "
                                        >
                                            {percentage}%
                                        </p>

                                    </div>


                                    {/* Small progress */}

                                    <div
                                        className="
                                            h-[2px]
                                            bg-[#241B1B]
                                            rounded-full
                                            mt-2
                                            overflow-hidden
                                        "
                                    >

                                        <div
                                            className="
                                                h-full
                                                rounded-full
                                            "
                                            style={{
                                                width:
                                                    `${Math.min(
                                                        percentage,
                                                        100
                                                    )}%`,
                                                backgroundColor:
                                                    color,
                                            }}
                                        />

                                    </div>

                                </div>
                            );

                        }
                    )}

                </div>

            </div>

        </div>
    );
};


export default MembersByPlan;