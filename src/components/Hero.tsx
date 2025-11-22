import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Camera, Sparkles } from "lucide-react";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const beforeOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const afterOpacity = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={containerRef} id="hero" className="relative min-h-[150vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ opacity, scale }} className="absolute inset-0 flex items-center justify-center">
          
          {/* Before State - Unhealthy/Confusion */}
          <motion.div
            style={{ opacity: beforeOpacity }}
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-destructive/10 to-muted/30"
          >
            <div className="text-center space-y-6 px-4 blur-sm">
              <h2 className="text-4xl md:text-6xl font-bold text-destructive opacity-50">
                Confused About Calories?
              </h2>
              <div className="flex flex-wrap justify-center gap-4 opacity-40">
                <div className="bg-card p-4 rounded-lg border border-border">❓ 500 cal?</div>
                <div className="bg-card p-4 rounded-lg border border-border">❓ 800 cal?</div>
                <div className="bg-card p-4 rounded-lg border border-border">❓ 1200 cal?</div>
              </div>
            </div>
          </motion.div>

          {/* After State - Healthy/AI Clarity */}
          <motion.div
            style={{ opacity: afterOpacity }}
            className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/20"
          >
            <div className="text-center space-y-8 px-4 max-w-4xl mx-auto">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <Sparkles className="w-16 h-16 text-primary mx-auto mb-4" />
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-foreground">
                Know What You Eat,
                <br />
                <span className="text-primary">Instantly.</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                AI-powered food recognition that shows calories, nutrition, and healthier alternatives in seconds.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" className="rounded-full gap-2 text-lg px-8" onClick={() => scrollToSection("cta")}>
                  <Camera className="w-5 h-5" />
                  Try It Now
                </Button>
                <Button size="lg" variant="outline" className="rounded-full text-lg px-8" onClick={() => scrollToSection("how-it-works")}>
                  See How It Works
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto mt-8">
                <div className="bg-card/50 backdrop-blur-sm p-4 rounded-xl border border-border">
                  <div className="text-3xl font-bold text-primary">1sec</div>
                  <div className="text-sm text-muted-foreground">Food Scan</div>
                </div>
                <div className="bg-card/50 backdrop-blur-sm p-4 rounded-xl border border-border">
                  <div className="text-3xl font-bold text-primary">100+</div>
                  <div className="text-sm text-muted-foreground">Foods</div>
                </div>
                <div className="bg-card/50 backdrop-blur-sm p-4 rounded-xl border border-border">
                  <div className="text-3xl font-bold text-primary">0-100</div>
                  <div className="text-sm text-muted-foreground">Health Score</div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
