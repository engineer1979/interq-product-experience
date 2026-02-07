import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const footerLinks = {
    Product: ["Features", "Assessments", "AI Interviewing", "Pricing", "Integrations"],
    Solutions: ["For Recruiters", "For Organizational hiring", "For SMEs", "Industry Solutions"],
    Resources: ["Blog", "Documentation", "Case Studies", "Help Center", "API"],
    Company: ["About Us", "Careers", "Press Kit", "Partners", "Contact"],
  };

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="text-3xl font-bold mb-4">
              Inter<span className="text-primary">Q</span>
            </div>
            <p className="text-background/70 mb-6">
              Redefining recruitment with AI-driven interviews and assessments across North America, Middle East and beyond.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span>contact@interq.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-primary" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="font-semibold text-lg mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    {link === "Blog" && (
                      <Link to="/blog" className="text-background/70 hover:text-primary transition-smooth text-sm">Blog</Link>
                    )}
                    {link === "Documentation" && (
                      <Link to="/docs" className="text-background/70 hover:text-primary transition-smooth text-sm">Documentation</Link>
                    )}
                    {link === "Case Studies" && (
                      <Link to="/case-studies" className="text-background/70 hover:text-primary transition-smooth text-sm">Case Studies</Link>
                    )}
                    {link === "Help Center" && (
                      <Link to="/help-center" className="text-background/70 hover:text-primary transition-smooth text-sm">Help Center</Link>
                    )}
                    {link !== "Blog" && link !== "Documentation" && link !== "Case Studies" && link !== "Help Center" && (
                      <Link to={`/${link.toLowerCase().replace(/\s+/g, '-')}`} className="text-background/70 hover:text-primary transition-smooth text-sm">{link}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="border-t border-background/20 pt-12 mb-12">
          <div className="bg-primary/10 rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Transform Your Hiring?
            </h3>
            <p className="text-background/70 mb-6 max-w-2xl mx-auto">
              Join hundreds of companies using InterQ to build exceptional teams
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => navigate('/get-started')} size="lg" className="gradient-primary w-full sm:w-auto h-12 sm:h-14 px-7 sm:px-9 text-base sm:text-lg">
                Book Demo
              </Button>
              <Button onClick={() => navigate('/auth')} size="lg" variant="outline" className="border-background/20 hover:bg-background/10 w-full sm:w-auto h-12 sm:h-14 px-7 sm:px-9 text-base sm:text-lg text-primary font-semibold">
                Start Free Trial
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-background/60">
            © 2025 InterQ Technologies Inc. All rights reserved.
          </div>
          
          <div className="flex items-center gap-6">
            <a href="https://linkedin.com/company/interq" target="_blank" rel="noopener noreferrer" className="text-background/60 hover:text-primary transition-smooth">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="https://twitter.com/interq" target="_blank" rel="noopener noreferrer" className="text-background/60 hover:text-primary transition-smooth">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="https://facebook.com/interq" target="_blank" rel="noopener noreferrer" className="text-background/60 hover:text-primary transition-smooth">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="https://instagram.com/interq" target="_blank" rel="noopener noreferrer" className="text-background/60 hover:text-primary transition-smooth">
              <Instagram className="h-5 w-5" />
            </a>
          </div>

          <div className="flex gap-6 text-sm">
            <Link to="/privacy-policy" className="text-background/60 hover:text-primary transition-smooth">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="text-background/60 hover:text-primary transition-smooth">
              Terms of Service
            </Link>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="border-t border-background/20 mt-8 pt-8 flex flex-wrap items-center justify-center gap-4">
          <div className="px-3 py-2 rounded-md border border-background/30 text-xs">SOC 2 Certified</div>
          <div className="px-3 py-2 rounded-md border border-background/30 text-xs">ISO 27001</div>
          <div className="px-3 py-2 rounded-md border border-background/30 text-xs">GDPR Compliant</div>
          <div className="px-3 py-2 rounded-md border border-background/30 text-xs">AES-256 Encryption</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
