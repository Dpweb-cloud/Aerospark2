// Reusable Framer Motion variants for the AeroSpark platform

export const fadeIn: any = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

export const fadeInUp: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const fadeInDown: any = {
  hidden: { opacity: 0, y: -30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const fadeInLeft: any = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const fadeInRight: any = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const scaleIn: any = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export const staggerContainer: any = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: any = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export const slideInFromLeft: any = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export const slideInFromRight: any = {
  hidden: { x: 100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
};

export const pageTransition: any = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.3, ease: "easeIn" } },
};

export const hoverScale: any = {
  scale: 1.02,
  transition: { duration: 0.2, ease: "easeOut" },
};

export const tapScale: any = {
  scale: 0.98,
};

export const glowPulse: any = {
  animate: {
    boxShadow: [
      "0 0 20px rgba(152, 216, 225, 0)",
      "0 0 20px rgba(152, 216, 225, 0.15)",
      "0 0 20px rgba(152, 216, 225, 0)",
    ],
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  },
};
