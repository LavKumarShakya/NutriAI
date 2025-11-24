import { motion } from "framer-motion";
import { useState } from "react";

const foodExamples = [
  { name: "Pizza", score: 45, calories: 850, color: "health-poor" },
  { name: "Grilled Chicken Salad", score: 88, calories: 320, color: "health-excellent" },
  { name: "Burger & Fries", score: 32, calories: 1200, color: "health-bad" },
  { name: "Fruit Bowl", score: 95, calories: 180, color: "health-excellent" },
];

export const HealthScore = () => {
  const [selectedFood, setSelectedFood] = useState(foodExamples[0]);

  const getScoreColor = (score: number) => {
    if (score >= 80) return "health-excellent";
    if (score >= 60) return "health-good";
    if (score >= 40) return "health-medium";
    if (score >= 20) return "health-poor";
    return "health-bad";
  };

  return (
    <section id="features" className="py-20 px-4 bg-gradient-to-br from-primary/5 to-secondary/10">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Not Just Numbers, <span className="text-primary">Real Guidance</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Every food gets a 0-100 health score you can actually understand
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-3xl p-8 shadow-2xl"
          >
            <h3 className="text-2xl font-semibold text-foreground mb-6">Try Different Foods</h3>
            <div className="space-y-3 mb-8">
              {foodExamples.map((food, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedFood(food)}
                  className={`w-full text-left p-4 rounded-xl transition-all ${selectedFood.name === food.name
                      ? "bg-primary text-primary-foreground shadow-lg"
                      : "bg-secondary hover:bg-secondary/80"
                    }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{food.name}</span>
                    <span className="text-sm">{food.calories} cal</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Health Score</span>
                  <span className={`text-2xl font-bold text-${getScoreColor(selectedFood.score)}`}>
                    {selectedFood.score}/100
                  </span>
                </div>
                <div className="h-4 bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${selectedFood.score}%` }}
                    transition={{ duration: 0.5 }}
                    className={`h-full bg-${getScoreColor(selectedFood.score)} rounded-full`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary/50 p-4 rounded-xl">
                  <div className="text-sm text-muted-foreground">Protein</div>
                  <div className="text-xl font-semibold text-foreground">24g</div>
                </div>
                <div className="bg-secondary/50 p-4 rounded-xl">
                  <div className="text-sm text-muted-foreground">Carbs</div>
                  <div className="text-xl font-semibold text-foreground">45g</div>
                </div>
                <div className="bg-secondary/50 p-4 rounded-xl">
                  <div className="text-sm text-muted-foreground">Fats</div>
                  <div className="text-xl font-semibold text-foreground">18g</div>
                </div>
                <div className="bg-secondary/50 p-4 rounded-xl">
                  <div className="text-sm text-muted-foreground">Sugar</div>
                  <div className="text-xl font-semibold text-foreground">12g</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-card border border-border rounded-2xl p-6">
              <h4 className="text-lg font-semibold text-foreground mb-3">🎯 Smart Suggestions</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ Choose whole wheat base instead</li>
                <li>✓ Reduce cheese by 50%</li>
                <li>✓ Add more vegetables</li>
                <li>✓ Try homemade version</li>
              </ul>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h4 className="text-lg font-semibold text-foreground mb-3">🔄 Better Alternatives</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Thin Crust Pizza</span>
                  <span className="text-primary font-semibold">-200 cal</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Veggie Pizza</span>
                  <span className="text-primary font-semibold">-150 cal</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
