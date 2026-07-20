"use client";

import { useState } from "react";
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
import { ConsultationModal } from "./consultation-modal";

export function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
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



      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 pt-24 lg:pt-16 lg:pb-0">
        
        {/* Left Text Content */}
        <div className="flex-1 text-left">
          {/* Heading */}
          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            <span className="text-foreground">Aviation Minds</span>
            <br />
            <span className="gradient-text">Redefining Drones and Education</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="text-text-secondary text-base sm:text-lg max-w-xl mb-8 leading-relaxed"
          >
            Whether you’re advancing your skills through AI-powered aerospace courses, launching a custom drone, seeking expert consultation, or sourcing essential components, AeroSpark brings learning, engineering, and procurement together to turn bold ideas into flight-ready solutions.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
          >
            <Button variant="primary" size="lg" href="/academy">
              Curriculum
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button 
              variant="secondary" 
              size="lg" 
              onClick={() => setIsModalOpen(true)}
              className="hover:border-secondary/50 hover:text-secondary group"
            >
              <Play className="w-4 h-4 text-secondary group-hover:scale-110 transition-transform" />
              Discuss Your Project
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



      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[5]" />
    </section>
    
    <ConsultationModal 
      isOpen={isModalOpen} 
      onClose={() => setIsModalOpen(false)} 
    />
    </>
  );
}
