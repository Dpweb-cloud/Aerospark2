"use client";

import { useEffect, useRef } from "react";

export function GlobalBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Particle Constellation Network
    const particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    const numParticles = 80;

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5, // Very slow movement
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.5 + 0.5,
      });
    }

    const animate = () => {
      // Clear canvas with very subtle motion blur
      const isDark = document.documentElement.classList.contains('dark');
      ctx.fillStyle = isDark ? "rgba(0, 0, 0, 0.5)" : "rgba(255, 255, 255, 0.5)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const maxDistance = 150;

      // Update and draw particles
      particles.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges smoothly
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = isDark ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.2)";
        ctx.fill();

        // Connect particles
        for (let j = index + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            // Opacity decreases as distance increases
            const opacity = 1 - (distance / maxDistance);
            ctx.strokeStyle = isDark 
              ? `rgba(255, 255, 255, ${opacity * 0.15})` 
              : `rgba(0, 0, 0, ${opacity * 0.1})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[-2] bg-background will-change-transform">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />
      {/* Subtle radial gradient overlay to focus center */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,var(--bg-main)_100%)] pointer-events-none" />
    </div>
  );
}
