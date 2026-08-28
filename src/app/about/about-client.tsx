"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GlassCard, SectionHeader } from "@/components/ui/cards";
import { Button } from "@/components/ui/button";
import { staggerContainer, staggerItem } from "@/lib/motion";
import {
  Compass,
  Wrench,
  BookOpen,
  Cpu,
  ArrowRight,
  Mail,
  Globe,
  Rocket,
  GraduationCap,
  Briefcase,
  TrendingUp,
  CheckCircle2,
  ShieldCheck,
  Award,
  Phone
} from "lucide-react";

const team = [
  {
    name: "R. Hrithik",
    role: "Founder / Aerospace Engineer",
    bio: "Focused on advanced aerospace engineering, aerodynamics, and UAV design.",
    initials: "RH",
  },
  {
    name: "A. Ashutosh",
    role: "Founder / Aerospace Engineer",
    bio: "Focused on advanced aerospace design, engineering analysis, and simulation.",
    initials: "AA",
  },
  {
    name: "Darshan Parekh",
    role: "Firmware and Embedded Engineer",
    bio: "Focused on UAV firmware, embedded systems development, and electronics integration.",
    initials: "DP",
  },
];

const journeyTimeline = [
  {
    year: "2020",
    title: "The Beginning",
    desc: "AeroSpark began in 2020 with a group of aerospace-focused engineers and aviation professionals who shared an interest in aircraft, UAVs, design, and practical engineering. The early days were mainly about designing, learning, experimenting, and building technical capability. Aircraft and UAV concepts, CAD, aerodynamics, engineering analysis, and design development were already part of the work during this period. AeroSpark was small, and there was no attempt to position it as a large organisation. The focus was simply on developing useful engineering skills and building something around a shared interest in aerospace.",
    icon: <Rocket className="w-5 h-5" />,
    image: "/service-design.png",
  },
  {
    year: "2021",
    title: "Our First Student Batch",
    desc: "In 2021, AeroSpark conducted its first batch of students. This was the beginning of what would later develop into AeroSpark Academy. The idea was to share aerospace knowledge in a more practical way — helping students understand not only engineering theory, but also how design tools, analysis, and engineering thinking are used outside the classroom. Education gradually became an important part of AeroSpark alongside the design work that had already been happening since the beginning.",
    icon: <GraduationCap className="w-5 h-5" />,
    image: "/acad_card.png",
  },
  {
    year: "2022",
    title: "Our First Consultancy",
    desc: "In 2022, AeroSpark worked on its first consultancy project. This marked the beginning of applying the technical capabilities developed over the previous years to external engineering requirements. Consultancy was still a small part of AeroSpark at that stage. It grew naturally from the work already being done in areas such as design, UAVs, CAD, engineering analysis, simulation, documentation, and technical problem-solving.",
    icon: <Briefcase className="w-5 h-5" />,
    image: "/eng_consulting_card.png",
  },
  {
    year: "2023",
    title: "Growing Naturally",
    desc: "From 2023 onward, AeroSpark gradually developed a more structured engineering and consulting direction. This was not a sudden change in direction. It was a gradual extension of the design, engineering, and learning work that AeroSpark had been building since 2020.",
    icon: <TrendingUp className="w-5 h-5" />,
    image: "/service-cert.png",
    items: [
      "Aircraft and UAV design",
      "UAV development",
      "CAD and CAE",
      "CFD and engineering simulation",
      "Drone certification support",
      "Aerospace quality systems",
      "Engineering documentation",
      "Product development support",
      "Technical education and training"
    ]
  }
];

