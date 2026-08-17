"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GlassCard } from "@/components/ui/cards";

export default function RefundPolicyPage() {
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
                Refund Policy
              </h1>
              <p className="text-text-secondary text-sm">
                Last updated: August 17, 2026
              </p>
            </div>

            <GlassCard padding="lg" className="space-y-6 text-text-secondary leading-relaxed">
              <section className="space-y-3">
                <h2 className="text-xl font-bold text-foreground">1. Academy Course Refunds</h2>
                <p>
                  We want you to be completely satisfied with your learning experience. For standard, self-paced, or live-guided courses enrolled directly through our academy website, you are eligible to request a full refund within 14 days of your purchase date, provided you have completed less than 20% of the course modules or materials.
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-foreground">2. Non-Refundable Items</h2>
                <p>
                  Certain services and products are non-refundable. These include:
                </p>
                <ul className="list-disc list-inside ml-4 space-y-1.5">
                  <li>Consultation and advisory services once work or evaluation has officially commenced.</li>
                  <li>Custom drone design, rapid prototyping, and CFD/FEA engineering project runs.</li>
                  <li>Promotional and discounted course bundles if any single course in the bundle has been accessed or started.</li>
                  <li>Courses where the certificate of completion has already been issued.</li>
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-bold text-foreground">3. Processing Refunds</h2>
                <p>
                  To request a refund, please send an email to our support team with your order details, account email, and reason for the request. Approved refunds will be processed and credited back to the original method of payment within 7 to 10 business days.
                </p>
              </section>

              <section className="space-y-3 pt-4 border-t border-border-subtle">
                <h2 className="text-lg font-bold text-foreground">Contact Us</h2>
                <p>
                  If you have any questions or would like to submit a refund request, please contact us at{" "}
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
