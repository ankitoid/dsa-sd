"use client";

import React, { useState } from "react";
import { SystemDesignCaseStudy } from "@/types";
import {
  Server,
  Database,
  Cpu,
  Layers,
  Shield,
  Activity,
  ArrowRight,
  Info,
  AlertTriangle,
  Scale,
} from "lucide-react";

interface ArchitectureWorkbenchProps {
  caseStudy: SystemDesignCaseStudy;
}

export function ArchitectureWorkbench({ caseStudy }: ArchitectureWorkbenchProps) {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(caseStudy.diagramNodes[3]?.id || caseStudy.diagramNodes[0]?.id);
  const [activeTab, setActiveTab] = useState<"architecture" | "read-flow" | "write-flow">("architecture");

  const selectedNode = caseStudy.diagramNodes.find((n) => n.id === selectedNodeId) || caseStudy.diagramNodes[0];

  const getNodeIcon = (type: string) => {
    switch (type) {
      case "client":
        return <Activity className="w-4 h-4 text-blue-500" />;
      case "gateway":
        return <Shield className="w-4 h-4 text-purple-500" />;
      case "service":
        return <Cpu className="w-4 h-4 text-emerald-500" />;
      case "cache":
        return <Layers className="w-4 h-4 text-amber-500" />;
      case "database":
        return <Database className="w-4 h-4 text-rose-500" />;
      default:
        return <Server className="w-4 h-4 text-neutral-500" />;
    }
  };

  return (
    <div className="w-full bg-surface border border-border rounded-xl shadow-card overflow-hidden">
      {/* Top Workbench Controls */}
      <div className="flex flex-wrap items-center justify-between p-4 sm:p-5 border-b border-border bg-surface-muted/40 gap-3">
        <div>
          <h3 className="font-semibold text-base text-foreground flex items-center gap-2">
            <span>Interactive Architecture Topology</span>
            <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-accent/20 text-[#1B3604] border border-accent/40">
              Interactive Nodes
            </span>
          </h3>
          <p className="text-xs text-foreground-muted mt-0.5">
            Select any architecture block to inspect deep-dive trade-offs and scaling bottlenecks.
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-surface-muted rounded-lg border border-border text-xs font-medium">
          <button
            onClick={() => setActiveTab("architecture")}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === "architecture"
                ? "bg-surface text-foreground shadow-subtle font-semibold"
                : "text-foreground-muted hover:text-foreground"
            }`}
          >
            Diagram View
          </button>
          <button
            onClick={() => setActiveTab("read-flow")}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === "read-flow"
                ? "bg-surface text-foreground shadow-subtle font-semibold"
                : "text-foreground-muted hover:text-foreground"
            }`}
          >
            Read Flow Walkthrough
          </button>
          <button
            onClick={() => setActiveTab("write-flow")}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              activeTab === "write-flow"
                ? "bg-surface text-foreground shadow-subtle font-semibold"
                : "text-foreground-muted hover:text-foreground"
            }`}
          >
            Write Flow Walkthrough
          </button>
        </div>
      </div>

      {activeTab === "architecture" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-border">
          {/* Left Diagram Canvas */}
          <div className="lg:col-span-7 p-6 bg-surface-muted/30 flex flex-col justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {caseStudy.diagramNodes.map((node) => {
                const isSelected = node.id === selectedNodeId;
                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNodeId(node.id)}
                    className={`text-left p-4 rounded-xl border transition-all duration-200 relative ${
                      isSelected
                        ? "bg-[#141414] text-white border-transparent shadow-card scale-[1.02] dark:bg-white dark:text-black"
                        : "bg-surface text-foreground border-border hover:border-foreground-muted/60 shadow-subtle hover:-translate-y-0.5"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        {getNodeIcon(node.type)}
                        <span className="font-semibold text-sm truncate">{node.label}</span>
                      </div>
                      <span
                        className={`text-[10px] font-mono uppercase px-1.5 py-0.5 rounded border ${
                          isSelected
                            ? "bg-white/10 border-white/20 text-neutral-300 dark:bg-black/10 dark:text-neutral-700"
                            : "bg-surface-muted border-border text-foreground-muted"
                        }`}
                      >
                        {node.type}
                      </span>
                    </div>

                    <p
                      className={`text-xs line-clamp-2 leading-relaxed ${
                        isSelected ? "text-neutral-300 dark:text-neutral-600" : "text-foreground-muted"
                      }`}
                    >
                      {node.description}
                    </p>
                  </button>
                );
              })}
            </div>
            <div className="mt-4 text-center text-xs text-foreground-subtle font-mono">
              &bull; Click any component to inspect its architecture contract &bull;
            </div>
          </div>

          {/* Right Node Detail Inspector */}
          <div className="lg:col-span-5 p-6 bg-surface space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-surface-muted border border-border">
                  {getNodeIcon(selectedNode.type)}
                </div>
                <div>
                  <h4 className="font-semibold text-base text-foreground">{selectedNode.label}</h4>
                  <span className="text-xs font-mono text-foreground-muted uppercase tracking-wider">
                    Component Type: {selectedNode.type}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <h5 className="font-mono uppercase tracking-wider text-foreground-muted font-semibold mb-1 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-blue-500" />
                  Primary Responsibility
                </h5>
                <p className="text-foreground leading-relaxed text-sm bg-surface-muted/50 p-3 rounded-lg border border-border">
                  {selectedNode.description}
                </p>
              </div>

              <div>
                <h5 className="font-mono uppercase tracking-wider text-foreground-muted font-semibold mb-1 flex items-center gap-1.5">
                  <Scale className="w-3.5 h-3.5 text-amber-500" />
                  Architectural Trade-Offs
                </h5>
                <p className="text-foreground leading-relaxed bg-surface-muted/50 p-3 rounded-lg border border-border">
                  {selectedNode.tradeoffs}
                </p>
              </div>

              <div>
                <h5 className="font-mono uppercase tracking-wider text-foreground-muted font-semibold mb-1 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                  Failure Modes & Bottlenecks
                </h5>
                <p className="text-foreground leading-relaxed bg-surface-muted/50 p-3 rounded-lg border border-border">
                  {selectedNode.bottlenecks}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : activeTab === "read-flow" ? (
        <div className="p-6 bg-surface space-y-4">
          <h4 className="font-semibold text-base text-foreground">Step-by-Step Read Path Execution</h4>
          <div className="space-y-2.5">
            {caseStudy.readFlow.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-lg bg-surface-muted border border-border text-sm text-foreground"
              >
                <div className="w-6 h-6 rounded-full bg-[#141414] text-white flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 dark:bg-white dark:text-black">
                  {idx + 1}
                </div>
                <div className="leading-relaxed font-sans">{step}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-6 bg-surface space-y-4">
          <h4 className="font-semibold text-base text-foreground">Step-by-Step Write Path Execution</h4>
          <div className="space-y-2.5">
            {caseStudy.writeFlow.map((step, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3.5 rounded-lg bg-surface-muted border border-border text-sm text-foreground"
              >
                <div className="w-6 h-6 rounded-full bg-[#141414] text-white flex items-center justify-center text-xs font-mono font-bold shrink-0 mt-0.5 dark:bg-white dark:text-black">
                  {idx + 1}
                </div>
                <div className="leading-relaxed font-sans">{step}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
