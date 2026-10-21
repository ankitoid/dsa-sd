"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, ChevronRight, ChevronLeft, Workflow, CheckCircle2 } from "lucide-react";
import { Button } from "@/ui/Button";

interface NodeCoord {
  id: number;
  label: string;
  x: number;
  y: number;
}

const GRAPH_NODES: NodeCoord[] = [
  { id: 0, label: "0", x: 60, y: 130 },
  { id: 1, label: "1", x: 180, y: 60 },
  { id: 2, label: "2", x: 180, y: 200 },
  { id: 3, label: "3", x: 320, y: 60 },
  { id: 4, label: "4", x: 320, y: 200 },
  { id: 5, label: "5", x: 440, y: 130 },
];

const GRAPH_EDGES = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 4],
  [3, 5],
  [4, 5],
];

export function GraphTraversalVisualizer() {
  const [traversalMode, setTraversalMode] = useState<"BFS" | "DFS">("BFS");
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Precomputed BFS steps (Queue-based, layer-by-layer)
  const bfsSteps = [
    {
      activeNode: 0,
      visited: [0],
      frontier: [0],
      frontierName: "Queue (FIFO)",
      explanation: "Initialize BFS: Enqueue origin node 0 and immediately mark 0 as visited.",
    },
    {
      activeNode: 0,
      visited: [0, 1, 2],
      frontier: [1, 2],
      frontierName: "Queue (FIFO)",
      explanation: "Dequeue node 0. Inspect neighbors of 0: nodes 1 and 2. Enqueue 1 and 2, mark both visited.",
    },
    {
      activeNode: 1,
      visited: [0, 1, 2, 3],
      frontier: [2, 3],
      frontierName: "Queue (FIFO)",
      explanation: "Dequeue node 1. Inspect neighbors of 1: node 3 is unvisited. Enqueue 3 and mark visited.",
    },
    {
      activeNode: 2,
      visited: [0, 1, 2, 3, 4],
      frontier: [3, 4],
      frontierName: "Queue (FIFO)",
      explanation: "Dequeue node 2. Inspect neighbors of 2: node 4 is unvisited. Enqueue 4 and mark visited.",
    },
    {
      activeNode: 3,
      visited: [0, 1, 2, 3, 4, 5],
      frontier: [4, 5],
      frontierName: "Queue (FIFO)",
      explanation: "Dequeue node 3. Inspect neighbors of 3: node 5 is unvisited. Enqueue 5 and mark visited.",
    },
    {
      activeNode: 4,
      visited: [0, 1, 2, 3, 4, 5],
      frontier: [5],
      frontierName: "Queue (FIFO)",
      explanation: "Dequeue node 4. Neighbor 5 already visited. Proceed to next queue item.",
    },
    {
      activeNode: 5,
      visited: [0, 1, 2, 3, 4, 5],
      frontier: [],
      frontierName: "Queue (FIFO)",
      explanation: "Dequeue node 5. Target reached! All nodes reachable. Shortest path distance to node 5 is 3 edges.",
    },
  ];

  // Precomputed DFS steps (Stack/Deepening)
  const dfsSteps = [
    {
      activeNode: 0,
      visited: [0],
      frontier: [0],
      frontierName: "Call Stack (LIFO)",
      explanation: "Initialize DFS: Push node 0 to call stack and mark visited.",
    },
    {
      activeNode: 1,
      visited: [0, 1],
      frontier: [0, 1],
      frontierName: "Call Stack (LIFO)",
      explanation: "Explore neighbor 1 from node 0. Push node 1 to call stack.",
    },
    {
      activeNode: 3,
      visited: [0, 1, 3],
      frontier: [0, 1, 3],
      frontierName: "Call Stack (LIFO)",
      explanation: "Explore neighbor 3 from node 1. Push node 3 to call stack.",
    },
    {
      activeNode: 5,
      visited: [0, 1, 3, 5],
      frontier: [0, 1, 3, 5],
      frontierName: "Call Stack (LIFO)",
      explanation: "Explore neighbor 5 from node 3. Push node 5 to call stack. Reached deep dead end.",
    },
    {
      activeNode: 4,
      visited: [0, 1, 3, 5, 4],
      frontier: [0, 2, 4],
      frontierName: "Call Stack (LIFO)",
      explanation: "Backtrack to explore alternate branch through node 2 -> 4. Graph fully traversed.",
    },
  ];

  const steps = traversalMode === "BFS" ? bfsSteps : dfsSteps;
  const current = steps[Math.min(stepIndex, steps.length - 1)];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setStepIndex((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 1400);
    }
    return () => clearInterval(timer);
  }, [isPlaying, steps.length]);

  return (
    <div className="w-full bg-surface border border-border rounded-xl shadow-card p-5 sm:p-7 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <h3 className="font-semibold text-base text-foreground flex items-center gap-2">
            <span>Graph Traversal Workbench ({traversalMode})</span>
            <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-accent/20 text-[#1B3604] border border-accent/40">
              O(V + E)
            </span>
          </h3>
          <p className="text-xs text-foreground-muted mt-0.5">
            Compare layer-by-layer queue expansion (BFS) vs deep path stack frames (DFS).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setTraversalMode("BFS");
              setStepIndex(0);
            }}
            className={`px-3 py-1 text-xs font-semibold rounded-md border transition-colors ${
              traversalMode === "BFS"
                ? "bg-[#141414] text-white border-transparent dark:bg-white dark:text-black"
                : "bg-surface-muted text-foreground-muted border-border"
            }`}
          >
            BFS (Queue)
          </button>
          <button
            onClick={() => {
              setTraversalMode("DFS");
              setStepIndex(0);
            }}
            className={`px-3 py-1 text-xs font-semibold rounded-md border transition-colors ${
              traversalMode === "DFS"
                ? "bg-[#141414] text-white border-transparent dark:bg-white dark:text-black"
                : "bg-surface-muted text-foreground-muted border-border"
            }`}
          >
            DFS (Stack)
          </button>
        </div>
      </div>

      {/* Graph Visual Canvas */}
      <div className="relative w-full h-[260px] bg-surface-muted/50 rounded-lg border border-border p-2 overflow-x-auto">
        <svg viewBox="0 0 500 260" className="w-full h-full min-w-[460px]">
          {/* Edges */}
          {GRAPH_EDGES.map(([u, v], i) => {
            const nodeU = GRAPH_NODES[u];
            const nodeV = GRAPH_NODES[v];
            const isTraversed = current.visited.includes(u) && current.visited.includes(v);
            return (
              <line
                key={i}
                x1={nodeU.x}
                y1={nodeU.y}
                x2={nodeV.x}
                y2={nodeV.y}
                stroke={isTraversed ? "#B7F36B" : "#D0D2D0"}
                strokeWidth={isTraversed ? 3 : 1.5}
                className="transition-colors duration-300"
              />
            );
          })}

          {/* Nodes */}
          {GRAPH_NODES.map((node) => {
            const isActive = current.activeNode === node.id;
            const isVisited = current.visited.includes(node.id);
            return (
              <g key={node.id} className="cursor-pointer">
                <circle
                  cx={node.x}
                  cy={node.y}
                  r="20"
                  fill={isActive ? "#141414" : isVisited ? "#B7F36B" : "#FFFFFF"}
                  stroke={isActive ? "#B7F36B" : "#B8BBB8"}
                  strokeWidth={isActive ? 3 : 1.5}
                  className="transition-all duration-300"
                />
                <text
                  x={node.x}
                  y={node.y + 5}
                  textAnchor="middle"
                  fill={isActive ? "#FFFFFF" : isVisited ? "#122A03" : "#333333"}
                  fontSize="13"
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Frontier Data Structure & Visited Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-3 bg-surface-muted rounded-lg border border-border">
          <div className="text-[11px] font-mono text-foreground-muted uppercase tracking-wider mb-1">
            {current.frontierName}
          </div>
          <div className="flex items-center gap-1.5 font-mono text-sm font-semibold">
            [
            {current.frontier.length === 0 ? (
              <span className="text-foreground-subtle italic">empty</span>
            ) : (
              current.frontier.map((id, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded bg-surface border border-border text-foreground"
                >
                  Node {id}
                </span>
              ))
            )}
            ]
          </div>
        </div>

        <div className="p-3 bg-surface-muted rounded-lg border border-border">
          <div className="text-[11px] font-mono text-foreground-muted uppercase tracking-wider mb-1">
            Visited Set ({current.visited.length}/{GRAPH_NODES.length})
          </div>
          <div className="flex items-center gap-1.5 font-mono text-sm font-semibold">
            &#123;
            {current.visited.map((id, i) => (
              <span key={i} className="text-emerald-700 dark:text-emerald-400 font-bold">
                {id}
                {i < current.visited.length - 1 ? ", " : ""}
              </span>
            ))}
            &#125;
          </div>
        </div>
      </div>

      {/* Step Explanation */}
      <div className="rounded-lg p-4 bg-surface-muted border border-border">
        <div className="text-xs font-semibold text-foreground mb-1">
          Step {stepIndex + 1} of {steps.length}:
        </div>
        <p className="text-sm text-foreground leading-relaxed">{current.explanation}</p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={stepIndex === 0}
            onClick={() => {
              setIsPlaying(false);
              setStepIndex((i) => i - 1);
            }}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>

          <Button
            size="sm"
            variant={isPlaying ? "secondary" : "primary"}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 mr-1" /> Pause
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 mr-1 fill-current" /> Auto Play
              </>
            )}
          </Button>

          <Button
            size="sm"
            variant="outline"
            disabled={stepIndex === steps.length - 1}
            onClick={() => {
              setIsPlaying(false);
              setStepIndex((i) => i + 1);
            }}
          >
            Next Step
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            setIsPlaying(false);
            setStepIndex(0);
          }}
        >
          <RotateCcw className="w-3.5 h-3.5 mr-1" />
          Reset
        </Button>
      </div>
    </div>
  );
}
