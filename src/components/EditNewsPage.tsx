// src/components/EditNewsPage.tsx

"use client";

import { useState, useEffect } from "react";
import AdminDashboard from "./AdminDashboard";
import { useRouter, useParams } from "next/navigation";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const EditNewsPage = () => {
  const [news, setNews] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    fetchNews();
  }, []);

  const editorConfiguration = {
    toolbar: [
      "heading",
      "|",
      "bold",
      "italic",
      "link",
      "bulletedList",
      "numberedList",
      "blockQuote",
      "imageUpload",
      "undo",
      "redo",
    ],
    ckfinder: {
      uploadUrl: "http://localhost:3001/upload", // URL สำหรับอัปโหลดรูปภาพไปยัง Backend
    },
  };

  const fetchNews = async () => {
    try {
      const response = await fetch(`http://localhost:3001/news/${id}`);
      if (response.ok) {
        const data = await response.json();
        setNews(data);
        setTitle(data.title);
        setDescription(data.description || "");
      } else {
        console.error("Failed to fetch news");
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const handleUpdateNews = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:3001/news/${id}`, {
        method: "PUT",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`, // เพิ่ม token ใน header
        },
      });
      if (response.ok) {
        router.push("/admin/dashboard");
      } else {
        console.error("Failed to update news");
      }
    } catch (error) {
      console.error("Error updating news:", error);
    }
  };

  if (!news) {
    return (
      <AdminDashboard>
        <div className="p-4">
          <p>Loading...</p>
        </div>
      </AdminDashboard>
    );
  }

  return (
    <AdminDashboard>
      <div className="p-4 max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Edit News</h2>
        <form onSubmit={handleUpdateNews}>
          {/* ฟิลด์สำหรับแก้ไขข้อมูลข่าว */}
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
            <CKEditor
              editor={ClassicEditor}
              config={editorConfiguration}
              data={description}
              onChange={(event, editor) => {
                const data = editor.getData();
                setDescription(data);
              }}
            />
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
            Update News
          </button>
        </form>
      </div>
    </AdminDashboard>
  );
};

export default EditNewsPage;
