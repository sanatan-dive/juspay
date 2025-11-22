"use client";

import { useState } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import {
  BookOpen,
  ChartPieSlice,
  ChatsTearDrop,
  FolderNotch,
  IdCard1,
  IdCard2,
  Notebook,
  ShoppingBagOpen,
  UsersThree,
} from "./icons";

export default function LeftSidebar() {
  const [expandedPages, setExpandedPages] = useState<string[]>([
    "User Profile",
  ]);

  const togglePage = (pageName: string) => {
    setExpandedPages((prev) =>
      prev.includes(pageName)
        ? prev.filter((p) => p !== pageName)
        : [...prev, pageName]
    );
  };

  return (
    <div className="w-64 min-w-64 h-screen bg-white dark:bg-[#1c1c1c] border-r border-gray-200 dark:border-[#2E2E2E] overflow-y-auto transition-colors">
      {/* Header */}
      <div className="p-6 border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-full bg-gray-300 dark:bg-[#3A3A3A] flex items-center justify-center overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 dark:from-[#505050] dark:to-[#2A2A2A]"></div>
          </div>
          <h1 className="text-sm font-[400] text-[#1C1C1C] dark:text-white">
            ByeWind
          </h1>
        </div>
      </div>

      {/* Favorites/Recently Tabs */}
      <div className="px-6">
        <div className="flex gap-6">
          <button className="text-sm font-[400] text-[#1C1C1C]/40 dark:text-[#ffffff]/40 hover:text-[#1C1C1C]/20 dark:hover:text-gray-400">
            Favorites
          </button>
          <button className="text-sm font-[400] text-[#1C1C1C]/40 dark:text-[#ffffff]/40 hover:text-[#1C1C1C]/20 dark:hover:text-gray-400">
            Recently
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <div className="px-8 my-2">
        <ul className="space-y-2">
          <li className="flex items-center gap-3 font-[400] text-[#1C1C1C] dark:text-white text-sm py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1c1c1c]/20 dark:bg-[#ffffff]/40"></span>
            Overview
          </li>
          <li className="flex items-center font-[400] gap-3 text-[#1C1C1C] dark:text-white text-sm py-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1c1c1c]/20 dark:bg-[#ffffff]/40"></span>
            Projects
          </li>
        </ul>
      </div>

      {/* Dashboards Section */}
      <div className="px-6 py-4">
        <h3 className="text-sm font-[400] text-[#1C1C1C]/40 dark:text-[#ffffff]/40 mb-3">
          Dashboards
        </h3>
        <ul className="">
          <li className="flex items-center gap-1 px-3 py-1 bg-[#1C1C1C]/5 dark:bg-[#333333] rounded-lg text-[#1C1C1C] dark:text-white text-sm relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#1C1C1C] dark:bg-white my-1.5 rounded-lg"></div>
            <div className="flex gap-1 ml-5">
              <ChartPieSlice />
              <span>Default</span>
            </div>
          </li>
          <li className="flex items-center gap-1 px-3 py-1 text-[#1C1C1C] dark:text-white texttext-sm hover:bg-gray-50 dark:hover:bg-[#333333] rounded-lg cursor-pointer">
            <ChevronRight className="w-4 h-4 text-[#1C1C1C]/20 dark:text-[#ffffff]/40" />
            <ShoppingBagOpen />
            <span>eCommerce</span>
          </li>
          <li className="flex items-center gap-1 px-3 py-1 text-[#1C1C1C] dark:text-white text-sm hover:bg-gray-50 dark:hover:bg-[#333333] rounded-lg cursor-pointer">
            <ChevronRight className="w-4 h-4 text-[#1C1C1C]/20 dark:text-[#ffffff]/40" />
            <FolderNotch />
            <span>Projects</span>
          </li>
          <li className="flex items-center gap-1 px-3 py-1 text-[#1C1C1C] dark:text-white  text-sm hover:bg-gray-50 dark:hover:bg-[#333333] rounded-lg cursor-pointer">
            <ChevronRight className="w-4 h-4 text-[#1C1C1C]/20 dark:text-[#ffffff]/40" />
            <BookOpen />
            <span>Online Courses</span>
          </li>
        </ul>
      </div>

      {/* Pages Section */}
      <div className="px-6 py-4">
        <h3 className="text-sm font-medium text-[#1C1C1C]/40 dark:text-[#ffffff]/40 mb-3">
          Pages
        </h3>
        <ul className="space-y-1">
          {/* User Profile - Expandable */}
          <li>
            <button
              onClick={() => togglePage("User Profile")}
              className="flex items-center gap-1 w-full px-3 py-0 text-[#1C1C1C] dark:text-white text-sm hover:bg-gray-50 dark:hover:bg-[#333333] rounded-lg"
            >
              {expandedPages.includes("User Profile") ? (
                <ChevronDown className="w-4 h-4 text-[#1C1C1C]/20 dark:text-[#ffffff]/40" />
              ) : (
                <ChevronRight className="w-4 h-4 text-[#1C1C1C]/20 dark:text-[#ffffff]/40" />
              )}
              <IdCard1 />

              <span>User Profile</span>
            </button>
            {expandedPages.includes("User Profile") && (
              <ul className="ml-12 mt-1 -space-y-1">
                <li className="px-3 py-2 text-sm text-[#1C1C1C] dark:text-white hover:bg-gray-50 dark:hover:bg-[#333333] rounded-lg cursor-pointer">
                  Overview
                </li>
                <li className="px-3 py-2 text-sm text-[#1C1C1C] dark:text-white hover:bg-gray-50 dark:hover:bg-[#333333] rounded-lg cursor-pointer">
                  Projects
                </li>
                <li className="px-3 py-2 text-sm text-[#1C1C1C] dark:text-white hover:bg-gray-50 dark:hover:bg-[#333333] rounded-lg cursor-pointer">
                  Campaigns
                </li>
                <li className="px-3 py-2 text-sm text-[#1C1C1C] dark:text-white hover:bg-gray-50 dark:hover:bg-[#333333] rounded-lg cursor-pointer">
                  Documents
                </li>
                <li className="px-3 py-2 text-sm text-[#1C1C1C] dark:text-white hover:bg-gray-50 dark:hover:bg-[#333333] rounded-lg cursor-pointer">
                  Followers
                </li>
              </ul>
            )}
          </li>

          {/* Account */}
          <li className="flex items-center gap-1 px-3 py-1 text-[#1c1c1c] dark:text-white text-sm hover:bg-gray-50 dark:hover:bg-[#333333] rounded-lg cursor-pointer transition-colors duration-300">
            <ChevronRight className="w-4 h-4 text-[#1C1C1C]/20 dark:text-[#ffffff]/40" />
            <IdCard2 />
            <span>Account</span>
          </li>

          {/* Corporate */}
          <li className="flex items-center gap-1 px-3 py-1 text-[#1c1c1c] dark:text-white text-sm hover:bg-gray-50 dark:hover:bg-[#333333] rounded-lg cursor-pointer transition-colors duration-300">
            <ChevronRight className="w-4 h-4 text-[#1C1C1C]/20 dark:text-[#ffffff]/40" />
            <UsersThree />
            <span>Corporate</span>
          </li>

          {/* Blog */}
          <li className="flex items-center gap-1 px-3 py-1 text-[#1c1c1c] dark:text-white text-sm hover:bg-gray-50 dark:hover:bg-[#333333] rounded-lg cursor-pointer transition-colors duration-300">
            <ChevronRight className="w-4 h-4 text-[#1C1C1C]/20 dark:text-[#ffffff]/40" />
            <Notebook />
            <span>Blog</span>
          </li>

          {/* Social */}
          <li className="flex items-center gap-1 px-3 py-1 text-[#1c1c1c] dark:text-white text-sm hover:bg-gray-50 dark:hover:bg-[#333333] rounded-lg cursor-pointer transition-colors duration-300">
            <ChevronRight className="w-4 h-4 text-[#1C1C1C]/20 dark:text-[#ffffff]/40" />
            <ChatsTearDrop />
            <span>Social</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
