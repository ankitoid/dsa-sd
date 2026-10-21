import React from "react";
import Link from "next/link";
import { practiceProblems } from "@/content/problems/catalogue";
import { ArrowRight, Code2, ExternalLink, Terminal } from "lucide-react";
import { Button } from "@/ui/Button";
import { Badge } from "@/ui/Badge";

export function PracticePreview() {
  return (
    <section className="py-20 md:py-28 border-b border-border/80 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-foreground-muted font-semibold uppercase tracking-wider">
              <Code2 className="w-4 h-4 text-purple-600" />
              <span>Integrated Practice Studio</span>
            </div>
            <h2 className="text-title-1 text-foreground font-sans tracking-tight">
              Test your solutions with real test-case runners.
            </h2>
            <p className="text-foreground-muted text-base leading-relaxed">
              Solve algorithmic challenges directly inside our Monaco editor workspace or bridge your progress with LeetCode and GeeksforGeeks.
            </p>
          </div>

          <Link href="/practice">
            <Button variant="accent" size="md" className="group text-xs font-semibold">
              <span>Open Code Practice Studio</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Problems List Snapshot */}
        <div className="rounded-2xl border border-border bg-background p-6 shadow-subtle space-y-4">
          <div className="flex items-center justify-between text-xs font-mono text-foreground-muted pb-2 border-b border-border">
            <span>CURATED PROBLEM SETS</span>
            <span>SHOWING {practiceProblems.length} EXERCISES</span>
          </div>

          <div className="divide-y divide-border">
            {practiceProblems.map((prob) => (
              <div
                key={prob.id}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
              >
                <div className="flex items-start sm:items-center gap-3">
                  <Terminal className="w-4 h-4 text-foreground-muted group-hover:text-accent-text transition-colors mt-0.5 sm:mt-0" />
                  <div>
                    <Link
                      href={`/practice?problem=${prob.slug}`}
                      className="font-semibold text-sm text-foreground hover:text-accent-text transition-colors flex items-center gap-2"
                    >
                      <span>{prob.title}</span>
                      {prob.isLocalExecutable && (
                        <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/10 text-emerald-700 border border-emerald-500/30">
                          Local Runner
                        </span>
                      )}
                    </Link>
                    <div className="text-xs text-foreground-muted font-mono mt-0.5">
                      {prob.category} &middot; Acceptance: {prob.acceptanceRate}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <Badge
                    variant={
                      prob.difficulty === "Easy"
                        ? "easy"
                        : prob.difficulty === "Medium"
                        ? "medium"
                        : "hard"
                    }
                  >
                    {prob.difficulty}
                  </Badge>

                  {prob.externalUrl && (
                    <a
                      href={prob.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-mono text-foreground-muted hover:text-foreground flex items-center gap-1 border border-border px-2 py-1 rounded bg-surface hover:bg-surface-muted transition-colors"
                      title="Open external problem (opens in new tab)"
                    >
                      <span>{prob.externalPlatform}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                  <Link href={`/practice?problem=${prob.slug}`}>
                    <Button size="sm" variant="outline" className="text-xs">
                      Solve
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 text-[11px] font-mono text-foreground-subtle text-center">
            * DevMastery is an independent educational platform. External problem trademarks belong to their respective owners.
          </div>
        </div>
      </div>
    </section>
  );
}
