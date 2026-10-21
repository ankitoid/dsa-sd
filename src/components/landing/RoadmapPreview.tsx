import React from "react";
import Link from "next/link";
import { dsaRoadmapMilestones } from "@/content/roadmaps/dsa-roadmap";
import { ArrowRight, CheckCircle2, MapPin, Milestone } from "lucide-react";
import { Button } from "@/ui/Button";

export function RoadmapPreview() {
  return (
    <section className="py-20 md:py-28 border-b border-border/80 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-foreground-muted font-semibold uppercase tracking-wider">
              <Milestone className="w-4 h-4 text-amber-600" />
              <span>Structured Engineering Progressions</span>
            </div>
            <h2 className="text-title-1 text-foreground font-sans tracking-tight">
              A sequenced path from fundamentals to FAANG mastery.
            </h2>
            <p className="text-foreground-muted text-base leading-relaxed">
              No scattered tutorials or random problem chasing. Follow a battle-tested milestone curriculum with prerequisites, checkpoints, and spaced-retention gates.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/roadmaps/dsa">
              <Button variant="secondary" size="md" className="text-xs font-semibold">
                DSA Roadmap
              </Button>
            </Link>
            <Link href="/roadmaps/system-design">
              <Button variant="outline" size="md" className="text-xs font-semibold">
                System Design Roadmap
              </Button>
            </Link>
          </div>
        </div>

        {/* Milestone Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dsaRoadmapMilestones.slice(0, 4).map((milestone) => (
            <div
              key={milestone.id}
              className="rounded-xl border border-border bg-surface p-6 flex flex-col justify-between shadow-subtle hover:shadow-card transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="px-2 py-0.5 rounded bg-surface-muted text-foreground font-bold">
                    Milestone 0{milestone.step}
                  </span>
                  <span className="text-foreground-muted">{milestone.duration}</span>
                </div>

                <div className="space-y-1">
                  <h4 className="font-semibold text-base text-foreground font-sans">
                    {milestone.title}
                  </h4>
                  <p className="text-xs text-foreground-muted leading-relaxed line-clamp-3">
                    {milestone.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-border">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-foreground-subtle font-semibold">
                    Core Topics:
                  </div>
                  <ul className="space-y-1 text-xs text-foreground">
                    {milestone.recommendedTopics.slice(0, 2).map((t, idx) => (
                      <li key={idx} className="flex items-center gap-1.5 truncate">
                        <span className="h-1 w-1 rounded-full bg-accent inline-block shrink-0" />
                        <span className="truncate">{t.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {milestone.checkpointProblem && (
                <div className="pt-4 mt-4 border-t border-border">
                  <Link
                    href={`/practice?problem=${milestone.checkpointProblem.slug}`}
                    className="flex items-center justify-between text-xs font-medium text-foreground hover:text-accent-text group"
                  >
                    <span className="truncate">Checkpoint: {milestone.checkpointProblem.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 shrink-0 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
