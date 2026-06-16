"use client";

import { motion } from "framer-motion";
import { GlassCard, StatCard, SectionHeader, Badge } from "@/components/ui/cards";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { staggerContainer, staggerItem } from "@/lib/motion";
import {
  BookOpen,
  Award,
  Play,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Bot,
  BarChart3,
  Calendar,
  Flame,
  FileText,
  Video,
  Download,
} from "lucide-react";

const stats = [
  {
    label: "Courses Completed",
    value: "2",
    icon: <Award className="w-5 h-5 text-aero-blue" />,
  },
  {
    label: "Active Courses",
    value: "3",
    icon: <BookOpen className="w-5 h-5 text-primary" />,
  },
  {
    label: "Learning Hours",
    value: "45h",
    icon: <Clock className="w-5 h-5 text-aero-blue" />,
    trend: { value: "+12h this week", positive: true },
  },
  {
    label: "Learning Streak",
    value: "7 Days",
    icon: <Flame className="w-5 h-5 text-orange-500" />,
    trend: { value: "Keep it up!", positive: true },
  },
];

const inProgress = [
  {
    id: 1,
    title: "Drone Rules & Regulations DGCA",
    module: "Module 3: Airspace Management",
    progress: 65,
    nextLesson: "UAS Traffic Management (UTM)",
    duration: "45 mins",
  },
  {
    id: 2,
    title: "CATIA V5 – Advanced Surface",
    module: "Module 2: Generative Shape Design",
    progress: 30,
    nextLesson: "Multi-sections Surface",
    duration: "1h 15m",
  },
];

const recentLectures = [
  {
    id: 1,
    title: "Aerodynamics Basics",
    course: "Intro to Aerospace",
    duration: "15:20",
    progress: 100,
    thumbnail: "bg-surface-elevated",
  },
  {
    id: 2,
    title: "Material Science: Composites",
    course: "Drone Manufacturing",
    duration: "22:10",
    progress: 45,
    thumbnail: "bg-surface-elevated",
  },
];

const schedule = [
  {
    time: "10:00 AM",
    title: "Live Q&A: DGCA Regulations",
    type: "Live Session",
    duration: "1h",
  },
  {
    time: "2:00 PM",
    title: "CATIA Assignment Deadline",
    type: "Deadline",
    duration: "-",
  },
];

const certificates = [
  {
    id: 1,
    title: "Drone Piloting Level 1",
    date: "May 10, 2026",
  }
];

