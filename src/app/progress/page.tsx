"use client";

import React from "react";
import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";
import { dsaTopics } from "@/content/dsa/curriculum";
import { systemDesignTopics } from "@/content/system-design/curriculum";
import { Badge } from "@/ui/Badge";
import { Button } from "@/ui/Button";
import {
  BarChart3,
  Binary,
  CheckCircle2,
  Clock,
  Flame,
  Layers,
  Sparkles,
  TrendingUp,
} from "lucide-react";

export default function ProgressPage() {
  const { progress } = useProgress();

  const totalDsaModules = dsaTopics.length;
  const completedDsa = progress.completedLessons.length;
  const dsaPercent = Math.round((completedDsa / totalDsaModules) * 100);

  const totalSdTopics = systemDesignTopics.length;
  const completedSd = 2; // Demo completed case studies
  const sdPercent = Math.round((completedSd / totalSdTopics) * 100);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="space-y-3 pb-6 border-b border-border">
        <div className="inline-flex items-center gap-2 text-xs font-mono text-foreground-muted font-semibold uppercase tracking-wider">
          <BarChart3 className="w-4 h-4 text-accent-text" />
          <span>Learning Analytics & Mastery Metrics</span>
        </div>
        <h1 className="text-display text-foreground font-sans font-bold tracking-tight">
          Your Engineering Trajectory
        </h1>
        <p className="text-body-editorial text-foreground-muted leading-relaxed">
          Quantitative tracking across algorithmic problem solving and distributed system design.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl border border-border bg-surface shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-foreground-muted uppercase">
            <span>Overall Completion</span>
            <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-3xl font-mono font-bold text-foreground">
            {Math.round((dsaPercent + sdPercent) / 2)}%
          </div>
          <p className="text-xs text-foreground-muted">Paced for interview readiness in 8 weeks</p>
        </div>

        <div className="p-6 rounded-xl border border-border bg-surface shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-foreground-muted uppercase">
            <span>Study Consistency</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-mono font-bold text-foreground">
            {progress.streakDays} Day Streak
          </div>
          <p className="text-xs text-foreground-muted">Consistency beats cramming</p>
        </div>

        <div className="p-6 rounded-xl border border-border bg-surface shadow-subtle space-y-2">
          <div className="flex items-center justify-between text-xs font-mono text-foreground-muted uppercase">
            <span>Verified Exercises</span>
            <CheckCircle2 className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-3xl font-mono font-bold text-foreground">
            {progress.solvedProblems.length} Passed
          </div>
          <p className="text-xs text-foreground-muted">Automated test suites passed</p>
        </div>
      </div>

      {/* Track Mastery Breakdown */}
      <div className="space-y-6">
        <h3 className="font-semibold text-lg text-foreground">Curriculum Track Breakdown</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* DSA */}
          <div className="p-6 rounded-xl border border-border bg-surface shadow-subtle space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Binary className="w-5 h-5 text-emerald-600" />
                <h4 className="font-semibold text-foreground">Data Structures & Algorithms</h4>
              </div>
              <span className="font-mono text-xs font-bold text-foreground">{dsaPercent}%</span>
            </div>
            <div className="w-full bg-surface-muted h-2.5 rounded-full overflow-hidden">
              <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${dsaPercent}%` }} />
            </div>
            <div className="flex items-center justify-between text-xs font-mono text-foreground-muted">
              <span>{completedDsa} of {totalDsaModules} modules completed</span>
              <Link href="/learn/dsa" className="text-accent-text hover:underline">
                Continue DSA &rarr;
              </Link>
            </div>
          </div>

          {/* System Design */}
          <div className="p-6 rounded-xl border border-border bg-surface shadow-subtle space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Layers className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-foreground">System Design & Scale</h4>
              </div>
              <span className="font-mono text-xs font-bold text-foreground">{sdPercent}%</span>
            </div>
            <div className="w-full bg-surface-muted h-2.5 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-full rounded-full" style={{ width: `${sdPercent}%` }} />
            </div>
            <div className="flex items-center justify-between text-xs font-mono text-foreground-muted">
              <span>{completedSd} of {totalSdTopics} topics completed</span>
              <Link href="/learn/system-design" className="text-accent-text hover:underline">
                Continue System Design &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
