import { motion } from "framer-motion";
import { Camera, Brain, Sparkles } from "lucide-react";

const steps = [
  {
    icon: Camera,
    title: "Snap a Photo",
    description: "Take a picture of your food or upload an image. Works with any dish - pizza, burger, rice, salad, anything!",
    color: "text-primary",
  },
  {
    icon: Brain,
    title: "AI Identifies It",
    description: "Our AI instantly recognizes your food and calculates accurate nutrition information in seconds.",
    color: "text-accent",
  },
  {
    icon: Sparkles,
    title: "Get Smart Guidance",
    description: "See calories, health score (0-100), and get personalized suggestions for healthier alternatives.",
    color: "text-primary",
  },
];

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Simple as <span className="text-primary">1-2-3</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            From confusion to clarity in 3 easy steps
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              <div className="text-center">
                <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-primary/20">
                  <step.icon className={`w-10 h-10 ${step.color}`} />
                </div>
                <div className="text-6xl font-bold text-primary/20 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  {index + 1}
                </div>
                <h3 className="text-2xl font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 right-0 w-full h-0.5 bg-gradient-to-r from-primary to-transparent translate-x-1/2" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
