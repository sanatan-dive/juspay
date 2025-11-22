"use client";

import {
  Plus,
  SlidersHorizontal,
  ArrowUpDown,
  MoreHorizontal,
  Calendar,
  ChevronDown,
  X,
} from "lucide-react";
import { useState, useMemo, useEffect, useRef } from "react";
import TableSkeleton from "./TableSkeleton";
import { useToast } from "../contexts/ToastContext";

type FilterStatus =
  | "All"
  | "In Progress"
  | "Complete"
  | "Pending"
  | "Approved"
  | "Rejected";
type SortField =
  | "id"
  | "user"
  | "project"
  | "address"
  | "date"
  | "status"
  | null;
type SortDirection = "asc" | "desc" | null;

export default function OrderList() {
  const { addToast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrders, setSelectedOrders] = useState<number[]>([3]); // Index 3 is checked by default
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<FilterStatus[]>([
    "All",
  ]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const filterRef = useRef<HTMLDivElement>(null);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setFilterOpen(false);
      }
    };

    if (filterOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterOpen]);

  const orders = [
    {
      id: "#CM9801",
      user: "Natali Craig",
      avatar: "bg-gray-200",
      project: "Landing Page",
      address: "Meadow Lane Oakland",
      date: "Just now",
      status: "In Progress",
      statusColor: "text-[#8A8CD9]",
      statusBgColor: "bg-[#8A8CD9]",
    },
    {
      id: "#CM9802",
      user: "Kate Morrison",
      avatar: "bg-purple-200",
      project: "CRM Admin pages",
      address: "Larry San Francisco",
      date: "A minute ago",
      status: "Complete",
      statusColor: "text-[#4AA785]",
      statusBgColor: "bg-[#4AA785]",
    },
    {
      id: "#CM9803",
      user: "Drew Cano",
      avatar: "bg-red-700",
      project: "Client Project",
      address: "Bagwell Avenue Ocala",
      date: "1 hour ago",
      status: "Pending",
      statusColor: "text-[#59A8D4]",
      statusBgColor: "bg-[#59A8D4]",
    },
    {
      id: "#CM9804",
      user: "Orlando Diggs",
      avatar: "bg-yellow-200",
      project: "Admin Dashboard",
      address: "Washburn Baton Rouge",
      date: "Yesterday",
      status: "Approved",
      statusColor: "text-[#FFC555]",
      statusBgColor: "bg-[#FFC555]",
    },
    {
      id: "#CM9805",
      user: "Andi Lane",
      avatar: "bg-orange-200",
      project: "App Landing Page",
      address: "Nest Lane Olivette",
      date: "Feb 2, 2023",
      status: "Rejected",
      statusColor: "text-[#1C1C1C66]",
      statusBgColor: "bg-[#1C1C1C66]",
      hasIcon: true,
    },
  ];

  // Duplicate for second set
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const baseOrders = useMemo(() => [...orders, ...orders], []);

  const filterStatuses: FilterStatus[] = [
    "All",
    "In Progress",
    "Complete",
    "Pending",
    "Approved",
    "Rejected",
  ];

  // Handle column sort
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction or clear sort
      if (sortDirection === "asc") {
        setSortDirection("desc");
        addToast("Sorted descending", "info", 2000);
      } else if (sortDirection === "desc") {
        setSortField(null);
        setSortDirection(null);
        addToast("Sort cleared", "info", 2000);
      }
    } else {
      setSortField(field);
      setSortDirection("asc");
      addToast("Sorted ascending", "info", 2000);
    }
  };

  // Filter and sort orders
  const filteredOrders = useMemo(() => {
    let result = baseOrders;

    // Apply status filter
    if (!selectedFilters.includes("All") && selectedFilters.length > 0) {
      result = result.filter((order) =>
        selectedFilters.includes(order.status as FilterStatus)
      );
    }

    // Apply search filter
    if (debouncedSearch.trim()) {
      const searchLower = debouncedSearch.toLowerCase();
      result = result.filter(
        (order) =>
          order.id.toLowerCase().includes(searchLower) ||
          order.user.toLowerCase().includes(searchLower) ||
          order.project.toLowerCase().includes(searchLower) ||
          order.address.toLowerCase().includes(searchLower) ||
          order.status.toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
    if (sortField && sortDirection) {
      result = [...result].sort((a, b) => {
        let aValue = a[sortField];
        let bValue = b[sortField];

        // Convert to lowercase for string comparison
        if (typeof aValue === "string") aValue = aValue.toLowerCase();
        if (typeof bValue === "string") bValue = bValue.toLowerCase();

        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [selectedFilters, baseOrders, debouncedSearch, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

  // Reset to page 1 when filters/search change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedFilters, debouncedSearch, sortField, sortDirection]);

  const handleSelectAll = () => {
    if (selectedOrders.length === paginatedOrders.length) {
      setSelectedOrders([]);
    } else {
      // Select only the orders on the current page
      const currentPageIndices = paginatedOrders.map(
        (_, index) => startIndex + index
      );
      setSelectedOrders(currentPageIndices);
    }
  };

  const handleSelectOrder = (index: number) => {
    const actualIndex = startIndex + index;
    setSelectedOrders((prev) =>
      prev.includes(actualIndex)
        ? prev.filter((i) => i !== actualIndex)
        : [...prev, actualIndex]
    );
  };

  const toggleFilter = (status: FilterStatus) => {
    if (status === "All") {
      setSelectedFilters(["All"]);
    } else {
      setSelectedFilters((prev) => {
        const withoutAll = prev.filter((f) => f !== "All");
        if (withoutAll.includes(status)) {
          const newFilters = withoutAll.filter((f) => f !== status);
          return newFilters.length === 0 ? ["All"] : newFilters;
        } else {
          return [...withoutAll, status];
        }
      });
    }
  };

  const isAllSelected =
    paginatedOrders.length > 0 &&
    paginatedOrders.every((_, index) =>
      selectedOrders.includes(startIndex + index)
    );
  const isSomeSelected =
    paginatedOrders.some((_, index) =>
      selectedOrders.includes(startIndex + index)
    ) && !isAllSelected;

  return (
    <div className="p-6">
      <h1 className="text-sm font-semibold text-[#1C1C1C] dark:text-white mb-5 transition-colors duration-300">
        Order List
      </h1>

      {isLoading ? (
        <TableSkeleton />
      ) : (
        <>
          {/* Action Bar */}
          <div className="bg-gray-50 dark:bg-[#282828] rounded-lg mb-1 transition-colors duration-300">
            <div className="flex items-center justify-between p-2">
              <div className="flex items-center gap-3">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-[#333333] rounded-md transition-colors duration-300">
                  <Plus className="w-5 h-5 text-[#1c1c1c] dark:text-white" />
                </button>

                {/* Filter Button with Dropdown */}
                <div className="relative" ref={filterRef}>
                  <button
                    onClick={() => setFilterOpen(!filterOpen)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-[#333333] rounded-md transition-colors duration-300 relative"
                  >
                    <SlidersHorizontal className="w-5 h-5 text-[#1c1c1c] dark:text-white" />
                    {selectedFilters.length > 0 &&
                      !selectedFilters.includes("All") && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#8A8CD9] text-white text-xs rounded-full flex items-center justify-center">
                          {selectedFilters.length}
                        </span>
                      )}
                  </button>

                  {/* Filter Dropdown */}
                  {filterOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-[#282828] border border-gray-200 dark:border-[#2E2E2E] rounded-lg shadow-lg z-50 py-2 dropdown-animate">
                      <div className="px-3 py-2 text-xs font-semibold text-[#1C1C1C]/60 dark:text-[#ffffff]/60 border-b border-gray-100 dark:border-[#2E2E2E] transition-colors duration-300">
                        Filter by Status
                      </div>
                      {filterStatuses.map((status) => (
                        <button
                          key={status}
                          onClick={() => toggleFilter(status)}
                          className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-[#333333] transition-colors duration-200 flex items-center justify-between"
                        >
                          <span className="text-[#1C1C1C] dark:text-white">
                            {status}
                          </span>
                          {selectedFilters.includes(status) && (
                            <div className="w-4 h-4 bg-[#8A8CD9] rounded-sm flex items-center justify-center">
                              <svg
                                className="w-3 h-3 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={3}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                          )}
                        </button>
                      ))}
                      <div className="border-t border-gray-100 dark:border-[#2E2E2E] mt-2 pt-2 px-3">
                        <button
                          onClick={() => {
                            setSelectedFilters(["All"]);
                            setFilterOpen(false);
                          }}
                          className="text-xs text-[#8A8CD9] hover:underline"
                        >
                          Clear all filters
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                <button className="p-2 hover:bg-gray-100 dark:hover:bg-[#333333] rounded-md transition-colors duration-300">
                  <ArrowUpDown className="w-5 h-5 text-[#1c1c1c] dark:text-white" />
                </button>
              </div>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-10 py-2 w-50 text-black/60 dark:text-white/60 bg-gray-50 dark:bg-[#1C1C1C] border border-gray-200 dark:border-[#2E2E2E] rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 dark:focus:ring-[#2E2E2E] transition-all duration-300 focus:border-[#8A8CD9] dark:focus:border-[#8A8CD9]"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#1C1C1C]/40 dark:text-[#ffffff]/40"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#1C1C1C]/40 dark:text-[#ffffff]/40 hover:text-[#1C1C1C] dark:hover:text-white transition-colors duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white dark:bg-[#1c1c1c] rounded-lg overflow-hidden transition-colors duration-300">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-[#2E2E2E] bg-white dark:bg-[#1c1c1c]">
                  <th className="text-left px-2 py-1.5 w-6">
                    <input
                      type="checkbox"
                      className="rounded"
                      checked={isAllSelected}
                      onChange={handleSelectAll}
                      ref={(input) => {
                        if (input) {
                          input.indeterminate = isSomeSelected;
                        }
                      }}
                    />
                  </th>
                  <th
                    className="text-left px-4 py-1.5 text-xs font-medium text-[#1c1c1c]/40 dark:text-[#ffffff]/40 cursor-pointer hover:text-[#1c1c1c] dark:hover:text-white transition-colors duration-200 select-none"
                    onClick={() => handleSort("id")}
                  >
                    <div className="flex items-center gap-1">
                      Order ID
                      {sortField === "id" && (
                        <ChevronDown
                          className={`w-3 h-3 transition-transform duration-200 ${
                            sortDirection === "asc" ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>
                  </th>
                  <th
                    className="text-left px-4 py-1.5 text-xs font-medium text-[#1c1c1c]/40 dark:text-[#ffffff]/40 cursor-pointer hover:text-[#1c1c1c] dark:hover:text-white transition-colors duration-200 select-none"
                    onClick={() => handleSort("user")}
                  >
                    <div className="flex items-center gap-1">
                      User
                      {sortField === "user" && (
                        <ChevronDown
                          className={`w-3 h-3 transition-transform duration-200 ${
                            sortDirection === "asc" ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>
                  </th>
                  <th
                    className="text-left px-4 py-1.5 text-xs font-medium text-[#1c1c1c]/40 dark:text-[#ffffff]/40 cursor-pointer hover:text-[#1c1c1c] dark:hover:text-white transition-colors duration-200 select-none"
                    onClick={() => handleSort("project")}
                  >
                    <div className="flex items-center gap-1">
                      Project
                      {sortField === "project" && (
                        <ChevronDown
                          className={`w-3 h-3 transition-transform duration-200 ${
                            sortDirection === "asc" ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>
                  </th>
                  <th
                    className="text-left px-4 py-1.5 text-xs font-medium text-[#1c1c1c]/40 dark:text-[#ffffff]/40 cursor-pointer hover:text-[#1c1c1c] dark:hover:text-white transition-colors duration-200 select-none"
                    onClick={() => handleSort("address")}
                  >
                    <div className="flex items-center gap-1">
                      Address
                      {sortField === "address" && (
                        <ChevronDown
                          className={`w-3 h-3 transition-transform duration-200 ${
                            sortDirection === "asc" ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>
                  </th>
                  <th
                    className="text-left px-4 py-1.5 text-xs font-medium text-[#1c1c1c]/40 dark:text-[#ffffff]/40 cursor-pointer hover:text-[#1c1c1c] dark:hover:text-white transition-colors duration-200 select-none"
                    onClick={() => handleSort("date")}
                  >
                    <div className="flex items-center gap-1">
                      Date
                      {sortField === "date" && (
                        <ChevronDown
                          className={`w-3 h-3 transition-transform duration-200 ${
                            sortDirection === "asc" ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>
                  </th>
                  <th
                    className="text-left px-4 py-1.5 text-xs font-medium text-[#1c1c1c]/40 dark:text-[#ffffff]/40 cursor-pointer hover:text-[#1c1c1c] dark:hover:text-white transition-colors duration-200 select-none"
                    onClick={() => handleSort("status")}
                  >
                    <div className="flex items-center gap-1">
                      Status
                      {sortField === "status" && (
                        <ChevronDown
                          className={`w-3 h-3 transition-transform duration-200 ${
                            sortDirection === "asc" ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>
                  </th>
                  <th className="w-12"></th>
                </tr>
              </thead>
              <tbody className="transition-all duration-300">
                {paginatedOrders.map((order, index) => (
                  <tr
                    key={`${order.id}-${startIndex + index}`}
                    className="border-b border-gray-100 dark:border-[#2E2E2E] last:border-0 hover:bg-gray-50 dark:hover:bg-[#333333] transition-colors duration-300"
                  >
                    <td className="px-2 py-2">
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(startIndex + index)}
                        onChange={() => handleSelectOrder(index)}
                        className="rounded"
                      />
                    </td>
                    <td className="px-4 py-2 text-xs text-[#1C1C1C] dark:text-white">
                      {order.id}
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-6 h-6 rounded-full ${order.avatar}`}
                        ></div>
                        <span className="text-xs text-[#1C1C1C] dark:text-white">
                          {order.user}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-2 text-xs text-[#1C1C1C] dark:text-white">
                      {order.project}
                    </td>
                    <td className="px-4 py-2 text-xs text-[#1C1C1C] dark:text-white">
                      <div className="flex items-center gap-1">
                        {order.address}
                        {order.hasIcon && (
                          <svg
                            className="w-4 h-4 text-[#1C1C1C]/40 dark:text-[#ffffff]/40"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-2 text-xs text-[#1C1C1C] dark:text-white">
                        <Calendar className="w-4 h-4 text-[#1C1C1C] dark:text-white" />
                        {order.date}
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      <div className="flex items-center gap-1.5">
                        <div
                          className={`w-2 h-2 rounded-full ${order.statusBgColor}`}
                        ></div>
                        <span className={`text-xs ${order.statusColor}`}>
                          {order.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-2">
                      {index === 4 && (
                        <button className="p-1 hover:bg-gray-100 dark:hover:bg-[#333333] rounded">
                          <MoreHorizontal className="w-4 h-4 text-[#1C1C1C]/40 dark:text-[#ffffff]/40" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center gap-2 mt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#1c1c1c]/60 dark:text-white/60">
                Showing {startIndex + 1}-
                {Math.min(endIndex, filteredOrders.length)} of{" "}
                {filteredOrders.length}
              </span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-2 py-1 bg-gray-50 dark:bg-[#282828] border border-gray-200 dark:border-[#2E2E2E] rounded-md text-sm text-[#1c1c1c] dark:text-white transition-colors duration-300"
              >
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
                <option value={20}>20 per page</option>
                <option value={50}>50 per page</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 hover:bg-gray-100 dark:hover:bg-[#333333] rounded-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  className="w-5 h-5 text-[#1c1c1c] dark:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Page Numbers */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-1 rounded-md text-sm transition-colors duration-300 ${
                      currentPage === pageNum
                        ? "bg-[#1c1c1c]/5 dark:bg-[#333333] text-[#1c1c1c] dark:text-white"
                        : "hover:bg-gray-100 dark:hover:bg-[#333333] text-[#1c1c1c] dark:text-white"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
                className="p-2 hover:bg-gray-100 dark:hover:bg-[#333333] rounded-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  className="w-5 h-5 text-[#1c1c1c] dark:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
