import CategoryNewsList from "../../../components/CategoryNewsList";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const CategoryPage = ({ params }: { params: { category: string } }) => {
  return (
    <div>
      <Navbar />
      <CategoryNewsList />;
      <Footer />
    </div>
  );
};

export default CategoryPage;
