"use client";

import { useState, useEffect } from "react";
import StatCard from "./dashboard/StatCard";
import ProjectionsChart from "./dashboard/ProjectionsChart";
import RevenueChart from "./dashboard/RevenueChart";
import RevenueByLocation from "./dashboard/RevenueByLocation";
import TopSellingProducts from "./dashboard/TopSellingProducts";
import TotalSales from "./dashboard/TotalSales";
import StatCardSkeleton from "./dashboard/StatCardSkeleton";
import ChartSkeleton from "./dashboard/ChartSkeleton";

export default function Default() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-6 mx-2 my-1">
      <h1 className="text-sm font-semibold text-[#1C1C1C] dark:text-white mb-5">
        eCommerce
      </h1>

      {/* Main Grid */}
      <div className="grid grid-cols-1  lg:grid-cols-2 gap-5 mb-5">
        {/* Left side - 2x2 Stat Cards */}
        <div className="grid grid-cols-2 gap-5 auto-rows-min">
          {isLoading ? (
            <>
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
              <StatCardSkeleton />
            </>
          ) : (
            <>
              <StatCard
                title="Customers"
                value="3,781"
                change="+11.01%"
                isPositive={true}
                bgColor="bg-[#E3F5FF]"
              />
              <StatCard
                title="Orders"
                value="1,219"
                change="-0.03%"
                isPositive={false}
                bgColor="bg-[#F7F9FB]"
              />
              <StatCard
                title="Revenue"
                value="$695"
                change="+15.03%"
                isPositive={true}
                bgColor="bg-[#F7F9FB]"
              />
              <StatCard
                title="Growth"
                value="30.1%"
                change="+6.08%"
                isPositive={true}
                bgColor="bg-[#E5ECF6]"
              />
            </>
          )}
        </div>

        {/* Right side - Projections Chart */}
        <div>{isLoading ? <ChartSkeleton /> : <ProjectionsChart />}</div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 mb-5">
        <div className="lg:col-span-3">
          {isLoading ? <ChartSkeleton /> : <RevenueChart />}
        </div>
        <div>{isLoading ? <ChartSkeleton /> : <RevenueByLocation />}</div>
      </div>

      {/* Bottom Row - Top Selling Products and Total Sales */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        <div className="lg:col-span-3">
          {isLoading ? <ChartSkeleton /> : <TopSellingProducts />}
        </div>
        <div>{isLoading ? <ChartSkeleton /> : <TotalSales />}</div>
      </div>
    </div>
  );
}
