import { useState, useRef } from "react";
import { Camera, Upload, X, Sparkles, Activity, Utensils, Flame, Info, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const FoodScan = () => {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!image) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image }),
      });

      const data = await response.json();
      setResult(data);
      toast.success("Food analyzed successfully!");
    } catch (error) {
      toast.error("Failed to analyze food. Make sure Backend server is running.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const resetScan = () => {
    setImage(null);
    setResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background to-secondary/20">
      <Navbar />

      <main className="flex-grow p-8 pt-24">
        <div className="max-w-6xl mx-auto">

          {/* Header - Only show when no image is selected to keep focus */}
          {!image && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                AI Food Scanner
              </h1>
              <p className="text-xl text-muted-foreground mb-12">
                Instantly analyze your meal's nutrition with one photo
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-12 text-left">
                <div className="bg-card/50 backdrop-blur border border-border p-6 rounded-xl hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Camera className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2 text-lg">1. Snap a Photo</h3>
                  <p className="text-sm text-muted-foreground">Take a clear picture of your meal or upload from your gallery</p>
                </div>
                <div className="bg-card/50 backdrop-blur border border-border p-6 rounded-xl hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="font-semibold mb-2 text-lg">2. AI Analysis</h3>
                  <p className="text-sm text-muted-foreground">Our advanced AI identifies ingredients and estimates portion sizes</p>
                </div>
                <div className="bg-card/50 backdrop-blur border border-border p-6 rounded-xl hover:shadow-lg transition-all">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Activity className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2 text-lg">3. Get Insights</h3>
                  <p className="text-sm text-muted-foreground">View detailed macros, calories, and a personalized health score</p>
                </div>
              </div>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {!image ? (
              /* Upload State */
              <motion.div
                key="upload"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-2xl mx-auto bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-8 shadow-2xl"
              >
                <div
                  className="border-2 border-dashed border-border rounded-2xl p-12 text-center hover:bg-secondary/50 transition-colors cursor-pointer group"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <Upload className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-3">Upload your meal</h3>
                  <p className="text-muted-foreground mb-8 text-lg">Drag and drop or click to browse</p>

                  <div className="flex gap-4 justify-center">
                    <Button variant="default" size="lg" className="h-12 px-8 text-lg">
                      <Upload className="mr-2 w-5 h-5" />
                      Select Image
                    </Button>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Split View State */
              <motion.div
                key="analysis"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid lg:grid-cols-2 gap-8 items-start"
              >
                {/* Left Column: Image */}
                <div className="sticky top-24">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-border bg-card">
                    <img
                      src={image}
                      alt="Food preview"
                      className="w-full h-[500px] object-cover"
                    />
                    <Button
                      onClick={resetScan}
                      variant="destructive"
                      size="icon"
                      className="absolute top-4 right-4 rounded-full shadow-lg hover:scale-110 transition-transform"
                    >
                      <X className="w-5 h-5" />
                    </Button>

                    {/* Image Overlay Gradient */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  </div>
                </div>

                {/* Right Column: Results or Action */}
                <div className="space-y-6">
                  {!result ? (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-8 shadow-xl"
                    >
                      <h2 className="text-3xl font-bold mb-2">Ready to Analyze?</h2>
                      <p className="text-muted-foreground mb-8 text-lg">
                        Our AI will identify the food, calculate calories, and breakdown nutrition facts.
                      </p>

                      <Button
                        onClick={handleAnalyze}
                        disabled={loading}
                        className="w-full text-lg h-16 rounded-2xl shadow-lg shadow-primary/20"
                        size="lg"
                      >
                        {loading ? (
                          <>
                            <Sparkles className="mr-3 h-6 w-6 animate-spin" />
                            Analyzing your food...
                          </>
                        ) : (
                          <>
                            <Utensils className="mr-3 h-6 w-6" />
                            Analyze Food
                          </>
                        )}
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-6"
                    >
                      {/* Main Result Card */}
                      <div className="bg-card/90 backdrop-blur-xl border border-border rounded-3xl p-8 shadow-xl">
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <div className="text-sm text-muted-foreground uppercase tracking-wider font-semibold mb-1">Detected Food</div>
                            <h2 className="text-3xl font-bold text-foreground capitalize">{result.food_name || "Unknown Food"}</h2>
                          </div>
                          <div className={`px-4 py-2 rounded-full font-bold text-lg ${(result.health_score || 0) >= 70 ? 'bg-green-500/10 text-green-500' :
                            (result.health_score || 0) >= 40 ? 'bg-yellow-500/10 text-yellow-500' :
                              'bg-red-500/10 text-red-500'
                            }`}>
                            {result.health_score || 0}/100 Score
                          </div>
                        </div>

                        {/* Calories */}
                        <div className="bg-secondary/30 rounded-2xl p-6 mb-6 flex items-center justify-between border border-border/50">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center">
                              <Flame className="w-6 h-6 text-orange-500" />
                            </div>
                            <div>
                              <div className="text-sm text-muted-foreground font-medium">Energy</div>
                              <div className="text-2xl font-bold">{result.calories || 0} kcal</div>
                            </div>
                          </div>
                        </div>

                        {/* Macros Grid */}
                        <div className="grid grid-cols-3 gap-4 mb-8">
                          <div className="bg-secondary/20 p-4 rounded-2xl border border-border/50 text-center">
                            <div className="text-sm text-muted-foreground mb-1">Protein</div>
                            <div className="text-xl font-bold text-foreground">{result.macros?.protein || "0g"}</div>
                          </div>
                          <div className="bg-secondary/20 p-4 rounded-2xl border border-border/50 text-center">
                            <div className="text-sm text-muted-foreground mb-1">Carbs</div>
                            <div className="text-xl font-bold text-foreground">{result.macros?.carbs || "0g"}</div>
                          </div>
                          <div className="bg-secondary/20 p-4 rounded-2xl border border-border/50 text-center">
                            <div className="text-sm text-muted-foreground mb-1">Fats</div>
                            <div className="text-xl font-bold text-foreground">{result.macros?.fats || "0g"}</div>
                          </div>
                        </div>

                        {/* AI Analysis Message */}
                        <div className="bg-primary/5 rounded-2xl p-6 border border-primary/10">
                          <div className="flex items-center gap-2 mb-3 text-primary font-semibold">
                            <Info className="w-5 h-5" />
                            AI Analysis
                          </div>
                          <p className="text-muted-foreground leading-relaxed">
                            {result.message || "No analysis available."}
                          </p>
                        </div>
                      </div>

                      <Button
                        onClick={resetScan}
                        variant="outline"
                        className="w-full h-14 rounded-2xl text-lg hover:bg-secondary/80"
                      >
                        Scan Another Meal
                        <ChevronRight className="ml-2 w-5 h-5" />
                      </Button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FoodScan;
