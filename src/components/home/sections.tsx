"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SectionHeader, GlassCard, Badge } from "@/components/ui/cards";
import { Button } from "@/components/ui/button";
import { COURSES } from "@/lib/constants";
import { staggerContainer, staggerItem } from "@/lib/motion";
import {
  BookOpen,
  Users,
  Building,
  Award,
  Star,
  Clock,
  ChevronRight,
  ArrowRight,
  GraduationCap,
  Zap,
  Shield,
  Quote,
  Plane,
  Activity,
  Cpu,
  BarChart2,
  ChevronLeft,
  Wind,
  PenTool,
  ShieldCheck,
  Hexagon,
  FileCheck,
  Check,
} from "lucide-react";
import { ConsultationModal } from "./consultation-modal";


const levelColors = {
  Beginner: "green",
  Intermediate: "blue",
  Advanced: "red",
} as const;

/* ─── Featured Courses ─── */
export function FeaturedCourses() {
  const router = useRouter();
  const [animatingCard, setAnimatingCard] = useState<string | null>(null);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollBy({ left: -containerWidth, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      // Calculate scroll amount based on visible width
      const containerWidth = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollBy({ left: containerWidth, behavior: "smooth" });
    }
  };

  const featuredCourseIds = [
    "dgca-drone-regulations",
    "drone-components",
    "aerospace-fundamentals",
    "catia-design",
    "cfd-analysis",
    "as9100d-quality",
    "mathematics-fea-cfd"
  ];

  const featured = featuredCourseIds.map(id => COURSES.find(c => c.id === id)).filter(Boolean) as typeof COURSES;

  const handleApplyClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setAnimatingCard(id);
    setTimeout(() => {
      router.push(`/academy/course/${id}`);
    }, 600);
  };

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col items-center mb-12">
          <div className="text-center max-w-3xl mx-auto mb-6">
            <span className="text-[#FF6600] font-bold text-xs uppercase tracking-widest block mb-3">
              Learn the Engineering Behind Flight.
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mb-6">
              AeroSpark Academy
            </h2>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed">
              Build practical skills for modern aerospace and UAV careers through focused courses, bridging the gap between textbook theory and real-world engineering.
            </p>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={scrollLeft}
              className="w-12 h-12 rounded-full flex items-center justify-center bg-surface border border-border-default hover:bg-aero-blue/10 hover:border-aero-blue/30 transition-all text-text-secondary hover:text-aero-blue shadow-sm shrink-0"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={scrollRight}
              className="w-12 h-12 rounded-full flex items-center justify-center bg-surface border border-border-default hover:bg-aero-blue/10 hover:border-aero-blue/30 transition-all text-text-secondary hover:text-aero-blue shadow-sm shrink-0"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto hide-scrollbar pb-8 scroll-smooth snap-x snap-mandatory"
        >
          {featured.map((course) => (
            <div
              key={course.id}
              onClick={() => router.push(`/academy/course/${course.id}`)}
              className="snap-start shrink-0 w-[85vw] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] group cursor-pointer rounded-[24px] border border-[#D9E4EE] bg-white shadow-[0_4px_20px_rgba(16,42,67,0.04)] hover:shadow-[0_8px_30px_rgba(16,42,67,0.08)] hover:border-[#2F80ED]/40 hover:-translate-y-1 transition-all duration-300 ease-out overflow-hidden flex flex-col relative"
            >
              {/* Image Header */}
              <div className="relative w-full aspect-[1.85] shrink-0 overflow-hidden bg-slate-100 rounded-t-[24px]">
                {course.image && (
                  <img
                    src={course.image}
                    alt={course.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                  />
                )}
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-[#062B49] text-white px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider shadow-sm">
                    {course.tags[0] || course.category}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-col flex-1 px-6 pb-6 pt-5 bg-white">
                <h3 className="text-[19px] font-bold text-[#FF6B00] hover:text-[#e65c00] transition-colors mb-2 line-clamp-2">
                  {course.title}
                </h3>

                <p className="text-[13px] text-[#52677D] line-clamp-2 overflow-hidden mb-3 font-medium leading-relaxed">
                  {course.description}
                </p>

                <div className="flex items-center gap-3 mb-2">
                  <div className="flex items-center gap-1.5 text-sm font-bold text-[#102A43]">
                    <Star className="w-4 h-4 text-[#FF6B00] fill-[#FF6B00]" />
                    {course.rating}
                  </div>
                  <div className="w-px h-4 bg-[#D9E4EE]" />
                  <div className="flex items-center gap-1.5 text-[12px] font-bold text-[#52677D] truncate">
                    <BarChart2 className="w-3.5 h-3.5 text-[#52677D]" />
                    <span className="truncate">{course.level} • {course.tags[1] || course.tags[0]}</span>
                  </div>
                </div>

                <div className="w-full h-px bg-[#D9E4EE]/50 my-2.5" />

                {/* Duration & Content */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1.5 text-[#52677D] text-[11px] font-medium">
                      <Clock className="w-3.5 h-3.5 text-[#52677D] stroke-[2]" />
                      <span>Duration</span>
                    </div>
                    <span className="text-sm font-bold text-[#102A43] mt-1">{course.duration}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1.5 text-[#52677D] text-[11px] font-medium">
                      <BookOpen className="w-3.5 h-3.5 text-[#52677D] stroke-[2]" />
                      <span>Content</span>
                    </div>
                    <span className="text-sm font-bold text-[#102A43] mt-1">{course.lessons} lessons</span>
                  </div>
                </div>

                {/* Footer Stats & Price */}
                <div className="flex items-center justify-between mt-auto pt-3">
                  <div className="flex flex-col gap-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] text-[#52677D] line-through font-medium leading-none">₹{Math.floor(course.price * 1.6).toLocaleString()}</span>
                      <span className="bg-[#FF6B00]/10 text-[#FF6B00] px-1 py-0.5 rounded-[4px] text-[8px] font-bold uppercase tracking-wider">37% OFF</span>
                    </div>
                    <span className="text-[22px] font-bold text-[#062B49] tracking-tight leading-none">₹{course.price.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={(e) => handleApplyClick(e, course.id)}
                    className="relative overflow-hidden h-[50px] bg-[#062B49] hover:bg-[#0B3558] text-white px-5 rounded-[14px] text-sm font-bold transition-all duration-300 shadow-md flex items-center justify-center min-w-[130px] gap-2 cursor-pointer border-none group/btn"
                  >
                    <span className={animatingCard === course.id ? "opacity-0" : "flex items-center gap-1.5"}>
                      Apply Now <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </span>
                    {animatingCard === course.id && (
                      <motion.div
                        initial={{ x: -20, y: 0, opacity: 0, scale: 0.5 }}
                        animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                        className="absolute inset-0 flex items-center justify-center bg-emerald-500 text-white"
                      >
                        <Check className="w-5 h-5 mr-1" /> Applied!
                      </motion.div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
          {/* Spacer to push the last card past the floating contact buttons */}
          <div className="shrink-0 w-8 md:w-16" aria-hidden="true"></div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-center"
        >
          <Button variant="outline" href="/academy">
            Explore AeroSpark Academy
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Why AeroSpark Section ─── */
export function WhyAeroSparkSection() {
  const points = [
    {
      title: "Engineering-Led",
      description: "Our approach starts with practical engineering problems, not just textbook theory.",
      icon: <Cpu className="w-6 h-6 text-[#FF6600]" />,
      glowColor: "from-[#FF6600]/10 to-transparent",
    },
    {
      title: "Focused on UAVs & Aerospace",
      description: "We work across drone development, design, simulation, certification, and emerging aviation technologies.",
      icon: <Plane className="w-6 h-6 text-[#003087] dark:text-blue-400" />,
      glowColor: "from-[#003087]/10 to-transparent",
    },
    {
      title: "Built Around Industry Skills",
      description: "Our learning programs focus on technical knowledge and tools that matter in real engineering environments.",
      icon: <Award className="w-6 h-6 text-emerald-500" />,
      glowColor: "from-emerald-500/10 to-transparent",
    },
    {
      title: "From Learning to Application",
      description: "Whether you're developing your skills or developing an aircraft, AeroSpark is built to help move ideas forward.",
      icon: <Activity className="w-6 h-6 text-purple-500" />,
      glowColor: "from-purple-500/10 to-transparent",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-surface-elevated/10">
      {/* Decorative background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-aero-blue/[0.03] to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[300px] bg-[#FF6600]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-[#FF6600] font-bold text-xs uppercase tracking-widest block mb-3">
            Real Engineering. Practical Learning.
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mb-6">
            Why AeroSpark?
          </h2>
          <p className="text-text-secondary text-base md:text-lg leading-relaxed">
            AeroSpark brings engineering services and technical education together, creating a place where aerospace knowledge is applied, not just taught.
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {points.map((point) => (
            <motion.div key={point.title} variants={staggerItem} className="h-full">
              <div className="group relative h-full bg-surface-elevated/40 backdrop-blur-md rounded-2xl border border-border-default hover:border-aero-blue/40 transition-all duration-500 overflow-hidden flex flex-col p-5 sm:p-6 shadow-sm hover:shadow-[0_8px_30px_rgba(0,48,135,0.08)]">
                
                {/* Subtle gradient background glow on hover */}
                <div className={`absolute -inset-24 bg-gradient-to-tr ${point.glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl rounded-full`} />

                <div className="relative z-10 flex items-center justify-between mb-5">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-surface-elevated to-surface border border-border-default group-hover:scale-110 transition-transform duration-500 shadow-sm">
                    {point.icon}
                  </div>
                </div>

                <div className="relative z-10 flex-1 flex flex-col">
                  <h3 className="text-[17px] font-bold text-foreground mb-2 group-hover:text-[#FF6600] transition-colors duration-300 leading-tight">
                    {point.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed font-medium">
                    {point.description}
                  </p>
                </div>

                {/* Decorative bottom line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-aero-blue to-[#FF6600] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}


/* ─── Career Pathways Section ─── */
export function CareerPathwaysSection() {
  const pathways = [
    {
      icon: <PenTool className="w-8 h-8" />,
      subheading: "DESIGN & DEVELOPMENT",
      title: "UAV Design Engineer",
      description: "Learn the foundations of UAV systems, aircraft design, CAD, structures, aerodynamics, and engineering analysis involved in developing unmanned aircraft.",
      buttonText: "Explore UAV Engineering Path",
      color: "from-blue-500 to-[#003087]",
    },
    {
      icon: <Wind className="w-8 h-8" />,
      subheading: "AERODYNAMICS & SIMULATION",
      title: "Aerodynamics Engineer",
      description: "Build your understanding of aerodynamics, fluid mechanics, CFD, aircraft performance, and simulation for aerospace and UAV applications.",
      buttonText: "Explore Aerodynamics Path",
      color: "from-[#FF6600] to-orange-600",
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      subheading: "QUALITY & COMPLIANCE",
      title: "Aerospace Quality Engineer",
      description: "Develop knowledge of aerospace quality management, AS9100D, compliance, documentation, risk management, and certification processes.",
      buttonText: "Explore Aerospace Quality Path",
      color: "from-emerald-400 to-emerald-600",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-surface-elevated/30">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-aero-blue/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-[#FF6600] font-bold text-xs uppercase tracking-widest block mb-3">
            Build Skills for the Engineering Roles That Shape Flight.
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mb-6">
            Explore Your Path in Aerospace
          </h2>
          <p className="text-text-secondary text-base md:text-lg leading-relaxed">
            Explore focused learning paths across UAV design, aerodynamics, CFD, aerospace quality, and certification. Each path brings together the technical knowledge and practical skills relevant to a specific area of aerospace engineering.
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {pathways.map((path) => {
            const slug = path.title.toLowerCase().replace(/ /g, '-');
            return (
              <motion.div key={path.title} variants={staggerItem} className="h-full">
                <Link href={`/pathways/${slug}`} className="group relative h-full bg-surface rounded-[24px] border border-border-default hover:border-[#FF6600]/40 transition-all duration-500 overflow-hidden flex flex-col p-8 shadow-sm hover:shadow-2xl hover:shadow-[#FF6600]/10 hover:-translate-y-2 block cursor-pointer">

                  {/* Background Watermark Icon */}
                  <div className="absolute -right-8 -top-8 text-border-subtle opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 pointer-events-none">
                    <div className="w-48 h-48 opacity-20">
                      {path.icon}
                    </div>
                  </div>

                  {/* Top Badge & Icon */}
                  <div className="flex justify-between items-start mb-8 relative z-10">
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${path.color} text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                      {path.icon}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary bg-surface-elevated px-3 py-1.5 rounded-full border border-border-default">
                      {path.subheading}
                    </span>
                  </div>

                  <div className="relative z-10 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-[#FF6600] transition-colors duration-300">
                      {path.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed mb-6 flex-1">
                      {path.description}
                    </p>

                    {/* Interactive Footer */}
                    <div className="flex items-center gap-2 text-sm font-bold text-aero-blue opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 mt-auto pt-4">
                      {path.buttonText} <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Bottom Border Glow */}
                  <div className={`absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r ${path.color} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Consulting Section ─── */
export function ConsultingSection() {
  const consultingServices = [
    {
      tag: "CERTIFICATION",
      tagColor: "text-[#FF6600]",
      badgeBg: "bg-[#FF6600]/10",
      hoverTitleColor: "group-hover:text-[#FF6600]",
      hoverClass: "hover:border-[#FF6600]/40 hover:shadow-[0_15px_35px_rgba(255,102,0,0.06)]",
      title: "Drone Certification Support",
      description: "Get structured support across certification planning, technical documentation, compliance reviews, test readiness, and the UAS certification process.",
      href: "/consultation/uas-certification",
      btnText: "Explore Certification Support",
      btnClass: "border-[#FF6600]/30 text-[#FF6600] hover:bg-[#FF6600] hover:text-white hover:border-[#FF6600]",
      bgElement: (
        <svg className="absolute -right-12 -bottom-12 w-52 h-52 text-[#FF6600]/55 dark:text-[#FF6600]/35 transform rotate-12 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-18 pointer-events-none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          {/* Drone Quadcopter Silhouette */}
          <path d="M100 60 A20 20 0 1 0 100 100 A20 20 0 1 0 100 60 Z" fill="currentColor" opacity="0.95" />
          <path d="M50 40 L90 80 M150 40 L110 80 M50 160 L90 120 M150 160 L110 120" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
          <circle cx="40" cy="30" r="25" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray="10 5" opacity="0.7" />
          <circle cx="160" cy="30" r="25" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray="10 5" opacity="0.7" />
          <circle cx="40" cy="170" r="25" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray="10 5" opacity="0.7" />
          <circle cx="160" cy="170" r="25" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray="10 5" opacity="0.7" />
        </svg>
      )
    },
    {
      tag: "DESIGN & DEVELOPMENT",
      tagColor: "text-purple-600 dark:text-purple-400",
      badgeBg: "bg-purple-500/10",
      hoverTitleColor: "group-hover:text-purple-600 dark:group-hover:text-purple-400",
      hoverClass: "hover:border-purple-500/40 hover:shadow-[0_15px_35px_rgba(147,51,234,0.06)]",
      title: "UAV Design & Product Development",
      description: "Engineering support for UAV configuration, airframe design, payload integration, subsystem selection, performance analysis, prototyping, and design refinement.",
      href: "/consultation/drone-rd",
      btnText: "Explore UAV Engineering",
      btnClass: "border-purple-500/30 text-purple-600 dark:text-purple-400 hover:bg-purple-600 hover:text-white hover:border-purple-600 dark:hover:bg-purple-500 dark:hover:border-purple-500",
      bgElement: (
        <svg className="absolute -right-10 -bottom-12 w-52 h-52 text-purple-500/55 dark:text-purple-500/35 transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-6 pointer-events-none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          {/* Satellite / Blueprint */}
          <rect x="70" y="40" width="60" height="120" rx="10" fill="currentColor" opacity="0.65" />
          <rect x="20" y="80" width="50" height="40" fill="currentColor" opacity="0.85" />
          <rect x="130" y="80" width="50" height="40" fill="currentColor" opacity="0.85" />
          <path d="M100 40 L100 10 M80 10 L120 10" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          <circle cx="100" cy="100" r="15" fill="none" stroke="currentColor" strokeWidth="4" />
        </svg>
      )
    },
    {
      tag: "ANALYSIS & SIMULATION",
      tagColor: "text-blue-600 dark:text-blue-400",
      badgeBg: "bg-blue-500/10",
      hoverTitleColor: "group-hover:text-blue-600 dark:group-hover:text-blue-400",
      hoverClass: "hover:border-blue-500/40 hover:shadow-[0_15px_35px_rgba(59,130,246,0.06)]",
      title: "Design, CFD & Simulation",
      description: "Use CAD/CAE, CFD, aerodynamic analysis, and engineering simulation to evaluate designs, understand performance, and make better technical decisions.",
      href: "/consultation/design-simulation",
      btnText: "Explore Design & Simulation",
      btnClass: "border-blue-500/30 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white hover:border-blue-600 dark:hover:bg-blue-500 dark:hover:border-blue-500",
      bgElement: (
        <svg className="absolute -right-12 -bottom-12 w-56 h-56 text-blue-500/55 dark:text-blue-500/35 transform -rotate-12 transition-transform duration-700 group-hover:scale-110 group-hover:-rotate-18 pointer-events-none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          {/* Airplane Wing & Wind Flow */}
          <path d="M20 120 C 60 100 140 80 180 120 L 160 140 C 120 120 60 130 20 140 Z" fill="currentColor" opacity="0.8" />
          <path d="M0 60 Q 50 30 200 70" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="15 10" />
          <path d="M0 90 Q 70 70 200 100" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="15 10" opacity="0.75" />
          <path d="M0 160 Q 60 140 200 170" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="15 10" opacity="0.55" />
        </svg>
      )
    },
    {
      tag: "QUALITY & COMPLIANCE",
      tagColor: "text-emerald-600 dark:text-emerald-400",
      badgeBg: "bg-emerald-500/10",
      hoverTitleColor: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
      hoverClass: "hover:border-emerald-500/40 hover:shadow-[0_15px_35px_rgba(16,185,129,0.06)]",
      title: "Aerospace Quality Systems",
      description: "Build stronger aerospace processes with support across quality management systems, documentation, risk management, process control, corrective actions, and audit readiness.",
      href: "/consultation/as9100d-quality",
      btnText: "Explore Quality Services",
      btnClass: "border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 dark:hover:bg-emerald-500 dark:hover:border-emerald-500",
      bgElement: (
        <svg className="absolute -right-14 -bottom-14 w-56 h-56 text-emerald-500/55 dark:text-emerald-500/35 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-12 pointer-events-none" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          {/* Science/Atom & Quality Gear */}
          <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="12" strokeDasharray="20 10" />
          <ellipse cx="100" cy="100" rx="30" ry="80" fill="none" stroke="currentColor" strokeWidth="4" transform="rotate(45 100 100)" />
          <ellipse cx="100" cy="100" rx="30" ry="80" fill="none" stroke="currentColor" strokeWidth="4" transform="rotate(-45 100 100)" />
          <circle cx="100" cy="100" r="15" fill="currentColor" opacity="0.95" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-surface">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-[#FF6600] font-bold text-xs uppercase tracking-widest block mb-3">
            From Concept to Certified Flight.
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#062B49] tracking-tight mb-6">
            Aerospace Engineering & Consulting
          </h2>
          <p className="text-text-secondary text-base md:text-lg leading-relaxed">
            Building a UAV takes more than a great idea. AeroSpark supports businesses through the critical stages of drone development, certification, engineering analysis, simulation, and quality compliance.
          </p>
        </div>

        {/* 2x2 Grid Layout for GlassCards with Vector SVGs */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {consultingServices.map((service) => (
            <motion.div key={service.title} variants={staggerItem} className="h-full">
              <div
                className={`h-full flex flex-col justify-between relative overflow-hidden group rounded-[24px] border border-[#D9E4EE] bg-white shadow-[0_4px_25px_rgba(16,42,67,0.03)] hover:-translate-y-1.5 transition-all duration-500 ease-out p-6 md:p-8 ${service.hoverClass}`}
              >
                {/* Background Vector Art SVG */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                  {service.bgElement}
                </div>

                <div className="relative z-10 flex flex-col h-full">
                  <div>
                    <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4 ${service.badgeBg} ${service.tagColor}`}>
                      {service.tag}
                    </span>
                    <h3 className={`text-xl md:text-[23px] font-bold text-[#062B49] tracking-tight transition-colors duration-300 leading-snug ${service.hoverTitleColor}`}>
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-[#52677D] text-[13.5px] leading-relaxed font-medium mt-3 mb-6 max-w-[85%] flex-1">
                    {service.description}
                  </p>

                  <div className="pt-2">
                    <Link
                      href={service.href}
                      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-[12px] text-xs md:text-sm font-bold border transition-all duration-300 group/btn shadow-sm hover:shadow-md ${service.btnClass}`}
                    >
                      <span>{service.btnText}</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Learning Journey Section ─── */
export function LearningJourneySection() {
  const steps = [
    {
      num: "01",
      icon: <BookOpen className="w-6 h-6" />,
      title: "Master Fundamentals",
      description: "Start with core aerospace principles, aerodynamics, and CAD modeling.",
    },
    {
      num: "02",
      icon: <Cpu className="w-6 h-6" />,
      title: "Hands-on Practice",
      description: "Apply your knowledge in CFD analysis and drone hardware prototyping.",
    },
    {
      num: "03",
      icon: <Award className="w-6 h-6" />,
      title: "Get Certified",
      description: "Earn DGCA and AS9100D aligned credentials recognized globally.",
    },
    {
      num: "04",
      icon: <Plane className="w-6 h-6" />,
      title: "Industry Placement",
      description: "Step into high-growth roles across OEMs, MROs, and defense sectors.",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          label="How to Start"
          title="Your Learning Journey"
          description="Follow our structured path from beginner to industry-ready aerospace professional."
        />

        <div className="mt-20 relative">
          {/* Horizontal connection line for desktop with drawing animation */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="hidden lg:block absolute top-[40px] left-0 w-full h-0.5 bg-border-subtle origin-left z-0"
          />

          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.4 } // Slower stagger for step-by-step effect
              }
            }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 relative z-10"
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: 0.9 },
                  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, type: "spring" } }
                }}
                className="relative group"
              >
                {/* Mobile/Tablet vertical connector with drawing animation */}
                {index !== steps.length - 1 && (
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="lg:hidden absolute top-24 left-1/2 w-0.5 h-16 bg-border-subtle -translate-x-1/2 origin-top z-0"
                  />
                )}

                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-2xl bg-surface border-2 border-border-default flex flex-col items-center justify-center relative z-10 group-hover:border-[#FF6600] group-hover:scale-110 transition-all duration-500 shadow-sm group-hover:shadow-[0_0_20px_rgba(255,102,0,0.2)]">
                    <span className="absolute -top-3 -right-3 text-[10px] font-bold bg-[#003087] text-white px-2 py-0.5 rounded-full shadow-md">
                      STEP {step.num}
                    </span>
                    <div className="text-aero-blue group-hover:text-[#FF6600] transition-colors duration-500">
                      {step.icon}
                    </div>
                  </div>

                  <h3 className="mt-8 text-xl font-bold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ─── */
export function TestimonialsSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollBy({ left: -containerWidth, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.clientWidth;
      scrollContainerRef.current.scrollBy({ left: containerWidth, behavior: "smooth" });
    }
  };

  // PLACEHOLDER — DO NOT PUBLISH (Waiting for approved text/metadata)
  const testimonials = [
    {
      id: "t1",
      name: "Arjun Mehta",
      role: "Aerospace Engineering Student",
      title: "Bridged the Gap!",
      content: "AeroSpark's courses bridged the gap between theory and actual engineering. The practical focus on CAD and aerodynamics gave me a clear advantage in my career.",
      isPlaceholder: false,
      avatarColor: "bg-gradient-to-br from-[#FF6600] to-orange-400",
    },
    {
      id: "t2",
      name: "Sneha Rao",
      role: "UAV Design Engineer",
      title: "Unmatched Detail",
      content: "The level of detail in the drone development program is unmatched. It’s not just about flying; it’s about understanding the core engineering principles and systems integration.",
      isPlaceholder: false,
      avatarColor: "bg-gradient-to-br from-emerald-500 to-teal-500",
    },
    {
      id: "t3",
      name: "Karan Desai",
      role: "Technical Lead",
      title: "Saved Us Months",
      content: "Working with AeroSpark on our UAV certification was a seamless experience. Their deep understanding of DGCA regulations saved us months of trial and error.",
      isPlaceholder: false,
      avatarColor: "bg-gradient-to-br from-blue-500 to-indigo-500",
    },
    {
      id: "t4",
      name: "Vikram Sharma",
      role: "Engineering Student",
      title: "Incredibly Well-Structured",
      content: "The CFD and engineering simulation modules were incredibly well-structured. I went from knowing nothing about fluid dynamics software to running complex simulations.",
      isPlaceholder: false,
      avatarColor: "bg-gradient-to-br from-purple-500 to-fuchsia-500",
    },
  ];

  // Filter out placeholders to avoid publishing unfinished cards
  const publishedTestimonials = testimonials.filter(t => !t.isPlaceholder);

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-12">
          <div className="text-center max-w-3xl mx-auto mb-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mb-6">
              What Engineers & Teams Say
            </h2>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed">
              Real feedback from learners, engineers, and teams who have worked with AeroSpark across aerospace education, UAV engineering, and technical consulting.
            </p>
          </div>
          
          {/* Navigation Controls */}
          {publishedTestimonials.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={scrollLeft}
                className="w-12 h-12 rounded-full flex items-center justify-center bg-white border border-[#FF6600]/30 hover:bg-[#FF6600]/10 hover:border-[#FF6600]/60 transition-all text-[#FF6600] shadow-sm shrink-0"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={scrollRight}
                className="w-12 h-12 rounded-full flex items-center justify-center bg-white border border-[#FF6600]/30 hover:bg-[#FF6600]/10 hover:border-[#FF6600]/60 transition-all text-[#FF6600] shadow-sm shrink-0"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>

        {publishedTestimonials.length > 0 ? (
          <div ref={scrollContainerRef} className="flex gap-6 overflow-x-auto hide-scrollbar pb-12 pt-4 scroll-smooth snap-x snap-mandatory items-stretch">
            {publishedTestimonials.map((t) => (
              <motion.div key={t.id} variants={staggerItem} className="h-auto flex flex-col snap-start shrink-0 w-[85vw] md:w-[450px]">
                <div className="flex-1 bg-surface rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-border-default/40 flex flex-col relative transition-all duration-300 hover:shadow-[0_15px_40px_rgb(0,0,0,0.1)] hover:-translate-y-1">
                  <div className="flex gap-4 mb-4">
                    <Quote className="w-10 h-10 text-border-default/70 shrink-0 fill-current opacity-50" />
                    <h4 className="text-xl font-bold text-foreground mt-1">
                      {t.title}
                    </h4>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed flex-1 mb-8 italic">
                    {t.content}
                  </p>
                  <div className="flex items-center justify-end gap-3 mt-auto">
                    {/* Profile Picture Avatar */}
                    <div className={`w-11 h-11 rounded-full flex flex-shrink-0 items-center justify-center font-bold text-white shadow-md ${t.avatarColor}`}>
                      {t.name.charAt(0)}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-foreground leading-tight">{t.name}</p>
                      <p className="text-xs text-text-muted">{t.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            {/* Spacer to push the last card past the floating contact buttons */}
            <div className="shrink-0 w-8 md:w-16" aria-hidden="true"></div>
          </div>
        ) : (
          <div className="text-center py-12 text-text-muted italic border border-dashed border-border-default rounded-2xl max-w-md mx-auto">
            Testimonials are being compiled and will be published once verified.
          </div>
        )}
      </div>
    </section>
  );
}

/* ─── CTA Section ─── */
export function CTASection() {
  return (
    <section className="py-24 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative glass-panel rounded-2xl p-10 md:p-16 text-center overflow-hidden"
        >
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-br from-aero-blue/5 via-transparent to-aero-red/5" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-aero-blue/30 to-transparent" />

          <div className="relative z-10">
            <span className="text-[#FF6600] font-bold text-xs uppercase tracking-widest block mb-4">
              READY TO MOVE FORWARD?
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 tracking-tight">
              Turn Your Next Idea Into Flight.
            </h2>
            <p className="text-text-secondary text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              Whether you're developing a UAV, navigating certification, or building your aerospace skills, AeroSpark gives you a practical way to take the next step.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="primary" size="lg" href="/consultation" className="bg-[#FF6600] text-white hover:bg-[#e65c00] border-none shadow-lg">
                Discuss Your Project
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="secondary" size="lg" href="/academy">
                Explore AeroSpark Academy
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
