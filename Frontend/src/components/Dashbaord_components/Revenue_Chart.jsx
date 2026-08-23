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

    const isPositive = percentage >= 0;

    return (
        <div
            className="
                relative
                overflow-hidden
                w-full
                min-h-[350px]
                rounded-2xl
                border
                border-white/[0.07]
                bg-[#0D0B0B]
                p-5
                md:p-6
                transition-all
                duration-300
                hover:border-red-500/20
            "
        >

            {/* =====================================================
                SUBTLE RED GLOW
            ===================================================== */}

            <div
                className="
                    pointer-events-none
                    absolute
                    -top-24
                    -right-24
                    h-52
                    w-52
                    rounded-full
                    bg-red-600
                    opacity-[0.045]
                    blur-[90px]
                "
            />


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
                    bg-red-600/30
                "
            />


            {/* =====================================================
                HEADER
            ===================================================== */}

            <div
                className="
                    relative
                    z-10
                    mb-4
                    flex
                    flex-col
                    gap-4
                    sm:flex-row
                    sm:items-start
                    sm:justify-between
                "
            >

                {/* LEFT */}

                <div>

                    <div className="flex items-center gap-2">

                        <span
                            className="
                                h-1.5
                                w-1.5
                                rounded-full
                                bg-red-500
                                shadow-[0_0_8px_rgba(239,68,68,0.7)]
                            "
                        />

                        <p
                            className="
                                text-[10px]
                                font-semibold
                                uppercase
                                tracking-[0.2em]
                                text-red-500/80
                            "
                        >
                            Revenue Overview
                        </p>

                    </div>


                    <h2
                        className="
                            mt-1.5
                            text-2xl
                            md:text-[28px]
                            font-bold
                            tracking-tight
                            text-white
                        "
                    >
                        {total_revenue}
                    </h2>


                    <div
                        className="
                            mt-1.5
                            flex
                            items-center
                            gap-2
                        "
                    >

                        <span
                            className={`
                                text-xs
                                font-semibold
                                ${
                                    isPositive
                                        ? "text-emerald-400"
                                        : "text-red-400"
                                }
                            `}
                        >
                            {isPositive ? "↑" : "↓"} {Math.abs(percentage)}%
                        </span>

                        <span
                            className="
                                text-[11px]
                                text-slate-500
                            "
                        >
                            from last month
                        </span>

                    </div>

                </div>


                {/* PERIOD SELECTOR */}

                <select
                    defaultValue="This Year"
                    className="
                        h-9
                        min-w-[110px]
                        rounded-lg
                        border
                        border-white/[0.08]
                        bg-[#121010]
                        px-3
                        text-xs
                        font-medium
                        text-slate-300
                        outline-none
                        transition
                        cursor-pointer
                        hover:border-red-500/30
                        focus:border-red-500/40
                    "
                >

                    <option>This Year</option>
                    <option>This Month</option>
                    <option>Last Year</option>

                </select>

            </div>


            {/* =====================================================
                CHART
            ===================================================== */}

            <div
                className="
                    relative
                    z-10
                    h-[230px]
                    w-full
                "
            >

                {revenueData.length > 0 ? (

                    <ResponsiveContainer
                        width="100%"
                        height="100%"
                    >

                        <AreaChart
                            data={revenueData}
                            margin={{
                                top: 8,
                                right: 8,
                                left: -18,
                                bottom: 0,
                            }}
                        >

                            {/* =================================================
                                GRADIENT
                            ================================================= */}

                            <defs>

                                <linearGradient
                                    id="fitnessBeastRevenueGradient"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >

                                    <stop
                                        offset="0%"
                                        stopColor="#EF4444"
                                        stopOpacity={0.22}
                                    />

                                    <stop
                                        offset="70%"
                                        stopColor="#EF4444"
                                        stopOpacity={0.06}
                                    />

                                    <stop
                                        offset="100%"
                                        stopColor="#EF4444"
                                        stopOpacity={0}
                                    />

                                </linearGradient>

                            </defs>


                            {/* =================================================
                                GRID
                            ================================================= */}

                            <CartesianGrid
                                vertical={false}
                                stroke="rgba(255,255,255,0.055)"
                                strokeDasharray="2 5"
                            />


                            {/* =================================================
                                X AXIS
                            ================================================= */}

                            <XAxis
                                dataKey="date"
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    fill: "#64748B",
                                    fontSize: 10,
                                }}
                                dy={8}
                            />


                            {/* =================================================
                                Y AXIS
                            ================================================= */}

                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                width={48}
                                tick={{
                                    fill: "#64748B",
                                    fontSize: 10,
                                }}
                                tickFormatter={(value) => {

                                    if (value >= 100000) {
                                        return `₹${(
                                            value / 100000
                                        ).toFixed(1)}L`;
                                    }

                                    if (value >= 1000) {
                                        return `₹${(
                                            value / 1000
                                        ).toFixed(0)}K`;
                                    }

                                    return `₹${value}`;

                                }}
                            />


                            {/* =================================================
                                TOOLTIP
                            ================================================= */}

                            <Tooltip
                                cursor={{
                                    stroke: "rgba(239,68,68,0.25)",
                                    strokeDasharray: "4 4",
                                }}
                                contentStyle={{
                                    background: "#141111",
                                    border:
                                        "1px solid rgba(239,68,68,0.25)",
                                    borderRadius: "10px",
                                    padding: "9px 12px",
                                    boxShadow:
                                        "0 12px 30px rgba(0,0,0,0.45)",
                                }}
                                labelStyle={{
                                    color: "#94A3B8",
                                    fontSize: "11px",
                                    marginBottom: "4px",
                                }}
                                itemStyle={{
                                    color: "#F87171",
                                    fontSize: "12px",
                                    fontWeight: 600,
                                }}
                                formatter={(value) => [
                                    `₹${Number(value).toLocaleString(
                                        "en-IN"
                                    )}`,
                                    "Revenue",
                                ]}
                            />


                            {/* =================================================
                                AREA
                            ================================================= */}

                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stroke="#EF4444"
                                strokeWidth={2.5}
                                fill="url(#fitnessBeastRevenueGradient)"
                                activeDot={{
                                    r: 5,
                                    fill: "#EF4444",
                                    stroke: "#1A1010",
                                    strokeWidth: 2,
                                }}
                                animationDuration={800}
                            />

                        </AreaChart>

                    </ResponsiveContainer>

                ) : (

                    <div
                        className="
                            h-full
                            flex
                            flex-col
                            items-center
                            justify-center
                            gap-2
                        "
                    >

                        <div
                            className="
                                flex
                                h-10
                                w-10
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-white/[0.06]
                                bg-white/[0.025]
                            "
                        >
                            <span
                                className="
                                    h-2
                                    w-2
                                    rounded-full
                                    bg-slate-600
                                "
                            />
                        </div>

                        <p
                            className="
                                text-xs
                                text-slate-500
                            "
                        >
                            No revenue data available
                        </p>

                    </div>

                )}

            </div>

        </div>
    );
};

export default RevenueChart;