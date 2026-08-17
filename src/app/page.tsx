"use client";

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/home/hero-section";
import {
  FeaturedCourses,
  WhyAeroSparkSection,
  CareerPathwaysSection,
  ConsultingSection,
  TestimonialsSection,
  CTASection,
} from "@/components/home/sections";

import { FullPageFlightPath } from "@/components/home/full-page-flight-path";
import { Outfit } from "next/font/google";

const outfit = Outfit({
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-sans',
});

export default function HomePage() {
  return (
    <div className={`${outfit.variable} font-sans`}>
      <Navbar />
      <main className="relative">
        <FullPageFlightPath />
        <HeroSection />
        <div className="section-divider" />
        <ConsultingSection />
        <div className="section-divider" />
        <FeaturedCourses />
        <div className="section-divider" />
        <WhyAeroSparkSection />
        <div className="section-divider" />
        <CareerPathwaysSection />
        <div className="section-divider" />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
