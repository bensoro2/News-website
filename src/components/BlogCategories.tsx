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

const BlogCategories = () => {
  const [newsByCategory, setNewsByCategory] = useState<{
    [key: string]: News[];
  }>({});

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch("http://localhost:3001/news");
        if (!response.ok) {
          throw new Error("Failed to fetch news");
        }
        const data: News[] = await response.json();
        const groupedNews = data.reduce(
          (acc: { [key: string]: News[] }, newsItem) => {
            const category = newsItem.type;
            if (!acc[category]) {
              acc[category] = [];
            }
            acc[category].push(newsItem);
            return acc;
          },
          {}
        );
        setNewsByCategory(groupedNews);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {Object.keys(newsByCategory).map((categoryName, index) => (
          <div key={index}>
            <h3 className="text-xl font-bold mb-4 pb-2 border-b border-gray-200">
              {categoryName}
            </h3>

            <div className="space-y-6">
              {newsByCategory[categoryName].slice(0, 3).map((post) => (
                <div key={post.id}>
                  <Link href={`/blog/${post.id}`}>
                    <div>
                      <img
                        src={`http://localhost:3001${post.image}`}
                        alt={post.title}
                        className="w-full h-48 object-cover rounded mb-2"
                      />
                      <p className="text-sm text-gray-500 mb-1">
                        {new Date(post.createdAt).toLocaleString("th-TH", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                      <div className="font-bold hover:text-blue-500">
                        {post.title}
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            <Link href={`/category/${encodeURIComponent(categoryName)}`}>
              <div className="mt-4 text-blue-500 hover:text-blue-600 font-bold text-sm">
                View all {categoryName} blogs
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogCategories;
