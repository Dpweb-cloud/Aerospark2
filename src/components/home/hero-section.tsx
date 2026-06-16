"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Play,
  Radar,
  Plane,
  Signal,
  Navigation,
} from "lucide-react";

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Create particles
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.4 + 0.1,
      });
    }

    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.005;

      // Draw radar grid
      const gridSize = 60;
      const isDark = document.documentElement.classList.contains('dark');
      ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.05)";
      ctx.lineWidth = 0.5;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw glowing grid intersections
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          const dist = Math.sqrt(
            (x - canvas.width / 2) ** 2 + (y - canvas.height / 2) ** 2
          );
          const pulse = Math.sin(time * 2 + dist * 0.005) * 0.5 + 0.5;
          ctx.beginPath();
          ctx.arc(x, y, 1.5, 0, Math.PI * 2);
          ctx.fillStyle = isDark ? `rgba(255, 255, 255, ${0.05 * pulse})` : `rgba(0, 0, 0, ${0.05 * pulse})`;
          ctx.fill();
        }
      }

      // Radar Sweep (Simplified)
      const centerX = canvas.width * 0.8;
      const centerY = canvas.height * 0.3;
      const sweepAngle = time * 1.5;
      const sweepRadius = 180;

      ctx.beginPath();
      ctx.arc(centerX, centerY, sweepRadius, sweepAngle, sweepAngle + 0.4);
      ctx.lineTo(centerX, centerY);
      ctx.closePath();
      ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.015)" : "rgba(0, 48, 135, 0.01)";
      ctx.fill();

      // Draw radar circles (fewer circles)
      ctx.strokeStyle = isDark ? "rgba(255, 255, 255, 0.02)" : "rgba(0, 48, 135, 0.02)";
      ctx.lineWidth = 0.5;
      for (let r = 60; r <= sweepRadius; r += 60) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Update and draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? `rgba(255, 255, 255, ${p.opacity * 0.5})` : `rgba(0, 0, 0, ${p.opacity * 0.3})`;
        ctx.fill();
      });

      // Draw connecting lines (Optimized connection check)
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = dx * dx + dy * dy; // Use squared distance to avoid Math.sqrt
          
          if (dist < 14400) { // 120 * 120
            const opacity = 1 - Math.sqrt(dist) / 120;
            ctx.beginPath();
            ctx.strokeStyle = isDark 
              ? `rgba(255, 255, 255, ${opacity * 0.1})`
              : `rgba(0, 48, 135, ${opacity * 0.08})`;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Radar Grid CSS Overlay (Replaces Canvas Grid for Performance) */}
      <div className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.05]" 
           style={{ backgroundImage: 'linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)', backgroundSize: '60px 60px' }} 
      />

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero-bg.png" 
          alt="Aerospace Background" 
          className="w-full h-full object-cover opacity-30 dark:opacity-40"
        />
        <div className="absolute inset-0 bg-background/20 backdrop-blur-[1px]" />
      </div>

      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-[1]"
        style={{ opacity: 0.4 }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-surface-elevated/10 to-background z-[2]" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30 z-[2]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,48,135,0.05)_0%,transparent_70%)] z-[2]" />

      {/* HUD Corner Elements */}
      <div className="absolute top-24 left-8 z-10 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="space-y-3"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-secondary rounded-full pulse-glow" />
            <span className="hud-label text-secondary">SYS.ONLINE</span>
          </div>
          <div className="flex items-center gap-2">
            <Signal className="w-3 h-3 text-secondary/60" />
            <span className="hud-label">FREQ 121.5 MHz</span>
          </div>
          <div className="flex items-center gap-2">
            <Navigation className="w-3 h-3 text-aero-blue/40" />
            <span className="hud-label">LAT 12.97°N</span>
          </div>
        </motion.div>
      </div>

      <div className="absolute top-24 right-8 z-10 hidden lg:block">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="text-right space-y-3"
        >
          <div className="flex items-center justify-end gap-2">
            <span className="hud-label">MISSION CONTROL</span>
            <Radar className="w-3 h-3 text-aero-blue/40" />
          </div>
          <div className="flex items-center justify-end gap-2">
            <span className="hud-label">ALT 35,000 FT</span>
            <Plane className="w-3 h-3 text-aero-blue/40" />
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-elevated/60 border border-border-subtle mb-8 backdrop-blur-sm"
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
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
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
          className="text-text-secondary text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
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
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
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

        {/* Bottom Stats Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-20 flex items-center justify-center gap-8 md:gap-16"
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
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-[5]" />
    </section>
  );
}
