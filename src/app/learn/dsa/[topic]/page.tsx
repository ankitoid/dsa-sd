import React from "react";
import Link from "next/link";
import { getLessonBySlug, getTopicBySlug, dsaTopics } from "@/content/dsa";
import { LessonSidebar } from "@/components/learning/LessonSidebar";
import { LessonWorkspace } from "@/components/learning/LessonWorkspace";
import { Button } from "@/ui/Button";
import { Badge } from "@/ui/Badge";
import { ArrowRight, BookOpen, Clock } from "lucide-react";

interface TopicPageProps {
  params: {
    topic: string;
  };
}

export function generateStaticParams() {
  return dsaTopics.map((topic) => ({
    topic: topic.slug,
  }));
}

export default function DSATopicPage({ params }: TopicPageProps) {
  // If the topic matches an existing lesson slug, render the lesson workspace directly
  const directLesson = getLessonBySlug(params.topic);
  if (directLesson) {
    return (
      <div className="flex flex-col lg:flex-row min-h-screen">
        <LessonSidebar currentSlug={directLesson.slug} />
        <LessonWorkspace lesson={directLesson} />
      </div>
    );
  }

  const topic = getTopicBySlug(params.topic);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <LessonSidebar currentSlug={params.topic} />
      <div className="flex-1 p-8 sm:p-12 space-y-8 max-w-4xl">
        <div className="space-y-4">
          <Badge variant="easy">{topic?.level || "Beginner"}</Badge>
          <h1 className="text-display text-foreground font-sans font-bold">
            {topic?.title || params.topic.replace(/-/g, " ")}
          </h1>
          <p className="text-body-editorial text-foreground-muted leading-relaxed">
            {topic?.description || "Explore fundamental invariants, worked examples, and interactive visualizations."}
          </p>
        </div>

        <div className="p-6 rounded-xl border border-border bg-surface space-y-4 shadow-subtle">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <h3 className="font-semibold text-base text-foreground">Available Interactive Lessons</h3>
            <span className="text-xs font-mono text-foreground-muted">Module 01</span>
          </div>

          <div className="space-y-3">
            <Link
              href={`/learn/dsa/algorithms/${params.topic}`}
              className="flex items-center justify-between p-4 rounded-lg bg-surface-muted hover:bg-surface border border-border transition-colors group"
            >
              <div>
                <div className="font-semibold text-sm text-foreground group-hover:text-accent-text transition-colors">
                  {topic?.title || params.topic} Foundations & Mechanisms
                </div>
                <div className="text-xs text-foreground-muted mt-1 font-mono">
                  Interactive state visualizer &middot; Worked examples &middot; Complexity proofs
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-foreground-muted group-hover:translate-x-1 group-hover:text-foreground transition-all" />
            </Link>
          </div>
        </div>

        <div className="pt-4 flex items-center gap-4">
          <Link href="/learn/dsa/algorithms/binary-search">
            <Button variant="accent" size="sm">
              Jump to Binary Search Visualizer &rarr;
            </Button>
          </Link>
          <Link href="/learn/dsa">
            <Button variant="outline" size="sm">
              &larr; Back to all DSA topics
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
