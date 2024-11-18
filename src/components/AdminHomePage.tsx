"use client";

import { useState, useEffect } from "react";
import AdminDashboard from "./AdminDashboard";

interface User {
  id: number;
  username: string;
  email: string;
  // Add other properties as needed
}

const AdminHomePage = () => {
  const [newsCount, setNewsCount] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchNewsCount = async () => {
      try {
        const response = await fetch("http://localhost:3001/news/count", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setNewsCount(data.count);
      } catch (error) {
        console.error("Error fetching news count:", error);
      }
    };

    const fetchAllUsers = async () => {
      try {
        const response = await fetch("http://localhost:3001/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchNewsCount();
    fetchAllUsers();
  }, []);

  return (
    <AdminDashboard>
      <h1 className="text-2xl font-bold mb-4">
        ยินดีต้อนรับสู่ Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-bold">จำนวนข่าวทั้งหมด</h2>
          <p className="text-3xl">
            {newsCount !== null ? newsCount : "Loading..."}
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-bold">จำนวนผู้ใช้ทั้งหมด</h2>
          <p className="text-3xl">{users.length}</p>
        </div>
      </div>
    </AdminDashboard>
  );
};

export default AdminHomePage;
