"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { GlassCard, SectionHeader, Badge } from "@/components/ui/cards";
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

  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const fadeUp: any = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen pb-20 bg-background overflow-x-hidden relative">
        {/* Background Grids & Orbs */}
        <div className="absolute inset-0 radar-grid opacity-30 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-aero-blue/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-aero-red/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-28">
          {/* Back link */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link
              href="/academy"
              className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-[#FF6600] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Academy
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column */}
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="lg:col-span-2 space-y-12"
            >
              
              {/* Top Summary / Hero */}
              <motion.div variants={fadeUp} className="space-y-6 relative">
                {/* Decorative background glow behind title */}
                <div className="absolute -inset-4 bg-gradient-to-r from-[#FF6600]/10 to-transparent blur-2xl -z-10 rounded-full" />
                
                
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-tight">
                  {course.title}
                </h1>
                <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
                  {enrich.intro}
                </p>
                
                <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-border-subtle/50">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-aero-blue/10 border border-aero-blue/20">
                      <Clock className="w-5 h-5 text-aero-blue" />
                    </div>
                    <div>
                      <p className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">Duration</p>
                      <p className="text-sm font-bold text-foreground">{course.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-aero-blue/10 border border-aero-blue/20">
                      <BookOpen className="w-5 h-5 text-aero-blue" />
                    </div>
                    <div>
                      <p className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">Content</p>
                      <p className="text-sm font-bold text-foreground">{course.lessons} lessons</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-aero-red/10 border border-aero-red/20">
                      <Star className="w-5 h-5 text-aero-red fill-aero-red" />
                    </div>
                    <div>
                      <p className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">Rating</p>
                      <p className="text-sm font-bold text-foreground">{course.rating} ★</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                      <Zap className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">Level</p>
                      <p className="text-sm font-bold text-foreground">{course.level}</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-6">
                  <Button variant="primary" size="lg" href={`/contact?subject=Enrollment%20Inquiry%20-%20${encodeURIComponent(course.title)}`} className="bg-gradient-to-r from-[#FF6600] to-[#FF8C00] text-white hover:from-[#e65c00] hover:to-[#FF6600] border-none shadow-[0_0_20px_rgba(255,102,0,0.3)] transition-all">
                    Enroll in Course
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                  <button onClick={scrollToCurriculum} className="text-sm font-semibold text-text-secondary hover:text-[#FF6600] transition-colors flex items-center gap-1">
                    View Curriculum <ChevronDown className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>

              {/* Course Overview */}
              <motion.div variants={fadeUp}>
                <GlassCard padding="lg" glow="blue" className="space-y-4 border-l-4 border-l-aero-blue">
                  <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    <Globe className="w-6 h-6 text-aero-blue" />
                    Course Overview
                  </h2>
                  <p className="text-text-secondary text-base leading-relaxed">
                    {enrich.overview}
                  </p>
                </GlassCard>
              </motion.div>

              {/* What You'll Learn */}
              <motion.div variants={fadeUp}>
                <GlassCard padding="lg" glow="blue" className="space-y-6">
                  <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                    <Award className="w-6 h-6 text-[#FF6600]" />
                    What You&apos;ll Learn
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                    {enrich.whatYoullLearn.map((item, idx) => (
                      <motion.div 
                        key={idx} 
                        whileHover={{ x: 5 }}
                        className="flex items-start gap-3 text-sm text-text-secondary group"
                      >
                        <div className="w-5 h-5 rounded-full bg-aero-blue/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-aero-blue/20 transition-colors">
                          <CheckCircle2 className="w-3.5 h-3.5 text-aero-blue" />
                        </div>
                        <span className="leading-relaxed group-hover:text-foreground transition-colors">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>

              {/* Course Curriculum */}
              <motion.div variants={fadeUp} ref={curriculumRef} className="space-y-6 scroll-mt-28">
                <SectionHeader align="left" title="Course Curriculum" description="Detailed breakdown of all modules and practical lessons covered in this program." />
                
                <div className="flex flex-col gap-4">
                  {course.modules.map((module, idx) => {
                    const isOpen = openModule === idx;
                    return (
                      <motion.div 
                        key={idx} 
                        initial={false}
                        animate={{ backgroundColor: isOpen ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.01)" }}
                        className="flex flex-col border border-border-subtle rounded-2xl overflow-hidden backdrop-blur-sm transition-colors duration-300"
                      >
                        <button
                          onClick={() => setOpenModule(isOpen ? null : idx)}
                          className="flex items-center gap-4 p-5 w-full text-left hover:bg-surface-hover/30 transition-all group"
                        >
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-[#FF6600] text-white shadow-[0_0_15px_rgba(255,102,0,0.4)]' : 'bg-surface-elevated text-text-muted border border-border-subtle group-hover:border-[#FF6600]/50 group-hover:text-[#FF6600]'}`}>
                            <span className="font-mono text-sm font-bold">{idx + 1}</span>
                          </div>
                          <div className="flex-1 flex items-center justify-between">
                            <span className={`text-base font-semibold transition-colors ${isOpen ? 'text-foreground' : 'text-text-secondary group-hover:text-foreground'}`}>
                              {module.title}
                            </span>
                            <motion.div
                              animate={{ rotate: isOpen ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                              className="w-6 h-6 rounded-full bg-surface flex items-center justify-center shrink-0 ml-4 border border-border-subtle"
                            >
                              <ChevronDown className="w-4 h-4 text-text-muted" />
                            </motion.div>
                          </div>
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="px-5 pb-5 pt-2 pl-[4.5rem] border-t border-border-subtle/30">
                                <ul className="space-y-4">
                                  {module.items.map((item, itemIdx) => (
                                    <motion.li 
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{ delay: itemIdx * 0.05 }}
                                      key={itemIdx} 
                                      className="text-sm text-text-secondary flex items-start gap-3"
                                    >
                                      <div className="w-1.5 h-1.5 rounded-full bg-aero-blue/40 mt-2 shrink-0 shadow-[0_0_8px_rgba(var(--primary-glow),0.5)]" />
                                      <span className="leading-relaxed hover:text-foreground transition-colors cursor-default">{item}</span>
                                    </motion.li>
                                  ))}
                                </ul>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* FAQs */}
              <motion.div variants={fadeUp} className="space-y-6 pt-8">
                <SectionHeader align="left" title="Frequently Asked Questions" />
                <div className="flex flex-col gap-4">
                  {faqs.map((faq, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <motion.div 
                        key={idx} 
                        className="flex flex-col bg-surface/30 border border-border-subtle rounded-2xl overflow-hidden backdrop-blur-sm"
                      >
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : idx)}
                          className="flex items-center justify-between p-5 w-full text-left hover:bg-surface-hover/20 transition-all gap-4 group"
                        >
                          <span className={`text-sm md:text-base font-semibold leading-snug transition-colors ${isOpen ? 'text-[#FF6600]' : 'text-foreground group-hover:text-aero-blue'}`}>
                            {faq.q}
                          </span>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            className="shrink-0"
                          >
                            <ChevronDown className="w-5 h-5 text-text-muted" />
                          </motion.div>
                        </button>
                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="px-5 pb-5 pt-2 text-sm text-text-secondary leading-relaxed border-t border-border-subtle/30">
                                {faq.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
                <div className="pt-6 flex">
                  <Button variant="outline" href="/contact?subject=Question%20about%20a%20course" className="text-sm bg-surface-elevated hover:bg-surface-hover">
                    <Mail className="w-4 h-4 mr-2" /> Ask About This Course
                  </Button>
                </div>
              </motion.div>

            </motion.div>

            {/* Right Sidebar (Sticky) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-1"
            >
              <div className="sticky top-32 space-y-6">
                
                {/* Main Pricing Card */}
                <div className="glass-panel rounded-3xl p-6 md:p-8 border border-border-default/80 shadow-[0_8px_32px_rgba(0,0,0,0.2)] bg-gradient-to-b from-surface/80 to-surface-elevated/60 backdrop-blur-2xl relative overflow-hidden group">
                  {/* Subtle animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FF6600]/5 to-aero-blue/5 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="mb-6 relative rounded-2xl overflow-hidden aspect-[1.7] bg-surface-elevated border border-border-subtle/50 shadow-inner">
                    {course.image ? (
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                        src={course.image}
                        alt={course.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#FF6600]/10 to-aero-blue/10 flex items-center justify-center">
                        <Zap className="w-12 h-12 text-[#FF6600] opacity-40" />
                      </div>
                    )}
                  </div>

                  <div className="space-y-6 relative z-10">
                    <div>
                      <p className="text-xs text-text-muted font-medium uppercase tracking-widest mb-1">Total Fee</p>
                      <span className="text-4xl font-extrabold text-foreground tracking-tight block">
                        ₹{course.price.toLocaleString()}
                      </span>
                    </div>

                    <Button 
                      variant="primary" 
                      size="lg" 
                      href={`/contact?subject=Enrollment%20Request%20-%20${encodeURIComponent(course.title)}`} 
                      className="w-full text-base group h-14 bg-gradient-to-r from-[#FF6600] to-[#FF8C00] text-white hover:from-[#e65c00] hover:to-[#FF6600] border-none shadow-[0_0_25px_rgba(255,102,0,0.35)] transition-all overflow-hidden relative"
                    >
                      <div className="absolute inset-0 bg-white/20 w-0 group-hover:w-full transition-all duration-300 ease-out" />
                      <span className="relative z-10 flex items-center justify-center">
                        Enroll in Course
                        <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Button>

                    <div className="pt-6 border-t border-border-subtle/60 grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-1">
                        <p className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">Duration</p>
                        <p className="font-semibold text-foreground text-sm flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#FF6600]" /> {course.duration}</p>
                      </div>
                      <div className="flex flex-col gap-1">
                        <p className="text-[10px] text-text-muted uppercase tracking-wider font-semibold">Lessons</p>
                        <p className="font-semibold text-foreground text-sm flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5 text-aero-blue" /> {course.lessons} lessons</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Audience & Prerequisites */}
                <div className="space-y-4">
                  <GlassCard padding="md" hover glow="blue" className="space-y-3 border-border-default/40 bg-surface/30 backdrop-blur-md">
                    <h3 className="text-sm uppercase tracking-widest font-bold text-foreground flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" /> Who This Is For
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {course.eligibility}
                    </p>
                  </GlassCard>
                  
                  
                </div>

                

                {/* Course Inclusions */}
                <GlassCard padding="md" className="space-y-4 border-border-default/40 bg-surface/30 backdrop-blur-md">
                  <h3 className="text-sm uppercase tracking-widest font-bold text-foreground">What&apos;s Included</h3>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      "Live instructor-led sessions",
                      "Structured course lessons",
                      "Learning materials and references",
                      "Practical engineering examples",
                      "Doubt-solving & guidance support",
                    ].map((inc, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-sm text-text-secondary">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.3)] rounded-full" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Bottom Enrollment CTA */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-12 relative z-10"
        >
          <div className="glass-panel rounded-[2rem] p-10 md:p-16 relative overflow-hidden shadow-2xl border border-border-default bg-surface/40 backdrop-blur-3xl">
            {/* Animated Glow in CTA */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FF6600]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-aero-blue/10 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none" />
            
            <Badge variant="orange" className="mb-6 px-4 py-1.5 font-bold tracking-widest uppercase">
              Ready to Start?
            </Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 tracking-tight relative z-10">
              Take the Next Step in Your Aerospace Career.
            </h2>
            <p className="text-text-secondary text-base md:text-lg mb-10 max-w-2xl mx-auto leading-relaxed relative z-10">
              Build your technical understanding through structured learning, practical engineering examples, and focused guidance from AeroSpark Academy.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <Button variant="primary" size="lg" href={`/contact?subject=Enrollment%20Request%20-%20${encodeURIComponent(course.title)}`} className="bg-gradient-to-r from-[#FF6600] to-[#FF8C00] text-white hover:from-[#e65c00] hover:to-[#FF6600] border-none shadow-[0_0_25px_rgba(255,102,0,0.4)] w-full sm:w-auto h-14 px-8 text-lg">
                Enroll Now
                <ChevronRight className="w-5 h-5 ml-1" />
              </Button>
              <Button variant="outline" size="lg" href="/academy" className="w-full sm:w-auto h-14 px-8 text-lg bg-surface-elevated hover:bg-surface-hover">
                Explore Other Courses
              </Button>
            </div>
          </div>
        </motion.section>
      </main>
      <Footer />
    </>
  );
}
