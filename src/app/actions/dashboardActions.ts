"use server";

import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

// Helper to get active user and verify role
async function getVerifiedSession(allowedRoles: ("STUDENT" | "TEACHER" | "ADMIN")[]) {
  const session = await getSession();
  if (!session || !session.id) {
    throw new Error("Unauthorized: Please log in.");
  }
  const role = session.role as "STUDENT" | "TEACHER" | "ADMIN";
  if (!allowedRoles.includes(role)) {
    throw new Error("Forbidden: You do not have permission to perform this action.");
  }
  return session;
}

// ==========================================
// STUDENT ACTIONS
// ==========================================
export async function getStudentDashboardData() {
  try {
    const session = await getVerifiedSession(["STUDENT"]);
    const studentId = session.id as number;

    // Fetch classes
    const classes = await prisma.class.findMany({
      where: {
        students: {
          some: { id: studentId }
        }
      },
      include: {
        teacher: { select: { name: true } },
        attendance: { where: { studentId } }
      },
      orderBy: { date: "asc" }
    });

    // Calculate attendance percentage
    const totalClasses = classes.length;
    const attendedClasses = classes.filter(c => c.attendance.some(a => a.status === "PRESENT")).length;
    const attendancePercentage = totalClasses > 0 ? Math.round((attendedClasses / totalClasses) * 100) : 100;

    // Fetch notes uploaded by student
    const notes = await prisma.note.findMany({
      where: { uploadedById: studentId },
      orderBy: { createdAt: "desc" }
    });

    // Fetch certificates
    const certificates = await prisma.certificate.findMany({
      where: { studentId },
      orderBy: { date: "desc" }
    });

    // Fetch quiz submissions
    const submissions = await prisma.quizSubmission.findMany({
      where: { studentId },
      include: { quiz: true },
      orderBy: { submittedAt: "desc" }
    });

    // Fetch general quizzes
    const quizzes = await prisma.quiz.findMany();

    return {
      success: true,
      data: {
        stats: {
          attendanceRate: `${attendancePercentage}%`,
          activeClassesCount: totalClasses,
          notesCount: notes.length,
          certificatesCount: certificates.length,
        },
        schedule: classes.map(c => ({
          id: c.id,
          title: c.title,
          date: c.date,
          duration: c.duration,
          teacherName: c.teacher?.name || "Instructor",
          status: c.attendance[0]?.status || "UNMARKED"
        })),
        notes: notes.map(n => ({
          id: n.id,
          title: n.title,
          filePath: n.filePath,
          status: n.status,
          createdAt: n.createdAt
        })),
        certificates: certificates.map(c => ({
          id: c.id,
          title: c.title,
          date: c.date,
          filePath: c.filePath
        })),
        submissions: submissions.map(s => ({
          id: s.id,
          quizTitle: s.quiz.title,
          score: s.score,
          totalQuestions: s.totalQuestions,
          submittedAt: s.submittedAt
        })),
        quizzes: quizzes.map(q => ({
          id: q.id,
          title: q.title,
          description: q.description,
          questions: JSON.parse(q.questionsJson || "[]")
        }))
      }
    };
  } catch (error: any) {
    console.error("Student dashboard fetch error:", error);
    return { success: false, error: error.message };
  }
}

