import { TrendingUp, TrendingDown } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  bgColor?: string;
}

export default function StatCard({
  title,
  value,
  change,
  isPositive,
  bgColor = "bg-white",
}: StatCardProps) {
  // Keep colored backgrounds (E3F5FF, E5ECF6) in dark mode, only change white/F7F9FB
  const shouldChangeBgInDark =
    bgColor === "bg-white" || bgColor === "bg-[#F7F9FB]";

  return (
    <div
      className={`${bgColor} ${
        shouldChangeBgInDark ? "dark:bg-[#282828]" : ""
      } rounded-2xl p-6 card-hover cursor-pointer`}
    >
      <h3
        className={`text-sm font-semibold mb-2 ${
          shouldChangeBgInDark
            ? "text-[#1C1C1C] dark:text-white"
            : "text-[#1C1C1C]"
        }`}
      >
        {title}
      </h3>
      <div className="flex items-end justify-between">
        <p
          className={`text-2xl font-semibold ${
            shouldChangeBgInDark
              ? "text-[#1C1C1C] dark:text-white"
              : "text-[#1C1C1C]"
          }`}
        >
          {value}
        </p>
        <div className="flex items-center gap-1 text-xs">
          <span
            className={
              shouldChangeBgInDark
                ? isPositive
                  ? "text-[#1C1C1C] dark:text-white"
                  : "text-[#1C1C1C] dark:text-white"
                : "text-[#1C1C1C]"
            }
          >
            {change}
          </span>
          {isPositive ? (
            <TrendingUp
              className={`w-4 h-4 ${
                shouldChangeBgInDark
                  ? "text-[#1C1C1C] dark:text-white"
                  : "text-[#1C1C1C]"
              }`}
            />
          ) : (
            <TrendingDown
              className={`w-4 h-4 ${
                shouldChangeBgInDark
                  ? "text-[#1C1C1C] dark:text-white"
                  : "text-[#1C1C1C]"
              }`}
            />
          )}
        </div>
      </div>
    </div>
  );
}
