import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const blogPosts = [
    {
        id: 1,
        title: "The Truth About Calorie Counting: Quality vs. Quantity",
        excerpt: "Why 100 calories of almonds are different from 100 calories of candy, and how to track what really matters.",
        category: "Nutrition Science",
        author: "Dr. Sarah Miller",
        date: "Nov 24, 2025",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop",
    },
    {
        id: 2,
        title: "How AI is Revolutionizing Personal Nutrition",
        excerpt: "From image recognition to personalized meal plans, discover how artificial intelligence is making healthy eating easier.",
        category: "Technology",
        author: "James Chen",
        date: "Nov 22, 2025",
        readTime: "4 min read",
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1974&auto=format&fit=crop",
    },
    {
        id: 3,
        title: "5 Superfoods You Should Be Eating This Winter",
        excerpt: "Boost your immunity and energy levels with these nutrient-dense foods available this season.",
        category: "Wellness",
        author: "Emma Wilson",
        date: "Nov 20, 2025",
        readTime: "3 min read",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 4,
        title: "Understanding Macros: A Beginner's Guide",
        excerpt: "Protein, carbs, and fats explained simply. Learn how to balance your plate for your specific goals.",
        category: "Education",
        author: "Mike Ross",
        date: "Nov 18, 2025",
        readTime: "6 min read",
        image: "https://images.unsplash.com/photo-1494390248081-4e521a5940db?q=80&w=2006&auto=format&fit=crop",
    },
    {
        id: 5,
        title: "Meal Prep Hacks for Busy Professionals",
        excerpt: "Save time and eat healthier with these efficient meal prep strategies that take less than 2 hours a week.",
        category: "Lifestyle",
        author: "Lisa Zhang",
        date: "Nov 15, 2025",
        readTime: "4 min read",
        image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=2070&auto=format&fit=crop",
    },
    {
        id: 6,
        title: "The Hidden Sugar in Your 'Healthy' Snacks",
        excerpt: "Uncovering the truth about granola bars, yogurts, and smoothies that might be sabotaging your diet.",
        category: "Nutrition Science",
        author: "Dr. Sarah Miller",
        date: "Nov 12, 2025",
        readTime: "5 min read",
        image: "https://images.unsplash.com/photo-1587372367593-4a1705609459?q=80&w=2070&auto=format&fit=crop",
    },
];

const Blog = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-24 pb-8 px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/10 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>
                <div className="container mx-auto max-w-6xl text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                            <Tag className="w-4 h-4" />
                            Nutrition Insights & News
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
                            Learn. Grow. <span className="text-primary">Eat Better.</span>
                        </h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                            Expert advice, nutrition tips, and the latest in food AI technology to help you reach your health goals.
                        </p>
                        <Button
                            variant="outline"
                            className="rounded-full px-8 h-12 border-primary text-primary hover:bg-primary/10 hover:text-primary text-base font-medium"
                        >
                            Add your own blog/review
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Blog Grid */}
            <section className="pt-8 pb-20 px-4 bg-background">
                <div className="container mx-auto max-w-7xl">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {blogPosts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="group bg-card border border-border rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col h-full"
                            >
                                {/* Image */}
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-primary border border-primary/10">
                                        {post.category}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 flex flex-col flex-grow">
                                    <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-3 h-3" />
                                            {post.date}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {post.readTime}
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>

                                    <p className="text-muted-foreground text-sm mb-6 line-clamp-3 flex-grow">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                                                <User className="w-3 h-3" />
                                            </div>
                                            {post.author}
                                        </div>
                                        <Button variant="ghost" size="sm" className="group/btn p-0 hover:bg-transparent hover:text-primary">
                                            Read More
                                            <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-16 text-center">
                        <Button variant="outline" size="lg" className="rounded-full px-8 h-12">
                            Load More Articles
                        </Button>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Blog;