export async function uploadNoteAction(title: string, filePath: string) {
  try {
    const session = await getVerifiedSession(["STUDENT"]);
    const studentId = session.id as number;

    const note = await prisma.note.create({
      data: {
        title,
        filePath,
        uploadedById: studentId,
        status: "PENDING"
      }
    });

    return { success: true, data: note };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function submitQuizAction(quizId: number, score: number, totalQuestions: number) {
  try {
    const session = await getVerifiedSession(["STUDENT"]);
    const studentId = session.id as number;

    const submission = await prisma.quizSubmission.create({
      data: {
        quizId,
        studentId,
        score,
        totalQuestions
      }
    });

    return { success: true, data: submission };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// ==========================================
// TEACHER ACTIONS
// ==========================================
export async function getTeacherDashboardData() {
  try {
    const session = await getVerifiedSession(["TEACHER"]);
    const teacherId = session.id as number;

    // Fetch classes taught by teacher
    const classes = await prisma.class.findMany({
      where: { teacherId },
      include: {
        students: { select: { id: true, name: true, email: true } },
        attendance: true
      },
      orderBy: { date: "asc" }
    });

    // Fetch pending notes across the platform for reviewing
    const notesToCheck = await prisma.note.findMany({
      where: { status: "PENDING" },
      include: { uploadedBy: { select: { name: true, email: true } } },
      orderBy: { createdAt: "desc" }
    });

    // Fetch resources uploaded by this teacher
    const resources = await prisma.resource.findMany({
      where: { teacherId },
      orderBy: { createdAt: "desc" }
    });

    // Count all distinct students in teacher's classes
    const studentIds = new Set<number>();
    classes.forEach(c => c.students.forEach(s => studentIds.add(s.id)));

    return {
      success: true,
      data: {
        stats: {
          totalStudents: studentIds.size,
          classesCount: classes.length,
          resourcesCount: resources.length,
          pendingNotesToCheckCount: notesToCheck.length,
        },
        classes: classes.map(c => ({
          id: c.id,
          title: c.title,
          date: c.date,
          duration: c.duration,
          students: c.students.map(s => {
            const record = c.attendance.find(a => a.studentId === s.id);
            return {
              id: s.id,
              name: s.name,
              email: s.email,
              attendanceStatus: record ? record.status : "UNMARKED"
            };
          }),
          attendanceCount: c.attendance.length
        })),
        notesToCheck: notesToCheck.map(n => ({
          id: n.id,
          title: n.title,
          filePath: n.filePath,
          studentName: n.uploadedBy.name || "Student",
          studentEmail: n.uploadedBy.email,
          createdAt: n.createdAt
        })),
        resources: resources.map(r => ({
          id: r.id,
          title: r.title,
          type: r.type,
          url: r.url,
          createdAt: r.createdAt
        }))
      }
    };
  } catch (error: any) {
    console.error("Teacher dashboard fetch error:", error);
    return { success: false, error: error.message };
  }
}

export async function scheduleClassAction(title: string, dateStr: string, duration: string) {
  try {
    const session = await getVerifiedSession(["TEACHER"]);
    const teacherId = session.id as number;

    const newClass = await prisma.class.create({
      data: {
        title,
        date: new Date(dateStr),
        duration,
        teacherId
      }
    });

    return { success: true, data: newClass };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function checkNoteAction(noteId: number, status: "APPROVED" | "REJECTED") {
  try {
    await getVerifiedSession(["TEACHER", "ADMIN"]);

    const note = await prisma.note.update({
      where: { id: noteId },
      data: { status }
    });

    return { success: true, data: note };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function uploadResourceAction(title: string, type: string, url: string) {
  try {
    const session = await getVerifiedSession(["TEACHER"]);
    const teacherId = session.id as number;

    const resource = await prisma.resource.create({
      data: {
        title,
        type,
        url,
        teacherId
      }
    });

    return { success: true, data: resource };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function markAttendanceAction(studentId: number, classId: number, status: "PRESENT" | "ABSENT") {
  try {
    await getVerifiedSession(["TEACHER"]);

    // Check if attendance record already exists
    const existing = await prisma.attendance.findFirst({
      where: { studentId, classId }
    });

    let attendance;
    if (existing) {
      attendance = await prisma.attendance.update({
        where: { id: existing.id },
        data: { status }
      });
    } else {
      attendance = await prisma.attendance.create({
        data: {
          studentId,
          classId,
          status
        }
      });
    }

    return { success: true, data: attendance };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

// ==========================================
// ADMIN ACTIONS
// ==========================================
export async function getAdminDashboardData() {
  try {
    await getVerifiedSession(["ADMIN"]);

    // Fetch platform stats
    const totalUsers = await prisma.user.count();
    const studentsCount = await prisma.user.count({ where: { role: "STUDENT" } });
    const teachersCount = await prisma.user.count({ where: { role: "TEACHER" } });
    const verifiedUsersCount = await prisma.user.count({ where: { isVerified: true } });
    const totalClasses = await prisma.class.count();
    const totalNotes = await prisma.note.count();

    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        isVerified: true,
        createdAt: true,
        subject: true
      },
      orderBy: { createdAt: "desc" },
      take: 50
    });

    const recentNotes = await prisma.note.findMany({
      include: { uploadedBy: { select: { name: true } } },
      orderBy: { createdAt: "desc" },
      take: 10
    });

    const classes = await prisma.class.findMany({
      include: { teacher: { select: { name: true } } },
      orderBy: { date: "desc" }
    });

    return {
      success: true,
      data: {
        stats: {
          totalUsers,
          studentsCount,
          teachersCount,
          verifiedUsersCount,
          totalClasses,
          totalNotes
        },
        usersList: users.map(u => ({
          id: u.id,
          name: u.name || "Anonymous",
          email: u.email,
          role: u.role,
          isVerified: u.isVerified,
          createdAt: u.createdAt,
          subject: u.subject
        })),
        notes: recentNotes.map(n => ({
          id: n.id,
          title: n.title,
          studentName: n.uploadedBy.name || "Student",
          status: n.status,
          createdAt: n.createdAt
        })),
        classesList: classes.map(c => ({
          id: c.id,
          title: c.title,
          date: c.date,
          duration: c.duration,
          teacherName: c.teacher?.name || "Instructor"
        }))
      }
    };
  } catch (error: any) {
    console.error("Admin dashboard fetch error:", error);
    return { success: false, error: error.message };
  }
}

// ==========================================
// SETTINGS ACTIONS
// ==========================================
import bcrypt from "bcryptjs";

export async function getUserSettingsAction() {
  try {
    const session = await getSession();
    if (!session || !session.id) {
      return {
        success: true,
        data: {
          firstName: "Student",
          lastName: "AeroSpark",
          email: "student@aerospark.com",
          emailAlerts: true,
          assignmentAlerts: true,
          classReminders: false,
          accentTheme: "blue"
        },
        mock: true
      };
    }

    const user = await prisma.user.findUnique({
      where: { id: session.id as number }
    });

    if (!user) {
      throw new Error("User not found.");
    }

    // Split name
    const nameParts = (user.name || "Student AeroSpark").split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    return {
      success: true,
      data: {
        firstName,
        lastName,
        email: user.email,
        emailAlerts: user.emailAlerts,
        assignmentAlerts: user.assignmentAlerts,
        classReminders: user.classReminders,
        accentTheme: user.accentTheme
      }
    };
  } catch (error: any) {
    // Graceful fallback for local dev offline DB
    console.warn("DB offline, falling back to mock settings data:", error.message);
    return {
      success: true,
      data: {
        firstName: "Student",
        lastName: "AeroSpark",
        email: "student@aerospark.com",
        emailAlerts: true,
        assignmentAlerts: true,
        classReminders: false,
        accentTheme: "blue"
      },
      mock: true
    };
  }
}

export async function updateProfileSettingsAction(firstName: string, lastName: string, email: string) {
  try {
    const session = await getSession();
    if (!session || !session.id) {
      throw new Error("Unauthorized: Please log in.");
    }

    const fullName = `${firstName} ${lastName}`.trim();
    await prisma.user.update({
      where: { id: session.id as number },
      data: {
        name: fullName,
        email
      }
    });

    return { success: true };
  } catch (error: any) {
    if (error.message.includes("Can't reach database") || error.message.includes("DATABASE_URL") || error.message.includes("PrismaClient")) {
      return { success: true, mock: true };
    }
    return { success: false, error: error.message };
  }
}

export async function updateSecuritySettingsAction(currentPass: string, newPass: string) {
  try {
    const session = await getSession();
    if (!session || !session.id) {
      throw new Error("Unauthorized: Please log in.");
    }

    const user = await prisma.user.findUnique({
      where: { id: session.id as number }
    });

    if (!user) {
      throw new Error("User not found.");
    }

    const passMatch = await bcrypt.compare(currentPass, user.password);
    if (!passMatch) {
      throw new Error("Current password is incorrect.");
    }

    const newHashedPassword = await bcrypt.hash(newPass, 10);
    await prisma.user.update({
      where: { id: session.id as number },
      data: { password: newHashedPassword }
    });

    return { success: true };
  } catch (error: any) {
    if (error.message.includes("Can't reach database") || error.message.includes("DATABASE_URL") || error.message.includes("PrismaClient")) {
      return { success: true, mock: true };
    }
    return { success: false, error: error.message };
  }
}

export async function updateNotificationSettingsAction(emailAlerts: boolean, assignmentAlerts: boolean, classReminders: boolean) {
  try {
    const session = await getSession();
    if (!session || !session.id) {
      throw new Error("Unauthorized: Please log in.");
    }

    await prisma.user.update({
      where: { id: session.id as number },
      data: {
        emailAlerts,
        assignmentAlerts,
        classReminders
      }
    });

    return { success: true };
  } catch (error: any) {
    if (error.message.includes("Can't reach database") || error.message.includes("DATABASE_URL") || error.message.includes("PrismaClient")) {
      return { success: true, mock: true };
    }
    return { success: false, error: error.message };
  }
}

export async function updateAppearanceSettingsAction(accentTheme: string) {
  try {
    const session = await getSession();
    if (!session || !session.id) {
      throw new Error("Unauthorized: Please log in.");
    }

    await prisma.user.update({
      where: { id: session.id as number },
      data: {
        accentTheme
      }
    });

    return { success: true };
  } catch (error: any) {
    if (error.message.includes("Can't reach database") || error.message.includes("DATABASE_URL") || error.message.includes("PrismaClient")) {
      return { success: true, mock: true };
    }
    return { success: false, error: error.message };
  }
}

export async function adminAddUserAction(
  name: string,
  email: string,
  password: string,
  role: "STUDENT" | "TEACHER",
  subject?: string
) {
  try {
    await getVerifiedSession(["ADMIN"]);
    const hashedPassword = await bcrypt.hash(password || "password123", 10);

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
        role,
        subject: subject || null,
        isVerified: true
      }
    });

    return { success: true, data: user };
  } catch (error: any) {
    if (error.message.includes("Can't reach database") || error.message.includes("DATABASE_URL") || error.message.includes("PrismaClient")) {
      return { success: true, mock: true };
    }
    return { success: false, error: error.message };
  }
}

export async function adminDeleteUserAction(userId: number) {
  try {
    const session = await getSession();
    if (!session || !session.id) {
      throw new Error("Unauthorized: Please log in.");
    }
    
    // Prevent admin from deleting themselves
    if (session.id === userId) {
      throw new Error("You cannot delete your own admin account.");
    }

    await prisma.user.delete({
      where: { id: userId }
    });

    return { success: true };
  } catch (error: any) {
    if (error.message.includes("Can't reach database") || error.message.includes("DATABASE_URL") || error.message.includes("PrismaClient")) {
      return { success: true, mock: true };
    }
    return { success: false, error: error.message };
  }
}

export async function adminCreateClassAction(title: string, dateStr: string, duration: string, teacherId: number) {
  try {
    await getVerifiedSession(["ADMIN"]);

    const newClass = await prisma.class.create({
      data: {
        title,
        date: new Date(dateStr),
        duration,
        teacherId
      }
    });

    return { success: true, data: newClass };
  } catch (error: any) {
    if (error.message.includes("Can't reach database") || error.message.includes("DATABASE_URL") || error.message.includes("PrismaClient")) {
      return { success: true, mock: true };
    }
    return { success: false, error: error.message };
  }
}
