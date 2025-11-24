import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  User, 
  Target, 
  Activity, 
  TrendingUp, 
  Edit2, 
  Camera,
  Apple,
  Utensils,
  Salad,
  Coffee,
  Leaf
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  // Mock data
  const recentMeals = [
    { id: 1, name: "Grilled Chicken Salad", calories: 320, score: 92, time: "12:30 PM" },
    { id: 2, name: "Oatmeal with Berries", calories: 280, score: 88, time: "8:00 AM" },
    { id: 3, name: "Quinoa Buddha Bowl", calories: 450, score: 95, time: "7:00 PM" },
  ];

  const floatingIcons = [
    { Icon: Apple, delay: 0, x: -20, y: -30 },
    { Icon: Salad, delay: 0.5, x: 20, y: -20 },
    { Icon: Coffee, delay: 1, x: -30, y: 20 },
    { Icon: Leaf, delay: 1.5, x: 25, y: 25 },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-primary/5 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ top: "10%", left: "10%" }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-accent/5 blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 80, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ bottom: "10%", right: "10%" }}
        />
      </div>

      <Navbar />

      <main className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          {/* Profile Header Card */}
          <Card className="mb-8 backdrop-blur-lg bg-card/80 border-border/50 shadow-xl">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center gap-8 relative">
                {/* Floating Icons */}
                {floatingIcons.map(({ Icon, delay, x, y }, index) => (
                  <motion.div
                    key={index}
                    className="absolute text-primary/20"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.2, 1],
                      x: [0, x, 0],
                      y: [0, y, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      delay: delay,
                    }}
                    style={{
                      right: `${20 + index * 15}%`,
                      top: `${10 + index * 10}%`,
                    }}
                  >
                    <Icon className="w-8 h-8" />
                  </motion.div>
                ))}

                {/* Avatar with Glow */}
                <motion.div
                  className="relative group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="absolute inset-0 bg-primary/30 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500" />
                  <Avatar className="w-32 h-32 border-4 border-primary/20 relative z-10">
                    <AvatarImage src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400" />
                    <AvatarFallback className="text-3xl bg-primary/10">JD</AvatarFallback>
                  </Avatar>
                  <motion.div
                    className="absolute -bottom-2 -right-2 bg-card border-2 border-primary rounded-full p-2 cursor-pointer hover:bg-primary/10 transition-colors z-20"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Camera className="w-4 h-4 text-primary" />
                  </motion.div>
                </motion.div>

                {/* Profile Info */}
                <div className="flex-1 text-center md:text-left">
                  <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                    <h1 className="text-3xl font-bold text-foreground">John Doe</h1>
                    <User className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-muted-foreground mb-4 max-w-xl">
                    Fitness enthusiast on a journey to better health. Passionate about wholesome nutrition and mindful eating.
                  </p>
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    variant={isEditing ? "default" : "outline"}
                    className="group"
                  >
                    <Edit2 className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                    {isEditing ? "Save Profile" : "Edit Profile"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Main Content Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column - Profile Details */}
            <div className="space-y-6">
              {/* Personal Information Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="backdrop-blur-lg bg-card/80 border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5 text-primary" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        defaultValue="John Doe"
                        disabled={!isEditing}
                        className="mt-1 bg-background/50 focus:bg-background transition-colors"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        defaultValue="Fitness enthusiast on a journey to better health. Passionate about wholesome nutrition and mindful eating."
                        disabled={!isEditing}
                        className="mt-1 bg-background/50 focus:bg-background transition-colors"
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Dietary Goals Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="backdrop-blur-lg bg-card/80 border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-primary" />
                      Dietary Goals
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="goal">Primary Goal</Label>
                      <Select defaultValue="weight-loss" disabled={!isEditing}>
                        <SelectTrigger id="goal" className="mt-1 bg-background/50 focus:bg-background">
                          <SelectValue placeholder="Select your goal" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weight-loss">Weight Loss</SelectItem>
                          <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                          <SelectItem value="maintenance">Maintenance</SelectItem>
                          <SelectItem value="general-health">General Health</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="diet-type">Diet Type</Label>
                      <Select defaultValue="balanced" disabled={!isEditing}>
                        <SelectTrigger id="diet-type" className="mt-1 bg-background/50 focus:bg-background">
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
                  </CardContent>
                </Card>
              </motion.div>

              {/* Health Metrics Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card className="backdrop-blur-lg bg-card/80 border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5 text-primary" />
                      Health Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="weight">Current Weight (kg)</Label>
                        <Input
                          id="weight"
                          type="number"
                          defaultValue="75"
                          disabled={!isEditing}
                          className="mt-1 bg-background/50 focus:bg-background transition-colors"
                        />
                      </div>
                      <div>
                        <Label htmlFor="target-weight">Target Weight (kg)</Label>
                        <Input
                          id="target-weight"
                          type="number"
                          defaultValue="70"
                          disabled={!isEditing}
                          className="mt-1 bg-background/50 focus:bg-background transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="calories">Daily Calorie Target</Label>
                      <Input
                        id="calories"
                        type="number"
                        defaultValue="2000"
                        disabled={!isEditing}
                        className="mt-1 bg-background/50 focus:bg-background transition-colors"
                      />
                    </div>
                    <div className="pt-4 border-t border-border/50">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Progress to Goal</span>
                        <span className="font-semibold text-primary flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          67%
                        </span>
                      </div>
                      <div className="mt-2 h-2 bg-secondary rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-primary to-accent"
                          initial={{ width: 0 }}
                          animate={{ width: "67%" }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Right Column - Recent Meals */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="backdrop-blur-lg bg-card/80 border-border/50 h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Utensils className="w-5 h-5 text-primary" />
                    Recent Meal Log
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentMeals.map((meal, index) => (
                    <motion.div
                      key={meal.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 4 }}
                      className="p-4 rounded-lg bg-background/50 border border-border/50 hover:border-primary/30 hover:shadow-md transition-all duration-300 cursor-pointer group"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {meal.name}
                          </h4>
                          <p className="text-sm text-muted-foreground">{meal.time}</p>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                            Score: {meal.score}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{meal.calories} cal</span>
                        <span className="text-border">•</span>
                        <span className="flex items-center gap-1">
                          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                          Logged
                        </span>
                      </div>
                    </motion.div>
                  ))}

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="p-6 rounded-lg border-2 border-dashed border-primary/30 hover:border-primary/50 transition-colors cursor-pointer flex items-center justify-center gap-2 text-primary hover:bg-primary/5"
                  >
                    <Utensils className="w-5 h-5" />
                    <span className="font-medium">Log New Meal</span>
                  </motion.div>

                  {/* Daily Summary */}
                  <div className="pt-4 border-t border-border/50 space-y-3">
                    <h4 className="font-semibold text-foreground">Today's Summary</h4>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center p-3 rounded-lg bg-primary/5">
                        <p className="text-2xl font-bold text-primary">1050</p>
                        <p className="text-xs text-muted-foreground">Calories</p>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-accent/5">
                        <p className="text-2xl font-bold text-accent">3</p>
                        <p className="text-xs text-muted-foreground">Meals</p>
                      </div>
                      <div className="text-center p-3 rounded-lg bg-health-excellent/5">
                        <p className="text-2xl font-bold text-health-excellent">92</p>
                        <p className="text-xs text-muted-foreground">Avg Score</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
