import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen, Clock, Zap, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const pathwaysData: Record<string, {
  title: string;
  description: string;
  longDescription: string;
  timeline: { step: number; title: string; desc: string }[];
  courses: { title: string; category: string; icon: React.ReactNode; slug: string }[];
}> = {
  "uav-design-engineer": {
    title: "UAV Design Engineer",
    description: "Master CATIA and structural analysis to design the next generation of autonomous aerial vehicles.",
    longDescription: "A UAV Design Engineer is responsible for the aerodynamic design, structural integrity, and systems integration of unmanned aerial vehicles. This pathway will equip you with advanced skills in CAD (CATIA), finite element analysis (FEA), and materials science specifically applied to aerospace.",
    timeline: [
      { step: 1, title: "Learn Aerospace Fundamentals", desc: "Understand the core principles of flight, lift, drag, and thrust." },
      { step: 2, title: "Master CATIA & 3D Modeling", desc: "Create precise, industry-standard 3D models of UAV components." },
      { step: 3, title: "Structural Analysis & FEA", desc: "Test the durability and stress tolerance of your designs virtually." },
      { step: 4, title: "Final UAV Design Project", desc: "Design a complete autonomous aerial vehicle from scratch." },
    ],
    courses: [
      { title: "Aerospace Engineering Fundamentals", category: "Core", icon: <BookOpen className="w-5 h-5" />, slug: "aerospace-fundamentals" },
      { title: "CATIA Design", category: "Software", icon: <Zap className="w-5 h-5" />, slug: "catia-v5-aircraft-design" },
      { title: "Mathematics for FEA & CFD", category: "Advanced", icon: <Clock className="w-5 h-5" />, slug: "mathematics-for-fea-and-cfd" },
    ]
  },
  "aerodynamics-specialist": {
    title: "Aerodynamics Specialist",
    description: "Specialize in fluid dynamics and CFD analysis to optimize flight performance and efficiency.",
    longDescription: "Aerodynamics Specialists analyze and optimize how air flows around solid objects. In this career path, you will learn to use cutting-edge Computational Fluid Dynamics (CFD) software to reduce drag, improve lift, and enhance the overall efficiency of aerospace vehicles.",
    timeline: [
      { step: 1, title: "Core Fluid Dynamics", desc: "Master the physics of airflow and boundary layers." },
      { step: 2, title: "Advanced Mathematics", desc: "Build the strong mathematical foundation required for CFD." },
      { step: 3, title: "CFD Software Mastery", desc: "Learn to simulate complex aerodynamic scenarios using industry software." },
      { step: 4, title: "Aerodynamic Optimization Project", desc: "Optimize an existing airframe for maximum fuel efficiency." },
    ],
    courses: [
      { title: "Aerospace Engineering Fundamentals", category: "Core", icon: <BookOpen className="w-5 h-5" />, slug: "aerospace-fundamentals" },
      { title: "CFD Analysis", category: "Software", icon: <Zap className="w-5 h-5" />, slug: "computational-fluid-dynamics" },
      { title: "Mathematics for FEA & CFD", category: "Advanced", icon: <Clock className="w-5 h-5" />, slug: "mathematics-for-fea-and-cfd" },
    ]
  },
  "quality-systems-manager": {
    title: "Quality Systems Manager",
    description: "Ensure aerospace safety and AS9100D compliance in modern manufacturing environments.",
    longDescription: "Quality Systems Managers are the backbone of aerospace manufacturing, ensuring every component meets rigorous international safety and quality standards. This pathway focuses on AS9100D certification, audit protocols, and advanced quality management systems.",
    timeline: [
      { step: 1, title: "Aerospace Quality Standards", desc: "Introduction to global safety regulations and manufacturing tolerances." },
      { step: 2, title: "Drone Regulations (DGCA)", desc: "Navigate local and international compliance for UAV operations." },
      { step: 3, title: "AS9100D Certification Process", desc: "Deep dive into the aerospace industry's most critical QMS standard." },
      { step: 4, title: "Live Audit Simulation", desc: "Conduct a mock factory audit to identify non-conformances." },
    ],
    courses: [
      { title: "AS9100D Quality Management", category: "Certification", icon: <BookOpen className="w-5 h-5" />, slug: "as9100d-quality-management" },
      { title: "Drone Components & Applications", category: "Core", icon: <Zap className="w-5 h-5" />, slug: "drone-components-and-applications" },
      { title: "DGCA Drone Regulations", category: "Regulatory", icon: <Clock className="w-5 h-5" />, slug: "dgca-drone-rules-and-regulations" },
    ]
  }
};

export default async function PathwayPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const pathway = pathwaysData[resolvedParams.slug];

  if (!pathway) {
    notFound();
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-flex items-center gap-2 text-text-secondary hover:text-aero-blue transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Hero Section */}
        <div className="bg-surface-elevated/50 border border-border-default rounded-3xl p-8 lg:p-12 mb-12 shadow-sm">
          <span className="inline-block px-3 py-1 mb-6 text-xs font-bold uppercase tracking-wider text-[#FF6600] bg-[#FF6600]/10 rounded-full">
            Career Pathway
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6">
            {pathway.title}
          </h1>
          <p className="text-lg md:text-xl text-text-secondary max-w-3xl leading-relaxed">
            {pathway.longDescription}
          </p>
        </div>

        {/* Learning Timeline Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8">
            Your Learning Timeline
          </h2>
          <div className="relative border-l-2 border-border-default ml-4 md:ml-6 pl-8 space-y-10">
            {pathway.timeline.map((item) => (
              <div key={item.step} className="relative">
                <div className="absolute -left-[41px] bg-surface rounded-full p-1 border-2 border-aero-blue text-aero-blue">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-aero-blue mb-1 block">
                    Step {item.step}
                  </span>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Suggested Courses Section */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">
            Suggested Courses for this Pathway
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pathway.courses.map((course) => (
              <Link href={`/academy/course/${course.slug}`} key={course.title} className="group bg-surface border border-border-default rounded-2xl p-6 hover:border-aero-blue/50 hover:shadow-lg transition-all duration-300 flex flex-col h-full cursor-pointer block">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-lg bg-aero-blue/10 text-aero-blue">
                    {course.icon}
                  </div>
                  <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    {course.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-4 group-hover:text-aero-blue transition-colors">
                  {course.title}
                </h3>
                <div className="mt-auto pt-4 border-t border-border-subtle flex items-center justify-between text-aero-blue text-sm font-semibold group-hover:bg-aero-blue/5 p-2 -mx-2 rounded-lg transition-colors">
                  View Course Details
                  <Zap className="w-4 h-4 ml-2" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <Button size="lg" className="bg-aero-blue hover:bg-aero-blue-dim text-white rounded-full px-8">
            Enroll in Pathway Now
          </Button>
        </div>
      </div>
    </div>
  );
}
