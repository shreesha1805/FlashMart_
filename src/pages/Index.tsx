import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Categories from "@/components/Categories";
import FeaturedProducts from "@/components/FeaturedProducts";
import HowItWorks from "@/components/HowItWorks";
import DownloadBanner from "@/components/DownloadBanner";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <Categories />
      <FeaturedProducts />
      <HowItWorks />
      <DownloadBanner />
      <Footer />
    </div>
  );
};

export default Index;
