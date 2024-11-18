"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface News {
  id: number;
  image: string;
  title: string;
  description: string;
  createdAt: string;
}

const BlogGrid = () => {
  const [latestNews, setLatestNews] = useState<News[]>([]);

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const response = await fetch("http://localhost:3001/news?limit=6");
        if (!response.ok) {
          throw new Error("Failed to fetch latest news");
        }
        const data = await response.json();
        setLatestNews(data);
      } catch (error) {
        console.error("Error fetching latest news:", error);
      }
    };

    fetchLatestNews();
  }, []);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Blog ล่าสุด</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {latestNews.map((news) => (
          <Link
            key={news.id}
            href={`/blog/${news.id}`}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={`http://localhost:3001${news.image}`}
              alt={news.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="text-sm text-gray-500 mb-1">
                {new Date(news.createdAt).toLocaleString("th-TH", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <h3 className="text-xl font-bold mb-2">{news.title}</h3>
              {/* <div
                className="text-gray-600"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(news.description),
                }}
              ></div> */}
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 text-right">
        <Link
          href="/blog"
          className="text-blue-500 hover:text-blue-600 font-bold"
        >
          View All Blogs
        </Link>
      </div>
    </div>
  );
};

export default BlogGrid;
