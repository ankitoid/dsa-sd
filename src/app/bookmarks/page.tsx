"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useProgress } from "@/hooks/useProgress";
import { Badge } from "@/ui/Badge";
import { Button } from "@/ui/Button";
import { Bookmark, Trash2, ArrowRight, BookOpen, Code2, Layers } from "lucide-react";

export default function BookmarksPage() {
  const { progress, toggleBookmark } = useProgress();
  const [filterType, setFilterType] = useState<string>("All");

  const filteredItems = progress.bookmarkedItems.filter((item) => {
    if (filterType === "All") return true;
    if (filterType === "DSA") return item.type === "dsa-lesson";
    if (filterType === "System Design") return item.type === "sd-case-study";
    if (filterType === "Practice") return item.type === "problem";
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-border">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-mono text-foreground-muted">
            <Bookmark className="w-3.5 h-3.5 text-amber-500 fill-current" />
            <span>Saved Engineering Content</span>
          </div>
          <h1 className="text-display text-foreground font-sans font-bold tracking-tight">
            Bookmarked Lessons & Problems
          </h1>
          <p className="text-sm text-foreground-muted">
            Quick reference library for key algorithms and architecture blueprints.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 bg-surface p-1 rounded-lg border border-border text-xs">
          {["All", "DSA", "System Design", "Practice"].map((f) => (
            <button
              key={f}
              onClick={() => setFilterType(f)}
              className={`px-3 py-1 rounded-md transition-colors ${
                filterType === f
                  ? "bg-[#141414] text-white font-bold dark:bg-white dark:text-black"
                  : "text-foreground-muted hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {filteredItems.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-dashed border-border bg-surface space-y-4">
          <Bookmark className="w-8 h-8 text-foreground-subtle mx-auto" />
          <h3 className="font-semibold text-foreground">No bookmarked items found</h3>
          <p className="text-xs text-foreground-muted max-w-sm mx-auto">
            Click the bookmark icon on any DSA lesson or System Design case study to save it here for quick access.
          </p>
          <Link href="/learn">
            <Button variant="accent" size="sm">
              Explore Curriculum &rarr;
            </Button>
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-border rounded-xl border border-border bg-surface overflow-hidden shadow-subtle">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-surface-muted/40 transition-colors group"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded uppercase bg-surface-muted text-foreground-muted border border-border">
                    {item.type}
                  </span>
                  <span className="text-[11px] font-mono text-foreground-subtle">
                    Added {item.dateAdded}
                  </span>
                </div>
                <Link
                  href={item.href}
                  className="font-semibold text-base text-foreground group-hover:text-accent-text transition-colors block"
                >
                  {item.title}
                </Link>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-center">
                <Link href={item.href}>
                  <Button size="sm" variant="outline" className="text-xs">
                    <span>Open</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>

                <button
                  onClick={() => toggleBookmark(item)}
                  className="p-2 text-foreground-muted hover:text-rose-500 rounded hover:bg-surface-muted transition-colors"
                  title="Remove Bookmark"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
