"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GlassCard } from "@/components/ui/cards";

export default function TermsAndConditionsPage() {
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
                Terms & Conditions
              </h1>
              <p className="text-text-secondary text-sm">
                Last updated: August 17, 2026
              </p>
            </div>

            <GlassCard padding="lg" className="space-y-6 text-text-secondary leading-relaxed">
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-foreground">1. Agreement to Terms</h2>
                <p>
                  By accessing or using the AeroSpark website, academy programs, or consulting services, you agree to be bound by these Terms and Conditions. If you do not agree to all of these terms, please do not access or use our services.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-foreground">2. Use of Site and Services</h2>
                <p>
                  You agree to use our platform and services only for lawful purposes and in accordance with these Terms. You are responsible for ensuring that all persons who access our website through your internet connection are aware of these Terms and comply with them.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-foreground">3. Account Registration & Security</h2>
                <p>
                  To access certain academy courses or portal features, you may be required to register for an account. You must provide accurate and complete information and keep this information updated. You are solely responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-foreground">4. Intellectual Property Rights</h2>
                <p>
                  The website design, course materials, lectures, graphics, diagrams, software, code, and logos are the intellectual property of AeroSpark and are protected by copyright, trademark, and other laws. You are granted a limited, non-exclusive, non-transferable license to access course materials for your personal, non-commercial education. You may not distribute, modify, transmit, reuse, or copy any contents without our explicit prior written consent.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-foreground">5. Limitation of Liability</h2>
                <p>
                  AeroSpark provides educational and consulting services. We do not guarantee employment, salary, or successful certification outcomes with regulatory authorities (such as the DGCA). To the maximum extent permitted by law, AeroSpark shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our services.
                </p>
              </section>

              <section className="space-y-3 pt-4 border-t border-border-subtle">
                <h2 className="text-lg font-bold text-foreground">Contact Us</h2>
                <p>
                  If you have any questions about these Terms & Conditions, please contact us at{" "}
                  <a href="mailto:hello@aerospark.io" className="text-aero-blue hover:underline">
                    hello@aerospark.io
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
