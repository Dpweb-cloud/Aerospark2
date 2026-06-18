"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { GlassCard, SectionHeader, Badge } from "@/components/ui/cards";
import { COURSES } from "@/lib/constants";
import { staggerContainer, staggerItem } from "@/lib/motion";
import {
  Search,
  Filter,
  Clock,
  BookOpen,
  Star,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Users,
} from "lucide-react";

const categories = ["All", ...new Set(COURSES.map((c) => c.category))];
const levels = ["All", "Beginner", "Intermediate", "Advanced"];

export default function AcademyPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [expandedSyllabus, setExpandedSyllabus] = useState<string | null>(null);

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
              description="Industry-grade courses designed by aerospace engineers, certified by regulatory bodies, and trusted by leading organizations."
            />
          </div>
        </section>

        {/* Filters */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
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
                      {/* Course Image */}
                      <div className="relative w-full sm:w-48 h-36 sm:h-auto rounded-lg bg-gradient-to-br from-surface-elevated to-surface flex-shrink-0 overflow-hidden">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <GraduationCap className="w-10 h-10 text-aero-blue/15" />
                        </div>
                        <div className="absolute top-2 left-2">
                          <Badge variant={levelColors[course.level] as any}>
                            {course.level}
                          </Badge>
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
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {course.students.toLocaleString()} enrolled
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

                    {/* Expandable Syllabus */}
                    <div className="mt-4 pt-3 border-t border-border-subtle">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedSyllabus(
                            expandedSyllabus === course.id ? null : course.id
                          );
                        }}
                        className="flex items-center gap-2 text-xs text-text-secondary hover:text-aero-blue transition-colors"
                      >
                        {expandedSyllabus === course.id ? (
                          <ChevronUp className="w-3 h-3" />
                        ) : (
                          <ChevronDown className="w-3 h-3" />
                        )}
                        View Syllabus
                      </button>
                      <AnimatePresence>
                        {expandedSyllabus === course.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="pt-3 space-y-2">
                              {[
                                "Module 1: Introduction & Fundamentals",
                                "Module 2: Core Theory & Principles",
                                "Module 3: Practical Applications",
                                "Module 4: Advanced Techniques",
                                "Module 5: Industry Case Studies",
                                "Module 6: Capstone Project",
                              ].map((module, i) => (
                                <div
                                  key={i}
                                  className="flex items-center gap-2 text-xs text-text-secondary"
                                >
                                  <div className="w-5 h-5 rounded bg-surface-elevated flex items-center justify-center text-[10px] text-text-muted">
                                    {i + 1}
                                  </div>
                                  {module}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
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
      </main>
      <Footer />
    </>
  );
}
