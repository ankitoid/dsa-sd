"use client";

import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  MarkerType,
  BackgroundVariant,
} from "@xyflow/react";
import {
  Play,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  HelpCircle,
  Plus,
  Terminal,
  Layers,
  ChevronDown,
  ArrowRight,
  Info,
  ShieldAlert,
  SlidersHorizontal,
  Activity,
  Trash2,
} from "lucide-react";
import {
  SystemDesignChallenge,
  ArchitectureNodeType,
  SimulationReport,
} from "@/types";
import { systemDesignChallenges } from "@/content/system-design/challenges";
import { simulateArchitecture } from "@/lib/system-design-runner/simulator";
import { SystemDesignNode } from "./SystemDesignNode";
import { useProgress } from "@/hooks/useProgress";

const nodeTypes = {
  systemNode: SystemDesignNode,
};

interface PaletteItem {
  type: ArchitectureNodeType;
  label: string;
  sublabel: string;
  capacityQps: number;
  baseLatencyMs: number;
  category: "Ingress" | "Routing" | "Compute" | "Data & Cache" | "Async";
}

const PALETTE_ITEMS: PaletteItem[] = [
  { type: "client", label: "Global Clients", sublabel: "HTTP/Mobile Ingress", capacityQps: 50000, baseLatencyMs: 0, category: "Ingress" },
  { type: "cdn", label: "Edge CDN", sublabel: "CloudFront / Fastly", capacityQps: 100000, baseLatencyMs: 4, category: "Ingress" },
  { type: "load_balancer", label: "Load Balancer", sublabel: "Envoy / ALB Layer 7", capacityQps: 50000, baseLatencyMs: 2, category: "Routing" },
  { type: "api_gateway", label: "API Gateway", sublabel: "Rate Limiter & Auth", capacityQps: 40000, baseLatencyMs: 3, category: "Routing" },
  { type: "service", label: "App Service", sublabel: "Stateless Cluster", capacityQps: 15000, baseLatencyMs: 6, category: "Compute" },
  { type: "worker", label: "Worker Pool", sublabel: "Async Background Fleet", capacityQps: 20000, baseLatencyMs: 12, category: "Compute" },
  { type: "cache", label: "Redis Cache", sublabel: "In-Memory LRU Cluster", capacityQps: 50000, baseLatencyMs: 1, category: "Data & Cache" },
  { type: "database", label: "PostgreSQL Master", sublabel: "ACID Relational DB", capacityQps: 2500, baseLatencyMs: 22, category: "Data & Cache" },
  { type: "read_replica", label: "Read Replica", sublabel: "Async Read-Only DB", capacityQps: 6000, baseLatencyMs: 14, category: "Data & Cache" },
  { type: "nosql", label: "NoSQL Database", sublabel: "DynamoDB / Cassandra", capacityQps: 35000, baseLatencyMs: 8, category: "Data & Cache" },
  { type: "storage", label: "Object Storage S3", sublabel: "Blob / Video Storage", capacityQps: 60000, baseLatencyMs: 18, category: "Data & Cache" },
  { type: "queue", label: "Kafka Broker", sublabel: "Distributed Queue", capacityQps: 45000, baseLatencyMs: 3, category: "Async" },
];

