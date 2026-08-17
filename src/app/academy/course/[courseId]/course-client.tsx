"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/cards";
import { COURSES } from "@/lib/constants";
import {
  Clock,
  BookOpen,
  Star,
  Zap,
  Award,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  ChevronDown,
  AlertTriangle,
  Mail,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Detailed static enrichments map for the 13 courses to provide premium content
const courseEnrichments: Record<
  string,
  {
    intro: string;
    overview: string;
    whatYoullLearn: string[];
    prerequisites: string;
    tools: string[];
    instructor: { name: string; role: string; bio: string; initials: string };
  }
> = {
  "dgca-drone-regulations": {
    intro: "Understand the fundamentals of India's drone regulatory framework, including UAS rules, operating requirements, DGCA awareness, DigitalSky, and responsible drone operations.",
    overview: "This course provides a comprehensive introduction to drone regulations in India under the DGCA framework. It covers classifications, registration processes, DigitalSky zones, remote pilot certificates, and safe operating guidelines.",
    whatYoullLearn: [
      "Fundamentals of Indian UAS rules (Drone Rules 2021)",
      "Classification of drones by weight categories",
      "Drone registration and Unique Identification Number (UIN) requirements",
      "Navigating the DigitalSky platform and airspace zones (Green, Yellow, Red)",
      "Remote pilot training and certification guidelines",
      "Safe take-off, flight, landing, and emergency procedures",
      "Legal responsibilities and compliance checklists for drone operations",
    ],
    prerequisites: "No prior specialised experience required. Suitable for beginners.",
    tools: ["DigitalSky Platform", "DGCA Rules 2021 Guidelines", "UAS Flight Logbooks"],
    instructor: {
      name: "Darshan Parekh",
      role: "Aerospace Engineer | UAV Systems",
      bio: "Focused on UAV engineering, aerospace consulting, product development, and building AeroSpark's technical direction.",
      initials: "DP",
    },
  },
  "faa-drone-regulations": {
    intro: "Build a practical understanding of the U.S. drone regulatory environment, including Part 107, Remote ID, airspace requirements, and safe UAS operations.",
    overview: "A complete introduction to the United States drone rules governed by the Federal Aviation Administration (FAA). This program covers Part 107 rules, FAA DroneZone registration, airspace authorization, and Remote ID requirements.",
    whatYoullLearn: [
      "Overview of the FAA regulatory framework and National Airspace System",
      "Differences between recreational and commercial drone flight (Part 107)",
      "Navigating FAA DroneZone and registering aircraft",
      "Understanding Remote Identification (Remote ID) rules and compliance",
      "Airspace classification and authorization tools (LAANC)",
      "Weather effects, pre-flight checks, and emergency management",
    ],
    prerequisites: "No prior specialised experience required. Suitable for beginners.",
    tools: ["FAA DroneZone", "LAANC Systems", "B4UFLY Utility"],
    instructor: {
      name: "Darshan Parekh",
      role: "Aerospace Engineer | UAV Systems",
      bio: "Focused on UAV engineering, aerospace consulting, product development, and building AeroSpark's technical direction.",
      initials: "DP",
    },
  },
  "easa-drone-regulations": {
    intro: "Understand the European UAS regulatory framework, including Open, Specific, and Certified categories and the principles behind compliant drone operations.",
    overview: "An in-depth introduction to European Union drone regulations under the EASA framework, detailing operational categories, class markings, risk assessments, and compliance protocols across EASA member states.",
    whatYoullLearn: [
      "Understanding EASA drone rules and operational categories (Open, Specific, Certified)",
      "Drone class identification markings (C0 to C6) and compliance standards",
      "Risk assessments and operational authorization (SORA) methodologies",
      "Operator registration and remote pilot training requirements",
      "Airspace rules, geographical zones, and flight permissions",
    ],
    prerequisites: "No prior specialised experience required. Suitable for beginners.",
    tools: ["EASA Regulatory guidelines", "SORA Risk Assessment Templates"],
    instructor: {
      name: "Darshan Parekh",
      role: "Aerospace Engineer | UAV Systems",
      bio: "Focused on UAV engineering, aerospace consulting, product development, and building AeroSpark's technical direction.",
      initials: "DP",
    },
  },
  "aerospace-fundamentals": {
    intro: "Build a foundation in aircraft, flight, structures, propulsion, materials, and the core engineering principles that shape modern aerospace systems.",
    overview: "A comprehensive introduction to aerospace engineering. This course bridges standard physics with practical aeronautics and astronautics, exploring lift, propulsion, structures, and aerospace materials.",
    whatYoullLearn: [
      "History and basics of flight mechanics and atmospheric layers",
      "Aerodynamic forces: lift, drag, thrust, and weight properties",
      "Aircraft structural components and engineering load distribution",
      "Propulsion systems: piston, jet, and rocket engines",
      "Aerospace materials and standard selection criteria",
      "Basic spacecraft dynamics and orbital mechanics foundations",
    ],
    prerequisites: "No prior specialised experience required. Suitable for beginners.",
    tools: ["Aerospace Formulas", "Flight Performance Charts", "ICAO Standard Atmosphere Models"],
    instructor: {
      name: "Darshan Parekh",
      role: "Aerospace Engineer | UAV Systems",
      bio: "Focused on UAV engineering, aerospace consulting, product development, and building AeroSpark's technical direction.",
      initials: "DP",
    },
  },
  "aerodynamics": {
    intro: "Understand how air moves around aircraft and UAVs, and explore the principles behind lift, drag, pressure, stability, and aerodynamic performance.",
    overview: "This course covers fluid mechanics and aerodynamics applied to flight. Learn how wing shapes, airfoils, and body configurations affect airflow, drag, lift, and aerodynamic stability in aircraft and UAVs.",
    whatYoullLearn: [
      "Fundamentals of fluid flow and aerostatic forces in flight",
      "Airfoil nomenclature (NACA series) and aerodynamic coefficients",
      "Lift and drag generation mechanisms and boundary layers",
      "Pressure distribution and boundary layer separation concepts",
      "Wing design, aspect ratio selection, and induced drag reduction",
      "Aircraft and UAV flight stability and aerodynamic control surfaces",
    ],
    prerequisites: "Basic understanding of physics and mathematics recommended.",
    tools: ["Airfoil Analysis Utilities", "Wind Tunnel Testing principles"],
    instructor: {
      name: "Darshan Parekh",
      role: "Aerospace Engineer | UAV Systems",
      bio: "Focused on UAV engineering, aerospace consulting, product development, and building AeroSpark's technical direction.",
      initials: "DP",
    },
  },
  "drone-components": {
    intro: "Understand the systems that make a drone work — from airframes and propulsion to electronics, sensors, payloads, and real-world UAV applications.",
    overview: "Learn the electrical and mechanical systems of modern unmanned aircraft. Explore battery technology, motor sizing, flight controllers, receiver linkages, and payload integration for multirotor and fixed-wing UAVs.",
    whatYoullLearn: [
      "UAV airframe materials, strength-to-weight, and layout configurations",
      "Electric propulsion: motors, ESCs, propellers, and battery sizing equations",
      "Flight control systems, sensors, and GPS navigation modules",
      "Radio frequency receiver links, telecommunication, and telemetry",
      "UAV payloads, camera gimbals, and power distribution boards",
      "Real-world drone applications and essential pre-flight operational checks",
    ],
    prerequisites: "No prior specialised experience required. Suitable for beginners.",
    tools: ["eCalc Calculator", "Mission Planner GCS", "QGroundControl GCS"],
    instructor: {
      name: "Darshan Parekh",
      role: "Aerospace Engineer | UAV Systems",
      bio: "Focused on UAV engineering, aerospace consulting, product development, and building AeroSpark's technical direction.",
      initials: "DP",
    },
  },
  "matlab-programming": {
    intro: "Learn MATLAB fundamentals for engineering calculations, data analysis, mathematical modelling, and technical problem-solving in aerospace applications.",
    overview: "An introductory course on using MATLAB for engineering. Learn variable syntax, array manipulations, scripts, graphing, data parsing, and basic simulation loops tailored to aerospace problems.",
    whatYoullLearn: [
      "MATLAB workspace environment, syntax, and variable types",
      "Matrix operations and multi-dimensional array manipulations",
      "Creating reusable scripts and user-defined functions",
      "2D and 3D data visualization and engineering plotting",
      "Numeric computation and differential equation solvers",
      "Aerospace simulation applications and model verification loops",
    ],
    prerequisites: "Basic mathematics and logic.",
    tools: ["MATLAB Workspace", "Simulink Editor basics"],
    instructor: {
      name: "Darshan Parekh",
      role: "Aerospace Engineer | UAV Systems",
      bio: "Focused on UAV engineering, aerospace consulting, product development, and building AeroSpark's technical direction.",
      initials: "DP",
    },
  },
  "catia-design": {
    intro: "Build practical 3D CAD skills in CATIA through aircraft-oriented modelling, assemblies, drafting, and engineering design workflows.",
    overview: "Learn 3D CAD modeling using CATIA V5. This program focus on aerospace-style component design, sketching, part design, assembly constraints, and standard engineering drawings.",
    whatYoullLearn: [
      "CATIA V5 environment, interface, and workspace navigation",
      "Sketcher workbench: constraints and profile creation tools",
      "Part Design workbench: solid features and boolean operations",
      "Assembly Design workbench: importing parts and configuring constraints",
      "Drafting workbench: creating views, dimensions, and drawing sheets",
      "Surface modeling fundamentals for airframes and airfoil profiles",
    ],
    prerequisites: "No prior specialised experience required. Suitable for beginners.",
    tools: ["CATIA V5 Solid Modeling", "CATIA Assembly & Drafting workbenches"],
    instructor: {
      name: "Darshan Parekh",
      role: "Aerospace Engineer | UAV Systems",
      bio: "Focused on UAV engineering, aerospace consulting, product development, and building AeroSpark's technical direction.",
      initials: "DP",
    },
  },
  "nx-cad-design": {
    intro: "Develop practical CAD skills using Siemens NX for part modelling, assemblies, drafting, and engineering product design.",
    overview: "Master Siemens NX for mechanical design. Focus on solid modeling, features, sketch constraints, assemblies, drafting conventions, and design reuse for aerospace hardware.",
    whatYoullLearn: [
      "Siemens NX user interface, file structure, and settings",
      "Sketching and profile geometric constraints configuration",
      "Solid features: extrude, revolve, sweep, and boolean operations",
      "Assembly structures and mechanical constraint relationships",
      "Preparing production-ready drafting sheets and engineering drawings",
      "Synchronous modeling tools and design modification workflows",
    ],
    prerequisites: "No prior specialised experience required. Suitable for beginners.",
    tools: ["Siemens NX CAD modeling suite"],
    instructor: {
      name: "Darshan Parekh",
      role: "Aerospace Engineer | UAV Systems",
      bio: "Focused on UAV engineering, aerospace consulting, product development, and building AeroSpark's technical direction.",
      initials: "DP",
    },
  },
  "mathematics-fea-cfd": {
    intro: "Strengthen the mathematical foundation behind engineering simulation through vectors, matrices, calculus, differential equations, and numerical methods.",
    overview: "Build the math foundation needed for engineering simulation. Covers vector calculus, matrix algebra, differential equations, and numerical schemes that power solvers in FEA and CFD.",
    whatYoullLearn: [
      "Vectors, coordinate transformations, and vector operators",
      "Matrix algebra, eigenvalues, and linear equation systems",
      "Calculus of multiple variables, gradient, divergence, and curl",
      "Ordinary and partial differential equations governing physics",
      "Numerical integration and finite difference numerical schemes",
      "Understanding numerical solver convergence, residuals, and errors",
    ],
    prerequisites: "Basic high school calculus and algebra.",
    tools: ["Mathematical Matrices", "Numerical Solver Schemes"],
    instructor: {
      name: "Darshan Parekh",
      role: "Aerospace Engineer | UAV Systems",
      bio: "Focused on UAV engineering, aerospace consulting, product development, and building AeroSpark's technical direction.",
      initials: "DP",
    },
  },
  "fea-analysis": {
    intro: "Understand how Finite Element Analysis is used to evaluate stress, deformation, structural behaviour, and engineering design performance.",
    overview: "Learn structural simulation using Finite Element Analysis. Explore stress distributions, load configurations, meshing rules, boundary constraints, and how to interpret static structural simulations.",
    whatYoullLearn: [
      "Introduction to Finite Element Analysis governing principles",
      "Geometry clean-up, mid-surfacing, and simulation preparation",
      "Meshing fundamentals: elements, sizing, quality, and convergence",
      "Applying material properties, loads, and support boundary conditions",
      "Solving static structural engineering problems",
      "Interpreting results: stress contours, deformation, and factor of safety",
      "Identifying and correcting common meshing and setup errors",
    ],
    prerequisites: "Basic strength of materials and physics.",
    tools: ["FEA Solver tools", "Mesh Quality Analysis"],
    instructor: {
      name: "Darshan Parekh",
      role: "Aerospace Engineer | UAV Systems",
      bio: "Focused on UAV engineering, aerospace consulting, product development, and building AeroSpark's technical direction.",
      initials: "DP",
    },
  },
  "cfd-analysis": {
    intro: "Learn the fundamentals of Computational Fluid Dynamics and understand how CFD is used to study airflow, pressure, forces, and aerodynamic performance in aircraft and UAV applications.",
    overview: "Computational Fluid Dynamics is widely used to understand and predict how fluids behave around engineering systems. This course introduces the principles behind CFD and connects them with aerospace applications such as aircraft wings, UAV airframes, aerodynamic performance, pressure distribution, and flow behaviour.",
    whatYoullLearn: [
      "Fundamentals of fluid flow and Computational Fluid Dynamics principles",
      "Understanding CFD terminology, Navier-Stokes equations, and methods",
      "Mesh and computational domain setup and grid convergence",
      "Boundary conditions: inlet, outlet, wall properties, and solver parameters",
      "Pressure, velocity, lift, drag, and airflow vector interpretation",
      "External aerodynamic analysis around airfoils and wings",
      "CFD applications specifically for aircraft and UAV design",
      "Post-processing, contours, vector plots, and simulation results",
      "Understanding common CFD analysis errors, limits, and residuals",
      "Using CFD results to support technical design decisions",
    ],
    prerequisites: "Basic understanding of engineering mathematics and fluid mechanics is recommended. Prior CFD experience is not required.",
    tools: ["CFD Solver", "Grid Generator", "Flow Visualizer"],
    instructor: {
      name: "Darshan Parekh",
      role: "Aerospace Engineer | UAV Systems",
      bio: "Focused on UAV engineering, aerospace consulting, product development, and building AeroSpark's technical direction.",
      initials: "DP",
    },
  },
  "as9100d-quality": {
    intro: "Build a practical understanding of aerospace quality management and the principles of AS9100D, including documentation, risk, traceability, process control, and continual improvement.",
    overview: "Learn the global quality standard for aerospace and aviation organizations (AS9100D). Understand risk management, process flows, traceability, audit readiness, and process validation.",
    whatYoullLearn: [
      "Overview of the AS9100D quality management framework and clauses",
      "Understanding risk-based thinking and mitigation in aerospace operations",
      "Traceability, configuration control, and product release processes",
      "Handling non-conformances and implementing root cause analysis",
      "Preparing for internal, surveillance, and certification quality audits",
      "Continual improvement strategies in aerospace manufacturing",
    ],
    prerequisites: "No prior specialised experience required. Suitable for beginners.",
    tools: ["AS9100D Clause Checklist", "Audit Finding Templates"],
    instructor: {
      name: "Darshan Parekh",
      role: "Aerospace Engineer | UAV Systems",
      bio: "Focused on UAV engineering, aerospace consulting, product development, and building AeroSpark's technical direction.",
      initials: "DP",
    },
  },
};

export default function CourseClient({ courseId }: { courseId: string }) {
  const [openModule, setOpenModule] = useState<number | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const curriculumRef = useRef<HTMLDivElement>(null);

  const course = COURSES.find((c) => c.id === courseId);
  const enrich = courseEnrichments[courseId] || {
    intro: course?.description || "",
    overview: "Explore the comprehensive modules and workflows designed to build industry-ready technical skills.",
    whatYoullLearn: [
      "Build a clear understanding of core terminology and systems",
      "Develop familiarity with industry standard software and tools",
      "Analyze and solve practical aerospace engineering problems",
      "Verify and document engineering compliance and metrics",
    ],
    prerequisites: "Basic engineering logic or technical interests.",
    tools: ["Engineering software modules"],
    instructor: {
      name: "Darshan Parekh",
      role: "Founder / Aerospace Engineer",
      bio: "Focused on UAV engineering, aerospace consulting, product development, and building AeroSpark's technical direction.",
      initials: "DP",
    },
  };

  if (!course) {
    notFound();
  }

  const scrollToCurriculum = () => {
    curriculumRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const faqs = [
    {
      q: "Is this course suitable for beginners?",
      a: course.level === "Beginner"
        ? "Yes, this course is designed starting from foundational concepts and requires no prior aerospace experience."
        : `This course is marked as ${course.level}. We recommend a basic understanding of engineering or physics concepts before starting, though we cover all specialized topics step by step.`,
    },
    {
      q: "Are the sessions live?",
      a: "Yes, our academy programs feature live interactive training sessions with engineering instructors to discuss concepts and ask questions.",
    },
    {
      q: "Will I receive a certificate?",
      a: "Yes. You will receive an AeroSpark course completion certificate after successfully meeting the attendance, project, and course-completion requirements.",
    },
    {
      q: "Is this an official DGCA / FAA / EASA certification?",
      a: course.category.toLowerCase().includes("compliance")
        ? "No. This is an educational training program designed to build technical knowledge. It does not represent a pilot licence, approval, or certificate issued directly by regulatory bodies."
        : "No. This is an engineering training program. Course completion certificates recognize educational program completion and do not represent licenses from civil aviation regulators.",
    },
    {
      q: "What happens after I enrol?",
      a: "Once your enrollment is confirmed, our academic coordinator will contact you with batch schedules, portal login credentials, and onboarding guidelines.",
    },
    {
      q: "I have questions before enrolling. Who can I contact?",
      a: "We are here to help. You can contact our academic advisory team by clicking 'Ask About This Course' to get detailed advice.",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20 bg-background overflow-hidden relative">
        {/* Background Grids */}
        <div className="absolute inset-0 radar-grid opacity-30 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-aero-blue/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-aero-red/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Back link */}
          <div className="mb-8">
            <Link
              href="/academy"
              className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-aero-blue transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Academy
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Top Summary */}
              <div className="space-y-6">
                <span className="text-[#FF6600] font-bold text-xs uppercase tracking-widest block">
                  {course.category}
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-tight">
                  {course.title}
                </h1>
                <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
                  {enrich.intro}
                </p>
                <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-border-subtle">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-surface-elevated">
                      <Clock className="w-4 h-4 text-aero-blue" />
                    </div>
                    <div>
                      <p className="text-[10px] text-text-muted uppercase tracking-wider">Duration</p>
                      <p className="text-xs font-semibold text-foreground">{course.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-surface-elevated">
                      <BookOpen className="w-4 h-4 text-aero-blue" />
                    </div>
                    <div>
                      <p className="text-[10px] text-text-muted uppercase tracking-wider">Content</p>
                      <p className="text-xs font-semibold text-foreground">{course.lessons} lessons</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-surface-elevated">
                      <Star className="w-4 h-4 text-aero-red fill-aero-red" />
                    </div>
                    <div>
                      <p className="text-[10px] text-text-muted uppercase tracking-wider">Rating</p>
                      <p className="text-xs font-semibold text-foreground">{course.rating} ★</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-surface-elevated">
                      <Zap className="w-4 h-4 text-aero-blue" />
                    </div>
                    <div>
                      <p className="text-[10px] text-text-muted uppercase tracking-wider">Level</p>
                      <p className="text-xs font-semibold text-foreground">{course.level}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                  <Button variant="primary" size="lg" href={`/contact?subject=Enrollment%20Inquiry%20-%20${encodeURIComponent(course.title)}`} className="bg-[#FF6600] text-white hover:bg-[#e65c00] border-none shadow-lg">
                    Enroll in Course
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <button onClick={scrollToCurriculum} className="text-sm font-semibold text-aero-blue hover:underline">
                    View Curriculum ↓
                  </button>
                </div>
              </div>

              {/* Course Overview */}
              <GlassCard padding="lg" className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">Course Overview</h2>
                <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                  {enrich.overview}
                </p>
              </GlassCard>

              {/* What You'll Learn */}
              <GlassCard padding="lg" className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">What You&apos;ll Learn</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {enrich.whatYoullLearn.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-text-secondary">
                      <CheckCircle2 className="w-4 h-4 text-aero-blue mt-0.5 shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>

              {/* Course Curriculum */}
              <div ref={curriculumRef} className="space-y-4 scroll-mt-28">
                <h2 className="text-2xl font-bold text-foreground">Course Curriculum</h2>
                <div className="flex flex-col gap-3">
                  {course.modules.map((module, idx) => {
                    const isOpen = openModule === idx;
                    return (
                      <div key={idx} className="flex flex-col bg-surface/50 border border-border-subtle rounded-xl overflow-hidden">
                        <button
                          onClick={() => setOpenModule(isOpen ? null : idx)}
                          className="flex items-start gap-3 p-4 w-full text-left hover:bg-surface-hover/20 transition-all"
                        >
                          <div className="w-6 h-6 rounded-full bg-aero-blue/10 border border-aero-blue/20 flex items-center justify-center text-xs text-aero-blue shrink-0 font-mono mt-0.5">
                            {idx + 1}
                          </div>
                          <div className="flex-1 flex items-center justify-between">
                            <span className="text-sm font-semibold text-foreground">{module.title}</span>
                            <ChevronDown className={`w-4 h-4 text-text-muted transition-transform ${isOpen ? "rotate-180" : ""}`} />
                          </div>
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4 pt-1 pl-[3.25rem] border-t border-border-subtle/50 bg-surface/20">
                            <ul className="space-y-2.5">
                              {module.items.map((item, itemIdx) => (
                                <li key={itemIdx} className="text-xs md:text-sm text-text-secondary flex items-start gap-2">
                                  <span className="w-1 h-1 rounded-full bg-aero-blue/50 mt-2 shrink-0" />
                                  <span className="leading-relaxed">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Audience & Prerequisites */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GlassCard padding="md" className="space-y-3">
                  <h3 className="text-lg font-bold text-foreground">Who This Course Is For</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {course.eligibility}
                  </p>
                </GlassCard>
                <GlassCard padding="md" className="space-y-3">
                  <h3 className="text-lg font-bold text-foreground">Prerequisites</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {enrich.prerequisites}
                  </p>
                </GlassCard>
              </div>

              {/* Tools & Topics Covered */}
              <GlassCard padding="md" className="space-y-3">
                <h3 className="text-lg font-bold text-foreground">Tools & Topics Covered</h3>
                <div className="flex flex-wrap gap-2 pt-1">
                  {enrich.tools.map((tool, idx) => (
                    <span key={idx} className="text-xs bg-surface-elevated border border-border-subtle text-foreground px-3 py-1 rounded-full">
                      {tool}
                    </span>
                  ))}
                  {course.topics.slice(0, 5).map((topic, idx) => (
                    <span key={idx} className="text-xs bg-aero-blue/10 border border-aero-blue/20 text-aero-blue px-3 py-1 rounded-full">
                      {topic}
                    </span>
                  ))}
                </div>
              </GlassCard>

              {/* Course Inclusions */}
              <GlassCard padding="md" className="space-y-3">
                <h3 className="text-lg font-bold text-foreground">What&apos;s Included</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-1">
                  {[
                    "Live instructor-led sessions",
                    "Structured course lessons",
                    "Learning materials and references",
                    "Practical engineering examples",
                    "Doubt-solving & guidance support",
                    "Course completion certificate",
                  ].map((inc, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-text-secondary">
                      <CheckCircle2 className="w-4 h-4 text-aero-blue shrink-0" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </GlassCard>

              {/* Course Completion Certificate */}
              <GlassCard padding="lg" className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">Course Completion Certificate</h2>
                <p className="text-sm text-text-secondary leading-relaxed">
                  Learners who successfully complete the course requirements will receive an AeroSpark course completion certificate for the respective training program.
                </p>
                <div className="p-4 rounded-xl border border-dashed border-border-default bg-background/50">
                  <p className="text-xs text-text-muted leading-relaxed">
                    <span className="font-bold text-foreground block mb-1">Important Disclaimer:</span>
                    AeroSpark course completion certificates recognise completion of AeroSpark training. Courses covering DGCA, FAA, EASA, AS9100D, or other regulatory frameworks do not represent licences, approvals, or certifications issued by those regulatory bodies unless explicitly stated.
                  </p>
                </div>
              </GlassCard>

              {/* Your Instructor */}
              <GlassCard padding="lg" className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">Your Instructor</h2>
                <div className="flex flex-col sm:flex-row items-center gap-4 p-5 rounded-2xl bg-surface-elevated/40 border border-border-subtle">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-aero-blue/20 to-aero-red/20 flex items-center justify-center text-foreground text-xl font-bold shrink-0">
                    {enrich.instructor.initials}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{enrich.instructor.name}</h3>
                    <p className="text-xs text-aero-blue font-bold uppercase tracking-wider mb-2">{enrich.instructor.role}</p>
                    <p className="text-sm text-text-secondary leading-relaxed">{enrich.instructor.bio}</p>
                  </div>
                </div>
              </GlassCard>

              {/* FAQs */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
                <div className="flex flex-col gap-3">
                  {faqs.map((faq, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <div key={idx} className="flex flex-col bg-surface/50 border border-border-subtle rounded-xl overflow-hidden">
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : idx)}
                          className="flex items-center justify-between p-4 w-full text-left hover:bg-surface-hover/20 transition-all gap-4"
                        >
                          <span className="text-sm font-semibold text-foreground leading-snug">{faq.q}</span>
                          <ChevronDown className={`w-4 h-4 text-text-muted transition-transform shrink-0 ${isOpen ? "rotate-180" : ""}`} />
                        </button>
                        {isOpen && (
                          <div className="px-4 pb-4 pt-1 pl-4 border-t border-border-subtle/50 text-sm text-text-secondary leading-relaxed">
                            {faq.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="pt-4 flex justify-center">
                  <Button variant="outline" href="/contact?subject=Question%20about%20a%20course" className="text-xs">
                    Ask About This Course
                  </Button>
                </div>
              </div>

            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 glass-panel rounded-3xl p-8 border border-border-default shadow-2xl">
                <div className="mb-6 relative rounded-xl overflow-hidden aspect-[1.8] bg-surface-elevated border border-border-subtle">
                  {course.image ? (
                    <img
                      src={course.image}
                      alt={course.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-aero-blue/15 to-aero-red/15 flex items-center justify-center">
                      <Zap className="w-12 h-12 text-aero-blue opacity-55" />
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  <div>
                    <span className="text-[28px] font-extrabold text-foreground tracking-tight block">₹{course.price.toLocaleString()}</span>
                  </div>

                  <Button variant="primary" size="lg" href={`/contact?subject=Enrollment%20Request%20-%20${encodeURIComponent(course.title)}`} className="w-full text-base group h-14 bg-[#FF6600] text-white hover:bg-[#e65c00] border-none shadow-lg">
                    Enroll in Course
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  <div className="pt-6 border-t border-border-subtle space-y-4">
                    <div className="flex items-start gap-3 text-text-secondary text-sm">
                      <Clock className="w-5 h-5 text-aero-blue shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">Duration</p>
                        <p className="font-semibold text-foreground">{course.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 text-text-secondary text-sm">
                      <BookOpen className="w-5 h-5 text-aero-blue shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">Lessons</p>
                        <p className="font-semibold text-foreground">{course.lessons} lessons</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 text-text-secondary text-sm">
                      <Award className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">Certification</p>
                        <p className="font-semibold text-foreground">Completion Certificate</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Enrollment CTA */}
        <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-12">
          <div className="glass-panel rounded-2xl p-12 relative overflow-hidden">
            <span className="text-[#FF6600] font-bold text-xs uppercase tracking-widest block mb-4">
              READY TO START?
            </span>
            <h2 className="text-3xl font-bold text-foreground mb-4 tracking-tight">
              Take the Next Step in Your Aerospace Learning.
            </h2>
            <p className="text-text-secondary mb-8 max-w-lg mx-auto">
              Build your technical understanding through structured learning, practical engineering examples, and focused guidance from AeroSpark Academy.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="primary" size="lg" href={`/contact?subject=Enrollment%20Request%20-%20${encodeURIComponent(course.title)}`} className="bg-[#FF6600] text-white hover:bg-[#e65c00] border-none shadow-lg">
                Enroll in Course
              </Button>
              <Button variant="secondary" size="lg" href="/academy">
                Explore Other Courses
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
