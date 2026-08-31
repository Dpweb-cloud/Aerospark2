"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { staggerContainer, staggerItem } from "@/lib/motion";
import {
  ArrowRight,
  Rocket,
  GraduationCap,
  Briefcase,
  TrendingUp,
  CheckCircle2,
  ShieldCheck,
  Award,
  Compass,
  Plane,
  FlaskConical,
  BookOpen,
  Zap,
} from "lucide-react";

// ─── DATA ────────────────────────────────────────────────
const journeyTimeline = [
  {
    year: "2020",
    num: "01",
    title: "The Beginning",
    desc: "AeroSpark began with a small aerospace-focused team working around aircraft and UAV concepts, CAD, aerodynamics, engineering analysis and design development. The early focus was simple: build strong technical skills and create useful engineering work.",
    icon: <Rocket className="w-5 h-5" />,
    image: "/service-design.png",
    accent: "#FF6600",
  },
  {
    year: "2021",
    num: "02",
    title: "Our First Student Batch",
    desc: "AeroSpark conducted its first student batch in 2021. The aim was to teach aerospace in a practical way, connecting classroom concepts with design tools, analysis and real engineering thinking. This became the foundation of AeroSpark Academy.",
    icon: <GraduationCap className="w-5 h-5" />,
    image: "/acad_card.png",
    accent: "#3B82F6",
  },
  {
    year: "2022",
    num: "03",
    title: "Our First Consultancy",
    desc: "In 2022, AeroSpark took on its first consultancy project — the next step in applying design, analysis, simulation, documentation and problem-solving skills to real client requirements.",
    icon: <Briefcase className="w-5 h-5" />,
    image: "/eng_consulting_card.png",
    accent: "#10B981",
  },
  {
    year: "2023+",
    num: "04",
    title: "Specialised Engineering Services",
    desc: "From 2023 onward, AeroSpark developed a more structured engineering and consulting practice covering UAV design and development, CAD/CAE, CFD and simulation, drone certification support, aerospace quality systems, engineering documentation and technical training.",
    icon: <TrendingUp className="w-5 h-5" />,
    image: "/service-cert.png",
    accent: "#8B5CF6",
    items: [
      "UAV design and development",
      "CAD and CAE",
      "CFD and simulation",
      "Drone certification support",
      "Aerospace quality systems",
      "Engineering documentation",
    ],
  },
];

const capabilities = [
  {
    icon: <Plane className="w-8 h-8" />,
    title: "Design & UAV Engineering",
    desc: "Aircraft and UAV concepts, CAD, aerodynamics, design development and practical engineering problem solving.",
    href: "/consultation/drone-rd",
    color: "#FF6600",
  },
  {
    icon: <FlaskConical className="w-8 h-8" />,
    title: "Simulation & Analysis",
    desc: "CFD, CAE, engineering analysis, documentation and design validation for aerospace and UAV projects.",
    href: "/consultation/design-simulation",
    color: "#3B82F6",
  },
  {
    icon: <BookOpen className="w-8 h-8" />,
    title: "Academy & Training",
    desc: "Practical aerospace learning, course development and technical mentoring through AeroSpark Academy.",
    href: "/academy",
    color: "#10B981",
  },
];

const trustItems = [
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    title: "Technical Confidentiality",
    desc: "We work under NDAs where required — drawings, simulations, software setups, flight configurations and technical data are handled with care.",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Standards-Aware",
    desc: "Engineering and documentation developed with applicable requirements in mind — DGCA rules, certification needs and aerospace quality practices.",
  },
  {
    icon: <Compass className="w-6 h-6" />,
    title: "Engineering First",
    desc: "Clear requirements, useful analysis and practical decisions. We don't make projects more complicated than they need to be.",
  },
];

