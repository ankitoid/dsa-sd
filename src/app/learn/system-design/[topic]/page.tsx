import React from "react";
import Link from "next/link";
import { getSystemDesignTopicBySlug, systemDesignTopics } from "@/content/system-design";
import { Badge } from "@/ui/Badge";
import { Button } from "@/ui/Button";
import { ArrowLeft, ArrowRight, Clock, Layers, ShieldCheck } from "lucide-react";

interface TopicPageProps {
  params: {
    topic: string;
  };
}

export function generateStaticParams() {
  return systemDesignTopics.map((topic) => ({
    topic: topic.slug,
  }));
}

export default function SystemDesignTopicPage({ params }: TopicPageProps) {
  const topic = getSystemDesignTopicBySlug(params.topic) || systemDesignTopics[0];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <Link
        href="/learn/system-design"
        className="inline-flex items-center gap-1.5 text-xs font-mono text-foreground-muted hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to System Design Curriculum</span>
      </Link>

      <div className="space-y-4">
        <Badge variant={topic.level === "Beginner" ? "easy" : topic.level === "Intermediate" ? "medium" : "hard"}>
          {topic.level}
        </Badge>
        <h1 className="text-display text-foreground font-sans font-bold tracking-tight">
          {topic.title}
        </h1>
        <p className="text-body-editorial text-foreground-muted leading-relaxed font-sans">
          {topic.description}
        </p>
      </div>

      <div className="p-8 rounded-xl border border-border bg-surface space-y-6 shadow-subtle">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Layers className="w-4 h-4 text-accent-text" />
            <span>Core Architectural Primitives</span>
          </div>
          <span className="text-xs font-mono text-foreground-muted">{topic.duration}</span>
        </div>

        <div className="space-y-4 text-sm text-foreground-muted leading-relaxed">
          <p>
            In modern distributed systems, {topic.title.toLowerCase()} provides essential performance guarantees, fault boundaries, and operational scalability. Understanding the trade-offs between latency, throughput, consistency, and operational complexity is key during system architecture interviews.
          </p>
        </div>

        <div className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-4">
          <Link href="/learn/system-design/case-studies/url-shortener">
            <Button variant="accent" size="sm">
              Launch Case Study (URL Shortener) &rarr;
            </Button>
          </Link>
          <Link href="/practice">
            <Button variant="outline" size="sm">
              Practice Coding Interview
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
