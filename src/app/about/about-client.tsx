"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GlassCard } from "@/components/ui/cards";
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
} from "lucide-react";

const team = [
  {
    name: "Darshan Parekh",
    role: "Founder / Aerospace Engineer",
    bio: "Focused on UAV engineering, aerospace consulting, product development, and building AeroSpark's technical direction.",
    initials: "DP",
  },
];

export default function AboutClient() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Top Section */}
        <section className="py-20 relative">
          <div className="absolute inset-0 radar-grid opacity-40" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="max-w-3xl"
              >
                <span className="text-[#FF6600] font-bold text-xs uppercase tracking-widest block mb-4">
                  ABOUT AEROSPARK
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-6 tracking-tight leading-tight">
                  Aerospace Engineering, Built for Real-World Flight.
                </h1>
                <div className="space-y-4 text-text-secondary text-lg leading-relaxed">
                  <p>
                    AeroSpark is an aerospace engineering and technical learning company focused on UAV development, drone certification support, design & simulation, quality systems, and practical aerospace training.
                  </p>
                  <p>
                    We bring engineering and education together with one goal: to make aerospace knowledge more useful, applicable, and connected to real-world challenges.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="relative flex items-center justify-center"
              >
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-aero-blue/20 to-aero-red/20 blur-xl opacity-35" />
                <div className="relative glass-panel rounded-2xl overflow-hidden border border-border-default max-w-lg shadow-2xl">
                  <img
                    src="/aerospace_hero_vector.png"
                    alt="Aerospace Engineering Concept"
                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent pointer-events-none" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why AeroSpark Exists */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <GlassCard padding="lg" className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-aero-blue/5 to-transparent" />
                <div className="relative z-10 text-center max-w-3xl mx-auto space-y-6">
                  <span className="text-[#FF6600] font-bold text-xs uppercase tracking-widest block">
                    Why AeroSpark Exists
                  </span>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">
                    Good Engineering Starts With Practical Understanding.
                  </h2>
                  <p className="text-text-secondary text-base md:text-lg leading-relaxed">
                    Aerospace is a field where theory and application have to work together. AeroSpark was created to bring those two sides closer — helping businesses tackle engineering challenges while helping learners understand how aerospace concepts are applied in practice.
                  </p>
                  <p className="text-text-secondary text-base md:text-lg font-semibold leading-relaxed border-t border-border-subtle pt-6">
                    Our focus is simple: solve meaningful engineering problems, share useful technical knowledge, and contribute to better aerospace and UAV development.
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </section>

        {/* What We Do */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <span className="text-[#FF6600] font-bold text-xs uppercase tracking-widest block mb-3">
                What We Do
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mb-6">
                Engineering First. Learning Alongside It.
              </h2>
              <p className="text-text-secondary text-base md:text-lg leading-relaxed">
                AeroSpark operates across two connected areas — aerospace engineering services and technical education.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
              {/* Engineering & Consulting Card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <GlassCard padding="none" className="h-full flex flex-col justify-between overflow-hidden border border-border-default shadow-lg" glow="blue">
                  <div className="relative h-64 overflow-hidden border-b border-border-subtle bg-surface-elevated/40">
                    <img
                      src="/eng_consulting_card.png"
                      alt="Engineering & Consulting"
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                  </div>
                  <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      <span className="text-[#FF6600] font-bold text-sm uppercase tracking-widest block">
                        Engineering & Consulting
                      </span>
                      <p className="text-foreground text-base leading-relaxed font-semibold">
                        We support UAV and aerospace projects across design and development, drone certification, CAD/CAE, CFD, simulation, engineering analysis, and aerospace quality systems.
                      </p>
                      <p className="text-text-secondary text-sm leading-relaxed">
                        From understanding a technical requirement to developing and validating a solution, our approach is built around practical engineering.
                      </p>
                    </div>
                    <div className="pt-6">
                      <Button variant="primary" href="/consultation" className="w-full justify-center">
                        Explore Engineering & Consulting
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>

              {/* Academy Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="h-full"
              >
                <GlassCard padding="none" className="h-full flex flex-col justify-between overflow-hidden border border-border-default shadow-lg" glow="blue">
                  <div className="relative h-64 overflow-hidden border-b border-border-subtle bg-surface-elevated/40">
                    <img
                      src="/acad_card.png"
                      alt="AeroSpark Academy"
                      className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                  </div>
                  <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      <span className="text-[#FF6600] font-bold text-sm uppercase tracking-widest block">
                        AeroSpark Academy
                      </span>
                      <p className="text-foreground text-base leading-relaxed font-semibold">
                        Our Academy helps students, engineers, and professionals build practical knowledge across aerospace engineering, UAV technology, aerodynamics, design, simulation, quality, and certification.
                      </p>
                      <p className="text-text-secondary text-sm leading-relaxed">
                        The focus is not just on learning concepts, but on understanding where and how they are used in real engineering work.
                      </p>
                    </div>
                    <div className="pt-6">
                      <Button variant="primary" href="/academy" className="w-full justify-center">
                        Explore AeroSpark Academy
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How We Work */}
        <section className="py-20 bg-surface-elevated/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <span className="text-[#FF6600] font-bold text-xs uppercase tracking-widest block mb-3">
                How We Work
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mb-6">
                Practical Thinking at Every Stage.
              </h2>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {/* Point 1 */}
              <motion.div variants={staggerItem}>
                <GlassCard padding="md" className="h-full space-y-4" glow="none">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-aero-blue/10 text-aero-blue animate-pulse">
                      <Compass className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">
                      Understand Before We Engineer
                    </h3>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed pl-1">
                    Every project starts with understanding the requirement, operating conditions, constraints, and intended outcome.
                  </p>
                </GlassCard>
              </motion.div>

              {/* Point 2 */}
              <motion.div variants={staggerItem}>
                <GlassCard padding="md" className="h-full space-y-4" glow="none">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-aero-blue/10 text-aero-blue animate-pulse">
                      <Wrench className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">
                      Keep Engineering Practical
                    </h3>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed pl-1">
                    We focus on solutions that can move beyond theory into analysis, development, testing, documentation, and implementation.
                  </p>
                </GlassCard>
              </motion.div>

              {/* Point 3 */}
              <motion.div variants={staggerItem}>
                <GlassCard padding="md" className="h-full space-y-4" glow="none">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-aero-blue/10 text-aero-blue animate-pulse">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">
                      Learn Through Application
                    </h3>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed pl-1">
                    Whether it is a consulting project or an Academy program, practical application remains at the centre of how we approach aerospace.
                  </p>
                </GlassCard>
              </motion.div>

              {/* Point 4 */}
              <motion.div variants={staggerItem}>
                <GlassCard padding="md" className="h-full space-y-4" glow="none">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-lg bg-aero-blue/10 text-aero-blue animate-pulse">
                      <Cpu className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">
                      Build With Purpose
                    </h3>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed pl-1">
                    We believe good aerospace engineering should solve a clear problem, improve a system, or create measurable technical value.
                  </p>
                </GlassCard>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
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
              className="mt-16 max-w-md mx-auto"
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
                      <a href="mailto:hello@aerospark.io" className="text-text-muted hover:text-aero-blue transition-colors">
                        <Mail className="w-4 h-4" />
                      </a>
                      <a href="https://aerospark.io" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-aero-blue transition-colors">
                        <Globe className="w-4 h-4" />
                      </a>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
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
                <Button variant="primary" size="lg" href="/consultation">
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