export function SystemDesignStudio() {
  const { markSdChallengeSolved, isSdChallengeSolved } = useProgress();

  const [selectedChallengeSlug, setSelectedChallengeSlug] = useState<string>(
    systemDesignChallenges[0].slug
  );

  const activeChallenge = useMemo(
    () =>
      systemDesignChallenges.find((c) => c.slug === selectedChallengeSlug) ||
      systemDesignChallenges[0],
    [selectedChallengeSlug]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>(activeChallenge.starterNodes as Node[]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>(
    (activeChallenge.starterEdges || []).map((e) => ({
      ...e,
      markerEnd: { type: MarkerType.ArrowClosed, color: "#888888" },
      style: { strokeWidth: 1.5, stroke: "#666666" },
    })) as Edge[]
  );

  const [simulationReport, setSimulationReport] = useState<SimulationReport | null>(null);
  const [activeTab, setActiveTab] = useState<"results" | "logs" | "brief">("brief");
  const [isSimulating, setIsSimulating] = useState(false);
  const [showPalette, setShowPalette] = useState(true);

  // Sync starter nodes when challenge changes
  useEffect(() => {
    setNodes(activeChallenge.starterNodes as Node[]);
    setEdges(
      (activeChallenge.starterEdges || []).map((e) => ({
        ...e,
        markerEnd: { type: MarkerType.ArrowClosed, color: "#888888" },
        style: { strokeWidth: 1.5, stroke: "#666666" },
      })) as Edge[]
    );
    setSimulationReport(null);
    setActiveTab("brief");
  }, [activeChallenge, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection) =>
      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: true,
            markerEnd: { type: MarkerType.ArrowClosed, color: "#B7F36B" },
            style: { strokeWidth: 2, stroke: "#B7F36B" },
          },
          eds
        )
      ),
    [setEdges]
  );

  const handleAddNode = (item: PaletteItem) => {
    const id = `node-${item.type}-${Date.now()}`;
    const newNode: Node = {
      id,
      type: "systemNode",
      position: {
        x: 100 + (nodes.length % 4) * 140,
        y: 120 + Math.floor(nodes.length / 4) * 110,
      },
      data: {
        label: item.label,
        nodeType: item.type,
        sublabel: item.sublabel,
        capacityQps: item.capacityQps,
        baseLatencyMs: item.baseLatencyMs,
        status: "healthy",
      },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  const handleReset = () => {
    setNodes(activeChallenge.starterNodes as Node[]);
    setEdges(
      (activeChallenge.starterEdges || []).map((e) => ({
        ...e,
        markerEnd: { type: MarkerType.ArrowClosed, color: "#888888" },
        style: { strokeWidth: 1.5, stroke: "#666666" },
      })) as Edge[]
    );
    setSimulationReport(null);
  };

  const handleLoadSolution = () => {
    setNodes(activeChallenge.referenceSolution.nodes as Node[]);
    setEdges(
      activeChallenge.referenceSolution.edges.map((e) => ({
        ...e,
        markerEnd: { type: MarkerType.ArrowClosed, color: "#B7F36B" },
        style: { strokeWidth: 2, stroke: "#B7F36B" },
      })) as Edge[]
    );
  };

  const handleRunSimulation = () => {
    setIsSimulating(true);
    setActiveTab("results");

    setTimeout(() => {
      const report = simulateArchitecture(
        activeChallenge,
        nodes as any,
        edges as any
      );
      setSimulationReport(report);
      setIsSimulating(false);

      if (report.success) {
        markSdChallengeSolved(activeChallenge.id);
      }
    }, 450);
  };

  const isSolved = isSdChallengeSolved(activeChallenge.id);

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] min-h-[720px] rounded-2xl border border-border/80 bg-background overflow-hidden shadow-2xl">
      {/* Studio Header & Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/70 bg-card/60 px-5 py-3 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={selectedChallengeSlug}
              onChange={(e) => setSelectedChallengeSlug(e.target.value)}
              className="appearance-none rounded-xl border border-border bg-background py-1.5 pl-3.5 pr-8 text-xs font-semibold text-foreground shadow-sm transition hover:border-foreground/30 focus:outline-none focus:ring-1 focus:ring-accent"
            >
              {systemDesignChallenges.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.title}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <span className="rounded-md border border-border bg-muted/40 px-2 py-0.5 text-[11px] font-medium text-foreground">
              {activeChallenge.level}
            </span>
            <span className="text-[11px] text-muted-foreground font-mono">
              Target: {activeChallenge.targetQps.toLocaleString()} QPS
            </span>
            <span className="text-[11px] text-muted-foreground font-mono">
              P99 &lt; {activeChallenge.maxLatencyP99Ms}ms
            </span>
          </div>

          {isSolved && (
            <span className="flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-400">
              <CheckCircle2 className="h-3 w-3" /> Solved
            </span>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPalette(!showPalette)}
            className="flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-muted"
            title="Toggle component palette"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="hidden sm:inline">Palette</span>
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-muted"
            title="Reset starter architecture"
          >
            <RotateCcw className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            onClick={handleLoadSolution}
            className="flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-muted"
            title="Inspect reference architecture"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-400" />
            <span className="hidden sm:inline">Reference Solution</span>
          </button>

          <button
            onClick={handleRunSimulation}
            disabled={isSimulating}
            className="flex items-center gap-2 rounded-xl bg-accent px-4 py-1.5 text-xs font-semibold text-accent-text shadow-sm transition hover:bg-accent-hover disabled:opacity-50"
          >
            {isSimulating ? (
              <>
                <Activity className="h-3.5 w-3.5 animate-spin" />
                <span>Simulating...</span>
              </>
            ) : (
              <>
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Compile & Simulate</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Studio Area */}
      <div className="relative flex flex-1 overflow-hidden">
        {/* Component Palette Drawer */}
        {showPalette && (
          <aside className="w-56 shrink-0 border-r border-border/70 bg-card/40 p-3 overflow-y-auto backdrop-blur-sm z-10 flex flex-col gap-3">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Architecture Blocks
                </span>
                <span className="text-[10px] text-muted-foreground">Click to add</span>
              </div>
              <p className="mt-1 text-[11px] text-muted-foreground leading-snug">
                Click any building block to place it on the canvas, then drag connection handles.
              </p>
            </div>

            <div className="space-y-1.5">
              {PALETTE_ITEMS.map((item) => (
                <button
                  key={item.type}
                  onClick={() => handleAddNode(item)}
                  className="flex w-full items-center justify-between rounded-lg border border-border/60 bg-background/80 px-2.5 py-1.5 text-left text-xs transition hover:border-foreground/30 hover:bg-muted/50 group"
                >
                  <div className="min-w-0">
                    <div className="font-medium text-foreground truncate group-hover:text-accent-text">
                      {item.label}
                    </div>
                    <div className="text-[10px] text-muted-foreground font-mono">
                      {item.category}
                    </div>
                  </div>
                  <Plus className="h-3.5 w-3.5 text-muted-foreground shrink-0 group-hover:text-foreground" />
                </button>
              ))}
            </div>

            <div className="mt-auto border-t border-border/50 pt-2 text-[10px] text-muted-foreground flex items-center justify-between">
              <span>{nodes.length} nodes on canvas</span>
              <button
                onClick={() => {
                  setNodes([]);
                  setEdges([]);
                }}
                className="flex items-center gap-1 text-red-400 hover:text-red-300"
                title="Clear all nodes"
              >
                <Trash2 className="h-3 w-3" /> Clear
              </button>
            </div>
          </aside>
        )}

        {/* Center: React Flow Canvas */}
        <div className="relative flex-1 bg-surface-dark/95">
          <ReactFlowProvider>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              nodeTypes={nodeTypes}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              fitView
              snapToGrid
              snapGrid={[15, 15]}
              className="touch-none"
            >
              <Background
                variant={BackgroundVariant.Dots}
                gap={20}
                size={1.5}
                color="#333333"
              />
              <Controls className="!bg-card !border-border !rounded-xl !shadow-lg" />
              <MiniMap
                className="!bg-card/90 !border-border !rounded-xl overflow-hidden shadow-lg hidden md:block"
                nodeStrokeColor="#666666"
                nodeColor="#222222"
                maskColor="rgba(0,0,0,0.5)"
              />
            </ReactFlow>
          </ReactFlowProvider>
        </div>

        {/* Right / Bottom: Diagnostic & Verification Drawer */}
        <div className="w-80 lg:w-96 shrink-0 border-l border-border/70 bg-card/90 flex flex-col z-10 backdrop-blur-md">
          {/* Drawer Tabs */}
          <div className="flex border-b border-border/60 bg-muted/20">
            <button
              onClick={() => setActiveTab("brief")}
              className={`flex-1 py-2.5 text-center text-xs font-medium border-b-2 transition ${
                activeTab === "brief"
                  ? "border-accent text-foreground font-semibold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Problem Brief
            </button>
            <button
              onClick={() => setActiveTab("results")}
              className={`flex-1 py-2.5 text-center text-xs font-medium border-b-2 transition ${
                activeTab === "results"
                  ? "border-accent text-foreground font-semibold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Simulation Results
            </button>
            <button
              onClick={() => setActiveTab("logs")}
              className={`flex-1 py-2.5 text-center text-xs font-medium border-b-2 transition ${
                activeTab === "logs"
                  ? "border-accent text-foreground font-semibold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              Traffic Logs
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {activeTab === "brief" && (
              <div className="space-y-4 text-xs">
                <div>
                  <h4 className="font-semibold text-foreground text-sm">
                    {activeChallenge.title}
                  </h4>
                  <p className="mt-1 text-muted-foreground leading-relaxed">
                    {activeChallenge.description}
                  </p>
                </div>

                <div className="rounded-xl border border-border/60 bg-background/50 p-3 space-y-2">
                  <span className="font-semibold text-foreground uppercase tracking-wider text-[10px]">
                    Functional Requirements
                  </span>
                  <ul className="space-y-1 text-muted-foreground list-disc list-inside">
                    {activeChallenge.functionalRequirements.map((r, i) => (
                      <li key={i} className="leading-snug">{r}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-border/60 bg-background/50 p-3 space-y-2">
                  <span className="font-semibold text-foreground uppercase tracking-wider text-[10px]">
                    Non-Functional Constraints
                  </span>
                  <ul className="space-y-1 text-muted-foreground list-disc list-inside">
                    {activeChallenge.nonFunctionalRequirements.map((r, i) => (
                      <li key={i} className="leading-snug">{r}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-semibold text-amber-400 text-[11px]">
                    <HelpCircle className="h-3.5 w-3.5" />
                    <span>Architectural Hints</span>
                  </div>
                  <ul className="space-y-1 text-muted-foreground list-disc list-inside text-[11px]">
                    {activeChallenge.hints.map((h, i) => (
                      <li key={i}>{h}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === "results" && (
              <div className="space-y-4 text-xs">
                {!simulationReport ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center text-muted-foreground">
                    <Activity className="h-8 w-8 mb-2 opacity-50" />
                    <p className="font-medium text-foreground">Simulation Pending</p>
                    <p className="mt-1 text-[11px] max-w-[220px]">
                      Click &quot;Compile &amp; Simulate&quot; above to evaluate throughput, latency, SPOFs, and resilience.
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Scorecard Banner */}
                    <div
                      className={`rounded-xl border p-3.5 flex items-center justify-between ${
                        simulationReport.success
                          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                          : "border-red-500/40 bg-red-500/10 text-red-300"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {simulationReport.success ? (
                          <CheckCircle2 className="h-6 w-6 text-emerald-400 shrink-0" />
                        ) : (
                          <XCircle className="h-6 w-6 text-red-400 shrink-0" />
                        )}
                        <div>
                          <div className="font-semibold text-sm">
                            {simulationReport.success
                              ? "Design Approved"
                              : "Design Deficient"}
                          </div>
                          <div className="text-[11px] opacity-80">
                            {simulationReport.success
                              ? "All throughput, latency & SLA targets achieved."
                              : "Review bottlenecks and re-simulate."}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold font-mono">
                          {simulationReport.score}
                        </div>
                        <div className="text-[10px] opacity-70 uppercase tracking-wider">
                          / 100
                        </div>
                      </div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="rounded-xl border border-border/70 bg-background/60 p-2.5">
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          Achieved QPS
                        </div>
                        <div className="mt-1 text-sm font-semibold font-mono text-foreground">
                          {simulationReport.achievedQps.toLocaleString()}{" "}
                          <span className="text-[10px] font-normal text-muted-foreground">
                            / {simulationReport.targetQps.toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="rounded-xl border border-border/70 bg-background/60 p-2.5">
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          P99 Latency
                        </div>
                        <div className="mt-1 text-sm font-semibold font-mono text-foreground">
                          {simulationReport.latencyP99Ms}ms{" "}
                          <span className="text-[10px] font-normal text-muted-foreground">
                            (max {simulationReport.maxAllowedLatencyMs}ms)
                          </span>
                        </div>
                      </div>

                      <div className="rounded-xl border border-border/70 bg-background/60 p-2.5">
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          SLA Availability
                        </div>
                        <div className="mt-1 text-sm font-semibold font-mono text-foreground">
                          {simulationReport.availabilityPct}%
                        </div>
                      </div>

                      <div className="rounded-xl border border-border/70 bg-background/60 p-2.5">
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          Cache Hit Ratio
                        </div>
                        <div className="mt-1 text-sm font-semibold font-mono text-foreground">
                          {simulationReport.cacheHitRatioPct}%
                        </div>
                      </div>
                    </div>

                    {/* SPOF Warnings */}
                    {simulationReport.spofNodes.length > 0 && (
                      <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-amber-300 space-y-1">
                        <div className="flex items-center gap-1.5 font-semibold text-[11px]">
                          <ShieldAlert className="h-3.5 w-3.5" />
                          <span>Single Points of Failure ({simulationReport.spofNodes.length})</span>
                        </div>
                        <p className="text-[11px] opacity-90">
                          {simulationReport.spofNodes.join(", ")} can halt the entire system under outage. Add load balancers, caching, or replicas.
                        </p>
                      </div>
                    )}

                    {/* Bottlenecks */}
                    {simulationReport.bottlenecks.length > 0 && (
                      <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-red-300 space-y-1">
                        <div className="flex items-center gap-1.5 font-semibold text-[11px]">
                          <AlertTriangle className="h-3.5 w-3.5" />
                          <span>Detected Bottlenecks</span>
                        </div>
                        <ul className="list-disc list-inside text-[11px] opacity-90 space-y-0.5">
                          {simulationReport.bottlenecks.map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Checklists */}
                    <div className="space-y-1.5">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Verification Checks
                      </div>
                      {simulationReport.passedChecks.map((chk, i) => (
                        <div
                          key={`p-${i}`}
                          className="flex items-center gap-2 rounded-lg bg-emerald-500/5 px-2.5 py-1 text-[11px] text-emerald-400"
                        >
                          <CheckCircle2 className="h-3 w-3 shrink-0" />
                          <span>{chk}</span>
                        </div>
                      ))}
                      {simulationReport.failedChecks.map((chk, i) => (
                        <div
                          key={`f-${i}`}
                          className="flex items-center gap-2 rounded-lg bg-red-500/5 px-2.5 py-1 text-[11px] text-red-400"
                        >
                          <XCircle className="h-3 w-3 shrink-0" />
                          <span>{chk}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {activeTab === "logs" && (
              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between text-[11px] text-muted-foreground pb-1 border-b border-border/50">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="h-3.5 w-3.5" /> Traffic Event Stream
                  </span>
                  <span>{simulationReport?.logs.length || 0} events</span>
                </div>

                {!simulationReport ? (
                  <p className="text-muted-foreground py-6 text-center text-[11px]">
                    No traffic simulation events yet. Run simulation to stream logs.
                  </p>
                ) : (
                  <div className="space-y-1.5 max-h-[460px] overflow-y-auto pr-1">
                    {simulationReport.logs.map((log, i) => {
                      const levelColor =
                        log.level === "error"
                          ? "text-red-400"
                          : log.level === "warn"
                          ? "text-amber-400"
                          : log.level === "success"
                          ? "text-emerald-400"
                          : "text-muted-foreground";

                      return (
                        <div
                          key={i}
                          className="rounded border border-border/40 bg-background/80 p-2 text-[10px] leading-relaxed"
                        >
                          <span className="text-foreground/40 mr-1.5">
                            [{log.timestamp}]
                          </span>
                          <span className={`font-semibold mr-1.5 uppercase ${levelColor}`}>
                            [{log.level}]
                          </span>
                          <span className="text-foreground/90">{log.message}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
