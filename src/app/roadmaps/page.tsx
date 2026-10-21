import React from "react";
import Link from "next/link";
import { dsaRoadmapMilestones } from "@/content/roadmaps/dsa-roadmap";
import { systemDesignRoadmapMilestones } from "@/content/roadmaps/system-design-roadmap";
import { Badge } from "@/ui/Badge";
import { Button } from "@/ui/Button";
import { ArrowRight, Binary, Layers, Milestone, CheckCircle2, Clock } from "lucide-react";

export default function RoadmapsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs font-mono text-amber-700 dark:text-amber-400 font-semibold">
          <Milestone className="w-3.5 h-3.5" />
          <span>Curated Learning Roadmaps</span>
        </div>
        <h1 className="text-display text-foreground font-sans font-bold tracking-tightest leading-tight">
          Step-by-step engineering mastery paths.
        </h1>
        <p className="text-body-editorial text-foreground-muted leading-relaxed font-sans">
          Eliminate tutorial paralysis. Follow ordered learning milestones, complete practice checkpoints, and advance toward senior engineering readiness.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* DSA Roadmap Card */}
        <div className="p-8 rounded-2xl border border-border bg-surface shadow-card flex flex-col justify-between space-y-6 hover:shadow-elevated transition-shadow">
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-accent/20 text-[#1B3604] border border-accent/40 w-fit">
              <Binary className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-title-2 text-foreground font-semibold">
                DSA Progression Roadmap
              </h2>
              <p className="text-sm text-foreground-muted mt-2 leading-relaxed">
                5 progressive milestones spanning 12-16 weeks. From asymptotic analysis to complex dynamic programming DAGs and tree/graph invariants.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {dsaRoadmapMilestones.slice(0, 3).map((m) => (
                <div key={m.id} className="p-3 bg-surface-muted rounded-lg border border-border text-xs space-y-1">
                  <div className="flex items-center justify-between font-semibold text-foreground">
                    <span>Milestone 0{m.step}: {m.title}</span>
                    <span className="font-mono text-foreground-muted text-[10px]">{m.duration}</span>
                  </div>
                  <p className="text-foreground-muted text-[11px] line-clamp-1">{m.subtitle}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <Link href="/roadmaps/dsa">
              <Button variant="accent" className="w-full justify-center text-xs font-semibold">
                <span>View Complete DSA Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* System Design Roadmap Card */}
        <div className="p-8 rounded-2xl border border-[#272B27] bg-[#121412] text-[#EDEDEB] shadow-card flex flex-col justify-between space-y-6 hover:shadow-elevated transition-shadow">
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-neutral-800 text-white border border-neutral-700 w-fit">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-title-2 text-white font-semibold">
                System Design Progression Roadmap
              </h2>
              <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
                4 comprehensive milestones covering networking fundamentals, caching hierarchies, CAP consistency, and event-driven microservices.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              {systemDesignRoadmapMilestones.slice(0, 3).map((m) => (
                <div key={m.id} className="p-3 bg-neutral-900 rounded-lg border border-neutral-800 text-xs space-y-1">
                  <div className="flex items-center justify-between font-semibold text-white">
                    <span>Milestone 0{m.step}: {m.title}</span>
                    <span className="font-mono text-neutral-400 text-[10px]">{m.duration}</span>
                  </div>
                  <p className="text-neutral-400 text-[11px] line-clamp-1">{m.subtitle}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-800">
            <Link href="/roadmaps/system-design">
              <Button
                variant="secondary"
                className="w-full justify-center bg-white text-black hover:bg-neutral-200 border-none text-xs font-semibold"
              >
                <span>View Complete System Design Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
