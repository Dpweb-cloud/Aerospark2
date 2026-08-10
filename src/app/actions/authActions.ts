"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/lib/mail";
import { setSession, destroySession, getSession } from "@/lib/auth";

export async function signUpAction(data: {
  name: string;
  email: string;
  password: string;
  role: "STUDENT" | "TEACHER" | "ADMIN";
}) {
  try {
    const { name, email, password, role } = data;

    if (!email || !password || !role) {
      return { success: false, error: "Missing required fields" };
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      if (existingUser.isVerified) {
        return { success: false, error: "Email is already registered and verified." };
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate 6 digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 mins expiry

    // Save verification code
    await prisma.verificationCode.create({
      data: {
        email: email.toLowerCase(),
        code,
        expiresAt,
      },
    });

    // Create or update user
    if (existingUser) {
      await prisma.user.update({
        where: { id: existingUser.id },
        data: {
          name,
          password: hashedPassword,
          role,
        },
      });
    } else {
      await prisma.user.create({
        data: {
          name,
          email: email.toLowerCase(),
          password: hashedPassword,
          role,
          isVerified: false,
        },
      });
    }

    // Send email
    const emailRes = await sendVerificationEmail(email.toLowerCase(), code);
    if (!emailRes.success) {
      return {
        success: true,
        warning: "Account created, but failed to send verification email. Details: " + emailRes.error,
      };
    }

    return { success: true };
  } catch (error: any) {
    console.error("Signup error:", error);
    return { success: false, error: error.message || "Failed to sign up" };
  }
}

export async function verifyCodeAction(data: { email: string; code: string }) {
  try {
    const { email, code } = data;

    if (!email || !code) {
      return { success: false, error: "Email and code are required" };
    }

    const verificationRecord = await prisma.verificationCode.findFirst({
      where: {
        email: email.toLowerCase(),
        code: code.trim(),
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: "desc" },
    });

    if (!verificationRecord) {
      return { success: false, error: "Invalid or expired verification code." };
    }

    // Update user as verified
    await prisma.user.update({
      where: { email: email.toLowerCase() },
      data: { isVerified: true },
    });

    // Clean up verification codes for this email
    await prisma.verificationCode.deleteMany({
      where: { email: email.toLowerCase() },
    });

    return { success: true };
  } catch (error: any) {
    console.error("Verification error:", error);
    return { success: false, error: error.message || "Failed to verify code" };
  }
}

export async function loginAction(data: { email: string; password: string }) {
  try {
    const { email, password } = data;

    if (!email || !password) {
      return { success: false, error: "Email and password are required" };
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return { success: false, error: "Email address not found." };
    }

    if (!user.isVerified) {
      // Trigger new verification code
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

      await prisma.verificationCode.create({
        data: {
          email: email.toLowerCase(),
          code,
          expiresAt,
        },
      });

      await sendVerificationEmail(email.toLowerCase(), code);
      return {
        success: false,
        notVerified: true,
        error: "Your account is not verified yet. A new verification code has been sent to your email.",
      };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { success: false, error: "Incorrect password." };
    }

    // Set JWT Session Cookie
    await setSession({ id: user.id, email: user.email, role: user.role });

    return { success: true, role: user.role };
  } catch (error: any) {
    console.error("Login error:", error);
    return { success: false, error: error.message || "Failed to log in" };
  }
}

export async function logoutAction() {
  await destroySession();
  return { success: true };
}

export async function getCurrentUserAction() {
  const session = await getSession();
  if (!session) return null;

  try {
    const user = await prisma.user.findUnique({
      where: { id: session.id as number },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
      },
    });
    return user;
  } catch (error) {
    return null;
  }
}
