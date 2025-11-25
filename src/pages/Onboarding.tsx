import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "sonner";
import { Loader2, User, Ruler, Weight, Target, Utensils } from "lucide-react";
import { onAuthStateChanged } from "firebase/auth";

const Onboarding = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        age: "",
        height: "",
        weight: "",
        bio: "",
        goal: "weight-loss",
        dietType: "balanced",
    });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserId(user.uid);
            } else {
                navigate("/login");
            }
        });
        return () => unsubscribe();
    }, [navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSelectChange = (id: string, value: string) => {
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userId) return;

        setLoading(true);
        try {
            await setDoc(doc(db, "users", userId), {
                ...formData,
                displayName: auth.currentUser?.displayName || "",
                email: auth.currentUser?.email || "",
                age: Number(formData.age),
                height: Number(formData.height),
                weight: Number(formData.weight),
                updatedAt: new Date(),
            }, { merge: true });

            toast.success("Profile updated successfully!");
            navigate("/profile");
        } catch (error) {
            console.error("Error saving profile:", error);
            toast.error("Failed to save profile.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <div className="flex-grow flex items-center justify-center px-4 py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-2xl relative z-10"
                >
                    <Card className="border-border shadow-2xl bg-card/80 backdrop-blur-sm">
                        <CardHeader className="space-y-1 text-center">
                            <CardTitle className="text-2xl font-bold">Tell us about yourself</CardTitle>
                            <CardDescription>
                                We need a few details to personalize your NutriAI experience.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="age">Age</Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="age"
                                                type="number"
                                                placeholder="25"
                                                className="pl-10"
                                                value={formData.age}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="height">Height (cm)</Label>
                                        <div className="relative">
                                            <Ruler className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="height"
                                                type="number"
                                                placeholder="175"
                                                className="pl-10"
                                                value={formData.height}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="weight">Weight (kg)</Label>
                                        <div className="relative">
                                            <Weight className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                id="weight"
                                                type="number"
                                                placeholder="70"
                                                className="pl-10"
                                                value={formData.weight}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="goal">Primary Goal</Label>
                                        <div className="relative">
                                            <Target className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                                            <Select value={formData.goal} onValueChange={(val) => handleSelectChange("goal", val)}>
                                                <SelectTrigger className="pl-10">
                                                    <SelectValue placeholder="Select goal" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="weight-loss">Weight Loss</SelectItem>
                                                    <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                                                    <SelectItem value="maintenance">Maintenance</SelectItem>
                                                    <SelectItem value="general-health">General Health</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="dietType">Diet Type</Label>
                                        <div className="relative">
                                            <Utensils className="absolute left-3 top-3 h-4 w-4 text-muted-foreground z-10" />
                                            <Select value={formData.dietType} onValueChange={(val) => handleSelectChange("dietType", val)}>
                                                <SelectTrigger className="pl-10">
                                                    <SelectValue placeholder="Select diet type" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="balanced">Balanced</SelectItem>
                                                    <SelectItem value="vegetarian">Vegetarian</SelectItem>
                                                    <SelectItem value="vegan">Vegan</SelectItem>
                                                    <SelectItem value="keto">Keto</SelectItem>
                                                    <SelectItem value="paleo">Paleo</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="bio">Bio (Optional)</Label>
                                    <Textarea
                                        id="bio"
                                        placeholder="Tell us a bit about your fitness journey..."
                                        className="resize-none"
                                        rows={3}
                                        value={formData.bio}
                                        onChange={handleChange}
                                    />
                                </div>

                                <Button className="w-full rounded-full" size="lg" type="submit" disabled={loading}>
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Saving Profile...
                                        </>
                                    ) : (
                                        "Complete Profile"
                                    )}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            <Footer />
        </div>
    );
};

export default Onboarding;
