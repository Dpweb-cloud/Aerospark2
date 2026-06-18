"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { GlassCard, SectionHeader } from "@/components/ui/cards";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  Clock,
  MessageSquare,
} from "lucide-react";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormState({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16">
        <section className="py-16 relative">
          <div className="absolute inset-0 radar-grid opacity-40" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <SectionHeader
              label="Contact"
              title="Get in Touch"
              description="Have a question, partnership inquiry, or feedback? We'd love to hear from you."
            />
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Cards */}
            <div className="space-y-5">
              {[
                {
                  icon: <Mail className="w-5 h-5" />,
                  title: "Email Us",
                  detail: "hello@aerospark.io",
                  sub: "We respond within 24 hours",
                },
                {
                  icon: <Phone className="w-5 h-5" />,
                  title: "Call Us",
                  detail: "+91 98765 43210",
                  sub: "Mon–Fri, 9AM–6PM IST",
                },
                {
                  icon: <MapPin className="w-5 h-5" />,
                  title: "Visit Us",
                  detail: "HSR Layout, Bengaluru",
                  sub: "Karnataka 560102, India",
                },
              ].map((item) => (
                <GlassCard key={item.title} className="flex items-start gap-4" glow="blue">
                  <div className="p-3 rounded-lg bg-aero-blue/5 text-aero-blue">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm text-text-secondary mt-0.5">
                      {item.detail}
                    </p>
                    <p className="text-xs text-text-muted mt-1">{item.sub}</p>
                  </div>
                </GlassCard>
              ))}

              {/* FAQ mini */}
              <GlassCard className="mt-4">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="w-4 h-4 text-aero-blue" />
                  <span className="text-sm font-medium text-foreground">FAQ</span>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      q: "How long until I hear back?",
                      a: "Within 24 hours on business days.",
                    },
                    {
                      q: "Do you offer corporate training?",
                      a: "Yes! Contact us for custom enterprise programs.",
                    },
                    {
                      q: "Can I get a refund?",
                      a: "Full refund within 7 days of enrollment.",
                    },
                  ].map((faq) => (
                    <div key={faq.q}>
                      <p className="text-xs font-medium text-foreground">{faq.q}</p>
                      <p className="text-xs text-text-muted mt-0.5">{faq.a}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <GlassCard padding="lg">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16"
                  >
                    <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-sm text-text-secondary">
                      Thank you for reaching out. We&apos;ll get back to you
                      shortly.
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
                          placeholder="you@company.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-text-muted uppercase tracking-wider mb-2">
                        Subject *
                      </label>
                      <input
                        required
                        type="text"
                        value={formState.subject}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            subject: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2.5 bg-surface-elevated rounded-lg text-sm text-foreground border border-border-subtle focus:border-aero-blue/30 focus:outline-none focus:ring-1 focus:ring-aero-blue/20 transition-all"
                        placeholder="How can we help?"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-text-muted uppercase tracking-wider mb-2">
                        Message *
                      </label>
                      <textarea
                        required
                        rows={6}
                        value={formState.message}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            message: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2.5 bg-surface-elevated rounded-lg text-sm text-foreground border border-border-subtle focus:border-aero-blue/30 focus:outline-none focus:ring-1 focus:ring-aero-blue/20 transition-all resize-none"
                        placeholder="Describe your inquiry in detail..."
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-text-muted">
                        <Clock className="w-3 h-3" />
                        Avg. response time: 12 hours
                      </div>
                      <Button variant="primary" size="lg" type="submit">
                        Send Message
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </form>
                )}
              </GlassCard>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
