import React from "react";
import Link from "next/link";
import { Button } from "@/ui/Button";
import { ArrowRight, Binary, Layers, Search, Workflow, Database, Shield, Zap, Cpu } from "lucide-react";

export function CurriculumTracks() {
  return (
    <section className="py-20 md:py-28 border-b border-border/80 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Section Header */}
        <div className="max-w-2xl space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-foreground-muted font-semibold">
            Two Unified Learning Tracks
          </div>
          <h2 className="text-title-1 text-foreground font-sans tracking-tight">
            From algorithmic invariants to petabyte architectures.
          </h2>
          <p className="text-foreground-muted text-base leading-relaxed">
            Master the micro-level mechanics of pointers and complexity, then zoom out to the macro-level trade-offs of distributed systems.
          </p>
        </div>

        {/* The Two Main Tracks */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Track 1: Data Structures & Algorithms */}
          <div className="rounded-2xl border border-border bg-surface p-7 sm:p-9 flex flex-col justify-between shadow-card hover:shadow-elevated transition-shadow relative overflow-hidden group">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-accent/20 text-[#1B3604] border border-accent/40">
                  <Binary className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-surface-muted border border-border text-foreground-muted">
                  21 Modules &middot; 80+ Hours
                </span>
              </div>

              <div>
                <h3 className="text-title-2 text-foreground font-sans font-semibold">
                  Data Structures & Algorithms
                </h3>
                <p className="text-foreground-muted text-sm mt-2 leading-relaxed">
                  Understand why algorithms work mathematically. Learn array cache lines, pointers, logarithmic pruning, graph traversals, and dynamic programming without rote memorization.
                </p>
              </div>

              {/* Sample Topic Pills */}
              <div className="space-y-2 pt-2">
                <div className="text-xs font-mono uppercase tracking-wider text-foreground-subtle font-semibold">
                  Sample Core Modules:
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  <span className="px-2.5 py-1 rounded-md bg-surface-muted border border-border text-foreground">
                    Binary Search & Invariants
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-surface-muted border border-border text-foreground">
                    Sliding Window Mechanics
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-surface-muted border border-border text-foreground">
                    BFS & DFS Graph Topologies
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-surface-muted border border-border text-foreground">
                    Fenwick & Segment Trees
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-surface-muted border border-border text-foreground">
                    Dynamic Programming DAGs
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-border flex items-center justify-between">
              <Link href="/learn/dsa" className="w-full sm:w-auto">
                <Button variant="accent" className="w-full sm:w-auto justify-center group font-semibold text-xs">
                  <span>Explore DSA Track</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link
                href="/roadmaps/dsa"
                className="hidden sm:inline-flex text-xs font-mono text-foreground-muted hover:text-foreground transition-colors"
              >
                View DSA Roadmap &rarr;
              </Link>
            </div>
          </div>

          {/* Track 2: System Design */}
          <div className="rounded-2xl border border-[#262A26] bg-[#121412] text-[#EDEDEB] p-7 sm:p-9 flex flex-col justify-between shadow-card hover:shadow-elevated transition-shadow relative overflow-hidden group">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="p-3 rounded-xl bg-neutral-800 text-white border border-neutral-700">
                  <Layers className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400">
                  14 Modules &middot; 45+ Hours
                </span>
              </div>

              <div>
                <h3 className="text-title-2 text-white font-sans font-semibold">
                  System Design & Scale
                </h3>
                <p className="text-neutral-400 text-sm mt-2 leading-relaxed">
                  Design real architectures for high availability, sub-15ms tail latency, and resilient multi-region fault tolerance. Interactive whiteboards with capacity models and trade-offs.
                </p>
              </div>

              {/* Sample Modules */}
              <div className="space-y-2 pt-2">
                <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-semibold">
                  Sample Case Studies & Topics:
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  <span className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-300">
                    URL Shortener (TinyURL)
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-300">
                    Token Bucket Rate Limiter
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-300">
                    Caching & Eviction Policies
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-300">
                    CAP Theorem & Linearizability
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-neutral-300">
                    Kafka Log Streaming
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-8 mt-6 border-t border-neutral-800 flex items-center justify-between">
              <Link href="/learn/system-design" className="w-full sm:w-auto">
                <Button variant="secondary" className="w-full sm:w-auto justify-center bg-white text-black hover:bg-neutral-200 border-none font-semibold text-xs group">
                  <span>Explore System Design</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link
                href="/roadmaps/system-design"
                className="hidden sm:inline-flex text-xs font-mono text-neutral-400 hover:text-white transition-colors"
              >
                View System Design Roadmap &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
