// src/components/Sidebar.tsx

"use client";

import Link from "next/link";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import {
  FaTachometerAlt,
  FaUsers,
  FaCog,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { logout } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-gray-800 text-white transition-all duration-200 h-screen relative flex-shrink-0`}
    >
      {/* Toggle Button */}
      <button
        className="absolute top-4 right-4 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars />
      </button>

      {/* Logo */}
      <div className="flex items-center justify-center py-6">
        <Link href="/admin">
          <div className="text-2xl font-bold cursor-pointer">
            {isOpen ? "Admin" : "A"}
          </div>
        </Link>
      </div>

      {/* Menu Items */}
      <nav className="mt-10">
        <Link href="/admin/dashboard">
          <div className="flex items-center py-2 px-6 cursor-pointer hover:bg-gray-700">
            <FaTachometerAlt />
            {isOpen && <span className="ml-4">Dashboard</span>}
          </div>
        </Link>
        <Link href="/admin/users">
          <div className="flex items-center py-2 px-6 cursor-pointer hover:bg-gray-700">
            <FaUsers />
            {isOpen && <span className="ml-4">Users</span>}
          </div>
        </Link>
        <Link href="/admin/settings">
          <div className="flex items-center py-2 px-6 cursor-pointer hover:bg-gray-700">
            <FaCog />
            {isOpen && <span className="ml-4">Settings</span>}
          </div>
        </Link>
        <div
          className="flex items-center py-2 px-6 cursor-pointer hover:bg-gray-700 mt-auto absolute bottom-0 w-full"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          {isOpen && <span className="ml-4">Logout</span>}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
