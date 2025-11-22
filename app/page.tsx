"use client";

import { useState } from "react";
import Header from "./components/header";
import LeftSidebar from "./components/leftsidebar";
import RightSidebar from "./components/rightsidebar";
import Default from "./components/Default";
import OrderList from "./components/OrderList";

export default function Home() {
  const [isLeftSidebarOpen, setIsLeftSidebarOpen] = useState(true);
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState<"default" | "orders">(
    "default"
  );

  return (
    <div className="flex h-screen bg-white dark:bg-[#1C1C1C] transition-colors overflow-hidden">
      {/* Left Sidebar with smooth transition */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isLeftSidebarOpen ? "w-64" : "w-0"
        } overflow-hidden`}
      >
        <LeftSidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          onToggleLeftSidebar={() => setIsLeftSidebarOpen(!isLeftSidebarOpen)}
          onToggleRightSidebar={() =>
            setIsRightSidebarOpen(!isRightSidebarOpen)
          }
          onTogglePage={() =>
            setCurrentPage(currentPage === "default" ? "orders" : "default")
          }
          currentPage={currentPage}
        />
        <main className="flex-1 overflow-auto">
          {currentPage === "default" ? <Default /> : <OrderList />}
        </main>
      </div>

      {/* Right Sidebar with smooth transition */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isRightSidebarOpen ? "w-80" : "w-0"
        } overflow-hidden`}
      >
        <RightSidebar />
      </div>
    </div>
  );
}
