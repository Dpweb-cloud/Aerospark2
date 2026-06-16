"use client";

import { motion } from "framer-motion";
import { GlassCard, StatCard, Badge } from "@/components/ui/cards";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { staggerContainer, staggerItem } from "@/lib/motion";
import {
  Users,
  Building,
  TrendingUp,
  Server,
  Download,
  ShieldAlert,
  Settings,
  MoreVertical,
  Activity,
  Globe,
  Database,
  Search
} from "lucide-react";

const stats = [
  {
    label: "Total Users",
    value: "14,285",
    icon: <Users className="w-5 h-5 text-aero-blue" />,
    trend: { value: "+5.2% this month", positive: true },
  },
  {
    label: "Platform Revenue",
    value: "$142.5k",
    icon: <TrendingUp className="w-5 h-5 text-green-500" />,
    trend: { value: "+12.1% YoY", positive: true },
  },
  {
    label: "Active Enterprises",
    value: "45",
    icon: <Building className="w-5 h-5 text-purple-500" />,
    trend: { value: "3 new this week", positive: true },
  },
  {
    label: "System Health",
    value: "99.99%",
    icon: <Server className="w-5 h-5 text-primary" />,
    trend: { value: "All systems nominal", positive: true },
  },
];

const auditLogs = [
  { id: 1, action: "User 'admin_dev' modified course 'DGCA Regs'", time: "10 mins ago", type: "system" },
  { id: 2, action: "New enterprise 'AeroSpace Inc' onboarded", time: "2 hours ago", type: "success" },
  { id: 3, action: "Failed login attempt from IP 192.168.1.1", time: "4 hours ago", type: "warning" },
  { id: 4, action: "Database backup completed successfully", time: "12 hours ago", type: "info" },
];

const topCourses = [
  { name: "Drone Pilot Certification", revenue: "$45,200", enrollments: 1200 },
  { name: "Advanced CATIA V5", revenue: "$32,100", enrollments: 850 },
  { name: "Aerodynamics 101", revenue: "$18,500", enrollments: 620 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            ERP Admin Portal
          </h1>
          <p className="text-text-secondary mt-1">
            Global platform overview, revenue metrics, and system administration.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-3"
        >
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input 
              type="text" 
              placeholder="Search users, courses..." 
              className="pl-9 pr-4 py-2 bg-surface-elevated border border-border-default rounded-lg text-sm text-foreground focus:outline-none focus:border-aero-blue w-64"
            />
          </div>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
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
          
          {/* Revenue & Growth Chart Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Platform Growth</h2>
              <select className="bg-surface-elevated border border-border-default text-xs text-foreground rounded-md px-2 py-1 outline-none focus:border-aero-blue">
                <option>Last 30 Days</option>
                <option>This Quarter</option>
                <option>This Year</option>
              </select>
            </div>
            <GlassCard className="h-[300px] flex items-center justify-center border-border-subtle relative overflow-hidden group">
              {/* Fake grid lines for chart effect */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
              
              <div className="text-center relative z-10">
                <Activity className="w-10 h-10 text-aero-blue/50 mx-auto mb-3" />
                <p className="text-sm font-medium text-foreground mb-1">Growth Analytics</p>
                <p className="text-xs text-text-muted">Interactive chart renders here in production</p>
              </div>
            </GlassCard>
          </motion.div>

          {/* Top Courses */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Top Performing Courses</h2>
            </div>
            <GlassCard className="p-0 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border-subtle bg-surface-elevated/50">
                      <th className="px-6 py-4 text-xs font-medium text-text-muted uppercase tracking-wider">Course Name</th>
                      <th className="px-6 py-4 text-xs font-medium text-text-muted uppercase tracking-wider text-right">Enrollments</th>
                      <th className="px-6 py-4 text-xs font-medium text-text-muted uppercase tracking-wider text-right">Revenue</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle">
                    {topCourses.map((course, i) => (
                      <tr key={i} className="hover:bg-surface-hover/30 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                          {course.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary text-right">
                          {course.enrollments.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-green-400 text-right">
                          {course.revenue}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          
          {/* System Admin */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Administration</h2>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Link href="/dashboard/admin" className="block h-full">
                <GlassCard className="p-4 flex flex-col items-center justify-center text-center gap-2 cursor-pointer hover:border-aero-blue/30 transition-colors group h-full">
                  <ShieldAlert className="w-5 h-5 text-text-secondary group-hover:text-red-400 transition-colors" />
                  <span className="text-xs font-medium text-foreground">Security</span>
                </GlassCard>
              </Link>
              <Link href="/dashboard/admin/system" className="block h-full">
                <GlassCard className="p-4 flex flex-col items-center justify-center text-center gap-2 cursor-pointer hover:border-aero-blue/30 transition-colors group h-full">
                  <Database className="w-5 h-5 text-text-secondary group-hover:text-aero-blue transition-colors" />
                  <span className="text-xs font-medium text-foreground">Database</span>
                </GlassCard>
              </Link>
              <Link href="/dashboard/admin" className="block h-full">
                <GlassCard className="p-4 flex flex-col items-center justify-center text-center gap-2 cursor-pointer hover:border-aero-blue/30 transition-colors group h-full">
                  <Globe className="w-5 h-5 text-text-secondary group-hover:text-green-400 transition-colors" />
                  <span className="text-xs font-medium text-foreground">Regions</span>
                </GlassCard>
              </Link>
              <Link href="/dashboard/admin/system" className="block h-full">
                <GlassCard className="p-4 flex flex-col items-center justify-center text-center gap-2 cursor-pointer hover:border-aero-blue/30 transition-colors group h-full">
                  <Settings className="w-5 h-5 text-text-secondary group-hover:text-foreground transition-colors" />
                  <span className="text-xs font-medium text-foreground">Settings</span>
                </GlassCard>
              </Link>
            </div>
          </motion.div>

          {/* Audit Logs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Audit Log</h2>
              <button className="text-text-muted hover:text-foreground transition-colors">
                <MoreVertical className="w-4 h-4" />
              </button>
            </div>
            <GlassCard className="space-y-4">
              {auditLogs.map((log) => (
                <div key={log.id} className="flex gap-3 relative pb-4 border-b border-border-subtle last:border-0 last:pb-0">
                  <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${
                    log.type === 'success' ? 'bg-green-500' :
                    log.type === 'warning' ? 'bg-orange-500' :
                    log.type === 'system' ? 'bg-aero-blue' :
                    'bg-text-secondary'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-foreground">{log.action}</p>
                    <p className="text-[10px] text-text-muted mt-1">{log.time}</p>
                  </div>
                </div>
              ))}
              <Button variant="ghost" className="w-full mt-2 text-xs h-8" size="sm" href="/dashboard/admin/system">
                View Full Logs
              </Button>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
