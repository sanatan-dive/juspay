"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTheme } from "../../context/ThemeContext";

// Custom tooltip component
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: any[];
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-[#282828] border border-gray-200 dark:border-[#2E2E2E] rounded-lg px-3 py-2 shadow-lg">
        <p className="text-xs font-semibold text-[#1C1C1C] dark:text-white mb-1">
          {payload[0].payload.month}
        </p>
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-xs text-[#1C1C1C] dark:text-white">
            <span className="font-medium">
              {entry.name === "currentWeek" ? "Current" : "Previous"}:
            </span>{" "}
            ${entry.value.toLocaleString()}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function RevenueChart() {
  const { isDarkMode } = useTheme();
  const data = [
    { month: "Jan", currentWeek: 13000, previousWeek: 8000 },
    { month: "Feb", currentWeek: 9000, previousWeek: 17000 },
    { month: "Mar", currentWeek: 7000, previousWeek: 12000 },
    { month: "Apr", currentWeek: 15000, previousWeek: 8000 },
    { month: "May", currentWeek: 10000, previousWeek: 20000 },
    { month: "Jun", currentWeek: 24000, previousWeek: 20000 },
  ];

  return (
    <div className="bg-[#F7F9FB] dark:bg-[#282828] rounded-2xl p-5 h-full card-hover">
      <div className="flex items-center gap-8 mb-4">
        <h3 className="text-sm font-semibold text-[#1C1C1C] dark:text-white">
          Revenue
        </h3>
        <span className="border-r border-0.5 border-[#1c1c1c]/20 dark:border-[#ffffff]/20 h-4" />
        <div className="flex items-center gap-6 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-900 dark:bg-white"></div>
            <span className="text-[#1c1c1c] dark:text-gray-400">
              Current Week
            </span>
            <span className="font-semibold text-[#1C1C1C] dark:text-white">
              $58,211
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></div>
            <span className="text-[#1c1c1c] dark:text-gray-400">
              Previous Week
            </span>
            <span className="font-semibold text-[#1C1C1C] dark:text-white">
              $68,768
            </span>
          </div>
        </div>
      </div>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="0"
              stroke={isDarkMode ? "#404040" : "#E5E7EB"}
              vertical={false}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: isDarkMode ? "#ffffff66" : "#1C1C1C66",
                fontSize: 12,
              }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fill: isDarkMode ? "#ffffff66" : "#1C1C1C66",
                fontSize: 12,
              }}
              tickFormatter={(value) => `${value / 1000}M`}
              ticks={[0, 10000, 20000, 30000]}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ strokeDasharray: "3 3" }}
            />
            <Line
              type="monotone"
              dataKey="previousWeek"
              stroke="#A8C5DA"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="currentWeek"
              stroke={isDarkMode ? "#ffffff" : "#000000"}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
              strokeDasharray="0"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
