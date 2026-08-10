"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { GlassCard, SectionHeader } from "@/components/ui/cards";
import {
  FileCheck,
  CheckCircle2,
  Send,
  HelpCircle,
  Award,
  Search,
  BookOpen,
  ClipboardList,
  Target,
  Settings,
  ShieldCheck,
  Users
} from "lucide-react";

export default function AS9100DQualityPage() {
  const [activePhase, setActivePhase] = useState("phase1");

  const stepIcons = [
    <Search className="w-4 h-4 md:w-5 md:h-5" key="1" />,
    <ClipboardList className="w-4 h-4 md:w-5 md:h-5" key="2" />,
    <FileCheck className="w-4 h-4 md:w-5 md:h-5" key="3" />,
    <Users className="w-4 h-4 md:w-5 md:h-5" key="4" />,
    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" key="5" />,
    <Send className="w-4 h-4 md:w-5 md:h-5" key="6" />,
    <ShieldCheck className="w-4 h-4 md:w-5 md:h-5" key="7" />,
  ];

  const phasesList = [
    {
      id: "phase1",
      title: "Phase 1: Gap & Planning",
      desc: "Analyze workflows and define roadmap",
      stepRange: "Steps 01 - 02",
    },
    {
      id: "phase2",
      title: "Phase 2: Development & Training",
      desc: "Develop QMS documentation & train team",
      stepRange: "Steps 03 - 04",
    },
    {
      id: "phase3",
      title: "Phase 3: Audit & Review",
      desc: "Perform internal review & audit prep",
      stepRange: "Steps 05 - 06",
    },
    {
      id: "phase4",
      title: "Phase 4: Closure & Certification",
      desc: "Address observations & secure cert",
      stepRange: "Step 07",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120) {
        setActivePhase("phase4");
        return;
      }

      let currentActive = "phase1";
      for (const phase of phasesList) {
        const el = document.getElementById(phase.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 180 && rect.bottom > 180) {
            currentActive = phase.id;
            break;
          }
        }
      }
      setActivePhase(currentActive);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToPhase = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth"
      });
      setActivePhase(id);
    }
  };
  const processSteps = [
    { step: "01", title: "Gap analysis", desc: "We review the current procedures, formats, records and organization structure against the requirements of ISO 9001:2015 or AS9100D." },
    { step: "02", title: "Implementation plan", desc: "A practical project roadmap is agreed upon, outlining responsibilities, milestones, required resources and the target certification date." },
    { step: "03", title: "Process mapping and documentation", desc: "We develop the quality manual, procedures, risk assessments, objectives and formats tailored to the organization—avoiding unnecessary administrative burden." },
    { step: "04", title: "Awareness and implementation training", desc: "We train key personnel on their quality responsibilities, the requirements of the selected standard and how to use the QMS processes effectively." },
    { step: "05", title: "Internal audit and review", desc: "We support a full system audit, identify nonconformities and prepare management review using real performance data, risks, customer feedback and improvement actions." },
    { step: "06", title: "Certification audit support", desc: "We prepare the evidence required for Stage 1 and Stage 2 audits, help teams present their processes clearly and support coordination with the selected Certification Body." },
    { step: "07", title: "Observation and nonconformity closure", desc: "Audit findings are addressed through root-cause analysis, corrective action, revised documentation, implementation evidence and effectiveness checks." }
  ];

  const documents = [
    "QMS scope, context and interested-party analysis",
    "Quality policy and measurable quality objectives",
    "Process map, process interactions and responsibility matrix",
    "Document and record control procedures",
    "Risk and opportunity register",
    "Sales, contract review and customer communication controls",
    "Design and development controls, where applicable",
    "Supplier selection, approval and performance monitoring",
    "Purchasing, incoming inspection and traceability controls",
    "Production, inspection, release and nonconformity controls",
    "Calibration and monitoring-equipment controls",
    "Competence, training and awareness records",
    "Internal audit program and reports",
    "Management review framework and records",
    "Corrective action and continual-improvement system",
    "Configuration management and product-safety controls for AS9100D",
    "Counterfeit-part prevention and operational-risk controls for AS9100D",
    "Audit observation and corrective-action tracker"
  ];

  const as9100dControls = [
    "Product safety and awareness across relevant functions",
    "Configuration identification, change control and status accounting",
    "Operational risk management and project-level controls",
    "Prevention of counterfeit or unapproved parts",
    "Supplier approval, monitoring and external-provider control",
    "Control of special requirements, critical items and key characteristics where applicable",
    "Human factors, ethical behaviour and quality culture awareness",
    "Design, production and service controls aligned to aerospace customer requirements"
  ];

  const audiences = [
    "Manufacturing and engineering companies",
    "Drone manufacturers and UAS technology organizations",
    "Aviation, space, aerospace and defence suppliers",
    "Electronics, avionics and precision-component manufacturers",
    "Design, development and technical service organizations",
    "Testing laboratories and inspection businesses",
    "Startups building their first formal quality system",
    "ISO 9001-certified organizations upgrading to AS9100D",
    "Companies preparing for Stage 1 or Stage 2 certification audits",
    "Organizations facing audit observations or recurring quality issues"
  ];

  const whyChooseUs = [
    { title: "Practical, not template-heavy", desc: "Your QMS is designed around real workflows, responsibilities and records instead of unnecessary paperwork." },
    { title: "Built for implementation", desc: "We help your team use the system in daily operations, not simply prepare documents for the audit." },
    { title: "Aerospace and drone understanding", desc: "For AS9100D projects, our sector knowledge helps connect quality controls with engineering, manufacturing and product safety." },
    { title: "Clear project milestones", desc: "Every action, owner and expected record is organized through a transparent implementation plan." },
    { title: "Audit-focused support", desc: "We prepare evidence, train personnel and support corrective actions for Stage 1 and Stage 2 findings." },
    { title: "One coordinated partner", desc: "Gap analysis, documentation, implementation, training and audit readiness are managed through one team." }
  ];

  const faqs = [
    { q: "Which standard is right for my organization?", a: "ISO 9001:2015 is suitable for organizations across industries. AS9100D is intended for organizations working in aviation, space, aerospace and defence supply chains or where customers require aerospace-specific quality controls." },
    { q: "Can AeroSpark build a QMS from the beginning?", a: "Yes. We can support organizations that do not yet have a formal QMS, as well as companies that already have procedures but need a complete and controlled system." },
    { q: "Can an existing ISO 9001 system be upgraded to AS9100D?", a: "Yes. We review the existing ISO 9001 system, retain effective controls and add the aerospace-specific requirements needed for AS9100D readiness." },
    { q: "Do you prepare all QMS documents?", a: "We prepare the applicable policies, procedures, formats, registers and process controls required for the agreed scope. The system is tailored to the organization rather than copied from a generic template." },
    { q: "Do you support certification audits?", a: "Yes. We support Stage 1 and Stage 2 readiness, evidence organization, employee preparation and corrective actions for observations raised by the selected Certification Body." },
    { q: "Does AeroSpark issue ISO 9001 or AS9100D certificates?", a: "No. AeroSpark provides QMS consulting and certification-readiness support. Certification is independently assessed and issued by an appropriate Certification Body." },
    { q: "How long does QMS implementation take?", a: "The effort depends on the organization size, number of processes, current level of implementation and audit readiness. The project is planned through milestones rather than a one-size-fits-all duration." }
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
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground/90 to-foreground/50">
              Quality Management System Services
            </h1>
            <h2 className="text-2xl text-aero-blue font-semibold mb-8">ISO 9001:2015 & AS9100D</h2>
            <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed mb-8">
              Implementation, documentation, training and certification readiness.
            </p>
            <div className="flex gap-4">
              <Button variant="primary" size="lg">Request a QMS gap assessment</Button>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">Processes That Drive Quality and Audit Readiness</h2>
          <p className="text-text-secondary leading-relaxed md:text-lg">
            AeroSpark helps manufacturing, engineering and aerospace organizations build Quality Management Systems (QMS) that improve operational control, reduce nonconformances and meet customer requirements. From initial gap analysis to formal ISO 9001:2015 or AS9100D certification readiness, we develop practical systems tailored to the way your business works.
          </p>
        </section>

        {/* Process */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
          <SectionHeader
            title="Our QMS implementation process"
            description="A clear roadmap from initial analysis to final certification readiness. Click on a phase to explore the details."
          />
          
          <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Column: Sticky Phase Navigation (Desktop Only) */}
            <div className="hidden lg:flex lg:col-span-4 sticky top-32 items-center gap-6">
              {/* Vertical Title Decoration */}
              <div className="flex items-center select-none shrink-0 w-8 relative self-stretch justify-center">
                <div className="absolute whitespace-nowrap -rotate-90 flex items-center gap-3">
                  <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-aero-blue font-bold">
                    qms
                  </span>
                  <span className="text-3xl font-black uppercase tracking-[0.15em] text-text-secondary/20 dark:text-text-secondary/15">
                    process
                  </span>
                </div>
              </div>

              {/* The Menu Card */}
              <div className="flex-1 glass-panel p-6 rounded-2xl border border-border-default/60 bg-surface/50 backdrop-blur-md">
                <span className="text-xs font-mono font-bold text-text-muted uppercase tracking-wider block mb-4">
                  Implementation Progress
                </span>
                <div className="space-y-3">
                  {phasesList.map((phase) => {
                    const isActive = activePhase === phase.id;
                    return (
                      <button
                        key={phase.id}
                        onClick={() => scrollToPhase(phase.id)}
                        className={`w-full text-left p-4 rounded-xl border transition-all duration-300 flex flex-col ${
                          isActive
                            ? "bg-aero-blue/10 border-aero-blue/40 text-foreground shadow-sm"
                            : "border-transparent text-text-secondary hover:bg-surface-elevated/40 hover:text-foreground"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-xs font-mono font-bold ${isActive ? "text-aero-blue" : "text-text-muted"}`}>
                            {phase.stepRange}
                          </span>
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-aero-blue animate-pulse" />
                          )}
                        </div>
                        <span className="font-bold text-sm mb-1">{phase.title}</span>
                        <span className="text-xs text-text-secondary leading-snug">{phase.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Timeline Steps */}
            <div className="lg:col-span-8 relative ml-2 md:ml-4 space-y-16">
              {/* Vertical timeline line */}
              <div className="absolute top-0 bottom-0 left-0 w-[1px] bg-border-default/50" />

              {phasesList.map((phase, phaseIdx) => (
                <div key={phase.id} id={phase.id} className="scroll-mt-32 space-y-12">
                  {/* Phase Header on Timeline */}
                  <div className="relative pl-8 md:pl-10">
                    <span className="text-xs font-mono font-bold text-aero-blue bg-aero-blue/10 border border-aero-blue/20 px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      {phase.title}
                    </span>
                  </div>

                  {/* Steps under this phase */}
                  <div className="space-y-12">
                    {processSteps
                      .filter((_, idx) => {
                        if (phaseIdx === 0) return idx === 0 || idx === 1;
                        if (phaseIdx === 1) return idx === 2 || idx === 3;
                        if (phaseIdx === 2) return idx === 4 || idx === 5;
                        if (phaseIdx === 3) return idx === 6;
                        return false;
                      })
                      .map((item) => {
                        // find original index
                        const originalIdx = processSteps.findIndex((s) => s.step === item.step);
                        return (
                          <motion.div
                            key={item.step}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                            className="relative pl-8 md:pl-10 group"
                          >
                            {/* Connector line dot/node */}
                            <div className="absolute -left-3 md:-left-4 top-2 w-6 h-6 md:w-8 md:h-8 rounded-full border border-border-default/80 bg-background flex items-center justify-center text-text-muted group-hover:border-aero-blue group-hover:text-aero-blue group-hover:scale-110 transition-all duration-300 z-10 shadow-sm group-hover:shadow-[0_0_12px_rgba(var(--primary),0.15)]">
                              {stepIcons[originalIdx]}
                            </div>

                            <GlassCard className="hover:border-aero-blue/30 hover:shadow-md transition-all duration-300" padding="md">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-mono text-text-muted font-bold">
                                  STEP {item.step}
                                </span>
                              </div>
                              <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-aero-blue transition-colors">
                                {item.title}
                              </h3>
                              <p className="text-sm text-text-secondary leading-relaxed">
                                {item.desc}
                              </p>
                            </GlassCard>
                          </motion.div>
                        );
                      })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Documents Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground tracking-tight leading-tight">QMS documents and controls we can develop</h2>
              <p className="text-text-secondary leading-relaxed text-sm sm:text-base">
                The final document set depends on your organization, processes and selected standard. It may include:
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                {documents.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-text-secondary text-sm">
                    <CheckCircle2 className="w-5 h-5 text-aero-blue flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* AS9100D Controls Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground tracking-tight leading-tight">AS9100D controls for aerospace, defence and drone organizations</h2>
              <p className="text-text-secondary leading-relaxed text-sm sm:text-base mb-6">
                For AS9100D projects, AeroSpark strengthens the ISO 9001 foundation with aerospace-focused controls that support product integrity, traceability and supply-chain confidence.
              </p>
              <div className="p-6 border border-aero-blue/20 bg-aero-blue/5 rounded-xl">
                <h4 className="font-bold text-aero-blue mb-2">Already certified to ISO 9001?</h4>
                <p className="text-sm text-text-secondary leading-relaxed">
                  We can assess the existing QMS, identify the aerospace-specific gaps and create a structured upgrade path toward AS9100D.
                </p>
              </div>
            </div>
            <div className="lg:col-span-7">
              <ul className="space-y-6">
                {as9100dControls.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-4 text-text-secondary text-sm sm:text-base">
                    <Target className="w-5 h-5 text-aero-blue flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Audiences Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-32 flex flex-col items-center text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight mb-6">Who we support</h2>
          <p className="text-[#6b7280] leading-relaxed text-base md:text-lg mb-12 max-w-2xl">
            Our Quality Management System services are suitable for new businesses, growing organizations and established companies looking to strengthen or certify their processes.
          </p>

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
                Why choose<br className="hidden lg:block" /> AeroSpark?
              </h2>
            </div>
            <div className="lg:col-span-7">
              <div className="space-y-5">
                {whyChooseUs.map((feature, idx) => (
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
          <SectionHeader title="Frequently asked questions" />
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Ready to build a QMS that works beyond the audit?</h2>
          <p className="text-text-secondary mb-8 text-lg max-w-2xl mx-auto">
            Tell us about your organization, current processes and certification goal. AeroSpark will help define the right ISO 9001:2015 or AS9100D implementation path.
          </p>
          <Button variant="primary" size="lg" className="inline-flex items-center gap-2">
            Request a QMS gap assessment <Send className="w-4 h-4" />
          </Button>
        </section>

      </main>
      <Footer />
    </>
  );
}
