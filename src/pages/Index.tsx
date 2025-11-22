import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { PainPoints } from "@/components/PainPoints";
import { HowItWorks } from "@/components/HowItWorks";
import { HealthScore } from "@/components/HealthScore";
import { Gamification } from "@/components/Gamification";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <PainPoints />
      <HowItWorks />
      <HealthScore />
      <Gamification />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
