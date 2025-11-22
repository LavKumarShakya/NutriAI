import { motion } from "framer-motion";
import { AlertCircle, TrendingUp, Brain, Clock } from "lucide-react";

const painPoints = [
  {
    icon: AlertCircle,
    title: "No Idea About Calories",
    description: "Eating outside daily without knowing if it's 300 or 1200 calories",
  },
  {
    icon: TrendingUp,
    title: "Weight Gain & Low Energy",
    description: "Struggling with weight and energy because of poor food choices",
  },
  {
    icon: Brain,
    title: "Too Confusing to Track",
    description: "Calorie counting apps are boring, time-consuming, and overwhelming",
  },
  {
    icon: Clock,
    title: "No Time to Calculate",
    description: "Students and working people can't manually track everything they eat",
  },
];

export const PainPoints = () => {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            The Daily Food <span className="text-destructive">Struggle</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Millions of students face these problems every single day
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 hover:border-destructive/50 transition-all"
            >
              <point.icon className="w-12 h-12 text-destructive mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">{point.title}</h3>
              <p className="text-muted-foreground">{point.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
