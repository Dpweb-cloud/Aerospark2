import type { Metadata } from "next";
import AboutClient from "./about-client";

export const metadata: Metadata = {
  title: "About AeroSpark | Built Through Design, Learning & Engineering",
  description: "AeroSpark started in 2020 as an aerospace engineering and technical learning team. Learn about our journey across aircraft and UAV design, simulation, and training.",
};

export default function AboutPage() {
  return <AboutClient />;
}
