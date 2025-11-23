import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Camera, Zap, TrendingUp, Award } from "lucide-react";
import { useEffect, useRef } from "react";

export const Hero = () => {
  const saladBowlRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (saladBowlRef.current) {
        saladBowlRef.current.style.transform = `translateY(-50%) rotate(${scrollY * 0.3}deg)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const floatingAnimation = {
    y: [0, -20, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  };

  const foodEmojis = ["🍕", "🍔", "🥗", "🍎", "🥑", "🍜", "🌮", "🍱"];

  return (
    <div id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      {/* Salad Bowl with Scroll Rotation */}
      <div 
        ref={saladBowlRef}
        className="fixed right-8 top-1/2 -translate-y-1/2 z-20 text-[120px] opacity-20 pointer-events-none"
        style={{ filter: 'drop-shadow(0 0 20px rgba(74, 222, 128, 0.3))' }}
      >
        🥗
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {foodEmojis.map((emoji, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl opacity-10"
            initial={{ 
              x: Math.random() * window.innerWidth, 
              y: Math.random() * window.innerHeight 
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
            style={{
              left: `${(i * 12) % 100}%`,
              top: `${(i * 15) % 80}%`,
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        <div className="text-center space-y-8">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
              <Zap className="w-4 h-4" />
              AI-Powered Nutrition Analysis
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground">
              Snap. Analyze.
              <br />
              <span className="bg-gradient-to-r from-primary via-health-good to-primary bg-clip-text text-transparent">
                Eat Smarter.
              </span>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto"
          >
            Instantly know what's in your food with AI. Get calories, nutrition facts, and personalized health recommendations in seconds.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              size="lg" 
              className="rounded-full gap-2 text-lg px-10 h-14 shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
              onClick={() => scrollToSection("cta")}
            >
              <Camera className="w-5 h-5" />
              Start Scanning
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="rounded-full text-lg px-10 h-14 border-2"
              onClick={() => scrollToSection("how-it-works")}
            >
              How It Works
            </Button>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16"
          >
            <motion.div
              animate={floatingAnimation}
              className="bg-card/80 backdrop-blur-xl p-6 rounded-2xl border border-border shadow-lg"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div className="text-4xl font-bold text-foreground">1sec</div>
              </div>
              <div className="text-muted-foreground">Instant Recognition</div>
            </motion.div>

            <motion.div
              animate={floatingAnimation}
              transition={{ delay: 0.2 }}
              className="bg-card/80 backdrop-blur-xl p-6 rounded-2xl border border-border shadow-lg"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-health-good/10 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-health-good" />
                </div>
                <div className="text-4xl font-bold text-foreground">100+</div>
              </div>
              <div className="text-muted-foreground">Foods Tracked</div>
            </motion.div>

            <motion.div
              animate={floatingAnimation}
              transition={{ delay: 0.4 }}
              className="bg-card/80 backdrop-blur-xl p-6 rounded-2xl border border-border shadow-lg"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-secondary/10 rounded-lg">
                  <Award className="w-6 h-6 text-secondary" />
                </div>
                <div className="text-4xl font-bold text-foreground">0-100</div>
              </div>
              <div className="text-muted-foreground">Health Score</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
};
