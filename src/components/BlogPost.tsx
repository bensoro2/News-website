"use client";

import { useEffect, useRef } from "react";
import { FaEye } from "react-icons/fa";
import Link from "next/link";
import DOMPurify from "dompurify";

interface RelatedPost {
  id: number;
  title: string;
  image: string;
  createdAt: string;
  type: string;
}

interface BlogPostProps {
  post: {
    id: number;
    title: string;
    date: string;
    views: number;
    image: string;
    content: string;
    type: string;
    relatedPosts: RelatedPost[];
  };
}

const BlogPost = ({ post }: BlogPostProps) => {
  const { relatedPosts } = post;

  // ใช้ useRef เพื่อป้องกันการเพิ่มยอดวิวซ้ำ
  const hasIncrementedView = useRef(false);

  useEffect(() => {
    if (!hasIncrementedView.current) {
      incrementViewCount();
      hasIncrementedView.current = true;
    }
  }, []);

  const incrementViewCount = async () => {
    try {
      await fetch(`http://localhost:3001/news/${post.id}/increment-views`, {
        method: "POST",
      });
    } catch (error) {
      console.error("Failed to increment view count:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <article>
        <header className="mb-8">
          <img
            src={`http://localhost:3001${post.image}`}
            alt={post.title}
            className="w-full h-96 object-cover rounded-lg shadow-md"
          />

          <h1 className="mt-6 text-3xl font-bold leading-tight">
            {post.title}
          </h1>

          <div className="mt-4 flex items-center space-x-4 text-gray-500">
            <time dateTime={post.date}>{post.date}</time>
            <div className="flex items-center">
              <FaEye className="mr-1.5" />
              <span>{post.views.toLocaleString()} views</span>
            </div>
          </div>
        </header>

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.content),
          }}
        ></div>
      </article>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <div className="mt-48">
          <h2 className="text-2xl font-bold mb-6">บทความที่เกี่ยวข้อง</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {relatedPosts.map((relatedPost) => (
              <div key={relatedPost.id} className="flex flex-col">
                <Link href={`/blog/${relatedPost.id}`}>
                  <div className="cursor-pointer">
                    <img
                      src={`http://localhost:3001${relatedPost.image}`}
                      alt={relatedPost.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-xl font-bold">{relatedPost.title}</h3>
                    <p className="text-sm text-gray-500">
                      {new Date(relatedPost.createdAt).toLocaleString("th-TH", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPost;
