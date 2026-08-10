import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { PrismaClient } from "../generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

let prismaInstance: PrismaClient | null = null;

function getPrisma(): PrismaClient {
  if (!prismaInstance) {
    // In development, retrieve from global to prevent multiple instances
    if (process.env.NODE_ENV !== "production" && (globalThis as any).prismaGlobal) {
      prismaInstance = (globalThis as any).prismaGlobal;
      return prismaInstance!;
    }

    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
      throw new Error("DATABASE_URL is not set in environment variables");
    }

    let dbUser = "";
    let dbPassword = "";
    let dbHost = "";
    let dbPort = 3306;
    let dbName = "";

    try {
      const parsedUrl = new URL(databaseUrl);
      dbUser = decodeURIComponent(parsedUrl.username);
      dbPassword = decodeURIComponent(parsedUrl.password);
      dbHost = parsedUrl.hostname;
      dbPort = parsedUrl.port ? parseInt(parsedUrl.port, 10) : 3306;
      dbName = parsedUrl.pathname.slice(1);
    } catch (error) {
      throw new Error(
        "Invalid DATABASE_URL format. Expected: mysql://user:password@host:port/database"
      );
    }

    const adapter = new PrismaMariaDb({
      host: dbHost,
      port: dbPort,
      user: dbUser,
      password: dbPassword,
      database: dbName,
      connectionLimit: process.env.NODE_ENV === "production" ? 10 : 2,
    });

    prismaInstance = new PrismaClient({ adapter });
    
    if (process.env.NODE_ENV !== "production") {
      (globalThis as any).prismaGlobal = prismaInstance;
    }
  }
  return prismaInstance;
}

// Export a Proxy that forwards all operations to the lazily initialized PrismaClient
const prisma = new Proxy({} as PrismaClient, {
  get(target, prop, receiver) {
    const client = getPrisma();
    return Reflect.get(client, prop, receiver);
  }
});

export { prisma };