export default function AboutClient() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);
  return (
    <>
      <Navbar />
      <main className="pb-16">
        {/* Hero Section */}
        <section className="pt-28 pb-32 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-aero-blue/10 blur-[120px] rounded-[100%] pointer-events-none z-0" />
          <div className="absolute inset-0 radar-grid opacity-30 z-0" />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left Column: Text */}
              <div className="lg:col-span-7 space-y-6">
                <span className="text-[#FF6600] font-bold text-xs uppercase tracking-widest block">
                  ABOUT AEROSPARK
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground/90 to-foreground/50 leading-tight">
                  Built Through Design, Learning and Engineering
                </h1>
                <div className="space-y-4 text-text-secondary text-sm md:text-base leading-relaxed">
                  <p>
                    AeroSpark started in 2020 as a small group of people with backgrounds in aerospace engineering, aircraft maintenance, design, and aviation.
                  </p>
                  <p>
                    From the beginning, the focus was practical. The team spent time working around aircraft and UAV design, CAD modelling, aerodynamics, engineering analysis, and understanding how aerospace concepts translate into real engineering work.
                  </p>
                  <div className="border-l-4 border-[#FF6600] bg-[#FF6600]/5 p-4 rounded-r-xl my-4">
                    <p className="font-semibold text-foreground text-sm md:text-base leading-relaxed">
                      Design has been part of AeroSpark from the very beginning. It was not something introduced later when consultancy started.
                    </p>
                  </div>
                  <p>
                    As the team gained experience, AeroSpark gradually expanded into technical education, engineering consultancy, simulation, certification support, and aerospace quality systems.
                  </p>
                </div>
              </div>

              {/* Right Column: Clean Vector Image Box */}
              <div className="lg:col-span-5 relative flex items-center justify-center">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-br from-[#FF6600]/10 to-aero-blue/10 blur-lg opacity-40" />
                <div className="relative glass-panel rounded-3xl overflow-hidden border border-border-default/60 shadow-2xl bg-surface-elevated/40 p-4">
                  <img
                    src="/aerospace_hero_vector.png"
                    alt="Aerospace Engineering Concept"
                    className="w-full h-auto object-contain max-h-[380px] rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why AeroSpark Exists */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 text-center">
          <GlassCard padding="lg" className="border-l-4 border-l-[#FF6600] border-border-default/60 shadow-lg text-left max-w-4xl mx-auto" glow="none">
            <h3 className="text-xl font-bold mb-3 text-foreground flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#FF6600]" /> A Philosophy Built on Practical Application
            </h3>
            <p className="text-text-secondary text-sm md:text-base leading-relaxed">
              Aerospace is a field where theory and application have to work together. AeroSpark was created to bring those two sides closer — helping businesses tackle engineering challenges while helping learners understand how aerospace concepts are applied in practice.
            </p>
          </GlassCard>
        </section>

        {/* Our Journey (Grid Layout) */}
        {/* Our Journey (Sticky Stacking Layout) */}
        {/* Our Journey (Sticky Stacking Layout) */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-48">
          <SectionHeader
            title="Our Journey"
            description="How AeroSpark developed naturally from technical experimentation to specialized engineering services."
          />

          <div className="mt-16 space-y-24">
            {journeyTimeline.map((item, idx) => {
              const topOffset = 120 + idx * 32;
              return (
                <div
                  key={item.year}
                  id={`step-${item.year}`}
                  style={isDesktop ? {
                    position: "sticky",
                    top: `${topOffset}px`,
                    zIndex: (idx + 1) * 10,
                  } : {}}
                  className="w-full"
                >
                  <GlassCard
                    className="border-border-default/80 shadow-2xl bg-surface-elevated/95 backdrop-blur-md hover:border-[#FF6600]/40 transition-colors duration-300 min-h-[360px]"
                    padding="lg"
                    glow="none"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                      {/* Text Column */}
                      <div className={`lg:col-span-7 space-y-6 ${idx % 2 === 0 ? "lg:order-2" : "lg:order-1"}`}>
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-mono font-bold px-4 py-1.5 bg-[#FF6600]/10 border border-[#FF6600]/20 text-[#FF6600] rounded-full uppercase tracking-wider">
                              {item.year === "2023" ? "2023 Onwards" : item.year}
                            </span>
                            <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center text-[#FF6600] border border-border-subtle shadow-sm">
                              {item.icon}
                            </div>
                          </div>
                          <h4 className="text-2xl font-bold text-foreground mb-3">{item.title}</h4>
                          <p className="text-base text-text-secondary leading-relaxed">{item.desc}</p>
                        </div>

                        {item.items && (
                          <div className="pt-6 border-t border-border-subtle">
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                              {item.items.map((srv, srvIdx) => (
                                <li key={srvIdx} className="flex items-center gap-3 text-sm text-text-secondary font-medium">
                                  <CheckCircle2 className="w-4 h-4 text-[#FF6600] flex-shrink-0" />
                                  <span>{srv}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Image Column */}
                      <div className={`lg:col-span-5 relative h-64 md:h-80 rounded-2xl overflow-hidden border border-border-subtle bg-surface-elevated/40 ${idx % 2 === 0 ? "lg:order-1" : "lg:order-2"}`}>
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent pointer-events-none" />
                      </div>
                    </div>
                  </GlassCard>
                </div>
              );
            })}
          </div>
        </section>

        {/* Trust & Quality Compliance Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
          <SectionHeader
            title="Building Trust Through Engineering Standards"
            description="Our consulting and educational services are structured around international aerospace benchmarks and strict confidentiality."
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {/* NDA & Confidentiality Card */}
            <GlassCard padding="lg" className="space-y-4 border-border-default/60 hover:border-[#FF6600]/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#FF6600]/10 flex items-center justify-center text-[#FF6600]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-foreground">Strict Design Confidentiality</h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                We protect your proprietary technical IP. AeroSpark operates under robust Non-Disclosure Agreements (NDAs) to secure UAV drawings, simulations, software setups, and flight configurations.
              </p>
            </GlassCard>

            {/* Aerospace Standards Compliance Card */}
            <GlassCard padding="lg" className="space-y-4 border-border-default/60 hover:border-[#FF6600]/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#FF6600]/10 flex items-center justify-center text-[#FF6600]">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-foreground">Compliance Aligned</h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                Whether supporting AS9100D systems or preparing flight test evidence, our workflows align with DGCA guidelines, CAR 2021 Drone Rules, and international aviation standards.
              </p>
            </GlassCard>

            {/* Core Stats Card */}
            <GlassCard padding="lg" className="space-y-4 border-border-default/60 hover:border-[#FF6600]/40 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-[#FF6600]/10 flex items-center justify-center text-[#FF6600]">
                <Compass className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-foreground">Technical Journey</h4>
              <p className="text-sm text-text-secondary leading-relaxed">
                Founded in 2020, our journey has spanned over 6 years of aircraft/UAS design, simulation projects, technical education batches, and quality management consulting.
              </p>
            </GlassCard>
          </div>
        </section>



        {/* Core Philosophy Section */}
        <section className="py-24 border-t border-b border-border-subtle/50 bg-surface-elevated/5 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-[#FF6600]/5 blur-[80px] rounded-full pointer-events-none" />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
            <span className="text-[#FF6600] font-bold text-xs uppercase tracking-widest block">
              Our Core Philosophy
            </span>
            <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground leading-relaxed max-w-3xl mx-auto">
              AeroSpark is still growing, and we prefer to describe that journey for what it is — gradual, technical, and built through experience.
            </p>
            <div className="text-xs font-mono font-bold text-[#FF6600] uppercase tracking-widest pt-4">
              Learn. Design. Engineer. Build.
            </div>
          </div>
        </section>

        {/* The People Behind AeroSpark */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <span className="text-[#FF6600] font-bold text-xs uppercase tracking-widest block mb-3">
                The People Behind AeroSpark
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mb-6">
                Engineers, Educators and Problem Solvers.
              </h2>
              <p className="text-text-secondary text-base md:text-lg leading-relaxed">
                AeroSpark is being built by people who share an interest in aerospace engineering, UAV technology, technical education, and solving practical engineering problems.
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            >
              {team.map((member) => (
                <motion.div key={member.name} variants={staggerItem}>
                  <GlassCard className="text-center group" glow="blue">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-aero-blue/20 to-aero-red/20 flex items-center justify-center text-foreground text-xl font-bold mx-auto mb-4">
                      {member.initials}
                    </div>
                    <h3 className="text-base font-semibold text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-xs text-aero-blue font-medium uppercase tracking-wider mt-1 mb-3">
                      {member.role}
                    </p>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {member.bio}
                    </p>
                    <div className="flex items-center justify-center gap-3 mt-4 pt-4 border-t border-border-subtle">
                      <a href="mailto:connect@aerospark.in" className="text-text-muted hover:text-aero-blue transition-colors">
                        <Mail className="w-4 h-4" />
                      </a>
                      <a href="https://aerospark.io" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-aero-blue transition-colors">
                        <Globe className="w-4 h-4" />
                      </a>
                      <a href="https://wa.me/919825855088" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-green-500 transition-colors" title="WhatsApp: 9825855088">
                        <Phone className="w-4 h-4" />
                      </a>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-panel rounded-2xl p-12"
            >
              <span className="text-[#FF6600] font-bold text-xs uppercase tracking-widest block mb-4">
                WORK WITH AEROSPARK
              </span>
              <h2 className="text-3xl font-bold text-foreground mb-4 tracking-tight">
                Let&apos;s Build What&apos;s Next in Flight.
              </h2>
              <p className="text-text-secondary mb-8 max-w-lg mx-auto">
                Whether you&apos;re developing a UAV, working through a certification challenge, or looking to strengthen your aerospace engineering skills, start a conversation with AeroSpark.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="primary" size="lg" href="/consultation" className="bg-[#FF6600] text-white hover:bg-[#e65c00] border-none shadow-lg">
                  Discuss Your Project
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button variant="secondary" size="lg" href="/academy">
                  Explore AeroSpark Academy
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
