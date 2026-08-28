"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GlassCard } from "@/components/ui/cards";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="pt-32 pb-16 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="text-center md:text-left">
              <span className="text-[#FF6600] font-bold text-xs uppercase tracking-widest block mb-3">
                Legal Documentation
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-foreground tracking-tight mb-4">
                Privacy Policy
              </h1>
              <p className="text-text-secondary text-sm">
                Last updated: August 17, 2026
              </p>
            </div>

            <GlassCard padding="lg" className="space-y-6 text-text-secondary leading-relaxed">
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-foreground">1. Information We Collect</h2>
                <p>
                  We collect information you provide directly to us when enrolling in our courses, booking consultations, or communicating with us. This includes your name, email address, phone number, billing address, professional background, and any project-specific details shared during consultation requests.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-foreground">2. How We Use Your Information</h2>
                <p>
                  We use the information we collect to deliver our educational courses, provide consulting and type-certification services, process payments, verify identities for certification issuance, and communicate updates or responses to your inquiries.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-foreground">3. Information Sharing and Disclosure</h2>
                <p>
                  AeroSpark does not sell, rent, or trade your personal information. We only share information with third-party service providers (such as payment processors and hosting services) who assist in running our platform, or when required by law to comply with legal processes or regulatory frameworks (such as DGCA compliance requirements).
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-foreground">4. Data Security</h2>
                <p>
                  We implement industry-standard administrative, technical, and physical security measures to protect your personal data from unauthorized access, loss, or alteration. However, no electronic transmission or storage method is completely secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-foreground">5. Your Choices and Rights</h2>
                <p>
                  Depending on your location, you may have the right to access, update, correct, or delete your personal data. You can manage your preferences or request changes by contacting us directly at our support email.
                </p>
              </section>

              <section className="space-y-3 pt-4 border-t border-border-subtle">
                <h2 className="text-lg font-bold text-foreground">Contact Us</h2>
                <p>
                  If you have any questions or concerns about this Privacy Policy, please reach out to us at{" "}
                  <a href="mailto:connect@aerospark.in" className="text-aero-blue hover:underline">
                    connect@aerospark.in
                  </a>.
                </p>
              </section>
            </GlassCard>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
