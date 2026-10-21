import React from "react";
import Link from "next/link";
import { dsaTopics } from "@/content/dsa/curriculum";
import { systemDesignTopics } from "@/content/system-design/curriculum";
import { Binary, Layers, ArrowRight, CheckCircle2, Sparkles, BookOpen } from "lucide-react";
import { Button } from "@/ui/Button";

export default function LearnPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Editorial Header */}
      <div className="max-w-3xl space-y-4">
        <div className="text-xs font-mono uppercase tracking-wider text-foreground-muted font-semibold">
          Curriculum Directory
        </div>
        <h1 className="text-display text-foreground font-sans font-bold tracking-tightest leading-tight">
          Master the full spectrum of software engineering.
        </h1>
        <p className="text-body-editorial text-foreground-muted leading-relaxed font-sans">
          Choose a foundational track. From algorithmic pointer mechanics and memory hierarchies to petabyte-scale distributed systems and high-availability case studies.
        </p>
      </div>

      {/* Tracks Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* DSA Card */}
        <div className="rounded-2xl border border-border bg-surface p-8 shadow-card flex flex-col justify-between space-y-6 hover:shadow-elevated transition-shadow">
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-accent/20 text-[#1B3604] border border-accent/40 w-fit">
              <Binary className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-title-2 text-foreground font-semibold">
                Data Structures & Algorithms
              </h2>
              <p className="text-sm text-foreground-muted mt-2 leading-relaxed font-sans">
                {dsaTopics.length} comprehensive modules spanning Big-O asymptotics, contiguous arrays, pointers, monotonic stacks, trees, tries, graphs, and dynamic programming.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <div className="text-xs font-mono uppercase tracking-wider text-foreground-subtle font-semibold">
                Featured Lessons:
              </div>
              <ul className="space-y-1.5 text-xs text-foreground font-mono">
                <li>
                  <Link
                    href="/learn/dsa/algorithms/binary-search"
                    className="hover:text-accent-text flex items-center gap-2"
                  >
                    <ArrowRight className="w-3 h-3 text-accent-text" />
                    <span>Binary Search: Invariants & Logarithmic Elimination</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/learn/dsa/algorithms/sliding-window"
                    className="hover:text-accent-text flex items-center gap-2"
                  >
                    <ArrowRight className="w-3 h-3 text-accent-text" />
                    <span>Sliding Window: Amortized Linear Subarrays</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/learn/dsa/algorithms/graph-traversal"
                    className="hover:text-accent-text flex items-center gap-2"
                  >
                    <ArrowRight className="w-3 h-3 text-accent-text" />
                    <span>Graph Traversal: BFS & DFS Mechanics</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-border">
            <Link href="/learn/dsa">
              <Button variant="accent" className="w-full justify-center text-xs font-semibold">
                <span>Explore Full DSA Curriculum</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* System Design Card */}
        <div className="rounded-2xl border border-[#272B27] bg-[#121412] text-[#EDEDEB] p-8 shadow-card flex flex-col justify-between space-y-6 hover:shadow-elevated transition-shadow">
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-neutral-800 text-white border border-neutral-700 w-fit">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-title-2 text-white font-semibold">
                System Design & Architecture
              </h2>
              <p className="text-sm text-neutral-400 mt-2 leading-relaxed font-sans">
                {systemDesignTopics.length} system foundations and interactive case studies covering load balancing, replication, CAP theorem, Redis caching, Kafka queues, and rate limiters.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <div className="text-xs font-mono uppercase tracking-wider text-neutral-500 font-semibold">
                Interactive Case Studies:
              </div>
              <ul className="space-y-1.5 text-xs text-neutral-300 font-mono">
                <li>
                  <Link
                    href="/learn/system-design/case-studies/url-shortener"
                    className="hover:text-accent flex items-center gap-2"
                  >
                    <ArrowRight className="w-3 h-3 text-accent" />
                    <span>URL Shortener (TinyURL) Architecture (11.5k QPS)</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/learn/system-design/case-studies/rate-limiter"
                    className="hover:text-accent flex items-center gap-2"
                  >
                    <ArrowRight className="w-3 h-3 text-accent" />
                    <span>Distributed API Rate Limiter & Token Bucket</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-neutral-800">
            <Link href="/learn/system-design">
              <Button
                variant="secondary"
                className="w-full justify-center bg-white text-black hover:bg-neutral-200 border-none text-xs font-semibold"
              >
                <span>Explore System Design Track</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
