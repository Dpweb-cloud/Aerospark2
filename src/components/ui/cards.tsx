
"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";


interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "blue" | "red" | "none";
  padding?: "sm" | "md" | "lg";
  onClick?: () => void;
}

export function GlassCard({
  children,
  className,
  hover = true,
  glow = "none",
  padding = "md",
  onClick,
}: GlassCardProps) {
  const paddings = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const glowStyles = {
    blue: "hover:shadow-[0_0_40px_rgba(var(--primary-glow),0.08)]",
    red: "hover:shadow-[0_0_40px_rgba(var(--secondary-glow),0.08)]",
    none: "",
  };

  return (
    <motion.div
      onClick={onClick}
      className={cn(
        "glass-panel rounded-xl",
        paddings[padding],
        hover && "card-hover",
        glowStyles[glow],
        className
      )}
      whileHover={hover ? { y: -2 } : undefined}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

interface StatCardProps {
  label: string;
  value: string;
  icon: React.ReactNode;
  trend?: { value: string; positive: boolean };
  className?: string;
  onClick?: () => void;
}

export function StatCard({ label, value, icon, trend, className, onClick }: StatCardProps) {
  return (
    <GlassCard 
      className={cn("relative overflow-hidden", onClick && "cursor-pointer select-none", className)} 
      glow="blue"
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-text-secondary text-xs font-medium uppercase tracking-wider">
            {label}
          </p>
          <p className="text-3xl font-bold text-foreground tracking-tight">{value}</p>
          {trend && (
            <p
              className={cn(
                "text-xs font-medium flex items-center gap-1",
                trend.positive ? "text-emerald-400" : "text-aero-red"
              )}
            >
              {trend.positive ? "↑" : "↓"} {trend.value}
            </p>
          )}
        </div>
        <div className="p-3 rounded-lg bg-aero-blue/5 text-aero-blue">{icon}</div>
      </div>
      {/* Subtle corner accent */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-aero-blue/5 to-transparent rounded-bl-full" />
    </GlassCard>
  );
}

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  label,
  title,
  description,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      className={cn(
        "space-y-4 max-w-3xl",
        align === "center" && "text-center mx-auto",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
        {title}
      </h2>
      {description && (
        <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  );
}




interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "blue" | "orange" | "red" | "green";
  className?: string;
}

export function Badge({ children, variant = "default", className }: BadgeProps) {
  // Using a helper function prevents dynamic string indexing entirely
  const getVariantStyles = (type: "default" | "blue" | "orange" | "red" | "green") => {
    switch (type) {
      case "blue":
        return "bg-primary/10 text-primary border-primary/20";
      case "orange":
        return "bg-secondary/10 text-secondary border-secondary/20";
      case "green":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
      case "red":
        return "bg-rose-500/10 text-rose-400 border-rose-500/20";
      case "default":
      default:
        return "bg-surface-elevated text-text-secondary border-border-subtle";
    }
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full border",
        getVariantStyles(variant),
        className
      )}
    >
      {children}
    </span>
  );
}


