"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/cards";
import { Play, ArrowLeft, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PlayerPage() {
  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col space-y-4">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center text-sm text-text-secondary hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </Link>
        <h1 className="text-lg font-semibold text-foreground tracking-tight hidden sm:block">
          Module 3: Airspace Management
        </h1>
        <Button variant="outline" size="sm" className="hidden sm:flex"><Menu className="w-4 h-4 mr-2" /> Course Content</Button>
      </motion.div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
        <div className="lg:col-span-3 flex flex-col h-full space-y-4">
          <GlassCard className="flex-1 p-0 overflow-hidden flex items-center justify-center bg-black border-border-default group relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-aero-blue/20 flex items-center justify-center text-aero-blue cursor-pointer hover:bg-aero-blue hover:text-aero-blue-fg transition-all hover:scale-110">
                <Play className="w-8 h-8 ml-1" />
              </div>
            </div>
            <p className="absolute bottom-4 left-4 text-xs font-mono text-foreground/50 bg-black/50 px-2 py-1 rounded">Video Player Placeholder</p>
          </GlassCard>
          <GlassCard className="p-5 shrink-0">
            <h2 className="text-xl font-bold text-foreground mb-2">1.1 Introduction to UTM</h2>
            <p className="text-sm text-text-secondary">Understanding Unmanned Aircraft System Traffic Management and how it integrates into national airspace.</p>
          </GlassCard>
        </div>
        
        <div className="hidden lg:flex flex-col h-full">
          <GlassCard className="flex-1 p-0 flex flex-col overflow-hidden">
            <div className="p-4 border-b border-border-subtle bg-surface-elevated/50 font-semibold text-foreground">
              Course Content
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className={`p-3 rounded-lg text-sm cursor-pointer transition-colors ${i === 1 ? 'bg-aero-blue/10 text-aero-blue' : 'text-text-secondary hover:bg-surface-hover hover:text-foreground'}`}>
                  <div className="flex gap-3">
                    <div className="mt-0.5"><Play className="w-4 h-4" /></div>
                    <div>
                      <div className="font-medium">1.{i} Lesson Title {i}</div>
                      <div className="text-xs opacity-70 mt-1">10:4{i}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
