import { useState, useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Calendar,
  User,
  ArrowRight,
  Tag,
  Clock,
  Sparkles,
  ChevronRight
} from "lucide-react";

const categories = ["All", "AI & Technology", "Recruiting Strategy", "Product Updates", "Expert Hiring"];

const posts = [
  {
    id: 1,
    title: "The Future of AI in Recruitment: Trends to Watch in 2026",
    excerpt: "Discover how large language models and behavioral analysis are reshaping how companies identify top talent globally.",
    category: "AI & Technology",
    author: "Sarah Johnson",
    date: "Feb 5, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800",
    isFeatured: true
  },
  {
    id: 2,
    title: "Scaling Technical Assessments for Global Engineering Teams",
    excerpt: "Best practices for implementing standardized coding challenges that maintain quality across different timezones.",
    category: "Recruiting Strategy",
    author: "Michael Chen",
    date: "Feb 3, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Interview Insights: Structuring for Fairness and Consistency",
    excerpt: "Why structured interviews outperformed ad-hoc coffee chats in predicting long-term candidate success by 40%.",
    category: "Expert Hiring",
    author: "Dr. Elena Rodriguez",
    date: "Jan 28, 2026",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    title: "Announcing InterQ Live: Real-Time Audio Interview Analysis",
    excerpt: "Our latest update brings sentiment analysis and pace tracking to real-time screening calls.",
    category: "Product Updates",
    author: "InterQ Team",
    date: "Jan 15, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1478737270239-2fccd27ee8fb?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    title: "How to Build a High-Performance Culture from the First Hire",
    excerpt: "Strategic advice on using skill assessments to ensure cultural and technical alignment from day one.",
    category: "Recruiting Strategy",
    author: "David Smith",
    date: "Jan 10, 2026",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800"
  },
];

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" ? true : post.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const featuredPost = posts.find(p => p.isFeatured);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 relative overflow-hidden bg-gradient-to-b from-primary/5 to-transparent">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
              The <span className="text-gradient">Hiring</span> Journal
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Expert insights on AI recruiting, technical assessments, and building world-class teams.
            </p>

            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="pl-12 h-14 rounded-2xl border-border/50 shadow-soft bg-white/50 backdrop-blur-sm"
              />
            </div>
          </motion.div>

          {/* Featured Post */}
          {!searchQuery && selectedCategory === "All" && featuredPost && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-20"
            >
              <Card className="overflow-hidden border-border/50 shadow-2xl group cursor-pointer hover:border-primary/30 transition-all duration-500">
                <div className="grid lg:grid-cols-2">
                  <div className="relative h-[300px] lg:h-full overflow-hidden">
                    <img
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-6 left-6">
                      <div className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-lg">
                        <Sparkles className="h-3 w-3" /> Featured
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center gap-4 mb-6 text-sm text-muted-foreground font-medium">
                      <span className="text-primary font-bold px-3 py-1 bg-primary/10 rounded-lg">{featuredPost.category}</span>
                      <span>{featuredPost.date}</span>
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-bold mb-6 group-hover:text-primary transition-colors leading-tight">
                      {featuredPost.title}
                    </h2>
                    <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                          {featuredPost.author.charAt(0)}
                        </div>
                        <span className="font-semibold">{featuredPost.author}</span>
                      </div>
                      <Button variant="link" className="text-primary font-bold group-hover:translate-x-2 transition-transform">
                        Read Story <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${selectedCategory === cat
                  ? "bg-primary text-primary-foreground shadow-lg scale-105"
                  : "bg-muted/50 hover:bg-muted text-muted-foreground"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((p, i) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="group h-full flex flex-col overflow-hidden border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300">
                    <div className="relative h-56 overflow-hidden">
                      <img src={p.image} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-md text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                          {p.category}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                        <Calendar className="h-3.5 w-3.5" /> {p.date}
                        <Clock className="h-3.5 w-3.5 ml-2" /> {p.readTime}
                      </div>
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors leading-snug">
                        {p.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-6 line-clamp-3 leading-relaxed flex-1">
                        {p.excerpt}
                      </p>
                      <div className="pt-4 border-t border-border flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <User className="h-3.5 w-3.5 text-primary" />
                          <span className="text-xs font-semibold">{p.author}</span>
                        </div>
                        <Button variant="ghost" size="sm" className="hover:text-primary -mr-2">
                          Read <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Newsletter Section */}
          <section className="bg-gradient-to-br from-primary to-blue-600 rounded-[32px] p-8 md:p-16 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full -ml-32 -mb-32 blur-3xl" />

            <div className="max-w-3xl mx-auto relative z-10">
              <h2 className="text-3xl md:text-5xl font-extrabold mb-6 tracking-tight">
                Stay ahead of the curve.
              </h2>
              <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed">
                Join 10,000+ talent leaders. Get our weekly newsletter on scaling teams with AI and expert insights.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
                <Input
                  placeholder="Enter your email"
                  className="h-14 bg-white/10 border-white/20 text-white placeholder:text-white/60 rounded-2xl focus:bg-white/20 transition-all"
                />
                <Button className="h-14 px-8 bg-white text-primary hover:bg-white/90 rounded-2xl font-bold shrink-0">
                  Subscribe Now
                </Button>
              </div>
              <p className="mt-6 text-sm text-white/60">
                Zero spam. Unsubscribe at any time.
              </p>
            </div>
          </section>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;