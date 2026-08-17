import type { Metadata } from "next";
import AcademyClient from "./academy-client";

export const metadata: Metadata = {
  title: "Aerospace & UAV Engineering Courses | AeroSpark Academy",
  description: "Explore aerospace and UAV engineering courses in drone regulations, aerodynamics, CAD/CAE, CFD, simulation, aerospace quality, and drone technology at AeroSpark Academy.",
};

export default function AcademyPage() {
  return <AcademyClient />;
}
