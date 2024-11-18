"use client";

import { useState, useEffect } from "react";
import AdminDashboard from "./AdminDashboard";

const AdminSettingsPage = () => {
  const [facebookUrl, setFacebookUrl] = useState("");

  useEffect(() => {
    // ดึงค่าการตั้งค่าปัจจุบันจาก Backend
    const fetchSettings = async () => {
      try {
        const response = await fetch("http://localhost:3001/settings");
        if (response.ok) {
          const data = await response.json();
          setFacebookUrl(data.facebookUrl);
        } else {
          console.error("Failed to fetch settings");
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ facebookUrl }),
      });
      if (response.ok) {
        alert("Settings updated successfully");
      } else {
        console.error("Failed to update settings");
      }
    } catch (error) {
      console.error("Error updating settings:", error);
    }
  };

  return (
    <AdminDashboard>
      <div className="p-4 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Admin Settings</h2>
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">
              Facebook Page URL
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              value={facebookUrl}
              onChange={(e) => setFacebookUrl(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Save Settings
          </button>
        </form>
      </div>
    </AdminDashboard>
  );
};

export default AdminSettingsPage;
