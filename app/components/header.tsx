"use client";

import { Search, Moon } from "lucide-react";
import { Bell, ClockCounterClockwise, Sidebar, Star, Sun } from "./icons";
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useToast } from "../contexts/ToastContext";

interface HeaderProps {
  onToggleLeftSidebar: () => void;
  onToggleRightSidebar: () => void;
  onTogglePage: () => void;
  currentPage: "default" | "orders";
}

export default function Header({
  onToggleLeftSidebar,
  onToggleRightSidebar,
  onTogglePage,
  currentPage,
}: HeaderProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const { addToast } = useToast();

  return (
    <header className="h-16 bg-white dark:bg-[#1c1c1c] border-b border-gray-200 dark:border-[#2E2E2E] flex items-center justify-between px-6 transition-colors duration-300">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Sidebar Toggle */}
        <button
          onClick={onToggleLeftSidebar}
          className="text-[#ffffff]/40 dark:text-gray-400 hover:text-[#1C1C1C] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#333333] rounded-md p-1 transition-colors duration-300"
        >
          <Sidebar />
        </button>

        {/* Star/Favorite Icon */}
        <div className="relative">
          <button
            onClick={onTogglePage}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="text-[#ffffff]/40 dark:text-gray-400 hover:text-[#1C1C1C] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#333333] rounded-md p-1 transition-colors duration-300"
          >
            <Star />
          </button>
          {showTooltip && (
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-gray-900 dark:bg-[#3A3A3A] text-white text-xs rounded whitespace-nowrap z-50 transition-colors duration-300">
              Orders
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 dark:bg-[#3A3A3A] rotate-45"></div>
            </div>
          )}
        </div>

        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-sm">
          <span className="text-[#1C1C1C]/40 dark:text-[#ffffff]/40 transition-colors duration-300">
            Dashboards
          </span>
          <span className="text-gray-300 dark:text-[#ffffff]/40 transition-colors duration-300">
            /
          </span>
          <span className="text-[#1C1C1C] dark:text-white font-normal transition-colors duration-300">
            {currentPage === "default" ? "Default" : "Order List"}
          </span>
        </nav>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        {/* Search Bar */}
        <div className="mr-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#1C1C1C]/40 dark:text-[#ffffff]/40" />
            <input
              type="text"
              placeholder="Search"
              className="w-50 pl-10 pr-16 py-2 bg-gray-50 dark:bg-[#282828] border border-gray-200 dark:border-[#2E2E2E] rounded-md text-sm text-[#1C1C1C] dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-300 dark:focus:ring-[#2E2E2E] focus:border-gray-300 dark:focus:border-[#2E2E2E] transition-colors duration-300"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-0.5 text-[#1C1C1C]/40 dark:text-[#ffffff]/40 text-xs">
              <span>⌘</span>
              <span>/</span>
            </div>
          </div>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 text-[#ffffff]/40 dark:text-gray-400 hover:text-[#1C1C1C] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#333333] rounded-md transition-colors duration-300"
        >
          {isDarkMode ? (
            <Moon className="w-5 h-5 text-[#ffffff]/80" />
          ) : (
            <Sun />
          )}
        </button>

        {/* History/Clock Icon */}
        <button className="p-2 text-[#ffffff]/40 dark:text-gray-400 hover:text-[#1C1C1C] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#333333] rounded-md transition-colors duration-300">
          <ClockCounterClockwise />
        </button>

        {/* Notifications */}
        <button
          onClick={() => addToast("New notification received!", "info")}
          className="p-2 text-[#ffffff]/40 dark:text-gray-400 hover:text-[#1C1C1C] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#333333] rounded-md transition-colors duration-300"
        >
          <Bell />
        </button>

        {/* Right Sidebar Toggle */}
        <button
          onClick={onToggleRightSidebar}
          className="p-2 text-[#ffffff]/40 dark:text-gray-400 hover:text-[#1C1C1C] dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#333333] rounded-md transition-colors duration-300"
        >
          <Sidebar />
        </button>
      </div>
    </header>
  );
}
