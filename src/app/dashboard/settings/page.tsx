"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/cards";
import { Settings as SettingsIcon, User, Lock, Bell, Palette, Globe } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Settings</h1>
        <p className="text-text-secondary mt-1">Manage your account preferences and application settings.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1 space-y-1">
          {[
            { label: "Profile", icon: User, active: true },
            { label: "Security", icon: Lock },
            { label: "Notifications", icon: Bell },
            { label: "Appearance", icon: Palette },
            { label: "Language", icon: Globe },
          ].map((item) => (
            <button key={item.label} className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${item.active ? 'bg-aero-blue/10 text-aero-blue' : 'text-text-secondary hover:text-foreground hover:bg-surface-elevated'}`}>
              <item.icon className="w-4 h-4" /> {item.label}
            </button>
          ))}
        </div>
        <div className="md:col-span-3 space-y-6">
          <GlassCard className="space-y-6">
            <h2 className="text-lg font-semibold text-foreground border-b border-border-subtle pb-4">Personal Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-text-secondary">First Name</label>
                <input type="text" defaultValue="Student" className="w-full px-3 py-2 bg-surface border border-border-default rounded-md text-sm text-foreground focus:outline-none focus:border-aero-blue" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-text-secondary">Last Name</label>
                <input type="text" defaultValue="AeroSpark" className="w-full px-3 py-2 bg-surface border border-border-default rounded-md text-sm text-foreground focus:outline-none focus:border-aero-blue" />
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-medium text-text-secondary">Email Address</label>
                <input type="email" defaultValue="student@aerospark.com" className="w-full px-3 py-2 bg-surface border border-border-default rounded-md text-sm text-foreground focus:outline-none focus:border-aero-blue" />
              </div>
            </div>
            <div className="pt-4 flex justify-end">
              <button className="px-4 py-2 bg-aero-blue text-aero-blue-fg font-semibold rounded-lg text-sm hover:bg-aero-blue-dim transition-colors">Save Changes</button>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
