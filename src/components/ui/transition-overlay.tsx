"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface TransitionOverlayProps {
  isOpen: boolean;
  targetUrl: string;
  courseName: string;
}

export function TransitionOverlay({
  isOpen,
  targetUrl,
  courseName,
}: TransitionOverlayProps) {
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => {
        router.push(targetUrl);
      }, 3000); // 3 seconds transition
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "unset";
      };
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen, targetUrl, router]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-aero-blue/10 rounded-full blur-[100px]" />

          {/* Elegant Loading Card */}
          <motion.div 
            initial={{ y: 40, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center justify-center p-8 md:p-12 glass-panel rounded-3xl border border-border-default shadow-2xl max-w-2xl w-full mx-4"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-5 h-5 border-2 border-aero-blue border-t-transparent rounded-full animate-spin" />
              <span className="text-aero-blue text-xs md:text-sm uppercase tracking-[0.2em] font-medium">
                Loading Syllabus
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-tight text-center px-4 mb-8 leading-tight"
            >
              {courseName}
            </motion.h2>

            {/* Smooth progress bar */}
            <div className="w-full max-w-md h-1 bg-surface-elevated rounded-full overflow-hidden">
              <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ delay: 0.5, duration: 2.5, ease: "easeInOut" }}
                className="w-full h-full bg-aero-blue rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
