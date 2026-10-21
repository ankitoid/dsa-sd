import React from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { BookOpen, ExternalLink, FileText, Globe, Layers, ShieldCheck, Terminal } from "lucide-react";
import { Badge } from "@/ui/Badge";

export default function ResourcesPage() {
  const books = [
    {
      title: "Designing Data-Intensive Applications",
      author: "Martin Kleppmann",
      desc: "The definitive guide to distributed data systems, replication, partitioning, and consistency models.",
      category: "System Design",
    },
    {
      title: "Introduction to Algorithms (CLRS)",
      author: "Cormen, Leiserson, Rivest, Stein",
      desc: "The foundational mathematical text on asymptotics, data structures, graph algorithms, and DP.",
      category: "Algorithms",
    },
    {
      title: "Systems Performance: Enterprise and the Cloud",
      author: "Brendan Gregg",
      desc: "Deep dive into kernel latency, CPU cache misses, disk I/O, and Linux system observability.",
      category: "Infrastructure",
    },
  ];

  const papers = [
    {
      title: "The Google File System (GFS)",
      desc: "Ghemawat et al., 2003. Architectural insights into chunkservers, master nodes, and append-only workloads.",
    },
    {
      title: "Dynamo: Amazon's Highly Available Key-value Store",
      desc: "DeCandia et al., 2007. Consistent hashing, vector clocks, sloppy quorums, and anti-entropy with Merkle trees.",
    },
    {
      title: "Kafka: a Distributed Messaging System for Log Processing",
      desc: "Kreps, Narkhede, Rao, 2011. Partitioned commit logs, zero-copy OS transfers, and sequential disk throughput.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-border text-xs font-mono text-foreground-muted font-semibold">
          <BookOpen className="w-3.5 h-3.5 text-accent-text" />
          <span>Curated Engineering References</span>
        </div>
        <h1 className="text-display text-foreground font-sans font-bold tracking-tight">
          Recommended Reading & Seminal Papers
        </h1>
        <p className="text-body-editorial text-foreground-muted leading-relaxed font-sans">
          The essential canon that informed the pedagogical architecture of {siteConfig.name}.
        </p>
      </div>

      {/* Books */}
      <div className="space-y-6">
        <h2 className="text-title-2 text-foreground font-semibold pb-3 border-b border-border">
          Foundational Engineering Books
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {books.map((b, idx) => (
            <div key={idx} className="p-6 rounded-xl border border-border bg-surface shadow-subtle space-y-3">
              <Badge variant="outline">{b.category}</Badge>
              <h3 className="font-semibold text-base text-foreground">{b.title}</h3>
              <p className="text-xs font-mono text-foreground-muted">by {b.author}</p>
              <p className="text-xs text-foreground-muted leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Papers */}
      <div className="space-y-6">
        <h2 className="text-title-2 text-foreground font-semibold pb-3 border-b border-border">
          Seminal Distributed Systems Papers
        </h2>
        <div className="divide-y divide-border rounded-xl border border-border bg-surface overflow-hidden shadow-subtle">
          {papers.map((p, idx) => (
            <div key={idx} className="p-5 flex items-start gap-4 hover:bg-surface-muted/30 transition-colors">
              <FileText className="w-5 h-5 text-foreground-muted shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h4 className="font-semibold text-sm text-foreground">{p.title}</h4>
                <p className="text-xs text-foreground-muted leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy & Legal Policies Statement */}
      <div className="p-8 rounded-2xl border border-border bg-surface-muted/50 space-y-3 text-xs text-foreground-muted leading-relaxed">
        <div className="font-semibold text-foreground text-sm flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Privacy & Responsible Engineering Principles</span>
        </div>
        <p>
          {siteConfig.name} is engineered to prioritize user privacy and client-side data sovereignty. No telemetry is shared with third-party advertisers. All algorithmic sandbox evaluations run locally in your browser unless you configure an explicit remote container judge backend.
        </p>
      </div>
    </div>
  );
}
