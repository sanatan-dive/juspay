"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
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
        <p className="text-xs text-[#1C1C1C] dark:text-white">
          <span className="font-medium">Actual:</span>{" "}
          {payload.find((p) => p.dataKey === "actual")?.value}M
        </p>
        <p className="text-xs text-[#1C1C1C] dark:text-white">
          <span className="font-medium">Projection:</span>{" "}
          {payload.find((p) => p.dataKey === "projection")?.value}M
        </p>
      </div>
    );
  }
  return null;
};

export default function ProjectionsChart() {
  const { isDarkMode } = useTheme();
  const data = [
    { month: "Jan", actual: 17, projection: 3 },
    { month: "Feb", actual: 20, projection: 5 },
    { month: "Mar", actual: 18, projection: 4 },
    { month: "Apr", actual: 22, projection: 6 },
    { month: "May", actual: 15, projection: 3 },
    { month: "Jun", actual: 20, projection: 5 },
  ];

  return (
    <div className="bg-[#F7F9FB] dark:bg-[#282828] rounded-2xl p-5 h-full card-hover">
      <h3 className="text-sm font-semibold text-[#1C1C1C] dark:text-white mb-3">
        Projections vs Actuals
      </h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
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
              tickFormatter={(value) => `${value}M`}
              ticks={[0, 10, 20, 30]}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(138, 140, 217, 0.1)" }}
            />
            <Bar
              dataKey="projection"
              stackId="a"
              fill="#C6D7E3"
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
            <Bar
              dataKey="actual"
              stackId="a"
              fill="#A8C5DA"
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
