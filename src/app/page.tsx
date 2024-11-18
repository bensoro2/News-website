import type { NextPage } from "next";
import Navbar from "../components/Navbar";
import BlogGrid from "../components/BlogGrid";
import BlogCategories from "../components/BlogCategories";
import Footer from "../components/Footer";

const Home: NextPage = () => {
  return (
    <div>
      <Navbar />
      <BlogGrid />
      <BlogCategories />
      <Footer />
    </div>
  );
};

export default Home;
