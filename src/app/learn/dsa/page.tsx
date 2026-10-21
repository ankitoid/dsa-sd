import React from "react";
import Link from "next/link";
import { dsaTopics } from "@/content/dsa/curriculum";
import { Badge } from "@/ui/Badge";
import { Button } from "@/ui/Button";
import { ArrowRight, Binary, Clock, BookOpen, Layers } from "lucide-react";

export default function DSACurriculumPage() {
  const categories = ["Fundamentals", "Data Structures", "Algorithms"] as const;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/40 text-xs font-mono text-[#1B3604] font-semibold">
          <Binary className="w-3.5 h-3.5" />
          <span>Algorithms & Data Structures Curriculum</span>
        </div>
        <h1 className="text-display text-foreground font-sans font-bold tracking-tightest leading-tight">
          21 Core Modules. Logarithmic rigor.
        </h1>
        <p className="text-body-editorial text-foreground-muted leading-relaxed font-sans">
          Structured sequentially across Complexity Fundamentals, Contiguous Memory, Pointer Graphs, and Advanced Dynamic Programming.
        </p>
      </div>

      {/* Modules grouped by category */}
      <div className="space-y-14">
        {categories.map((category) => {
          const categoryTopics = dsaTopics.filter((t) => t.category === category);
          return (
            <div key={category} className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <h2 className="text-title-2 text-foreground font-semibold flex items-center gap-2">
                  <span>{category}</span>
                  <span className="text-xs font-mono text-foreground-muted font-normal">
                    ({categoryTopics.length} modules)
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryTopics.map((topic) => (
                  <Link
                    key={topic.id}
                    href={`/learn/dsa/algorithms/${topic.slug}`}
                    className="p-6 rounded-xl border border-border bg-surface shadow-subtle hover:shadow-card hover:-translate-y-0.5 transition-all flex flex-col justify-between group"
                  >
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge
                          variant={
                            topic.level === "Beginner"
                              ? "easy"
                              : topic.level === "Intermediate"
                              ? "medium"
                              : "hard"
                          }
                        >
                          {topic.level}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-foreground-muted font-mono">
                          <Clock className="w-3 h-3" />
                          <span>{topic.duration}</span>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold text-base text-foreground group-hover:text-accent-text transition-colors">
                          {topic.title}
                        </h3>
                        <p className="text-xs text-foreground-muted mt-2 leading-relaxed line-clamp-3">
                          {topic.description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-border flex items-center justify-between text-xs font-medium text-foreground">
                      <span className="font-mono text-foreground-muted">
                        {topic.lessonCount} lessons
                      </span>
                      <span className="flex items-center gap-1 group-hover:text-accent-text transition-colors">
                        Study module
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
