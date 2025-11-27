import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Leaf, Moon, Sun, User, LogOut, Camera } from "lucide-react";
import { useTheme } from "next-themes";
import { useNavigate } from "react-router-dom";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User as FirebaseUser } from "firebase/auth";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      unsubscribe();
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-lg border-b border-border" : "bg-transparent"
        }`}
    >
      <div className="container mx-auto px-2 sm:px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <Leaf className="w-6 h-6 text-primary" />
          <span className="text-xl font-bold text-foreground">NutriAI</span>
        </div>

        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          <button onClick={() => navigate("/")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Home
          </button>
          <button onClick={() => scrollToSection("features")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Features
          </button>
          <button onClick={() => scrollToSection("why-ai")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Why AI?
          </button>
          <button onClick={() => navigate("/scan")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Scan
          </button>
          <button onClick={() => navigate("/blog")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Blogs
          </button>
          {!user && (
            <button onClick={() => navigate("/login")} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Login
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
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

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full border-border/50 hover:bg-accent/50 hover:border-primary/30 transition-all duration-300"
                    >
                      <User className="h-5 w-5 text-foreground" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      {user.displayName || "My Account"}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/profile")}>
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => navigate("/login")}
                  className="rounded-full border-border/50 hover:bg-accent/50 hover:border-primary/30 transition-all duration-300 md:hidden"
                >
                  <User className="h-5 w-5 text-foreground" />
                </Button>
              )}
            </>
          )}
          <Button onClick={() => navigate("/scan")} className="rounded-full px-3 sm:px-6">
            <Camera className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Start Scan</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};
