// src/components/BlogDetail.tsx

"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import BlogPost from "./BlogPost";

interface News {
  id: number;
  title: string;
  createdAt: string;
  view: number;
  image: string;
  description: string;
  type: string;
}

interface RelatedPost {
  id: number;
  title: string;
  image: string;
  createdAt: string;
  type: string;
}

// You can remove the BlogDetailProps interface since no props are needed

const BlogDetail = () => {
  const params = useParams();
  const { id } = params;
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch the main article
      const response = await fetch(`http://localhost:3001/news/${id}`, {
        cache: "no-store",
      });

      if (response.ok) {
        const news: News = await response.json();

        // Fetch related posts
        const relatedResponse = await fetch(
          `http://localhost:3001/news/related?type=${encodeURIComponent(
            news.type
          )}&excludeId=${news.id}&limit=2`,
          {
            cache: "no-store",
          }
        );

        let relatedPosts: RelatedPost[] = [];

        if (relatedResponse.ok) {
          relatedPosts = await relatedResponse.json();
        }

        // Prepare the post object
        const formattedPost = {
          id: news.id,
          title: news.title,
          date: new Date(news.createdAt).toLocaleString("th-TH", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
          views: news.view,
          image: news.image,
          content: news.description,
          type: news.type,
          relatedPosts,
        };

        // Set the post state
        setPost(formattedPost);
      } else {
        // Handle error
        console.error("Failed to fetch the news article.");
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (!post) {
    return <div>กำลังโหลด...</div>;
  }

  return <BlogPost post={post} />;
};

export default BlogDetail;
