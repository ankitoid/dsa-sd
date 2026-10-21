"use client";

import React, { memo } from "react";
import { Handle, Position, NodeProps } from "@xyflow/react";
import {
  Globe,
  Zap,
  Server,
  Database,
  Layers,
  Inbox,
  Cpu,
  HardDrive,
  Copy,
  Table,
  ShieldCheck,
  Split,
  AlertTriangle,
} from "lucide-react";
import { ArchitectureNodeType } from "@/types";

const nodeIconMap: Record<ArchitectureNodeType, React.ElementType> = {
  client: Globe,
  cdn: Zap,
  dns: Globe,
  load_balancer: Split,
  "load-balancer": Split,
  api_gateway: ShieldCheck,
  "api-gateway": ShieldCheck,
  service: Cpu,
  cache: Layers,
  database: Database,
  read_replica: Copy,
  "read-replica": Copy,
  nosql: Table,
  queue: Inbox,
  worker: Server,
  storage: HardDrive,
};

const nodeTypeColors: Record<ArchitectureNodeType, { bg: string; border: string; text: string; badge: string }> = {
  client: { bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-400", badge: "bg-blue-500/20 text-blue-300" },
  cdn: { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-amber-400", badge: "bg-amber-500/20 text-amber-300" },
  dns: { bg: "bg-indigo-500/10", border: "border-indigo-500/30", text: "text-indigo-400", badge: "bg-indigo-500/20 text-indigo-300" },
  load_balancer: { bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-400", badge: "bg-purple-500/20 text-purple-300" },
  "load-balancer": { bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-400", badge: "bg-purple-500/20 text-purple-300" },
  api_gateway: { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400", badge: "bg-emerald-500/20 text-emerald-300" },
  "api-gateway": { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-400", badge: "bg-emerald-500/20 text-emerald-300" },
  service: { bg: "bg-sky-500/10", border: "border-sky-500/30", text: "text-sky-400", badge: "bg-sky-500/20 text-sky-300" },
  cache: { bg: "bg-rose-500/10", border: "border-rose-500/30", text: "text-rose-400", badge: "bg-rose-500/20 text-rose-300" },
  database: { bg: "bg-teal-500/10", border: "border-teal-500/30", text: "text-teal-400", badge: "bg-teal-500/20 text-teal-300" },
  read_replica: { bg: "bg-cyan-500/10", border: "border-cyan-500/30", text: "text-cyan-400", badge: "bg-cyan-500/20 text-cyan-300" },
  "read-replica": { bg: "bg-cyan-500/10", border: "border-cyan-500/30", text: "text-cyan-400", badge: "bg-cyan-500/20 text-cyan-300" },
  nosql: { bg: "bg-fuchsia-500/10", border: "border-fuchsia-500/30", text: "text-fuchsia-400", badge: "bg-fuchsia-500/20 text-fuchsia-300" },
  queue: { bg: "bg-yellow-500/10", border: "border-yellow-500/30", text: "text-yellow-400", badge: "bg-yellow-500/20 text-yellow-300" },
  worker: { bg: "bg-lime-500/10", border: "border-lime-500/30", text: "text-lime-400", badge: "bg-lime-500/20 text-lime-300" },
  storage: { bg: "bg-orange-500/10", border: "border-orange-500/30", text: "text-orange-400", badge: "bg-orange-500/20 text-orange-300" },
};

export const SystemDesignNode = memo(function SystemDesignNode({
  data,
  selected,
}: NodeProps) {
  const nodeType = (data.nodeType as ArchitectureNodeType) || "service";
  const Icon = nodeIconMap[nodeType] || Server;
  const theme = nodeTypeColors[nodeType] || nodeTypeColors.service;
  const isOverloaded = data.status === "overloaded";

  return (
    <div
      className={`group relative min-w-[190px] rounded-xl border bg-card p-3 shadow-md transition-all duration-200 ${
        selected
          ? "border-accent ring-2 ring-accent/30 shadow-lg"
          : isOverloaded
          ? "border-red-500 ring-2 ring-red-500/20"
          : "border-border hover:border-foreground/30 hover:shadow-lg"
      }`}
    >
      {/* Target handle - Left */}
      <Handle
        type="target"
        position={Position.Left}
        className="!h-3 !w-3 !rounded-full !border-2 !border-background !bg-muted-foreground transition-all hover:!bg-accent"
      />
      {/* Target handle - Top */}
      <Handle
        type="target"
        position={Position.Top}
        className="!h-3 !w-3 !rounded-full !border-2 !border-background !bg-muted-foreground transition-all hover:!bg-accent"
      />

      {/* Header */}
      <div className="flex items-center gap-2.5">
        <div className={`flex h-8 w-8 items-center justify-center rounded-lg border ${theme.bg} ${theme.border}`}>
          <Icon className={`h-4 w-4 ${theme.text}`} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-xs font-semibold text-foreground tracking-tight">
            {String(data.label || "Component")}
          </div>
          <div className="truncate text-[10px] text-muted-foreground font-mono">
            {String(data.sublabel || nodeType)}
          </div>
        </div>
      </div>

      {/* Metadata metrics footer */}
      <div className="mt-2.5 flex items-center justify-between border-t border-border/50 pt-2 text-[10px] font-mono text-muted-foreground">
        {data.capacityQps !== undefined && (
          <span className="flex items-center gap-1">
            <span className="text-foreground/70 font-medium">
              {Number(data.capacityQps) >= 1000
                ? `${(Number(data.capacityQps) / 1000).toFixed(0)}k`
                : String(data.capacityQps)}
            </span>{" "}
            QPS
          </span>
        )}
        {data.baseLatencyMs !== undefined && (
          <span className="text-muted-foreground">
            {Number(data.baseLatencyMs)}ms
          </span>
        )}
        {isOverloaded && (
          <span className="flex items-center gap-0.5 text-red-400 font-semibold">
            <AlertTriangle className="h-3 w-3" /> SATURATED
          </span>
        )}
      </div>

      {/* Source handle - Right */}
      <Handle
        type="source"
        position={Position.Right}
        className="!h-3 !w-3 !rounded-full !border-2 !border-background !bg-muted-foreground transition-all hover:!bg-accent"
      />
      {/* Source handle - Bottom */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-3 !w-3 !rounded-full !border-2 !border-background !bg-muted-foreground transition-all hover:!bg-accent"
      />
    </div>
  );
});
