import React from "react";
import Link from "next/link";
import { dsaRoadmapMilestones } from "@/content/roadmaps/dsa-roadmap";
import { Badge } from "@/ui/Badge";
import { Button } from "@/ui/Button";
import { ArrowLeft, ArrowRight, CheckCircle2, Circle, Clock, Milestone, Target } from "lucide-react";

export default function DSARoadmapPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <Link
        href="/roadmaps"
        className="inline-flex items-center gap-1.5 text-xs font-mono text-foreground-muted hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to All Roadmaps</span>
      </Link>

      <div className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-[#1B3604] border border-accent/40 text-xs font-mono font-semibold">
          <Milestone className="w-3.5 h-3.5" />
          <span>Algorithms Track Roadmap</span>
        </div>
        <h1 className="text-display text-foreground font-sans font-bold tracking-tightest leading-tight">
          Data Structures & Algorithms Progression
        </h1>
        <p className="text-body-editorial text-foreground-muted leading-relaxed font-sans">
          A phased sequence engineered to build algorithmic intuition from first principles to advanced optimization.
        </p>
      </div>

      {/* Recommended Next Step Callout */}
      <div className="p-6 rounded-xl border border-accent/40 bg-accent/10 space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#1B3604] font-bold">
          <Target className="w-4 h-4" />
          <span>Current Recommended Next Step:</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-semibold text-base text-foreground font-sans">
              Milestone 01: Complexity Analysis & Asymptotics
            </h4>
            <p className="text-xs text-foreground-muted mt-0.5">
              Build your baseline mental model of Big-O, CPU cache lines, and logarithmic pruning.
            </p>
          </div>
          <Link href="/learn/dsa/algorithms/binary-search">
            <Button variant="accent" size="sm" className="font-semibold text-xs shrink-0">
              Start Milestone 01 &rarr;
            </Button>
          </Link>
        </div>
      </div>

      {/* Ordered Milestones List */}
      <div className="space-y-8 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-border">
        {dsaRoadmapMilestones.map((m) => (
          <div key={m.id} className="relative pl-12 space-y-4">
            {/* Timeline Circle */}
            <div className="absolute left-3 -translate-x-1/2 top-1.5 w-5 h-5 rounded-full bg-surface border-2 border-[#141414] dark:border-white flex items-center justify-center">
              <span className="h-1.5 w-1.5 rounded-full bg-accent inline-block" />
            </div>

            <div className="p-6 rounded-xl border border-border bg-surface shadow-subtle space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-mono font-bold text-accent-text uppercase tracking-wider">
                  Milestone 0{m.step}
                </span>
                <span className="text-xs font-mono text-foreground-muted">{m.duration}</span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground font-sans">{m.title}</h3>
                <p className="text-xs font-mono text-foreground-muted mt-0.5">{m.subtitle}</p>
                <p className="text-sm text-foreground-muted mt-2 leading-relaxed">{m.description}</p>
              </div>

              {/* Prerequisites */}
              {m.prerequisites.length > 0 && (
                <div className="text-xs text-foreground-muted">
                  <span className="font-mono text-foreground-subtle">Prerequisites: </span>
                  {m.prerequisites.join(", ")}
                </div>
              )}

              {/* Recommended Topics */}
              <div className="pt-2 border-t border-border space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-foreground-muted font-bold">
                  Recommended Lessons:
                </div>
                <div className="flex flex-wrap gap-2">
                  {m.recommendedTopics.map((topic, tIdx) => (
                    <Link
                      key={tIdx}
                      href={`/learn/dsa/algorithms/${topic.slug}`}
                      className="px-3 py-1.5 rounded-lg bg-surface-muted hover:bg-surface border border-border text-xs text-foreground font-medium transition-colors flex items-center gap-1.5 group"
                    >
                      <span>{topic.title}</span>
                      <ArrowRight className="w-3 h-3 text-foreground-muted group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Checkpoint Problem */}
              {m.checkpointProblem && (
                <div className="pt-2 flex items-center justify-between text-xs font-mono bg-surface-muted/60 p-3 rounded-lg border border-border">
                  <span className="text-foreground-muted">Checkpoint Coding Challenge:</span>
                  <Link
                    href={`/practice?problem=${m.checkpointProblem.slug}`}
                    className="text-foreground hover:text-accent-text font-bold flex items-center gap-1"
                  >
                    <span>{m.checkpointProblem.title}</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
