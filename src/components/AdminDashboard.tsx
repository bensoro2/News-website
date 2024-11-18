"use client";

import Sidebar from "./Sidebar";
import { useEffect, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const AdminDashboard = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, isLoading } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, isLoading, router]);

  if (isLoading) {
    // สามารถแสดง Loading Spinner หรือข้อความ "กำลังโหลด..." ได้
    return null;
  }

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      <Sidebar />
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
};

export default AdminDashboard;
