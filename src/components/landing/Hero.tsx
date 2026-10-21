"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { Button } from "@/ui/Button";
import { HeroVisualization } from "./HeroVisualization";
import { ArrowRight, ShieldCheck, Cpu, Code2, Sparkles } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28 border-b border-border/80">
      {/* Background Subtle Gradient Grid */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#E5E7EB_1px,transparent_1px)] [background-size:24px_24px] opacity-40 dark:bg-[radial-gradient(#272B27_1px,transparent_1px)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Editorial Heading Composition */}
        <div className="max-w-3xl space-y-6">
          {/* Subtle Tagline */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border shadow-subtle text-xs font-mono text-foreground-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent inline-block" />
            <span>Structured Engineering Curriculum &middot; DevMastery 2.0</span>
          </div>

          <h1 className="text-display text-foreground font-sans tracking-tightest leading-[1.05]">
            Understand the <br />
            <span className="text-neutral-500 font-normal">engineering behind</span> <br />
            great software.
          </h1>

          <p className="text-body-editorial text-foreground-muted max-w-2xl leading-relaxed">
            {siteConfig.description} An interactive textbook engineered for visual intuition, algorithmic rigor, and distributed system scale.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href="/learn/dsa/algorithms/binary-search">
              <Button size="lg" variant="accent" className="font-semibold text-sm shadow-card group">
                <span>Start your journey</span>
                <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            <Link href="/learn">
              <Button size="lg" variant="secondary" className="font-medium text-sm">
                Explore the curriculum
              </Button>
            </Link>
          </div>

          {/* Small Proof-of-Product Indicators (factual, not fake testimonials) */}
          <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-foreground-muted font-mono border-t border-border/60">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>32 In-depth DSA & System Design topics</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-blue-600" />
              <span>Deterministic step visualizers</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-purple-600" />
              <span>Monaco coding sandbox</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive Engineering Visualization */}
        <div className="w-full">
          <HeroVisualization />
        </div>
      </div>
    </section>
  );
}
