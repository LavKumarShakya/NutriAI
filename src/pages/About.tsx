import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Heart, Shield, Zap, Users } from "lucide-react";

const About = () => {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const values = [
        {
            icon: <Heart className="w-8 h-8 text-primary" />,
            title: "Health First",
            description: "We believe that understanding what you eat is the first step to a healthier life."
        },
        {
            icon: <Shield className="w-8 h-8 text-primary" />,
            title: "Privacy Focused",
            description: "Your data is yours. We prioritize your privacy and security above all else."
        },
        {
            icon: <Zap className="w-8 h-8 text-primary" />,
            title: "AI Powered",
            description: "Leveraging cutting-edge technology to provide accurate and instant nutrition insights."
        },
        {
            icon: <Users className="w-8 h-8 text-primary" />,
            title: "Community Driven",
            description: "Building a supportive community to help everyone achieve their wellness goals."
        }
    ];

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            <main className="flex-grow pt-24">
                {/* Hero Section */}
                <section className="relative py-20 overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/10">
                    <div className="container mx-auto px-4 text-center relative z-10">
                        <motion.div
                            initial="initial"
                            animate="animate"
                            variants={fadeIn}
                            className="max-w-3xl mx-auto"
                        >
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                                Empowering Healthier Choices
                            </h1>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                At NutriAI, we're on a mission to simplify nutrition tracking. By combining advanced AI with user-friendly design, we make it effortless to understand your food and reach your health goals.
                            </p>
                        </motion.div>
                    </div>

                    {/* Background Elements */}
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
                    <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10" />
                </section>

                {/* Story Section */}
                <section className="py-20 px-4">
                    <div className="container mx-auto max-w-5xl">
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&q=80&w=2070"
                                    alt="Healthy Food"
                                    className="rounded-3xl shadow-2xl"
                                />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                                <p className="text-muted-foreground mb-4 text-lg">
                                    It started with a simple question: "What's really in my food?"
                                </p>
                                <p className="text-muted-foreground mb-4 leading-relaxed">
                                    We realized that tracking calories and macros was often tedious and inaccurate. Manual logging felt like a chore, and existing tools were clunky.
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    So, we built NutriAI. We wanted to create a tool that feels like magic—just snap a photo, and get the answers you need. We're passionate about using technology to make healthy living accessible to everyone.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-20 bg-secondary/20">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Core Values</h2>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                These principles guide everything we do, from product design to how we treat our community.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {values.map((value, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-card border border-border p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                                >
                                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                                        {value.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        {value.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default About;
