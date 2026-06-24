import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";


const RevenueChart = ({total_revenue,percentage,revenueData}) => {
  return (
    <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 w-full">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white text-lg font-semibold">
          Revenue Overview
        </h2>

        <select className="bg-[#111827] border border-slate-700 text-slate-300 rounded-lg px-3 py-2 text-sm outline-none">
          <option>This Month</option>
          <option>Last Month</option>
          <option>This Year</option>
        </select>
      </div>

      {/* Revenue */}
      <div className="mb-5">
        <h1 className="text-white text-4xl font-bold">
          {total_revenue}
        </h1>

        <p className="text-green-500 text-sm mt-2">
          {`↑ ${percentage}% from last month`}
        </p>
      </div>

      {/* Chart */}
      <div className="h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueData}>
            
            <defs>
              <linearGradient
                id="revenueGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#8B5CF6"
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor="#8B5CF6"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="date"
              tick={{ fill: "#94A3B8" }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: "#94A3B8" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `₹${value / 1000}K`}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#1E293B",
                border: "1px solid #334155",
                borderRadius: "10px",
                color: "#fff",
              }}
              formatter={(value) => [
                `₹${value.toLocaleString()}`,
                "Revenue",
              ]}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#8B5CF6"
              strokeWidth={4}
              fill="url(#revenueGradient)"
              activeDot={{
                r: 8,
                fill: "#8B5CF6",
                stroke: "#fff",
                strokeWidth: 3,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;