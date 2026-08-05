"use client";

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
  const processSteps = [
    { step: "01", title: "Requirement Analysis", desc: "We understand the application, payload, performance targets, operating environment, software needs and budget before defining the development plan." },
    { step: "02", title: "CAD Design & Material Selection", desc: "We create the drone design in CAD and select suitable materials based on strength, weight, durability and manufacturing feasibility." },
    { step: "03", title: "Component Finalization", desc: "Motors, propellers, batteries, flight controllers, communication systems, sensors and payload components are selected to match the mission and customer preferences." },
    { step: "04", title: "Manufacturing & Integration", desc: "The drone is manufactured, assembled and integrated with its mechanical, electrical, avionics and payload systems." },
    { step: "05", title: "Firmware & Software Development", desc: "We configure or develop the required firmware, flight functions, payload controls, automation features and supporting software." },
    { step: "06", title: "Flight Testing & Validation", desc: "Ground checks and flight tests verify stability, performance, payload operation and the agreed customer requirements. Clear test records are prepared for review." },
    { step: "07", title: "Design & BOM Handover", desc: "The final drone is handed over with the agreed design files, Bill of Materials, configuration details and supporting technical records." },
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
        <section className="py-24 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-aero-blue/10 blur-[120px] rounded-[100%] pointer-events-none z-0" />
          <div className="absolute inset-0 radar-grid opacity-30 z-0" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
            <span className="text-aero-blue font-semibold tracking-wider uppercase mb-4">DRONE R&D • DESIGN • MANUFACTURING • FLIGHT VALIDATION</span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground/90 to-foreground/50">
              Drone R&D and Product Development Services
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed mb-8">
              From an initial requirement to a manufactured, flight-tested and handover-ready drone.
            </p>
            <div className="flex gap-4">
              <Button variant="primary" size="lg">START YOUR R&D PROJECT</Button>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">From Concept to a Flight-Ready Drone</h2>
          <p className="text-text-secondary leading-relaxed md:text-lg mb-8">
            AeroSpark turns customer requirements into custom-built, flight-tested drone solutions, technically known as Unmanned Aircraft Systems (UAS) or Unmanned Aerial Vehicles (UAVs). We manage the complete product development journey—from CAD design and component selection to manufacturing, software development, flight testing and final handover.
          </p>
          <div className="p-8 bg-surface-elevated border border-border-default rounded-2xl">
            <h3 className="text-xl font-bold mb-3 text-foreground">Custom Drone Development Built Around Your Mission</h3>
            <p className="text-text-secondary">
              Every drone project begins with a different mission. Whether the requirement is for agriculture, surveillance, mapping, inspection, logistics, defence or a new application, we design the solution around the payload, expected performance, operating conditions and budget.
            </p>
          </div>
        </section>

        {/* Development Process */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <SectionHeader
            title="Our Development Process"
            description="Step-by-step product development journey."
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {processSteps.map((item, idx) => (
              <GlassCard key={idx} className="h-full flex flex-col" padding="md">
                <div className="text-3xl font-bold text-aero-blue/20 mb-4">{item.step}</div>
                <h4 className="text-lg font-bold text-foreground mb-3">{item.title}</h4>
                <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
              </GlassCard>
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
