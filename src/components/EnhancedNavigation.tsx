import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Briefcase, Code, FileText, HelpCircle, Users, Building, Zap, BarChart3, BookOpen, Phone, Mail, MapPin, Star, Settings } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface NavItem {
  label: string;
  href?: string;
  icon?: React.ComponentType<any>;
  description?: string;
  children?: NavItem[];
}

const EnhancedNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Navigation structure
  const navigationItems: NavItem[] = [
    {
      label: "Product",
      href: "/product",
      children: [
        {
          label: "Features",
          href: "/features",
          icon: Star,
          description: "Explore all platform capabilities"
        },
        {
          label: "Integrations",
          href: "/integrations",
          icon: Zap,
          description: "Connect with your tools"
        }
      ]
    },
    {
      label: "Assessments",
      href: "/assessments",
    },
    {
      label: "AI Interviewing",
      href: "/ai-interview",
    },
    {
      label: "Live Interview",
      href: "/live-interview",
    },
    {
      label: "Solution Analysis",
      href: "/solutions",
    },
    {
      label: "Pricing",
      href: "/pricing",
    },
    {
      label: "Recruitment Automation",
      href: "/recruitment-automation",
    }
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

  // Handle scroll effects
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
    setActiveDropdown(null);
  }, [location.pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Analytics tracking
  const trackNavigation = (label: string, href?: string) => {
    // Add your analytics tracking here
    console.log(`Navigation clicked: ${label} -> ${href}`);
    if (href) {
      navigate(href);
      setActiveDropdown(null);
    }
  };

  const handleNavItemClick = (item: NavItem) => {
    if (item.children) {
      setActiveDropdown(activeDropdown === item.label ? null : item.label);
    } else if (item.href) {
      trackNavigation(item.label, item.href);
    }
  };

  const isActive = (href?: string) => {
    if (!href) return false;
    return location.pathname === href || location.pathname.startsWith(href + '/');
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-sm py-2"
          : "bg-background/80 backdrop-blur-md py-4"
          }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 group transition-smooth"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="bg-transparent rounded-md p-1">
                <img
                  src="/interq-logo.png"
                  alt="InterQ Logo"
                  className="h-10 sm:h-12 w-auto max-w-full"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <span className="text-2xl font-bold text-gradient group-hover:opacity-80 transition-smooth">
                InterQ
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6 ml-12" ref={dropdownRef}>
              {navigationItems.map((item) => (
                <div key={item.label} className="relative">
                  <button
                    onClick={() => handleNavItemClick(item)}
                    className={`flex items-center gap-1 text-sm font-medium transition-smooth py-2 px-3 rounded-lg hover:bg-muted/50 ${item.children?.some(child => isActive(child.href))
                      ? "text-primary bg-primary/10"
                      : "text-foreground/80 hover:text-primary"
                      }`}
                    aria-expanded={activeDropdown === item.label}
                    aria-haspopup={item.children ? "true" : "false"}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        size={16}
                        className={`transition-transform ${activeDropdown === item.label ? "rotate-180" : ""
                          }`}
                      />
                    )}
                  </button>

                  {/* Dropdown Menu */}
                  {item.children && (
                    <AnimatePresence>
                      {activeDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute top-full left-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-xl z-50"
                        >
                          <div className="p-2">
                            {item.children.map((child) => (
                              <button
                                key={child.label}
                                onClick={() => trackNavigation(child.label, child.href)}
                                className={`w-full flex items-center gap-3 p-3 text-left rounded-md transition-smooth hover:bg-muted/50 ${isActive(child.href)
                                  ? "text-primary bg-primary/10"
                                  : "text-foreground/80 hover:text-primary"
                                  }`}
                              >
                                {child.icon && <child.icon size={18} className="text-primary" />}
                                <div>
                                  <div className="font-medium text-sm">{child.label}</div>
                                  {child.description && (
                                    <div className="text-xs text-muted-foreground mt-0.5">
                                      {child.description}
                                    </div>
                                  )}
                                </div>
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}

              {isAdmin && (
                <Link
                  to="/admin"
                  className={`text-sm font-medium transition-smooth py-2 px-3 rounded-lg hover:bg-muted/50 ${isActive("/admin")
                    ? "text-primary bg-primary/10"
                    : "text-foreground/80 hover:text-primary"
                    }`}
                >
                  Admin
                </Link>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  <Link to="/settings">
                    <Button variant="ghost" size="sm" className="hover:bg-muted/50">
                      <Settings size={16} className="mr-1" />
                      Settings
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={signOut}
                    className="hover:bg-muted/50 text-red-500"
                  >
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link to="/auth">
                    <Button variant="ghost" className="text-sm font-medium hover:bg-muted/50">
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/get-started">
                    <Button
                      variant="default"
                      className="text-sm shadow-soft hover:shadow-glow transition-all duration-300"
                    >
                      Book Demo
                    </Button>
                  </Link>
                </div>
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
                style={{ top: "72px" }}
              >
                <div className="container mx-auto px-4 py-6 space-y-4 max-h-[80vh] overflow-y-auto">
                  {navigationItems.map((item) => (
                    <div key={item.label} className="space-y-2">
                      <button
                        onClick={() => handleNavItemClick(item)}
                        className="w-full flex items-center justify-between p-3 text-left rounded-lg transition-smooth hover:bg-muted/50"
                      >
                        <span className="font-medium">{item.label}</span>
                        {item.children && (
                          <ChevronDown
                            size={20}
                            className={`transition-transform ${activeDropdown === item.label ? "rotate-180" : ""
                              }`}
                          />
                        )}
                      </button>

                      {item.children && activeDropdown === item.label && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-4 space-y-1"
                        >
                          {item.children.map((child) => (
                            <button
                              key={child.label}
                              onClick={() => trackNavigation(child.label, child.href)}
                              className={`w-full flex items-center gap-3 p-3 text-left rounded-md transition-smooth hover:bg-muted/50 ${isActive(child.href)
                                ? "text-primary bg-primary/10"
                                : "text-foreground/80 hover:text-primary"
                                }`}
                            >
                              {child.icon && <child.icon size={16} className="text-primary" />}
                              <div>
                                <div className="font-medium text-sm">{child.label}</div>
                                {child.description && (
                                  <div className="text-xs text-muted-foreground mt-0.5">
                                    {child.description}
                                  </div>
                                )}
                              </div>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  ))}

                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block p-3 rounded-lg transition-smooth hover:bg-muted/50 ${isActive("/admin")
                        ? "text-primary bg-primary/10"
                        : "text-foreground/80 hover:text-primary"
                        }`}
                    >
                      Admin Dashboard
                    </Link>
                  )}

                  <div className="h-px bg-border my-4" />

                  <div className="space-y-3">
                    {user ? (
                      <Button
                        variant="ghost"
                        size="lg"
                        className="w-full justify-start text-red-500 hover:bg-red-500/10"
                        onClick={() => { signOut(); setIsMobileMenuOpen(false); }}
                      >
                        Sign Out
                      </Button>
                    ) : (
                      <div className="grid gap-3">
                        <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                          <Button variant="outline" size="lg" className="w-full justify-center">
                            Sign In
                          </Button>
                        </Link>
                        <Link to="/get-started" onClick={() => setIsMobileMenuOpen(false)}>
                          <Button variant="default" size="lg" className="w-full justify-center">
                            Book Demo
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

export default EnhancedNavigation;