"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/cards";
import { BookOpen, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MyCoursesPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">My Courses</h1>
        <p className="text-text-secondary mt-1">Manage and track all your enrolled courses.</p>
      </motion.div>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-md hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input 
            type="text" 
            placeholder="Search enrolled courses..." 
            className="w-full pl-9 pr-4 py-2 bg-surface-elevated border border-border-default rounded-lg text-sm text-foreground focus:outline-none focus:border-aero-blue"
          />
        </div>
        <Button variant="outline"><Filter className="w-4 h-4 mr-2" /> Filter</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <GlassCard key={i} className="p-0 overflow-hidden flex flex-col group">
            <div className="h-40 bg-surface-hover border-b border-border-subtle relative flex items-center justify-center">
              <BookOpen className="w-10 h-10 text-text-muted group-hover:text-aero-blue transition-colors" />
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-aero-blue transition-colors">Aerospace Engineering {i}01</h3>
              <p className="text-sm text-text-secondary mb-4 flex-1">Comprehensive guide to aerodynamics and drone manufacturing principles.</p>
              <div className="space-y-2 mt-auto">
                <div className="flex justify-between text-xs">
                  <span className="text-text-secondary">Progress</span>
                  <span className="text-foreground font-medium">{i * 25}%</span>
                </div>
                <div className="h-1.5 bg-surface-elevated rounded-full overflow-hidden">
                  <div className="h-full bg-aero-blue" style={{ width: `${i * 25}%` }} />
                </div>
              </div>
              <Button variant="primary" href="/dashboard/player" className="w-full mt-5">Continue Learning</Button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
