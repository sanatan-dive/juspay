interface SkeletonLoaderProps {
  variant?: "card" | "table" | "chart" | "text" | "circle";
  width?: string;
  height?: string;
  count?: number;
}

export default function SkeletonLoader({
  variant = "text",
  width = "w-full",
  height = "h-4",
  count = 1,
}: SkeletonLoaderProps) {
  const baseClasses = "bg-gray-200 dark:bg-[#2E2E2E] animate-pulse rounded";

  const variants = {
    card: `${baseClasses} ${width} ${height}`,
    table: `${baseClasses} ${width} h-12`,
    chart: `${baseClasses} ${width} ${height}`,
    text: `${baseClasses} ${width} ${height}`,
    circle: `${baseClasses} rounded-full ${width} ${height}`,
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={variants[variant]} />
      ))}
    </>
  );
}
