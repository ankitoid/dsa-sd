"use client";

import React from "react";
import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";
import { Badge } from "@/ui/Badge";
import { Button } from "@/ui/Button";
import {
  LayoutDashboard,
  Clock,
  Flame,
  CheckCircle2,
  Bookmark,
  ArrowRight,
  RotateCcw,
  Sparkles,
  Binary,
  Layers,
  BarChart3,
  Calendar,
  Compass,
} from "lucide-react";

export default function DashboardPage() {
  const { progress } = useProgress();

  const dsaCompletedCount = progress.completedLessons.length;
  const problemsSolvedCount = progress.solvedProblems.length;
  const dsaPercent = Math.min(100, Math.round((dsaCompletedCount / 21) * 100));
  const sdPercent = 25; // URL Shortener & Rate Limiter foundational progress

  // Mock days of the week activity
  const weekDays = [
    { day: "Mon", minutes: 45, goalMet: true },
    { day: "Tue", minutes: 60, goalMet: true },
    { day: "Wed", minutes: 30, goalMet: false },
    { day: "Thu", minutes: 50, goalMet: true },
    { day: "Fri", minutes: 40, goalMet: true },
    { day: "Sat", minutes: 75, goalMet: true },
    { day: "Sun", minutes: progress.minutesSpentToday, goalMet: progress.minutesSpentToday >= progress.dailyGoalMinutes },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Top Banner / Greeting */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-border">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2 py-0.5 rounded bg-surface-muted border border-border text-foreground-muted">
              Demo Engineer Profile
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
          </div>
          <h1 className="text-display text-foreground font-sans font-bold tracking-tightest leading-tight">
            Welcome back, Alex.
          </h1>
          <p className="text-body-editorial text-foreground-muted leading-relaxed font-sans">
            You&apos;re on a {progress.streakDays}-day learning streak. Keep your algorithmic intuition sharp.
          </p>
        </div>

        {/* Continue Learning CTA */}
        <Link href="/learn/dsa/algorithms/binary-search">
          <Button variant="accent" size="lg" className="font-semibold text-xs shadow-card group">
            <span>Continue where you left off</span>
            <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Daily Goal */}
        <div className="p-6 rounded-xl border border-border bg-surface shadow-subtle space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-foreground-muted font-bold">
              Daily Goal
            </span>
            <Clock className="w-4 h-4 text-blue-500" />
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold font-mono text-foreground">
              {progress.minutesSpentToday} / {progress.dailyGoalMinutes} <span className="text-sm font-normal text-foreground-muted">min</span>
            </div>
            <div className="w-full bg-surface-muted h-2 rounded-full overflow-hidden">
              <div
                className="bg-accent h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (progress.minutesSpentToday / progress.dailyGoalMinutes) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Learning Streak */}
        <div className="p-6 rounded-xl border border-border bg-surface shadow-subtle space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-foreground-muted font-bold">
              Active Streak
            </span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-foreground">
              {progress.streakDays} Days
            </div>
            <p className="text-xs text-foreground-muted mt-1">Top 5% of consistent learners</p>
          </div>
        </div>

        {/* DSA Track Progress */}
        <div className="p-6 rounded-xl border border-border bg-surface shadow-subtle space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-foreground-muted font-bold">
              DSA Track
            </span>
            <Binary className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold font-mono text-foreground">
              {dsaCompletedCount} / 21 <span className="text-sm font-normal text-foreground-muted">Modules</span>
            </div>
            <div className="w-full bg-surface-muted h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-full rounded-full"
                style={{ width: `${dsaPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Practice Exercises Solved */}
        <div className="p-6 rounded-xl border border-border bg-surface shadow-subtle space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-foreground-muted font-bold">
              Problems Solved
            </span>
            <CheckCircle2 className="w-4 h-4 text-purple-500" />
          </div>
          <div>
            <div className="text-2xl font-bold font-mono text-foreground">
              {problemsSolvedCount} Solved
            </div>
            <p className="text-xs text-foreground-muted mt-1">Verified with local test runner</p>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column (8 cols): Activity Chart & Recommended Next */}
        <div className="lg:col-span-8 space-y-8">
          {/* Weekly Activity Visualization */}
          <div className="p-6 sm:p-7 rounded-2xl border border-border bg-surface shadow-subtle space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-base text-foreground font-sans">
                  Weekly Study Activity
                </h3>
                <p className="text-xs text-foreground-muted mt-0.5">
                  Minutes engaged with interactive visualizers and coding exercises.
                </p>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-mono text-foreground-muted">
                <Calendar className="w-3.5 h-3.5" />
                <span>Past 7 Days</span>
              </div>
            </div>

            {/* Bar Chart */}
            <div className="grid grid-cols-7 gap-3 sm:gap-4 items-end h-40 pt-4">
              {weekDays.map((d, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end">
                  <span className="text-[11px] font-mono text-foreground-muted">{d.minutes}m</span>
                  <div className="w-full max-w-[42px] bg-surface-muted rounded-t-md relative flex items-end h-28 overflow-hidden">
                    <div
                      className={`w-full transition-all duration-500 ${
                        d.goalMet ? "bg-accent" : "bg-neutral-300 dark:bg-neutral-700"
                      }`}
                      style={{ height: `${Math.min(100, (d.minutes / 75) * 100)}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono font-medium text-foreground">{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Continue & Recommended Next Lessons */}
          <div className="p-6 sm:p-7 rounded-2xl border border-border bg-surface shadow-subtle space-y-5">
            <h3 className="font-semibold text-base text-foreground font-sans">
              Recommended Next Lessons
            </h3>

            <div className="space-y-3">
              <Link
                href="/learn/dsa/algorithms/sliding-window"
                className="p-4 rounded-xl border border-border bg-surface-muted/50 hover:bg-surface-muted transition-colors flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-lg bg-surface border border-border text-foreground">
                    <Binary className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground group-hover:text-accent-text transition-colors">
                      Sliding Window: Amortized Linear Subarrays
                    </h4>
                    <p className="text-xs text-foreground-muted mt-0.5">
                      Recommended based on your completion of Two Pointers and Binary Search.
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-foreground-muted group-hover:translate-x-1 group-hover:text-foreground transition-all shrink-0" />
              </Link>

              <Link
                href="/learn/system-design/case-studies/url-shortener"
                className="p-4 rounded-xl border border-border bg-surface-muted/50 hover:bg-surface-muted transition-colors flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-lg bg-surface border border-border text-foreground">
                    <Layers className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-foreground group-hover:text-accent-text transition-colors">
                      URL Shortener (TinyURL) Architecture (11.5k QPS)
                    </h4>
                    <p className="text-xs text-foreground-muted mt-0.5">
                      Explore cache hierarchies, Anycast routing, and Key Generation Services.
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-foreground-muted group-hover:translate-x-1 group-hover:text-foreground transition-all shrink-0" />
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Revision Queue & Saved Items */}
        <div className="lg:col-span-4 space-y-6">
          {/* Revision Queue */}
          <div className="p-6 rounded-2xl border border-border bg-surface shadow-subtle space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <RotateCcw className="w-4 h-4 text-accent-text" />
                <h3 className="font-semibold text-sm text-foreground">Spaced Revision Queue</h3>
              </div>
              <span className="text-[11px] font-mono text-foreground-muted">
                {progress.revisionQueue.length} Due
              </span>
            </div>

            <div className="space-y-3">
              {progress.revisionQueue.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="block p-3 rounded-lg bg-surface-muted border border-border hover:border-foreground-muted/60 transition-colors"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                    <span className="text-accent-text font-bold">{item.nextReviewDate}</span>
                    <span className="text-foreground-muted">{item.intervalDays}d interval</span>
                  </div>
                  <h5 className="font-semibold text-xs text-foreground">{item.title}</h5>
                  <p className="text-[11px] text-foreground-muted mt-1 line-clamp-1">{item.reason}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Bookmarked Questions & Lessons */}
          <div className="p-6 rounded-2xl border border-border bg-surface shadow-subtle space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-amber-500 fill-current" />
                <h3 className="font-semibold text-sm text-foreground">Saved Items</h3>
              </div>
              <Link href="/bookmarks" className="text-xs text-accent-text hover:underline">
                View all &rarr;
              </Link>
            </div>

            <div className="space-y-2.5">
              {progress.bookmarkedItems.map((bm) => (
                <Link
                  key={bm.id}
                  href={bm.href}
                  className="flex items-center justify-between p-2.5 rounded-lg hover:bg-surface-muted transition-colors text-xs group"
                >
                  <span className="font-medium text-foreground truncate pr-2 group-hover:text-accent-text">
                    {bm.title}
                  </span>
                  <span className="text-[10px] font-mono text-foreground-muted shrink-0">
                    {bm.type}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
