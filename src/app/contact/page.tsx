import type { Metadata } from "next";
import ContactClient from "./contact-client";

export const metadata: Metadata = {
  title: "Contact AeroSpark | Aerospace Engineering, UAV & Academy Enquiries",
  description: "Contact AeroSpark for UAV engineering, drone certification, aerospace consulting, technical training, course enquiries, and collaboration opportunities.",
};

export default function ContactPage() {
  return <ContactClient />;
}
