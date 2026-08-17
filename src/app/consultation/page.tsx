import type { Metadata } from "next";
import ConsultationClient from "./consultation-client";

export const metadata: Metadata = {
  title: "UAV Engineering & Aerospace Consulting Services | AeroSpark",
  description: "AeroSpark provides UAV engineering, drone certification support, CAD/CAE, CFD, simulation, and aerospace quality consulting for engineering and product teams.",
};

export default function ConsultationPage() {
  return <ConsultationClient />;
}
