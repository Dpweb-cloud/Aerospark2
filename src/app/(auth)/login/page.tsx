"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginAction } from "@/app/actions/authActions";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/cards";
import { Rocket, Mail, Lock } from "lucide-react";
import { toast } from "sonner";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      const res = await loginAction({ email, password });
      if (res.success) {
        if (rememberMe) {
          localStorage.setItem("rememberedEmail", email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }
        toast.success("Successfully logged in!");
        if (res.role === "ADMIN") {
          router.push("/dashboard/admin");
        } else if (res.role === "TEACHER") {
          router.push("/dashboard/teacher");
        } else {
          router.push("/dashboard");
        }
      } else {
        if (res.notVerified) {
          toast.warning(res.error);
          router.push(`/verify?email=${encodeURIComponent(email)}`);
        } else {
          toast.error(res.error || "Login failed");
        }
      }
    } catch (err: any) {
      toast.error("Login failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background relative flex items-center justify-center p-4 overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-aero-blue/15 blur-[120px] rounded-[100%] pointer-events-none z-0" />
      <div className="absolute inset-0 radar-grid opacity-20 z-0" />

      <div className="w-full max-w-md relative z-10">
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-aero-blue/10 flex items-center justify-center mb-3 border border-aero-blue/20">
            <Rocket className="w-6 h-6 text-aero-blue" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Log In to AeroSpark</h1>
          <p className="text-sm text-text-secondary mt-1">Access your dashboard & learning modules</p>
        </div>

        <GlassCard className="border border-border-default/60 bg-surface/40 backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-xs font-mono font-bold text-text-muted uppercase tracking-wider mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border-default rounded-xl text-sm text-foreground focus:outline-none focus:border-aero-blue focus:ring-1 focus:ring-aero-blue"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-mono font-bold text-text-muted uppercase tracking-wider">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border-default rounded-xl text-sm text-foreground focus:outline-none focus:border-aero-blue focus:ring-1 focus:ring-aero-blue"
                  required
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between py-1 text-xs">
              <label className="flex items-center gap-2 text-text-secondary cursor-pointer hover:text-foreground transition-colors select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-border-default bg-surface/50 text-aero-blue focus:ring-aero-blue accent-[#FF6600]"
                />
                <span>Remember Me</span>
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full py-2.5 mt-2 shadow-lg shadow-aero-blue/20"
              disabled={loading}
            >
              {loading ? "Logging In..." : "Log In"}
            </Button>
          </form>

          <div className="mt-5 text-center text-xs text-text-secondary">
            Don't have an account?{" "}
            <Link href="/signup" className="text-aero-blue hover:text-foreground font-semibold transition-colors">
              Sign Up
            </Link>
          </div>
        </GlassCard>
      </div>
    </main>
  );
}
