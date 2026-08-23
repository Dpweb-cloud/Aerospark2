"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/cards";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

export default function ContactClient() {
  const formSectionRef = useRef<HTMLDivElement>(null);

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    enquiryType: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scrollToForm = () => {
    formSectionRef.current?.scrollIntoView({ behavior: "smooth" });
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
        throw new Error("Failed to send enquiry");
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormState({ name: "", email: "", enquiryType: "", subject: "", message: "" });
      }, 4000);
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      q: "I need help with a UAV or aerospace project. Where should I start?",
      a: "Select Engineering & Consulting in the contact form and briefly describe your project, its current stage, and the kind of support you're looking for.",
    },
    {
      q: "I have a question about an AeroSpark course. What should I select?",
      a: "Choose AeroSpark Academy and mention the course or subject you're interested in.",
    },
    {
      q: "Can companies or institutions collaborate with AeroSpark?",
      a: "Yes. Select Partnership & Collaboration and tell us briefly about the organisation and the type of collaboration you have in mind.",
    },
    {
      q: "Can I contact AeroSpark if I'm not sure which service I need?",
      a: "Yes. Select General Enquiry and describe what you're trying to achieve. We'll help identify the most relevant direction.",
    },
  ];

  return (
    <>
      <Navbar />
      <main className="pb-16">
        {/* Top Section */}
        <section className="pt-28 pb-20 relative">
          <div className="absolute inset-0 radar-grid opacity-40" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="max-w-3xl"
            >
              <span className="text-[#FF6600] font-bold text-xs uppercase tracking-widest block mb-4">
                CONTACT AEROSPARK
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mt-4 mb-6 tracking-tight">
                Let&apos;s Talk Aerospace.
              </h1>
              <p className="text-text-secondary text-lg leading-relaxed">
                Whether you need support with a UAV project, drone certification, aerospace engineering, technical training, or collaboration, tell us what you&apos;re looking for and we&apos;ll help direct your enquiry to the right place.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section ref={formSectionRef} id="enquiry-form" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24 scroll-mt-28">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Contact Details Card Column */}
            <div className="space-y-6">
              {[
                {
                  icon: <Mail className="w-5 h-5" />,
                  title: "Email Us",
                  detail: "hello@aerospark.io",
                  sub: "Send us an email",
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
                  <div className="p-3 rounded-lg bg-aero-blue/5 text-aero-blue shrink-0">
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

              {/* Form Tips Panel */}
              <GlassCard className="bg-surface-elevated/20" glow="none">
                <div className="space-y-4">
                  <div className="p-4 border border-dashed border-border-default rounded-xl">
                    <p className="text-xs text-text-secondary leading-relaxed">
                      <span className="font-bold text-foreground block mb-1">Requirement Check:</span>
                      For technical or project-related enquiries, include a short description of your requirement so we can better understand how AeroSpark may be able to help.
                    </p>
                  </div>
                  <div className="p-4 border border-dashed border-border-default rounded-xl">
                    <p className="text-xs text-text-secondary leading-relaxed">
                      <span className="font-bold text-foreground block mb-1 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-[#FF6600]" />
                        IP Notice:
                      </span>
                      Sharing sensitive project information? Please avoid including confidential or proprietary technical details in your first enquiry. These can be discussed separately if required.
                    </p>
                  </div>
                </div>
              </GlassCard>
            </div>

            {/* Form Column */}
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
                      Enquiry Sent!
                    </h3>
                    <p className="text-sm text-text-secondary">
                      Thank you for reaching out. We will review your enquiry and get back to you.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs text-text-muted uppercase tracking-wider mb-2 font-bold">
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
                        <label className="block text-xs text-text-muted uppercase tracking-wider mb-2 font-bold">
                          Email Address *
                        </label>
                        <input
                          required
                          type="email"
                          value={formState.email}
                          onChange={(e) =>
                            setFormState({ ...formState, email: e.target.value })
                          }
                          className="w-full px-4 py-2.5 bg-surface-elevated rounded-lg text-sm text-foreground border border-border-subtle focus:border-aero-blue/30 focus:outline-none focus:ring-1 focus:ring-aero-blue/20 transition-all"
                          placeholder="Your email address"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs text-text-muted uppercase tracking-wider mb-2 font-bold">
                        What can we help you with? *
                      </label>
                      <select
                        required
                        value={formState.enquiryType}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            enquiryType: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2.5 bg-surface-elevated rounded-lg text-sm text-foreground border border-border-subtle focus:border-aero-blue/30 focus:outline-none focus:ring-1 focus:ring-aero-blue/20 transition-all appearance-none"
                      >
                        <option value="" className="bg-surface text-text-muted">
                          Select enquiry type
                        </option>
                        <option value="Engineering & Consulting" className="bg-surface">
                          Engineering & Consulting
                        </option>
                        <option value="AeroSpark Academy" className="bg-surface">
                          AeroSpark Academy
                        </option>
                        <option value="Partnership & Collaboration" className="bg-surface">
                          Partnership & Collaboration
                        </option>
                        <option value="General Enquiry" className="bg-surface">
                          General Enquiry
                        </option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs text-text-muted uppercase tracking-wider mb-2 font-bold">
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
                        placeholder="What would you like to discuss?"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-text-muted uppercase tracking-wider mb-2 font-bold">
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
                        placeholder="Tell us briefly about your enquiry, project, course question, or collaboration idea."
                      />
                    </div>

                    <div className="flex items-center justify-end">
                      <Button
                        variant="primary"
                        size="lg"
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-[#FF6600] text-white hover:bg-[#e65c00] border-none shadow-lg"
                      >
                        {isSubmitting ? "Sending..." : "Send Enquiry"}
                        {!isSubmitting && <Send className="w-4 h-4" />}
                      </Button>
                    </div>
                  </form>
                )}
              </GlassCard>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="text-center mb-12">
            <span className="text-[#FF6600] font-bold text-xs uppercase tracking-widest block mb-3">
              FAQ
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <GlassCard key={idx} padding="md" className="space-y-2" glow="none">
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-aero-blue shrink-0" />
                  <h4 className="font-bold text-foreground text-sm md:text-base leading-snug">
                    {faq.q}
                  </h4>
                </div>
                <p className="text-xs md:text-sm text-text-secondary leading-relaxed pl-8">
                  {faq.a}
                </p>
              </GlassCard>
            ))}
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
                READY TO CONNECT?
              </span>
              <h2 className="text-3xl font-bold text-foreground mb-4 tracking-tight">
                Start With the Right Conversation.
              </h2>
              <p className="text-text-secondary mb-8 max-w-lg mx-auto">
                From engineering projects and certification questions to aerospace training and collaborations, AeroSpark is here to help you find the right next step.
              </p>
              <Button variant="primary" size="lg" onClick={scrollToForm} className="bg-[#FF6600] text-white hover:bg-[#e65c00] border-none shadow-lg">
                Send an Enquiry
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
