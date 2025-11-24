import { useState, useRef } from "react";
import { Camera, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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
      toast.error("Failed to analyze food. Make sure Flask server is running.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Food Scanner</h1>
        
        <div className="bg-card/50 backdrop-blur-lg border border-border rounded-2xl p-6 mb-6">
          {!image ? (
            <div className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="w-full"
                size="lg"
              >
                <Upload className="mr-2" />
                Upload Image
              </Button>
              
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="w-full"
                size="lg"
              >
                <Camera className="mr-2" />
                Take Photo
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={image}
                  alt="Food preview"
                  className="w-full rounded-lg"
                />
                <Button
                  onClick={() => {
                    setImage(null);
                    setResult(null);
                  }}
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                >
                  <X />
                </Button>
              </div>
              
              <Button
                onClick={handleAnalyze}
                disabled={loading}
                className="w-full"
                size="lg"
              >
                {loading ? "Analyzing..." : "Analyze Food"}
              </Button>
            </div>
          )}
        </div>

        {result && (
          <div className="bg-card/50 backdrop-blur-lg border border-border rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4">Results</h2>
            <pre className="bg-muted p-4 rounded-lg overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodScan;
