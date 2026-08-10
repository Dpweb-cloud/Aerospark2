"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard } from "@/components/ui/cards";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { User, Lock, Bell, Palette, Moon, Sun } from "lucide-react";
import {
  getUserSettingsAction,
  updateProfileSettingsAction,
  updateSecuritySettingsAction,
  updateNotificationSettingsAction,
  updateAppearanceSettingsAction
} from "@/app/actions/dashboardActions";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<"Profile" | "Security" | "Notifications" | "Appearance">("Profile");

  // Profile Form State
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  // Security Form State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Notification State
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [assignments, setAssignments] = useState(true);
  const [reminders, setReminders] = useState(false);

  // Appearance State
  const [themeMode, setThemeMode] = useState<"dark" | "light">("dark");
  const [accentColor, setAccentColor] = useState<"blue" | "green" | "purple">("blue");

  // Loading States
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load settings from database
  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await getUserSettingsAction();
        if (res.success && res.data) {
          setFirstName(res.data.firstName);
          setLastName(res.data.lastName);
          setEmail(res.data.email);
          setEmailAlerts(res.data.emailAlerts);
          setAssignments(res.data.assignmentAlerts);
          setReminders(res.data.classReminders);
          if (res.data.accentTheme) {
            setAccentColor(res.data.accentTheme as "blue" | "green" | "purple");
          }
        }
      } catch (err: any) {
        console.error("Error loading settings:", err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  // Sync settings with local preferences & next-themes on mount
  useEffect(() => {
    setMounted(true);
    if (theme === "dark" || theme === "light") {
      setThemeMode(theme);
    }
    const savedAccent = localStorage.getItem("accentColor") as "blue" | "green" | "purple";
    if (savedAccent) {
      setAccentColor(savedAccent);
    }
  }, [theme]);

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await updateProfileSettingsAction(firstName, lastName, email);
      if (res.success) {
        if (res.mock) {
          toast.success("Information updated (Simulated mode — DB is offline).");
        } else {
          toast.success("Information updated successfully!");
        }
      } else {
        toast.error(res.error || "Failed to update profile.");
      }
    } catch (err: any) {
      toast.error("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleSecuritySave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    setSaving(true);
    try {
      const res = await updateSecuritySettingsAction(currentPassword, newPassword);
      if (res.success) {
        if (res.mock) {
          toast.success("Password updated (Simulated mode — DB is offline).");
        } else {
          toast.success("Password updated in database!");
        }
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        toast.error(res.error || "Failed to update password.");
      }
    } catch (err: any) {
      toast.error("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleNotificationsSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await updateNotificationSettingsAction(emailAlerts, assignments, reminders);
      if (res.success) {
        if (res.mock) {
          toast.success("Preferences saved (Simulated mode — DB is offline).");
        } else {
          toast.success("Notification preferences saved in database!");
        }
      } else {
        toast.error(res.error || "Failed to save preferences.");
      }
    } catch (err: any) {
      toast.error("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleAppearanceSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      // 1. Save accent choice to database
      const res = await updateAppearanceSettingsAction(accentColor);
      
      // 2. Update theme via next-themes (Light/Dark)
      setTheme(themeMode);
      
      // 3. Update accent color in DOM and local storage
      document.documentElement.setAttribute("data-accent", accentColor);
      localStorage.setItem("accentColor", accentColor);

      if (res.success) {
        if (res.mock) {
          toast.success("Theme settings applied (Simulated mode — DB is offline)!");
        } else {
          toast.success("Theme and style settings applied and saved in database!");
        }
      } else {
        toast.error(res.error || "Failed to save theme settings.");
      }
    } catch (err: any) {
      toast.error("Error: " + err.message);
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: "Profile" as const, label: "Profile", icon: User },
    { id: "Security" as const, label: "Security", icon: Lock },
    { id: "Notifications" as const, label: "Notifications", icon: Bell },
    { id: "Appearance" as const, label: "Appearance", icon: Palette },
  ];

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-aero-blue border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-mono text-text-secondary">Loading Settings...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-foreground tracking-tight">Settings</h1>
        <p className="text-text-secondary mt-1">Manage your account preferences and application settings.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        {/* Sidebar Nav */}
        <div className="md:col-span-1 space-y-1">
          {tabs.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-3 w-full px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-aero-blue/10 text-aero-blue"
                    : "text-text-secondary hover:text-foreground hover:bg-surface-elevated"
                }`}
              >
                <item.icon className="w-4 h-4" /> {item.label}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="md:col-span-3">
          <AnimatePresence mode="wait">
            {activeTab === "Profile" && (
              <motion.div
                key="Profile"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <GlassCard className="p-6">
                  <h2 className="text-lg font-semibold text-foreground border-b border-border-subtle pb-4">
                    Personal Information
                  </h2>
                  <form onSubmit={handleProfileSave} className="space-y-4 mt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-text-secondary">First Name</label>
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full px-3 py-2 bg-surface border border-border-default rounded-xl text-sm text-foreground focus:outline-none focus:border-aero-blue"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-text-secondary">Last Name</label>
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full px-3 py-2 bg-surface border border-border-default rounded-xl text-sm text-foreground focus:outline-none focus:border-aero-blue"
                          required
                        />
                      </div>
                      <div className="space-y-1.5 sm:col-span-2">
                        <label className="text-xs font-medium text-text-secondary">Email Address</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-3 py-2 bg-surface border border-border-default rounded-xl text-sm text-foreground focus:outline-none focus:border-aero-blue"
                          required
                        />
                      </div>
                    </div>
                    <div className="pt-4 flex justify-end">
                      <Button type="submit" variant="primary" disabled={saving}>
                        {saving ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  </form>
                </GlassCard>
              </motion.div>
            )}

            {activeTab === "Security" && (
              <motion.div
                key="Security"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <GlassCard className="p-6">
                  <h2 className="text-lg font-semibold text-foreground border-b border-border-subtle pb-4">
                    Security Credentials
                  </h2>
                  <form onSubmit={handleSecuritySave} className="space-y-4 mt-6">
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-text-secondary">Current Password</label>
                        <input
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="w-full px-3 py-2 bg-surface border border-border-default rounded-xl text-sm text-foreground focus:outline-none focus:border-aero-blue"
                          placeholder="••••••••"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-text-secondary">New Password</label>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full px-3 py-2 bg-surface border border-border-default rounded-xl text-sm text-foreground focus:outline-none focus:border-aero-blue"
                          placeholder="Minimum 8 characters"
                          required
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-text-secondary">Confirm New Password</label>
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full px-3 py-2 bg-surface border border-border-default rounded-xl text-sm text-foreground focus:outline-none focus:border-aero-blue"
                          placeholder="Confirm new password"
                          required
                        />
                      </div>
                    </div>
                    <div className="pt-4 flex justify-end">
                      <Button type="submit" variant="primary" disabled={saving}>
                        {saving ? "Updating..." : "Update Password"}
                      </Button>
                    </div>
                  </form>
                </GlassCard>
              </motion.div>
            )}

            {activeTab === "Notifications" && (
              <motion.div
                key="Notifications"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <GlassCard className="p-6">
                  <h2 className="text-lg font-semibold text-foreground border-b border-border-subtle pb-4">
                    Notification Preferences
                  </h2>
                  <form onSubmit={handleNotificationsSave} className="space-y-4 mt-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 rounded-xl border border-border-default bg-surface/50">
                        <div>
                          <span className="text-sm font-semibold text-foreground block">Email Alerts</span>
                          <span className="text-xs text-text-secondary">Receive daily digests and notifications via email.</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={emailAlerts}
                          onChange={(e) => setEmailAlerts(e.target.checked)}
                          className="w-4 h-4 accent-aero-blue cursor-pointer"
                        />
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-xl border border-border-default bg-surface/50">
                        <div>
                          <span className="text-sm font-semibold text-foreground block">Assignment Updates</span>
                          <span className="text-xs text-text-secondary">Notify me when assignments are graded or approved.</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={assignments}
                          onChange={(e) => setAssignments(e.target.checked)}
                          className="w-4 h-4 accent-aero-blue cursor-pointer"
                        />
                      </div>

                      <div className="flex items-center justify-between p-3 rounded-xl border border-border-default bg-surface/50">
                        <div>
                          <span className="text-sm font-semibold text-foreground block">Class Schedule Reminders</span>
                          <span className="text-xs text-text-secondary">Notify me 15 minutes before scheduled classes begin.</span>
                        </div>
                        <input
                          type="checkbox"
                          checked={reminders}
                          onChange={(e) => setReminders(e.target.checked)}
                          className="w-4 h-4 accent-aero-blue cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className="pt-4 flex justify-end">
                      <Button type="submit" variant="primary" disabled={saving}>
                        {saving ? "Saving..." : "Save Preferences"}
                      </Button>
                    </div>
                  </form>
                </GlassCard>
              </motion.div>
            )}

            {activeTab === "Appearance" && mounted && (
              <motion.div
                key="Appearance"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <GlassCard className="p-6">
                  <h2 className="text-lg font-semibold text-foreground border-b border-border-subtle pb-4">
                    Theme & Style Settings
                  </h2>
                  <form onSubmit={handleAppearanceSave} className="space-y-6 mt-6">
                    <div className="space-y-4">
                      {/* Theme Mode toggle */}
                      <div>
                        <label className="block text-xs font-mono font-bold text-text-muted uppercase tracking-wider mb-3">
                          Select Mode
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setThemeMode("dark")}
                            className={`flex items-center justify-center gap-2 p-3.5 rounded-xl border text-sm font-medium transition-all duration-300 ${
                              themeMode === "dark"
                                ? "bg-aero-blue/10 border-aero-blue/40 text-foreground"
                                : "bg-surface border-border-default text-text-secondary hover:border-border-default/80"
                            }`}
                          >
                            <Moon className="w-4 h-4 text-aero-blue" />
                            Dark Mode
                          </button>
                          <button
                            type="button"
                            onClick={() => setThemeMode("light")}
                            className={`flex items-center justify-center gap-2 p-3.5 rounded-xl border text-sm font-medium transition-all duration-300 ${
                              themeMode === "light"
                                ? "bg-aero-blue/10 border-aero-blue/40 text-foreground"
                                : "bg-surface border-border-default text-text-secondary hover:border-border-default/80"
                            }`}
                          >
                            <Sun className="w-4 h-4 text-amber-500" />
                            Light Mode
                          </button>
                        </div>
                      </div>

                      {/* Accent Color selection */}
                      <div>
                        <label className="block text-xs font-mono font-bold text-text-muted uppercase tracking-wider mb-3">
                          Accent Tone
                        </label>
                        <div className="flex gap-4">
                          {[
                            { id: "blue" as const, name: "Aero Blue", class: "bg-aero-blue" },
                            { id: "green" as const, name: "Emerald Green", class: "bg-emerald-400" },
                            { id: "purple" as const, name: "Indigo Purple", class: "bg-purple-500" },
                          ].map((color) => {
                            const isSelected = accentColor === color.id;
                            return (
                              <button
                                key={color.id}
                                type="button"
                                onClick={() => setAccentColor(color.id)}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all duration-300 ${
                                  isSelected
                                    ? "bg-surface-elevated border-aero-blue/40 text-foreground"
                                    : "bg-surface border-border-default text-text-secondary hover:border-border-default/80"
                                }`}
                              >
                                <span className={`w-3 h-3 rounded-full ${color.class}`} />
                                {color.name}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    <div className="pt-2 flex justify-end">
                      <Button type="submit" variant="primary" disabled={saving}>
                        {saving ? "Applying..." : "Apply Theme"}
                      </Button>
                    </div>
                  </form>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
