import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "College Student",
    content: "I had no idea I was eating 3000 calories daily from hostel food. This app changed everything!",
    rating: 5,
  },
  {
    name: "Arjun Patel",
    role: "Working Professional",
    content: "Finally, an app that doesn't make me fill boring forms. Just snap and know instantly.",
    rating: 5,
  },
  {
    name: "Sneha Reddy",
    role: "Fitness Enthusiast",
    content: "Lost 5kg in 2 months just by making smarter choices with AI suggestions. Game changer!",
    rating: 5,
  },
];

export const Testimonials = () => {
  return (
    <section id="testimonials" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Real People, <span className="text-primary">Real Results</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            Join thousands making healthier choices every day
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
              <div>
                <div className="font-semibold text-foreground">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-8 bg-primary/10 border border-primary/20 rounded-full px-8 py-4">
            <div>
              <div className="text-3xl font-bold text-primary">50,000+</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div>
              <div className="text-3xl font-bold text-primary">4.8★</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div>
              <div className="text-3xl font-bold text-primary">2M+</div>
              <div className="text-sm text-muted-foreground">Foods Scanned</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
