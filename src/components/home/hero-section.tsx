"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ChevronRight,
  Play,
  Radar,
  Plane,
  Signal,
  Navigation,
} from "lucide-react";

import { AnimeHeroAnimation } from "./anime-hero-animation";

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden pb-32 lg:pb-0">
      {/* Background Image (Original transparent/themed) */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero-bg.png" 
          alt="Aerospace Background" 
          className="w-full h-full object-cover opacity-10 dark:opacity-20"
        />
        <div className="absolute inset-0 bg-background/40 backdrop-blur-[2px]" />
      </div>

      {/* Gradient overlays to maintain theme responsiveness */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface-elevated/20 to-background z-[2]" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/40 via-transparent to-background/40 z-[2]" />

      {/* Clickable Academy Badge */}
      <div className="absolute top-24 right-4 sm:right-8 md:top-32 md:right-12 z-50 animate-bounce-slow">
        <Link href="/academy" className="block group">
          <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full border-2 border-dashed border-aero-blue/50 flex flex-col items-center justify-center bg-surface-elevated/80 backdrop-blur-md shadow-[0_0_30px_rgba(0,180,255,0.2)] hover:shadow-[0_0_40px_rgba(0,180,255,0.4)] hover:border-aero-blue transition-all duration-300">
            <span className="text-[8px] md:text-[10px] font-bold tracking-widest text-foreground group-hover:text-aero-blue transition-colors">
              ENROLL ONCE
            </span>
            <span className="text-xl md:text-2xl text-aero-blue my-0.5 md:my-1 font-light">∞</span>
            <span className="text-[8px] md:text-[10px] font-bold tracking-widest text-foreground group-hover:text-aero-blue transition-colors">
              UPGRADE FREE
            </span>
            
            {/* Decorative sparkle */}
            <svg 
              className="absolute -top-3 -right-3 w-8 h-8 text-aero-blue animate-pulse" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
          </div>
        </Link>
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 pt-24 lg:pt-16 lg:pb-0">
        
        {/* Left Text Content */}
        <div className="flex-1 text-left">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-elevated/60 border border-border-subtle mb-6 backdrop-blur-sm"
          >
            <div className="w-1.5 h-1.5 bg-secondary rounded-full pulse-glow" />
            <span className="text-xs font-medium text-text-secondary tracking-wide">
              Platform v2.0 — Now with AI-Powered Learning
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            <span className="text-foreground">The Future of</span>
            <br />
            <span className="gradient-text">Aerospace Education</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-text-secondary text-base sm:text-lg max-w-xl mb-8 leading-relaxed"
          >
            Master aerospace engineering through industry-grade courses, hands-on
            R&D projects, and expert consultation — all in one
            mission-critical platform.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <Button variant="primary" size="lg" href="/academy">
              Explore Academy
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button 
              variant="secondary" 
              size="lg" 
              href="/consultation"
              className="hover:border-secondary/50 hover:text-secondary group"
            >
              <Play className="w-4 h-4 text-secondary group-hover:scale-110 transition-transform" />
              Request Consultation
            </Button>
          </motion.div>
        </div>

        {/* Right Image Content - The anime animation */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex-1 w-full"
        >
          <AnimeHeroAnimation />
        </motion.div>
      </div>

      {/* Bottom Stats Strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 lg:bottom-10 left-0 right-0 flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-16 z-10"
      >
        {[
          { label: "Students", value: "8,200+" },
          { label: "Courses", value: "24" },
          { label: "Partners", value: "50+" },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-foreground">
              {stat.value}
            </p>
            <p className="text-xs text-text-muted uppercase tracking-wider mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[5]" />
    </section>
  );
}
