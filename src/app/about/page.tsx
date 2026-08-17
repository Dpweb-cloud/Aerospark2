import type { Metadata } from "next";
import AboutClient from "./about-client";

export const metadata: Metadata = {
  title: "About AeroSpark | UAV Engineering, Aerospace Consulting & Training",
  description: "Learn about AeroSpark, an aerospace engineering and technical learning company focused on UAV development, drone certification, design and simulation, quality systems, and aerospace training.",
};

export default function AboutPage() {
  return <AboutClient />;
}
