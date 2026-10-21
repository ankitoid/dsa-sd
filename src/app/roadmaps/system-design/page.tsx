import React from "react";
import Link from "next/link";
import { systemDesignRoadmapMilestones } from "@/content/roadmaps/system-design-roadmap";
import { Badge } from "@/ui/Badge";
import { Button } from "@/ui/Button";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Layers, Milestone, Target } from "lucide-react";

export default function SystemDesignRoadmapPage() {
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
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-300 text-xs font-mono font-semibold">
          <Milestone className="w-3.5 h-3.5 text-accent" />
          <span>System Design Track Roadmap</span>
        </div>
        <h1 className="text-display text-foreground font-sans font-bold tracking-tightest leading-tight">
          System Design & Architecture Progression
        </h1>
        <p className="text-body-editorial text-foreground-muted leading-relaxed font-sans">
          A phased sequence covering networking primitives, caching layers, distributed databases, consensus, and event streaming.
        </p>
      </div>

      {/* Recommended Next Step Callout */}
      <div className="p-6 rounded-xl border border-neutral-800 bg-[#121412] text-[#EDEDEB] space-y-2 shadow-card">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent font-bold">
          <Target className="w-4 h-4" />
          <span>Current Recommended Next Step:</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h4 className="font-semibold text-base text-white font-sans">
              Milestone 01: Client-Server, Networking & Load Balancing
            </h4>
            <p className="text-xs text-neutral-400 mt-0.5">
              Build your baseline understanding of L4 vs L7 routing, TCP, and stateless horizontal scaling.
            </p>
          </div>
          <Link href="/learn/system-design/case-studies/url-shortener">
            <Button
              variant="secondary"
              size="sm"
              className="bg-white text-black hover:bg-neutral-200 border-none font-semibold text-xs shrink-0"
            >
              Start Milestone 01 &rarr;
            </Button>
          </Link>
        </div>
      </div>

      {/* Ordered Milestones List */}
      <div className="space-y-8 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-border">
        {systemDesignRoadmapMilestones.map((m) => (
          <div key={m.id} className="relative pl-12 space-y-4">
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

              {m.prerequisites.length > 0 && (
                <div className="text-xs text-foreground-muted">
                  <span className="font-mono text-foreground-subtle">Prerequisites: </span>
                  {m.prerequisites.join(", ")}
                </div>
              )}

              <div className="pt-2 border-t border-border space-y-2">
                <div className="text-xs font-mono uppercase tracking-wider text-foreground-muted font-bold">
                  Recommended Lessons:
                </div>
                <div className="flex flex-wrap gap-2">
                  {m.recommendedTopics.map((topic, tIdx) => (
                    <Link
                      key={tIdx}
                      href={`/learn/system-design/${topic.slug}`}
                      className="px-3 py-1.5 rounded-lg bg-surface-muted hover:bg-surface border border-border text-xs text-foreground font-medium transition-colors flex items-center gap-1.5 group"
                    >
                      <span>{topic.title}</span>
                      <ArrowRight className="w-3 h-3 text-foreground-muted group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  ))}
                </div>
              </div>

              {m.checkpointProblem && (
                <div className="pt-2 flex items-center justify-between text-xs font-mono bg-surface-muted/60 p-3 rounded-lg border border-border">
                  <span className="text-foreground-muted">Milestone Case Study:</span>
                  <Link
                    href={`/learn/system-design/case-studies/${m.checkpointProblem.slug}`}
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
