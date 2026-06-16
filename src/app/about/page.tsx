"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GlassCard, SectionHeader } from "@/components/ui/cards";
import { Button } from "@/components/ui/button";
import { staggerContainer, staggerItem } from "@/lib/motion";
import {
  Rocket,
  Target,
  Globe,
  Users,
  Award,
  Lightbulb,
  ArrowRight,
  Mail,
} from "lucide-react";

const values = [
  {
    icon: <Target className="w-6 h-6" />,
    title: "Mission-Driven",
    description:
      "Every course, consultation, and tool is built to advance aerospace engineering capabilities in India and beyond.",
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Innovation First",
    description:
      "We leverage cutting-edge AI, simulation tools, and interactive platforms to deliver world-class learning experiences.",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Industry Connected",
    description:
      "Deep partnerships with aerospace OEMs, startups, and regulatory bodies ensure our content stays relevant.",
  },
  {
    icon: <Award className="w-6 h-6" />,
    title: "Excellence Standard",
    description:
      "Every certification issued meets rigorous quality standards aligned with AS9100D and DGCA frameworks.",
  },
];

const team = [
  {
    name: "Dr. Arun Mehta",
    role: "Founder & CEO",
    bio: "Former ISRO scientist with 20+ years in aerospace systems engineering.",
    initials: "AM",
  },
  {
    name: "Priya Sharma",
    role: "Head of Academy",
    bio: "Aerodynamics PhD, ex-HAL, leading curriculum design and instructor development.",
    initials: "PS",
  },
  {
    name: "Vikram Rao",
    role: "CTO",
    bio: "Full-stack engineer with expertise in EdTech platforms and AI-driven learning systems.",
    initials: "VR",
  },
  {
    name: "Ananya Iyer",
    role: "Head of Consulting",
    bio: "AS9100D lead auditor with certification experience across 30+ aerospace organizations.",
    initials: "AI",
  },
];

const milestones = [
  { year: "2019", event: "AeroSpark founded in Bengaluru" },
  { year: "2020", event: "First DGCA drone training batch — 50 students" },
  { year: "2021", event: "Launched AS9100D & CATIA V5 programs" },
  { year: "2022", event: "Partnership with 20+ aerospace OEMs" },
  { year: "2023", event: "AI-powered learning platform launched" },
  { year: "2024", event: "8,000+ students trained, consulting arm expanded" },
  { year: "2025", event: "Platform v2.0 — enterprise ERP & R&D modules" },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="py-20 relative">
          <div className="absolute inset-0 radar-grid opacity-40" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <span className="hud-label text-aero-blue">// About</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-6 tracking-tight">
                Building the Future of{" "}
                <span className="gradient-text">Aerospace Education</span>
              </h1>
              <p className="text-text-secondary text-lg leading-relaxed">
                AeroSpark is India&apos;s premier aerospace learning ecosystem —
                bridging the gap between academic theory and industry-ready
                engineering skills through expert-led training, hands-on R&D, and
                enterprise consulting.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Mission */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <GlassCard padding="lg" className="relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-aero-blue/5 to-transparent" />
                  <div className="relative z-10">
                    <Rocket className="w-10 h-10 text-aero-blue mb-4" />
                    <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
                    <p className="text-text-secondary leading-relaxed">
                      To democratize aerospace engineering education and make
                      world-class training accessible to every aspiring engineer
                      in India and across the globe. We believe that the next
                      generation of aerospace innovation will come from engineers
                      who have access to industry-grade knowledge, tools, and
                      mentorship — regardless of their background.
                    </p>
                  </div>
                </GlassCard>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { value: "8,200+", label: "Students Trained" },
                    { value: "50+", label: "Industry Partners" },
                    { value: "24", label: "Expert Courses" },
                    { value: "95%", label: "Placement Rate" },
                  ].map((stat) => (
                    <GlassCard key={stat.label} className="text-center">
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className="text-xs text-text-secondary mt-1 uppercase tracking-wider">
                        {stat.label}
                      </p>
                    </GlassCard>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              label="// Values"
              title="What Drives Us"
              description="Core principles that guide every decision at AeroSpark."
            />
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {values.map((v) => (
                <motion.div key={v.title} variants={staggerItem}>
                  <GlassCard className="h-full text-center" glow="blue">
                    <div className="inline-flex p-3 rounded-xl bg-aero-blue/5 text-aero-blue mb-4">
                      {v.icon}
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-2">
                      {v.title}
                    </h3>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {v.description}
                    </p>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              label="// Journey"
              title="Our Timeline"
            />
            <div className="mt-16 relative">
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border-subtle md:-translate-x-px" />
              {milestones.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative flex items-start gap-6 mb-8 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="hidden md:block flex-1" />
                  <div className="relative z-10 w-8 h-8 rounded-full bg-surface-elevated border-2 border-aero-blue/30 flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-aero-blue" />
                  </div>
                  <div className="flex-1 glass-panel rounded-lg p-4">
                    <span className="text-xs font-mono text-aero-blue">
                      {m.year}
                    </span>
                    <p className="text-sm text-text-secondary mt-1">
                      {m.event}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              label="// Leadership"
              title="Meet the Team"
              description="Aerospace engineers, educators, and technologists building the future of learning."
            />
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
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
                      <button className="text-text-muted hover:text-aero-blue transition-colors">
                        <Mail className="w-4 h-4" />
                      </button>
                      <button className="text-text-muted hover:text-aero-blue transition-colors">
                        <Globe className="w-4 h-4" />
                      </button>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-panel rounded-2xl p-12"
            >
              <h2 className="text-3xl font-bold text-foreground mb-4 tracking-tight">
                Join Our Mission
              </h2>
              <p className="text-text-secondary mb-8 max-w-lg mx-auto">
                Whether you&apos;re an aspiring engineer or an industry veteran,
                there&apos;s a place for you at AeroSpark.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button variant="primary" size="lg" href="/academy">
                  Start Learning
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button variant="secondary" size="lg" href="/contact">
                  Get in Touch
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
