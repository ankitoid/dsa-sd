"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/lib/config";
import { Button } from "@/ui/Button";
import { ArrowRight, Lock, Mail, ShieldCheck, Sparkles, Terminal } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDemoSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleDemoSignIn();
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md space-y-8 bg-surface p-8 sm:p-10 rounded-2xl border border-border shadow-elevated">
        <div className="space-y-3 text-center">
          <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#141414] text-white font-mono font-bold text-base shadow-sm mx-auto dark:bg-white dark:text-black">
            <span className="text-accent dark:text-emerald-600 font-extrabold">&gt;</span>
            <span>D</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground font-sans tracking-tight">
            Sign in to {siteConfig.name}
          </h1>
          <p className="text-xs text-foreground-muted">
            Track your algorithmic progress and spaced revision schedule.
          </p>
        </div>

        {/* Demo Fast Sign-in */}
        <div className="space-y-3">
          <Button
            type="button"
            onClick={handleDemoSignIn}
            isLoading={loading}
            variant="accent"
            size="lg"
            className="w-full justify-center text-xs font-semibold shadow-card group"
          >
            <span>Continue as Demo Engineer</span>
            <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
          </Button>

          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-border" />
            <span className="text-[11px] font-mono uppercase text-foreground-subtle">or email</span>
            <div className="flex-1 h-px bg-border" />
          </div>
        </div>

        {/* Credential Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="text-foreground-muted font-medium">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-foreground-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="engineer@company.com"
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-surface-muted border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-foreground-muted font-medium">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-foreground-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-9 pr-3 py-2 rounded-lg bg-surface-muted border border-border text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
          </div>

          <Button type="submit" variant="primary" size="md" className="w-full justify-center">
            Sign In with Email
          </Button>
        </form>

        <div className="p-3 rounded-lg bg-surface-muted border border-border text-[11px] text-foreground-muted leading-relaxed text-center font-mono">
          Demo mode active &middot; Supabase auth ready via environment variables.
        </div>
      </div>
    </div>
  );
}
