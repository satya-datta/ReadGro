"use client";
import { useState } from "react";
import SidebarDashboard from "../dashboards/SidebarDashboard";
import { X, Menu } from "lucide-react";

const DashboardContainer = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <section className="w-full pt-20 pb-8 px-4 md:px-8 relative">
      {/* Hamburger Button (mobile only) */}
      <button
        className="lg:hidden fixed top-5 left-4 z-50 bg-white p-2 rounded-md shadow-md"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu />
      </button>

      {/* Main layout container */}
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Sidebar - Desktop */}
        <div className="hidden lg:block lg:w-1/4">
          <SidebarDashboard />
        </div>

        {/* Sidebar - Mobile Drawer */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform z-40 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:hidden`}
        >
          <div className="flex justify-between items-center px-4 py-3 border-b">
            <span className="font-bold">Menu</span>
            <button onClick={() => setSidebarOpen(false)}>
              <X />
            </button>
          </div>
          <SidebarDashboard />
        </div>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main Dashboard Content */}
        <div className="w-full lg:w-3/4">{children}</div>
      </div>
    </section>
  );
};

export default DashboardContainer;
