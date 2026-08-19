"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { GlassCard, StatCard, Badge } from "@/components/ui/cards";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ensureAbsoluteUrl } from "@/lib/utils";
import {
  getStudentDashboardData,
  uploadNoteAction,
  submitQuizAction
} from "@/app/actions/dashboardActions";
import {
  Calendar,
  Upload,
  Award,
  HelpCircle,
  CheckCircle2,
  Clock,
  Download,
  AlertCircle,
  FileText,
  Play,
  Check,
  X,
  FileDown
} from "lucide-react";

interface Question {
  question: string;
  options: string[];
  answer: number; // index of correct option
}

interface Quiz {
  id: number;
  title: string;
  description: string;
  questions: Question[];
}



function StudentDashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get("tab") || "overview";

  // Data State
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Note Upload State
  const [noteTitle, setNoteTitle] = useState("");
  const [noteUrl, setNoteUrl] = useState("");
  const [uploadingNote, setUploadingNote] = useState(false);

  // Quiz Player State
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [submittingQuiz, setSubmittingQuiz] = useState(false);

  const fetchDashboardData = async () => {
    try {
      const res = await getStudentDashboardData();
      if (res.redirect) {
        router.push(res.redirect);
        return;
      }
      if (res.success) {
        setData(res.data);
      } else {
        toast.error(res.error || "Failed to load dashboard data");
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

  const handleUploadNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteTitle || !noteUrl) {
      toast.error("Please enter a title and a valid file link.");
      return;
    }

    setUploadingNote(true);
    try {
      const res = await uploadNoteAction(noteTitle, noteUrl);
      if (res.success) {
        toast.success("Note uploaded successfully! Pending teacher review.");
        setNoteTitle("");
        setNoteUrl("");
        fetchDashboardData();
      } else {
        toast.error(res.error || "Upload failed");
      }
    } catch (err: any) {
      toast.error("Error uploading note: " + err.message);
    } finally {
      setUploadingNote(false);
    }
  };

  const startQuiz = (quiz: Quiz) => {
    if (!quiz.questions || quiz.questions.length === 0) {
      toast.error("This quiz does not have any questions.");
      return;
    }
    setActiveQuiz(quiz);
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setScore(0);
    setQuizCompleted(false);
  };

  const handleNextQuestion = async () => {
    if (selectedOption === null) return;

    // Check answer
    const currentQuestion = activeQuiz!.questions[currentQuestionIdx];
    let newScore = score;
    if (selectedOption === currentQuestion.answer) {
      newScore += 1;
      setScore(newScore);
    }

    if (currentQuestionIdx + 1 < activeQuiz!.questions.length) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
      setSelectedOption(null);
    } else {
      // Quiz finished
      setQuizCompleted(true);
      setSubmittingQuiz(true);
      try {
        const res = await submitQuizAction(activeQuiz!.id, newScore, activeQuiz!.questions.length);
        if (res.success) {
          toast.success(`Quiz completed! You scored ${newScore}/${activeQuiz!.questions.length}`);
          fetchDashboardData();
        } else {
          toast.error(res.error || "Failed to save quiz score.");
        }
      } catch (err: any) {
        toast.error("Error submitting score: " + err.message);
      } finally {
        setSubmittingQuiz(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-aero-blue border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-mono text-text-secondary">Loading Dashboard Data...</span>
        </div>
      </div>
    );
  }

  // Pre-compiled stats with defaults
  const stats = data?.stats || {
    attendanceRate: "100%",
    activeClassesCount: 0,
    notesCount: 0,
    certificatesCount: 0,
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            Student Portal
          </h1>
          <p className="text-text-secondary mt-1">
            Access your performance records, upload notes, download certificates, and take quizzes.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Attendance Rate"
          value={stats.attendanceRate}
          icon={<Calendar className="w-5 h-5 text-aero-blue" />}
          onClick={() => router.push("/dashboard?tab=attendance")}
        />
        <StatCard
          label="Scheduled Classes"
          value={stats.activeClassesCount.toString()}
          icon={<Clock className="w-5 h-5 text-primary" />}
          onClick={() => router.push("/dashboard")}
        />
        <StatCard
          label="Uploaded Notes"
          value={stats.notesCount.toString()}
          icon={<Upload className="w-5 h-5 text-purple-500" />}
          onClick={() => router.push("/dashboard?tab=notes")}
        />
        <StatCard
          label="Certificates Awarded"
          value={stats.certificatesCount.toString()}
          icon={<Award className="w-5 h-5 text-green-500" />}
          onClick={() => router.push("/dashboard?tab=certificates")}
        />
      </div>

      {/* Dynamic Tab Views */}
      <AnimatePresence mode="wait">
        {activeTab === "overview" && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Class Schedule */}
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Upcoming Schedule</h2>
              <GlassCard className="space-y-4">
                {data?.schedule?.length > 0 ? (
                  data.schedule.map((item: any) => (
                    <div
                      key={item.id}
                      className="flex gap-4 items-start pb-4 border-b border-border-subtle last:border-0 last:pb-0"
                    >
                      <div className="text-center min-w-[70px] pt-1">
                        <span className="block text-sm font-semibold text-foreground">
                          {new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </span>
                        <span className="text-[10px] text-text-muted uppercase">
                          {new Date(item.date).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground mb-1">
                          {item.title}
                        </p>
                        <p className="text-xs text-text-secondary mb-2">Instructor: {item.teacherName}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="blue">{item.duration}</Badge>
                          <Badge variant={item.status === 'PRESENT' ? 'green' : item.status === 'ABSENT' ? 'red' : 'default'}>
                            {item.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-text-secondary text-sm">
                    No upcoming classes scheduled.
                  </div>
                )}
              </GlassCard>
            </div>

            {/* Side Column widgets */}
            <div className="space-y-6">
              {/* Fee Payment Status Widget */}
              <GlassCard className="p-5" glow="blue">
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-aero-blue" />
                  Fee Payment Status
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-secondary">Fee Record:</span>
                  <Badge variant={stats.feeStatus === "PAID" ? "green" : stats.feeStatus === "PENDING" ? "blue" : "red"}>
                    {stats.feeStatus || "UNPAID"}
                  </Badge>
                </div>
                {stats.feeStatus !== "PAID" && (
                  <p className="text-[10px] text-text-muted mt-2">
                    Please submit your program fees. Contact the administrator to manually verify and update your paid status.
                  </p>
                )}
              </GlassCard>

              {/* Quick note summary widget */}
              <GlassCard className="p-5">
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-aero-blue" />
                  Uploaded Notes Status
                </h3>
                <div className="space-y-3">
                  {data?.notes?.slice(0, 3).map((note: any) => (
                    <div key={note.id} className="flex justify-between items-center text-xs pb-2 border-b border-border-subtle last:border-0 last:pb-0">
                      <span className="font-medium text-foreground truncate max-w-[150px]">{note.title}</span>
                      <Badge variant={note.status === 'APPROVED' ? 'green' : note.status === 'REJECTED' ? 'red' : 'blue'}>
                        {note.status}
                      </Badge>
                    </div>
                  ))}
                  {(!data?.notes || data.notes.length === 0) && (
                    <p className="text-xs text-text-secondary text-center py-2">No notes uploaded yet.</p>
                  )}
                </div>
              </GlassCard>

              {/* Certificates Quick list */}
              <GlassCard className="p-5">
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Award className="w-4 h-4 text-green-400" />
                  Recent Credentials
                </h3>
                <div className="space-y-3">
                  {data?.certificates?.slice(0, 2).map((cert: any) => (
                    <div key={cert.id} className="flex justify-between items-center text-xs pb-2 border-b border-border-subtle last:border-0 last:pb-0">
                      <div>
                        <p className="font-semibold text-foreground truncate max-w-[150px]">{cert.title}</p>
                        <p className="text-[10px] text-text-muted">{new Date(cert.date).toLocaleDateString()}</p>
                      </div>
                      <a href={cert.filePath} target="_blank" rel="noopener noreferrer" className="text-aero-blue hover:underline">
                        View
                      </a>
                    </div>
                  ))}
                  {(!data?.certificates || data.certificates.length === 0) && (
                    <p className="text-xs text-text-secondary text-center py-2">No certificates awarded yet.</p>
                  )}
                </div>
              </GlassCard>
            </div>
          </motion.div>
        )}

        {/* Tab: Attendance */}
        {activeTab === "attendance" && (
          <motion.div
            key="attendance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <h2 className="text-lg font-semibold text-foreground">Attendance Records</h2>
            <GlassCard className="p-0 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border-subtle bg-surface-elevated/50">
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Class Topic</th>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Date & Time</th>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Duration</th>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Teacher</th>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle">
                    {data?.schedule?.length > 0 ? (
                      data.schedule.map((item: any) => (
                        <tr key={item.id} className="hover:bg-surface-hover/30 transition-colors">
                          <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm font-medium text-foreground">
                            {item.title}
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-text-secondary">
                            {new Date(item.date).toLocaleString()}
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-text-secondary">
                            {item.duration}
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-text-secondary">
                            {item.teacherName}
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-right">
                            <Badge variant={item.status === "PRESENT" ? "green" : item.status === "ABSENT" ? "red" : "default"}>
                              {item.status}
                            </Badge>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-8 text-center text-sm text-text-secondary">
                          No attendance records found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </motion.div>
        )}

        {/* Tab: Notes Upload */}
        {activeTab === "notes" && (
          <motion.div
            key="notes"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
          >
            {/* Upload Note Form */}
            <div className="lg:col-span-4 space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Upload Learning Notes</h2>
              <GlassCard className="p-5 border border-border-default/60">
                <form onSubmit={handleUploadNote} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono font-bold text-text-muted uppercase tracking-wider mb-2">
                      Note Title
                    </label>
                    <input
                      type="text"
                      value={noteTitle}
                      onChange={(e) => setNoteTitle(e.target.value)}
                      placeholder="e.g. Aerodynamics Week 1 Notes"
                      className="w-full px-3 py-2 bg-surface border border-border-default rounded-xl text-sm text-foreground focus:outline-none focus:border-aero-blue"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono font-bold text-text-muted uppercase tracking-wider mb-2">
                      Document Link / URL
                    </label>
                    <input
                      type="url"
                      value={noteUrl}
                      onChange={(e) => setNoteUrl(e.target.value)}
                      placeholder="e.g. https://drive.google.com/..."
                      className="w-full px-3 py-2 bg-surface border border-border-default rounded-xl text-sm text-foreground focus:outline-none focus:border-aero-blue"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full py-2 shadow-md shadow-aero-blue/20 flex items-center justify-center gap-2"
                    disabled={uploadingNote}
                  >
                    {uploadingNote ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      "Submit for Verification"
                    )}
                  </Button>
                </form>
              </GlassCard>
            </div>

            {/* Note logs */}
            <div className="lg:col-span-8 space-y-4">
              <h2 className="text-lg font-semibold text-foreground">My Submissions</h2>
              <GlassCard className="p-0 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-border-subtle bg-surface-elevated/50">
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Note Title</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">Submitted On</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider">File URL</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider text-right">Review Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-subtle">
                      {data?.notes?.length > 0 ? (
                        data.notes.map((note: any) => (
                          <tr key={note.id} className="hover:bg-surface-hover/30 transition-colors">
                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm font-medium text-foreground">
                              {note.title}
                            </td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm text-text-secondary">
                              {new Date(note.createdAt).toLocaleDateString()}
                            </td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-sm">
                              <a
                                href={ensureAbsoluteUrl(note.filePath)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-aero-blue hover:underline inline-flex items-center gap-1.5"
                              >
                                View File
                              </a>
                            </td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-right">
                              <Badge variant={note.status === 'APPROVED' ? 'green' : note.status === 'REJECTED' ? 'red' : 'blue'}>
                                {note.status}
                              </Badge>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="px-6 py-8 text-center text-sm text-text-secondary">
                            No notes uploaded yet.
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

        {/* Tab: Certificates */}
        {activeTab === "certificates" && (
          <motion.div
            key="certificates"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-4"
          >
            <h2 className="text-lg font-semibold text-foreground">My Certificates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {data?.certificates?.length > 0 ? (
                data.certificates.map((cert: any) => (
                  <GlassCard key={cert.id} className="p-5 flex flex-col justify-between group hover:border-aero-blue/30 transition-colors h-full">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-aero-blue/10 flex items-center justify-center mb-4 border border-aero-blue/10 group-hover:scale-105 transition-transform">
                        <Award className="w-6 h-6 text-aero-blue" />
                      </div>
                      <h3 className="text-base font-bold text-foreground mb-1 group-hover:text-aero-blue transition-colors">
                        {cert.title}
                      </h3>
                      <p className="text-xs text-text-secondary mb-4">
                        Issued: {new Date(cert.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                    {cert.filePath && (
                      <Button variant="secondary" size="sm" href={cert.filePath} className="w-full mt-2 inline-flex items-center justify-center gap-2">
                        <Download className="w-4 h-4" /> Download Certificate
                      </Button>
                    )}
                  </GlassCard>
                ))
              ) : (
                <div className="col-span-full py-12 text-center">
                  <Award className="w-12 h-12 text-text-muted mx-auto mb-3" />
                  <h3 className="text-base font-medium text-foreground mb-1">No Certificates Yet</h3>
                  <p className="text-sm text-text-secondary">Complete classes and pass quizzes to unlock digital certificates.</p>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* Tab: Quizzes */}
        {activeTab === "quizzes" && (
          <motion.div
            key="quizzes"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
          >
            {/* Quiz Player Modal/Overlay */}
            <AnimatePresence>
              {activeQuiz && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md flex items-center justify-center p-4"
                >
                  <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="w-full max-w-lg glass-panel p-6 border border-border-default/80 rounded-2xl relative shadow-2xl"
                  >
                    <button
                      onClick={() => setActiveQuiz(null)}
                      className="absolute top-4 right-4 p-1.5 rounded-lg text-text-secondary hover:text-foreground hover:bg-surface-hover transition-colors"
                      disabled={submittingQuiz}
                    >
                      <X className="w-4 h-4" />
                    </button>

                    {!quizCompleted ? (
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-xs font-mono font-bold text-aero-blue uppercase tracking-wider">
                            Question {currentQuestionIdx + 1} of {activeQuiz.questions.length}
                          </span>
                          <span className="text-xs text-text-muted">
                            {activeQuiz.title}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-foreground mb-5">
                          {activeQuiz.questions[currentQuestionIdx].question}
                        </h3>

                        <div className="space-y-3 mb-6">
                          {activeQuiz.questions[currentQuestionIdx].options.map((opt, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setSelectedOption(i)}
                              className={`w-full text-left p-3.5 rounded-xl border text-sm font-medium transition-all duration-300 flex items-center justify-between ${
                                selectedOption === i
                                  ? "bg-aero-blue/15 border-aero-blue/50 text-foreground"
                                  : "bg-surface/50 border-border-default text-text-secondary hover:border-border-default/80 hover:bg-surface-hover/20"
                              }`}
                            >
                              <span>{opt}</span>
                              {selectedOption === i && <CheckCircle2 className="w-4 h-4 text-aero-blue" />}
                            </button>
                          ))}
                        </div>

                        <Button
                          type="button"
                          variant="primary"
                          onClick={handleNextQuestion}
                          className="w-full py-2 shadow-lg shadow-aero-blue/20"
                          disabled={selectedOption === null}
                        >
                          {currentQuestionIdx + 1 === activeQuiz.questions.length ? "Finish Quiz" : "Next Question"}
                        </Button>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4 border border-green-500/10 animate-bounce">
                          <Check className="w-8 h-8 text-green-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-foreground mb-2">Quiz Finished!</h2>
                        <p className="text-sm text-text-secondary mb-5">
                          You scored <span className="text-foreground font-bold">{score}</span> out of{" "}
                          <span className="text-foreground font-bold">{activeQuiz.questions.length}</span>.
                        </p>
                        <Button
                          type="button"
                          variant="secondary"
                          onClick={() => setActiveQuiz(null)}
                          className="w-full"
                          disabled={submittingQuiz}
                        >
                          Close Player
                        </Button>
                      </div>
                    )}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quiz selection list */}
            <div className="lg:col-span-7 space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Available Quizzes</h2>
              <div className="grid grid-cols-1 gap-4">
                {data?.quizzes?.length > 0 ? (
                  data.quizzes.map((quiz: Quiz) => (
                    <GlassCard key={quiz.id} className="p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-4 group hover:border-aero-blue/30 transition-colors">
                      <div>
                        <h3 className="text-base font-bold text-foreground mb-1 group-hover:text-aero-blue transition-colors">
                          {quiz.title}
                        </h3>
                        <p className="text-xs text-text-secondary mb-2">{quiz.description}</p>
                        <Badge variant="blue">{quiz.questions?.length || 0} Questions</Badge>
                      </div>
                      <Button
                        type="button"
                        variant="primary"
                        onClick={() => startQuiz(quiz)}
                        className="shrink-0 inline-flex items-center gap-1.5 self-start sm:self-center"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" /> Start Quiz
                      </Button>
                    </GlassCard>
                  ))
                ) : (
                  <div className="py-8 text-center text-sm text-text-secondary">
                    No quizzes uploaded yet.
                  </div>
                )}
              </div>
            </div>

            {/* Quiz submission logs */}
            <div className="lg:col-span-5 space-y-4">
              <h2 className="text-lg font-semibold text-foreground">Attempt History</h2>
              <GlassCard className="p-0 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-border-subtle bg-surface-elevated/50">
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider font-bold">Quiz</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider font-bold text-right">Score</th>
                        <th className="px-3 sm:px-6 py-3 sm:py-4 text-xs font-semibold text-text-muted uppercase tracking-wider font-bold text-right">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-subtle text-xs">
                      {data?.submissions?.length > 0 ? (
                        data.submissions.map((sub: any) => (
                          <tr key={sub.id} className="hover:bg-surface-hover/30 transition-colors">
                            <td className="px-3 sm:px-6 py-3 sm:py-4 font-medium text-foreground truncate max-w-[120px]">
                              {sub.quizTitle}
                            </td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 text-right font-semibold text-foreground">
                              {sub.score} / {sub.totalQuestions}
                            </td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 text-right text-text-secondary">
                              {new Date(sub.submittedAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={3} className="px-6 py-6 text-center text-text-secondary">
                            No quiz submissions found.
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
    </div>
  );
}

export default function StudentDashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-aero-blue border-t-transparent rounded-full animate-spin" />
          <span className="text-sm font-mono text-text-secondary">Loading...</span>
        </div>
      </div>
    }>
      <StudentDashboardContent />
    </Suspense>
  );
}
