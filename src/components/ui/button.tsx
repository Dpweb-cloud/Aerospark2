"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "outline";
  size?: "sm" | "md" | "lg" | "icon";
  children: React.ReactNode;
  href?: string;
  isLoading?: boolean;
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  isLoading,
  ...props
}: ButtonProps) {
  const baseStyles =
    "relative inline-flex items-center justify-center font-medium rounded-lg transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-aero-blue/30 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary:
      "bg-aero-blue text-aero-blue-fg hover:bg-aero-blue/90 hover:shadow-[0_0_30px_rgba(var(--primary-glow),0.2)]",
    secondary:
      "bg-surface-elevated text-foreground border border-border-subtle hover:bg-surface-hover hover:border-aero-blue/20",
    ghost:
      "bg-transparent text-text-secondary hover:text-foreground hover:bg-surface-elevated",
    danger:
      "bg-aero-red/10 text-aero-red border border-aero-red/20 hover:bg-aero-red/20",
    outline:
      "bg-transparent text-aero-blue border border-aero-blue/30 hover:bg-aero-blue/10 hover:border-aero-blue/50",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3.5 text-base gap-2.5",
    icon: "p-2",
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isLoading ? <LoadingSpinner /> : children}
      </motion.a>
    );
  }

  return (
    <motion.button
      className={classes}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      {...(props as any)}
    >
      {isLoading ? <LoadingSpinner /> : children}
    </motion.button>
  );
}

function LoadingSpinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}
