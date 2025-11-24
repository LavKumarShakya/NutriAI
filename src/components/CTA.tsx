import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Camera, Sparkles } from "lucide-react";

export const CTA = () => {
  return (
    <section id="cta" className="py-20 px-4 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10">
      <div className="container mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-card/50 backdrop-blur-lg border border-border rounded-3xl p-12 shadow-2xl"
        >
          <Sparkles className="w-16 h-16 text-primary mx-auto mb-6" />

          <h2 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            Start Your Healthy
            <br />
            <span className="text-primary">Journey Today</span>
          </h2>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            No credit card required. No confusing forms. Just snap a photo and get instant guidance.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link to="/scan">
              <Button size="lg" className="rounded-full gap-2 text-lg px-8 py-6">
                <Camera className="w-6 h-6" />
                Try AI Food Scanner
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <span className="text-primary">✓</span> Free to start
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">✓</span> No setup needed
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">✓</span> Works instantly
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">✓</span> Privacy first
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
