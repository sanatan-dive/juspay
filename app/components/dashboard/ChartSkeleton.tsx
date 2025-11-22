export default function ChartSkeleton() {
  return (
    <div className="bg-[#F7F9FB] dark:bg-[#282828] rounded-2xl p-5 h-full">
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 dark:bg-[#2E2E2E] rounded w-32"></div>
        <div className="h-48 bg-gray-200 dark:bg-[#2E2E2E] rounded"></div>
      </div>
    </div>
  );
}
