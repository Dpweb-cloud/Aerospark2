"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { GlassCard, SectionHeader } from "@/components/ui/cards";
import {
  Send,
  Layers,
  Box,
  Wind,
  ThermometerSun,
  Activity,
  Zap,
  CheckCircle2,
  HelpCircle,
  Monitor,
  Laptop,
  FileCode,
  Repeat
} from "lucide-react";

export default function DesignSimulationPage() {
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
    <Monitor className="w-4 h-4 md:w-5 md:h-5" key="1" />,
    <Box className="w-4 h-4 md:w-5 md:h-5" key="2" />,
    <Layers className="w-4 h-4 md:w-5 md:h-5" key="3" />,
    <Activity className="w-4 h-4 md:w-5 md:h-5" key="4" />,
    <Repeat className="w-4 h-4 md:w-5 md:h-5" key="5" />,
    <Send className="w-4 h-4 md:w-5 md:h-5" key="6" />,
  ];

  const phasesList = [
    {
      id: "phase1",
      title: "Phase 1: Input & CAD",
      desc: "Define loading parameters and prepare the geometric models",
      stepRange: "Steps 01 - 02",
    },
    {
      id: "phase2",
      title: "Phase 2: Simulation Setup",
      desc: "Establish materials, boundaries, loads, and meshing",
      stepRange: "Step 03",
    },
    {
      id: "phase3",
      title: "Phase 3: Analysis & Optimize",
      desc: "Compute fluid/structural response and optimize features",
      stepRange: "Steps 04 - 05",
    },
    {
      id: "phase4",
      title: "Phase 4: Handover",
      desc: "Compile engineering report and export design files",
      stepRange: "Step 06",
    },
  ];
  const coreServices = [
    { title: "CAD Design & Product Development", desc: "3D part modelling, assemblies, concept development, design modifications and production-ready drawings.", icon: <Box className="w-6 h-6" /> },
    { title: "Finite Element Analysis (FEA)", desc: "Structural strength, stress, deformation, fatigue, buckling, modal and vibration assessments.", icon: <Activity className="w-6 h-6" /> },
    { title: "Computational Fluid Dynamics (CFD)", desc: "Airflow, pressure, velocity, cooling, internal flow and external flow performance studies.", icon: <Wind className="w-6 h-6" /> },
    { title: "Thermal Analysis", desc: "Temperature distribution, heat transfer, cooling performance and thermal-structural behaviour.", icon: <ThermometerSun className="w-6 h-6" /> },
    { title: "Advanced Simulation", desc: "Dynamic, nonlinear, impact, harmonic response and coupled engineering simulations as required.", icon: <Zap className="w-6 h-6" /> },
    { title: "Design Optimization", desc: "Improve strength, reduce weight, enhance cooling and refine product performance before manufacturing.", icon: <Layers className="w-6 h-6" /> },
  ];

  const processSteps = [
    { step: "01", title: "Requirement Review", desc: "We define the design goal, operating conditions, loads, materials and expected results." },
    { step: "02", title: "CAD & Model Preparation", desc: "The geometry is created, reviewed or prepared for accurate simulation." },
    { step: "03", title: "Simulation Setup", desc: "Materials, loads, contacts, boundary conditions and operating inputs are established." },
    { step: "04", title: "Analysis & Review", desc: "The required structural, flow or thermal simulations are completed and interpreted." },
    { step: "05", title: "Design Improvement", desc: "The design is refined to improve performance, reliability, weight or manufacturability." },
    { step: "06", title: "Final Handover", desc: "You receive the agreed CAD files, simulation results and engineering report." },
  ];

  const softwareStack = [
    { title: "Design & CAD", desc: "CATIA, Siemens NX, SolidWorks and Autodesk Fusion 360", icon: <Monitor className="w-5 h-5 text-[#FF6B00]" /> },
    { title: "Simulation & Analysis", desc: "ANSYS and other suitable engineering simulation tools based on the project scope", icon: <Laptop className="w-5 h-5 text-[#FF6B00]" /> },
    { title: "File Compatibility", desc: "Common CAD and neutral exchange formats for smooth collaboration and handover", icon: <FileCode className="w-5 h-5 text-[#FF6B00]" /> },
    { title: "Flexible Workflow", desc: "Client-specific software environments can be considered during project planning", icon: <Repeat className="w-5 h-5 text-[#FF6B00]" /> },
  ];

  const deliverables = [
    "3D CAD models and assemblies",
    "Manufacturing drawings",
    "Material, load and boundary-condition summary",
    "FEA, CFD or thermal simulation results",
    "Stress, deformation, flow, pressure or temperature plots",
    "Design improvement recommendations",
    "Optimized design files",
    "Final engineering report"
  ];

  const whyChooseUs = [
    { title: "Design and Analysis Together", desc: "CAD and simulation are managed through one coordinated engineering workflow." },
    { title: "Requirement-Based Approach", desc: "Every project is planned around the actual design goal and operating condition." },
    { title: "Early Risk Identification", desc: "Potential structural, thermal and flow issues are identified before manufacturing." },
    { title: "Practical Optimization", desc: "We focus on improvements that support performance, weight, reliability and manufacturability." },
    { title: "Clear Engineering Reports", desc: "Results are presented with direct conclusions and actionable recommendations." }
  ];

  const faqs = [
    { q: "Can you create a design from an initial idea?", a: "Yes. We can develop the CAD model from requirements, sketches, reference files or an existing concept." },
    { q: "Can you analyse an existing CAD model?", a: "Yes. Existing models can be reviewed, cleaned and prepared for the required simulation." },
    { q: "Which simulations do you provide?", a: "Our services include FEA, CFD, thermal, vibration, fatigue, buckling, dynamic and other simulations based on the project need." },
    { q: "Can you optimize an existing design?", a: "Yes. We can recommend changes in material, geometry, thickness, cooling or structural layout based on the results." },
    { q: "Will I receive a final report?", a: "Yes. The agreed deliverables can include inputs, assumptions, methodology, results, conclusions and recommendations." }
  ];

  return (
    <>
      <Navbar />
      <main className="pb-16">
        {/* Hero */}
        <section className="mt-16 lg:mt-20 pt-16 lg:pt-20 pb-32 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-aero-blue/10 blur-[120px] rounded-[100%] pointer-events-none z-0" />
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src="/IMAGE/Design, Simulation.png"
              alt="Simulation Background"
              className="w-full h-full object-cover opacity-35 dark:opacity-45"
            />
            <div className="absolute inset-0 bg-background/40 backdrop-blur-[1px]" />
          </div>

          <div className="absolute inset-0 radar-grid opacity-30 z-0" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
            <span className="text-[#FF6B00] font-bold tracking-widest uppercase mb-4 text-xs md:text-sm">CAD • FEA • CFD • THERMAL • DESIGN OPTIMIZATION</span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground/90 to-foreground/50">
              Engineering Design &<br />Simulation Services
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed mb-8">
              Design smarter. Validate earlier. Build with confidence.
            </p>
            <div className="flex gap-4">
              <Button size="lg" href="/contact" className="bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold shadow-md shadow-[#FF6B00]/10 hover:shadow-[#FF6B00]/20 transition-all duration-300">
                START YOUR SIMULATION PROJECT
              </Button>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-24 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">Design Smarter. Validate Earlier. Build Better.</h2>
          <div className="p-8 bg-surface-elevated border border-border-default rounded-2xl inline-block max-w-4xl text-left">
            <h3 className="text-xl font-bold mb-3 text-foreground">Complete Design and Simulation Support</h3>
            <p className="text-text-secondary">
              A good design must perform reliably under real operating conditions. Our team combines CAD, engineering calculations and simulation to evaluate strength, airflow, heat transfer, vibration and overall performance before the design is finalized.
            </p>
          </div>
        </section>

        {/* Core Services */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <SectionHeader title="Our Core Services" />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreServices.map((service, idx) => (
              <GlassCard key={idx} className="h-full" padding="md">
                <div className="text-[#FF6B00] mb-4 inline-flex p-3 rounded-xl bg-[#062B49]/5 border border-[#D9E4EE]">{service.icon}</div>
                <h4 className="font-bold text-foreground mb-3 text-lg">{service.title}</h4>
                <p className="text-sm text-text-secondary leading-relaxed">{service.desc}</p>
              </GlassCard>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
          <SectionHeader
            title="How We Work"
            description="Our structured engineering design & simulation process."
          />
          
          <div className="mt-16 max-w-5xl mx-auto relative space-y-16">
            {/* Vertical timeline line */}
            <div className="absolute top-0 bottom-0 left-4 md:left-1/2 w-[2px] bg-gradient-to-b from-border-default/20 via-border-default/80 to-border-default/20 -translate-x-1/2" />

            {phasesList.map((phase, phaseIdx) => (
              <div key={phase.id} id={phase.id} className="scroll-mt-32 space-y-12">
                {/* Phase Header on Timeline */}
                <div className="relative flex justify-start md:justify-center pl-12 md:pl-0">
                  <span className="text-xs font-mono font-bold text-[#FF6B00] bg-[#FF6B00]/5 border border-[#FF6B00]/20 px-4 py-1.5 rounded-full uppercase tracking-wider shadow-sm z-10">
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
                      if (phaseIdx === 3) return idx === 5;
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
                              <h3 className="text-lg font-bold text-[#062B49] mb-2 group-hover:text-[#FF6B00] transition-colors">
                                {item.title}
                              </h3>
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

        {/* Software Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground tracking-tight leading-tight">Engineering Software We Work With</h2>
              <p className="text-text-secondary leading-relaxed text-sm sm:text-base">
                Software is selected according to the project requirement, client preference, file format and analysis scope. Our engineering workflow can include:
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="space-y-4">
                {softwareStack.map((sw, idx) => (
                  <div key={idx} className="flex gap-4 p-5 border border-border-default rounded-2xl bg-surface hover:bg-surface-elevated transition-colors shadow-sm">
                    <div className="mt-1">{sw.icon}</div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">{sw.title}</h4>
                      <p className="text-sm text-text-secondary leading-relaxed">{sw.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Deliverables Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-foreground tracking-tight leading-tight">What You Receive</h2>
              <p className="text-text-secondary leading-relaxed text-sm sm:text-base">
                Depending on the agreed scope, the project package may include:
              </p>
            </div>
            <div className="lg:col-span-7">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                {deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-text-secondary">
                    <CheckCircle2 className="w-5 h-5 text-[#FF6B00] flex-shrink-0" />
                    <span className="leading-relaxed text-sm sm:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#062B49] tracking-tight">
              Why Choose AeroSpark?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((feature, idx) => (
              <div key={idx} className="flex flex-col gap-3 p-5 rounded-2xl bg-white border border-[#D9E4EE] shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-[#2F80ED] flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#062B49] mb-1.5 text-base">{feature.title}</h4>
                  <p className="text-xs text-[#52677D] leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQs Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#062B49] tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-5 border border-[#D9E4EE] rounded-2xl bg-white shadow-sm flex flex-col gap-2">
                <h4 className="text-[15px] font-bold text-[#062B49] flex gap-2.5 items-start">
                  <HelpCircle className="text-[#2F80ED] w-4.5 h-4.5 flex-shrink-0 mt-0.5" />
                  {faq.q}
                </h4>
                <p className="text-xs text-[#52677D] pl-7 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-gradient-to-br from-surface to-surface-elevated border border-border-default rounded-3xl p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Turn Your Engineering Idea into a Validated Design</h2>
          <p className="text-text-secondary mb-8 text-lg max-w-2xl mx-auto">
            Share your concept, CAD model or simulation requirement with AeroSpark and move forward with clear engineering evidence.
          </p>
          <Button size="lg" href="/contact" className="inline-flex items-center gap-2 bg-[#FF6B00] hover:bg-[#E05E00] text-white font-bold shadow-md shadow-[#FF6B00]/10 hover:shadow-[#FF6B00]/20 transition-all duration-300">
            START YOUR DESIGN AND SIMULATION PROJECT <Send className="w-4 h-4" />
          </Button>
        </section>

      </main>
      <Footer />
    </>
  );
}

