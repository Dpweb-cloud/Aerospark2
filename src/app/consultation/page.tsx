"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { GlassCard, SectionHeader } from "@/components/ui/cards";
import { CONSULTATION_SERVICES } from "@/lib/constants";
import { staggerContainer, staggerItem } from "@/lib/motion";
import {
  Shield,
  Award,
  Cpu,
  Box,
  Package,
  CheckCircle2,
  Send,
  ArrowRight,
  Phone,
  Mail,
  Target,
  Users,
  Activity,
  Briefcase,
  TrendingUp,
  AlertTriangle,
  Clock,
  Star,
} from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  Shield: <Shield className="w-6 h-6" />,
  Award: <Award className="w-6 h-6" />,
  Cpu: <Cpu className="w-6 h-6" />,
  Box: <Box className="w-6 h-6" />,
  Package: <Package className="w-6 h-6" />,
};

export default function ConsultationPage() {
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
        throw new Error('Failed to send message');
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormState({ name: "", email: "", phone: "", company: "", service: "", message: "" });
      }, 4000);
    } catch (error) {
      console.error('Error submitting form', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="py-16 relative">
          <div className="absolute inset-0 radar-grid opacity-40" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <SectionHeader
              label="Consultation"
              title="Aerospace Engineering Consulting"
              description="Expert consulting services for UAS certification, quality systems, drone R&D, design simulation, and aerospace procurement."
            />
          </div>
        </section>

        {/* Services */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {CONSULTATION_SERVICES.map((service, index) => {
              const isLast = index === CONSULTATION_SERVICES.length - 1;
              return (
                <motion.div 
                  key={service.id} 
                  variants={staggerItem}
                  className={isLast ? "md:col-span-2" : ""}
                >
                  <GlassCard
                    className={`h-full group ${isLast ? "flex flex-col md:flex-row items-center md:items-start gap-8" : "flex flex-col"}`}
                    glow="blue"
                    padding="lg"
                  >
                    <div className="inline-flex p-4 rounded-xl bg-aero-blue/5 text-aero-blue self-start group-hover:bg-aero-blue/10 transition-colors flex-shrink-0">
                      {iconMap[service.icon]}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className={`font-semibold text-foreground mb-3 ${isLast ? "text-2xl" : "text-lg"}`}>
                        {service.title}
                      </h3>
                      <p className="text-sm text-text-secondary leading-relaxed mb-6">
                        {service.description}
                      </p>
                      <ul className={`grid gap-3 ${isLast ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1"}`}>
                        {service.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start gap-2.5 text-sm text-text-secondary"
                          >
                            <CheckCircle2 className="w-4 h-4 text-aero-blue mt-0.5 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                      
                      {/* @ts-ignore - Ignore TS complaining if outcome isn't strictly typed yet */}
                      {service.outcome && (
                        <div className="mt-6 pt-5 border-t border-border-subtle">
                          <p className="text-sm font-medium text-aero-blue">
                            {/* @ts-ignore */}
                            {service.outcome}
                          </p>
                        </div>
                      )}
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* How the Consultation Works (Process) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <SectionHeader
            label="The Process"
            title="How the Consultation Works"
            description="Our proven 4-step framework for audit readiness and compliance."
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Gap Analysis",
                description: "We review your current processes against target regulatory standards.",
                icon: <Target className="w-6 h-6" />,
              },
              {
                step: "02",
                title: "Remediation Roadmap",
                description: "We build a step-by-step action plan to fix compliance gaps.",
                icon: <Activity className="w-6 h-6" />,
              },
              {
                step: "03",
                title: "Audit Simulation",
                description: "We conduct a mock audit to test your team and documentation.",
                icon: <Users className="w-6 h-6" />,
              },
              {
                step: "04",
                title: "Certification Support",
                description: "We sit on your side of the table during the official registrar audit.",
                icon: <Briefcase className="w-6 h-6" />,
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-surface-elevated border border-border-subtle flex items-center justify-center text-aero-blue mb-6 relative z-10">
                    {item.icon}
                  </div>
                  <div className="text-4xl font-bold text-surface-elevated absolute top-2 select-none -z-10">
                    {item.step}
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-3">{item.title}</h4>
                  <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Why Trust This Consultation (Credibility) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-aero-blue/20 bg-gradient-to-r from-aero-blue/10 via-transparent to-transparent p-10 md:p-14 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-24 opacity-10 blur-3xl rounded-full bg-aero-blue w-96 h-96 -z-10 translate-x-1/2 -translate-y-1/2" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left relative z-10">
              <div className="space-y-3">
                <div className="flex items-center justify-center md:justify-start gap-3 text-aero-blue mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <h4 className="text-4xl font-bold text-foreground">15+ Years</h4>
                <p className="text-sm text-text-secondary font-medium tracking-wide uppercase">Industry Experience</p>
                <p className="text-sm text-text-muted mt-2">Deep expertise inside the aerospace and defense sector.</p>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-center md:justify-start gap-3 text-aero-blue mb-4">
                  <Star className="w-6 h-6" />
                </div>
                <h4 className="text-4xl font-bold text-foreground">100%</h4>
                <p className="text-sm text-text-secondary font-medium tracking-wide uppercase">First-Time Pass Rate</p>
                <p className="text-sm text-text-muted mt-2">Flawless audit success history for our consulting clients.</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-center md:justify-start gap-3 text-aero-blue mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <h4 className="text-4xl font-bold text-foreground">Ex-Auditor</h4>
                <p className="text-sm text-text-secondary font-medium tracking-wide uppercase">Led Teams</p>
                <p className="text-sm text-text-muted mt-2">Get insights directly from former regulatory auditors.</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Who This Is For (Target Audience) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <SectionHeader
            label="Audience"
            title="Who This Is For"
            description="Tailored consulting for companies at every stage of the aerospace supply chain."
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Tier 1 & 2 Suppliers",
                description: "Companies needing to maintain compliance to secure major OEM contracts.",
                icon: <TrendingUp className="w-5 h-5" />,
              },
              {
                title: "Startups & New Entrants",
                description: "Machining, electronics, or software shops breaking into defense and space.",
                icon: <Box className="w-5 h-5" />,
              },
              {
                title: "Struggling Organizations",
                description: "Companies facing major non-conformances from recent surveillance audits.",
                icon: <AlertTriangle className="w-5 h-5" />,
              },
            ].map((audience, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <GlassCard padding="lg" className="h-full hover:border-aero-blue/30 transition-colors">
                  <div className="p-3 bg-surface rounded-lg w-fit text-aero-blue mb-6">
                    {audience.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-3">{audience.title}</h4>
                  <p className="text-sm text-text-secondary leading-relaxed">{audience.description}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Consultation Form (Final CTA) */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left — Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="hud-label text-aero-blue">// Get in Touch</span>
              <h2 className="text-3xl font-bold text-foreground mt-3 mb-4 tracking-tight">
                Request a Consultation
              </h2>
              <p className="text-text-secondary leading-relaxed mb-8">
                Tell us about your project and our aerospace engineering experts
                will get back to you within 24 hours with a tailored proposal.
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

              {/* Trust indicators */}
              <div className="mt-10 p-5 glass-panel rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-5 h-5 text-aero-blue" />
                  <span className="text-sm font-medium text-foreground">
                    Enterprise-Grade Security
                  </span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  All consultation data is encrypted and handled under strict NDA
                  protocols. Your IP is safe with us.
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
                      Our team will review your request and respond within 24
                      hours.
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
                          placeholder="John Doe"
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
                          placeholder="john@company.com"
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
                          placeholder="+1 (555) 000-0000"
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
                          placeholder="Acme Aerospace"
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
                        {CONSULTATION_SERVICES.map((s) => (
                          <option
                            key={s.id}
                            value={s.id}
                            className="bg-surface"
                          >
                            {s.title}
                          </option>
                        ))}
                        <option value="Other" className="bg-surface font-semibold">
                          Other
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
                        placeholder="Describe your project requirements..."
                      />
                    </div>

                    <Button
                      variant="primary"
                      size="lg"
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Submit Request"}
                      {!isSubmitting && <Send className="w-4 h-4" />}
                    </Button>
                  </form>
                )}
              </GlassCard>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
