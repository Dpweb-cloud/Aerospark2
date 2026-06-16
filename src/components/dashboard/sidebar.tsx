"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BookOpen,
  Play,
  BarChart3,
  Award,
  Bot,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  Rocket,
  LogOut,
  Users,
  Upload,
  FileText,
  Shield,
  Database,
  GraduationCap,
  Menu,
  X,
} from "lucide-react";

interface SidebarProps {
  role?: "student" | "teacher" | "admin";
}

const studentLinks = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Courses", href: "/dashboard/courses", icon: BookOpen },
  { label: "Lecture Player", href: "/dashboard/player", icon: Play },
  { label: "Progress", href: "/dashboard/progress", icon: BarChart3 },
  { label: "Certificates", href: "/dashboard/certificates", icon: Award },
  { label: "AI Assistant", href: "/dashboard/ai", icon: Bot },
  { label: "Notifications", href: "/dashboard/notifications", icon: Bell },
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
];

const teacherLinks = [
  { label: "Dashboard", href: "/dashboard/teacher", icon: LayoutDashboard },
  { label: "My Courses", href: "/dashboard/teacher/courses", icon: BookOpen },
  { label: "Upload Lectures", href: "/dashboard/teacher/upload", icon: Upload },
  { label: "Student Analytics", href: "/dashboard/teacher/analytics", icon: BarChart3 },
  { label: "Assignments", href: "/dashboard/teacher/assignments", icon: FileText },
  { label: "Settings", href: "/dashboard/teacher/settings", icon: Settings },
];

const adminLinks = [
  { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
  { label: "Students", href: "/dashboard/admin/students", icon: Users },
  { label: "Instructors", href: "/dashboard/admin/instructors", icon: GraduationCap },
  { label: "Courses", href: "/dashboard/admin/courses", icon: BookOpen },
  { label: "Video Uploads", href: "/dashboard/admin/videos", icon: Upload },
  { label: "Analytics", href: "/dashboard/admin/analytics", icon: BarChart3 },
  { label: "Certificates", href: "/dashboard/admin/certificates", icon: Award },
  { label: "Blog", href: "/dashboard/admin/blog", icon: FileText },
  { label: "Notifications", href: "/dashboard/admin/notifications", icon: Bell },
  { label: "System", href: "/dashboard/admin/system", icon: Database },
];

const linksByRole = {
  student: studentLinks,
  teacher: teacherLinks,
  admin: adminLinks,
};

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  
  const role = pathname.startsWith("/dashboard/admin") 
    ? "admin" 
    : pathname.startsWith("/dashboard/teacher") 
      ? "teacher" 
      : "student";

  const links = linksByRole[role];

  const roleLabels = {
    student: "Student Portal",
    teacher: "Teacher Portal",
    admin: "Admin ERP",
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-4 h-16 border-b border-border-subtle flex-shrink-0">
        <Rocket className="w-6 h-6 text-aero-blue flex-shrink-0" />
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="overflow-hidden whitespace-nowrap"
            >
              <span className="text-sm font-bold text-foreground">AeroSpark</span>
              <span className="block text-[10px] text-text-muted uppercase tracking-wider">
                {roleLabels[role]}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {links.map((link) => {
          const isActive = mounted && pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                collapsed && "justify-center px-0",
                isActive
                  ? "text-aero-blue bg-aero-blue/8"
                  : "text-text-secondary hover:text-foreground hover:bg-surface-hover"
              )}
              title={collapsed ? link.label : undefined}
            >
              {isActive && (
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-aero-blue rounded-r-full" />
              )}
              <Icon className="w-[18px] h-[18px] flex-shrink-0" />
              <AnimatePresence>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="overflow-hidden whitespace-nowrap"
                  >
                    {link.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-2 pb-4 space-y-1 border-t border-border-subtle pt-4">
        <Link
          href="/"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-text-muted hover:text-foreground hover:bg-surface-hover transition-colors",
            collapsed && "justify-center px-0"
          )}
        >
          <LogOut className="w-[18px] h-[18px] flex-shrink-0" />
          {!collapsed && <span>Back to Site</span>}
        </Link>

        {/* Collapse toggle - desktop only */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-text-muted hover:text-foreground hover:bg-surface-hover transition-colors w-full"
        >
          {collapsed ? (
            <ChevronRight className="w-[18px] h-[18px]" />
          ) : (
            <>
              <ChevronLeft className="w-[18px] h-[18px]" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 glass-panel rounded-lg text-text-secondary hover:text-foreground"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed left-0 top-0 bottom-0 w-[260px] bg-background border-r border-border-subtle z-50 lg:hidden"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 text-text-muted hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 64 : 240 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="hidden lg:block fixed left-0 top-0 bottom-0 bg-background border-r border-border-subtle z-30"
      >
        <SidebarContent />
      </motion.aside>

      {/* Spacer for layout */}
      <motion.div
        animate={{ width: collapsed ? 64 : 240 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="hidden lg:block flex-shrink-0"
      />
    </>
  );
}
