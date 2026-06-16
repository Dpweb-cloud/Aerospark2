"use client";

import { useEffect, useState } from "react";
import { Palette } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const themes = [
  { id: "light", name: "Light Mode", color: "#003087" },
  { id: "dark", name: "Dark Mode", color: "#FF6600" },
];

export function ThemeSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("aerospark-theme");
    if (savedTheme === "dark") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  const setTheme = (themeId: string) => {
    const root = document.documentElement;
    
    if (themeId === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    setCurrentTheme(themeId);
    localStorage.setItem("aerospark-theme", themeId);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-elevated border border-border-default hover:border-aero-blue transition-colors text-text-secondary hover:text-foreground"
        aria-label="Switch Theme"
      >
        <Palette className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-48 p-2 rounded-xl bg-surface-elevated border border-border-default shadow-2xl z-50 flex flex-col gap-1 backdrop-blur-xl"
          >
            <div className="px-3 py-2 text-xs font-semibold text-text-muted uppercase tracking-wider border-b border-border-subtle mb-1">
              Select Theme
            </div>
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setTheme(theme.id)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  mounted && currentTheme === theme.id
                    ? "bg-aero-blue/10 text-foreground"
                    : "text-text-secondary hover:bg-surface-hover hover:text-foreground"
                }`}
              >
                <div
                  className="w-3 h-3 rounded-full shadow-sm"
                  style={{ backgroundColor: theme.color }}
                />
                {theme.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
