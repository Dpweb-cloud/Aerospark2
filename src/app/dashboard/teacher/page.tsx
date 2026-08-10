"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard, StatCard, Badge } from "@/components/ui/cards";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn, ensureAbsoluteUrl } from "@/lib/utils";
import {
  getTeacherDashboardData,
  scheduleClassAction,
  checkNoteAction,
  uploadResourceAction,
  markAttendanceAction
} from "@/app/actions/dashboardActions";
import {
  Users,
  BookOpen,
  Plus,
  Upload,
  Calendar,
  Clock,
  FileText,
  Check,
  X,
  ExternalLink,
  ClipboardCheck,
  GraduationCap
} from "lucide-react";



function TeacherDashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get("tab") || "overview";

  // Data State
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [noteStatusFilter, setNoteStatusFilter] = useState<"ALL" | "PENDING" | "APPROVED" | "REJECTED">("PENDING");
  const [updatingNoteId, setUpdatingNoteId] = useState<number | null>(null);
  const [markingStudentId, setMarkingStudentId] = useState<number | null>(null);
  const [attendanceFilter, setAttendanceFilter] = useState<"ALL" | "PRESENT" | "ABSENT" | "UNMARKED">("ALL");

  // New Class Form State
  const [classTitle, setClassTitle] = useState("");
  const [classDate, setClassDate] = useState("");
  const [classTime, setClassTime] = useState("");
  const [classDuration, setClassDuration] = useState("");
  const [scheduling, setScheduling] = useState(false);

  // New Resource Form State
  const [resourceTitle, setResourceTitle] = useState("");
  const [resourceType, setResourceType] = useState("PDF");
  const [resourceUrl, setResourceUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  // Attendance Selector State
  const [selectedClassId, setSelectedClassId] = useState<number | null>(null);

  const fetchDashboardData = async () => {
    try {
      const res = await getTeacherDashboardData();
      if (res.redirect) {
        router.push(res.redirect);
        return;
      }
      if (res.success && res.data) {
        setData(res.data);
        // Default select first class if any
        if (res.data.classes?.length > 0 && selectedClassId === null) {
          setSelectedClassId(res.data.classes[0].id);
        }
      } else {
        toast.error(res.error || "Failed to load teacher dashboard data.");
      }
    } catch (err: any) {
      toast.error("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleScheduleClass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!classTitle || !classDate || !classTime || !classDuration) {
      toast.error("Please fill in all scheduling fields");
      return;
    }

    setScheduling(true);
    try {
      const combinedDateTime = `${classDate}T${classTime}`;
      const res = await scheduleClassAction(classTitle, combinedDateTime, classDuration);
      if (res.success) {
        toast.success("Class scheduled successfully!");
        setClassTitle("");
        setClassDate("");
        setClassTime("");
        setClassDuration("");
        fetchDashboardData();
      } else {
        toast.error(res.error || "Failed to schedule class");
      }
    } catch (err: any) {
      toast.error("Error scheduling class: " + err.message);
    } finally {
      setScheduling(false);
    }
  };

  const handleUploadResource = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resourceTitle || !resourceUrl) {
      toast.error("Please fill in all resource fields");
      return;
    }

    setUploading(true);
    try {
      const res = await uploadResourceAction(resourceTitle, resourceType, resourceUrl);
      if (res.success) {
        toast.success("Resource uploaded successfully!");
        setResourceTitle("");
        setResourceUrl("");
        fetchDashboardData();
      } else {
        toast.error(res.error || "Failed to upload resource");
      }
    } catch (err: any) {
      toast.error("Error uploading resource: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleCheckNote = async (noteId: number, status: "APPROVED" | "REJECTED" | "PENDING") => {
    setUpdatingNoteId(noteId);
    try {
      const res = await checkNoteAction(noteId, status);
      if (res.success) {
        toast.success(`Note submission ${status.toLowerCase()} successfully!`);
        await fetchDashboardData();
      } else {
        toast.error(res.error || "Review operation failed");
      }
    } catch (err: any) {
      toast.error("Error checking note: " + err.message);
    } finally {
      setUpdatingNoteId(null);
    }
  };

  const handleMarkAttendance = async (studentId: number, classId: number, status: "PRESENT" | "ABSENT") => {
    setMarkingStudentId(studentId);
    try {
      const res = await markAttendanceAction(studentId, classId, status);
      if (res.success) {
        toast.success(`Marked attendance successfully!`);
        await fetchDashboardData();
      } else {
        toast.error(res.error || "Attendance submission failed");
      }
    } catch (err: any) {
      toast.error("Error marking attendance: " + err.message);
    } finally {
      setMarkingStudentId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-aero-blue border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-mono text-text-secondary">Loading Instructor Dashboard...</span>
        </div>
      </div>
    );
  }

  const stats = data?.stats || {
    totalStudents: 0,
    classesCount: 0,
    resourcesCount: 0,
    pendingNotesToCheckCount: 0,
  };

  const selectedClass = data?.classes?.find((c: any) => c.id === selectedClassId);

  const presentCount = selectedClass?.students?.filter((s: any) => s.attendanceStatus === "PRESENT").length || 0;
  const absentCount = selectedClass?.students?.filter((s: any) => s.attendanceStatus === "ABSENT").length || 0;
  const unmarkedCount = selectedClass?.students?.filter((s: any) => s.attendanceStatus === "UNMARKED" || !s.attendanceStatus).length || 0;
  const allStudentsCount = selectedClass?.students?.length || 0;

  const filteredStudents = selectedClass?.students?.filter((s: any) => {
    if (attendanceFilter === "ALL") return true;
    if (attendanceFilter === "UNMARKED") {
      return s.attendanceStatus === "UNMARKED" || !s.attendanceStatus;
    }
    return s.attendanceStatus === attendanceFilter;
  }) || [];

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            Instructor Dashboard
          </h1>
          <p className="text-text-secondary mt-1">
            Manage student attendance, organize online schedule calendars, upload links, and review notes.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Active Students"
          value={stats.totalStudents.toString()}
          icon={<Users className="w-5 h-5 text-aero-blue" />}
          onClick={() => router.push("/dashboard/teacher?tab=attendance")}
        />
        <StatCard
          label="My Scheduled Classes"
          value={stats.classesCount.toString()}
          icon={<Calendar className="w-5 h-5 text-primary" />}
          onClick={() => router.push("/dashboard/teacher?tab=classes")}
        />
        <StatCard
          label="Notes Pending Review"
          value={stats.pendingNotesToCheckCount.toString()}
          icon={<FileText className="w-5 h-5 text-purple-500" />}
          onClick={() => router.push("/dashboard/teacher?tab=notes")}
        />
        <StatCard
          label="Resources Uploaded"
          value={stats.resourcesCount.toString()}
          icon={<BookOpen className="w-5 h-5 text-green-500" />}
          onClick={() => router.push("/dashboard/teacher?tab=resources")}
        />
      </div>

      {/* Tab Panels */}
      <AnimatePresence mode="wait">
        {activeTab === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Left: Schedule list */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Scheduled Classes Overview</h2>
              <GlassCard className="p-0 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-border-subtle bg-surface-elevated/50">
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Class Title</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Date & Time</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Duration</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Enrolled</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-subtle">
                      {data?.classes?.length > 0 ? (
                        data.classes.map((cls: any) => (
                          <tr key={cls.id} className="hover:bg-surface-hover/30 transition-colors">
                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm font-medium text-foreground">
                              {cls.title}
                            </td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-text-secondary">
                              {new Date(cls.date).toLocaleString()}
                            </td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-text-secondary">
                              {cls.duration}
                            </td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-text-secondary text-right">
                              {cls.students?.length || 0} Students
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="px-6 py-8 text-center text-sm text-text-secondary">
                            No classes scheduled yet.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </GlassCard>
            </div>

            {/* Right: Notes reviewing list summary */}
            <div className="space-y-6">
              {/* Salary Payment Status Widget */}
              <GlassCard className="p-5" glow="blue">
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-emerald-400" />
                  Salary Payment Status
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-secondary">Status:</span>
                  <Badge variant={stats.salaryStatus === "PAID" ? "green" : "red"}>
                    {stats.salaryStatus === "PAID" ? "SALARY PAID" : "UNPAID"}
                  </Badge>
                </div>
                {stats.salaryStatus !== "PAID" && (
                  <p className="text-[10px] text-text-muted mt-2">
                    Your salary payment is currently pending admin authorization. Please check back later.
                  </p>
                )}
              </GlassCard>

              <GlassCard className="p-5">
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-400" />
                  Notes Review Queue
                </h3>
                <div className="space-y-4">
                  {data?.notesToCheck?.slice(0, 3).map((note: any) => (
                    <div key={note.id} className="border-b border-border-subtle pb-3 last:border-0 last:pb-0 text-xs">
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <span className="font-semibold text-foreground truncate max-w-[130px]">{note.title}</span>
                        <a 
                          href={ensureAbsoluteUrl(note.filePath)} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          onClick={(e) => e.stopPropagation()}
                          className="text-[10px] text-aero-blue hover:underline inline-flex items-center gap-1"
                        >
                          View <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>
                      <p className="text-[10px] text-text-muted mb-2">By: {note.studentName}</p>
                      <div className="flex gap-2 justify-end">
                        {updatingNoteId === note.id ? (
                          <div className="flex items-center gap-1 text-[10px] text-text-muted">
                            <div className="w-3 h-3 border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
                            <span>Updating...</span>
                          </div>
                        ) : (
                          <>
                            <button
                              onClick={() => handleCheckNote(note.id, "APPROVED")}
                              className="bg-green-500/10 hover:bg-green-500/20 text-green-400 px-2 py-1 rounded text-[10px] font-semibold transition-colors flex items-center gap-0.5"
                            >
                              <Check className="w-2.5 h-2.5" /> Approve
                            </button>
                            <button
                              onClick={() => handleCheckNote(note.id, "REJECTED")}
                              className="bg-red-500/10 hover:bg-red-500/20 text-red-400 px-2 py-1 rounded text-[10px] font-semibold transition-colors flex items-center gap-0.5"
                            >
                              <X className="w-2.5 h-2.5" /> Reject
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                  {(!data?.notesToCheck || data.notesToCheck.length === 0) && (
                    <p className="text-xs text-text-secondary text-center py-4">No note submissions to review.</p>
                  )}
                </div>
              </GlassCard>
            </div>
          </motion.div>
        )}

        {/* Tab: Classes Scheduling */}
        {activeTab === "classes" && (
          <motion.div
            key="classes"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
          >
            {/* Form */}
            <div className="lg:col-span-4 space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Schedule a New Class</h2>
              <GlassCard className="p-5">
                <form onSubmit={handleScheduleClass} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-text-muted uppercase tracking-wider mb-2">
                      Class Title
                    </label>
                    <input
                      type="text"
                      value={classTitle}
                      onChange={(e) => setClassTitle(e.target.value)}
                      placeholder="e.g. Drone Control Theory"
                      className="w-full px-3 py-2 bg-surface border border-border-default rounded-xl text-sm text-foreground focus:outline-none focus:border-aero-blue"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold text-text-muted uppercase tracking-wider mb-2">
                      Date
                    </label>
                    <input
                      type="date"
                      value={classDate}
                      onChange={(e) => setClassDate(e.target.value)}
                      className="w-full px-3 py-2 bg-surface border border-border-default rounded-xl text-sm text-foreground focus:outline-none focus:border-aero-blue"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold text-text-muted uppercase tracking-wider mb-2">
                      Time
                    </label>
                    <input
                      type="time"
                      value={classTime}
                      onChange={(e) => setClassTime(e.target.value)}
                      className="w-full px-3 py-2 bg-surface border border-border-default rounded-xl text-sm text-foreground focus:outline-none focus:border-aero-blue"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold text-text-muted uppercase tracking-wider mb-2">
                      Duration
                    </label>
                    <input
                      type="text"
                      value={classDuration}
                      onChange={(e) => setClassDuration(e.target.value)}
                      placeholder="e.g. 1h 30m"
                      className="w-full px-3 py-2 bg-surface border border-border-default rounded-xl text-sm text-foreground focus:outline-none focus:border-aero-blue"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full py-2 shadow-md"
                    disabled={scheduling}
                  >
                    {scheduling ? "Creating Class..." : "Create Class Slot"}
                  </Button>
                </form>
              </GlassCard>
            </div>

            {/* List */}
            <div className="lg:col-span-8 space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Class Schedule Log</h2>
              <GlassCard className="p-0 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-border-subtle bg-surface-elevated/50">
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Title</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Date & Time</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Duration</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-subtle">
                      {data?.classes?.length > 0 ? (
                        data.classes.map((cls: any) => (
                          <tr key={cls.id} className="hover:bg-surface-hover/30 transition-colors">
                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm font-semibold text-foreground">
                              {cls.title}
                            </td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-text-secondary">
                              {new Date(cls.date).toLocaleString()}
                            </td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-text-secondary text-right">
                              {cls.duration}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={3} className="px-6 py-8 text-center text-sm text-text-secondary">
                            No classes scheduled.
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

        {/* Tab: Mark Attendance */}
        {activeTab === "attendance" && (
          <motion.div
            key="attendance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-foreground">Mark Student Attendance</h2>
              {data?.classes?.length > 0 && (
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-text-secondary uppercase">Select Class:</span>
                  <select
                    value={selectedClassId || ""}
                    onChange={(e) => setSelectedClassId(Number(e.target.value))}
                    className="bg-surface border border-border-default text-sm text-foreground rounded-xl px-3 py-1.5 focus:border-aero-blue outline-none"
                  >
                    {data.classes.map((cls: any) => (
                      <option key={cls.id} value={cls.id}>{cls.title}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {selectedClass && (
              <div className="flex flex-wrap gap-2 border-b border-border-subtle pb-2">
                <button
                  type="button"
                  onClick={() => setAttendanceFilter("ALL")}
                  className={cn(
                    "px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5",
                    attendanceFilter === "ALL"
                      ? "bg-aero-blue/10 text-aero-blue border border-aero-blue/20"
                      : "text-text-secondary hover:text-foreground hover:bg-surface-hover border border-transparent"
                  )}
                >
                  <span>All</span>
                  <Badge variant="default">{allStudentsCount}</Badge>
                </button>
                <button
                  type="button"
                  onClick={() => setAttendanceFilter("PRESENT")}
                  className={cn(
                    "px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5",
                    attendanceFilter === "PRESENT"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "text-text-secondary hover:text-foreground hover:bg-surface-hover border border-transparent"
                  )}
                >
                  <span>Present</span>
                  <Badge variant="green">{presentCount}</Badge>
                </button>
                <button
                  type="button"
                  onClick={() => setAttendanceFilter("ABSENT")}
                  className={cn(
                    "px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5",
                    attendanceFilter === "ABSENT"
                      ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                      : "text-text-secondary hover:text-foreground hover:bg-surface-hover border border-transparent"
                  )}
                >
                  <span>Absent</span>
                  <Badge variant="red">{absentCount}</Badge>
                </button>
                <button
                  type="button"
                  onClick={() => setAttendanceFilter("UNMARKED")}
                  className={cn(
                    "px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5",
                    attendanceFilter === "UNMARKED"
                      ? "bg-primary/10 text-primary border border-primary/20"
                      : "text-text-secondary hover:text-foreground hover:bg-surface-hover border border-transparent"
                  )}
                >
                  <span>Unmarked</span>
                  <Badge variant="blue">{unmarkedCount}</Badge>
                </button>
              </div>
            )}

            {selectedClass ? (
              <GlassCard className="p-0 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-border-subtle bg-surface-elevated/50">
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Student Name</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Email Address</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Attendance Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-subtle">
                      {filteredStudents.length > 0 ? (
                        filteredStudents.map((student: any) => (
                          <tr key={student.id} className="hover:bg-surface-hover/30 transition-colors">
                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm font-semibold text-foreground">
                              {student.name}
                            </td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-text-secondary">
                              {student.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <div className="flex items-center justify-end gap-2">
                                {markingStudentId === student.id ? (
                                  <div className="flex items-center gap-1.5 text-xs text-text-muted">
                                    <div className="w-3.5 h-3.5 border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
                                    <span>Saving...</span>
                                  </div>
                                ) : (
                                  <>
                                    <button
                                      type="button"
                                      onClick={() => handleMarkAttendance(student.id, selectedClass.id, "PRESENT")}
                                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all inline-flex items-center gap-1 border ${
                                        student.attendanceStatus === "PRESENT"
                                          ? "bg-green-500 text-white border-green-500 shadow-sm shadow-green-500/20"
                                          : "bg-green-500/10 hover:bg-green-500/20 text-green-400 border-green-500/10 hover:border-green-500/30"
                                      }`}
                                    >
                                      <Check className="w-3.5 h-3.5" /> Present
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleMarkAttendance(student.id, selectedClass.id, "ABSENT")}
                                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all inline-flex items-center gap-1 border ${
                                        student.attendanceStatus === "ABSENT"
                                          ? "bg-red-500 text-white border-red-500 shadow-sm shadow-red-500/20"
                                          : "bg-red-500/10 hover:bg-red-500/20 text-red-400 border-red-500/10 hover:border-red-500/30"
                                      }`}
                                    >
                                      <X className="w-3.5 h-3.5" /> Absent
                                    </button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={3} className="px-6 py-8 text-center text-sm text-text-secondary">
                            No students matching this filter.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </GlassCard>
            ) : (
              <div className="text-center py-12 glass-panel rounded-2xl">
                <ClipboardCheck className="w-12 h-12 text-text-muted mx-auto mb-3" />
                <h3 className="text-base font-semibold text-foreground mb-1">Select a Class Slot</h3>
                <p className="text-sm text-text-secondary">You need to schedule classes and assign students to register attendance.</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Tab: Resources Upload */}
        {activeTab === "resources" && (
          <motion.div
            key="resources"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
          >
            {/* Form */}
            <div className="lg:col-span-4 space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Upload Learning Resource</h2>
              <GlassCard className="p-5">
                <form onSubmit={handleUploadResource} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-text-muted uppercase tracking-wider mb-2">
                      Resource Title
                    </label>
                    <input
                      type="text"
                      value={resourceTitle}
                      onChange={(e) => setResourceTitle(e.target.value)}
                      placeholder="e.g. DGCA Airspace Map Guide"
                      className="w-full px-3 py-2 bg-surface border border-border-default rounded-xl text-sm text-foreground focus:outline-none focus:border-aero-blue"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold text-text-muted uppercase tracking-wider mb-2">
                      Resource Type
                    </label>
                    <select
                      value={resourceType}
                      onChange={(e) => setResourceType(e.target.value)}
                      className="w-full px-3 py-2 bg-surface border border-border-default rounded-xl text-sm text-foreground focus:outline-none focus:border-aero-blue outline-none"
                    >
                      <option value="PDF">PDF Document</option>
                      <option value="Link">Web Link</option>
                      <option value="ZIP">ZIP Archive</option>
                      <option value="Video">Video Tutorial</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold text-text-muted uppercase tracking-wider mb-2">
                      URL / File Link
                    </label>
                    <input
                      type="url"
                      value={resourceUrl}
                      onChange={(e) => setResourceUrl(e.target.value)}
                      placeholder="e.g. https://domain.com/file.pdf"
                      className="w-full px-3 py-2 bg-surface border border-border-default rounded-xl text-sm text-foreground focus:outline-none focus:border-aero-blue"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full py-2 shadow-md"
                    disabled={uploading}
                  >
                    {uploading ? "Uploading Resource..." : "Upload Resource"}
                  </Button>
                </form>
              </GlassCard>
            </div>

            {/* List */}
            <div className="lg:col-span-8 space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Resources Table</h2>
              <GlassCard className="p-0 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-border-subtle bg-surface-elevated/50">
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Title</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Type</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Added On</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Access Link</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-subtle">
                      {data?.resources?.length > 0 ? (
                        data.resources.map((res: any) => (
                          <tr key={res.id} className="hover:bg-surface-hover/30 transition-colors">
                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm font-semibold text-foreground">
                              {res.title}
                            </td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-text-secondary">
                              <Badge variant="blue">{res.type}</Badge>
                            </td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-text-secondary">
                              {new Date(res.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-right text-sm">
                              <a
                                href={ensureAbsoluteUrl(res.url)}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-aero-blue hover:underline inline-flex items-center gap-1"
                              >
                                Open URL <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="px-6 py-8 text-center text-sm text-text-secondary">
                            No shared resources uploaded yet.
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

        {/* Tab: Notes Review */}
        {activeTab === "notes" && (() => {
          const pendingCount = data?.notesToCheck?.filter((n: any) => n.status === "PENDING").length || 0;
          const approvedCount = data?.notesToCheck?.filter((n: any) => n.status === "APPROVED").length || 0;
          const rejectedCount = data?.notesToCheck?.filter((n: any) => n.status === "REJECTED").length || 0;
          const allCount = data?.notesToCheck?.length || 0;

          const filteredNotes = data?.notesToCheck?.filter((n: any) => {
            if (noteStatusFilter === "ALL") return true;
            return n.status === noteStatusFilter;
          }) || [];

          return (
            <motion.div
              key="notes"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <h2 className="text-lg font-semibold text-foreground">Student Notes Verification Queue</h2>
                
                {/* Notes Status Filters / Tabs */}
                <div className="flex flex-wrap gap-2 border-b border-border-subtle sm:border-b-0 pb-2 sm:pb-0">
                  <button
                    onClick={() => setNoteStatusFilter("PENDING")}
                    className={cn(
                      "px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5",
                      noteStatusFilter === "PENDING"
                        ? "bg-aero-blue/10 text-aero-blue border border-aero-blue/20"
                        : "text-text-secondary hover:text-foreground hover:bg-surface-hover border border-transparent"
                    )}
                  >
                    <span>Pending</span>
                    <Badge variant="blue">{pendingCount}</Badge>
                  </button>
                  <button
                    onClick={() => setNoteStatusFilter("APPROVED")}
                    className={cn(
                      "px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5",
                      noteStatusFilter === "APPROVED"
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                        : "text-text-secondary hover:text-foreground hover:bg-surface-hover border border-transparent"
                    )}
                  >
                    <span>Approved</span>
                    <Badge variant="green">{approvedCount}</Badge>
                  </button>
                  <button
                    onClick={() => setNoteStatusFilter("REJECTED")}
                    className={cn(
                      "px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5",
                      noteStatusFilter === "REJECTED"
                        ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                        : "text-text-secondary hover:text-foreground hover:bg-surface-hover border border-transparent"
                    )}
                  >
                    <span>Rejected</span>
                    <Badge variant="red">{rejectedCount}</Badge>
                  </button>
                  <button
                    onClick={() => setNoteStatusFilter("ALL")}
                    className={cn(
                      "px-3 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5",
                      noteStatusFilter === "ALL"
                        ? "bg-foreground/10 text-foreground border border-foreground/20"
                        : "text-text-secondary hover:text-foreground hover:bg-surface-hover border border-transparent"
                    )}
                  >
                    <span>All</span>
                    <Badge variant="default">{allCount}</Badge>
                  </button>
                </div>
              </div>

              <GlassCard className="p-0 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-border-subtle bg-surface-elevated/50">
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Note Title</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Student Name</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Email</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Date Submitted</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">File Access</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Review Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-subtle">
                      {filteredNotes.length > 0 ? (
                        filteredNotes.map((note: any) => (
                          <tr key={note.id} className="hover:bg-surface-hover/30 transition-colors">
                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm font-semibold text-foreground">
                              {note.title}
                            </td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-text-secondary">
                              {note.studentName}
                            </td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-text-secondary">
                              {note.studentEmail}
                            </td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-text-secondary">
                              {new Date(note.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm">
                              <a
                                href={ensureAbsoluteUrl(note.filePath)}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="text-aero-blue hover:underline inline-flex items-center gap-1.5"
                              >
                                Open Note File
                              </a>
                            </td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-right">
                              {updatingNoteId === note.id ? (
                                <div className="flex items-center justify-end gap-1.5 text-xs text-text-muted">
                                  <div className="w-3.5 h-3.5 border-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
                                  <span>Updating...</span>
                                </div>
                              ) : (
                                <select
                                  value={note.status}
                                  onChange={(e) => handleCheckNote(note.id, e.target.value as "APPROVED" | "REJECTED" | "PENDING")}
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
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="px-6 py-8 text-center text-sm text-text-secondary">
                            No notes found matching the selected status.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </GlassCard>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}

export default function TeacherDashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-aero-blue border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-mono text-text-secondary">Loading...</span>
        </div>
      </div>
    }>
      <TeacherDashboardContent />
    </Suspense>
  );
}