// ─── PAGE ────────────────────────────────────────────────
export default function AboutClient() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <>
      <Navbar />
      <main className="overflow-x-hidden">

        {/* ═══════════════════════════
            1. HERO
        ═══════════════════════════ */}
        <section className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
          {/* BG */}
          <div className="absolute inset-0 radar-grid opacity-[0.10] z-0" />
          <div className="absolute top-[-10%] right-[-10%] w-[700px] h-[700px] rounded-full bg-aero-blue/6 blur-[160px] pointer-events-none z-0" />
          <div className="absolute bottom-0 left-[-5%] w-[400px] h-[400px] rounded-full bg-[#FF6600]/5 blur-[120px] pointer-events-none z-0" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

              {/* TEXT — no staggerContainer wrapper to avoid opacity:0 bug */}
              <div className="space-y-8">
                <motion.span
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-[#FF6600] text-[11px] font-bold tracking-widest uppercase"
                >
                  Who We Are
                </motion.span>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.05] text-foreground"
                >
                  Built Through{" "}
                  <span className="text-[#FF6600] relative inline-block">
                    Design,
                    <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-[#FF6600]/30 rounded-full" />
                  </span>
                  <br />
                  Learning and Engineering
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.35 }}
                  className="flex flex-wrap gap-4"
                >
                  <Button variant="primary" size="lg" href="/consultation" className="bg-[#FF6600] text-white hover:bg-[#e65c00] border-none shadow-lg shadow-[#FF6600]/20">
                    Discuss Your Project <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button variant="secondary" size="lg" href="/academy">
                    Explore Academy
                  </Button>
                </motion.div>
              </div>

              {/* IMAGE */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9, delay: 0.15 }}
                className="hidden lg:flex items-center justify-center relative"
              >
                <div className="absolute w-[480px] h-[480px] rounded-full border border-[#FF6600]/8 animate-[spin_40s_linear_infinite]" />
                <div className="absolute w-[360px] h-[360px] rounded-full border border-aero-blue/8 animate-[spin_25s_linear_infinite_reverse]" />
                <div className="absolute w-[560px] h-[560px] rounded-full bg-[#FF6600]/4 blur-[60px]" />

                <div className="relative rounded-[2.5rem] border border-white/10 shadow-2xl bg-[#062B49]/60 backdrop-blur-md p-4">
                  <img
                    src="/about_hero.png"
                    alt="AeroSpark Aerospace Engineering"
                    className="w-full max-w-[400px] h-auto object-contain rounded-[2rem]"
                  />
                </div>

                {/* Floating tags */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="absolute -bottom-5 left-0 bg-white dark:bg-surface border border-border-default/60 shadow-xl rounded-2xl px-4 py-3 flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#FF6600]/15 flex items-center justify-center text-[#FF6600]">
                    <Rocket className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider">Founded</p>
                    <p className="text-sm font-bold text-foreground">Since 2020</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className="absolute -top-5 right-0 bg-[#062B49] border border-white/10 shadow-xl rounded-2xl px-4 py-3 flex items-center gap-3"
                >
                  <div className="w-8 h-8 rounded-xl bg-[#FF6600]/20 flex items-center justify-center text-[#FF6600]">
                    <Plane className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Focus</p>
                    <p className="text-sm font-bold text-white">UAV Engineering</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Stats bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-20 grid grid-cols-3 md:grid-cols-3 gap-6 max-w-xl border-t border-border-subtle/40 pt-10"
            >
              {[
                { val: "2020", label: "Founded" },
                { val: "6+", label: "Years Active" },
                { val: "3", label: "Core Areas" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-3xl font-extrabold text-foreground tracking-tight">{s.val}</p>
                  <p className="text-xs text-text-muted font-semibold uppercase tracking-wider mt-1">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══════════════════════════
            2. JOURNEY
        ═══════════════════════════ */}
        <section className="py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-20 max-w-2xl"
            >
              <span className="text-[#FF6600] font-bold text-xs uppercase tracking-widest block mb-4">Our Journey</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight leading-tight mb-5">
                Growing Step by Step
              </h2>
              <p className="text-text-secondary text-base leading-relaxed">
                From technical learning and design work to education, consulting and specialised aerospace services.
              </p>
            </motion.div>

            <div className="space-y-5">
              {journeyTimeline.map((item, idx) => {
                const topOffset = 88 + idx * 22;
                return (
                  <div
                    key={item.year}
                    style={isDesktop ? { position: "sticky", top: `${topOffset}px`, zIndex: (idx + 1) * 10 } : {}}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.5 }}
                      className="group rounded-[28px] border border-border-default/50 bg-surface/95 backdrop-blur-lg shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden relative"
                    >
                      {/* Left color accent */}
                      <div
                        className="absolute left-0 top-0 bottom-0 w-1 transition-all duration-300 group-hover:w-1.5"
                        style={{ background: `linear-gradient(to bottom, ${item.accent}, ${item.accent}88)` }}
                      />

                      <div className="grid grid-cols-1 lg:grid-cols-12">
                        {/* TEXT */}
                        <div className={`lg:col-span-7 p-8 md:p-10 flex flex-col justify-center gap-5 ${idx % 2 === 0 ? "lg:order-1" : "lg:order-2"}`}>
                          {/* Header */}
                          <div className="flex items-center gap-4">
                            <div
                              className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md shrink-0"
                              style={{ background: `linear-gradient(135deg, ${item.accent}, ${item.accent}99)` }}
                            >
                              {item.icon}
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">STEP {item.num}</span>
                              <span className="text-xs font-bold text-foreground bg-surface-elevated border border-border-subtle/60 px-3 py-1 rounded-full">{item.year}</span>
                            </div>
                          </div>

                          <h3
                            className="text-2xl md:text-3xl font-bold text-foreground leading-tight transition-colors duration-300"
                            style={{ "--tw-hover-color": item.accent } as any}
                          >
                            {item.title}
                          </h3>

                          <p className="text-text-secondary text-[15px] leading-relaxed">{item.desc}</p>

                          {item.items && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t border-border-subtle/50">
                              {item.items.map((srv, i) => (
                                <div key={i} className="flex items-center gap-2.5 text-sm text-text-secondary">
                                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: item.accent }} />
                                  {srv}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>

                        {/* IMAGE */}
                        <div className={`lg:col-span-5 relative min-h-[220px] md:min-h-[280px] overflow-hidden ${idx % 2 === 0 ? "lg:order-2 rounded-r-[28px]" : "lg:order-1 rounded-l-[28px]"}`}>
                          <img
                            src={item.image}
                            alt={item.title}
                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-surface/30 via-transparent to-transparent" />
                          <div
                            className="absolute bottom-4 right-5 text-[72px] font-black leading-none select-none pointer-events-none opacity-[0.06]"
                            style={{ color: item.accent }}
                          >
                            {item.year}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════
            3. HOW WE WORK (Trust)
        ═══════════════════════════ */}
        <section className="py-24 bg-[#062B49] relative overflow-hidden">
          <div className="absolute inset-0 radar-grid opacity-10" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF6600]/10 blur-[120px] rounded-full" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <span className="text-[#FF6600] font-bold text-xs uppercase tracking-widest block mb-4">How We Work</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
                Care, Quality and Practical Engineering
              </h2>
              <p className="text-white/50 text-base md:text-lg max-w-xl mx-auto">
                Aerospace projects involve sensitive designs and strict requirements. We keep our approach clear and practical.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {trustItems.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative rounded-[22px] border border-white/8 bg-white/5 hover:bg-white/10 hover:border-[#FF6600]/30 transition-all duration-400 p-8"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#FF6600]/15 border border-[#FF6600]/20 flex items-center justify-center text-[#FF6600] mb-5 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-[#FF6600] to-transparent transition-all duration-500 rounded-full" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════
            4. CAPABILITIES
        ═══════════════════════════ */}
        <section className="py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-[#FF6600] font-bold text-xs uppercase tracking-widest block mb-4">What We Do</span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-5">
                Three Core Areas
              </h2>
              <p className="text-text-secondary text-base md:text-lg max-w-xl mx-auto">
                AeroSpark is built around practical aerospace engineering, UAV development, simulation and technical learning.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-7 max-w-5xl mx-auto">
              {capabilities.map((cap, i) => (
                <motion.div
                  key={cap.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={cap.href}
                    className="group relative block rounded-[24px] border border-border-default/40 bg-surface-elevated/40 hover:shadow-2xl hover:-translate-y-2 transition-all duration-400 overflow-hidden p-8 text-center h-full"
                  >
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-[0.06] transition-opacity duration-400"
                      style={{ background: cap.color }}
                    />
                    <div
                      className="absolute inset-x-0 bottom-0 h-[2px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                      style={{ background: `linear-gradient(to right, ${cap.color}, transparent)` }}
                    />
                    <div className="relative z-10 flex flex-col items-center">
                      <div
                        className="w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300"
                        style={{ background: `linear-gradient(135deg, ${cap.color}, ${cap.color}cc)` }}
                      >
                        {cap.icon}
                      </div>
                      <span className="text-[10px] text-text-muted font-bold uppercase tracking-widest mb-2">Core Capability</span>
                      <h3 className="text-[17px] font-bold text-foreground mb-3 leading-snug group-hover:text-[#FF6600] transition-colors">{cap.title}</h3>
                      <p className="text-sm text-text-secondary leading-relaxed mb-5">{cap.desc}</p>
                      <span className="inline-flex items-center gap-1.5 text-sm font-bold opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" style={{ color: cap.color }}>
                        Learn more <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════
            5. TAGLINE
        ═══════════════════════════ */}
        <section className="py-24 relative overflow-hidden border-y border-border-subtle/30">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#FF6600]/3 to-transparent" />
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { word: "Learn", icon: <BookOpen className="w-7 h-7" />, sub: "Understand deeply." },
                { word: "Design", icon: <Plane className="w-7 h-7" />, sub: "Think and model." },
                { word: "Engineer", icon: <FlaskConical className="w-7 h-7" />, sub: "Analyse and build." },
                { word: "Build", icon: <Rocket className="w-7 h-7" />, sub: "Deliver real work." },
              ].map((item, i) => (
                <motion.div
                  key={item.word}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group rounded-[20px] border border-border-default/40 bg-surface-elevated/30 hover:border-[#FF6600]/40 hover:bg-[#FF6600]/5 hover:-translate-y-1.5 transition-all duration-300 p-6 text-center cursor-default"
                >
                  <div className="text-text-muted group-hover:text-[#FF6600] transition-colors duration-300 mb-4 flex justify-center">
                    {item.icon}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-foreground group-hover:text-[#FF6600] transition-colors tracking-tight mb-1">{item.word}</h3>
                  <p className="text-xs text-text-muted">{item.sub}</p>
                </motion.div>
              ))}
            </div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-center text-text-muted text-sm mt-8"
            >
              Four words that describe how AeroSpark approaches both engineering and learning.
            </motion.p>
          </div>
        </section>

        {/* ═══════════════════════════
            6. CTA
        ═══════════════════════════ */}
        <section className="py-24 pb-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative rounded-[32px] overflow-hidden bg-[#062B49] border border-white/8 shadow-2xl"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,102,0,0.18),transparent_55%)]" />
              <div className="absolute inset-0 radar-grid opacity-[0.08]" />
              <div className="relative z-10 p-12 md:p-16 text-center">
                <span className="inline-flex items-center gap-2 bg-[#FF6600]/15 border border-[#FF6600]/25 text-[#FF6600] text-[11px] font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-6">
                  <Zap className="w-3 h-3" /> Work With AeroSpark
                </span>
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 tracking-tight leading-tight">
                  Let&apos;s Build What&apos;s<br className="hidden md:block" /> Next in Flight.
                </h2>
                <p className="text-white/55 text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                  Whether you&apos;re developing a UAV, working through a certification challenge, looking for engineering support, or building your aerospace skills — AeroSpark can help you take the next practical step.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button variant="primary" size="lg" href="/consultation" className="bg-[#FF6600] text-white hover:bg-[#e65c00] border-none shadow-xl shadow-[#FF6600]/20">
                    Discuss Your Project <ArrowRight className="w-4 h-4" />
                  </Button>
                  <Button variant="secondary" size="lg" href="/academy" className="border-white/20 text-white hover:bg-white/10 hover:border-white/30 bg-transparent">
                    Explore AeroSpark Academy
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
