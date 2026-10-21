"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { dsaTopics } from "@/content/dsa/curriculum";
import { Search, ChevronDown, ChevronRight, Binary, CheckCircle2, Bookmark, BookOpen, Layers } from "lucide-react";
import { useProgress } from "@/hooks/useProgress";

interface LessonSidebarProps {
  currentSlug?: string;
}

export function LessonSidebar({ currentSlug }: LessonSidebarProps) {
  const pathname = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const { isLessonCompleted } = useProgress();

  const categories = ["Fundamentals", "Data Structures", "Algorithms"] as const;

  const filteredTopics = dsaTopics.filter((t) =>
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <aside className="w-full lg:w-72 xl:w-80 shrink-0 border-r border-border bg-surface lg:h-[calc(100vh-4rem)] lg:sticky lg:top-16 flex flex-col">
      {/* Mobile Toggle Button (Visible only on mobile/tablet < lg) */}
      <div className="lg:hidden border-b border-border bg-surface p-3 flex items-center justify-between">
        <button
          onClick={() => setMobileExpanded(!mobileExpanded)}
          className="flex items-center justify-between w-full p-2 rounded-lg bg-surface-muted border border-border text-xs font-semibold text-foreground"
        >
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-accent-text" />
            <span>Curriculum Modules ({dsaTopics.length} Topics)</span>
          </div>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              mobileExpanded ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* Main Drawer / Desktop Sidebar */}
      <div
        className={`${
          mobileExpanded ? "block" : "hidden"
        } lg:flex lg:flex-col lg:flex-1 overflow-hidden`}
      >
        {/* Search Header */}
        <div className="p-4 border-b border-border bg-surface">
          <div className="relative">
            <Search className="w-4 h-4 text-foreground-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search 21 DSA modules..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-surface-muted border border-border text-xs text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-1 focus:ring-accent"
            />
          </div>
        </div>

        {/* Nav List grouped by category */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 max-h-[60vh] lg:max-h-none">
          {categories.map((category) => {
            const categoryTopics = filteredTopics.filter((t) => t.category === category);
            if (categoryTopics.length === 0) return null;

            return (
              <div key={category} className="space-y-2">
                <div className="text-[11px] font-mono uppercase tracking-wider text-foreground-muted font-bold px-2">
                  {category} ({categoryTopics.length})
                </div>

                <div className="space-y-1">
                  {categoryTopics.map((topic) => {
                    const isActive =
                      pathname === `/learn/dsa/${topic.slug}` ||
                      pathname === `/learn/dsa/algorithms/${topic.slug}` ||
                      currentSlug === topic.slug;

                    const completed = isLessonCompleted(`dsa-${topic.slug}`);

                    return (
                      <Link
                        key={topic.id}
                        href={`/learn/dsa/algorithms/${topic.slug}`}
                        onClick={() => setMobileExpanded(false)}
                        className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors group ${
                          isActive
                            ? "bg-[#141414] text-white font-semibold shadow-subtle dark:bg-white dark:text-black"
                            : "text-foreground-muted hover:text-foreground hover:bg-surface-muted"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate pr-2">
                          {completed && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                          )}
                          <span className="truncate">{topic.title}</span>
                        </div>
                        <span
                          className={`text-[10px] font-mono px-1.5 py-0.2 rounded border shrink-0 ${
                            isActive
                              ? "bg-white/10 border-white/20 text-neutral-300 dark:bg-black/10 dark:text-neutral-700"
                              : "bg-surface-muted border-border text-foreground-subtle"
                          }`}
                        >
                          {topic.duration}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
