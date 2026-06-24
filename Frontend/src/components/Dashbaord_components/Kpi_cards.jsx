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
  percentage,
  color,
  chartData,
}) => {
  return (
    <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-5 h-[170px] hover:border-slate-700 transition-all duration-300">
    <div className="flex items-center justify-start gap-3">
        <div
              className="w-12 h-12 rounded-full flex items-center justify-center"
              style={{ backgroundColor: color }}
        >
              {icon}
        </div>
        <div className="flex flex-col items-center justify-start gap-2">
            <h3 className="text-slate-400 text-sm mt-3">
                {title}
            </h3>
            <h2 className="text-white text-3xl font-bold">
                {numbers}
            </h2>
        </div>
    </div>
    <div className="flex items-center justify-start gap-3">
        <p
            className="text-sm font-light"
          >
            ↑ {percentage} from last month
          </p>
        
        {/* Real Chart */}
        <div className="w-[120px] h-[60px] self-end">
          <ResponsiveContainer width="100%" height="100%">
            <Tooltip
  contentStyle={{
    backgroundColor: "#1E293B",
    border: "1px solid #334155",
    borderRadius: "8px",
    color: "#fff",
  }}
  labelStyle={{
    color: "#CBD5E1",
  }}
/>
            <LineChart data={chartData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
    </div>
    </div>
  );
};

export default KPI_cards;