"use client";

import { useState } from "react";
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
  const featured = COURSES.slice(0, 4);
  const router = useRouter();
  const [animatingCard, setAnimatingCard] = useState<string | null>(null);

  const handleApplyClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setAnimatingCard(id);
    setTimeout(() => {
      router.push(`/academy/course/${id}`);
    }, 600);
  };

  return (
    <section className="py-24 relative">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-12">
        <SectionHeader
          label="Academy"
          title="Featured Courses"
          description="Industry-grade aerospace training programs designed by engineering experts and validated by industry leaders."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-8 xl:gap-12"
        >
          {featured.map((course) => (
            <motion.div key={course.id} variants={staggerItem}>
              <div
                onClick={() => router.push(`/academy/course/${course.id}`)}
                className={`group cursor-pointer rounded-[32px] border-2 ${course.id === 'catia-design' ? 'border-blue-500 shadow-[0_0_15px_-3px_rgba(37,99,235,0.2)]' : 'border-slate-300'} hover:border-[#FF6600]/60 hover:shadow-2xl hover:shadow-[#FF6600]/30 hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col relative h-full bg-white`}
              >
                {/* Image Header / Banner */}
                <div className="relative w-full aspect-[2.1] shrink-0 bg-slate-100 overflow-hidden">
                  {/* Main Course Image */}
                  {course.image && (
                    <img
                      src={course.image}
                      alt={course.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  )}
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-[#B34700] text-white px-3 py-1 rounded-sm text-[11px] font-bold uppercase tracking-wider shadow-sm">
                      {course.tags[0] || course.category}
                    </span>
                  </div>
                </div>

                {/* Main Body */}
                <div className="flex flex-col flex-1 px-5 pb-5 pt-2 bg-white">
                  <h3 className="text-[18px] font-bold text-[#001f3f] leading-tight group-hover:text-blue-900 transition-colors mb-2 line-clamp-1">
                    {course.title}
                  </h3>

                  <div className="w-10 h-1 bg-[#FF6600] mb-3" />

                  <p className="text-[13px] text-slate-600 line-clamp-2 mb-4 font-medium leading-relaxed flex-1">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-1.5 text-lg font-bold text-slate-900">
                      <Star className="w-4 h-4 text-[#FF6600] fill-[#FF6600]" />
                      {course.rating}
                    </div>
                    <div className="w-px h-4 bg-slate-200" />
                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900">
                      <BarChart2 className="w-3.5 h-3.5 text-[#FF6600]" />
                      <span className="truncate">{course.level} • {course.tags[1] || course.tags[0]}</span>
                    </div>
                  </div>

                  <div className="w-full h-px bg-slate-100 mb-3" />

                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5 mb-0.5 text-slate-500">
                        <Clock className="w-3.5 h-3.5 stroke-[2]" />
                        <span className="text-[11px] font-medium">Duration</span>
                      </div>
                      <span className="text-xs font-semibold text-slate-900">{course.duration}</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1.5 mb-0.5 text-slate-500">
                        <BookOpen className="w-3.5 h-3.5 stroke-[2]" />
                        <span className="text-[11px] font-medium">Content</span>
                      </div>
                      <span className="text-xs font-semibold text-slate-900">{course.lessons} lessons</span>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="relative z-10 px-5 py-3 flex items-center justify-between bg-white shrink-0 border-t border-slate-100 mt-auto">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 line-through font-medium leading-none mb-0.5">₹{Math.floor(course.price * 1.6).toLocaleString()}</span>
                    <span className="text-[22px] font-bold text-[#001f3f] tracking-tight leading-none">₹{course.price.toLocaleString()}</span>
                  </div>
                  <button
                    onClick={(e) => handleApplyClick(e, course.id)}
                    className="relative overflow-hidden bg-[#FF6600] text-white hover:bg-[#e65c00] px-4 py-2 rounded-md text-xs font-bold transition-all shadow-md flex items-center justify-center min-w-[110px] gap-2"
                  >
                    <span className={animatingCard === course.id ? "opacity-0" : "flex items-center gap-1.5"}>
                      Apply Now <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                    {animatingCard === course.id && (
                      <motion.div
                        initial={{ x: -20, y: 0, opacity: 0, scale: 0.5 }}
                        animate={{ x: [0, 20, 60], y: [0, -10, -30], opacity: [1, 1, 0], scale: [1, 1.2, 1.5] }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="absolute inset-0 flex items-center justify-center text-xl"
                      >
                        {course.id.includes("drone") || course.id.includes("aerospace") ? "✈️" : "📙"}
                      </motion.div>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-10 text-center"
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
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-aero-blue/[0.02] to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {STATS.map((stat) => (
            <motion.div key={stat.label} variants={staggerItem}>
              <GlassCard className="text-center" glow="blue">
                <div className="inline-flex p-3 rounded-lg bg-aero-blue/5 text-aero-blue mb-4">
                  {iconMap[stat.icon]}
                </div>
                <p className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                  {stat.value}
                </p>
                <p className="text-xs text-text-secondary uppercase tracking-wider">
                  {stat.label}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Certifications Section ─── */
export function CertificationsSection() {
  const certs = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "DGCA Certified",
      description: "Approved training programs for drone operations under DGCA framework.",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "AS9100D Aligned",
      description: "Quality management training aligned with international aerospace standards.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Industry Recognized",
      description: "Certificates valued across aerospace OEMs, MROs, and defense organizations.",
    },
  ];

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Certifications"
          title="Industry-Grade Credentials"
          description="Earn certifications recognized by aerospace industry leaders and regulatory bodies."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {certs.map((cert) => (
            <motion.div key={cert.title} variants={staggerItem}>
              <GlassCard className="text-center" glow="blue" padding="lg">
                <div className="inline-flex p-4 rounded-xl bg-aero-blue/5 text-aero-blue mb-5">
                  {cert.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {cert.title}
                </h3>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {cert.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
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
