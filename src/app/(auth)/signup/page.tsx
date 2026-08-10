"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signUpAction } from "@/app/actions/authActions";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/cards";
import { Rocket, Mail, Lock, User, GraduationCap, Users } from "lucide-react";
import { toast } from "sonner";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"STUDENT" | "TEACHER">("STUDENT");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await signUpAction({ name, email, password, role });
      if (res.success) {
        toast.success("Account created! Please check your email for the verification code.");
        if (res.warning) {
          toast.warning(res.warning);
        }
        router.push(`/verify?email=${encodeURIComponent(email)}`);
      } else {
        toast.error(res.error || "Something went wrong during sign up.");
      }
    } catch (err: any) {
      toast.error("Sign up failed: " + err.message);
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
            <Rocket className="w-6 h-6 text-aero-blue animate-pulse" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Create AeroSpark Account</h1>
          <p className="text-sm text-text-secondary mt-1">Start your drone & aerospace learning journey</p>
        </div>

        <GlassCard className="border border-border-default/60 bg-surface/40 backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-mono font-bold text-text-muted uppercase tracking-wider mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter full name"
                  className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border-default rounded-xl text-sm text-foreground focus:outline-none focus:border-aero-blue focus:ring-1 focus:ring-aero-blue"
                  required
                />
              </div>
            </div>

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
              <label className="block text-xs font-mono font-bold text-text-muted uppercase tracking-wider mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create secure password"
                  className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border-default rounded-xl text-sm text-foreground focus:outline-none focus:border-aero-blue focus:ring-1 focus:ring-aero-blue"
                  required
                />
              </div>
            </div>



            <Button
              type="submit"
              variant="primary"
              className="w-full py-2.5 mt-2 shadow-lg shadow-aero-blue/20"
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          <div className="mt-5 text-center text-xs text-text-secondary">
            Already have an account?{" "}
            <Link href="/login" className="text-aero-blue hover:text-foreground font-semibold transition-colors">
              Log In
            </Link>
          </div>
        </GlassCard>
      </div>
    </main>
  );
}
