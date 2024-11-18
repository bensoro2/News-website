"use client";

import { useState, useEffect } from "react";
import AdminDashboard from "./AdminDashboard";
import { useRouter } from "next/navigation";

const AddNewsPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [types, setTypes] = useState<string[]>([]);
  const [type, setType] = useState("");

  const router = useRouter();

  useEffect(() => {
    fetchTypes();
  }, []);

  const fetchTypes = async () => {
    try {
      const response = await fetch("http://localhost:3001/news/types");
      if (response.ok) {
        const data = await response.json();
        setTypes(data);
      } else {
        console.error("Failed to fetch types");
      }
    } catch (error) {
      console.error("Error fetching types:", error);
    }
  };

  const handleAddNews = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("type", type);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3001/news", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        router.push("/admin/dashboard");
      } else {
        console.error("Failed to add news");
      }
    } catch (error) {
      console.error("Error adding news:", error);
    }
  };

  return (
    <AdminDashboard>
      <div className="p-4 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Add News</h2>
        <form onSubmit={handleAddNews}>
          {/* ฟิลด์สำหรับกรอกข้อมูลข่าว */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Title</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Description</label>
            <textarea
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              required
            ></textarea>
          </div>
          {/* ช่องเลือกประเภทข่าว */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Type</label>
            <select
              className="w-full px-4 py-2 border rounded-md focus:outline-none"
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="">Select a type</option>
              {types.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImageFile(e.target.files ? e.target.files[0] : null)
              }
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Add News
          </button>
        </form>
      </div>
    </AdminDashboard>
  );
};

export default AddNewsPage;
