"use client";

import React, { useState } from "react";
import Link from "next/link";
import { DSALesson } from "@/types";
import { useProgress } from "@/hooks/useProgress";
import { Button } from "@/ui/Button";
import { Badge } from "@/ui/Badge";
import { CodeBlock } from "./CodeBlock";
import { ReadingProgress } from "./ReadingProgress";
import { BinarySearchVisualizer } from "@/components/dsa/BinarySearchVisualizer";
import { SlidingWindowVisualizer } from "@/components/dsa/SlidingWindowVisualizer";
import { GraphTraversalVisualizer } from "@/components/dsa/GraphTraversalVisualizer";
import {
  Bookmark,
  CheckCircle2,
  Clock,
  ArrowRight,
  ArrowLeft,
  Share2,
  ExternalLink,
  AlertTriangle,
  Lightbulb,
  Cpu,
  Layers,
  HelpCircle,
  Sparkles,
} from "lucide-react";

interface LessonWorkspaceProps {
  lesson: DSALesson;
}

export function LessonWorkspace({ lesson }: LessonWorkspaceProps) {
  const { progress, toggleLessonComplete, toggleBookmark, isLessonCompleted, isBookmarked } =
    useProgress();
  const [selectedLanguageIndex, setSelectedLanguageIndex] = useState(0);

  const completed = isLessonCompleted(lesson.id);
  const bookmarked = isBookmarked(lesson.id);

  const handleToggleComplete = () => {
    toggleLessonComplete(lesson.id);
  };

  const handleToggleBookmark = () => {
    toggleBookmark({
      id: lesson.id,
      title: lesson.title,
      href: `/learn/dsa/algorithms/${lesson.slug}`,
      type: "dsa-lesson",
    });
  };

  return (
    <div className="flex-1 min-w-0 bg-background pb-24">
      <ReadingProgress />

      {/* Breadcrumbs & Metadata Bar */}
      <div className="border-b border-border bg-surface px-6 py-4">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-2 text-foreground-muted">
            <Link href="/learn" className="hover:text-foreground">
              Learn
            </Link>
            <span>/</span>
            <Link href="/learn/dsa" className="hover:text-foreground">
              DSA
            </Link>
            <span>/</span>
            <span className="text-foreground font-semibold truncate max-w-[200px] sm:max-w-none">
              {lesson.topicTitle}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleBookmark}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-sans transition-colors ${
                bookmarked
                  ? "bg-accent/20 border-accent/40 text-[#1B3604] font-semibold dark:bg-accent/15 dark:text-accent"
                  : "bg-surface text-foreground-muted border-border hover:text-foreground hover:bg-surface-muted"
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? "fill-current" : ""}`} />
              <span>{bookmarked ? "Bookmarked" : "Bookmark"}</span>
            </button>

            <button
              onClick={handleToggleComplete}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md border text-xs font-sans font-semibold transition-all ${
                completed
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-subtle"
                  : "bg-[#141414] text-white border-transparent hover:bg-neutral-800 dark:bg-white dark:text-black"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{completed ? "Completed" : "Mark as Complete"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Reading Container */}
      <div className="max-w-4xl mx-auto px-6 pt-10 space-y-12">
        {/* Title & Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant={lesson.level === "Beginner" ? "easy" : lesson.level === "Intermediate" ? "medium" : "hard"}>
              {lesson.level}
            </Badge>
            <div className="flex items-center gap-1.5 text-xs text-foreground-muted font-mono">
              <Clock className="w-3.5 h-3.5" />
              <span>{lesson.estimatedMinutes} mins read & practice</span>
            </div>
          </div>

          <h1 className="text-display text-foreground font-sans font-bold tracking-tightest leading-tight">
            {lesson.title}
          </h1>

          <p className="text-body-editorial text-foreground-muted leading-relaxed font-sans">
            {lesson.subtitle}
          </p>
        </div>

        {/* Prerequisites */}
        {lesson.prerequisites.length > 0 && (
          <div className="p-4 rounded-xl bg-surface-muted border border-border space-y-1.5">
            <div className="text-xs font-mono uppercase tracking-wider text-foreground-subtle font-semibold">
              Prerequisites & Foundation Knowledge:
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-sans">
              {lesson.prerequisites.map((p, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-surface border border-border text-foreground font-medium"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* 1. What Problem Does This Concept Solve? */}
        <section className="space-y-4 pt-2">
          <h2 className="text-title-2 text-foreground font-sans font-semibold flex items-center gap-2">
            <span className="text-accent-text font-mono text-base">01.</span>
            What problem does this concept solve?
          </h2>
          <div className="p-5 rounded-xl bg-surface border border-border shadow-subtle text-foreground leading-relaxed text-sm sm:text-base font-sans">
            {lesson.problemSolved}
          </div>
        </section>

        {/* 2. Intuition in Plain English */}
        <section className="space-y-4">
          <h2 className="text-title-2 text-foreground font-sans font-semibold flex items-center gap-2">
            <span className="text-accent-text font-mono text-base">02.</span>
            Intuition in plain English
          </h2>
          <div className="p-5 rounded-xl bg-surface border border-border shadow-subtle text-foreground leading-relaxed text-sm sm:text-base font-sans space-y-3">
            <p>{lesson.intuition}</p>
          </div>
        </section>

        {/* 3. Step-by-Step Explanation */}
        <section className="space-y-4">
          <h2 className="text-title-2 text-foreground font-sans font-semibold flex items-center gap-2">
            <span className="text-accent-text font-mono text-base">03.</span>
            Step-by-step mechanism
          </h2>
          <div className="space-y-3">
            {lesson.mechanismSteps.map((step) => (
              <div
                key={step.step}
                className="flex items-start gap-4 p-4 rounded-xl bg-surface border border-border shadow-subtle text-sm"
              >
                <div className="w-7 h-7 rounded-lg bg-[#141414] text-white flex items-center justify-center font-mono font-bold text-xs shrink-0 dark:bg-white dark:text-black">
                  {step.step}
                </div>
                <div className="space-y-1">
                  <h4 className="font-semibold text-foreground">{step.title}</h4>
                  <p className="text-foreground-muted leading-relaxed font-sans">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Interactive Visualization */}
        {lesson.visualizationType && (
          <section className="space-y-4">
            <h2 className="text-title-2 text-foreground font-sans font-semibold flex items-center gap-2">
              <span className="text-accent-text font-mono text-base">04.</span>
              Interactive state visualizer
            </h2>
            {lesson.visualizationType === "binary-search" && <BinarySearchVisualizer />}
            {lesson.visualizationType === "sliding-window" && <SlidingWindowVisualizer />}
            {lesson.visualizationType === "graph-traversal" && <GraphTraversalVisualizer />}
          </section>
        )}

        {/* 5. A Worked Example */}
        <section className="space-y-4">
          <h2 className="text-title-2 text-foreground font-sans font-semibold flex items-center gap-2">
            <span className="text-accent-text font-mono text-base">05.</span>
            Worked example trace
          </h2>
          <div className="p-6 rounded-xl bg-surface border border-border shadow-subtle space-y-4 text-sm font-sans">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-foreground-muted font-bold">
                Problem Statement:
              </div>
              <p className="text-foreground font-medium mt-1">
                {lesson.workedExample.problemStatement}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 bg-surface-muted rounded-lg font-mono text-xs border border-border">
                <span className="text-foreground-muted block mb-1">Input:</span>
                <span className="text-foreground font-bold">{lesson.workedExample.input}</span>
              </div>
              <div className="p-3 bg-surface-muted rounded-lg font-mono text-xs border border-border">
                <span className="text-foreground-muted block mb-1">Output:</span>
                <span className="text-accent-text font-bold">{lesson.workedExample.output}</span>
              </div>
            </div>

            <div className="pt-2">
              <div className="text-xs font-mono uppercase tracking-wider text-foreground-muted font-bold mb-1">
                Execution Walkthrough:
              </div>
              <p className="text-foreground-muted leading-relaxed">
                {lesson.workedExample.explanation}
              </p>
            </div>
          </div>
        </section>

        {/* 6. Pseudocode */}
        <section className="space-y-4">
          <h2 className="text-title-2 text-foreground font-sans font-semibold flex items-center gap-2">
            <span className="text-accent-text font-mono text-base">06.</span>
            Algorithmic pseudocode
          </h2>
          <CodeBlock code={lesson.pseudocode} language="pseudocode" />
        </section>

        {/* 7. Code Implementations */}
        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-title-2 text-foreground font-sans font-semibold flex items-center gap-2">
              <span className="text-accent-text font-mono text-base">07.</span>
              Production implementations
            </h2>

            {/* Language tabs */}
            <div className="flex items-center gap-1.5 p-1 rounded-lg bg-surface-muted border border-border text-xs font-mono">
              {lesson.codeImplementations.map((impl, idx) => (
                <button
                  key={impl.language}
                  onClick={() => setSelectedLanguageIndex(idx)}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    idx === selectedLanguageIndex
                      ? "bg-surface text-foreground font-bold shadow-subtle"
                      : "text-foreground-muted hover:text-foreground"
                  }`}
                >
                  {impl.language}
                </button>
              ))}
            </div>
          </div>

          <CodeBlock
            code={lesson.codeImplementations[selectedLanguageIndex]?.code || ""}
            language={lesson.codeImplementations[selectedLanguageIndex]?.language.toLowerCase()}
          />
        </section>

        {/* 8. Complexity Analysis */}
        <section className="space-y-4">
          <h2 className="text-title-2 text-foreground font-sans font-semibold flex items-center gap-2">
            <span className="text-accent-text font-mono text-base">08.</span>
            Complexity & hardware bounds
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-surface border border-border shadow-subtle space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-foreground-muted font-bold">
                  Time Complexity
                </span>
                <span className="text-sm font-mono font-bold px-2 py-0.5 rounded bg-accent/20 text-[#1B3604]">
                  {lesson.complexity.time}
                </span>
              </div>
              <p className="text-xs text-foreground-muted leading-relaxed font-sans">
                {lesson.complexity.timeExplanation}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-surface border border-border shadow-subtle space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-foreground-muted font-bold">
                  Space Complexity
                </span>
                <span className="text-sm font-mono font-bold px-2 py-0.5 rounded bg-surface-muted text-foreground">
                  {lesson.complexity.space}
                </span>
              </div>
              <p className="text-xs text-foreground-muted leading-relaxed font-sans">
                {lesson.complexity.spaceExplanation}
              </p>
            </div>
          </div>
        </section>

        {/* 9. Common Mistakes */}
        <section className="space-y-4">
          <h2 className="text-title-2 text-foreground font-sans font-semibold flex items-center gap-2">
            <span className="text-accent-text font-mono text-base">09.</span>
            Common pitfalls & off-by-one errors
          </h2>
          <div className="space-y-2.5">
            {lesson.commonMistakes.map((mistake, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 rounded-xl bg-rose-500/5 border border-rose-500/20 text-xs sm:text-sm text-foreground"
              >
                <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed font-sans">{mistake}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 10. Practice Problems */}
        <section className="space-y-4">
          <h2 className="text-title-2 text-foreground font-sans font-semibold flex items-center gap-2">
            <span className="text-accent-text font-mono text-base">10.</span>
            Recommended practice problems
          </h2>
          <div className="divide-y divide-border rounded-xl border border-border bg-surface overflow-hidden">
            {lesson.practiceProblems.map((prob, idx) => (
              <div key={idx} className="p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-foreground-muted font-bold">0{idx + 1}</span>
                  <div>
                    <h5 className="font-semibold text-sm text-foreground">{prob.title}</h5>
                    <span className="text-xs font-mono text-foreground-muted">{prob.platform}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge variant={prob.difficulty === "Easy" ? "easy" : prob.difficulty === "Medium" ? "medium" : "hard"}>
                    {prob.difficulty}
                  </Badge>
                  <a
                    href={prob.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg hover:bg-surface-muted text-foreground-muted hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 11. Interview Insights & 12. Key Takeaways */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="p-6 rounded-xl bg-surface border border-border shadow-subtle space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground font-sans">
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Interview Insights</span>
            </div>
            <ul className="space-y-2 text-xs text-foreground-muted leading-relaxed">
              {lesson.interviewInsights.map((insight, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-accent-text font-bold">&bull;</span>
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-xl bg-surface border border-border shadow-subtle space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground font-sans">
              <Sparkles className="w-4 h-4 text-accent-text" />
              <span>Key Takeaways</span>
            </div>
            <ul className="space-y-2 text-xs text-foreground-muted leading-relaxed">
              {lesson.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Lesson Bottom Completion & Next Lesson */}
        <div className="pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={handleToggleComplete}
            className={`w-full sm:w-auto px-6 py-3 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
              completed
                ? "bg-emerald-600 text-white shadow-subtle"
                : "bg-accent text-[#141414] hover:bg-accent-hover shadow-card"
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{completed ? "Lesson Completed!" : "Complete & Mark Retained"}</span>
          </button>

          <Link href="/practice">
            <Button variant="secondary" size="md" className="w-full sm:w-auto text-xs font-semibold">
              <span>Go to Practice Studio</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