export default function StudentDashboard() {
  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            Welcome back, Student
          </h1>
          <p className="text-text-secondary mt-1">
            You have 2 pending assignments and 1 live session today.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-3"
        >
          <Button variant="primary" href="/dashboard/player" className="w-full md:w-auto shadow-lg shadow-aero-blue/20">
            Resume Learning
            <Play className="w-4 h-4 fill-current" />
          </Button>
        </motion.div>
      </div>

      {/* Stats */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat) => (
          <motion.div key={stat.label} variants={staggerItem}>
            <StatCard {...stat} />
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* In Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">In Progress</h2>
              <Link href="/dashboard/courses" className="text-sm text-aero-blue hover:text-foreground transition-colors flex items-center gap-1">
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            {inProgress.length > 0 ? (
              <div className="grid gap-4">
                {inProgress.map((course) => (
                  <GlassCard key={course.id} className="relative overflow-hidden group p-0">
                    <div className="absolute top-0 left-0 bottom-0 w-1 bg-surface-elevated z-10">
                      <div
                        className="absolute bottom-0 left-0 w-full bg-aero-blue transition-all duration-1000 ease-out"
                        style={{ height: `${course.progress}%` }}
                      />
                    </div>
                    <div className="p-5 pl-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                      <div className="flex-1">
                        <p className="text-xs text-aero-blue font-medium mb-1 tracking-wide uppercase">
                          {course.module}
                        </p>
                        <h3 className="text-base font-semibold text-foreground mb-2">
                          {course.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-4 text-xs text-text-secondary">
                          <span className="flex items-center gap-1.5">
                            <Play className="w-3.5 h-3.5" />
                            Next: {course.nextLesson}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {course.duration}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 w-full sm:w-auto shrink-0 mt-2 sm:mt-0">
                        <div className="flex-1 sm:hidden">
                          <div className="h-1.5 bg-surface-elevated rounded-full overflow-hidden">
                            <div
                              className="h-full bg-aero-blue rounded-full"
                              style={{ width: `${course.progress}%` }}
                            />
                          </div>
                        </div>
                        <span className="text-sm font-medium text-foreground min-w-[3ch] text-right sm:hidden">
                          {course.progress}%
                        </span>
                        <div className="hidden sm:block text-right mr-2">
                          <span className="text-2xl font-bold text-foreground block leading-none">{course.progress}%</span>
                          <span className="text-[10px] text-text-muted uppercase">Completed</span>
                        </div>
                        <Button variant="secondary" size="sm" href="/dashboard/player" className="w-full sm:w-auto">
                          Continue
                        </Button>
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            ) : (
              <GlassCard className="flex flex-col items-center justify-center py-12 text-center">
                <BookOpen className="w-12 h-12 text-text-muted mb-3" />
                <h3 className="text-lg font-medium text-foreground mb-1">No Active Courses</h3>
                <p className="text-sm text-text-secondary mb-4">Start learning by enrolling in a course from the academy.</p>
                <Button variant="outline" size="sm">Browse Academy</Button>
              </GlassCard>
            )}
          </motion.div>

          {/* Recent Lectures */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Recent Lectures</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recentLectures.map((lecture) => (
                <Link key={lecture.id} href="/dashboard/player" className="block">
                  <GlassCard className="p-3 group hover:border-aero-blue/30 transition-colors cursor-pointer flex gap-4 items-center h-full">
                  <div className={`w-24 h-16 rounded-md ${lecture.thumbnail} border border-border-subtle relative flex-shrink-0 flex items-center justify-center group-hover:bg-surface-hover transition-colors`}>
                    <Video className="w-6 h-6 text-text-muted group-hover:text-aero-blue transition-colors" />
                    <div className="absolute bottom-1 right-1 bg-black/70 px-1 rounded text-[9px] text-foreground font-mono">
                      {lecture.duration}
                    </div>
                    {lecture.progress > 0 && lecture.progress < 100 && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-surface-elevated overflow-hidden">
                        <div className="h-full bg-aero-blue" style={{ width: `${lecture.progress}%` }} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-foreground truncate mb-1 group-hover:text-aero-blue transition-colors">
                      {lecture.title}
                    </h3>
                    <p className="text-xs text-text-secondary truncate">
                      {lecture.course}
                    </p>
                  </div>
                  </GlassCard>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column - Sidebars */}
        <div className="space-y-6">
          {/* AI Assistant Promo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <GlassCard
              glow="blue"
              className="relative overflow-hidden border-aero-blue/30 bg-aero-blue/5"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-aero-blue/10 to-transparent" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-aero-blue/10 text-aero-blue">
                    <Bot className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground">
                    AeroSpark AI Tutor
                  </h3>
                </div>
                <p className="text-sm text-text-secondary mb-4">
                  "Based on your recent progress in DGCA Regulations, I've prepared a quick 5-question review quiz. Would you like to take it?"
                </p>
                <div className="flex gap-2">
                  <Button variant="primary" size="sm" className="w-full">
                    Start Quiz
                  </Button>
                  <Button variant="outline" size="sm" className="w-full">
                    Ask Concept
                  </Button>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Today's Schedule */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Schedule</h2>
              <button className="text-text-muted hover:text-foreground transition-colors">
                <Calendar className="w-4 h-4" />
              </button>
            </div>
            <GlassCard className="space-y-4">
              {schedule.length > 0 ? schedule.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-4 items-start pb-4 border-b border-border-subtle last:border-0 last:pb-0"
                >
                  <div className="text-center min-w-[60px] pt-1">
                    <span className="block text-sm font-semibold text-foreground">
                      {item.time.split(" ")[0]}
                    </span>
                    <span className="text-[10px] text-text-muted uppercase">
                      {item.time.split(" ")[1]}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground mb-1">
                      {item.title}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={item.type === "Live Session" ? "blue" : "red"}
                      >
                        {item.type}
                      </Badge>
                      <span className="text-xs text-text-muted">
                        {item.duration}
                      </span>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="text-center py-4 text-text-secondary text-sm">
                  No events scheduled for today.
                </div>
              )}
            </GlassCard>
          </motion.div>

          {/* Certificates */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Recent Certificates</h2>
            </div>
            <GlassCard className="p-4 flex items-center justify-between group hover:border-aero-blue/30 transition-colors cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-surface-hover flex items-center justify-center border border-border-subtle group-hover:bg-aero-blue/10 transition-colors">
                  <Award className="w-5 h-5 text-aero-blue" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground group-hover:text-aero-blue transition-colors">
                    {certificates[0].title}
                  </p>
                  <p className="text-xs text-text-secondary">
                    Issued: {certificates[0].date}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-text-secondary group-hover:text-foreground">
                <Download className="w-4 h-4" />
              </Button>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
