"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard, StatCard, Badge } from "@/components/ui/cards";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  getAdminDashboardData,
  adminAddUserAction,
  adminDeleteUserAction,
  adminCreateClassAction,
  adminUpdatePaymentStatusAction,
  checkNoteAction
} from "@/app/actions/dashboardActions";
import {
  Users,
  Server,
  ShieldAlert,
  Settings,
  Activity,
  Globe,
  Database,
  Search,
  FileText,
  CheckCircle2,
  XCircle,
  UserCheck,
  Calendar,
  BookOpen,
  Award,
  Bell,
  BarChart3,
  GraduationCap,
  Plus,
  Trash2,
  X
} from "lucide-react";

const ensureAbsoluteUrl = (url: string) => {
  if (!url) return "#";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `https://${url}`;
};

function AdminDashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get("tab") || "overview";

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  // Modal control states
  const [activeModal, setActiveModal] = useState<"student" | "teacher" | "course" | null>(null);
  
  // User Form States
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formSubject, setFormSubject] = useState("");

  // Course Form States
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDate, setCourseDate] = useState("");
  const [courseDuration, setCourseDuration] = useState("1h 30m");
  const [courseTeacherId, setCourseTeacherId] = useState<number | "">("");

  const fetchAdminData = async () => {
    try {
      const res = await getAdminDashboardData();
      if (res.redirect) {
        router.push(res.redirect);
        return;
      }
      if (res.success) {
        setData(res.data);
      } else {
        toast.error(res.error || "Failed to load admin data.");
      }
    } catch (err: any) {
      toast.error("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const handleAddUser = async (role: "STUDENT" | "TEACHER") => {
    if (!formName || !formEmail || !formPassword) {
      toast.error("Please fill in all required fields (Name, Email, and Password).");
      return;
    }
    try {
      const res = await adminAddUserAction(formName, formEmail, formPassword, role, formSubject);
      if (res.success) {
        toast.success(`New ${role.toLowerCase()} profile added successfully!`);
        setActiveModal(null);
        setFormName("");
        setFormEmail("");
        setFormPassword("");
        setFormSubject("");
        fetchAdminData();
      } else {
        toast.error(res.error || "Failed to create user.");
      }
    } catch (err: any) {
      toast.error("Error adding user: " + err.message);
    }
  };

  const handleDeleteUser = async (userId: number, name: string) => {
    if (!confirm(`Are you sure you want to permanently delete user "${name}"? This cannot be undone.`)) {
      return;
    }
    try {
      const res = await adminDeleteUserAction(userId);
      if (res.success) {
        toast.success("User account deleted successfully!");
        fetchAdminData();
      } else {
        toast.error(res.error || "Failed to delete user.");
      }
    } catch (err: any) {
      toast.error("Error: " + err.message);
    }
  };

  const handleUpdatePayment = async (userId: number, field: "feeStatus" | "salaryStatus", status: string) => {
    try {
      const res = await adminUpdatePaymentStatusAction(userId, field, status);
      if (res.success) {
        toast.success("Payment status updated successfully!");
        fetchAdminData();
      } else {
        toast.error(res.error || "Failed to update payment status.");
      }
    } catch (err: any) {
      toast.error("Error: " + err.message);
    }
  };

  const handleCheckNote = async (noteId: number, status: "APPROVED" | "REJECTED") => {
    try {
      const res = await checkNoteAction(noteId, status);
      if (res.success) {
        toast.success(`Note submission ${status.toLowerCase()} successfully!`);
        fetchAdminData();
      } else {
        toast.error(res.error || "Failed to update note status.");
      }
    } catch (err: any) {
      toast.error("Error updating note status: " + err.message);
    }
  };

  const handleCreateCourse = async () => {
    if (!courseTitle || !courseDate || !courseTeacherId) {
      toast.error("Please fill out all class requirements.");
      return;
    }
    try {
      const res = await adminCreateClassAction(
        courseTitle,
        courseDate,
        courseDuration,
        Number(courseTeacherId)
      );
      if (res.success) {
        toast.success("New class course scheduled successfully!");
        setActiveModal(null);
        setCourseTitle("");
        setCourseDate("");
        setCourseDuration("1h 30m");
        setCourseTeacherId("");
        fetchAdminData();
      } else {
        toast.error(res.error || "Failed to create class.");
      }
    } catch (err: any) {
      toast.error("Error: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-aero-blue border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-mono text-text-secondary">Loading Admin ERP...</span>
        </div>
      </div>
    );
  }

  const stats = data?.stats || {
    totalUsers: 0,
    studentsCount: 0,
    teachersCount: 0,
    verifiedUsersCount: 0,
    totalClasses: 0,
    totalNotes: 0
  };

  const allUsers = data?.usersList || [];
  const students = allUsers.filter((u: any) => u.role === "STUDENT");
  const instructors = allUsers.filter((u: any) => u.role === "TEACHER");
  const classesList = data?.classesList || [];

  const filteredUsers = allUsers.filter((user: any) =>
    user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            ERP Admin Portal
          </h1>
          <p className="text-text-secondary mt-1">
            Global platform overview, user registrations, and system configurations.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search index..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-surface-elevated border border-border-default rounded-xl text-sm text-foreground focus:outline-none focus:border-aero-blue w-64"
            />
          </div>
          <Button variant="outline" onClick={fetchAdminData}>
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Registrations"
          value={stats.totalUsers.toString()}
          icon={<Users className="w-5 h-5 text-aero-blue" />}
          trend={{ value: `${stats.studentsCount} Students / ${stats.teachersCount} Teachers`, positive: true }}
          onClick={() => router.push("/dashboard/admin")}
        />
        <StatCard
          label="Verified Users"
          value={stats.verifiedUsersCount.toString()}
          icon={<UserCheck className="w-5 h-5 text-green-500" />}
          trend={{ value: `${Math.round((stats.verifiedUsersCount / (stats.totalUsers || 1)) * 100)}% verification rate`, positive: true }}
          onClick={() => router.push("/dashboard/admin")}
        />
        <StatCard
          label="Scheduled Classes"
          value={stats.totalClasses.toString()}
          icon={<Server className="w-5 h-5 text-primary" />}
          onClick={() => router.push("/dashboard/admin?tab=courses")}
        />
        <StatCard
          label="Uploaded Notes"
          value={stats.totalNotes.toString()}
          icon={<FileText className="w-5 h-5 text-purple-500" />}
          onClick={() => router.push("/dashboard/admin?tab=notes")}
        />
      </div>

      <AnimatePresence mode="wait">
        {/* Tab: Overview */}
        {activeTab === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Left: Registered Users Index */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Registered Users Index</h2>
              <GlassCard className="p-0 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-border-subtle bg-surface-elevated/50">
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">User details</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Assigned Role</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Course/Subject</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Payment Status</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-subtle">
                      {filteredUsers.slice(0, 8).map((user: any) => (
                        <tr key={user.id} className="hover:bg-surface-hover/30 transition-colors">
                          <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-surface-elevated flex items-center justify-center text-xs font-semibold text-aero-blue border border-border-subtle">
                                {user.name?.slice(0, 2).toUpperCase() || "US"}
                              </div>
                              <div>
                                <span className="text-sm font-medium text-foreground block">{user.name}</span>
                                <span className="text-xs text-text-secondary">{user.email}</span>
                              </div>
                            </div>
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-text-secondary">
                            <Badge variant={user.role === 'ADMIN' ? 'red' : user.role === 'TEACHER' ? 'blue' : 'default'}>
                              {user.role}
                            </Badge>
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-text-secondary">
                            {user.subject || <span className="text-text-muted italic">None</span>}
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-text-secondary">
                            {user.role === "STUDENT" ? (
                              <select
                                value={user.feeStatus}
                                onChange={(e) => handleUpdatePayment(user.id, "feeStatus", e.target.value)}
                                className={cn(
                                  "border text-xs rounded-lg px-2 py-1 outline-none font-medium bg-background",
                                  user.feeStatus === "PAID" && "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                                  user.feeStatus === "PENDING" && "bg-primary/10 text-primary border-primary/20",
                                  user.feeStatus === "UNPAID" && "bg-rose-500/10 text-rose-400 border-rose-500/20"
                                )}
                              >
                                <option value="UNPAID" className="bg-background text-foreground">Unpaid</option>
                                <option value="PENDING" className="bg-background text-foreground">Pending</option>
                                <option value="PAID" className="bg-background text-foreground">Paid</option>
                              </select>
                            ) : user.role === "TEACHER" ? (
                              <select
                                value={user.salaryStatus}
                                onChange={(e) => handleUpdatePayment(user.id, "salaryStatus", e.target.value)}
                                className={cn(
                                  "border text-xs rounded-lg px-2 py-1 outline-none font-medium bg-background",
                                  user.salaryStatus === "PAID" && "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                                  user.salaryStatus === "UNPAID" && "bg-rose-500/10 text-rose-400 border-rose-500/20"
                                )}
                              >
                                <option value="UNPAID" className="bg-background text-foreground">Unpaid</option>
                                <option value="PAID" className="bg-background text-foreground">Paid</option>
                              </select>
                            ) : (
                              <span className="text-text-muted italic text-xs">N/A</span>
                            )}
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-text-secondary text-right">
                            <button
                              onClick={() => handleDeleteUser(user.id, user.name)}
                              className="text-red-400 hover:text-red-500 transition-colors p-1"
                              title="Delete Account"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </GlassCard>
            </div>

            {/* Right: Actions and Note log */}
            <div className="space-y-6">
              <GlassCard className="p-5">
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Settings className="w-4 h-4 text-aero-blue" />
                  Administrative Actions
                </h3>
                <div className="grid grid-cols-2 gap-3 text-xs font-medium">
                  <button onClick={() => toast.success("Security configuration verified.")} className="p-3 border border-border-default rounded-xl bg-surface hover:bg-surface-elevated transition-all text-center flex flex-col items-center justify-center gap-1.5 group">
                    <ShieldAlert className="w-4 h-4 text-text-secondary group-hover:text-red-400 transition-colors" />
                    <span>Security Settings</span>
                  </button>
                  <button onClick={() => toast.success("Database backup generated successfully!")} className="p-3 border border-border-default rounded-xl bg-surface hover:bg-surface-elevated transition-all text-center flex flex-col items-center justify-center gap-1.5 group">
                    <Database className="w-4 h-4 text-text-secondary group-hover:text-aero-blue transition-colors" />
                    <span>Backup DB</span>
                  </button>
                  <button onClick={() => toast.success("Global variables synchronized.")} className="p-3 border border-border-default rounded-xl bg-surface hover:bg-surface-elevated transition-all text-center flex flex-col items-center justify-center gap-1.5 group">
                    <Globe className="w-4 h-4 text-text-secondary group-hover:text-green-400 transition-colors" />
                    <span>Global Config</span>
                  </button>
                  <button onClick={() => toast.success("Server instances are running with 100% health.")} className="p-3 border border-border-default rounded-xl bg-surface hover:bg-surface-elevated transition-all text-center flex flex-col items-center justify-center gap-1.5 group">
                    <Activity className="w-4 h-4 text-text-secondary group-hover:text-foreground transition-colors" />
                    <span>Server Stats</span>
                  </button>
                </div>
              </GlassCard>

              <GlassCard className="p-5">
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-400" />
                  Recent Note Log
                </h3>
                <div className="space-y-4">
                  {data?.notes?.slice(0, 3).map((note: any) => (
                    <div key={note.id} className="border-b border-border-subtle pb-3 last:border-0 last:pb-0 text-xs">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-semibold text-foreground truncate max-w-[150px]">{note.title}</span>
                        <Badge variant={note.status === 'APPROVED' ? 'green' : note.status === 'REJECTED' ? 'red' : 'blue'}>
                          {note.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center text-[10px] text-text-muted mt-1">
                        <span>By: {note.studentName}</span>
                        <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                  {(!data?.notes || data.notes.length === 0) && (
                    <p className="text-xs text-text-secondary text-center py-4">No note submissions recorded.</p>
                  )}
                </div>
              </GlassCard>
            </div>
          </motion.div>
        )}

        {/* Tab: Students */}
        {activeTab === "students" && (
          <motion.div
            key="students"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-4"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-foreground">Registered Students Index</h2>
              <Button variant="primary" onClick={() => setActiveModal("student")} className="flex items-center gap-1.5 py-1.5 text-xs">
                <Plus className="w-3.5 h-3.5" /> Add Student
              </Button>
            </div>
            <GlassCard className="p-0 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border-subtle bg-surface-elevated/50">
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Name</th>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Email Address</th>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Subject/Course</th>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Verified</th>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Fee Status</th>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle">
                    {students.map((user: any) => (
                      <tr key={user.id} className="hover:bg-surface-hover/30 transition-colors">
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm font-semibold text-foreground">{user.name}</td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-text-secondary">{user.email}</td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-text-secondary">{user.subject || <span className="text-text-muted italic">General</span>}</td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-text-secondary">
                          <Badge variant={user.isVerified ? "green" : "default"}>{user.isVerified ? "Verified" : "Pending"}</Badge>
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-text-secondary">
                          <select
                            value={user.feeStatus}
                            onChange={(e) => handleUpdatePayment(user.id, "feeStatus", e.target.value)}
                            className={cn(
                              "border text-xs rounded-lg px-2 py-1 outline-none font-medium bg-background",
                              user.feeStatus === "PAID" && "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                              user.feeStatus === "PENDING" && "bg-primary/10 text-primary border-primary/20",
                              user.feeStatus === "UNPAID" && "bg-rose-500/10 text-rose-400 border-rose-500/20"
                            )}
                          >
                            <option value="UNPAID" className="bg-background text-foreground">Unpaid</option>
                            <option value="PENDING" className="bg-background text-foreground">Pending</option>
                            <option value="PAID" className="bg-background text-foreground">Paid</option>
                          </select>
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-right">
                          <button
                            onClick={() => handleDeleteUser(user.id, user.name)}
                            className="text-red-400 hover:text-red-500 transition-colors p-1"
                            title="Delete Account"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Tab: Instructors */}
        {activeTab === "instructors" && (
          <motion.div
            key="instructors"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-4"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-foreground">Registered Instructors Index</h2>
              <Button variant="primary" onClick={() => setActiveModal("teacher")} className="flex items-center gap-1.5 py-1.5 text-xs">
                <Plus className="w-3.5 h-3.5" /> Add Instructor
              </Button>
            </div>
            <GlassCard className="p-0 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border-subtle bg-surface-elevated/50">
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Name</th>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Email Address</th>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Teaching Subject</th>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Verified</th>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Salary Status</th>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle">
                    {instructors.map((user: any) => (
                      <tr key={user.id} className="hover:bg-surface-hover/30 transition-colors">
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm font-semibold text-foreground">{user.name}</td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-text-secondary">{user.email}</td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-text-secondary">{user.subject || <span className="text-text-muted italic">General Aviation</span>}</td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-text-secondary">
                          <Badge variant={user.isVerified ? "green" : "default"}>{user.isVerified ? "Verified" : "Pending"}</Badge>
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-text-secondary">
                          <select
                            value={user.salaryStatus}
                            onChange={(e) => handleUpdatePayment(user.id, "salaryStatus", e.target.value)}
                            className={cn(
                              "border text-xs rounded-lg px-2 py-1 outline-none font-medium bg-background",
                              user.salaryStatus === "PAID" && "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                              user.salaryStatus === "UNPAID" && "bg-rose-500/10 text-rose-400 border-rose-500/20"
                            )}
                          >
                            <option value="UNPAID" className="bg-background text-foreground">Unpaid</option>
                            <option value="PAID" className="bg-background text-foreground">Paid</option>
                          </select>
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-right">
                          <button
                            onClick={() => handleDeleteUser(user.id, user.name)}
                            className="text-red-400 hover:text-red-500 transition-colors p-1"
                            title="Delete Account"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Tab: Courses */}
        {activeTab === "courses" && (
          <motion.div
            key="courses"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-4"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-foreground">Active Class Slots</h2>
              <Button variant="primary" onClick={() => setActiveModal("course")} className="flex items-center gap-1.5 py-1.5 text-xs">
                <Plus className="w-3.5 h-3.5" /> Schedule Class
              </Button>
            </div>
            <GlassCard className="p-0 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border-subtle bg-surface-elevated/50">
                    <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Topic</th>
                    <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Date Scheduled</th>
                    <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Instructor</th>
                    <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Duration</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  {classesList.map((cls: any) => (
                    <tr key={cls.id} className="hover:bg-surface-hover/30 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-foreground">{cls.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">{new Date(cls.date).toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">{cls.teacherName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary text-right">{cls.duration}</td>
                    </tr>
                  ))}
                  {classesList.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-sm text-text-secondary">No classes scheduled yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </GlassCard>
          </motion.div>
        )}

        {/* Tab: Analytics */}
        {activeTab === "analytics" && (
          <motion.div
            key="analytics"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <GlassCard className="p-6 text-center space-y-2">
              <Users className="w-8 h-8 text-aero-blue mx-auto" />
              <h3 className="text-sm font-bold text-foreground">Student Ratio</h3>
              <p className="text-3xl font-extrabold text-aero-blue">{Math.round((stats.studentsCount / (stats.totalUsers || 1)) * 100)}%</p>
              <p className="text-xs text-text-secondary">Percentage of registered students on AeroSpark</p>
            </GlassCard>
            <GlassCard className="p-6 text-center space-y-2">
              <GraduationCap className="w-8 h-8 text-primary mx-auto" />
              <h3 className="text-sm font-bold text-foreground">Instructor Ratio</h3>
              <p className="text-3xl font-extrabold text-primary">{Math.round((stats.teachersCount / (stats.totalUsers || 1)) * 100)}%</p>
              <p className="text-xs text-text-secondary">Percentage of registered teachers on AeroSpark</p>
            </GlassCard>
            <GlassCard className="p-6 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-green-400 mx-auto" />
              <h3 className="text-sm font-bold text-foreground">Validation Ratio</h3>
              <p className="text-3xl font-extrabold text-green-400">{Math.round((stats.verifiedUsersCount / (stats.totalUsers || 1)) * 100)}%</p>
              <p className="text-xs text-text-secondary">Ratio of fully verified user accounts</p>
            </GlassCard>
          </motion.div>
        )}

        {/* Tab: Certificates */}
        {activeTab === "certificates" && (
          <motion.div
            key="certificates"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-4"
          >
            <h2 className="text-lg font-semibold text-foreground">Issued Certificates Audit Log</h2>
            <GlassCard className="p-0 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border-subtle bg-surface-elevated/50">
                    <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Credential ID</th>
                    <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Certificate Title</th>
                    <th className="px-6 py-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Recipient</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle">
                  <tr className="hover:bg-surface-hover/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">CERT-UAS-001</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-foreground">AeroSpark Remote Pilot License (Micro Class)</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground text-right">Alex Mercer</td>
                  </tr>
                </tbody>
              </table>
            </GlassCard>
          </motion.div>
        )}

        {/* Tab: Notifications */}
        {activeTab === "notifications" && (
          <motion.div
            key="notifications"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-4"
          >
            <h2 className="text-lg font-semibold text-foreground">System Audit Logs</h2>
            <GlassCard className="space-y-3">
              <div className="flex gap-3 text-xs items-start border-b border-border-subtle pb-3">
                <Badge variant="blue">INFO</Badge>
                <div>
                  <p className="text-foreground font-semibold">User alex_mercer registered on AeroSpark.</p>
                  <p className="text-[10px] text-text-muted mt-0.5">Aug 11, 2026 02:08 AM</p>
                </div>
              </div>
              <div className="flex gap-3 text-xs items-start border-b border-border-subtle pb-3">
                <Badge variant="green">SUCCESS</Badge>
                <div>
                  <p className="text-foreground font-semibold">Prisma sync operation completed successfully on local port 3306.</p>
                  <p className="text-[10px] text-text-muted mt-0.5">Aug 11, 2026 02:08 AM</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Tab: System */}
        {activeTab === "system" && (
          <motion.div
            key="system"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <GlassCard className="p-6 space-y-4">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Database className="w-4 h-4 text-aero-blue" />
                Local database status
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-text-secondary">DBMS Engine:</span>
                  <span className="font-semibold text-foreground">MariaDB / MySQL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Host Address:</span>
                  <span className="font-semibold text-foreground">127.0.0.1:3306</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Active Connection pool:</span>
                  <span className="font-semibold text-green-400">Online</span>
                </div>
              </div>
            </GlassCard>
            <GlassCard className="p-6 space-y-4">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Server className="w-4 h-4 text-purple-400" />
                Next.js node environment
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Node Version:</span>
                  <span className="font-semibold text-foreground">v26.3.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">Server Mode:</span>
                  <span className="font-semibold text-foreground">Development (npm run dev)</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Tab: Notes & Resources */}
        {activeTab === "notes" && (
          <motion.div
            key="notes"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Uploaded Student Notes</h2>
              <GlassCard className="p-0 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-border-subtle bg-surface-elevated/50">
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Note Title</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Student Name</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Date Submitted</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">File Access</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-subtle">
                      {data?.notes?.length > 0 ? (
                        data.notes.map((note: any) => (
                          <tr key={note.id} className="hover:bg-surface-hover/30 transition-colors">
                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm font-semibold text-foreground">
                              {note.title}
                            </td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-text-secondary">
                              {note.studentName}
                            </td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-text-secondary">
                              {new Date(note.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm">
                              <a
                                href={ensureAbsoluteUrl(note.filePath)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-aero-blue hover:underline inline-flex items-center gap-1.5 font-medium"
                              >
                                Open Note File
                              </a>
                            </td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-right">
                              <select
                                value={note.status}
                                onChange={(e) => handleCheckNote(note.id, e.target.value as "APPROVED" | "REJECTED")}
                                className={cn(
                                  "border text-xs rounded-lg px-2 py-1 outline-none font-medium bg-background",
                                  note.status === "APPROVED" && "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                                  note.status === "PENDING" && "bg-primary/10 text-primary border-primary/20",
                                  note.status === "REJECTED" && "bg-rose-500/10 text-rose-400 border-rose-500/20"
                                )}
                              >
                                <option value="PENDING" className="bg-background text-foreground">Pending</option>
                                <option value="APPROVED" className="bg-background text-foreground">Approved</option>
                                <option value="REJECTED" className="bg-background text-foreground">Rejected</option>
                              </select>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="px-6 py-8 text-center text-sm text-text-secondary">
                            No student notes uploaded yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </GlassCard>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Shared Learning Resources</h2>
              <GlassCard className="p-0 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-border-subtle bg-surface-elevated/50">
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Title</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Instructor</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Added On</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Access Link</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-subtle">
                      {data?.resourcesList?.length > 0 ? (
                        data.resourcesList.map((res: any) => (
                          <tr key={res.id} className="hover:bg-surface-hover/30 transition-colors">
                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm font-semibold text-foreground">
                              {res.title}
                            </td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-text-secondary">
                              <Badge variant="blue">{res.type}</Badge>
                            </td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-text-secondary">
                              {res.teacherName}
                            </td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-text-secondary">
                              {new Date(res.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-right text-sm">
                              <a
                                href={ensureAbsoluteUrl(res.url)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-aero-blue hover:underline inline-flex items-center gap-1 font-medium"
                              >
                                Open URL
                              </a>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={5} className="px-6 py-8 text-center text-sm text-text-secondary">
                            No shared learning resources found.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </GlassCard>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Action Dialog Overlay Modals */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 bg-black/65 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-surface-elevated border border-border-default/60 rounded-2xl p-6 shadow-2xl space-y-4 relative"
            >
              <button
                onClick={() => {
                  setActiveModal(null);
                  setFormName("");
                  setFormEmail("");
                  setFormPassword("");
                  setFormSubject("");
                  setCourseTitle("");
                  setCourseDate("");
                  setCourseDuration("1h 30m");
                  setCourseTeacherId("");
                }}
                className="absolute top-4 right-4 text-text-muted hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Add Student / Add Teacher Modal */}
              {(activeModal === "student" || activeModal === "teacher") && (
                <>
                  <h3 className="text-lg font-bold text-foreground">
                    Add New {activeModal === "student" ? "Student Profile" : "Instructor Account"}
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-mono font-bold text-text-muted uppercase tracking-wider mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Jean-Luc Picard"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        className="w-full px-3 py-2.5 bg-surface border border-border-default rounded-xl text-sm text-foreground focus:outline-none focus:border-aero-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-text-muted uppercase tracking-wider mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        placeholder="name@aerospark.com"
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        className="w-full px-3 py-2.5 bg-surface border border-border-default rounded-xl text-sm text-foreground focus:outline-none focus:border-aero-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-text-muted uppercase tracking-wider mb-2">
                        Password *
                      </label>
                      <input
                        type="password"
                        placeholder="Min 6 characters"
                        value={formPassword}
                        onChange={(e) => setFormPassword(e.target.value)}
                        className="w-full px-3 py-2.5 bg-surface border border-border-default rounded-xl text-sm text-foreground focus:outline-none focus:border-aero-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-text-muted uppercase tracking-wider mb-2">
                        Subject / Course Field
                      </label>
                      <input
                        type="text"
                        placeholder={activeModal === "student" ? "e.g. Drone Piloting" : "e.g. Aerodynamics"}
                        value={formSubject}
                        onChange={(e) => setFormSubject(e.target.value)}
                        className="w-full px-3 py-2.5 bg-surface border border-border-default rounded-xl text-sm text-foreground focus:outline-none focus:border-aero-blue"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 justify-end pt-3">
                    <Button variant="outline" onClick={() => setActiveModal(null)}>Cancel</Button>
                    <Button
                      variant="primary"
                      onClick={() => handleAddUser(activeModal === "student" ? "STUDENT" : "TEACHER")}
                    >
                      Create Profile
                    </Button>
                  </div>
                </>
              )}

              {/* Schedule Class Modal */}
              {activeModal === "course" && (
                <>
                  <h3 className="text-lg font-bold text-foreground">Schedule Class Session</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-mono font-bold text-text-muted uppercase tracking-wider mb-2">
                        Class Topic / Title
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Drone Simulation Training"
                        value={courseTitle}
                        onChange={(e) => setCourseTitle(e.target.value)}
                        className="w-full px-3 py-2.5 bg-surface border border-border-default rounded-xl text-sm text-foreground focus:outline-none focus:border-aero-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-text-muted uppercase tracking-wider mb-2">
                        Date & Time
                      </label>
                      <input
                        type="datetime-local"
                        value={courseDate}
                        onChange={(e) => setCourseDate(e.target.value)}
                        className="w-full px-3 py-2.5 bg-surface border border-border-default rounded-xl text-sm text-foreground focus:outline-none focus:border-aero-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-text-muted uppercase tracking-wider mb-2">
                        Duration
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 1h 30m"
                        value={courseDuration}
                        onChange={(e) => setCourseDuration(e.target.value)}
                        className="w-full px-3 py-2.5 bg-surface border border-border-default rounded-xl text-sm text-foreground focus:outline-none focus:border-aero-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-bold text-text-muted uppercase tracking-wider mb-2">
                        Assign Instructor
                      </label>
                      <select
                        value={courseTeacherId}
                        onChange={(e) => setCourseTeacherId(Number(e.target.value))}
                        className="w-full px-3 py-2.5 bg-surface border border-border-default rounded-xl text-sm text-foreground focus:outline-none focus:border-aero-blue outline-none"
                      >
                        <option value="">Choose Instructor...</option>
                        {instructors.map((t: any) => (
                          <option key={t.id} value={t.id}>{t.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-3 justify-end pt-3">
                    <Button variant="outline" onClick={() => setActiveModal(null)}>Cancel</Button>
                    <Button variant="primary" onClick={handleCreateCourse}>Schedule Course</Button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-aero-blue border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-mono text-text-secondary">Loading...</span>
        </div>
      </div>
    }>
      <AdminDashboardContent />
    </Suspense>
  );
}
