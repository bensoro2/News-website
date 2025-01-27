"use client";

import Sidebar from "./Sidebar";
import { useEffect, useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const AdminDashboard = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, isLoading, router]);

  if (isLoading || !isLoggedIn) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="md:hidden bg-white shadow-sm">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-500 hover:text-gray-600"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <span className="text-lg font-semibold">Admin Dashboard</span>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar - มือถือ */}
        <div
          className={`${
            isSidebarOpen ? "block" : "hidden"
          } md:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out`}
        >
          <Sidebar onClose={() => setIsSidebarOpen(false)} />
        </div>

        {/* Sidebar - จอใหญ่ */}
        <div className="hidden md:block shadow-xl">
          <div className="w-64 transition-all duration-200 h-screen">
            <Sidebar onClose={() => {}} />
          </div>
        </div>

        {/* Overlay สำหรับปิด Sidebar บนมือถือ */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="flex-1 md:p-8">
          <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm p-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
