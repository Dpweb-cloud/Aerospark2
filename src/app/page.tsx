"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import {
  FeaturedCourses,
  StatsSection,
  CertificationsSection,
  TestimonialsSection,
  CTASection,
} from "@/components/home/sections";

import { FullPageFlightPath } from "@/components/home/full-page-flight-path";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="relative">
        <FullPageFlightPath />
        <HeroSection />
        <div className="section-divider" />
        <FeaturedCourses />
        <StatsSection />
        <div className="section-divider" />
        <CertificationsSection />
        <div className="section-divider" />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
