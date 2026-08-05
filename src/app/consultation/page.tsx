"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import Link from "next/link";
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
        <section className="py-24 relative overflow-hidden">
          {/* Ambient orbs for antigravity feel */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-aero-blue/10 blur-[120px] rounded-[100%] pointer-events-none z-0" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-aero-red/5 blur-[120px] rounded-full pointer-events-none z-0" />

          <div className="absolute inset-0 radar-grid opacity-30 z-0" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground via-foreground/90 to-foreground/50">
              Aerospace Engineering Consulting
            </h1>
            <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed text-justify sm:text-center">
              Expert consulting services for UAS certification, quality systems, drone R&D, design simulation, and aerospace procurement.
            </p>
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
              const styles = [
                {
                  bg: "bg-[#ffede0]",
                  badgeDot: "bg-[#f47b52]",
                  badgeText: "Open for Consultation",
                  titleColor: "text-[#1a1a1a]",
                  descColor: "text-[#4a4a4a]",
                  link: "Explore Services",
                  graphic: (
                    <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none opacity-90 hidden sm:block">
                      <div className="absolute right-[-10%] top-[15%] w-32 h-24 bg-gradient-to-r from-[#ffb58a]/40 to-[#ff9452]/60 rounded-3xl -rotate-45" />
                      <div className="absolute right-[5%] bottom-[15%] w-32 h-24 bg-gradient-to-r from-[#ffb58a]/40 to-[#ff9452]/60 rounded-3xl rotate-45" />
                    </div>
                  )
                },
                {
                  bg: "bg-[#f4f5f0]",
                  badgeDot: "bg-[#111111]",
                  badgeText: "Quality Systems",
                  titleColor: "text-[#1a1a1a]",
                  descColor: "text-[#4a4a4a]",
                  link: "Apply Standards",
                  graphic: (
                    <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none opacity-90 hidden sm:block">
                      <div className="absolute right-[15%] top-[15%] w-24 h-24 rounded-full bg-gradient-to-b from-[#d5d5d5]/50 to-[#e2e2e2]/20" />
                      <div className="absolute right-[5%] top-[50%] w-20 h-10 rounded-b-full bg-gradient-to-b from-[#d5d5d5]/50 to-[#e2e2e2]/20" />
                      <div className="absolute right-[-5%] bottom-[5%] w-28 h-28 rounded-full bg-gradient-to-b from-[#d5d5d5]/50 to-[#e2e2e2]/20" />
                    </div>
                  )
                },
                {
                  bg: "bg-[#ece9f4]",
                  badgeDot: "bg-[#9a75c5]",
                  badgeText: "R&D Priority",
                  titleColor: "text-[#1a1a1a]",
                  descColor: "text-[#4a4a4a]",
                  link: "Start Project",
                  graphic: (
                    <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none opacity-90 hidden sm:block">
                      <div className="absolute right-[-15%] top-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-[20px] border-[#d4caed]/50" />
                      <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-gradient-to-br from-[#c9bbf0]/60 to-[#a491df]/80" />
                    </div>
                  )
                },
                {
                  bg: "bg-[#e8f3e4]",
                  badgeDot: "bg-[#287955]",
                  badgeText: "Simulation & Design",
                  titleColor: "text-[#1a1a1a]",
                  descColor: "text-[#4a4a4a]",
                  link: "Get in Touch",
                  graphic: (
                    <div className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none opacity-90 hidden sm:block">
                      <div className="absolute right-[15%] top-[20%] w-20 h-20 rounded-[24px] bg-gradient-to-br from-[#539773]/70 to-[#368160]/90" />
                      <div className="absolute right-[-5%] bottom-[10%] w-32 h-24 rounded-tl-[24px] rounded-bl-[24px] bg-gradient-to-br from-[#8dbd9f]/50 to-[#539773]/70" />
                    </div>
                  )
                }
              ];

              const style = styles[index % styles.length];

              return (
                <motion.div
                  key={service.id}
                  variants={staggerItem}
                >
                  <Link href={`/consultation/${service.id}`} className="block h-full outline-none">
                    <div
                      className={`relative h-full flex flex-col p-8 sm:p-10 rounded-[28px] overflow-hidden isolate transition-transform hover:-translate-y-1 duration-300 ${style.bg}`}
                    >
                      {/* Decorative Graphic Wrapped to fix Safari/Chrome border-radius clipping bug */}
                      <div className="absolute inset-0 overflow-hidden rounded-[28px] pointer-events-none z-0">
                        {style.graphic}
                      </div>

                      {/* Content Container (z-index to stay above graphic) */}
                      <div className="relative z-10 flex flex-col h-full">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-md self-start mb-10 shadow-sm border border-white/40">
                          <span className={`w-2 h-2 rounded-full ${style.badgeDot}`} />
                          <span className="text-[11px] font-semibold tracking-wide text-[#1a1a1a]">
                            {style.badgeText}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className={`font-semibold tracking-tight mb-4 text-3xl sm:text-4xl ${style.titleColor}`}>
                          {service.title}
                        </h3>

                        {/* Description */}
                        <p className={`text-[15px] sm:text-[16px] leading-relaxed max-w-[85%] sm:max-w-[70%] mb-12 ${style.descColor}`}>
                          {service.description}
                        </p>

                        {/* Action Link */}
                        <div className={`mt-auto flex items-center gap-2 text-sm font-semibold ${style.titleColor} group`}>
                          <span className="border-b border-transparent group-hover:border-current transition-colors">
                            {style.link}
                          </span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
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
