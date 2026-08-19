"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Cookie, X } from "lucide-react";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check local storage for consent status
    const consent = localStorage.getItem("cookiesAccepted");
    if (!consent) {
      // Delay showing the banner slightly for a premium feel
      const timer = setTimeout(() => {
        setVisible(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookiesAccepted", "false");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed bottom-6 right-6 left-6 md:left-auto md:w-96 z-50 overflow-hidden"
        >
          <div className="glass-panel p-5 bg-background/80 dark:bg-background/70 backdrop-blur-xl border border-border-default/60 shadow-[0_12px_40px_rgba(0,0,0,0.15)] rounded-2xl relative">
            <button
              onClick={() => setVisible(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-text-secondary hover:text-foreground transition-colors"
              aria-label="Close panel"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#FF6600]/10 border border-[#FF6600]/10 flex items-center justify-center shrink-0">
                <Cookie className="w-5 h-5 text-[#FF6600]" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-foreground flex items-center gap-1.5">
                  Cookie Consent
                </h4>
                <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">
                  We use cookies to maintain your session security (lasting 3 days) and optimize learning services.
                </p>
                <div className="flex gap-2.5 mt-4 justify-end">
                  <button
                    onClick={handleDecline}
                    className="text-xs font-semibold text-text-secondary hover:text-foreground px-3 py-1.5 rounded-lg hover:bg-surface-hover/20 transition-all"
                  >
                    Decline
                  </button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleAccept}
                    className="bg-[#FF6600] text-white hover:bg-[#e65c00] border-none text-xs px-4 shadow-sm"
                  >
                    Accept Cookies
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
