"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/cards";
import { staggerContainer, staggerItem } from "@/lib/motion";
import {
  Send,
  ArrowRight,
  Phone,
  Mail,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

const services = [
  {
    id: "uas-certification",
    tag: "CERTIFICATION",
    title: "Drone Certification Support",
    description: "Get structured support across certification planning, technical documentation, compliance reviews, test readiness, and the UAS certification process.",
    btnText: "Explore Certification Support →",
    href: "/consultation/uas-certification",
    glow: "blue" as const,
    image: "/service-cert.png",
  },
  {
    id: "drone-rd",
    tag: "DESIGN & DEVELOPMENT",
    title: "UAV Design & Product Development",
    description: "Engineering support for UAV configuration, airframe design, payload integration, subsystem selection, performance analysis, prototyping, and design refinement.",
    btnText: "Explore UAV Engineering →",
    href: "/consultation/drone-rd",
    glow: "red" as const,
    image: "/service-design.png",
  },
  {
    id: "design-simulation",
    tag: "ANALYSIS & SIMULATION",
    title: "Design, CFD & Simulation",
    description: "Use CAD/CAE, CFD, aerodynamic analysis, and engineering simulation to evaluate designs, understand performance, and make better technical decisions.",
    btnText: "Explore Design & Simulation →",
    href: "/consultation/design-simulation",
    glow: "blue" as const,
    image: "/service-sim.png",
  },
  {
    id: "as9100d-quality",
    tag: "QUALITY & COMPLIANCE",
    title: "Aerospace Quality Systems",
    description: "Build stronger aerospace processes with support across quality management systems, documentation, risk management, process control, corrective actions, and audit readiness.",
    btnText: "Explore Quality Services →",
    href: "/consultation/as9100d-quality",
    glow: "red" as const,
    image: "/service-quality.png",
  },
];

export default function ConsultationClient() {
  const formRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formState),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormState({ name: "", email: "", phone: "", company: "", service: "", message: "" });
      }, 4000);
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="pb-16">
        {/* Hero */}
        <section className="pt-28 pb-24 relative overflow-hidden">
          {/* Ambient orbs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-aero-blue/10 blur-[120px] rounded-[100%] pointer-events-none z-0" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-aero-red/5 blur-[120px] rounded-full pointer-events-none z-0" />
          <div className="absolute inset-0 radar-grid opacity-30 z-0" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
            <span className="text-[#FF6600] font-bold text-xs uppercase tracking-widest block mb-4">
              AEROSPACE ENGINEERING & CONSULTING
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground/90 to-foreground/50 leading-tight">
              Engineering Support From UAV Concept to Certification.
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto mb-10 leading-relaxed">
              AeroSpark supports aerospace and drone teams with UAV design and development, certification support, CAD/CAE, CFD, simulation, and aerospace quality systems — practical engineering expertise for projects that need to move forward.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="primary" size="lg" onClick={scrollToForm} className="bg-[#FF6600] text-white hover:bg-[#e65c00] border-none shadow-lg">
                Discuss Your Project
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button variant="secondary" size="lg" onClick={scrollToServices}>
                Explore Our Services
                <ArrowRight className="w-4 h-4 rotate-90" />
              </Button>
            </div>
          </div>
        </section>

        {/* Services */}
        <section ref={servicesRef} id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 scroll-mt-28">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {services.map((service) => (
              <motion.div key={service.id} variants={staggerItem}>
                <GlassCard padding="lg" className="group h-full flex flex-col justify-between" glow={service.glow}>
                  <div className="space-y-4">
                    <div className="relative w-full aspect-[2.1] rounded-xl overflow-hidden border border-border-subtle bg-surface-elevated shadow-sm mb-4">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <span className="text-[#FF6600] font-bold text-xs uppercase tracking-widest block">
                      {service.tag}
                    </span>
                    <h3 className="text-2xl font-bold text-foreground tracking-tight group-hover:text-aero-blue transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                  <div className="pt-6">
                    <Button variant="outline" href={service.href} className="group-hover:border-aero-blue/40 group-hover:bg-aero-blue/5 transition-all">
                      {service.btnText}
                    </Button>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Who We Work With */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-[#FF6600] font-bold text-xs uppercase tracking-widest block mb-3">
              Partnership
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mb-6">
              Who We Work With
            </h2>
            <p className="text-text-secondary text-base md:text-lg leading-relaxed">
              Engineering Support for Teams at Different Stages of Development.
            </p>
            <p className="text-text-secondary text-sm md:text-base mt-3 leading-relaxed">
              From early-stage UAV concepts to established aerospace operations, AeroSpark works with teams that need focused technical support to solve engineering, certification, and quality challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "UAV & Drone Companies",
                desc: "For teams developing new unmanned aircraft, improving existing platforms, integrating payloads, or preparing products for the next stage of development.",
              },
              {
                title: "Aerospace & Manufacturing Suppliers",
                desc: "For engineering and manufacturing companies looking to strengthen design capabilities, quality systems, documentation, and aerospace processes.",
              },
              {
                title: "Startups & Product Teams",
                desc: "For teams turning an aviation or drone concept into a technically sound product through structured design, analysis, simulation, and development.",
              },
              {
                title: "Certification & Quality Teams",
                desc: "For organisations working through certification requirements, technical documentation, quality systems, compliance, or audit preparation.",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <GlassCard padding="md" className="h-full space-y-3" glow="none">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-[#FF6600]" />
                    <h4 className="text-lg font-bold text-foreground">{item.title}</h4>
                  </div>
                  <p className="text-sm text-text-secondary leading-relaxed pl-5">
                    {item.desc}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* How We Work */}
        <section className="py-24 bg-surface-elevated/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <span className="text-[#FF6600] font-bold text-xs uppercase tracking-widest block mb-3">
                Process
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight mb-6">
                How We Work
              </h2>
              <p className="text-text-secondary text-base md:text-lg leading-relaxed mb-4">
                Clear Requirements. Practical Engineering. Better Decisions.
              </p>
              <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                Every project starts differently. Our process keeps the engineering focused on what the project actually needs.
              </p>
            </div>

            <div className="relative">
              {/* Desktop connecting line */}
              <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-aero-blue/20 via-border-subtle to-aero-red/20 z-0" />
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                {[
                  {
                    step: "01",
                    title: "Understand the Requirement",
                    desc: "We start by understanding the aircraft, application, technical objectives, constraints, current development stage, and expected outcome.",
                  },
                  {
                    step: "02",
                    title: "Define the Engineering Approach",
                    desc: "We identify the design, analysis, simulation, certification, or quality work needed to move the project forward.",
                  },
                  {
                    step: "03",
                    title: "Engineer & Review",
                    desc: "Our work may include design development, CAD/CAE, CFD, technical analysis, documentation, simulation, and structured engineering reviews.",
                  },
                  {
                    step: "04",
                    title: "Support the Next Stage",
                    desc: "We help translate the engineering work into clear next steps for development, testing, documentation, certification, or implementation.",
                  },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="flex flex-col items-center md:items-start text-center md:text-left space-y-4"
                  >
                    <div className="w-20 h-20 rounded-2xl bg-surface border border-border-default flex items-center justify-center text-2xl font-mono font-bold text-aero-blue shadow-lg">
                      {item.step}
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-base font-bold text-foreground">
                        {item.title}
                      </h4>
                      <p className="text-xs text-text-secondary leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Consultation Form (Final CTA) */}
        <section ref={formRef} id="consultation-form" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left — Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-between"
            >
              <div>
                <span className="text-[#FF6600] font-bold text-xs uppercase tracking-widest block mb-3">
                  START A CONVERSATION
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight mb-4">
                  Let&apos;s Talk About Your Project.
                </h2>
                <p className="text-text-secondary leading-relaxed mb-8">
                  Tell us what you&apos;re building, where you are in the development process, and what kind of engineering support you need. We&apos;ll review your requirements and get back to you to discuss the right next step.
                </p>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-surface-elevated text-aero-blue">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted uppercase tracking-wider">
                        Phone
                      </p>
                      <p className="text-sm text-foreground">+91 98765 43210</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-surface-elevated text-aero-blue">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-text-muted uppercase tracking-wider">
                        Email
                      </p>
                      <p className="text-sm text-foreground">consult@aerospark.io</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Confidentiality Warning */}
              <div className="mt-10 p-6 border border-dashed border-border-default rounded-xl bg-surface-elevated/10">
                <p className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#FF6600]" />
                  Have confidential project information?
                </p>
                <p className="text-xs text-text-secondary leading-relaxed">
                  Please avoid sharing sensitive or proprietary technical details in the initial enquiry. Confidentiality arrangements can be discussed before detailed project information is exchanged.
                </p>
              </div>
            </motion.div>

            {/* Right — Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <GlassCard padding="lg">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-10"
                  >
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Request Submitted
                    </h3>
                    <p className="text-sm text-text-secondary">
                      Our team will review your request and get back to you shortly.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-text-muted uppercase tracking-wider mb-2">
                          Full Name *
                        </label>
                        <input
                          required
                          type="text"
                          value={formState.name}
                          onChange={(e) =>
                            setFormState({ ...formState, name: e.target.value })
                          }
                          className="w-full px-4 py-2.5 bg-surface-elevated rounded-lg text-sm text-foreground border border-border-subtle focus:border-aero-blue/30 focus:outline-none focus:ring-1 focus:ring-aero-blue/20 transition-all"
                          placeholder="Your name"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-text-muted uppercase tracking-wider mb-2">
                          Email *
                        </label>
                        <input
                          required
                          type="email"
                          value={formState.email}
                          onChange={(e) =>
                            setFormState({ ...formState, email: e.target.value })
                          }
                          className="w-full px-4 py-2.5 bg-surface-elevated rounded-lg text-sm text-foreground border border-border-subtle focus:border-aero-blue/30 focus:outline-none focus:ring-1 focus:ring-aero-blue/20 transition-all"
                          placeholder="Work email"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-text-muted uppercase tracking-wider mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={formState.phone}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              phone: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2.5 bg-surface-elevated rounded-lg text-sm text-foreground border border-border-subtle focus:border-aero-blue/30 focus:outline-none focus:ring-1 focus:ring-aero-blue/20 transition-all"
                          placeholder="+91 98765 43210"
                        />
                      </div>

                      <div>
                        <label className="block text-xs text-text-muted uppercase tracking-wider mb-2">
                          Company / Organization
                        </label>
                        <input
                          type="text"
                          value={formState.company}
                          onChange={(e) =>
                            setFormState({
                              ...formState,
                              company: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2.5 bg-surface-elevated rounded-lg text-sm text-foreground border border-border-subtle focus:border-aero-blue/30 focus:outline-none focus:ring-1 focus:ring-aero-blue/20 transition-all"
                          placeholder="Company or organisation"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-text-muted uppercase tracking-wider mb-2">
                        Service Required *
                      </label>
                      <select
                        required
                        value={formState.service}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            service: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2.5 bg-surface-elevated rounded-lg text-sm text-foreground border border-border-subtle focus:border-aero-blue/30 focus:outline-none focus:ring-1 focus:ring-aero-blue/20 transition-all appearance-none"
                      >
                        <option value="" className="bg-surface text-text-muted">
                          Select a service
                        </option>
                        <option value="Drone Certification Support" className="bg-surface">
                          Drone Certification Support
                        </option>
                        <option value="UAV Design & Development" className="bg-surface">
                          UAV Design & Development
                        </option>
                        <option value="Design, CFD & Simulation" className="bg-surface">
                          Design, CFD & Simulation
                        </option>
                        <option value="Aerospace Quality Systems" className="bg-surface">
                          Aerospace Quality Systems
                        </option>
                        <option value="General Engineering Consultation" className="bg-surface">
                          General Engineering Consultation
                        </option>
                        <option value="Not Sure Yet" className="bg-surface">
                          Not Sure Yet
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-text-muted uppercase tracking-wider mb-2">
                        Project Details *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formState.message}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            message: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2.5 bg-surface-elevated rounded-lg text-sm text-foreground border border-border-subtle focus:border-aero-blue/30 focus:outline-none focus:ring-1 focus:ring-aero-blue/20 transition-all resize-none"
                        placeholder="Tell us briefly about your project, current stage, technical challenge, and the support you're looking for."
                      />
                    </div>

                    <Button
                      variant="primary"
                      size="lg"
                      type="submit"
                      className="w-full bg-[#FF6600] text-white hover:bg-[#e65c00] border-none shadow-lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Discuss My Project"}
                      {!isSubmitting && <Send className="w-4 h-4" />}
                    </Button>
                  </form>
                )}
              </GlassCard>
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
                HAVE AN ENGINEERING CHALLENGE?
              </span>
              <h2 className="text-3xl font-bold text-foreground mb-4 tracking-tight">
                Let&apos;s Find the Right Way Forward.
              </h2>
              <p className="text-text-secondary mb-8 max-w-lg mx-auto">
                From UAV development and simulation to certification and aerospace quality systems, start with the problem and we&apos;ll help identify the engineering support it needs.
              </p>
              <Button variant="primary" size="lg" onClick={scrollToForm} className="bg-[#FF6600] text-white hover:bg-[#e65c00] border-none shadow-lg">
                Discuss Your Project
                <ArrowRight className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
