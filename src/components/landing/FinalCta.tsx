import React from "react";
import Link from "next/link";
import { Button } from "@/ui/Button";
import { ArrowRight, Sparkles, Terminal } from "lucide-react";

export function FinalCta() {
  return (
    <section className="py-24 md:py-32 bg-[#121412] text-[#EDEDEB] relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(#272B27_1px,transparent_1px)] [background-size:24px_24px] opacity-30" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-400">
          <Terminal className="w-3.5 h-3.5 text-accent" />
          <span>Interactive Engineering Education</span>
        </div>

        <h2 className="text-display text-white font-sans tracking-tightest leading-tight max-w-3xl mx-auto">
          Become the engineer who understands <br />
          <span className="text-neutral-400 font-normal">how things really work.</span>
        </h2>

        <p className="text-base sm:text-lg text-neutral-400 max-w-xl mx-auto leading-relaxed">
          From array cache lines to distributed consensus. No fluff, no superficial shortcuts. Built for serious engineers.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link href="/learn/dsa/algorithms/binary-search">
            <Button size="lg" variant="accent" className="font-semibold text-sm shadow-card group">
              <span>Start Learning Now</span>
              <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>

          <Link href="/dashboard">
            <Button size="lg" variant="secondary" className="bg-white text-black hover:bg-neutral-200 border-none font-semibold text-sm">
              Open Demo Dashboard
            </Button>
          </Link>
        </div>

        <div className="pt-6 text-xs font-mono text-neutral-500">
          Free interactive modules &middot; No credit card required &middot; Open access
        </div>
      </div>
    </section>
  );
}
