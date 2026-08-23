"use client";

import React from "react";
import { Phone, Mail } from "lucide-react";

/* Official WhatsApp brand SVG */
const WhatsAppIcon = () => (
  <svg viewBox="0 0 32 32" className="w-6 h-6" fill="white">
    <path d="M16 .5C7.44.5.5 7.44.5 16c0 2.8.73 5.43 2.01 7.71L.5 31.5l8.04-2.01A15.44 15.44 0 0 0 16 31.5c8.56 0 15.5-6.94 15.5-15.5S24.56.5 16 .5zm0 28.33a12.82 12.82 0 0 1-6.53-1.78l-.47-.28-4.78 1.19 1.22-4.64-.31-.49A12.83 12.83 0 1 1 16 28.83zm7.03-9.6c-.38-.19-2.26-1.11-2.61-1.24-.35-.12-.61-.19-.86.19-.26.38-.99 1.24-1.21 1.5-.22.25-.44.28-.82.09a10.38 10.38 0 0 1-3.06-1.89 11.55 11.55 0 0 1-2.12-2.63c-.22-.38-.02-.59.17-.77.17-.17.38-.44.57-.66.19-.22.25-.38.38-.63.13-.25.06-.47-.03-.66-.09-.19-.86-2.07-1.18-2.83-.31-.74-.63-.64-.86-.65h-.73c-.25 0-.66.09-1.01.47-.35.38-1.33 1.3-1.33 3.16s1.36 3.66 1.55 3.91c.19.25 2.68 4.09 6.49 5.74a21.9 21.9 0 0 0 2.17.8c.91.29 1.74.25 2.39.15.73-.11 2.26-.92 2.58-1.81.32-.89.32-1.65.22-1.81-.09-.16-.35-.25-.73-.44z"/>
  </svg>
);

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.77a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const contacts = [
  {
    name: "WhatsApp",
    icon: <WhatsAppIcon />,
    href: "https://wa.me/919316966504",
    label: "+91 93169 66504",
    sublabel: "Chat on WhatsApp",
    bg: "bg-[#25D366]",
    hoverBg: "hover:bg-[#1ebe5d]",
    shadow: "shadow-[#25D366]/30",
    tooltipBorder: "border-[#25D366]/40",
    tooltipAccent: "text-[#25D366]",
    newTab: true,
  },
  {
    name: "Call",
    icon: <PhoneIcon />,
    href: "tel:+919316966504",
    label: "+91 93169 66504",
    sublabel: "Tap to Call",
    bg: "bg-[#FF6600]",
    hoverBg: "hover:bg-[#e65c00]",
    shadow: "shadow-[#FF6600]/30",
    tooltipBorder: "border-[#FF6600]/40",
    tooltipAccent: "text-[#FF6600]",
    newTab: false,
  },
  {
    name: "Email",
    icon: <EmailIcon />,
    href: "mailto:connect@aerospark.in",
    label: "connect@aerospark.in",
    sublabel: "Send Email",
    bg: "bg-[#062B49]",
    hoverBg: "hover:bg-[#0a3d68]",
    shadow: "shadow-[#062B49]/30",
    tooltipBorder: "border-[#062B49]/40",
    tooltipAccent: "text-[#062B49] dark:text-blue-300",
    newTab: false,
  },
];

export function FloatingContact() {
  return (
    <div className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 pointer-events-none">
      {contacts.map((c, idx) => (
        <a
          key={idx}
          href={c.href}
          target={c.newTab ? "_blank" : undefined}
          rel={c.newTab ? "noopener noreferrer" : undefined}
          aria-label={c.sublabel}
          className={`
            group pointer-events-auto relative
            flex items-center justify-center
            w-12 h-12 rounded-full
            ${c.bg} ${c.hoverBg}
            shadow-lg ${c.shadow}
            hover:shadow-xl hover:scale-110 active:scale-95
            transition-all duration-200
          `}
        >
          {/* Icon */}
          <span className="flex items-center justify-center shrink-0">
            {c.icon}
          </span>

          {/* Tooltip — slides in from the right edge */}
          <div className={`
            absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2
            bg-background/95 backdrop-blur-md
            border ${c.tooltipBorder}
            px-3.5 py-2.5 rounded-xl
            shadow-xl
            opacity-0 translate-x-3 pointer-events-none
            group-hover:opacity-100 group-hover:translate-x-0
            transition-all duration-250
            flex flex-col items-start gap-0.5
            min-w-max
          `}>
            <span className={`text-[10px] font-bold uppercase tracking-widest ${c.tooltipAccent}`}>
              {c.sublabel}
            </span>
            <span className="text-foreground text-sm font-semibold leading-tight">
              {c.label}
            </span>
          </div>
        </a>
      ))}
    </div>
  );
}
