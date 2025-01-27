// src/components/Sidebar.tsx

"use client";

import Link from "next/link";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { FaTachometerAlt, FaUsers, FaCog, FaSignOutAlt } from "react-icons/fa";

interface SidebarProps {
  onClose: () => void;
}

const Sidebar = ({ onClose }: SidebarProps) => {
  const { logout } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="h-full flex flex-col">
      {/* ปุ่มปิดสำหรับมือถือ */}
      <div className="md:hidden p-4 flex justify-end">
        <button onClick={onClose} className="text-gray-500 hover:text-gray-600">
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
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div
        className={`bg-gradient-to-b from-gray-800 to-gray-900 text-white h-full relative`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center py-8 border-b border-gray-700">
          <Link href="/admin">
            <div className="text-2xl font-bold cursor-pointer hover:text-blue-400 transition-colors">
              Admin Portal
            </div>
          </Link>
        </div>

        {/* Menu Items */}
        <nav className="mt-8 px-4">
          <Link href="/admin/dashboard">
            <div className="flex items-center py-3 px-4 rounded-lg cursor-pointer hover:bg-gray-700 transition-all duration-200 mb-2">
              <FaTachometerAlt className="w-5 h-5" />
              <span className="ml-4 font-medium">Dashboard</span>
            </div>
          </Link>
          <Link href="/admin/users">
            <div className="flex items-center py-3 px-4 rounded-lg cursor-pointer hover:bg-gray-700 transition-all duration-200 mb-2">
              <FaUsers className="w-5 h-5" />
              <span className="ml-4 font-medium">Users</span>
            </div>
          </Link>
          <Link href="/admin/settings">
            <div className="flex items-center py-3 px-4 rounded-lg cursor-pointer hover:bg-gray-700 transition-all duration-200">
              <FaCog className="w-5 h-5" />
              <span className="ml-4 font-medium">Settings</span>
            </div>
          </Link>
        </nav>

        {/* Logout Button */}
        <div
          className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700"
          onClick={handleLogout}
        >
          <div className="flex items-center py-3 px-4 rounded-lg cursor-pointer hover:bg-gray-700 transition-all duration-200">
            <FaSignOutAlt className="w-5 h-5 text-red-400" />
            <span className="ml-4 font-medium">Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
