"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { GlassCard, SectionHeader } from "@/components/ui/cards";
import { staggerContainer, staggerItem } from "@/lib/motion";
import {
  Settings,
  PenTool,
  CheckCircle2,
  Send,
  Package,
  Layers,
  FileCheck,
  Award,
  HelpCircle,
  Tractor,
  Camera,
  Map,
  Factory,
  Truck,
  ShieldAlert
} from "lucide-react";

export default function DroneRDPage() {
  const [activeStep, setActiveStep] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 300) {
        setActiveStep(null);
        return;
      }

      const viewportCenter = window.innerHeight / 2;
      let closestStep = null;
      let closestDistance = Infinity;

      processSteps.forEach((step) => {
        const el = document.getElementById(`step-${step.step}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          const elementCenter = rect.top + rect.height / 2;
          const distance = Math.abs(elementCenter - viewportCenter);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestStep = step.step;
          }
        }
      });

      setActiveStep(closestStep);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const stepIcons = [
    <FileCheck className="w-4 h-4 md:w-5 md:h-5" key="1" />,
    <PenTool className="w-4 h-4 md:w-5 md:h-5" key="2" />,
    <Settings className="w-4 h-4 md:w-5 md:h-5" key="3" />,
    <Package className="w-4 h-4 md:w-5 md:h-5" key="4" />,
    <Layers className="w-4 h-4 md:w-5 md:h-5" key="5" />,
    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" key="6" />,
    <Send className="w-4 h-4 md:w-5 md:h-5" key="7" />,
  ];

  const phasesList = [
    {
      id: "phase1",
      title: "Phase 1: Concept & CAD",
      desc: "Analyze requirements and prepare CAD model design",
      stepRange: "Steps 01 - 02",
    },
    {
      id: "phase2",
      title: "Phase 2: Components",
      desc: "Finalize propulsion, power, sensors, and avionics",
      stepRange: "Step 03",
    },
    {
      id: "phase3",
      title: "Phase 3: Build & Software",
      desc: "Manufacture prototype and configure flight software",
      stepRange: "Steps 04 - 05",
    },
    {
      id: "phase4",
      title: "Phase 4: Test & Handover",
      desc: "Conduct flight validation and hand over design/BOM",
      stepRange: "Steps 06 - 07",
    },
  ];
  const processSteps = [
    { step: "01", title: "Requirement Analysis", desc: "We understand the application, payload, performance targets, operating environment, software needs and budget before defining the development plan." },
    { step: "02", title: "CAD Design & Material Selection", desc: "We create the drone design in CAD and select suitable materials based on strength, weight, durability and manufacturing feasibility." },
    { step: "03", title: "Component Finalization", desc: "Motors, propellers, batteries, flight controllers, communication systems, sensors and payload components are selected to match the mission and customer preferences." },
    { step: "04", title: "Manufacturing & Integration", desc: "The drone is manufactured, assembled and integrated with its mechanical, electrical, avionics and payload systems." },
    { step: "05", title: "Firmware & Software Development", desc: "We configure or develop the required firmware, flight functions, payload controls, automation features and supporting software." },
    { step: "06", title: "Flight Testing & Validation", desc: "Ground checks and flight tests verify stability, performance, payload operation and the agreed customer requirements. Clear test records are prepared for review." },
    { step: "07", title: "Design & BOM Handover", desc: "The final drone is handed over with the agreed design files, Bill of Materials, configuration details and supporting technical records." },
  ];

  const coreServices = [
    { title: "UAV Sizing & Configuration", desc: "Define optimal propulsion, battery layout, and sizing based on weight and mission requirements.", icon: <Layers className="w-6 h-6" /> },
    { title: "Airframe & CAD Design", desc: "Create complete 3D mechanical designs and select aerospace-grade composite materials.", icon: <PenTool className="w-6 h-6" /> },
    { title: "Avionics & Payload Integration", desc: "Integrate flight controllers, GPS, radio links, cameras, custom sensors and wiring systems.", icon: <Settings className="w-6 h-6" /> },
    { title: "Flight Validation & Tuning", desc: "Perform prototype flight tests, parameter tuning, payload validation and operational training.", icon: <CheckCircle2 className="w-6 h-6" /> },
  ];

  const applications = [
    { title: "Agriculture", desc: "Spraying, seeding and crop-monitoring platforms", icon: <Tractor className="w-5 h-5" /> },
    { title: "Surveillance", desc: "Security, observation and mission-specific payloads", icon: <Camera className="w-5 h-5" /> },
    { title: "Mapping & Survey", desc: "Camera, GNSS and sensor-based data collection", icon: <Map className="w-5 h-5" /> },
    { title: "Industrial Inspection", desc: "Infrastructure, utilities and asset inspection", icon: <Factory className="w-5 h-5" /> },
    { title: "Logistics & Delivery", desc: "Payload transport and controlled delivery systems", icon: <Truck className="w-5 h-5" /> },
    { title: "Defence & Research", desc: "Specialized prototypes and experimental platforms", icon: <ShieldAlert className="w-5 h-5" /> },
  ];

  const faqs = [
    { q: "Can AeroSpark develop a drone from an initial idea?", a: "Yes. We can begin with the mission requirement and support design, component selection, manufacturing, software integration and flight testing." },
    { q: "Can the drone be designed for a specific payload?", a: "Yes. The structure, propulsion system, battery and component layout can be developed around the payload requirements." },
    { q: "Can customers suggest preferred components?", a: "Yes. Customer preferences are considered, and our team checks technical compatibility before final selection." },
    { q: "Will the drone be tested before handover?", a: "Yes. The completed drone is checked through ground and flight testing against the agreed project requirements." },
    { q: "Will the design and BOM be provided?", a: "Yes. The agreed design package, Bill of Materials and supporting records are handed over according to the project scope." },
    { q: "Is support available after handover?", a: "Yes. Post-handover engineering support can be provided according to the scope and commercial terms agreed in the proposal or MOU." }
  ];

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="pt-24 pb-32 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-aero-blue/10 blur-[120px] rounded-[100%] pointer-events-none z-0" />
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/service-design.png"
              alt="Drone R&D Background"
              className="w-full h-full object-cover opacity-15 dark:opacity-25"
            />
            <div className="absolute inset-0 bg-background/40 backdrop-blur-[1px]" />
          </div>

          <div className="absolute inset-0 radar-grid opacity-30 z-0" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
            <span className="text-aero-blue font-semibold tracking-wider uppercase mb-4">DRONE R&D • DESIGN • MANUFACTURING • FLIGHT VALIDATION</span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground/90 to-foreground/50">
              Drone R&D and Product Development Services
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed mb-8">
              From an initial requirement to a manufactured, flight-tested and handover-ready drone.
            </p>
            <div className="flex gap-4 mb-8">
              <Button variant="primary" size="lg">START YOUR R&D PROJECT</Button>
            </div>
            <p className="text-text-secondary text-base max-w-3xl mx-auto leading-relaxed mt-8">
              AeroSpark turns customer requirements into custom-built, flight-tested drone solutions, technically known as Unmanned Aircraft Systems (UAS) or Unmanned Aerial Vehicles (UAVs). We manage the complete product development journey—from CAD design and component selection to manufacturing, software development, flight testing and final handover.
            </p>
          </div>
        </section>

        {/* Intro & Core Services */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-24 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">From Concept to a Flight-Ready Drone</h2>
          <div className="p-8 bg-surface-elevated border border-border-default rounded-2xl inline-block max-w-4xl text-left mb-16">
            <h3 className="text-xl font-bold mb-3 text-foreground">Custom Drone Development Built Around Your Mission</h3>
            <p className="text-text-secondary text-sm md:text-base leading-relaxed">
              Every drone project begins with a different mission. Whether the requirement is for agriculture, surveillance, mapping, inspection, logistics, defence or a new application, we design the solution around the payload, expected performance, operating conditions and budget.
            </p>
          </div>

          <SectionHeader title="Our UAV Engineering Capabilities" />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {coreServices.map((service, idx) => (
              <GlassCard key={idx} padding="md" className="h-full flex flex-col justify-between" glow="none">
                <div>
                  <div className="text-aero-blue mb-4 inline-flex p-3 rounded-xl bg-aero-blue/10">
                    {service.icon}
                  </div>
                  <h4 className="font-bold text-foreground mb-2 text-lg">{service.title}</h4>
                  <p className="text-sm text-text-secondary leading-relaxed">{service.desc}</p>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Development Process */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
          <SectionHeader
            title="Our Development Process"
            description="Step-by-step product development journey."
          />
          
          <div className="mt-16 max-w-5xl mx-auto relative space-y-16">
            {/* Vertical timeline line */}
            <div className="absolute top-0 bottom-0 left-4 md:left-1/2 w-[2px] bg-gradient-to-b from-border-default/20 via-border-default/80 to-border-default/20 -translate-x-1/2" />

            {phasesList.map((phase, phaseIdx) => (
              <div key={phase.id} id={phase.id} className="scroll-mt-32 space-y-12">
                {/* Phase Header on Timeline */}
                <div className="relative flex justify-start md:justify-center pl-12 md:pl-0">
                  <span className="text-xs font-mono font-bold text-aero-blue bg-aero-blue/10 border border-aero-blue/20 px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm z-10">
                    {phase.title}
                  </span>
                </div>

                {/* Steps under this phase */}
                <div className="space-y-12">
                  {processSteps
                    .filter((_, idx) => {
                      if (phaseIdx === 0) return idx === 0 || idx === 1;
                      if (phaseIdx === 1) return idx === 2;
                      if (phaseIdx === 2) return idx === 3 || idx === 4;
                      if (phaseIdx === 3) return idx === 5 || idx === 6;
                      return false;
                    })
                    .map((item) => {
                      // find original index
                      const originalIdx = processSteps.findIndex((s) => s.step === item.step);
                      const isOdd = originalIdx % 2 !== 0;
                      const isActive = activeStep === item.step;
                      return (
                        <motion.div
                          key={item.step}
                          id={`step-${item.step}`}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-100px" }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          className={`relative flex flex-col md:flex-row items-center justify-between w-full group ${isOdd ? "md:flex-row-reverse" : ""}`}
                        >
                          {/* Connector line dot/node */}
                          <div className={`absolute left-4 md:left-1/2 -translate-x-1/2 top-2 md:top-1/2 md:-translate-y-1/2 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 z-10 shadow-sm ${
                            isActive
                              ? "border-[#FF6600] bg-[#FF6600] text-white scale-125 shadow-[0_0_20px_rgba(255,102,0,0.35)]"
                              : "border-border-default/80 bg-background text-text-muted group-hover:border-[#FF6600] group-hover:text-[#FF6600] group-hover:scale-110"
                          }`}>
                            {stepIcons[originalIdx]}
                          </div>

                          {/* The Card */}
                          <div className="w-full md:w-[45%] pl-12 md:pl-0">
                            <GlassCard
                              hover={!isActive}
                              className={`!border-2 transition-all duration-300 ${
                                isActive
                                  ? "!border-[#FF6600] bg-[#FF6600]/5 shadow-[0_0_30px_rgba(255,102,0,0.18)] scale-[1.03]"
                                  : "!border-border-default/60 hover:!border-[#FF6600]/60 hover:scale-[1.03] hover:shadow-md"
                              }`}
                              padding="md"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-mono text-text-muted font-bold">
                                  STEP {item.step}
                                </span>
                              </div>
                              <h4 className="text-lg font-bold text-foreground mb-2 group-hover:text-aero-blue transition-colors">
                                {item.title}
                              </h4>
                              <p className="text-sm text-text-secondary leading-relaxed">
                                {item.desc}
                              </p>
                            </GlassCard>
                          </div>

                          {/* Spacer for desktop */}
                          <div className="hidden md:block w-[45%]" />
                        </motion.div>
                      );
                    })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* What We Deliver Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground tracking-tight leading-tight">What We Deliver</h2>
              <p className="text-text-secondary leading-relaxed text-sm sm:text-base mb-6">
                The final project package is aligned with the agreed scope and may include:
              </p>
            </div>
            <div className="lg:col-span-7">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                {[
                  "Custom-built and integrated drone",
                  "3D CAD design files",
                  "Material and component details",
                  "Final Bill of Materials",
                  "Firmware or software configuration",
                  "Wiring and system-integration information",
                  "Flight-test records and performance report",
                  "Operating and maintenance guidance"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-text-secondary">
                    <CheckCircle2 className="w-5 h-5 text-aero-blue flex-shrink-0" />
                    <span className="leading-relaxed text-sm sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Applications Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground tracking-tight leading-tight">Solutions for Different Applications</h2>
              <p className="text-text-secondary leading-relaxed text-sm sm:text-base">
                We develop platforms optimized for various industries, tailoring the design and payloads for specialized missions.
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {applications.map((app, idx) => (
                  <div key={idx} className="p-6 border border-border-default rounded-2xl bg-surface-elevated shadow-sm hover:shadow-md transition-shadow">
                    <div className="text-aero-blue mb-4">{app.icon}</div>
                    <h4 className="font-bold text-foreground mb-2">{app.title}</h4>
                    <p className="text-sm text-text-secondary leading-relaxed">{app.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose AeroSpark Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-tight">
                Why Choose<br className="hidden lg:block" /> AeroSpark?
              </h2>
            </div>
            <div className="lg:col-span-7">
              <div className="space-y-5">
                {[
                  { title: "Mission-Driven Engineering", desc: "The drone is developed around the required application, payload and performance." },
                  { title: "Complete Development Support", desc: "Design, manufacturing, software and flight validation are managed through one coordinated team." },
                  { title: "Flexible Component Selection", desc: "We balance performance, reliability, availability, budget and customer preference." },
                  { title: "Tested Before Handover", desc: "The final configuration is checked through structured ground and flight testing." },
                  { title: "Clear Design Handover", desc: "The agreed design files, BOM and technical records are provided at project completion." },
                  { title: "Continued Engineering Support", desc: "Further support, upgrades and development can be provided as defined in the proposal or MOU." }
                ].map((feature, idx) => (
                  <GlassCard key={idx} padding="md" className="hover:-translate-y-1 transition-transform duration-300 shadow-sm hover:shadow-lg">
                    <h4 className="font-bold text-foreground mb-2">{feature.title}</h4>
                    <p className="text-sm text-text-secondary leading-relaxed">{feature.desc}</p>
                  </GlassCard>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <SectionHeader title="Frequently Asked Questions" />
          <div className="mt-12 space-y-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-6 border border-border-subtle rounded-2xl bg-surface-elevated">
                <h4 className="text-lg font-bold text-foreground mb-2 flex gap-3"><HelpCircle className="text-aero-blue w-6 h-6 flex-shrink-0" /> {faq.q}</h4>
                <p className="text-text-secondary pl-9">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-br from-surface to-surface-elevated border border-border-default rounded-3xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Have a Drone Idea? Let's Build It.</h2>
          <p className="text-text-secondary mb-8 text-lg max-w-2xl mx-auto">
            Share your mission requirement, payload or existing concept with AeroSpark. Our engineering team will help turn it into a practical, manufactured and flight-ready drone solution.
          </p>
          <Button variant="primary" size="lg" className="inline-flex items-center gap-2">
            START YOUR DRONE DEVELOPMENT PROJECT <Send className="w-4 h-4" />
          </Button>
        </section>

      </main>
      <Footer />
    </>
  );
}
