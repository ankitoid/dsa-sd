import React from "react";
import Link from "next/link";
import { ArchitectureWorkbench } from "@/components/system-design/ArchitectureWorkbench";
import { urlShortenerCaseStudy } from "@/content/system-design/case-studies/url-shortener";
import { ArrowRight, Layers } from "lucide-react";
import { Button } from "@/ui/Button";

export function SystemDesignPreview() {
  return (
    <section className="py-20 md:py-28 border-b border-border/80 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-foreground-muted font-semibold uppercase tracking-wider">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>Interactive Architecture Preview</span>
            </div>
            <h2 className="text-title-1 text-foreground font-sans tracking-tight">
              Distributed URL Shortener (11,500 QPS)
            </h2>
            <p className="text-foreground-muted text-base leading-relaxed">
              Explore how a high-throughput redirection service coordinates DNS Anycast, L7 Gateways, In-Memory Caching, and Key Generation to guarantee P99 &lt; 15ms.
            </p>
          </div>

          <Link href="/learn/system-design/case-studies/url-shortener">
            <Button variant="secondary" size="md" className="group text-xs font-semibold">
              <span>Open Guided Case Study & Whiteboard</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* Working Architecture Workbench */}
        <div className="w-full">
          <ArchitectureWorkbench caseStudy={urlShortenerCaseStudy} />
        </div>
      </div>
    </section>
  );
}
