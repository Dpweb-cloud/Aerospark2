"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { GlassCard, SectionHeader, Badge } from "@/components/ui/cards";
import Link from "next/link";
import { COURSES, COURSE_BUNDLES, LEARNER_BENEFITS } from "@/lib/constants";
import { staggerContainer, staggerItem } from "@/lib/motion";
import {
  Search,
  Filter,
  Clock,
  BookOpen,
  Star,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  GraduationCap,
  Users,
  CheckCircle2,
  Package,
  Award,
  Zap,
  Target,
} from "lucide-react";

const categories = ["All", ...Array.from(new Set(COURSES.map((c) => c.category)))];
const levels = ["All", "Beginner", "Intermediate", "Advanced"];

const bundleColors: Record<string, string> = {
  blue: "from-blue-500/10 to-blue-600/5 border-blue-500/20",
  green: "from-green-500/10 to-green-600/5 border-green-500/20",
  purple: "from-purple-500/10 to-purple-600/5 border-purple-500/20",
  orange: "from-orange-500/10 to-orange-600/5 border-orange-500/20",
  red: "from-aero-red/10 to-aero-red/5 border-aero-red/20",
};

const bundleAccents: Record<string, string> = {
  blue: "text-blue-400",
  green: "text-green-400",
  purple: "text-purple-400",
  orange: "text-orange-400",
  red: "text-aero-red",
};

