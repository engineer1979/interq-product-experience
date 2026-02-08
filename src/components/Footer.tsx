import { Mail, Linkedin, Twitter, Facebook, Instagram, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, Link } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: ["Features", "Assessments", "AI Interviewing", "Pricing", "Integrations"],
    Solutions: ["For Recruiters", "For Organizational hiring", "For SMEs", "Industry Solutions"],
    Resources: ["Blog", "Documentation", "Case Studies", "Help Center", "API"],
    Company: ["About Us", "Careers", "Press Kit", "Partners", "Contact"],
  };

  const linkMapping: Record<string, string> = {
    // Product
    "Features": "/features",
    "Assessments": "/assessments",
    "AI Interviewing": "/ai-interview",
    "Pricing": "/pricing",
    "Integrations": "/integrations",
    // Solutions
    "For Recruiters": "/solutions/recruiters",
    "For Organizational hiring": "/solutions/enterprise",
    "For SMEs": "/solutions/sme",
    "Industry Solutions": "/solutions/industry",
    // Resources
    "Blog": "/blog",
    "Documentation": "/docs",
    "Case Studies": "/case-studies",
    "Help Center": "/help-center",
    "API": "/api-docs",
    // Company
    "About Us": "/about",
    "Careers": "/careers",
    "Press Kit": "/press-kit",
    "Partners": "/partners",
    "Contact": "/contact",
  };

  return (
    <footer className="bg-slate-900 text-slate-200 pt-20 pb-10 border-t border-slate-800">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Top Section: Brand & Newsletter */}
        <div className="grid lg:grid-cols-3 gap-12 mb-16 border-b border-slate-800 pb-12">
          <div className="lg:col-span-1 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold text-xl">I</div>
              <span className="text-2xl font-bold text-white tracking-tight">InterQ</span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-sm">
              The enterprise-grade AI interviewing platform. Empowering hiring teams with data-driven insights and autonomous workflows.
            </p>
            <div className="flex gap-4">
              <Link to="#" className="p-2 rounded-full bg-slate-800 hover:bg-primary/20 hover:text-primary transition-colors"><Linkedin size={18} /></Link>
              <Link to="#" className="p-2 rounded-full bg-slate-800 hover:bg-primary/20 hover:text-primary transition-colors"><Twitter size={18} /></Link>
              <Link to="#" className="p-2 rounded-full bg-slate-800 hover:bg-primary/20 hover:text-primary transition-colors"><Facebook size={18} /></Link>
              <Link to="#" className="p-2 rounded-full bg-slate-800 hover:bg-primary/20 hover:text-primary transition-colors"><Instagram size={18} /></Link>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col lg:items-end justify-center">
            <div className="bg-slate-800/50 rounded-2xl p-6 md:p-8 w-full max-w-2xl border border-slate-700">
              <h3 className="text-xl font-bold text-white mb-2">Subscribe to our newsletter</h3>
              <p className="text-slate-400 mb-6 text-sm">Get the latest insights on AI recruitment and hiring trends dedicated to you.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  placeholder="Enter your email"
                  className="bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-primary h-11"
                />
                <Button className="h-11 px-6 bg-primary hover:bg-primary/90 text-white font-medium shrink-0">
                  Subscribe <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-16">
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-bold text-white mb-6 uppercase tracking-wider text-xs">{category}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      to={linkMapping[link] || `/${link.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-slate-400 hover:text-primary transition-colors text-sm font-medium block hover:translate-x-1 duration-200"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-slate-500 text-sm">
            © {currentYear} InterQ Technologies Inc. All rights reserved.
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link to="/privacy-policy" className="text-slate-500 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-slate-500 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/security" className="text-slate-500 hover:text-white transition-colors">
              Security
            </Link>
            <div className="flex items-center gap-2 ml-4 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs text-green-500 font-medium">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              All Systems Operational
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
