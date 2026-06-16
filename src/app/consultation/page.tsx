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
    company: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormState({ name: "", email: "", company: "", service: "", message: "" });
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
              label="// Consultation"
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {CONSULTATION_SERVICES.map((service) => (
              <motion.div key={service.id} variants={staggerItem}>
                <GlassCard
                  className="h-full flex flex-col group"
                  glow="blue"
                  padding="lg"
                >
                  <div className="inline-flex p-3 rounded-xl bg-aero-blue/5 text-aero-blue mb-5 self-start group-hover:bg-aero-blue/10 transition-colors">
                    {iconMap[service.icon]}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-5 flex-1">
                    {service.description}
                  </p>
                  <ul className="space-y-2.5">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-text-secondary"
                      >
                        <CheckCircle2 className="w-4 h-4 text-aero-blue mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Consultation Form */}
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
                    >
                      Submit Request
                      <Send className="w-4 h-4" />
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
