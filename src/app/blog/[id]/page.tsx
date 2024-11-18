// src/app/blog/[id]/page.tsx

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogDetail from "@/components/BlogDetail";

export default function BlogDetailPage() {
  return (
    <div>
      <Navbar />
      <BlogDetail />
      <Footer />
    </div>
  );
}
