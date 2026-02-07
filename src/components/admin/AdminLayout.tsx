import { Outlet, Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard, FileText, Settings, LogOut, Menu, X, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navItems = [
    { to: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/admin/jobs", icon: Briefcase, label: "Jobs" },
    { to: "/admin/results", icon: FileText, label: "Results" },
    { to: "/admin/settings", icon: Settings, label: "Settings" }
];

export function AdminLayout() {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-background">
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between p-4 border-b bg-card">
                <h2 className="text-xl font-bold">Admin Panel</h2>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
            </div>

            {/* Sidebar - Desktop always visible, Mobile toggleable */}
            <aside className={cn(
                "w-full md:w-64 border-r bg-card transition-all duration-300",
                isMobileMenuOpen ? "block" : "hidden md:block"
            )}>
                <div className="p-6 hidden md:block">
                    <h2 className="text-2xl font-bold">Admin Panel</h2>
                    <p className="text-sm text-muted-foreground">InterQ Voice Tests</p>
                </div>
                <nav className="px-4 space-y-2 pb-4">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.to ||
                            (item.to !== "/admin" && location.pathname.startsWith(item.to));
                        return (
                            <Link key={item.to} to={item.to} onClick={() => setIsMobileMenuOpen(false)}>
                                <Button
                                    variant={isActive ? "secondary" : "ghost"}
                                    className={cn("w-full justify-start", isActive && "bg-primary/10")}
                                >
                                    <item.icon className="h-4 w-4 mr-2" />
                                    {item.label}
                                </Button>
                            </Link>
                        );
                    })}
                </nav>
                <div className="px-4 pb-4 md:absolute md:bottom-4 md:left-4 md:right-4">
                    <Button variant="ghost" className="w-full justify-start" onClick={() => {
                        // Add logout functionality here
                        window.location.href = '/auth';
                    }}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <div className="p-4 md:p-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
