// src/components/AdminDashboardPage.tsx

"use client";

import { useEffect, useState } from "react";
import AdminDashboard from "./AdminDashboard";
import { useRouter } from "next/navigation";

interface News {
  id: number;
  title: string;
  image?: string;
  createdAt: string;
}

const AdminDashboardPage = () => {
  const [newsList, setNewsList] = useState<News[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchNewsList();
  }, []);

  const fetchNewsList = async () => {
    try {
      const response = await fetch("http://localhost:3001/news");
      if (response.ok) {
        const data = await response.json();
        setNewsList(data);
      } else {
        console.error("Failed to fetch news list");
      }
    } catch (error) {
      console.error("Error fetching news list:", error);
    }
  };

  const handleAddNews = () => {
    router.push("/admin/news/add");
  };

  const handleEditNews = (id: number) => {
    router.push(`/admin/news/edit/${id}`);
  };

  const handleDeleteNews = async (id: number) => {
    if (confirm("Are you sure you want to delete this news?")) {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:3001/news/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // แทนที่ 'token' ด้วย Token ที่ได้รับหลังจากการล็อกอิน
          },
        });
        if (response.ok) {
          fetchNewsList();
        } else {
          console.error("Failed to delete news");
        }
      } catch (error) {
        console.error("Error deleting news:", error);
      }
    }
  };

  return (
    <AdminDashboard>
      <div className="p-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h2 className="text-2xl font-bold mb-2 md:mb-0">Manage News</h2>
          <button
            onClick={handleAddNews}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Add News
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Title</th>
                <th className="py-3 px-6 text-center">Image</th>
                <th className="py-3 px-6 text-center">Created At</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {newsList.map((news) => (
                <tr
                  key={news.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left">{news.title}</td>
                  <td className="py-3 px-6 text-center">
                    {news.image && (
                      <img
                        src={`http://localhost:3001${news.image}`}
                        alt={news.title}
                        className="w-16 h-16 object-cover mx-auto"
                      />
                    )}
                  </td>
                  <td className="py-3 px-6 text-center">
                    {new Date(news.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <button
                      onClick={() => handleEditNews(news.id)}
                      className="text-blue-500 hover:underline mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteNews(news.id)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {newsList.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="py-3 px-6 text-center text-gray-500"
                  >
                    No news found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminDashboard>
  );
};

export default AdminDashboardPage;
