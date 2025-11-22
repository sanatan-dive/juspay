"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useTheme } from "../../context/ThemeContext";

export default function TotalSales() {
  const { isDarkMode } = useTheme();

  const salesData = [
    {
      label: "Direct",
      value: 300.56,
      displayValue: "$300.56",
      color: isDarkMode ? "#6B7280" : "#1C1C1C",
      percentage: 38.6,
    },
    {
      label: "Affiliate",
      value: 135.18,
      displayValue: "$135.18",
      color: "#A8D5BA",
      percentage: 22.5,
    },
    {
      label: "Sponsored",
      value: 154.02,
      displayValue: "$154.02",
      color: "#A8C5DA",
      percentage: 25.7,
    },
    {
      label: "E-mail",
      value: 48.96,
      displayValue: "$48.96",
      color: "#C6E0F5",
      percentage: 13.2,
    },
  ];

  return (
    <div className="bg-[#F7F9FB] dark:bg-[#282828] rounded-2xl p-6 card-hover">
      <h3 className="text-base font-semibold text-[#1C1C1C] dark:text-white mb-6">
        Total Sales
      </h3>

      {/* Donut Chart */}
      <div className="flex justify-center mb-6 relative">
        <div className="w-40 h-42">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={salesData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                paddingAngle={2}
                dataKey="value"
                startAngle={90}
                endAngle={450}
              >
                {salesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          {/* Center percentage */}
          <div className="absolute bottom-10 left-2 flex items-center justify-center">
            <div className="bg-[#1C1C1CCC] text-white text-xs  font-semibold px-3 py-1.5 rounded-lg">
              38.6%
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-3 px-2">
        {salesData.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-xs text-[#1C1C1C] dark:text-white">
                {item.label}
              </span>
            </div>
            <span className="text-xs font-medium text-[#1C1C1C] dark:text-white">
              {item.displayValue}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
