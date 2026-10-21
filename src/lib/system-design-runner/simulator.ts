import {
  ArchitectureCanvasNode,
  ArchitectureCanvasEdge,
  ArchitectureNodeType,
  SystemDesignChallenge,
  SimulationReport,
} from "@/types";

export function simulateArchitecture(
  challenge: SystemDesignChallenge,
  nodes: ArchitectureCanvasNode[],
  edges: ArchitectureCanvasEdge[]
): SimulationReport {
  const logs: SimulationReport["logs"] = [];
  const passedChecks: string[] = [];
  const failedChecks: string[] = [];
  const bottlenecks: string[] = [];
  const spofNodes: string[] = [];

  const addLog = (
    level: "info" | "warn" | "error" | "success",
    message: string
  ) => {
    const time = new Date().toISOString().substring(11, 19);
    logs.push({ timestamp: time, level, message });
  };

  addLog("info", `Initiating architecture compilation for: "${challenge.title}"`);
  addLog("info", `Target workload: ${challenge.targetQps.toLocaleString()} QPS | Max P99 latency: ${challenge.maxLatencyP99Ms}ms`);

  // 1. Topology & Connectivity checks
  if (nodes.length === 0) {
    addLog("error", "Empty architecture canvas. Please add components.");
    return {
      success: false,
      score: 0,
      achievedQps: 0,
      targetQps: challenge.targetQps,
      latencyP99Ms: 999,
      maxAllowedLatencyMs: challenge.maxLatencyP99Ms,
      availabilityPct: 0,
      spofCount: 0,
      spofNodes: [],
      cacheHitRatioPct: 0,
      bottlenecks: ["Empty architecture canvas"],
      passedChecks: [],
      failedChecks: ["Architecture canvas must not be empty"],
      logs,
    };
  }

  const clientNodes = nodes.filter((n) => n.data.nodeType === "client");
  if (clientNodes.length === 0) {
    failedChecks.push("Missing Ingress Client node");
    addLog("error", "No Client ingress node found. Traffic cannot originate without a Client.");
  } else {
    passedChecks.push("Client ingress endpoint present");
    addLog("success", `Found ${clientNodes.length} Client ingress entrypoint(s).`);
  }

  // Build adjacency graph
  const outgoingMap: Record<string, string[]> = {};
  const incomingMap: Record<string, string[]> = {};
  nodes.forEach((n) => {
    outgoingMap[n.id] = [];
    incomingMap[n.id] = [];
  });

  edges.forEach((e) => {
    if (outgoingMap[e.source]) outgoingMap[e.source].push(e.target);
    if (incomingMap[e.target]) incomingMap[e.target].push(e.source);
  });

  // Check unreachable nodes
  const visited = new Set<string>();
  const queue: string[] = clientNodes.map((c) => c.id);
  while (queue.length > 0) {
    const current = queue.shift()!;
    if (!visited.has(current)) {
      visited.add(current);
      const neighbors = outgoingMap[current] || [];
      neighbors.forEach((nxt) => {
        if (!visited.has(nxt)) queue.push(nxt);
      });
    }
  }

  const unreachable = nodes.filter((n) => !visited.has(n.id) && n.data.nodeType !== "client");
  if (unreachable.length > 0) {
    const unreachableLabels = unreachable.map((u) => u.data.label).join(", ");
    failedChecks.push(`Unreachable disconnected components: ${unreachableLabels}`);
    addLog("warn", `Components unreachable from Client: ${unreachableLabels}`);
  }

  // 2. Check forbidden architectural antipatterns
  let hasForbiddenAntipattern = false;
  edges.forEach((e) => {
    const src = nodes.find((n) => n.id === e.source);
    const tgt = nodes.find((n) => n.id === e.target);
    if (!src || !tgt) return;

    // Antipattern 1: Client directly connecting to internal DB or Cache
    if (src.data.nodeType === "client" && (tgt.data.nodeType === "database" || tgt.data.nodeType === "nosql")) {
      failedChecks.push(`Security violation: Client directly connects to ${tgt.data.label}`);
      addLog("error", `SECURITY VIOLATION: Direct Client -> Database connection detected (${tgt.data.label}). Databases must be protected behind an application layer.`);
      hasForbiddenAntipattern = true;
    }
    if (src.data.nodeType === "client" && tgt.data.nodeType === "cache") {
      failedChecks.push(`Security violation: Client directly connects to internal cache ${tgt.data.label}`);
      addLog("error", `SECURITY VIOLATION: Direct Client -> Cache connection detected (${tgt.data.label}). Caches must be accessed through service tiers.`);
      hasForbiddenAntipattern = true;
    }
  });

  if (!hasForbiddenAntipattern) {
    passedChecks.push("Zero forbidden direct database/cache exposure");
    addLog("success", "Security boundary validation passed: Internal data tiers are shielded.");
  }

  // 3. Required components check
  const presentTypes = new Set<ArchitectureNodeType>(nodes.map((n) => n.data.nodeType));
  const missingRequired = challenge.requiredComponents.filter((req) => !presentTypes.has(req));

  if (missingRequired.length === 0) {
    passedChecks.push(`All ${challenge.requiredComponents.length} required architectural tiers present`);
    addLog("success", `Required components fulfilled: ${challenge.requiredComponents.join(", ")}`);
  } else {
    failedChecks.push(`Missing essential architectural tiers: ${missingRequired.join(", ")}`);
    addLog("warn", `Missing recommended tiers for this challenge: ${missingRequired.join(", ")}`);
  }

  // 4. Component analysis & SPOF detection
  const hasLoadBalancer = presentTypes.has("load_balancer") || presentTypes.has("api_gateway");
  const hasCdn = presentTypes.has("cdn");
  const hasCache = presentTypes.has("cache");
  const hasQueue = presentTypes.has("queue");
  const hasWorker = presentTypes.has("worker");
  const hasReplica = presentTypes.has("read_replica");

  // SPOF check: Client -> Single Service directly without LB or CDN
  clientNodes.forEach((client) => {
    const clientTargets = (outgoingMap[client.id] || []).map((tid) => nodes.find((n) => n.id === tid)).filter(Boolean);
    clientTargets.forEach((tgt) => {
      if (tgt && tgt.data.nodeType === "service" && !hasLoadBalancer) {
        spofNodes.push(tgt.data.label);
        failedChecks.push(`SPOF detected: ${tgt.data.label} handles raw ingress without Load Balancer`);
        addLog("warn", `Single Point of Failure: Direct client traffic to ${tgt.data.label} without a Load Balancer or API Gateway.`);
      }
    });
  });

  // SPOF check: Primary database handling high QPS without cache or replica
  const dbNodes = nodes.filter((n) => n.data.nodeType === "database" || n.data.nodeType === "nosql");
  if (dbNodes.length === 1 && !hasCache && !hasReplica && challenge.targetQps > 3000) {
    spofNodes.push(dbNodes[0].data.label);
    failedChecks.push(`SPOF detected: Single database node ${dbNodes[0].data.label} has no cache or replica`);
    addLog("warn", `High SPOF Risk: Database ${dbNodes[0].data.label} lacks read caching or replication under ${challenge.targetQps} QPS.`);
  }

  // 5. Traffic Flow & Capacity Simulation
  let effectiveIngressQps = challenge.targetQps;
  let cacheHitRatioPct = 0;
  let baseCriticalPathLatencyMs = 2; // Ingress network transport

  // CDN Tier Simulation
  if (hasCdn) {
    cacheHitRatioPct += 45;
    addLog("info", "CDN Edge Cache activated: absorbing static & media requests at edge POPs (85% offload).");
    baseCriticalPathLatencyMs += 3;
  }

  // Load Balancer / Gateway Tier
  if (hasLoadBalancer) {
    passedChecks.push("High-availability traffic distribution tier configured");
    addLog("info", "Ingress Load Balancer / API Gateway active: distributing TCP/HTTP connections.");
    baseCriticalPathLatencyMs += 2;
  } else {
    failedChecks.push("Missing Ingress Load Balancer / API Gateway");
    addLog("warn", "No Load Balancer detected. Single node ingress prone to connection saturation.");
  }

  // Application Service Tier
  const serviceNodes = nodes.filter((n) => n.data.nodeType === "service");
  let totalServiceCapacity = serviceNodes.reduce((acc, s) => acc + (s.data.capacityQps || 5000), 0);
  if (serviceNodes.length > 0) {
    baseCriticalPathLatencyMs += 5;
    if (totalServiceCapacity < effectiveIngressQps * 0.7) {
      bottlenecks.push(`Service tier throughput (${totalServiceCapacity} QPS) below ingress requirement`);
      failedChecks.push(`Service layer bottleneck: capacity is ${totalServiceCapacity} QPS vs required ${effectiveIngressQps}`);
      addLog("error", `Service saturation: Total service capacity (${totalServiceCapacity} QPS) cannot sustain incoming traffic.`);
    } else {
      passedChecks.push(`Service tier can sustain throughput (${totalServiceCapacity} QPS)`);
      addLog("success", `Service tier capacity verified: ${totalServiceCapacity} QPS across ${serviceNodes.length} instance(s).`);
    }
  }

  // Cache Tier Simulation
  const cacheNodes = nodes.filter((n) => n.data.nodeType === "cache");
  if (cacheNodes.length > 0) {
    cacheHitRatioPct = Math.min(95, cacheHitRatioPct + 45);
    passedChecks.push(`In-memory caching tier active (${cacheHitRatioPct}% hit ratio)`);
    addLog("success", `Redis/Memcached cache layer operational. Absorbing ~${cacheHitRatioPct}% of query reads in sub-2ms.`);
    baseCriticalPathLatencyMs += 2;
  } else if (challenge.targetQps >= 5000) {
    failedChecks.push("Missing caching layer for high-throughput reads");
    addLog("warn", "No caching tier detected. 100% of read operations will hit primary storage.");
  }

  // Queue & Worker Tier Simulation
  if (hasQueue && hasWorker) {
    passedChecks.push("Asynchronous decoupled message queue and worker pool active");
    addLog("success", "Queue & Worker pool active: Asynchronous tasks decoupled from HTTP response cycle.");
  } else if (hasQueue && !hasWorker) {
    failedChecks.push("Queue present without worker consumers");
    addLog("warn", "Message queue detected but no Worker nodes connected to drain events.");
  }

  // Database Tier Simulation
  let dbDirectQps = effectiveIngressQps * ((100 - cacheHitRatioPct) / 100);
  if (hasReplica) {
    dbDirectQps = dbDirectQps * 0.4; // 60% routed to replicas
    passedChecks.push("Read Replica offloading queries from master database");
    addLog("info", "Database Read Replica active: Master node insulated from read volume.");
  }

  let dbCapacity = dbNodes.reduce((acc, d) => acc + (d.data.capacityQps || 2000), 0);
  let isDbOverloaded = false;

  if (dbNodes.length > 0) {
    baseCriticalPathLatencyMs += 12;
    if (dbDirectQps > dbCapacity) {
      isDbOverloaded = true;
      bottlenecks.push(`Database connection pool exhaustion (${Math.round(dbDirectQps)} QPS hitting ${dbCapacity} QPS DB)`);
      failedChecks.push(`Database overloaded: incoming ${Math.round(dbDirectQps)} QPS exceeds ${dbCapacity} QPS capacity`);
      addLog("error", `DATABASE BOTTLENECK: DB tier overloaded (${Math.round(dbDirectQps)} QPS vs ${dbCapacity} capacity). Latency will spike.`);
    } else {
      passedChecks.push(`Database load within safe operating limits (${Math.round(dbDirectQps)} QPS / ${dbCapacity} QPS)`);
      addLog("success", `Database tier operating stably with ${Math.round(dbDirectQps)} QPS.`);
    }
  }

  // 6. Metrics Calculation
  let achievedQps = challenge.targetQps;
  if (isDbOverloaded) {
    achievedQps = Math.min(achievedQps, Math.round(dbCapacity / ((100 - cacheHitRatioPct) / 100 || 1)));
  }
  if (totalServiceCapacity > 0 && totalServiceCapacity < achievedQps) {
    achievedQps = totalServiceCapacity;
  }

  let latencyP99Ms = baseCriticalPathLatencyMs;
  if (isDbOverloaded) {
    latencyP99Ms += 35; // Severe query queuing latency
  }
  if (spofNodes.length > 0) {
    latencyP99Ms += 6;
  }
  if (!hasLoadBalancer) {
    latencyP99Ms += 8;
  }

  let availabilityPct = 99.99;
  if (spofNodes.length > 0) {
    availabilityPct -= spofNodes.length * 0.15;
  }
  if (isDbOverloaded) {
    availabilityPct -= 1.8;
  }
  if (hasForbiddenAntipattern) {
    availabilityPct -= 2.5;
  }
  availabilityPct = Math.max(90, Math.min(99.99, Number(availabilityPct.toFixed(2))));

  // Check constraints against challenge targets
  const latencyPassed = latencyP99Ms <= challenge.maxLatencyP99Ms;
  if (latencyPassed) {
    passedChecks.push(`Latency target met: P99 ${latencyP99Ms}ms <= ${challenge.maxLatencyP99Ms}ms`);
  } else {
    failedChecks.push(`Latency target violated: P99 is ${latencyP99Ms}ms (max allowed: ${challenge.maxLatencyP99Ms}ms)`);
  }

  const qpsPassed = achievedQps >= challenge.targetQps * 0.9;
  if (qpsPassed) {
    passedChecks.push(`Throughput sustained: ${achievedQps.toLocaleString()} QPS >= ${challenge.targetQps.toLocaleString()} QPS`);
  } else {
    failedChecks.push(`Insufficient throughput: only ${achievedQps.toLocaleString()} QPS supported`);
  }

  const availabilityPassed = availabilityPct >= challenge.minAvailabilityPct;
  if (availabilityPassed) {
    passedChecks.push(`SLA Availability met: ${availabilityPct}% >= ${challenge.minAvailabilityPct}%`);
  } else {
    failedChecks.push(`Availability SLA failed: ${availabilityPct}% < ${challenge.minAvailabilityPct}%`);
  }

  // 7. Scoring & Decision
  let score = 0;
  if (!hasForbiddenAntipattern) score += 20;
  if (missingRequired.length === 0) score += 25;
  else score += Math.max(0, 25 - missingRequired.length * 8);
  if (spofNodes.length === 0) score += 15;
  if (latencyPassed) score += 15;
  if (qpsPassed) score += 15;
  if (availabilityPassed) score += 10;
  score = Math.min(100, Math.max(0, score));

  const success = score >= 80 && !hasForbiddenAntipattern && latencyPassed && qpsPassed;

  if (success) {
    addLog("success", `Architecture Verification PASSED! Score: ${score}/100.`);
  } else {
    addLog("error", `Architecture Verification FAILED with score: ${score}/100. Resolve bottlenecks and rerun.`);
  }

  return {
    success,
    score,
    achievedQps,
    targetQps: challenge.targetQps,
    latencyP99Ms,
    maxAllowedLatencyMs: challenge.maxLatencyP99Ms,
    availabilityPct,
    spofCount: spofNodes.length,
    spofNodes,
    cacheHitRatioPct,
    bottlenecks,
    passedChecks,
    failedChecks,
    logs,
  };
}
