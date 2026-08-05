"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { GlassCard, SectionHeader } from "@/components/ui/cards";
import {
  FileCheck,
  CheckCircle2,
  Send,
  Wrench,
  FlaskConical,
  ClipboardList,
  Search,
  Building,
  Users,
  Target,
  ShieldCheck,
  HelpCircle,
  Factory
} from "lucide-react";

export default function UASCertificationPage() {
  const supportAreas = [
    { title: "Engineering & R&D", desc: "Support to develop, refine and freeze the drone configuration and certification BOM.", icon: <Wrench className="w-6 h-6" /> },
    { title: "Testing & Labs", desc: "Internal compliance checks and coordinated third-party laboratory testing.", icon: <FlaskConical className="w-6 h-6" /> },
    { title: "Documentation & D1", desc: "Complete certification documents, submission readiness and D1 filing support.", icon: <ClipboardList className="w-6 h-6" /> },
    { title: "Audit & Observations", desc: "Stage 1 coordination, Stage 2 training and observation-closure assistance.", icon: <Search className="w-6 h-6" /> },
  ];

  const processSteps = [
    { step: "01", title: "Drone development and BOM finalization", desc: "Need help before certification starts? We support R&D, component selection, system integration and engineering corrections to finalize a stable drone configuration and controlled Bill of Materials." },
    { step: "02", title: "Testing and compliance verification", desc: "We check the drone against applicable safety, performance and technical requirements through calculations, internal ground tests and flight tests. Gaps are identified early and corrected before submission." },
    { step: "03", title: "Third-party laboratory testing", desc: "We identify the applicable tests, coordinate suitable laboratories, support sample readiness and review the final reports for certification use. The scope is tailored to the drone, so only relevant tests are included." },
    { step: "04", title: "Complete certification documentation", desc: "We prepare the required technical, manufacturing, quality, maintenance, safety and test documents around the finalized drone configuration—keeping specifications, calculations and evidence consistent throughout." },
    { step: "05", title: "D1 filing and submission readiness", desc: "We organize the complete application package, verify revision control and traceability, and support D1 filing with the selected Certification Body." },
    { step: "06", title: "Stage 1 coordination and observation closure", desc: "We coordinate technical responses to Stage 1 observations, update affected documents and support additional calculations, evidence or testing wherever required." },
    { step: "07", title: "Stage 2 audit training", desc: "We prepare key personnel to confidently demonstrate manufacturing, quality, traceability and record-control processes during the on-site audit. Mock-audit support can also be included." },
    { step: "08", title: "Stage 2 observation closure", desc: "We assist with root-cause analysis, corrective actions, revised procedures and implementation evidence required to address Stage 2 observations." },
  ];

  const laboratoryTests = [
    "Environmental testing, including temperature, humidity and shock",
    "Ingress protection and weather-resistance testing",
    "EMI/EMC testing for electrical and electronic systems",
    "Battery performance, discharge and lifecycle testing",
    "Structural, static-load and material-related testing",
    "Other component- or requirement-specific tests identified during the compliance review"
  ];

  const documents = [
    "Design Document",
    "Independent Verification and Validation",
    "Software Security Requirements",
    "Internal Ground Test Reports",
    "Internal Flight Test Reports",
    "Third-Party Test Reports",
    "Manufacturing Manual",
    "Quality Assurance Manual",
    "Standard Operating Procedures",
    "Manufacturer-Level Maintenance Manual",
    "User-Level Maintenance Manual",
    "User Manual",
    "Failure Mode and Effects Analysis (FMEA)",
    "Bill of Materials",
    "Manufacturing Records of the Drone",
    "Quality Assurance Records of the Drone",
    "Product Datasheet"
  ];

  const audiences = [
    "Drone manufacturers and OEMs",
    "Startups developing a new drone platform",
    "Agriculture, surveillance, mapping, inspection and logistics drone companies",
    "Aerospace, defence and research organizations",
    "Manufacturers facing Stage 1 or Stage 2 observations",
    "Companies modifying an existing drone configuration",
    "International drone businesses entering the Indian market"
  ];

  const features = [
    { title: "One coordinated team", desc: "Engineering, testing, documentation and audit support work together under one project plan." },
    { title: "Product-first approach", desc: "We work on the actual drone configuration and help solve technical gaps—not just rewrite documents." },
    { title: "Clear certification roadmap", desc: "Each milestone, responsibility and required evidence is defined from the beginning." },
    { title: "Consistent technical evidence", desc: "The BOM, drawings, calculations, manuals and test reports remain aligned to one controlled configuration." },
    { title: "Support through observations", desc: "We stay involved through Stage 1 and Stage 2 responses within the agreed scope." }
  ];

  const faqs = [
    { q: "Can AeroSpark support a drone that is still under development?", a: "Yes. We can support R&D, engineering corrections, integration and BOM finalization before formal certification activities begin." },
    { q: "Do you prepare the complete certification documents?", a: "Yes. We prepare and review the applicable technical, test, manufacturing, quality, maintenance and user documents for the agreed scope." },
    { q: "Do you conduct laboratory testing?", a: "We identify the applicable laboratory tests, coordinate suitable test facilities, support sample readiness and review the reports for certification use." },
    { q: "Can you help with existing Certification Body observations?", a: "Yes. We support technical analysis, document revisions, corrective actions and additional evidence needed to respond to Stage 1 or Stage 2 observations." },
    { q: "Does AeroSpark issue the Type Certificate?", a: "No. AeroSpark provides development, testing, documentation and audit support. The assessment and final certification decision remain with the applicable Certification Body and regulatory framework." }
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
            <span className="text-aero-blue font-semibold tracking-wider uppercase mb-4">DRONE TYPE CERTIFICATION</span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground/90 to-foreground/50">
              Drone Type Certification Services in India
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed mb-8">
              A complete certification solution, not just consultancy.
            </p>
            <div className="flex gap-4">
              <Button variant="primary" size="lg">Request a certification assessment</Button>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 text-center">
          <p className="text-text-secondary leading-relaxed md:text-lg mb-12">
            Drone Type Certification requires the product, BOM, test evidence, manufacturing controls and technical documents to tell the same story. AeroSpark helps you build that complete, certification-ready package—without the confusion of managing separate teams for development, testing and documentation.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {supportAreas.map((area, idx) => (
              <GlassCard key={idx} padding="md" className="h-full">
                <div className="text-aero-blue mb-4 inline-flex p-3 rounded-xl bg-aero-blue/10">{area.icon}</div>
                <h4 className="font-bold text-foreground mb-2">{area.title}</h4>
                <p className="text-sm text-text-secondary">{area.desc}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <SectionHeader
            title="Our drone certification process"
            description="A clear, milestone-based route from product readiness to audit closure. The steps below show the sequence of work, not a fixed timeline."
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((item, idx) => (
              <GlassCard key={idx} className="h-full flex flex-col" padding="md">
                <div className="text-3xl font-bold text-aero-blue/20 mb-4">{item.step}</div>
                <h3 className="text-lg font-bold text-foreground mb-3">{item.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Laboratory Testing Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground tracking-tight leading-tight">Laboratory testing,<br className="hidden lg:block" /> coordinated with clarity</h2>
              <p className="text-text-secondary leading-relaxed text-sm sm:text-base">
                Laboratory requirements vary with the drone category, configuration, components and certification scope. AeroSpark reviews applicability first, then coordinates the required test package to avoid unnecessary testing and repeated submissions.
              </p>
            </div>
            <div className="lg:col-span-7">
              <ul className="space-y-5">
                {laboratoryTests.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4 text-text-secondary text-sm sm:text-base">
                    <FlaskConical className="w-5 h-5 text-[#1a2b4c] flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Documentation Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground tracking-tight leading-tight">Complete drone certification<br className="hidden lg:block" /> documentation</h2>
              <p className="text-text-secondary leading-relaxed text-sm sm:text-base">
                Our document package is developed around the actual drone submitted for certification—not generic templates. Depending on project applicability, the package includes:
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                {documents.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-text-secondary text-sm">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span className="truncate">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Audiences Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-32 flex flex-col items-center text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight mb-6">Who we support</h2>
          <p className="text-[#6b7280] leading-relaxed text-base md:text-lg mb-12">Our service is designed for every stage of the drone product journey:</p>

          <div className="w-full flex flex-col gap-4 mx-auto text-left max-w-3xl">
            {audiences.map((audience, idx) => (
              <div key={idx} className="flex items-center gap-5 px-6 py-5 bg-surface-elevated/40 backdrop-blur-md rounded-2xl border border-border-default/50 shadow-sm hover:shadow-lg hover:bg-surface-elevated transition-all group hover:-translate-y-1 duration-300">
                <div className="w-2.5 h-2.5 rounded-full bg-aero-blue shadow-[0_0_12px_rgba(34,211,238,0.6)] flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                <span className="text-foreground/90 font-medium md:text-lg leading-snug">{audience}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-tight">
                Why manufacturers<br className="hidden lg:block" /> choose AeroSpark
              </h2>
            </div>
            <div className="lg:col-span-7">
              <div className="space-y-5">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-6 rounded-2xl bg-[#fdf8f4] border border-[#f5ebe4] shadow-sm">
                    <Target className="w-6 h-6 text-[#1a2b4c] flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-[#1a1a1a] mb-2">{feature.title}</h4>
                      <p className="text-sm text-[#5a5a5a] leading-relaxed">{feature.desc}</p>
                    </div>
                  </div>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Ready to move your drone toward Type Certification?</h2>
          <p className="text-text-secondary mb-8 text-lg max-w-2xl mx-auto">
            Share your current drone configuration and project status. We will help you identify the gaps and define the right certification path.
          </p>
          <Button variant="primary" size="lg" className="inline-flex items-center gap-2">
            Request a certification assessment <Send className="w-4 h-4" />
          </Button>
        </section>

      </main>
      <Footer />
    </>
  );
}
