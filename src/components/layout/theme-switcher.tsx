"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";

export function ThemeSwitcher() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-16 h-8" />;

  const isDark = resolvedTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className={`relative w-16 h-8 rounded-full flex items-center p-1 transition-colors duration-500 shadow-inner overflow-hidden ${
        isDark ? "bg-[#1a202c] border border-white/10" : "bg-[#71c5ee] border border-blue-400/20"
      }`}
      aria-label="Toggle Theme"
    >
      {/* Background elements */}
      <AnimatePresence initial={false}>
        {isDark ? (
          <motion.div
            key="night-sky"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            {/* Stars */}
            <div className="absolute top-1.5 left-3 w-0.5 h-0.5 bg-white rounded-full opacity-80" />
            <div className="absolute top-4 left-5 w-[1.5px] h-[1.5px] bg-white rounded-full opacity-60" />
            <div className="absolute top-2 left-7 w-0.5 h-0.5 bg-white rounded-full opacity-90 shadow-[0_0_2px_#fff]" />
          </motion.div>
        ) : (
          <motion.div
            key="day-sky"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            {/* Clouds */}
            <div className="absolute top-1.5 right-2 w-3 h-1 bg-white/80 rounded-full" />
            <div className="absolute top-2 right-1.5 w-2 h-1 bg-white/80 rounded-full" />
            <div className="absolute top-4 right-5 w-4 h-1.5 bg-white/70 rounded-full" />
            <div className="absolute top-3.5 right-4 w-2 h-1 bg-white/70 rounded-full" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sliding Knob */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
        className={`relative w-6 h-6 rounded-full z-10 shadow-[0_2px_4px_rgba(0,0,0,0.2)] flex items-center justify-center overflow-hidden ${
          isDark ? "bg-[#cbd5e0] ml-auto" : "bg-[#f6e05e]"
        }`}
      >
        <AnimatePresence initial={false}>
          {isDark ? (
            <motion.div
              key="moon-craters"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <div className="absolute top-1 left-1 w-1.5 h-1.5 bg-[#a0aec0] rounded-full opacity-50" />
              <div className="absolute top-3 right-1 w-1 h-1 bg-[#a0aec0] rounded-full opacity-60" />
              <div className="absolute bottom-1 left-2 w-1.5 h-1 bg-[#a0aec0] rounded-full opacity-50" />
            </motion.div>
          ) : (
            <motion.div
              key="sun-glow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-full"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </button>
  );
}
