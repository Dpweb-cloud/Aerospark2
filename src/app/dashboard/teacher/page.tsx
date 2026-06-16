"use client";

import { motion } from "framer-motion";
import { GlassCard, StatCard, Badge } from "@/components/ui/cards";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { staggerContainer, staggerItem } from "@/lib/motion";
import {
  Users,
  BookOpen,
  Star,
  TrendingUp,
  Plus,
  Upload,
  MessageSquare,
  MoreVertical,
  Activity,
  PlayCircle
} from "lucide-react";

const stats = [
  {
    label: "Total Students",
    value: "1,248",
    icon: <Users className="w-5 h-5 text-aero-blue" />,
    trend: { value: "+12% this month", positive: true },
  },
  {
    label: "Active Courses",
    value: "5",
    icon: <BookOpen className="w-5 h-5 text-primary" />,
  },
  {
    label: "Avg. Course Rating",
    value: "4.8",
    icon: <Star className="w-5 h-5 text-yellow-500" />,
    trend: { value: "+0.2 from last month", positive: true },
  },
  {
    label: "Monthly Revenue",
    value: "$4,250",
    icon: <TrendingUp className="w-5 h-5 text-green-500" />,
    trend: { value: "+8% this month", positive: true },
  },
];

const recentEnrollments = [
  { id: 1, name: "Alex Johnson", course: "Advanced CATIA V5", date: "2 mins ago", avatar: "AJ" },
  { id: 2, name: "Sarah Smith", course: "DGCA Drone Regulations", date: "1 hour ago", avatar: "SS" },
  { id: 3, name: "Michael Chen", course: "Aerodynamics 101", date: "3 hours ago", avatar: "MC" },
  { id: 4, name: "Emma Davis", course: "Advanced CATIA V5", date: "5 hours ago", avatar: "ED" },
];

const coursePerformance = [
  { title: "Advanced CATIA V5", students: 450, completion: 68, rating: 4.9 },
  { title: "DGCA Drone Regulations", students: 820, completion: 85, rating: 4.7 },
  { title: "Aerodynamics 101", students: 310, completion: 42, rating: 4.8 },
];

export default function TeacherDashboard() {
  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            Instructor Portal
          </h1>
          <p className="text-text-secondary mt-1">
            Manage your courses, track student progress, and analyze performance.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-3"
        >
          <Button variant="outline" className="hidden sm:flex" href="/dashboard/teacher">
            <MessageSquare className="w-4 h-4 mr-2" />
            Announcements
          </Button>
          <Button variant="primary" className="shadow-lg shadow-aero-blue/20" href="/dashboard/teacher/courses">
            <Plus className="w-4 h-4 mr-2" />
            Create Course
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
          {/* Course Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Course Performance</h2>
              <Link href="/dashboard/teacher/analytics" className="text-sm text-aero-blue hover:text-foreground transition-colors">
                View Reports
              </Link>
            </div>
            <GlassCard className="p-0 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border-subtle bg-surface-elevated/50">
                      <th className="px-6 py-4 text-xs font-medium text-text-muted uppercase tracking-wider">Course Name</th>
                      <th className="px-6 py-4 text-xs font-medium text-text-muted uppercase tracking-wider text-right">Students</th>
                      <th className="px-6 py-4 text-xs font-medium text-text-muted uppercase tracking-wider text-right">Completion</th>
                      <th className="px-6 py-4 text-xs font-medium text-text-muted uppercase tracking-wider text-right">Rating</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle">
                    {coursePerformance.map((course, i) => (
                      <tr key={i} className="hover:bg-surface-hover/30 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-md bg-surface-elevated flex items-center justify-center border border-border-subtle">
                              <PlayCircle className="w-4 h-4 text-aero-blue" />
                            </div>
                            <span className="text-sm font-medium text-foreground">{course.title}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-text-secondary">
                          {course.students.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center justify-end gap-2">
                            <span className="text-sm text-text-secondary">{course.completion}%</span>
                            <div className="w-16 h-1.5 bg-surface-elevated rounded-full overflow-hidden">
                              <div className="h-full bg-aero-blue rounded-full" style={{ width: `${course.completion}%` }} />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                            <span className="text-sm text-foreground font-medium">{course.rating}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Quick Actions</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link href="/dashboard/teacher/upload" className="block h-full">
                <GlassCard className="p-5 flex flex-col items-center justify-center text-center gap-3 cursor-pointer hover:border-aero-blue/30 transition-colors group h-full">
                  <div className="w-12 h-12 rounded-full bg-aero-blue/10 text-aero-blue flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-1">Upload Video</h3>
                    <p className="text-xs text-text-muted">Add new lectures</p>
                  </div>
                </GlassCard>
              </Link>
              <Link href="/dashboard/teacher" className="block h-full">
                <GlassCard className="p-5 flex flex-col items-center justify-center text-center gap-3 cursor-pointer hover:border-aero-blue/30 transition-colors group h-full">
                  <div className="w-12 h-12 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-1">Q&A Forum</h3>
                    <p className="text-xs text-text-muted">12 unread questions</p>
                  </div>
                </GlassCard>
              </Link>
              <Link href="/dashboard/teacher/analytics" className="block h-full">
                <GlassCard className="p-5 flex flex-col items-center justify-center text-center gap-3 cursor-pointer hover:border-aero-blue/30 transition-colors group h-full">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-foreground mb-1">Analytics</h3>
                    <p className="text-xs text-text-muted">View detailed reports</p>
                  </div>
                </GlassCard>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Recent Enrollments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Recent Enrollments</h2>
              <button className="text-text-muted hover:text-foreground transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
            <GlassCard className="space-y-4">
              {recentEnrollments.map((student) => (
                <div key={student.id} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface-elevated border border-border-subtle flex items-center justify-center text-xs font-semibold text-aero-blue">
                    {student.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{student.name}</p>
                    <p className="text-xs text-text-secondary truncate">{student.course}</p>
                  </div>
                  <div className="text-xs text-text-muted whitespace-nowrap">
                    {student.date}
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-2" size="sm" href="/dashboard/teacher/analytics">
                View All Students
              </Button>
            </GlassCard>
          </motion.div>

          {/* System Status / Storage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
             <GlassCard className="bg-surface-elevated/30">
               <h3 className="text-sm font-medium text-foreground mb-4">Video Storage Quota</h3>
               <div className="space-y-2">
                 <div className="flex justify-between text-xs">
                   <span className="text-text-secondary">Used: 42 GB</span>
                   <span className="text-foreground font-medium">100 GB</span>
                 </div>
                 <div className="h-2 bg-surface-elevated rounded-full overflow-hidden">
                   <div className="h-full bg-aero-blue rounded-full" style={{ width: '42%' }} />
                 </div>
                 <p className="text-[10px] text-text-muted pt-1">
                   You have used 42% of your available storage.
                 </p>
               </div>
             </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
