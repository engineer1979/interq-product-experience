import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Download, Share2, Image, FileText, Palette, Users, Calendar, Mail, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PressKit = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const pressAssets = [
    {
      category: "logos",
      title: "InterQ Logo Pack",
      description: "Primary and secondary logo variations in multiple formats",
      formats: ["PNG", "SVG", "EPS"],
      size: "2.4 MB",
      downloadUrl: "/assets/press/interq-logos.zip"
    },
    {
      category: "images",
      title: "Product Screenshots",
      description: "High-resolution screenshots of the InterQ platform",
      formats: ["PNG", "JPG"],
      size: "8.7 MB",
      downloadUrl: "/assets/press/product-screenshots.zip"
    },
    {
      category: "team",
      title: "Executive Team Photos",
      description: "Professional headshots of leadership team",
      formats: ["PNG", "JPG"],
      size: "5.2 MB",
      downloadUrl: "/assets/press/team-photos.zip"
    },
    {
      category: "docs",
      title: "Company Fact Sheet",
      description: "Key company information, metrics, and background",
      formats: ["PDF"],
      size: "1.1 MB",
      downloadUrl: "/assets/press/fact-sheet.pdf"
    },
    {
      category: "docs",
      title: "Press Releases",
      description: "Latest company announcements and news",
      formats: ["PDF"],
      size: "3.4 MB",
      downloadUrl: "/assets/press/press-releases.zip"
    },
    {
      category: "brand",
      title: "Brand Guidelines",
      description: "Official brand colors, typography, and usage guidelines",
      formats: ["PDF"],
      size: "4.8 MB",
      downloadUrl: "/assets/press/brand-guidelines.pdf"
    }
  ];

  const recentNews = [
    {
      date: "2024-01-15",
      title: "InterQ Raises Series A Funding to Transform AI-Powered Recruitment",
      summary: "Company secures $15M to expand platform capabilities and global reach.",
      category: "Funding"
    },
    {
      date: "2024-01-08",
      title: "InterQ Launches Advanced Analytics Dashboard for Enterprise Clients",
      summary: "New analytics platform provides deeper insights into hiring processes.",
      category: "Product"
    },
    {
      date: "2023-12-20",
      title: "InterQ Achieves SOC 2 Type II Certification",
      summary: "Company demonstrates commitment to security and compliance standards.",
      category: "Security"
    },
    {
      date: "2023-12-01",
      title: "InterQ Expands to Middle East Market",
      summary: "Company launches operations in UAE and Saudi Arabia.",
      category: "Expansion"
    }
  ];

  const mediaContacts = [
    {
      name: "Sarah Johnson",
      title: "Director of Communications",
      email: "press@interq.com"
    },
    {
      name: "Michael Chen",
      title: "Media Relations Manager",
      email: "media@interq.com"
    }
  ];

  const categories = [
    { id: "all", label: "All Assets", icon: FileText },
    { id: "logos", label: "Logos", icon: Image },
    { id: "images", label: "Images", icon: Image },
    { id: "docs", label: "Documents", icon: FileText },
    { id: "team", label: "Team Photos", icon: Users },
    { id: "brand", label: "Brand Assets", icon: Palette }
  ];

  const filteredAssets = selectedCategory === "all"
    ? pressAssets
    : pressAssets.filter(asset => asset.category === selectedCategory);

  const handleDownload = (asset: any) => {
    // Simulate download
    const link = document.createElement('a');
    link.href = asset.downloadUrl;
    link.download = asset.title.replace(/\s+/g, '-').toLowerCase() + '.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = (asset: any) => {
    if (navigator.share) {
      navigator.share({
        title: asset.title,
        text: asset.description,
        url: window.location.href + '#' + asset.title.replace(/\s+/g, '-').toLowerCase()
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-background">
      {/* Hero Section */}
      <section className="relative py-24 px-4 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 opacity-30" />
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Press Kit
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Access our latest press releases, brand assets, and media resources.
              For press inquiries, please contact our media relations team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg"
                onClick={() => document.getElementById('assets')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Download Assets
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Contact Media Team
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Recent News Section */}
      <section className="py-16 px-4 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
              Recent News
            </h2>
            <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
              Latest announcements and company updates
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {recentNews.map((news, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground">{news.date}</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                    {news.category}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{news.title}</h3>
                <p className="text-muted-foreground text-sm">{news.summary}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/blog')}
            >
              View All News
            </Button>
          </div>
        </div>
      </section>

      {/* Press Assets Section */}
      <section id="assets" className="py-16 px-4 lg:px-8 bg-muted/30">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
              Press Assets
            </h2>
            <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto">
              Download official company assets, logos, and media resources
            </p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className="h-10 px-4"
              >
                <category.icon className="h-4 w-4 mr-2" />
                {category.label}
              </Button>
            ))}
          </div>

          {/* Assets Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssets.map((asset, index) => (
              <motion.div
                key={asset.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{asset.title}</h3>
                      <p className="text-sm text-muted-foreground">{asset.size}</p>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm mb-4">{asset.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {asset.formats.map((format) => (
                    <span key={format} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                      {format}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={() => handleDownload(asset)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleShare(asset)}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Media Contact Section */}
      <section id="contact" className="py-16 px-4 lg:px-8">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Media Contact
            </h2>
            <p className="text-lg text-muted-foreground mb-12">
              For press inquiries, interview requests, or additional information,
              please contact our media relations team.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {mediaContacts.map((contact, index) => (
                <motion.div
                  key={contact.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                  className="bg-card border border-border rounded-xl p-6 text-left"
                >
                  <h3 className="text-xl font-semibold mb-2">{contact.name}</h3>
                  <p className="text-muted-foreground mb-4">{contact.title}</p>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-primary" />
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {contact.email}
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PressKit;