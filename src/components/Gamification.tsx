import { motion } from "framer-motion";
import { Flame, Trophy, Calendar, TrendingUp } from "lucide-react";

export const Gamification = () => {
  return (
    <section id="gamification" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Build <span className="text-primary">Healthy Habits</span> That Stick
          </h2>
          <p className="text-xl text-muted-foreground">
            Track progress, earn streaks, and see real improvements over time
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
            className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6 hover:scale-105 transition-transform"
          >
            <Flame className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-3xl font-bold text-foreground mb-2">7 Days</h3>
            <p className="text-muted-foreground">Current Streak</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-2xl p-6 hover:scale-105 transition-transform"
          >
            <Trophy className="w-12 h-12 text-accent mb-4" />
            <h3 className="text-3xl font-bold text-foreground mb-2">12/20</h3>
            <p className="text-muted-foreground">Badges Earned</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 rounded-2xl p-6 hover:scale-105 transition-transform"
          >
            <Calendar className="w-12 h-12 text-primary mb-4" />
            <h3 className="text-3xl font-bold text-foreground mb-2">45</h3>
            <p className="text-muted-foreground">Foods Tracked</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-accent/10 to-accent/5 border border-accent/20 rounded-2xl p-6 hover:scale-105 transition-transform"
          >
            <TrendingUp className="w-12 h-12 text-accent mb-4" />
            <h3 className="text-3xl font-bold text-foreground mb-2">+18%</h3>
            <p className="text-muted-foreground">Health Improvement</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 bg-card border border-border rounded-3xl p-8"
        >
          <h3 className="text-2xl font-semibold text-foreground mb-6">Today's Log</h3>
          <div className="space-y-4">
            {[
              { meal: "Breakfast", food: "Oatmeal with Fruits", cal: 320, score: 92 },
              { meal: "Lunch", food: "Grilled Chicken Bowl", cal: 480, score: 85 },
              { meal: "Snack", food: "Mixed Nuts", cal: 180, score: 88 },
            ].map((entry, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl"
              >
                <div>
                  <div className="font-semibold text-foreground">{entry.meal}</div>
                  <div className="text-sm text-muted-foreground">{entry.food}</div>
                </div>
                <div className="text-right">
                  <div className="font-semibold text-foreground">{entry.cal} cal</div>
                  <div className="text-sm text-primary">Score: {entry.score}/100</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-6 border-t border-border flex justify-between items-center">
            <span className="text-lg text-muted-foreground">Total Today</span>
            <span className="text-2xl font-bold text-foreground">980 / 2000 cal</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
