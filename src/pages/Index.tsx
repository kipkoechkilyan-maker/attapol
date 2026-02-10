import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import EarningsTicker from "@/components/EarningsTicker";
import StatsSection from "@/components/StatsSection";
import HowItWorks from "@/components/HowItWorks";
import EarningsPotential from "@/components/EarningsPotential";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <EarningsTicker />
      <StatsSection />
      <HowItWorks />
      <EarningsPotential />
      <Testimonials />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;
