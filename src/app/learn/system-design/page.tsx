import React from "react";
import Link from "next/link";
import { systemDesignTopics } from "@/content/system-design/curriculum";
import { systemDesignCaseStudies } from "@/content/system-design";
import { Badge } from "@/ui/Badge";
import { Button } from "@/ui/Button";
import { ArrowRight, Layers, Clock, ShieldCheck, Database, HardDrive, Cpu } from "lucide-react";

export default function SystemDesignCurriculumPage() {
  const categories = [
    "Foundations",
    "Storage & Caching",
    "Distributed Systems",
    "Reliability & Scale",
  ] as const;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-300 font-semibold">
          <Layers className="w-3.5 h-3.5 text-accent" />
          <span>Distributed Systems & Architecture Track</span>
        </div>
        <h1 className="text-display text-foreground font-sans font-bold tracking-tightest leading-tight">
          System Design for real-world scale.
        </h1>
        <p className="text-body-editorial text-foreground-muted leading-relaxed font-sans">
          From single-server bottlenecks to multi-region active-active clusters. Master capacity modeling, caching topologies, consensus, and resilience.
        </p>
      </div>

      {/* Interactive System Design Practice Studio Banner */}
      <div className="rounded-2xl border border-accent/40 bg-gradient-to-r from-accent/10 via-background to-card p-6 sm:p-8 shadow-card flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-accent/20 text-[11px] font-mono font-bold text-accent-text">
            <span>Live Interactive Tool</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-foreground tracking-tight">
            System Design Architecture Studio &amp; Traffic Simulator
          </h2>
          <p className="text-xs sm:text-sm text-foreground-muted leading-relaxed">
            Drag and connect clients, load balancers, caching layers, and database clusters. Run deterministic traffic compilation to detect single points of failure (SPOFs) and verify sub-15ms P99 latency.
          </p>
        </div>
        <Link href="/practice?tab=system-design" className="shrink-0">
          <Button
            variant="primary"
            className="w-full sm:w-auto px-5 py-3 text-xs font-bold shadow-md hover:shadow-lg"
          >
            <span>Launch Architecture Studio</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>

      {/* Featured Interactive Case Studies */}
      <div className="space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <h2 className="text-title-2 text-foreground font-semibold flex items-center gap-2">
            <span>Interactive Architecture Case Studies</span>
            <span className="text-xs font-mono text-accent-text font-bold px-2 py-0.5 rounded-full bg-accent/20">
              Whiteboard Ready
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.values(systemDesignCaseStudies).map((study) => (
            <div
              key={study.id}
              className="p-8 rounded-2xl border border-[#262A26] bg-[#121412] text-[#EDEDEB] shadow-card flex flex-col justify-between space-y-6 hover:shadow-elevated transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="accent">{study.level}</Badge>
                  <span className="text-xs font-mono text-neutral-400">{study.readTime} read</span>
                </div>

                <div>
                  <h3 className="text-title-2 text-white font-semibold group-hover:text-accent transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
                    {study.subtitle}
                  </p>
                </div>

                <div className="space-y-2 pt-2 border-t border-neutral-800 text-xs font-mono text-neutral-300">
                  <div className="text-[10px] uppercase text-neutral-500 font-semibold">
                    Key Architectural Pillars:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 rounded bg-neutral-900 border border-neutral-800">
                      Topology Diagram
                    </span>
                    <span className="px-2 py-1 rounded bg-neutral-900 border border-neutral-800">
                      Guided 8-Stage Interview
                    </span>
                    <span className="px-2 py-1 rounded bg-neutral-900 border border-neutral-800">
                      Back-of-Envelope Models
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                <Link href={`/learn/system-design/case-studies/${study.slug}`} className="w-full sm:w-auto">
                  <Button
                    variant="secondary"
                    className="w-full sm:w-auto justify-center bg-white text-black hover:bg-neutral-200 border-none text-xs font-semibold group"
                  >
                    <span>Launch Case Study Workbench</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Curriculum modules grouped by category */}
      <div className="space-y-12 pt-8">
        <h2 className="text-title-2 text-foreground font-semibold pb-3 border-b border-border">
          Foundational Topics & Trade-Offs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {systemDesignTopics.map((topic) => (
            <div
              key={topic.id}
              className="p-6 rounded-xl border border-border bg-surface shadow-subtle hover:shadow-card transition-all flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant={topic.level === "Beginner" ? "easy" : topic.level === "Intermediate" ? "medium" : "hard"}>
                    {topic.level}
                  </Badge>
                  <span className="text-xs font-mono text-foreground-muted">{topic.duration}</span>
                </div>

                <h3 className="font-semibold text-base text-foreground group-hover:text-accent-text transition-colors">
                  {topic.title}
                </h3>
                <p className="text-xs text-foreground-muted leading-relaxed">
                  {topic.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-border flex items-center justify-between text-xs font-medium text-foreground">
                <span className="font-mono text-foreground-subtle">{topic.category}</span>
                <Link
                  href={`/learn/system-design/${topic.slug}`}
                  className="flex items-center gap-1 group-hover:text-accent-text transition-colors"
                >
                  Inspect details
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
