import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCaseStudyBySlug, systemDesignCaseStudies } from "@/content/system-design";
import { ArchitectureWorkbench } from "@/components/system-design/ArchitectureWorkbench";
import { GuidedInterview } from "@/components/system-design/GuidedInterview";
import { Badge } from "@/ui/Badge";
import { Button } from "@/ui/Button";
import {
  Clock,
  Database,
  Layers,
  Shield,
  Activity,
  ArrowLeft,
  CheckCircle2,
  FileCode,
  HardDrive,
  BarChart3,
  Server,
  Bookmark,
} from "lucide-react";

interface CaseStudyPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return Object.values(systemDesignCaseStudies).map((study) => ({
    slug: study.slug,
  }));
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const caseStudy = getCaseStudyBySlug(params.slug) || systemDesignCaseStudies["url-shortener"];

  if (!caseStudy) {
    notFound();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-14">
      {/* Top Navigation & Breadcrumbs */}
      <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono border-b border-border pb-4">
        <Link
          href="/learn/system-design"
          className="flex items-center gap-1.5 text-foreground-muted hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to System Design Track</span>
        </Link>

        <div className="flex items-center gap-2">
          <Badge variant="accent">{caseStudy.level}</Badge>
          <span className="text-foreground-muted">&middot;</span>
          <div className="flex items-center gap-1 text-foreground-muted">
            <Clock className="w-3 h-3" />
            <span>{caseStudy.readTime} read & walkthrough</span>
          </div>
        </div>
      </div>

      {/* Case Study Header */}
      <div className="space-y-4">
        <h1 className="text-display text-foreground font-sans font-bold tracking-tightest leading-tight">
          {caseStudy.title}
        </h1>
        <p className="text-body-editorial text-foreground-muted max-w-3xl leading-relaxed">
          {caseStudy.subtitle}
        </p>
      </div>

      {/* 1. Requirements Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl border border-border bg-surface shadow-subtle space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-foreground-muted font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Functional Requirements:
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-foreground leading-relaxed">
            {caseStudy.functionalRequirements.map((req, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-accent-text font-bold">&bull;</span>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 rounded-xl border border-border bg-surface shadow-subtle space-y-3">
          <div className="text-xs font-mono uppercase tracking-wider text-foreground-muted font-bold flex items-center gap-2">
            <Shield className="w-4 h-4 text-purple-600" />
            Non-Functional Requirements & SLAs:
          </div>
          <ul className="space-y-2 text-xs sm:text-sm text-foreground leading-relaxed">
            {caseStudy.nonFunctionalRequirements.map((req, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-accent-text font-bold">&bull;</span>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* 2. Capacity Estimates */}
      <div className="p-6 rounded-xl border border-border bg-surface shadow-subtle space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <h2 className="text-title-2 text-foreground font-semibold flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-accent-text" />
            <span>Back-of-the-Envelope Capacity Estimations</span>
          </h2>
          <span className="text-xs font-mono text-foreground-muted">Scale Model</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {caseStudy.capacityEstimates.map((est, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-surface-muted/60 border border-border space-y-1.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-foreground-muted font-bold">
                {est.metric}
              </span>
              <div className="text-lg font-mono font-bold text-foreground">{est.value}</div>
              <p className="text-[11px] text-foreground-muted leading-relaxed font-sans">
                {est.rationale}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Interactive Topology Workbench */}
      <div className="space-y-4">
        <h2 className="text-title-2 text-foreground font-semibold">
          High-Level Architecture & Component Roles
        </h2>
        <ArchitectureWorkbench caseStudy={caseStudy} />
      </div>

      {/* 4. API Design & Data Model */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* API Design */}
        <div className="p-6 rounded-xl border border-border bg-surface shadow-subtle space-y-4">
          <div className="flex items-center gap-2 text-base font-semibold text-foreground">
            <FileCode className="w-4 h-4 text-blue-500" />
            <span>API Design & Protocol</span>
          </div>

          <div className="space-y-3">
            {caseStudy.apiDesign.map((api, idx) => (
              <div key={idx} className="p-3.5 bg-surface-muted rounded-lg border border-border space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded font-mono font-bold text-xs bg-[#141414] text-white dark:bg-white dark:text-black">
                    {api.method}
                  </span>
                  <span className="font-mono text-xs font-semibold text-foreground">
                    {api.endpoint}
                  </span>
                </div>
                <p className="text-xs text-foreground-muted">{api.description}</p>
                {api.requestBody && (
                  <pre className="p-2 bg-[#101110] text-[#B7F36B] rounded text-[11px] font-mono overflow-x-auto">
                    {api.requestBody}
                  </pre>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Data Model */}
        <div className="p-6 rounded-xl border border-border bg-surface shadow-subtle space-y-4">
          <div className="flex items-center gap-2 text-base font-semibold text-foreground">
            <Database className="w-4 h-4 text-emerald-500" />
            <span>Data Storage Model & Choice</span>
          </div>

          <div className="space-y-3">
            {caseStudy.dataModel.map((dm, idx) => (
              <div key={idx} className="p-3.5 bg-surface-muted rounded-lg border border-border space-y-2">
                <div className="font-semibold text-xs font-mono text-foreground flex items-center justify-between">
                  <span>Entity: {dm.entity}</span>
                  <span className="text-[10px] text-accent-text font-bold">{dm.dbChoice}</span>
                </div>
                <div className="flex flex-wrap gap-1 text-[11px] font-mono">
                  {dm.fields.map((f, fIdx) => (
                    <span key={fIdx} className="px-1.5 py-0.5 rounded bg-surface border border-border text-foreground">
                      {f}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-foreground-muted leading-relaxed">{dm.rationale}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Guided 8-Stage Interview Mode */}
      <div className="space-y-4 pt-4">
        <GuidedInterview caseStudy={caseStudy} />
      </div>

      {/* 6. Bottlenecks & Failure Modes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl border border-border bg-surface shadow-subtle space-y-3">
          <h3 className="font-semibold text-base text-foreground">Scaling Bottlenecks & Mitigations</h3>
          <ul className="space-y-2 text-xs sm:text-sm text-foreground-muted leading-relaxed">
            {caseStudy.scalingBottlenecks.map((b, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-500 font-bold">&bull;</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 rounded-xl border border-border bg-surface shadow-subtle space-y-3">
          <h3 className="font-semibold text-base text-foreground">Resilience & Disaster Recovery</h3>
          <ul className="space-y-2 text-xs sm:text-sm text-foreground-muted leading-relaxed">
            {caseStudy.failureModes.map((f, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-rose-500 font-bold">&bull;</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
