import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const footerLinks = {
    Product: ["Features", "Assessments", "AI Interviewing", "Pricing", "Integrations"],
    Solutions: ["For Recruiters", "For Enterprises", "For SMEs", "Industry Solutions"],
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
                    <a
                      href="#"
                      className="text-background/70 hover:text-primary transition-smooth text-sm"
                    >
                      {link}
                    </a>
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
              <Button size="lg" className="gradient-primary">
                Book Demo
              </Button>
              <Button size="lg" variant="outline" className="border-background/20 hover:bg-background/10">
                Start Free Trial
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-background/60">
            © 2025 InterQ Enterprise Inc. All rights reserved.
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="text-background/60 hover:text-primary transition-smooth">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="text-background/60 hover:text-primary transition-smooth">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-background/60 hover:text-primary transition-smooth">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="text-background/60 hover:text-primary transition-smooth">
              <Instagram className="h-5 w-5" />
            </a>
          </div>

          <div className="flex gap-6 text-sm">
            <a href="#" className="text-background/60 hover:text-primary transition-smooth">
              Privacy Policy
            </a>
            <a href="#" className="text-background/60 hover:text-primary transition-smooth">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
