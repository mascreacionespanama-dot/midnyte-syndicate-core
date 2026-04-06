import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BrandStatement from "@/components/BrandStatement";
import FeaturedProducts from "@/components/FeaturedProducts";
import ImpactText from "@/components/ImpactText";
import Collections from "@/components/Collections";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import SyndicateAI from "@/components/SyndicateAI";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroSection />
    <BrandStatement />
    <FeaturedProducts />
    <ImpactText />
    <Collections />
    <FinalCTA />
    <Footer />
    <SyndicateAI />
  </div>
);

export default Index;
