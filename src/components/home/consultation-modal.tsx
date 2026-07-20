"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONSULTATION_SERVICES } from "@/lib/constants";

export function ConsultationModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
        onClose();
        setFormState({
          name: "",
          email: "",
          phone: "",
          company: "",
          service: "",
          message: "",
        });
      }, 4000);
    } catch (error) {
      console.error("Error submitting form", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-surface-elevated/90 backdrop-blur-xl border border-border-subtle rounded-2xl shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-text-secondary hover:text-foreground"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  Request Sent!
                </h3>
                <p className="text-text-secondary">
                  Our team will review your request and get back to you shortly.
                </p>
              </motion.div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-foreground mb-1 tracking-tight">
                  Discuss Your Project
                </h2>
                <p className="text-sm text-text-secondary mb-6">
                  Fill out the form below and we'll get back to you within 24 hours.
                </p>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-text-muted uppercase tracking-wider mb-1.5">
                        Full Name *
                      </label>
                      <input
                        required
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={(e) =>
                          setFormState({ ...formState, name: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-background rounded-lg text-sm text-foreground border border-border-subtle focus:border-aero-blue/50 focus:outline-none focus:ring-1 focus:ring-aero-blue/30 transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-text-muted uppercase tracking-wider mb-1.5">
                        Email *
                      </label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={(e) =>
                          setFormState({ ...formState, email: e.target.value })
                        }
                        className="w-full px-3 py-2 bg-background rounded-lg text-sm text-foreground border border-border-subtle focus:border-aero-blue/50 focus:outline-none focus:ring-1 focus:ring-aero-blue/30 transition-all"
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-text-muted uppercase tracking-wider mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formState.phone}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            phone: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 bg-background rounded-lg text-sm text-foreground border border-border-subtle focus:border-aero-blue/50 focus:outline-none focus:ring-1 focus:ring-aero-blue/30 transition-all"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>

                    <div>
                      <label className="block text-xs text-text-muted uppercase tracking-wider mb-1.5">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={formState.company}
                        onChange={(e) =>
                          setFormState({
                            ...formState,
                            company: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 bg-background rounded-lg text-sm text-foreground border border-border-subtle focus:border-aero-blue/50 focus:outline-none focus:ring-1 focus:ring-aero-blue/30 transition-all"
                        placeholder="Acme Aerospace"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-text-muted uppercase tracking-wider mb-1.5">
                      Service Required *
                    </label>
                    <select
                      required
                      name="service"
                      value={formState.service}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          service: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-background rounded-lg text-sm text-foreground border border-border-subtle focus:border-aero-blue/50 focus:outline-none focus:ring-1 focus:ring-aero-blue/30 transition-all appearance-none"
                    >
                      <option value="" className="bg-background text-text-muted">
                        Select a service
                      </option>
                      {CONSULTATION_SERVICES.map((s) => (
                        <option key={s.id} value={s.title} className="bg-background">
                          {s.title}
                        </option>
                      ))}
                      <option value="Other" className="bg-background font-semibold">
                        Other
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-text-muted uppercase tracking-wider mb-1.5">
                      Project Details *
                    </label>
                    <textarea
                      required
                      name="message"
                      rows={3}
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({
                          ...formState,
                          message: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 bg-background rounded-lg text-sm text-foreground border border-border-subtle focus:border-aero-blue/50 focus:outline-none focus:ring-1 focus:ring-aero-blue/30 transition-all resize-none"
                      placeholder="Describe your project requirements..."
                    />
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    type="submit"
                    className="w-full mt-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Submit Request"}
                    {!isSubmitting && <Send className="w-4 h-4" />}
                  </Button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
