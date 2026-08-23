"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "./theme-switcher";
import { getCurrentUserAction } from "@/app/actions/authActions";
import {
  Menu,
  X,
  Rocket,
  ChevronRight,
} from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<{ id: number; email: string; name: string; role: string } | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    getCurrentUserAction().then((u) => {
      setUser(u as any);
    });
  }, [pathname]);

  const getDashboardHref = (role: string) => {
    if (role === "TEACHER") return "/dashboard/teacher";
    return "/dashboard";
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={cn(
          "fixed left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "top-3 md:top-4 px-4 sm:px-6 lg:px-8"
            : "top-0 px-0"
        )}
      >
        <div className={cn(
          "mx-auto transition-all duration-500",
          scrolled
            ? "max-w-7xl bg-background/85 dark:bg-background/75 backdrop-blur-md border border-border-default/60 shadow-[0_12px_40px_rgba(0,0,0,0.08)] rounded-2xl px-6 md:px-8"
            : "max-w-full border-b border-border-subtle/10 px-4 sm:px-6 lg:px-8 bg-transparent"
        )}>
          <div className={cn(
            "flex items-center justify-between transition-all duration-500",
            scrolled ? "h-14 lg:h-16" : "h-16 lg:h-20"
          )}>
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative -top-[2px]">
                <img
                  src="/logo1.png"
                  alt="AeroSpark"
                  className="w-11 h-11 md:w-[48px] h-[48px] object-contain transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-secondary/30 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="text-2xl md:text-[26px] font-bold tracking-tight">
                <span className="text-[#00008B]">Aero</span>
                <span className="text-[#FF6600]">Spark</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = mounted && pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300",
                      isActive
                        ? "text-[#FF6600]"
                        : "text-text-secondary hover:text-foreground"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 bg-[#FF6600]/8 rounded-lg border border-[#FF6600]/15"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 30,
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-4">
              <ThemeSwitcher />
              {mounted && user ? (
                <Button
                  variant="primary"
                  size="sm"
                  href={getDashboardHref(user.role)}
                  className="bg-[#FF6600] text-white hover:bg-[#e65c00] border-none shadow-md animate-fade-in"
                >
                  Dashboard
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  href="/login"
                  className="bg-[#FF6600] text-white hover:bg-[#e65c00] border-none shadow-md"
                >
                  Sign In
                </Button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 text-text-secondary hover:text-foreground transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] bg-background border-l border-border-subtle"
            >
              <div className="flex items-center justify-between p-4 border-b border-border-subtle">
                <span className="text-sm font-semibold text-foreground">
                  Navigation
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-text-secondary hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <nav className="p-4 space-y-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center justify-between px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                        mounted && pathname === link.href
                          ? "bg-[#FF6600]/10 text-[#FF6600]"
                          : "text-text-secondary hover:text-foreground hover:bg-surface-elevated"
                      )}
                    >
                      {link.label}
                      <ChevronRight className="w-4 h-4 opacity-40" />
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="p-4 border-t border-border-subtle">
                {mounted && user ? (
                  <Button
                    variant="primary"
                    size="md"
                    href={getDashboardHref(user.role)}
                    className="w-full bg-[#FF6600] text-white hover:bg-[#e65c00] border-none"
                  >
                    Dashboard
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    size="md"
                    href="/login"
                    className="w-full bg-[#FF6600] text-white hover:bg-[#e65c00] border-none"
                  >
                    Sign In
                  </Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
