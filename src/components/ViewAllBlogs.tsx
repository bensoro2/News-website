"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface News {
  id: number;
  image: string;
  title: string;
  description: string;
  createdAt: string;
  type: string;
}

const ViewAllBlogs = () => {
  const [allNews, setAllNews] = useState<News[]>([]);

  useEffect(() => {
    const fetchAllNews = async () => {
      try {
        const response = await fetch("http://localhost:3001/news");
        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }
        const data: News[] = await response.json();
        setAllNews(data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchAllNews();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
      <h2 className="text-2xl font-bold mb-8">All Blogs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {allNews.map((news) => (
          <div
            key={news.id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <Link href={`/blog/${news.id}`}>
              <div>
                <img
                  src={`http://localhost:3001${news.image}`}
                  alt={news.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <p className="text-sm text-gray-500 mb-1">
                    {new Date(news.createdAt).toLocaleString("th-TH", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <h3 className="text-xl font-bold mb-2">{news.title}</h3>
                  {/* <p className="text-gray-600">{news.description}</p> */}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAllBlogs;
