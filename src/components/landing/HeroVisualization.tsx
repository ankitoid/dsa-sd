"use client";

import React, { useState, useEffect } from "react";
import { Play, RotateCcw, Activity, CheckCircle2, Zap } from "lucide-react";

interface NodeItem {
  id: string;
  name: string;
  role: string;
  x: number;
  y: number;
  type: "edge" | "lb" | "service" | "cache" | "db";
}

const NODES: NodeItem[] = [
  { id: "client", name: "Client", role: "Browser / SDK", x: 40, y: 150, type: "edge" },
  { id: "edge", name: "Edge CDN", role: "Anycast DNS", x: 160, y: 150, type: "edge" },
  { id: "lb", name: "L7 Gateway", role: "Envoy Proxy", x: 280, y: 150, type: "lb" },
  { id: "svc1", name: "App Worker A", role: "Stateless Node", x: 410, y: 80, type: "service" },
  { id: "svc2", name: "App Worker B", role: "Stateless Node", x: 410, y: 220, type: "service" },
  { id: "cache", name: "Redis L2", role: "Sub-ms In-Memory", x: 550, y: 80, type: "cache" },
  { id: "db", name: "PostgreSQL", role: "Primary Replica", x: 550, y: 220, type: "db" },
];

export function HeroVisualization() {
  const [activeStep, setActiveStep] = useState(0);
  const [packetPos, setPacketPos] = useState({ x: 40, y: 150 });
  const [isSimulating, setIsSimulating] = useState(false);
  const [cacheHit, setCacheHit] = useState(true);
  const [statusLog, setStatusLog] = useState("System idle. Press 'Simulate Request' to trace execution.");

  const steps = React.useMemo(() => [
    { pos: { x: 40, y: 150 }, text: "Client issues HTTPS request (GET /api/v1/urls/7aB9xQ)" },
    { pos: { x: 160, y: 150 }, text: "Edge CDN verifies TLS 1.3 handshake and routes to origin (3ms)" },
    { pos: { x: 280, y: 150 }, text: "L7 Gateway terminates SSL and load balances to Worker A (1ms)" },
    { pos: { x: 410, y: 80 }, text: "Worker A queries Redis cache for key 'short_code:7aB9xQ'" },
    {
      pos: cacheHit ? { x: 550, y: 80 } : { x: 550, y: 220 },
      text: cacheHit
        ? "Cache HIT in Redis memory (< 0.8ms). Returning HTTP 302 Found redirect."
        : "Cache MISS. Querying PostgreSQL primary replica with B-Tree index (8ms).",
    },
    { pos: { x: 40, y: 150 }, text: "Response delivered to client with total round-trip of 7.2ms" },
  ], [cacheHit]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSimulating) {
      if (activeStep < steps.length - 1) {
        timer = setTimeout(() => {
          setActiveStep((prev) => prev + 1);
          setPacketPos(steps[activeStep + 1].pos);
          setStatusLog(steps[activeStep + 1].text);
        }, 900);
      } else {
        setIsSimulating(false);
      }
    }
    return () => clearTimeout(timer);
  }, [isSimulating, activeStep, steps]);

  const handleStartSimulation = () => {
    setActiveStep(0);
    setPacketPos(steps[0].pos);
    setStatusLog(steps[0].text);
    setIsSimulating(true);
  };

  const handleReset = () => {
    setIsSimulating(false);
    setActiveStep(0);
    setPacketPos(steps[0].pos);
    setStatusLog("System reset. Ready for trace execution.");
  };

  return (
    <div className="w-full bg-[#121412] text-[#EDEDEB] rounded-2xl border border-[#272B27] p-4 sm:p-6 shadow-2xl relative overflow-hidden font-mono text-xs">
      {/* Top Header / Meta */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#232723]">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-accent inline-block animate-pulse" />
          <span className="font-semibold text-white tracking-wider text-[11px] uppercase">
            LIVE DISTRIBUTED EXECUTION TRACE
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCacheHit(!cacheHit)}
            className={`px-2 py-1 rounded text-[11px] border transition-colors ${
              cacheHit
                ? "bg-accent/10 border-accent/40 text-accent font-semibold"
                : "bg-amber-500/10 border-amber-500/40 text-amber-300 font-semibold"
            }`}
          >
            Mode: {cacheHit ? "Cache Hit (Fast)" : "Cache Miss (DB Fallback)"}
          </button>

          <button
            onClick={handleStartSimulation}
            disabled={isSimulating}
            className="flex items-center gap-1.5 px-3 py-1 bg-white text-black font-semibold rounded hover:bg-neutral-200 transition-colors disabled:opacity-50"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>Simulate</span>
          </button>

          <button
            onClick={handleReset}
            className="p-1 rounded text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* SVG Canvas for topology */}
      <div className="relative w-full h-[280px] my-2 select-none overflow-x-auto">
        <svg
          viewBox="0 0 640 300"
          className="w-full h-full min-w-[580px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Static Connection Lines */}
          <path d="M 40 150 L 160 150" stroke="#2D332D" strokeWidth="2" strokeDasharray="4 4" />
          <path d="M 160 150 L 280 150" stroke="#2D332D" strokeWidth="2" />
          <path d="M 280 150 L 410 80" stroke="#2D332D" strokeWidth="2" />
          <path d="M 280 150 L 410 220" stroke="#2D332D" strokeWidth="2" />
          <path d="M 410 80 L 550 80" stroke="#2D332D" strokeWidth="2" />
          <path d="M 410 80 L 550 220" stroke="#2D332D" strokeWidth="1" strokeDasharray="3 3" />
          <path d="M 410 220 L 550 220" stroke="#2D332D" strokeWidth="2" />

          {/* Active Packet Glow & Circle */}
          <circle
            cx={packetPos.x}
            cy={packetPos.y}
            r="8"
            fill="#B7F36B"
            className="transition-all duration-700 ease-out"
          />
          <circle
            cx={packetPos.x}
            cy={packetPos.y}
            r="16"
            fill="#B7F36B"
            opacity="0.25"
            className="animate-ping transition-all duration-700 ease-out"
          />

          {/* Architecture Nodes */}
          {NODES.map((node) => {
            const isTarget = Math.abs(packetPos.x - node.x) < 30 && Math.abs(packetPos.y - node.y) < 30;
            return (
              <g key={node.id} transform={`translate(${node.x - 45}, ${node.y - 25})`}>
                <rect
                  width="90"
                  height="50"
                  rx="8"
                  fill={isTarget ? "#1F281B" : "#171A17"}
                  stroke={isTarget ? "#B7F36B" : "#2E342E"}
                  strokeWidth={isTarget ? "1.5" : "1"}
                  className="transition-colors duration-300"
                />
                <text
                  x="45"
                  y="20"
                  textAnchor="middle"
                  fill={isTarget ? "#FFFFFF" : "#D4D8D4"}
                  fontSize="10"
                  fontWeight="600"
                  fontFamily="sans-serif"
                >
                  {node.name}
                </text>
                <text
                  x="45"
                  y="36"
                  textAnchor="middle"
                  fill="#788078"
                  fontSize="8.5"
                  fontFamily="monospace"
                >
                  {node.role}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Terminal Status Output Log */}
      <div className="bg-[#0B0C0B] rounded-lg p-3 border border-[#1E211E] flex items-center justify-between gap-3 text-[11px]">
        <div className="flex items-center gap-2 truncate">
          <Activity className="w-3.5 h-3.5 text-accent shrink-0" />
          <span className="text-neutral-400 font-mono">step {activeStep + 1}/{steps.length}:</span>
          <span className="text-neutral-200 truncate">{statusLog}</span>
        </div>
        <div className="shrink-0 text-[10px] text-neutral-500 font-mono">
          P99: <span className="text-emerald-400 font-bold">11.4ms</span>
        </div>
      </div>
    </div>
  );
}
