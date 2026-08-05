"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SectionHeader, GlassCard, Badge } from "@/components/ui/cards";
import { Button } from "@/components/ui/button";
import { COURSES, STATS, TESTIMONIALS } from "@/lib/constants";
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
} from "lucide-react";
import { ConsultationModal } from "./consultation-modal";

const iconMap: Record<string, React.ReactNode> = {
  Users: <Users className="w-5 h-5" />,
  BookOpen: <BookOpen className="w-5 h-5" />,
  Building: <Building className="w-5 h-5" />,
  Award: <Award className="w-5 h-5" />,
};

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
      scrollContainerRef.current.scrollBy({ left: -370, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 370, behavior: "smooth" });
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
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeader
            label="Academy"
            title="Featured Courses"
            description="Industry-grade aerospace training programs designed by engineering experts and validated by industry leaders."
          />
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
              className="snap-start shrink-0 w-[300px] sm:w-[360px] group cursor-pointer rounded-[28px] border border-white/40 bg-white/40 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_15px_40px_rgb(0,0,0,0.1)] hover:border-aero-blue/40 transition-all duration-500 overflow-hidden flex flex-col relative"
            >
              {/* Image Header */}
              <div className="relative w-full aspect-[2] shrink-0 overflow-hidden bg-slate-100">
                {course.image && (
                  <img
                    src={course.image}
                    alt={course.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                )}
                <div className="absolute top-4 left-4 z-20">
                  <span className="bg-[#B34700] text-white px-3 py-1 rounded text-[11px] font-bold uppercase tracking-wider shadow-sm">
                    {course.tags[0] || course.category}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="flex flex-col flex-1 px-6 pb-6 pt-5 bg-white/40">
                <h3 className="text-[19px] font-bold text-[#001f3f] leading-tight group-hover:text-[#FF6600] transition-colors mb-3 line-clamp-2">
                  {course.title}
                </h3>

                <p className="text-sm text-slate-600 line-clamp-2 mb-5 font-medium leading-relaxed flex-1">
                  {course.description}
                </p>

                <div className="flex items-center gap-3 mb-5">
                  <div className="flex items-center gap-1.5 text-sm font-bold text-slate-900">
                    <Star className="w-4 h-4 text-[#FF6600] fill-[#FF6600]" />
                    {course.rating}
                  </div>
                  <div className="w-px h-4 bg-slate-300" />
                  <div className="flex items-center gap-1.5 text-[12px] font-bold text-slate-900 truncate">
                    <BarChart2 className="w-3.5 h-3.5 text-[#FF6600]" />
                    <span className="truncate">{course.level} • {course.tags[1] || course.tags[0]}</span>
                  </div>
                </div>

                {/* Footer Stats & Price */}
                <div className="flex items-center justify-between mt-auto pt-5 border-t border-slate-200/50">
                  <div className="flex flex-col">
                    <span className="text-[11px] text-slate-400 line-through font-medium leading-none mb-1">₹{Math.floor(course.price * 1.6).toLocaleString()}</span>
                    <span className="text-[22px] font-bold text-[#001f3f] tracking-tight leading-none">₹{course.price.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={(e) => handleApplyClick(e, course.id)}
                    className="relative overflow-hidden bg-[#FF6600] text-white hover:bg-[#e65c00] px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-md flex items-center justify-center min-w-[120px] gap-2"
                  >
                    <span className={animatingCard === course.id ? "opacity-0" : "flex items-center gap-1.5"}>
                      Apply Now <ArrowRight className="w-4 h-4" />
                    </span>
                    {animatingCard === course.id && (
                      <motion.div
                        initial={{ x: -20, y: 0, opacity: 0, scale: 0.5 }}
                        animate={{ x: [0, 20, 60], y: [0, -10, -30], opacity: [1, 1, 0], scale: [1, 1.2, 1.5] }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="absolute inset-0 flex items-center justify-center text-xl"
                      >
                        🚀
                      </motion.div>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-6 text-center"
        >
          <Button variant="outline" href="/academy">
            View All Courses
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Stats Section ─── */
export function StatsSection() {
  const trends = [
    { trend: "+14% this year", isPositive: true },
    { trend: "New modules added", isPositive: true },
    { trend: "Global reach", isPositive: true },
    { trend: "98% pass rate", isPositive: true },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-aero-blue/[0.03] to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[300px] bg-[#FF6600]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            AeroSpark by the Numbers
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto text-sm md:text-base">
            Delivering excellence in aerospace and drone technology education across the globe.
          </p>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {STATS.map((stat, i) => (
            <motion.div key={stat.label} variants={staggerItem} className="h-full">
              <div className="group relative h-full bg-surface-elevated/40 backdrop-blur-md rounded-2xl border border-border-default hover:border-aero-blue/40 transition-all duration-500 overflow-hidden flex flex-col p-6 shadow-sm hover:shadow-[0_8px_30px_rgb(0,48,135,0.08)]">
                
                {/* Glow effect on hover */}
                <div className="absolute -inset-24 bg-gradient-to-tr from-aero-blue/0 via-aero-blue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl rounded-full" />
                
                <div className="relative z-10 flex items-start justify-between mb-8">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-[#003087]/10 to-[#FF6600]/10 text-aero-blue ring-1 ring-border-default group-hover:scale-110 group-hover:text-[#FF6600] transition-all duration-500">
                    {iconMap[stat.icon]}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 px-2 py-1 rounded-md">
                    <Activity className="w-3 h-3" />
                    {trends[i].trend}
                  </div>
                </div>

                <div className="relative z-10 mt-auto">
                  <h4 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-aero-blue group-hover:to-[#FF6600] transition-all duration-500">
                    {stat.value}
                  </h4>
                  <p className="text-xs md:text-sm font-semibold text-text-secondary uppercase tracking-wider">
                    {stat.label}
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
      title: "UAV Design Engineer",
      description: "Master CATIA and structural analysis to design the next generation of autonomous aerial vehicles.",
      badge: "High Demand",
      color: "from-blue-500 to-[#003087]"
    },
    {
      icon: <Wind className="w-8 h-8" />,
      title: "Aerodynamics Specialist",
      description: "Specialize in fluid dynamics and CFD analysis to optimize flight performance and efficiency.",
      badge: "Core Discipline",
      color: "from-[#FF6600] to-orange-600"
    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Quality Systems Manager",
      description: "Ensure aerospace safety and AS9100D compliance in modern manufacturing environments.",
      badge: "Leadership",
      color: "from-emerald-400 to-emerald-600"
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-surface-elevated/30">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-aero-blue/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeader
          label="Career Pathways"
          title="Your Future in Aerospace"
          description="Discover the specialized, high-growth roles you can master through our industry-aligned curriculum."
        />

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
                    {path.badge}
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
                  <div className="flex items-center gap-2 text-sm font-bold text-aero-blue opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    Explore This Path <ArrowRight className="w-4 h-4" />
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
      title: "UAS Type Certification",
      description: "End-to-end DGCA & FAA type certification support for UAS manufacturers — from initial documentation to final flight testing.",
      href: "/consultation/uas-certification",
      badge: "Open for Consultation",
      badgeColor: "text-[#FF6600]",
      icon: <FileCheck className="w-6 h-6 text-[#FF6600]" />,
      bgElement: (
        <svg className="absolute -right-8 -bottom-8 w-64 h-64 text-[#FF6600]/20 transform rotate-12" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          {/* Drone Quadcopter Silhouette */}
          <path d="M100 60 A20 20 0 1 0 100 100 A20 20 0 1 0 100 60 Z" fill="currentColor" opacity="0.8" />
          <path d="M50 40 L90 80 M150 40 L110 80 M50 160 L90 120 M150 160 L110 120" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
          <circle cx="40" cy="30" r="25" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray="10 5" opacity="0.5" />
          <circle cx="160" cy="30" r="25" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray="10 5" opacity="0.5" />
          <circle cx="40" cy="170" r="25" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray="10 5" opacity="0.5" />
          <circle cx="160" cy="170" r="25" fill="none" stroke="currentColor" strokeWidth="6" strokeDasharray="10 5" opacity="0.5" />
        </svg>
      )
    },
    {
      title: "AS9100D Quality Systems",
      description: "Implement and maintain robust aerospace quality management systems required to participate in the global supply chain.",
      href: "/consultation/as9100d-quality",
      badge: "Quality Systems",
      badgeColor: "text-emerald-500",
      icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
      bgElement: (
        <svg className="absolute -right-12 -bottom-12 w-72 h-72 text-emerald-500/10" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          {/* Science/Atom & Quality Gear */}
          <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="12" strokeDasharray="20 10" />
          <ellipse cx="100" cy="100" rx="30" ry="80" fill="none" stroke="currentColor" strokeWidth="4" transform="rotate(45 100 100)" />
          <ellipse cx="100" cy="100" rx="30" ry="80" fill="none" stroke="currentColor" strokeWidth="4" transform="rotate(-45 100 100)" />
          <circle cx="100" cy="100" r="15" fill="currentColor" opacity="0.8" />
        </svg>
      )
    },
    {
      title: "UAV Prototyping & Design",
      description: "End-to-end design and rapid prototyping for specialized unmanned aerial vehicles, tailored to your exact payload and range.",
      href: "/consultation/drone-rd",
      badge: "R&D Priority",
      badgeColor: "text-purple-500",
      icon: <Hexagon className="w-6 h-6 text-purple-500" />,
      bgElement: (
        <svg className="absolute -right-4 -bottom-10 w-64 h-64 text-purple-500/10" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          {/* Satellite / Blueprint */}
          <rect x="70" y="40" width="60" height="120" rx="10" fill="currentColor" opacity="0.4" />
          <rect x="20" y="80" width="50" height="40" fill="currentColor" opacity="0.7" />
          <rect x="130" y="80" width="50" height="40" fill="currentColor" opacity="0.7" />
          <path d="M100 40 L100 10 M80 10 L120 10" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          <circle cx="100" cy="100" r="15" fill="none" stroke="currentColor" strokeWidth="4" />
        </svg>
      )
    },
    {
      title: "Aerodynamic CFD Analysis",
      description: "Advanced computational fluid dynamics (CFD) to optimize airframe performance, reduce drag, and improve battery efficiency.",
      href: "/consultation/design-simulation",
      badge: "Simulation & Design",
      badgeColor: "text-blue-500",
      icon: <Wind className="w-6 h-6 text-blue-500" />,
      bgElement: (
        <svg className="absolute -right-10 -bottom-10 w-72 h-72 text-blue-500/10 transform -rotate-12" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          {/* Airplane Wing & Wind Flow */}
          <path d="M20 120 C 60 100 140 80 180 120 L 160 140 C 120 120 60 130 20 140 Z" fill="currentColor" opacity="0.6" />
          <path d="M0 60 Q 50 30 200 70" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="15 10" />
          <path d="M0 90 Q 70 70 200 100" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="15 10" opacity="0.5" />
          <path d="M0 160 Q 60 140 200 170" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="15 10" opacity="0.3" />
        </svg>
      )
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-surface">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <SectionHeader
            label="Expert Advisory"
            title="Aerospace Consulting"
            description="Leverage our industry expertise to streamline your manufacturing processes, achieve global certifications, and innovate your UAV designs."
          />
        </div>

        {/* 2x2 Grid Layout for large spacious cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {consultingServices.map((service) => (
            <Link href={service.href} key={service.title} className="relative group bg-surface border border-border-default rounded-[32px] p-10 hover:border-aero-blue/40 hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full z-10 block cursor-pointer">
              
              {/* Background 3D Elements (Colored) */}
              <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[32px]">
                {service.bgElement}
              </div>

              <div className="relative z-10 flex flex-col flex-1">
                {/* Top Badge */}
                <div className="flex items-center gap-2 mb-8">
                  <div className="flex items-center gap-2 bg-surface-elevated border border-border-subtle rounded-full px-3 py-1.5 shadow-sm">
                    <div className={`w-2 h-2 rounded-full ${service.badgeColor} bg-current`} />
                    <span className="text-xs font-bold text-foreground">
                      {service.badge}
                    </span>
                  </div>
                </div>

                <h3 className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 max-w-[80%]">
                  {service.title}
                </h3>
                
                <p className="text-lg text-text-secondary leading-relaxed mb-12 max-w-[85%] flex-1">
                  {service.description}
                </p>

                <div className="self-start text-foreground font-bold group-hover:gap-3 transition-all mt-auto text-base flex items-center group-hover:text-aero-blue">
                  Explore Services <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
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
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Testimonials"
          title="Trusted by Engineers"
          description="Hear from aerospace professionals who transformed their careers through AeroSpark."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {TESTIMONIALS.map((t) => (
            <motion.div key={t.name} variants={staggerItem}>
              <GlassCard className="h-full flex flex-col" padding="lg">
                <Quote className="w-8 h-8 text-aero-blue/20 mb-4" />
                <p className="text-sm text-text-secondary leading-relaxed flex-1 mb-6">
                  &ldquo;{t.content}&rdquo;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-border-subtle">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-aero-blue/20 to-aero-red/20 flex items-center justify-center text-foreground text-sm font-semibold">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{t.name}</p>
                    <p className="text-xs text-text-muted">{t.role}</p>
                  </div>
                  <div className="ml-auto flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-3 h-3 text-amber-400 fill-amber-400"
                      />
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── CTA Section ─── */
export function CTASection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            <span className="hud-label text-aero-blue mb-4 block">
              Ready to Launch?
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
              Elevate Your Aerospace Career
            </h2>
            <p className="text-text-secondary text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              Join thousands of aerospace professionals already learning on
              AeroSpark. Start with a free consultation.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="primary" size="lg" href="/academy">
                Start Learning
                <ChevronRight className="w-4 h-4" />
              </Button>
              <Button variant="secondary" size="lg" onClick={() => setIsModalOpen(true)}>
                Book Consultation
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
      <ConsultationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
