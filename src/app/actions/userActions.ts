"use server";

import { prisma } from "@/lib/prisma";

export async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return { success: true, data: users };
  } catch (error: any) {
    console.error("Error fetching users from Hostinger MySQL database:", error);
    return {
      success: false,
      error: error.message || "Failed to fetch users from database",
    };
  }
}
