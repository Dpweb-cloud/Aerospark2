"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Rocket, Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { staggerContainer, staggerItem } from "@/lib/motion";

const footerSections = [
  {
    title: "Platform",
    links: [
      { label: "Academy", href: "/academy" },
      { label: "Consultation", href: "/consultation" },
      { label: "Insights", href: "/insights" },
      { label: "Dashboard", href: "/dashboard" },
    ],
  },
  {
    title: "Courses",
    links: [
      { label: "Drone DGCA", href: "/academy" },
      { label: "AS9100D", href: "/academy" },
      { label: "CATIA V5", href: "/academy" },
      { label: "CFD / FEA", href: "/academy" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Careers", href: "/about" },
      { label: "Privacy Policy", href: "/about" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative border-t border-border-subtle bg-background">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10"
        >
          {/* Brand Column */}
          <motion.div variants={staggerItem} className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-2.5">
              <img src="/logo.png" alt="Logo" className="w-7 h-7 object-contain" />
              <span className="text-lg font-bold text-foreground">{SITE_CONFIG.name}</span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed max-w-sm">
              A futuristic aerospace engineering ecosystem combining education,
              R&D, and enterprise solutions for the next generation of aerospace
              professionals.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-2.5 text-text-secondary text-sm">
                <Mail className="w-4 h-4 text-aero-blue/60" />
                <span>hello@aerospark.io</span>
              </div>
              <div className="flex items-center gap-2.5 text-text-secondary text-sm">
                <Phone className="w-4 h-4 text-aero-blue/60" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2.5 text-text-secondary text-sm">
                <MapPin className="w-4 h-4 text-aero-blue/60" />
                <span>Bengaluru, India</span>
              </div>
            </div>
          </motion.div>

          {/* Link Columns */}
          {footerSections.map((section) => (
            <motion.div key={section.title} variants={staggerItem} className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-aero-blue transition-colors duration-200 flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="hud-label text-text-muted">
              SYS.STATUS: <span className="text-emerald-400">OPERATIONAL</span>
            </span>
            <span className="hud-label text-text-muted">
              v2.0.1
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
