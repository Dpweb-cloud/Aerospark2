"use client";

import { motion } from "framer-motion";
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
} from "lucide-react";

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

  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {featured.map((course) => (
            <motion.div key={course.id} variants={staggerItem}>
              <GlassCard
                className="group cursor-pointer h-full"
                glow="blue"
                padding="lg"
              >
                <div className="flex flex-col sm:flex-row gap-5 h-full">
                  {/* Course Image */}
                  <div className="relative w-full sm:w-48 h-36 sm:h-auto rounded-lg bg-gradient-to-br from-surface-elevated to-surface flex-shrink-0 overflow-hidden">
                    <img 
                      src="/engine-blueprint.jpg" 
                      alt="Engine Blueprint"
                      className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen group-hover:scale-105 transition-transform duration-500"
                    />

                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col min-w-0">
                    <p className="text-xs text-aero-blue font-medium uppercase tracking-wider mb-1">
                      {course.category}
                    </p>
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-aero-blue transition-colors">
                      {course.title}
                    </h3>
                    <p className="text-sm text-text-secondary line-clamp-2 mb-4 flex-1">
                      {course.description}
                    </p>

                    {/* Meta Row */}
                    <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {course.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen className="w-3 h-3" />
                        {course.lessons} lessons
                      </span>

                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-border-subtle mt-auto">
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-sm font-medium text-foreground">
                          {course.rating}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-aero-blue">
                          ₹{course.price.toLocaleString()}
                        </span>
                        <Button variant="primary" size="sm">
                          Enroll
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-aero-blue/[0.02] to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
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
              <Button variant="secondary" size="lg" href="/consultation">
                Book Consultation
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
