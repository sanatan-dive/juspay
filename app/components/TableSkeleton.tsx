export default function TableSkeleton() {
  return (
    <div className="bg-white dark:bg-[#1c1c1c] rounded-lg overflow-hidden">
      <div className="animate-pulse">
        {/* Header */}
        <div className="border-b border-gray-200 dark:border-[#2E2E2E] bg-white dark:bg-[#1c1c1c] p-4">
          <div className="flex gap-4">
            <div className="h-4 bg-gray-200 dark:bg-[#2E2E2E] rounded w-24"></div>
            <div className="h-4 bg-gray-200 dark:bg-[#2E2E2E] rounded w-32"></div>
            <div className="h-4 bg-gray-200 dark:bg-[#2E2E2E] rounded w-40"></div>
            <div className="h-4 bg-gray-200 dark:bg-[#2E2E2E] rounded w-32"></div>
            <div className="h-4 bg-gray-200 dark:bg-[#2E2E2E] rounded w-24"></div>
            <div className="h-4 bg-gray-200 dark:bg-[#2E2E2E] rounded w-20"></div>
          </div>
        </div>

        {/* Rows */}
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="border-b border-gray-100 dark:border-[#2E2E2E] p-4"
          >
            <div className="flex gap-4 items-center">
              <div className="h-4 w-4 bg-gray-200 dark:bg-[#2E2E2E] rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-[#2E2E2E] rounded w-24"></div>
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 bg-gray-200 dark:bg-[#2E2E2E] rounded-full"></div>
                <div className="h-4 bg-gray-200 dark:bg-[#2E2E2E] rounded w-32"></div>
              </div>
              <div className="h-4 bg-gray-200 dark:bg-[#2E2E2E] rounded w-40"></div>
              <div className="h-4 bg-gray-200 dark:bg-[#2E2E2E] rounded w-32"></div>
              <div className="h-4 bg-gray-200 dark:bg-[#2E2E2E] rounded w-24"></div>
              <div className="h-4 bg-gray-200 dark:bg-[#2E2E2E] rounded w-20"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
