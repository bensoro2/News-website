// src/components/EditUserPage.tsx

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminDashboard from "./AdminDashboard";

interface EditUserPageProps {
  userId: string;
}

const EditUserPage = ({ userId }: EditUserPageProps) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}`);
      if (response.ok) {
        const data = await response.json();
        setUsername(data.username);
        setEmail(data.email);
      } else {
        console.error("Failed to fetch user");
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
        }),
      });
      if (response.ok) {
        router.push("/admin/users");
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <AdminDashboard>
      <div className="p-6 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">Edit User</h2>
        <form onSubmit={handleUpdateUser}>
          <div className="mb-4">
            <label className="block mb-1">Username</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded-md"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Email</label>
            <input
              type="email"
              className="w-full border px-3 py-2 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Update User
          </button>
        </form>
      </div>
    </AdminDashboard>
  );
};

export default EditUserPage;
