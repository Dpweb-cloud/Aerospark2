"use client";

import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { COURSES } from "@/lib/constants";
import {
  Clock,
  BookOpen,
  Users,
  Star,
  Target,
  Zap,
  Award,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState, use } from "react";

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function CourseDetailsPage({ params }: { params: Promise<{ courseId: string }> }) {
  const unwrappedParams = use(params);
  const [mounted, setMounted] = useState(false);
  const course = COURSES.find((c) => c.id === unwrappedParams.courseId);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (mounted && !course) {
    notFound();
  }

  if (!course) {
    return null; // or a loading spinner
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20 bg-background overflow-hidden relative">
        {/* Background Grid & Glows */}
        <div className="absolute inset-0 radar-grid opacity-30 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-aero-blue/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-aero-red/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link 
              href="/academy" 
              className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-aero-blue transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Academy
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Left Column (Hero & Content) */}
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="lg:col-span-2 space-y-12"
            >
              {/* Header section */}
              <div className="space-y-6">
                <motion.div variants={staggerItem} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-aero-blue/10 border border-aero-blue/20 text-aero-blue text-xs font-mono tracking-wider uppercase">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {course.category}
                </motion.div>
                
                <motion.h1 variants={staggerItem} className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-[1.1]">
                  {course.title}
                </motion.h1>
                
                <motion.p variants={staggerItem} className="text-lg md:text-xl text-text-secondary leading-relaxed max-w-3xl">
                  {course.description}
                </motion.p>
                
                <motion.div variants={staggerItem} className="flex flex-wrap items-center gap-6 pt-4 border-t border-border-subtle">
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <div className="p-2 rounded-lg bg-surface-elevated">
                      <Clock className="w-4 h-4 text-aero-blue" />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted uppercase tracking-wider">Duration</p>
                      <p className="font-medium text-foreground">{course.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <div className="p-2 rounded-lg bg-surface-elevated">
                      <BookOpen className="w-4 h-4 text-aero-blue" />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted uppercase tracking-wider">Lessons</p>
                      <p className="font-medium text-foreground">{course.lessons}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <div className="p-2 rounded-lg bg-surface-elevated">
                      <Users className="w-4 h-4 text-aero-blue" />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted uppercase tracking-wider">Enrolled</p>
                      <p className="font-medium text-foreground">{course.students.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-text-secondary">
                    <div className="p-2 rounded-lg bg-surface-elevated">
                      <Star className="w-4 h-4 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted uppercase tracking-wider">Rating</p>
                      <p className="font-medium text-foreground">{course.rating} / 5.0</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Topics */}
              <motion.div variants={staggerItem} className="relative glass-panel rounded-2xl p-8 border-l-4 border-l-aero-blue">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                  <BookOpen className="w-32 h-32" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-3 relative z-10">
                  <span className="w-8 h-8 rounded-full bg-aero-blue/10 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-aero-blue" />
                  </span>
                  Key Topics Covered
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
                  {(course as any).topics?.map((topic: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 bg-surface/50 p-4 rounded-xl border border-border-subtle hover:border-aero-blue/30 transition-colors">
                      <div className="w-6 h-6 rounded-full bg-aero-blue/10 border border-aero-blue/20 flex items-center justify-center text-[11px] text-aero-blue flex-shrink-0 font-mono mt-0.5">
                        {i + 1}
                      </div>
                      <span className="text-sm text-text-secondary leading-relaxed">{topic}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Target & Outcome */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={staggerItem} className="glass-panel rounded-2xl p-8">
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-3">
                    <Target className="w-5 h-5 text-aero-blue" />
                    Who Is This For
                  </h3>
                  <p className="text-text-secondary leading-relaxed text-sm">
                    {(course as any).eligibility}
                  </p>
                </motion.div>
                
                <motion.div variants={staggerItem} className="glass-panel rounded-2xl p-8 bg-gradient-to-br from-aero-blue/5 to-transparent border-aero-blue/20">
                  <h3 className="text-lg font-bold text-aero-blue mb-4 flex items-center gap-3">
                    <Zap className="w-5 h-5" />
                    Course Outcome
                  </h3>
                  <p className="text-text-secondary leading-relaxed text-sm">
                    {(course as any).outcome}
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column (Floating Sidebar) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-32 glass-panel rounded-3xl p-8 border border-border-default shadow-2xl">
                <div className="mb-6 relative rounded-xl overflow-hidden aspect-video bg-surface-elevated">
                  {/* Decorative placeholder for course image */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-aero-blue/20 via-surface-elevated to-surface-elevated" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-20">
                    <Zap className="w-16 h-16 text-aero-blue" />
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-text-muted uppercase tracking-wider mb-2 font-mono">Launch Price</p>
                    <div className="flex items-end gap-3">
                      <span className="text-4xl font-bold text-foreground tracking-tight">₹{course.price.toLocaleString()}</span>
                    </div>
                  </div>

                  <Button variant="primary" size="lg" className="w-full text-base group h-14">
                    Enroll in Program
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  <div className="pt-6 border-t border-border-subtle space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-aero-blue flex-shrink-0" />
                      <p className="text-sm text-text-secondary">Full lifetime access to course materials & updates</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-aero-blue flex-shrink-0" />
                      <p className="text-sm text-text-secondary">Access to live Q&A sessions and mentorship</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <Award className="w-5 h-5 text-amber-400 flex-shrink-0" />
                      <p className="text-sm text-text-secondary">Industry-recognized completion certificate</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
