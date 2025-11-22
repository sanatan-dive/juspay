export default function StatCardSkeleton() {
  return (
    <div className="bg-white dark:bg-[#282828] rounded-2xl p-6">
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 dark:bg-[#2E2E2E] rounded w-24"></div>
        <div className="flex items-end justify-between">
          <div className="h-8 bg-gray-200 dark:bg-[#2E2E2E] rounded w-32"></div>
          <div className="h-4 bg-gray-200 dark:bg-[#2E2E2E] rounded w-16"></div>
        </div>
      </div>
    </div>
  );
}
