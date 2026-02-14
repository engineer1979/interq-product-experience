import { Mail, Linkedin, Twitter, Facebook, Instagram, ExternalLink, Download, Users, Briefcase, FileText, HelpCircle, BookOpen, BarChart3, Zap, Star, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";

const EnhancedFooter = () => {
  const navigate = useNavigate();

  const footerSections = {
    Product: {
      title: "Product",
      links: [
        { label: "Features", href: "/features", icon: Star },
        { label: "Assessments", href: "/assessments", icon: FileText },
        { label: "AI Interviewing", href: "/ai-interview", icon: Users },
        { label: "Pricing", href: "/pricing", icon: BarChart3 },
        { label: "Integrations", href: "/integrations", icon: Zap },
      ],
    },
    Solutions: {
      title: "Solutions",
      links: [
        { label: "For Recruiters", href: "/solutions/recruiters", icon: Briefcase },
        { label: "For Organizational Hiring", href: "/solutions/enterprise", icon: Users },
        { label: "For SMEs", href: "/solutions/sme", icon: Zap },
        { label: "Industry Solutions", href: "/solutions/industry", icon: BarChart3 },
      ],
    },
    Resources: {
      title: "Resources",
      links: [
        { label: "Blog", href: "/blog", icon: BookOpen },
        { label: "Documentation", href: "/docs", icon: FileText },
        { label: "Case Studies", href: "/case-studies", icon: BarChart3 },
        { label: "Help Center", href: "/help-center", icon: HelpCircle },
        { label: "Guidelines", href: "/guidelines", icon: FileText },
        { label: "API Reference", href: "/api-docs", icon: Code },
      ],
    },
    Company: {
      title: "Company",
      links: [
        { label: "About Us", href: "/about", icon: Users },
        { label: "Careers", href: "/careers", icon: Briefcase },
        { label: "Press Kit", href: "/press-kit", icon: FileText },
        { label: "Partners", href: "/partners", icon: Users },
        { label: "Contact", href: "/contact", icon: Mail },
      ],
    },
  };

  const socialLinks = [
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/interq" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/interq" },
    { name: "Facebook", icon: Facebook, href: "https://facebook.com/interq" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com/interq" },
  ];

  const legalLinks = [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Cookie Policy", href: "/cookie-policy" },
    { label: "GDPR Compliance", href: "/gdpr" },
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        {/* Top Section */}
        <div className="grid lg:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="text-3xl font-bold mb-4">
              Inter<span className="text-primary">Q</span>
            </div>
            <p className="text-background/60 mb-6 text-sm leading-relaxed max-w-sm">
              Redefining recruitment with AI-driven interviews and assessments across North America,
              Middle East and beyond. Empowering organizations to build exceptional teams through
              intelligent hiring solutions.
            </p>

            <div className="flex items-center gap-2 mb-6">
              <Mail className="h-4 w-4 text-primary flex-shrink-0" />
              <a href="mailto:contact@interq.com" className="text-background/60 hover:text-primary transition-colors text-sm">
                contact@interq.com
              </a>
            </div>

            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-background/8 flex items-center justify-center text-background/50 hover:text-primary hover:bg-background/15 transition-all duration-200"
                  aria-label={`Follow us on ${social.name}`}
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-base mb-5 text-background/90">Quick Actions</h3>
            <div className="space-y-3">
              {[
                { label: "Book Demo", href: "/get-started", icon: ExternalLink },
                { label: "Start Free Trial", href: "/auth", icon: ExternalLink },
                { label: "Download Press Kit", href: "/press-kit/download", icon: Download },
              ].map((action) => (
                <Button
                  key={action.label}
                  onClick={() => navigate(action.href)}
                  variant="default"
                  className="w-full justify-start h-11 px-4 text-sm rounded-xl"
                >
                  <action.icon className="h-4 w-4 mr-2" />
                  {action.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-1">
            <h3 className="font-semibold text-base mb-5 text-background/90">Stay Updated</h3>
            <p className="text-background/60 mb-4 text-sm leading-relaxed">
              Get the latest hiring insights, product updates, and industry trends delivered to your inbox.
            </p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-3 rounded-xl bg-background/8 border border-background/15 text-background placeholder-background/40 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              />
              <Button onClick={() => navigate("/newsletter")} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl">
                Subscribe to Newsletter
              </Button>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16 pt-10 border-t border-background/10">
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key}>
              <h3 className="font-semibold text-sm mb-5 text-background/80 uppercase tracking-wider">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="flex items-center gap-2.5 text-background/55 hover:text-primary transition-colors text-sm group"
                    >
                      <link.icon className="h-3.5 w-3.5 text-primary/60 group-hover:text-primary transition-colors" />
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="bg-primary/10 rounded-2xl p-10 text-center mb-14 border border-primary/10">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-background">
            Ready to Transform Your Hiring?
          </h3>
          <p className="text-background/60 mb-8 max-w-2xl mx-auto text-sm leading-relaxed">
            Join hundreds of companies using InterQ to build exceptional teams.
            Experience the future of recruitment with AI-powered solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/get-started")}
              size="lg"
              className="gradient-primary w-full sm:w-auto h-13 px-8 text-base rounded-xl"
            >
              Book Demo
            </Button>
            <Button
              onClick={() => navigate("/auth")}
              size="lg"
              variant="outline"
              className="border-background/20 hover:bg-background/10 w-full sm:w-auto h-13 px-8 text-base text-primary font-semibold rounded-xl"
            >
              Start Free Trial
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-background/50">
              © 2025 InterQ Technologies Inc. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              {legalLinks.map((link) => (
                <Link key={link.label} to={link.href} className="text-sm text-background/50 hover:text-primary transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            {["SOC 2 Certified", "ISO 27001", "GDPR Compliant", "AES-256 Encryption"].map((badge) => (
              <div key={badge} className="px-3.5 py-2 rounded-lg border border-background/12 text-xs text-background/55 bg-background/5 font-medium">
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default EnhancedFooter;
