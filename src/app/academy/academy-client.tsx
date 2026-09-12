"use client";

import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/cards";
import { useRouter } from "next/navigation";
import { COURSES, COURSE_BUNDLES } from "@/lib/constants";
import { staggerContainer, staggerItem } from "@/lib/motion";
import {
  Search,
  Filter,
  Clock,
  BookOpen,
  Star,
  ArrowRight,
  GraduationCap,
  CheckCircle2,
  Package,
  Award,
  Zap,
  BarChart2,
  Compass,
  Wrench,
  Cpu,
} from "lucide-react";

const categories = ["All", ...Array.from(new Set(COURSES.map((c) => c.category)))];
const levels = ["All", "Beginner", "Intermediate", "Advanced"];

const bundleColors: Record<string, string> = {
  blue: "border-[#062B49]/10 bg-white",
  green: "border-[#062B49]/10 bg-white",
  purple: "border-[#062B49]/10 bg-white",
  orange: "border-[#FF6600]/10 bg-white",
  red: "border-aero-red/20 bg-white",
};

const bundleAccents: Record<string, string> = {
  blue: "text-[#062B49]",
  green: "text-[#062B49]",
  purple: "text-[#062B49]",
  orange: "text-[#FF6600]",
  red: "text-aero-red",
};

export default function AcademyClient() {
  const router = useRouter();
  const catalogRef = useRef<HTMLDivElement>(null);
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [activeTab, setActiveTab] = useState<"courses" | "bundles">("courses");

  const scrollToCatalog = () => {
    catalogRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleApplyClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/academy/course/${id}`);
  };

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

  return (
    <>
      <Navbar />
      <main className="pb-16">
        {/* Header */}
        <section className="pt-28 pb-24 relative overflow-hidden">
          {/* Ambient orbs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-aero-blue/10 blur-[120px] rounded-[100%] pointer-events-none z-0" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-aero-red/5 blur-[120px] rounded-full pointer-events-none z-0" />

          <div className="absolute inset-0 radar-grid opacity-30 z-0" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
            <span className="text-[#FF6600] font-bold text-xs uppercase tracking-widest block mb-4">
              AEROSPARK ACADEMY
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground/90 to-foreground/50 leading-tight">
              Learn the Engineering Behind Flight.
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto mb-4 leading-relaxed">
              Build practical skills in aerospace engineering, UAV technology, aerodynamics, CAD/CAE, CFD, simulation, quality, and drone regulations through focused technical courses designed around real engineering applications.
            </p>
            <span className="text-[#FF6600] font-medium text-sm tracking-wider uppercase">
              Learn the concepts. Understand the tools. Apply the engineering.
            </span>
          </div>
        </section>



        {/* Tab Navigation & Course Catalogue */}
        <section ref={catalogRef} id="catalogue-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 scroll-mt-28">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-extrabold text-foreground tracking-tight mb-3">
                Explore Aerospace & UAV Courses
              </h2>
              <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                Choose from focused programs covering drone regulations, aerospace fundamentals, aerodynamics, UAV technology, engineering software, simulation, and aerospace quality systems.
              </p>
            </div>
            
            <div className="flex gap-1 p-1 bg-surface-elevated rounded-xl w-fit border border-border-subtle shrink-0">
              <button
                onClick={() => setActiveTab("courses")}
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === "courses"
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
                className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === "bundles"
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
          </div>
        </section>

        {/* COURSES TAB */}
        {activeTab === "courses" && (
          <>
            {/* Filters */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-20">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-aero-blue/10 via-surface to-aero-red/10 rounded-[2rem] blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="relative bg-surface/60 backdrop-blur-2xl border border-border-subtle rounded-[2rem] p-4 md:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col gap-5">
                  <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                    {/* Search */}
                    <div className="relative w-full md:max-w-sm group/search">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-text-muted group-focus-within/search:text-aero-blue transition-colors" />
                      </div>
                      <input
                        type="text"
                        placeholder="Search courses, topics, or tags..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="block w-full pl-11 pr-4 py-3 bg-surface/50 border border-border-subtle rounded-full text-sm text-foreground focus:ring-2 focus:ring-aero-blue/30 focus:border-aero-blue/50 transition-all placeholder:text-text-muted shadow-sm hover:bg-surface-hover/80 focus:bg-surface-elevated"
                      />
                    </div>

                    {/* Level Filter */}
                    <div className="flex items-center p-1.5 bg-surface/50 rounded-full border border-border-subtle self-start md:self-auto w-full md:w-auto overflow-x-auto hide-scrollbar shadow-sm">
                      {levels.map((level) => (
                        <button
                          key={level}
                          onClick={() => setSelectedLevel(level)}
                          className={`relative px-5 py-2 rounded-full text-xs font-bold tracking-wide whitespace-nowrap transition-colors duration-300 ${selectedLevel === level
                            ? "text-white"
                            : "text-text-secondary hover:text-foreground"
                            }`}
                        >
                          {selectedLevel === level && (
                            <motion.div
                              layoutId="level-pill"
                              className="absolute inset-0 bg-gradient-to-r from-aero-blue to-aero-red rounded-full -z-10 shadow-md"
                              transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                          )}
                          <span className="relative z-10">{level}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="flex items-center gap-3 overflow-x-auto pb-1 hide-scrollbar scroll-smooth mask-fade-edges">
                    <div className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-aero-blue/10 border border-aero-blue/20 flex-shrink-0 ml-1">
                      <Filter className="w-3.5 h-3.5 text-aero-blue" />
                    </div>
                    <div className="flex items-center gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setSelectedCategory(cat)}
                          className={`relative px-5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-300 border ${selectedCategory === cat
                            ? "bg-aero-blue/10 text-aero-blue border-aero-blue/30 shadow-sm"
                            : "text-text-secondary border-border-subtle bg-surface/50 hover:bg-surface-hover hover:border-border-default/80 hover:text-foreground hover:shadow-sm"
                            }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Course Grid */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
              <div className="flex items-center mb-6">
                <p className="text-sm text-text-secondary">
                  Showing{" "}
                  <span className="text-foreground font-medium">
                    {filteredCourses.length}
                  </span>{" "}
                  courses
                </p>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${selectedCategory}-${selectedLevel}-${searchQuery}`}
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
                >
                  {filteredCourses.map((course) => (
                    <motion.div key={course.id} variants={staggerItem} layout className="h-full">
                      <div
                        onClick={() => router.push(`/academy/course/${course.id}`)}
                        className="group cursor-pointer rounded-[24px] border border-slate-200/80 bg-white p-5 hover:border-slate-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                      >
                        {/* Image */}
                        <div className="relative w-full rounded-2xl overflow-hidden mb-4 bg-slate-100 shrink-0 border border-slate-100" style={{aspectRatio: "1.7"}}>
                          {course.image && (
                            <img
                              src={course.image}
                              alt={course.title}
                              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          )}
                          {/* Category badge */}
                          <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-[#062B49] px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider shadow-sm">
                            {course.tags[0] || course.category}
                          </span>
                          {/* Rating badge */}
                          <span className="absolute top-3 right-3 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[11px] font-bold text-[#062B49] shadow-sm">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />{course.rating}
                          </span>
                        </div>

                        {/* Body */}
                        <div className="flex flex-col flex-1">
                          {/* Title */}
                          <h3 className="text-[17px] font-bold text-[#062B49] group-hover:text-[#FF6600] transition-colors duration-200 line-clamp-2 leading-snug mb-2">
                            {course.title}
                          </h3>

                          {/* Description */}
                          <p className="text-[13px] text-slate-500 line-clamp-2 leading-relaxed mb-4">
                            {course.description}
                          </p>

                          {/* Meta Bar */}
                          <div className="flex items-center justify-between text-[12px] text-slate-500 font-medium py-2 px-3 rounded-xl bg-slate-50 border border-slate-100 mb-5">
                            <div className="flex items-center gap-1.5">
                              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span>{course.duration}</span>
                            </div>
                            <span className="w-1 h-1 rounded-full bg-slate-300" />
                            <div className="flex items-center gap-1.5">
                              <BookOpen className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span>{course.lessons} lessons</span>
                            </div>
                            <span className="w-1 h-1 rounded-full bg-slate-300" />
                            <span className="text-slate-600 font-semibold">{course.level}</span>
                          </div>

                          {/* Footer */}
                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
                            <div>
                              <div className="flex items-center gap-1.5 mb-0.5">
                                <span className="text-[11px] text-slate-400 line-through">₹{Math.floor(course.price * 1.6).toLocaleString()}</span>
                                <span className="bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wide">37% off</span>
                              </div>
                              <span className="text-xl font-extrabold text-[#062B49] leading-none">₹{course.price.toLocaleString()}</span>
                            </div>
                            <button
                              onClick={(e) => handleApplyClick(e, course.id)}
                              className="shrink-0 h-10 px-4 bg-[#062B49] hover:bg-[#FF6600] text-white rounded-xl text-xs font-bold transition-colors duration-200 flex items-center gap-1.5 shadow-sm group/btn"
                            >
                              Enroll <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                            </button>
                          </div>
                        </div>
                      </div>
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
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
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
                      className={`relative rounded-[24px] border border-[#062B49]/10 bg-white p-6 md:p-8 h-full flex flex-col transition-all duration-500 hover:-translate-y-1 hover:border-[#062B49]/20 hover:shadow-[0_8px_30px_rgba(6,43,73,0.08)] overflow-hidden group ${
                        isComplete ? "ring-2 ring-[#FF6600]/40 shadow-[0_0_40px_-10px_rgba(255,102,0,0.15)]" : ""
                      }`}
                    >
                      {isComplete && (
                        <div className="inline-flex items-center gap-1.5 bg-[#FF6600]/10 border border-[#FF6600]/20 text-[#FF6600] text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-full mb-5 self-start">
                          <Zap className="w-3 h-3" />
                          BEST VALUE
                        </div>
                      )}

                      <h3 className="text-xl md:text-2xl font-bold mb-2 text-[#062B49]">
                        {bundle.title}
                      </h3>
                      <p className="text-sm text-[#52677D] mb-6 leading-relaxed border-b border-[#062B49]/5 pb-5">
                        {bundle.description}
                      </p>

                      {/* Included courses */}
                      <div className="flex-1 mb-8 space-y-3.5">
                        {bundle.includes.map((item, i) => (
                          <div key={i} className="flex items-start gap-3 text-sm font-medium text-[#062B49]">
                            <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#FF6600]" />
                            <span className="leading-tight">{item}</span>
                          </div>
                        ))}
                      </div>

                      {/* Bundle Footer */}
                      <div className="pt-5 border-t border-[#062B49]/5 mt-auto">
                        <div className="flex items-end justify-between mb-5">
                          <div className="flex flex-col gap-1">
                            <span className="text-xs text-[#52677D] font-medium">Bundle Price</span>
                            <div className="flex items-baseline gap-2">
                              <span className="text-3xl font-extrabold text-[#062B49] tracking-tight">₹{bundle.price.toLocaleString()}</span>
                            </div>

                          </div>
                        </div>

                        <button className="w-full relative overflow-hidden h-[48px] bg-[#062B49] hover:bg-[#062B49]/90 text-white rounded-[12px] text-sm font-bold transition-all duration-300 shadow-md flex items-center justify-center gap-2 group/btn">
                          Enroll in Bundle
                          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </section>
        )}

        {/* Academy Final CTA */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-panel rounded-2xl p-12"
            >
              <span className="text-[#FF6600] font-bold text-xs uppercase tracking-widest block mb-4">
                START YOUR LEARNING PATH
              </span>
              <h2 className="text-3xl font-bold text-foreground mb-4 tracking-tight">
                Build the Skills Behind Better Engineering.
              </h2>
              <p className="text-text-secondary mb-8 max-w-lg mx-auto">
                Explore aerospace and UAV courses designed to strengthen your technical understanding and help you move from engineering fundamentals to specialised skills.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="primary" size="lg" href="/contact" className="bg-[#FF6600] text-white hover:bg-[#e65c00] border-none shadow-lg">
                  Free Career Mentor Guides
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button variant="secondary" size="lg" href="/contact">
                  Need Help Choosing a Course?
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
