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
      <main className="pt-24 pb-16">
        {/* Header */}
        <section className="py-24 relative overflow-hidden">
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

        {/* What You Get With Every Course */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="glass-panel rounded-3xl p-8 md:p-12 relative overflow-hidden border border-border-default shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-aero-blue/5 via-transparent to-aero-red/5" />
            <div className="relative z-10">
              <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="text-[#FF6600] font-bold text-xs uppercase tracking-widest block mb-3">
                  What You Get With Every Course
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                  Structured Learning. Practical Understanding.
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    title: "Live Interactive Sessions",
                    desc: "Learn directly through instructor-led sessions with opportunities to ask questions and discuss technical concepts.",
                  },
                  {
                    title: "Practical Engineering Examples",
                    desc: "Understand how concepts are applied across aircraft, UAVs, design, simulation, quality, and aerospace operations.",
                  },
                  {
                    title: "Learning Resources",
                    desc: "Get structured course materials, references, and resources relevant to the subject being studied.",
                  },
                  {
                    title: "Doubt-Solving & Guidance",
                    desc: "Get support for technical questions, assessments, projects, and areas that need additional explanation.",
                  },
                  {
                    title: "Assessments",
                    desc: "Check your understanding through structured assessments based on the topics covered in the course.",
                  },
                  {
                    title: "Course Completion Certificate",
                    desc: "Receive an AeroSpark course completion certificate after successfully meeting the course completion requirements.",
                  },
                ].map((benefit, i) => (
                  <div key={i} className="space-y-2 p-5 rounded-2xl bg-surface-elevated/40 border border-border-subtle">
                    <div className="flex items-center gap-2 text-foreground font-bold text-base">
                      <CheckCircle2 className="w-5 h-5 text-aero-blue shrink-0" />
                      <span>{benefit.title}</span>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed pl-7">
                      {benefit.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Certificate Regulatory Note */}
              <div className="mt-12 p-6 rounded-2xl border border-dashed border-border-default bg-background/50">
                <p className="text-xs text-text-muted leading-relaxed">
                  <span className="font-bold text-foreground block mb-1">Certificate Note:</span>
                  AeroSpark course completion certificates recognise completion of the respective training program. Courses covering DGCA, FAA, EASA, AS9100D, or other regulatory frameworks are educational programs and should not be interpreted as licences, approvals, or certifications issued by those regulatory bodies unless explicitly stated.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Built for Practical Learning */}
        <section className="py-20 bg-surface-elevated/10 mb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <span className="text-[#FF6600] font-bold text-xs uppercase tracking-widest block mb-3">
                Built for Practical Learning
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mb-6">
                Go Beyond Watching Lessons.
              </h2>
              <p className="text-text-secondary text-base md:text-lg leading-relaxed">
                Aerospace engineering is easier to understand when you can connect theory with how aircraft and UAV systems actually work. AeroSpark courses focus on building that connection through technical explanations, practical examples, engineering tools, and applied learning.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  icon: <Compass className="w-5 h-5" />,
                  title: "Understand the Fundamentals",
                  desc: "Build a strong foundation before moving into advanced engineering topics.",
                },
                {
                  icon: <Wrench className="w-5 h-5" />,
                  title: "Work With Engineering Tools",
                  desc: "Develop familiarity with tools and workflows used across CAD, CAE, CFD, simulation, and technical analysis.",
                },
                {
                  icon: <Cpu className="w-5 h-5" />,
                  title: "Connect Theory With Application",
                  desc: "See how engineering principles relate to aircraft, drones, structures, aerodynamics, quality, and certification.",
                },
                {
                  icon: <BookOpen className="w-5 h-5" />,
                  title: "Build Skills Step by Step",
                  desc: "Progress from foundational courses into more specialised areas of aerospace and UAV engineering.",
                },
              ].map((item, idx) => (
                <GlassCard key={idx} padding="md" className="space-y-4" glow="none">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-aero-blue/10 text-aero-blue">
                      {item.icon}
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed pl-1">
                    {item.desc}
                  </p>
                </GlassCard>
              ))}
            </div>
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
                    <motion.div key={course.id} variants={staggerItem} layout>
                      <div
                        onClick={() => router.push(`/academy/course/${course.id}`)}
                        className={`group cursor-pointer rounded-[32px] border-2 ${course.id === 'catia-design' ? 'border-aero-blue shadow-[0_0_15px_-3px_rgba(var(--primary-glow),0.2)]' : 'border-border-subtle'} hover:border-aero-red/60 hover:shadow-2xl hover:shadow-aero-red/20 hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col relative h-full bg-surface`}
                      >
                        {/* Image Header */}
                        <div className="relative w-full aspect-[2.1] shrink-0 bg-slate-100 overflow-hidden">
                          {course.image && (
                            <img
                              src={course.image}
                              alt={course.title}
                              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                          )}
                          <div className="absolute top-4 left-4 z-20">
                            <span className="bg-aero-red text-white px-3 py-1 rounded-sm text-[11px] font-bold uppercase tracking-wider shadow-sm">
                              {course.tags[0] || course.category}
                            </span>
                          </div>
                        </div>

                        {/* Body */}
                        <div className="flex flex-col flex-1 px-5 pb-5 pt-2 bg-surface">
                          <h3 className="text-[18px] font-bold text-foreground leading-tight group-hover:text-aero-blue transition-colors mb-2 line-clamp-1">
                            {course.title}
                          </h3>

                          <div className="w-10 h-1 bg-aero-red mb-3" />

                          <p className="text-[13px] text-text-secondary line-clamp-2 mb-4 font-medium leading-relaxed flex-1">
                            {course.description}
                          </p>

                          <div className="flex items-center gap-3 mb-3">
                            <div className="flex items-center gap-1.5 text-lg font-bold text-text-primary">
                              <Star className="w-4 h-4 text-aero-red fill-aero-red" />
                              {course.rating}
                            </div>
                            <div className="w-px h-4 bg-border-subtle" />
                            <div className="flex items-center gap-1.5 text-xs font-bold text-text-primary">
                              <BarChart2 className="w-3.5 h-3.5 text-aero-red" />
                              <span className="truncate">{course.level} • {course.tags[1] || course.tags[0]}</span>
                            </div>
                          </div>

                          <div className="w-full h-px bg-border-subtle mb-3" />

                          <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                              <div className="flex items-center gap-1.5 mb-0.5 text-text-muted">
                                <Clock className="w-3.5 h-3.5 stroke-[2]" />
                                <span className="text-[11px] font-medium">Duration</span>
                              </div>
                              <span className="text-xs font-semibold text-text-primary">{course.duration}</span>
                            </div>
                            <div className="flex flex-col items-end">
                              <div className="flex items-center gap-1.5 mb-0.5 text-text-muted">
                                <BookOpen className="w-3.5 h-3.5 stroke-[2]" />
                                <span className="text-[11px] font-medium">Content</span>
                              </div>
                              <span className="text-xs font-semibold text-text-primary">{course.lessons} lessons</span>
                            </div>
                          </div>
                        </div>

                        {/* Footer */}
                        <div className="relative z-10 px-5 py-3 flex items-center justify-between bg-surface shrink-0 border-t border-border-subtle mt-auto">
                          <div className="flex flex-col justify-center">
                            <span className="text-[22px] font-bold text-foreground tracking-tight leading-none">₹{course.price.toLocaleString()}</span>
                          </div>
                          <button
                            onClick={(e) => handleApplyClick(e, course.id)}
                            className="bg-aero-red text-white hover:bg-aero-red-dim px-4 py-2 rounded-md text-xs font-bold transition-all shadow-md flex items-center justify-center min-w-[110px] gap-2 cursor-pointer"
                          >
                            View Course <ArrowRight className="w-3.5 h-3.5" />
                          </button>
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
                      className={`relative rounded-2xl border bg-gradient-to-br p-6 h-full flex flex-col transition-all duration-500 hover:scale-[1.02] overflow-hidden group ${bundleColors[bundle.color] || bundleColors["blue"]
                        } ${isComplete ? "ring-2 ring-aero-red/40 shadow-[0_0_40px_-10px_rgba(255,87,87,0.3)]" : "hover:shadow-2xl"}`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
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
                        <Button variant="primary" size="md" href="/contact" className="w-full">
                          Enroll in Bundle
                        </Button>
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
                <Button variant="primary" size="lg" onClick={scrollToCatalog} className="bg-[#FF6600] text-white hover:bg-[#e65c00] border-none shadow-lg">
                  Explore All Courses
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
