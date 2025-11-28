import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import interqLogo from "@/assets/interq-logo.png";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Product", href: "/product" },
    { label: "Assessments", href: "/assessments" },
    { label: "AI Interviewing", href: "/ai-interview" },
    { label: "Solutions", href: "/solutions" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
  ];

  // Check if user is admin
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdmin = async () => {
      if (user) {
        const { data } = await supabase
          .from("user_roles")
          .select("role")
          .eq("user_id", user.id)
          .eq("role", "admin")
          .single();
        setIsAdmin(!!data);
      } else {
        setIsAdmin(false);
      }
    };
    checkAdmin();
  }, [user]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
        isScrolled ? "bg-background/95 backdrop-blur-lg shadow-soft" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group transition-smooth">
            <img src={interqLogo} alt="InterQ Logo" className="h-12 w-auto" />
            <span className="text-2xl font-bold text-foreground group-hover:text-primary transition-smooth">
              InterQ
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`text-sm font-medium transition-smooth ${
                  location.pathname === link.href
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/settings"
                className={`text-sm font-medium transition-smooth ${
                  location.pathname === "/settings"
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary"
                }`}
              >
                Settings
              </Link>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-3">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground">
                  Welcome back!
                </span>
                <Button variant="ghost" size="sm" onClick={signOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost" size="sm" className="text-sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/get-started">
                  <Button variant="default" size="sm" className="gradient-primary text-sm">
                    Start Free Trial
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-foreground"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-background border-t border-border"
          >
            <div className="container mx-auto px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`block text-sm font-medium transition-smooth ${
                    location.pathname === link.href
                      ? "text-primary font-semibold"
                      : "text-foreground/80 hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                {user ? (
                  <Button variant="ghost" size="sm" className="w-full" onClick={signOut}>
                    Sign Out
                  </Button>
                ) : (
                  <>
                    <Link to="/auth" className="block">
                      <Button variant="ghost" size="sm" className="w-full">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/get-started" className="block">
                      <Button variant="default" size="sm" className="w-full gradient-primary">
                        Start Free Trial
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navigation;
