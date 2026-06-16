"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/cards";
import { Bot, Sparkles, Send } from "lucide-react";

export default function AIPage() {
  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 text-center">
        <div className="w-16 h-16 bg-aero-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-aero-blue/20">
          <Bot className="w-8 h-8 text-aero-blue" />
        </div>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">AeroSpark AI Tutor</h1>
        <p className="text-text-secondary mt-1">Your personal aerospace engineering assistant.</p>
      </motion.div>

      <GlassCard className="flex-1 flex flex-col p-0 overflow-hidden relative border-aero-blue/20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.05)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex gap-4 max-w-[85%]">
            <div className="w-8 h-8 rounded-full bg-aero-blue/20 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-aero-blue" />
            </div>
            <div className="bg-surface-elevated rounded-2xl rounded-tl-sm px-5 py-3 text-sm text-foreground">
              Hello! I'm your AeroSpark AI Tutor. Based on your recent work in "Drone Regulations", would you like me to quiz you on UTM airspace classifications?
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-border-subtle bg-surface/50">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Ask a question about aerospace or your courses..." 
              className="w-full pl-4 pr-12 py-3 bg-surface-elevated border border-border-default rounded-xl text-sm text-foreground focus:outline-none focus:border-aero-blue shadow-inner"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-aero-blue hover:bg-aero-blue/10 rounded-lg transition-colors">
              <Send className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-2 mt-3 overflow-x-auto pb-1 hide-scrollbar">
            {["Explain Bernoulli's Principle", "Summarize DGCA Rules", "Help me with CATIA surfacing"].map((suggestion) => (
              <button key={suggestion} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-elevated border border-border-subtle text-xs text-text-secondary hover:text-foreground hover:border-aero-blue/50 transition-colors whitespace-nowrap">
                <Sparkles className="w-3 h-3 text-aero-blue" /> {suggestion}
              </button>
            ))}
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
