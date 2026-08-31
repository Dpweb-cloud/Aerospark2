import type { Metadata } from "next";
import AboutClient from "./about-client";

export const metadata: Metadata = {
  title: "About AeroSpark | Aerospace Engineering, UAV Consulting & Training",
  description: "Learn how AeroSpark grew from aerospace design and practical learning into UAV engineering, drone certification support, simulation, quality consulting and technical training.",
};

export default function AboutPage() {
  return <AboutClient />;
}
