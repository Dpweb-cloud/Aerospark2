import { prisma } from "../src/lib/prisma";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

// Load .env file configurations
dotenv.config({ path: ".env.local" });

async function main() {
  console.log("Starting database seed...");

  // Generate safe passwords
  const hashedPassword = await bcrypt.hash("password123", 10);

  // 1. Create or Update Demo Users
  console.log("Upserting user profiles...");
  
  const student = await prisma.user.upsert({
    where: { email: "student@aerospark.com" },
    update: { password: hashedPassword, name: "Alex Mercer", role: "STUDENT", isVerified: true },
    create: {
      email: "student@aerospark.com",
      password: hashedPassword,
      name: "Alex Mercer",
      role: "STUDENT",
      isVerified: true
    }
  });
  console.log(`- Created Student: ${student.email}`);

  const teacher = await prisma.user.upsert({
    where: { email: "teacher@aerospark.com" },
    update: { password: hashedPassword, name: "Dr. Sarah Connor", role: "TEACHER", isVerified: true },
    create: {
      email: "teacher@aerospark.com",
      password: hashedPassword,
      name: "Dr. Sarah Connor",
      role: "TEACHER",
      isVerified: true
    }
  });
  console.log(`- Created Teacher: ${teacher.email}`);

  const admin = await prisma.user.upsert({
    where: { email: "admin@aerospark.com" },
    update: { password: hashedPassword, name: "ERP Admin", role: "ADMIN", isVerified: true },
    create: {
      email: "admin@aerospark.com",
      password: hashedPassword,
      name: "ERP Admin",
      role: "ADMIN",
      isVerified: true
    }
  });
  console.log(`- Created Admin: ${admin.email}`);

  // 2. Create Quizzes
  console.log("Adding quizzes...");
  const quiz1 = await prisma.quiz.create({
    data: {
      title: "DGCA Drone Regulations 101",
      description: "Basic rules for operating micro and nano class unmanned aircraft systems in India.",
      questionsJson: JSON.stringify([
        {
          question: "Which of the following drone categories does not require a UIN (Unique Identification Number)?",
          options: ["Nano Drones (under 250g)", "Micro Drones (250g - 2kg)", "Small Drones (2kg - 25kg)", "None of the above"],
          answer: 0
        },
        {
          question: "What is the maximum altitude limit for drone operations in the Green Zone without permission?",
          options: ["120 feet (40m)", "200 feet (60m)", "400 feet (120m)", "500 feet (150m)"],
          answer: 2
        },
        {
          question: "Which color code on the Digital Sky Map signifies a restricted airspace requiring prior approval?",
          options: ["Green Zone", "Yellow Zone", "Red Zone", "Blue Zone"],
          answer: 2
        }
      ])
    }
  });

  const quiz2 = await prisma.quiz.create({
    data: {
      title: "Aerodynamics & Propulsion Quiz",
      description: "Quick quiz testing concepts of lift, drag, thrust, and wing design.",
      questionsJson: JSON.stringify([
        {
          question: "What aerodynamic force directly opposes the weight of an aircraft?",
          options: ["Thrust", "Drag", "Lift", "Tension"],
          answer: 2
        },
        {
          question: "Which parameter describes the ratio of lift to drag?",
          options: ["Aspect Ratio", "L/D Ratio", "Reynolds Number", "Angle of Attack"],
          answer: 1
        }
      ])
    }
  });

  // 3. Create Classes
  console.log("Scheduling classes...");
  const class1 = await prisma.class.create({
    data: {
      title: "Aerodynamics & Flight Mechanics",
      date: new Date(Date.now() + 86400000), // tomorrow
      duration: "1h 30m",
      teacherId: teacher.id,
      students: { connect: { id: student.id } }
    }
  });

  const class2 = await prisma.class.create({
    data: {
      title: "UAS Flight Certification Practical",
      date: new Date(Date.now() - 86400000), // yesterday
      duration: "2h 00m",
      teacherId: teacher.id,
      students: { connect: { id: student.id } }
    }
  });

  // 4. Create Attendance
  console.log("Recording attendance log...");
  await prisma.attendance.create({
    data: {
      status: "PRESENT",
      studentId: student.id,
      classId: class2.id,
      date: new Date(Date.now() - 86400000)
    }
  });

  // 5. Create Notes
  console.log("Adding notes...");
  await prisma.note.create({
    data: {
      title: "Lecture 1: Lift Coefficients",
      filePath: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      status: "PENDING",
      uploadedById: student.id
    }
  });

  // 6. Create Resources
  console.log("Uploading resource references...");
  await prisma.resource.create({
    data: {
      title: "DGCA Airspace Map Guide v3",
      type: "PDF",
      url: "https://digitalsky.dgca.gov.in/airspace-map/",
      teacherId: teacher.id
    }
  });

  // 7. Create Certificates
  console.log("Issuing certificates...");
  await prisma.certificate.create({
    data: {
      title: "AeroSpark Remote Pilot License (Micro Class)",
      filePath: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      studentId: student.id
    }
  });

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
