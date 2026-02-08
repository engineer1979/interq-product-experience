import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram, ExternalLink, Download, Users, Briefcase, FileText, HelpCircle, BookOpen, BarChart3, Zap, Star, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const EnhancedFooter = () => {
  const navigate = useNavigate();

  // Footer navigation structure
  const footerSections = {
    Product: {
      title: "Product",
      links: [
        {
          label: "Features",
          href: "/features",
          icon: Star,
          description: "Explore all platform capabilities"
        },
        {
          label: "Assessments",
          href: "/assessments",
          icon: FileText,
          description: "AI-powered skill assessments"
        },
        {
          label: "AI Interviewing",
          href: "/ai-interview",
          icon: Users,
          description: "Automated interview solutions"
        },
        {
          label: "Pricing",
          href: "/pricing",
          icon: BarChart3,
          description: "Flexible pricing plans"
        },
        {
          label: "Integrations",
          href: "/integrations",
          icon: Zap,
          description: "Connect with your tools"
        }
      ]
    },
    Solutions: {
      title: "Solutions",
      links: [
        {
          label: "For Recruiters",
          href: "/solutions/recruiters",
          icon: Briefcase,
          description: "Streamline recruitment workflow"
        },
        {
          label: "For Organizational Hiring",
          href: "/solutions/enterprise",
          icon: Users,
          description: "Enterprise-scale hiring solutions"
        },
        {
          label: "For SMEs",
          href: "/solutions/sme",
          icon: Zap,
          description: "Small business hiring tools"
        },
        {
          label: "Industry Solutions",
          href: "/solutions/industry",
          icon: BarChart3,
          description: "Industry-specific configurations"
        }
      ]
    },
    Resources: {
      title: "Resources",
      links: [
        {
          label: "Blog",
          href: "/blog",
          icon: BookOpen,
          description: "Latest insights and trends"
        },
        {
          label: "Documentation",
          href: "/docs",
          icon: FileText,
          description: "Technical guides and API docs"
        },
        {
          label: "Case Studies",
          href: "/case-studies",
          icon: BarChart3,
          description: "Success stories and results"
        },
        {
          label: "Help Center",
          href: "/help-center",
          icon: HelpCircle,
          description: "FAQs and support articles"
        },
        {
          label: "API Reference",
          href: "/api-docs",
          icon: Code,
          description: "Developer documentation"
        }
      ]
    },
    Company: {
      title: "Company",
      links: [
        {
          label: "About Us",
          href: "/about",
          icon: Users,
          description: "Our mission and team"
        },
        {
          label: "Careers",
          href: "/careers",
          icon: Briefcase,
          description: "Join our growing team"
        },
        {
          label: "Press Kit",
          href: "/press-kit",
          icon: FileText,
          description: "Media resources and assets"
        },
        {
          label: "Partners",
          href: "/partners",
          icon: Users,
          description: "Partner program details"
        },
        {
          label: "Contact",
          href: "/contact",
          icon: Mail,
          description: "Get in touch with us"
        }
      ]
    }
  };

  // Quick action buttons
  const quickActions = [
    {
      label: "Book Demo",
      href: "/get-started",
      variant: "default" as const,
      icon: ExternalLink
    },
    {
      label: "Start Free Trial",
      href: "/auth",
      variant: "default" as const,
      icon: ExternalLink
    },
    {
      label: "Download Press Kit",
      href: "/press-kit/download",
      variant: "default" as const,
      icon: Download
    }
  ];

  // Contact information
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "contact@interq.com",
      href: "mailto:contact@interq.com"
    }
  ];

  // Social media links
  const socialLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      href: "https://linkedin.com/company/interq",
      color: "hover:text-blue-600"
    },
    {
      name: "Twitter",
      icon: Twitter,
      href: "https://twitter.com/interq",
      color: "hover:text-blue-400"
    },
    {
      name: "Facebook",
      icon: Facebook,
      href: "https://facebook.com/interq",
      color: "hover:text-blue-600"
    },
    {
      name: "Instagram",
      icon: Instagram,
      href: "https://instagram.com/interq",
      color: "hover:text-pink-600"
    }
  ];

  // Legal links
  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Cookie Policy", href: "/cookie-policy" },
    { label: "GDPR Compliance", href: "/gdpr" }
  ];

  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        {/* Top Section - Brand and Quick Actions */}
        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-3xl font-bold mb-4">
                Inter<span className="text-primary">Q</span>
              </div>
              <p className="text-background/70 mb-6 text-sm leading-relaxed">
                Redefining recruitment with AI-driven interviews and assessments across North America,
                Middle East and beyond. Empowering organizations to build exceptional teams through
                intelligent hiring solutions.
              </p>

              {/* Contact Information */}
              <div className="space-y-3 mb-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <info.icon className="h-4 w-4 text-primary flex-shrink-0" />
                    <a
                      href={info.href}
                      className="text-background/70 hover:text-primary transition-smooth text-sm"
                    >
                      {info.value}
                    </a>
                  </motion.div>
                ))}
              </div>

              {/* Social Media Links */}
              <div className="flex items-center gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                    className={`text-background/60 hover:text-primary transition-smooth ${social.color}`}
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Actions Column */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {quickActions.map((action, index) => (
                  <motion.div
                    key={action.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Button
                      onClick={() => navigate(action.href)}
                      variant={action.variant}
                      className="w-full justify-start h-11 px-4 text-sm"
                    >
                      <action.icon className="h-4 w-4 mr-2" />
                      {action.label}
                    </Button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Newsletter Signup */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="font-semibold text-lg mb-4">Stay Updated</h3>
              <p className="text-background/70 mb-4 text-sm">
                Get the latest hiring insights, product updates, and industry trends delivered to your inbox.
              </p>
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full px-4 py-3 rounded-lg bg-background/10 border border-background/20 text-background placeholder-background/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                <Button
                  onClick={() => navigate('/newsletter')}
                  className="w-full bg-primary hover:bg-primary/90 text-white"
                >
                  Subscribe to Newsletter
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Navigation Links Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {Object.entries(footerSections).map(([category, section], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3 className="font-semibold text-lg mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={link.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: linkIndex * 0.05 }}
                  >
                    <Link
                      to={link.href}
                      className="flex items-center gap-2 text-background/70 hover:text-primary transition-smooth text-sm group"
                    >
                      <link.icon className="h-4 w-4 text-primary opacity-70 group-hover:opacity-100 transition-smooth" />
                      <span>{link.label}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-primary/10 rounded-2xl p-8 md:p-12 text-center mb-16"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Transform Your Hiring?
          </h3>
          <p className="text-background/70 mb-6 max-w-2xl mx-auto">
            Join hundreds of companies using InterQ to build exceptional teams.
            Experience the future of recruitment with AI-powered solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/get-started')}
              size="lg"
              className="gradient-primary w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg"
            >
              Book Demo
            </Button>
            <Button
              onClick={() => navigate('/auth')}
              size="lg"
              variant="outline"
              className="border-background/20 hover:bg-background/10 w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg text-primary font-semibold"
            >
              Start Free Trial
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-background/20">
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-sm text-background/60"
            >
              © 2025 InterQ Technologies Inc. All rights reserved.
            </motion.div>

            {/* Legal Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex items-center gap-6"
            >
              {legalLinks.map((link, index) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-sm text-background/60 hover:text-primary transition-smooth"
                >
                  {link.label}
                </Link>
              ))}
            </motion.div>
          </div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-3 mt-6"
          >
            {['SOC 2 Certified', 'ISO 27001', 'GDPR Compliant', 'AES-256 Encryption'].map((badge, index) => (
              <motion.div
                key={badge}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                className="px-3 py-2 rounded-md border border-background/30 text-xs text-background/70 bg-background/5"
              >
                {badge}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default EnhancedFooter;