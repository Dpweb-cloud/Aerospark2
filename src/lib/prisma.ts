import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { PrismaClient } from "../generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

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
  connectionLimit: process.env.NODE_ENV === "production" ? 10 : 2, // Hostinger-safe connection limit
});

const prismaClientSingleton = () => {
  return new PrismaClient({ adapter });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export { prisma };

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
