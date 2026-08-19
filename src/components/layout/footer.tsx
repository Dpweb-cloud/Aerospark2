"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Rocket, Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { staggerContainer, staggerItem } from "@/lib/motion";

const footerSections = [
  {
    title: "Engineering & Consulting",
    links: [
      { label: "Drone Type Certification", href: "/consultation/uas-certification" },
      { label: "UAV Design & Development", href: "/consultation/drone-rd" },
      { label: "Design & Simulation", href: "/consultation/design-simulation" },
      { label: "Aerospace Quality Systems", href: "/consultation/as9100d-quality" },
      { label: "View All Engineering Services →", href: "/consultation" },
    ],
  },
  {
    title: "AeroSpark Academy",
    links: [
      { label: "Aerospace Engineering Courses", href: "/academy/course/aerospace-fundamentals" },
      { label: "Drone & UAV Courses", href: "/academy/course/dgca-drone-regulations" },
      { label: "CAD / CAE & CFD", href: "/academy/course/cfd-analysis" },
      { label: "Quality & Certification Training", href: "/academy/course/as9100d-quality" },
      { label: "Explore All Courses →", href: "/academy" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About AeroSpark", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Insights", href: "/insights" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
      { label: "Refund Policy", href: "/refund-policy" },
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
              <img src="/logo1.png" alt="Logo" className="w-9 h-9 object-contain relative -top-[2px]" />
              <span className="text-xl font-bold tracking-tight">
                <span className="text-[#00008B]">Aero</span>
                <span className="text-orange-500">Spark</span>
              </span>
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed max-w-sm">
              Aerospace engineering, UAV development, drone certification support, design & simulation, and industry-focused technical training — from engineering challenges to practical solutions.
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
            © 2026 AeroSpark. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