export default function AcademyPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [activeTab, setActiveTab] = useState<"courses" | "bundles">("courses");

  const filteredCourses = useMemo(() => {
    return COURSES.filter((course) => {
      const matchSearch =
        !searchQuery ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.tags.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchCategory =
        selectedCategory === "All" || course.category === selectedCategory;
      const matchLevel =
        selectedLevel === "All" || course.level === selectedLevel;
      return matchSearch && matchCategory && matchLevel;
    });
  }, [searchQuery, selectedCategory, selectedLevel]);


  const levelColors = {
    Beginner: "green",
    Intermediate: "blue",
    Advanced: "red",
  } as const;

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Header */}
        <section className="py-16 relative">
          <div className="absolute inset-0 radar-grid opacity-50" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <SectionHeader
              label="Academy"
              title="Aerospace Training Programs"
              description="Industry-grade courses designed for UAS (Drones), aerospace, CAD design, simulation, quality, and regulatory learning. Live classes, mentorship, and certification included."
            />
          </div>
        </section>

        {/* Learner Benefits Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="glass-panel rounded-2xl p-6 bg-gradient-to-r from-aero-blue/5 to-transparent border border-aero-blue/10">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-5">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-aero-blue" />
                <h2 className="text-base font-semibold text-foreground">What Every Learner Receives</h2>
              </div>
              <div className="hidden md:block h-px flex-1 bg-border-subtle" />
              <span className="text-xs text-text-muted bg-aero-blue/8 border border-aero-blue/15 px-3 py-1 rounded-full">
                Included in every course
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {LEARNER_BENEFITS.map((benefit, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-aero-blue flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-text-secondary leading-relaxed">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <div className="flex gap-1 p-1 bg-surface-elevated rounded-xl w-fit border border-border-subtle">
            <button
              onClick={() => setActiveTab("courses")}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "courses"
                  ? "bg-aero-blue/15 text-aero-blue border border-aero-blue/20"
                  : "text-text-secondary hover:text-foreground"
              }`}
            >
              <span className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Individual Courses ({COURSES.length})
              </span>
            </button>
            <button
              onClick={() => setActiveTab("bundles")}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === "bundles"
                  ? "bg-aero-blue/15 text-aero-blue border border-aero-blue/20"
                  : "text-text-secondary hover:text-foreground"
              }`}
            >
              <span className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                Bundle Offers ({COURSE_BUNDLES.length})
              </span>
            </button>
          </div>
        </section>

        {/* COURSES TAB */}
        {activeTab === "courses" && (
          <>
            {/* Filters */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
              <div className="glass-panel rounded-xl p-4 md:p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Search */}
                  <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                    <input
                      type="text"
                      placeholder="Search courses, topics, or tags..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-surface-elevated rounded-lg text-sm text-foreground border border-border-subtle focus:border-aero-blue/30 focus:outline-none focus:ring-1 focus:ring-aero-blue/20 transition-all placeholder:text-text-muted"
                    />
                  </div>

                  {/* Category Filter */}
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-text-muted hidden md:block" />
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                            selectedCategory === cat
                              ? "bg-aero-blue/15 text-aero-blue border border-aero-blue/25"
                              : "bg-surface-elevated text-text-secondary border border-border-subtle hover:text-foreground hover:border-border-default"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Level Filter */}
                <div className="flex gap-2 mt-3 pt-3 border-t border-border-subtle">
                  <span className="text-xs text-text-muted mr-2 self-center">
                    Level:
                  </span>
                  {levels.map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelectedLevel(level)}
                      className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                        selectedLevel === level
                          ? "bg-aero-blue/15 text-aero-blue"
                          : "text-text-muted hover:text-text-secondary"
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* Course Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between mb-6">
                <p className="text-sm text-text-secondary">
                  Showing{" "}
                  <span className="text-foreground font-medium">
                    {filteredCourses.length}
                  </span>{" "}
                  courses
                </p>
                <p className="text-xs text-text-muted">
                  Launch fees — live classes with mentorship included
                </p>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedCategory}-${selectedLevel}-${searchQuery}`}
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                  {filteredCourses.map((course) => (
                    <motion.div key={course.id} variants={staggerItem} layout>
                      <GlassCard
                        className="group cursor-pointer"
                        glow="blue"
                        padding="lg"
                      >
                        <div className="flex flex-col sm:flex-row gap-5">
                          {/* Course Icon */}
                          <div className="relative w-full sm:w-44 h-32 sm:h-auto rounded-lg bg-gradient-to-br from-surface-elevated to-surface flex-shrink-0 overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <GraduationCap className="w-10 h-10 text-aero-blue/15" />
                            </div>


                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-aero-blue font-medium uppercase tracking-wider mb-1">
                              {course.category}
                            </p>
                            <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-aero-blue transition-colors">
                              {course.title}
                            </h3>
                            <p className="text-sm text-text-secondary line-clamp-2 mb-3">
                              {course.description}
                            </p>

                            {/* Meta Row */}
                            <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted mb-3">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {course.duration}
                              </span>
                              <span className="flex items-center gap-1">
                                <BookOpen className="w-3 h-3" />
                                {course.lessons} lessons
                              </span>

                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1.5 mb-4">
                              {course.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-0.5 text-[10px] rounded bg-surface-elevated text-text-muted border border-border-subtle"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-3 border-t border-border-subtle">
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

                        {/* Expandable Syllabus — Real Topics + Eligibility + Outcome */}
                        <div className="mt-4 pt-3 border-t border-border-subtle">
                          <Link
                            href={`/academy/course/${course.id}`}
                            className="flex items-center gap-2 text-xs text-text-secondary hover:text-aero-blue transition-colors group/btn"
                          >
                            View Syllabus & Details
                            <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                        </div>
                      </GlassCard>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {filteredCourses.length === 0 && (
                <div className="text-center py-20">
                  <GraduationCap className="w-12 h-12 text-text-muted mx-auto mb-4" />
                  <p className="text-text-secondary">
                    No courses match your filters.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("All");
                      setSelectedLevel("All");
                    }}
                    className="text-sm text-aero-blue mt-2 hover:underline"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </section>
          </>
        )}

        {/* BUNDLES TAB */}
        {activeTab === "bundles" && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8">
              <p className="text-sm text-text-secondary">
                Save more by bundling related courses. All bundle benefits include live classes, mentorship, and certification.
              </p>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              {COURSE_BUNDLES.map((bundle) => {
                const isComplete = bundle.id === "complete-program";
                return (
                  <motion.div
                    key={bundle.id}
                    variants={staggerItem}
                    className={isComplete ? "md:col-span-2 xl:col-span-1" : ""}
                  >
                    <div
                      className={`rounded-2xl border bg-gradient-to-br p-6 h-full flex flex-col transition-all duration-300 hover:scale-[1.02] ${
                        bundleColors[bundle.color] || bundleColors["blue"]
                      } ${isComplete ? "ring-1 ring-aero-red/30" : ""}`}
                    >
                      {isComplete && (
                        <div className="inline-flex items-center gap-1.5 bg-aero-red/10 border border-aero-red/20 text-aero-red text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full mb-4 self-start">
                          <Zap className="w-3 h-3" />
                          BEST VALUE
                        </div>
                      )}

                      <h3 className={`text-lg font-bold mb-1 ${bundleAccents[bundle.color]}`}>
                        {bundle.title}
                      </h3>
                      <p className="text-sm text-text-secondary mb-4 leading-relaxed">
                        {bundle.description}
                      </p>

                      {/* Included courses */}
                      <div className="flex-1 mb-5 space-y-2">
                        {bundle.includes.map((item, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-text-secondary">
                            <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 ${bundleAccents[bundle.color]}`} />
                            {item}
                          </div>
                        ))}
                      </div>

                      {/* Pricing */}
                      <div className="pt-4 border-t border-white/5">
                        <div className="flex items-end justify-between mb-3">
                          <div>
                            <p className="text-2xl font-bold text-foreground">
                              ₹{bundle.price.toLocaleString()}
                            </p>
                            <p className={`text-xs font-medium mt-0.5 ${bundleAccents[bundle.color]}`}>
                              Save ₹{bundle.savings.toLocaleString()} vs individual
                            </p>
                          </div>

                        </div>
                        <Button variant="primary" size="md" className="w-full">
                          Enroll in Bundle
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Bottom note */}
            <div className="mt-10 text-center glass-panel rounded-xl p-6">
              <Award className="w-8 h-8 text-amber-400 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-foreground mb-2">Certification Included</h3>
              <p className="text-sm text-text-secondary max-w-lg mx-auto">
                Learners will be eligible to receive a course completion certificate based on assessment performance and successful completion of course requirements.
              </p>
            </div>
          </section>
        )}
      </main>


      <Footer />
    </>
  );
}
