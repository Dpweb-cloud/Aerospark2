"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { verifyCodeAction } from "@/app/actions/authActions";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/cards";
import { ShieldCheck, Mail } from "lucide-react";
import { toast } from "sonner";

function VerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || code.length < 6) {
      toast.error("Please enter a valid 6-digit code");
      return;
    }

    setLoading(true);
    try {
      const res = await verifyCodeAction({ email, code });
      if (res.success) {
        toast.success("Account verified successfully! You can now log in.");
        router.push("/login");
      } else {
        toast.error(res.error || "Verification failed");
      }
    } catch (err: any) {
      toast.error("Verification error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <GlassCard className="border border-border-default/60 bg-surface/40 backdrop-blur-xl">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-mono font-bold text-text-muted uppercase tracking-wider mb-2">
            Verification Code
          </label>
          <div className="relative">
            <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
              placeholder="Enter 6-digit code"
              maxLength={6}
              className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border-default rounded-xl text-center text-lg font-bold tracking-[0.4em] text-foreground focus:outline-none focus:border-aero-blue focus:ring-1 focus:ring-aero-blue"
              required
            />
          </div>
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full py-2.5 shadow-lg shadow-aero-blue/20"
          disabled={loading}
        >
          {loading ? "Verifying..." : "Verify Code"}
        </Button>
      </form>

      <div className="mt-5 text-center text-xs text-text-secondary">
        Didn't receive the email? Check your spam folder or{" "}
        <Link href="/signup" className="text-aero-blue hover:text-foreground font-semibold transition-colors">
          Sign Up again
        </Link>
      </div>
    </GlassCard>
  );
}

export default function VerifyPage() {
  return (
    <main className="min-h-screen bg-background relative flex items-center justify-center p-4 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-aero-blue/15 blur-[120px] rounded-[100%] pointer-events-none z-0" />
      <div className="absolute inset-0 radar-grid opacity-20 z-0" />

      <div className="w-full max-w-md relative z-10">
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-aero-blue/10 flex items-center justify-center mb-3 border border-aero-blue/20">
            <Mail className="w-6 h-6 text-aero-blue animate-pulse" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Verify Your Email</h1>
          <p className="text-sm text-text-secondary mt-1">We sent a verification code to your inbox</p>
        </div>

        <Suspense fallback={<div className="text-center py-8 text-foreground text-sm">Loading...</div>}>
          <VerifyContent />
        </Suspense>
      </div>
    </main>
  );
}
