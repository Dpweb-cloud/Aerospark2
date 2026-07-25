"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { SectionHeader, Badge } from "@/components/ui/cards";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  Plane,
  Activity,
  Cpu,
  BarChart2,
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
  const router = useRouter();
  const [animatingCard, setAnimatingCard] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [activeTab, setActiveTab] = useState<"courses" | "bundles">("courses");

  const handleApplyClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    setAnimatingCard(id);
    setTimeout(() => {
      router.push(`/academy/course/${id}`);
    }, 600);
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
        <section className="py-24 relative overflow-hidden">
          {/* Ambient orbs for antigravity feel */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-aero-blue/10 blur-[120px] rounded-[100%] pointer-events-none z-0" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-aero-red/5 blur-[120px] rounded-full pointer-events-none z-0" />

          <div className="absolute inset-0 radar-grid opacity-30 z-0" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground/90 to-foreground/50">
              Aerospace Training Programs
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed text-justify sm:text-center">
              Industry-grade courses designed for UAS (Drones), aerospace, CAD design, simulation, quality, and regulatory learning. Live classes, mentorship, and certification included.
            </p>
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
        </section>

        {/* COURSES TAB */}
        {activeTab === "courses" && (
          <>
            {/* Filters */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 relative z-20">
              <div className="relative group">
                {/* Glowing backdrop */}
                <div className="absolute inset-0 bg-gradient-to-r from-aero-blue/10 via-surface to-aero-red/10 rounded-[2rem] blur-xl opacity-70 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative bg-surface/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-4 md:p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col gap-5">

                  {/* Top Row: Search & Level */}
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
                        className="block w-full pl-11 pr-4 py-3 bg-white/50 border border-white/20 rounded-full text-sm text-foreground focus:ring-2 focus:ring-aero-blue/30 focus:border-aero-blue/50 transition-all placeholder:text-text-muted shadow-sm hover:bg-white/80 focus:bg-white"
                      />
                    </div>

                    {/* Level Filter */}
                    <div className="flex items-center p-1.5 bg-white/40 rounded-full border border-white/20 self-start md:self-auto w-full md:w-auto overflow-x-auto hide-scrollbar shadow-sm">
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
                              className="absolute inset-0 bg-gradient-to-r from-[#FF6600] to-[#FF8833] rounded-full -z-10 shadow-md"
                              transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            />
                          )}
                          <span className="relative z-10">{level}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Row: Categories */}
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
                            ? "text-[#003380] border-[#003380]/30 bg-[#003380]/5 shadow-sm"
                            : "text-text-secondary border-white/40 bg-white/30 hover:bg-white/60 hover:border-white/60 hover:text-foreground hover:shadow-sm"
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
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                      className={`relative rounded-2xl border bg-gradient-to-br p-6 h-full flex flex-col transition-all duration-500 hover:scale-[1.02] overflow-hidden group ${bundleColors[bundle.color] || bundleColors["blue"]
                        } ${isComplete ? "ring-2 ring-aero-red/40 shadow-[0_0_40px_-10px_rgba(255,87,87,0.3)]" : "hover:shadow-2xl"}`}
                    >
                      {/* Premium glow effect on hover */}
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
      </main >


      <Footer />
    </>
  );
}
