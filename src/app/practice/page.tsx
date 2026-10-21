"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { practiceProblems, getProblemBySlug } from "@/content/problems/catalogue";
import { MonacoWorkspace } from "@/components/practice/MonacoWorkspace";
import { SystemDesignStudio } from "@/components/practice/SystemDesignStudio";
import { Badge } from "@/ui/Badge";
import { Button } from "@/ui/Button";
import {
  Search,
  Code2,
  Terminal,
  Filter,
  CheckCircle2,
  Circle,
  ExternalLink,
  ChevronDown,
  Sparkles,
  Layers,
  Cpu,
  Workflow,
  Network,
} from "lucide-react";
import { useProgress } from "@/hooks/useProgress";

function PracticeStudioContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const requestedSlug = searchParams.get("problem");
  const currentTab = searchParams.get("tab") || "system-design";
  const { isProblemSolved } = useProgress();

  const [activeStudioTab, setActiveStudioTab] = useState<"system-design" | "dsa">(
    currentTab === "dsa" ? "dsa" : "system-design"
  );

  const [selectedProblemSlug, setSelectedProblemSlug] = useState<string>(
    requestedSlug || practiceProblems[0].slug
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [statusFilter, setStatusFilter] = useState<"All" | "Solved" | "Unsolved">("All");

  const difficulties = ["All", "Easy", "Medium", "Hard"];
  const currentProblem = getProblemBySlug(selectedProblemSlug) || practiceProblems[0];

  const handleTabChange = (tab: "system-design" | "dsa") => {
    setActiveStudioTab(tab);
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tab);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const filteredProblems = practiceProblems.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDiff = selectedDifficulty === "All" || p.difficulty === selectedDifficulty;
    const matchesCat = selectedCategory === "All" || p.category === selectedCategory;
    const solved = isProblemSolved(p.id);
    const matchesStatus =
      statusFilter === "All" || (statusFilter === "Solved" ? solved : !solved);

    return matchesSearch && matchesDiff && matchesCat && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header & Track Selector */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-border/80">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/30 text-xs font-mono text-accent-text font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Engineering Practice Labs</span>
          </div>
          <h1 className="text-display text-foreground font-sans font-bold tracking-tightest leading-tight">
            {activeStudioTab === "system-design"
              ? "System Design Architecture Studio"
              : "Algorithmic Code Studio"}
          </h1>
          <p className="text-body-editorial text-foreground-muted max-w-2xl leading-relaxed">
            {activeStudioTab === "system-design"
              ? "Compose distributed topologies, balance workloads, eliminate SPOFs, and simulate real traffic spikes directly in your browser."
              : "Write, test, and analyze algorithms against deterministic test suites in our Monaco-powered code sandbox."}
          </p>
        </div>

        {/* Studio Switcher Tabs */}
        <div className="flex items-center p-1.5 rounded-2xl bg-card border border-border shadow-sm self-start lg:self-center">
          <button
            onClick={() => handleTabChange("system-design")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeStudioTab === "system-design"
                ? "bg-foreground text-background shadow-md"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
            }`}
          >
            <Network className="w-4 h-4" />
            <span>System Design Studio</span>
            <span className="ml-1 rounded-full bg-accent/20 px-1.5 py-0.2 text-[10px] font-mono text-accent-text font-bold">
              Simulator
            </span>
          </button>

          <button
            onClick={() => handleTabChange("dsa")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeStudioTab === "dsa"
                ? "bg-foreground text-background shadow-md"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>DSA Code Studio</span>
          </button>
        </div>
      </div>

      {/* RENDER ACTIVE STUDIO */}
      {activeStudioTab === "system-design" ? (
        <SystemDesignStudio />
      ) : (
        /* DSA Code Studio content */
        <div className="space-y-8">
          {/* Problem Quick Selector Strip */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              {/* Search Input */}
              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-foreground-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search problems or patterns..."
                  className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-surface border border-border text-xs text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <div className="flex items-center gap-1 bg-surface p-1 rounded-lg border border-border">
                  {difficulties.map((diff) => (
                    <button
                      key={diff}
                      onClick={() => setSelectedDifficulty(diff)}
                      className={`px-2.5 py-1 rounded-md transition-colors ${
                        selectedDifficulty === diff
                          ? "bg-[#141414] text-white font-bold dark:bg-white dark:text-black"
                          : "text-foreground-muted hover:text-foreground"
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-1 bg-surface p-1 rounded-lg border border-border">
                  {(["All", "Solved", "Unsolved"] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setStatusFilter(st)}
                      className={`px-2.5 py-1 rounded-md transition-colors ${
                        statusFilter === st
                          ? "bg-[#141414] text-white font-bold dark:bg-white dark:text-black"
                          : "text-foreground-muted hover:text-foreground"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Problem Pills Carousel */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {filteredProblems.map((prob) => {
                const isSelected = prob.slug === selectedProblemSlug;
                const solved = isProblemSolved(prob.id);

                return (
                  <button
                    key={prob.id}
                    onClick={() => setSelectedProblemSlug(prob.slug)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs shrink-0 border transition-all ${
                      isSelected
                        ? "bg-[#141414] text-white border-transparent font-semibold shadow-subtle dark:bg-white dark:text-black"
                        : "bg-surface text-foreground border-border hover:border-foreground-muted/60"
                    }`}
                  >
                    {solved ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                    ) : (
                      <Circle className="w-3.5 h-3.5 text-foreground-subtle" />
                    )}
                    <span>{prob.title}</span>
                    <span
                      className={`text-[10px] font-mono px-1 rounded uppercase ${
                        prob.difficulty === "Easy"
                          ? "text-emerald-500"
                          : prob.difficulty === "Medium"
                          ? "text-amber-500"
                          : "text-rose-500"
                      }`}
                    >
                      {prob.difficulty}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Monaco Workspace & Test Runner */}
          <MonacoWorkspace problem={currentProblem} />
        </div>
      )}
    </div>
  );
}

export default function PracticeStudioPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-16 text-center font-mono text-xs text-foreground-muted">
          Loading Practice Studio workspace...
        </div>
      }
    >
      <PracticeStudioContent />
    </Suspense>
  );
}
