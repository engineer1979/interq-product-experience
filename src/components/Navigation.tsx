import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

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

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: "Product", href: "/product" },
    { label: "Assessments", href: "/assessments" },
    { label: "AI Interviewing", href: "/ai-interview" },
    { label: "Live Interview", href: "/live-interview" },
    { label: "Solution Analysis", href: "/solutions" },
    { label: "Pricing", href: "/pricing" },
    { label: "Recruitment Automation", href: "/recruitment-automation" },
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
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm py-2" : "bg-background/80 backdrop-blur-md py-4"
          }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group transition-smooth" onClick={() => setIsMobileMenuOpen(false)}>
              <div className="bg-transparent rounded-md p-1">
                <img src="/interq-logo.png" alt="InterQ Logo" className="h-10 sm:h-12 w-auto max-w-full" loading="lazy" decoding="async" />
              </div>
              <span className="text-2xl font-bold text-gradient group-hover:opacity-80 transition-smooth">
                InterQ
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8 ml-12">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className={`text-sm font-medium transition-smooth relative py-1 hover:text-primary ${location.pathname === link.href
                    ? "text-primary after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-primary"
                    : "text-foreground/80"
                    }`}
                >
                  {link.label}
                </Link>
              ))}
              {isAdmin && (
                <Link
                  to="/settings"
                  className={`text-sm font-medium transition-smooth ${location.pathname === "/settings"
                    ? "text-primary"
                    : "text-foreground/80 hover:text-primary"
                    }`}
                >
                  Settings
                </Link>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
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
                    <Button variant="ghost" className="text-sm font-medium hover:text-primary hover:bg-primary/5">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/auth">
                    <Button variant="default" className="gradient-primary text-sm shadow-soft hover:shadow-glow transition-all duration-300">
                      Book a Demo
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-lg border border-border bg-background/80 text-foreground shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[40] lg:hidden"
                style={{ top: "var(--nav-height, 80px)" }}
              />

              {/* Menu Content */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden bg-background border-b border-border shadow-soft overflow-hidden fixed left-0 right-0 z-50"
                style={{ top: "72px" }} // Align below header
              >
                <div className="container mx-auto px-4 py-6 space-y-4 max-h-[80vh] overflow-y-auto">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block text-lg font-medium p-3 rounded-lg transition-colors ${location.pathname === link.href
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/80 hover:bg-muted hover:text-primary"
                        }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <div className="h-px bg-border my-4" />
                  <div className="space-y-3">
                    {user ? (
                      <Button variant="ghost" size="lg" className="w-full justify-start text-red-500" onClick={() => { signOut(); setIsMobileMenuOpen(false); }}>
                        Sign Out
                      </Button>
                    ) : (
                      <div className="grid gap-3">
                        <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                          <Button variant="outline" size="lg" className="w-full justify-center">
                            Sign In
                          </Button>
                        </Link>
                        <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                          <Button variant="default" size="lg" className="w-full justify-center gradient-primary shadow-lg">
                            Start Free Trial
                          </Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>
      {/* Spacer to prevent content jump since nav is fixed */}
      {/* <div className="h-20" /> */}
    </>
  );
};

export default Navigation;
