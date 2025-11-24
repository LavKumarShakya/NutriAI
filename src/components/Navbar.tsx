import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Leaf, Moon, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-lg border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection("hero")}>
          <Leaf className="w-6 h-6 text-primary" />
          <span className="text-xl font-bold text-foreground">NutriAI</span>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <button onClick={() => scrollToSection("how-it-works")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            How It Works
          </button>
          <button onClick={() => scrollToSection("features")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Features
          </button>
          <button onClick={() => scrollToSection("gamification")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Track Progress
          </button>
          <button onClick={() => scrollToSection("testimonials")} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Reviews
          </button>
        </div>

        <div className="flex items-center gap-3">
          {mounted && (
            <>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full border-border/50 hover:bg-accent/50 hover:border-primary/30 transition-all duration-300"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5 text-foreground transition-transform rotate-0 scale-100" />
                ) : (
                  <Moon className="h-5 w-5 text-foreground transition-transform rotate-0 scale-100" />
                )}
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => navigate("/profile")}
                className="rounded-full border-border/50 hover:bg-accent/50 hover:border-primary/30 transition-all duration-300"
              >
                <User className="h-5 w-5 text-foreground" />
              </Button>
            </>
          )}
          <Button onClick={() => scrollToSection("cta")} className="rounded-full">
            Try It Free
          </Button>
        </div>
      </div>
    </nav>
  );
};
