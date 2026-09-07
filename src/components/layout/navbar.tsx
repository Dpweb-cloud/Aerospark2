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
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
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
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out transform-gpu">
        <div
          className={cn(
            "mx-auto transition-all duration-300 ease-out transform-gpu px-4 sm:px-6 lg:px-8",
            scrolled ? "max-w-7xl pt-3 md:pt-4" : "max-w-full pt-0"
          )}
        >
          <div
            className={cn(
              "flex items-center justify-between transition-all duration-300 ease-out transform-gpu px-6 md:px-8",
              scrolled
                ? "h-14 lg:h-16 bg-background/85 dark:bg-background/75 backdrop-blur-md border border-border-default/60 shadow-[0_12px_40px_rgba(0,0,0,0.08)] rounded-2xl"
                : "h-16 lg:h-20 bg-background/40 dark:bg-background/30 backdrop-blur-sm border-b border-border-subtle/20 rounded-none"
            )}
          >
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
            <nav className="hidden lg:flex items-center gap-6">
              {NAV_LINKS.map((link) => {
                const isConsultation = link.href === "/consultation";
                const isActive = mounted && (pathname === link.href || (isConsultation && pathname.startsWith("/consultation/")));

                if (isConsultation) {
                  return (
                    <div key={link.href} className="relative group">
                      <Link
                        href={link.href}
                        className={cn(
                          "relative px-4 py-2 text-sm font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-1.5",
                          isActive
                            ? "text-white shadow-md shadow-[#FF6600]/25"
                            : "text-text-secondary hover:text-foreground font-medium"
                        )}
                      >
                        <span className="relative z-10">{link.label}</span>
                        <svg className={cn("w-3.5 h-3.5 relative z-10 transition-transform duration-300 group-hover:-rotate-180", isActive ? "text-white" : "text-text-secondary group-hover:text-foreground")} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
                        
                        {isActive && (
                          <motion.div
                            layoutId="navbar-indicator"
                            className="absolute inset-0 bg-[#FF6600] rounded-xl z-0"
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 30,
                            }}
                          />
                        )}
                      </Link>
                      
                      {/* Dropdown Menu */}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[260px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top scale-95 group-hover:scale-100 z-50">
                        <div className="bg-surface-elevated/95 dark:bg-surface-elevated/95 backdrop-blur-xl border border-border-default/60 shadow-xl rounded-2xl p-2 flex flex-col gap-1">
                          <Link href="/consultation/uas-certification" className="block px-4 py-3 text-[13.5px] rounded-xl hover:bg-background/80 hover:text-[#FF6600] transition-colors font-semibold text-text-secondary">
                            Drone Type Certification Services
                          </Link>
                          <Link href="/consultation/drone-rd" className="block px-4 py-3 text-[13.5px] rounded-xl hover:bg-background/80 hover:text-[#FF6600] transition-colors font-semibold text-text-secondary">
                            Drone R&D and Product Development
                          </Link>
                          <Link href="/consultation/design-simulation" className="block px-4 py-3 text-[13.5px] rounded-xl hover:bg-background/80 hover:text-[#FF6600] transition-colors font-semibold text-text-secondary">
                            Engineering Design & Simulation
                          </Link>
                          <Link href="/consultation/as9100d-quality" className="block px-4 py-3 text-[13.5px] rounded-xl hover:bg-background/80 hover:text-[#FF6600] transition-colors font-semibold text-text-secondary">
                            Quality Management System Services
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "relative px-4 py-2 text-sm font-bold rounded-xl transition-all duration-300 flex items-center justify-center",
                      isActive
                        ? "text-white shadow-md shadow-[#FF6600]/25"
                        : "text-text-secondary hover:text-foreground font-medium"
                    )}
                  >
                    <span className="relative z-10">{link.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute inset-0 bg-[#FF6600] rounded-xl z-0"
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
                  className="bg-[#062B49] text-white hover:bg-[#0B3558] border-none shadow-md hover:shadow-lg transition-all animate-fade-in"
                >
                  Dashboard
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  href="/login"
                  className="bg-[#062B49] text-white hover:bg-[#0B3558] border-none shadow-md hover:shadow-lg transition-all"
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
      </header>

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
