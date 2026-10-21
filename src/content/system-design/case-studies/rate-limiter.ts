import { SystemDesignCaseStudy } from "@/types";

export const rateLimiterCaseStudy: SystemDesignCaseStudy = {
  id: "sd-rate-limiter",
  slug: "rate-limiter",
  title: "Design an API Rate Limiter & Token Bucket",
  subtitle: "Protecting infrastructure from DDoS, brute-force attacks, and multi-tenant resource starvation.",
  level: "Intermediate",
  readTime: "22 mins",
  description:
    "Design a distributed rate limiter that throttles excessive API requests, protecting downstream services with microsecond latency overhead.",

  functionalRequirements: [
    "Limit client requests based on IP address, User ID, or API Key (e.g. 100 requests per minute per user).",
    "Return HTTP 429 Too Many Requests with headers `X-RateLimit-Limit`, `X-RateLimit-Remaining`, and `Retry-After`.",
    "Support configurable rate-limiting rules across different tiers (free vs paid API keys) and specific API routes.",
    "Low latency overhead: rate check must complete in < 2ms without degrading core API performance.",
  ],

  nonFunctionalRequirements: [
    "Distributed accuracy: Rate limiting must operate consistently across a cluster of 50+ API gateway nodes.",
    "Fault tolerance: If rate limiter services fail, fail open (graceful degradation) to prevent blocking legitimate customer traffic.",
    "Memory efficiency: Support 100 million active daily users with minimal memory footprint.",
  ],

  capacityEstimates: [
    {
      metric: "Total Requests",
      value: "50,000 requests / second",
      rationale: "Global API platform servicing 500 million daily API calls across distributed regions.",
    },
    {
      metric: "Active Users Memory",
      value: "~6.4 GB RAM",
      rationale: "100M active user keys. In Redis Token Bucket: key (32 bytes) + tokens count (8 bytes) + last timestamp (8 bytes) + metadata ≈ 64 bytes/user. 100M * 64B ≈ 6.4 GB.",
    },
    {
      metric: "Latency Budget",
      value: "< 2ms P99",
      rationale: "Rate checking is on the critical hot path of every incoming API request.",
    },
  ],

  apiDesign: [
    {
      method: "POST",
      endpoint: "/api/v1/auth/login",
      description: "Example protected endpoint subjected to rate limiting.",
      responseBody: "HTTP/1.1 429 Too Many Requests\nX-RateLimit-Limit: 10\nX-RateLimit-Remaining: 0\nRetry-After: 42\nContent-Type: application/json\n\n{\"error\": \"Rate limit exceeded. Try again in 42 seconds.\"}",
    },
  ],

  dataModel: [
    {
      entity: "RateLimitBucket",
      fields: ["key (VARCHAR, PK)", "tokens (FLOAT)", "last_refill_timestamp (INT64)"],
      dbChoice: "In-memory Redis via Lua script",
      rationale: "Atomic Token Bucket evaluation via Redis Lua script avoids distributed race conditions.",
    },
    {
      entity: "RateLimitRules",
      fields: ["rule_id (UUID)", "client_tier (ENUM)", "route_pattern (VARCHAR)", "max_tokens (INT)", "refill_rate (FLOAT)"],
      dbChoice: "Cached configuration file / Redis Hash",
      rationale: "Rules are read-frequently, updated-rarely; sync to gateway memory every 60s.",
    },
  ],

  diagramNodes: [
    {
      id: "client",
      label: "API Clients",
      type: "client",
      description: "Third-party applications, mobile apps, and frontends invoking public APIs.",
      tradeoffs: "High concurrency and bursty traffic patterns.",
      bottlenecks: "Network retransmissions and jitter.",
    },
    {
      id: "api-gateway",
      label: "API Gateway (Envoy / Kong)",
      type: "gateway",
      description: "Intercepts incoming requests and evaluates rate limit tokens before forwarding to internal services.",
      tradeoffs: "Adds minimal proxy latency (0.5ms).",
      bottlenecks: "CPU saturation during massive DDoS attacks.",
    },
    {
      id: "rate-limit-service",
      label: "Distributed Rate Limit Engine",
      type: "service",
      description: "Executes Token Bucket / Sliding Window algorithms using atomic Redis Lua scripts.",
      tradeoffs: "Centralized state ensures accuracy across all gateway nodes.",
      bottlenecks: "Network latency to Redis cluster under high QPS.",
    },
    {
      id: "redis-cluster",
      label: "Redis In-Memory Cluster",
      type: "cache",
      description: "Ultra-fast memory store holding token buckets, sorted sets for sliding logs, and user quota counters.",
      tradeoffs: "RAM is more expensive than disk, but yields sub-millisecond lookups.",
      bottlenecks: "Network bandwidth saturation at 50,000+ commands/sec.",
    },
    {
      id: "rules-db",
      label: "Rules Configuration Store",
      type: "database",
      description: "Relational DB holding tiered quota limits (Free: 100/min, Pro: 10,000/min) cached in memory.",
      tradeoffs: "Changes take up to 60 seconds to propagate to edge gateways.",
      bottlenecks: "None; read purely from local worker caches.",
    },
    {
      id: "backend-service",
      label: "Core Protected Backend Microservices",
      type: "service",
      description: "Downstream checkout, auth, and search services protected from cascading overload.",
      tradeoffs: "Protected from traffic spikes.",
      bottlenecks: "Database queries and external payment provider APIs.",
    },
  ],

  readFlow: [
    "1. Client makes an HTTP request to API Gateway.",
    "2. Gateway extracts identifier: API Key header, OAuth JWT user_id, or client IP.",
    "3. Gateway queries Rate Limit Engine with (client_key, endpoint, cost).",
    "4. Rate Limit Engine runs atomic Lua script in Redis (Token Bucket algorithm).",
    "5. If tokens >= cost: tokens decremented, request allowed, Gateway adds rate-limit headers and forwards to Backend.",
    "6. If tokens < cost: request rejected with HTTP 429 and Retry-After header.",
  ],

  writeFlow: [
    "1. Admin updates rate limit tier from 100 to 500 req/min in Dashboard.",
    "2. Rules DB updates record and publishes an invalidation event to Redis Pub/Sub.",
    "3. API Gateway nodes reload configuration rules in memory.",
  ],

  scalingBottlenecks: [
    "Race Conditions: Two concurrent requests read tokens=1 simultaneously and both succeed. Solution: Redis Lua script executes atomically in single-threaded Redis core.",
    "Cross-Region Latency: If Gateway in London calls Redis in US-East, latency is 80ms. Solution: Local multi-datacenter rate limiting with synchronized background quotas.",
  ],

  failureModes: [
    "Redis Cluster Becomes Unreachable: Gateway fails open, allowing requests through while alerting SRE team, preventing total service outage.",
  ],

  interviewChecklist: [
    {
      stage: "1. Clarify Requirements & Scope",
      prompt: "Identify the throttling granularity (IP, User, API Key) and whether it's client-side or server-side.",
      hints: ["IP-based can unfairly penalize users behind corporate NATs.", "User/API Key-based is preferred for authenticated systems."],
      referenceAnswer: "We will build a server-side distributed rate limiter at the API gateway layer supporting User ID and API Key granularity with IP fallback for public endpoints.",
    },
    {
      stage: "2. Algorithm Selection (Token Bucket vs Sliding Window)",
      prompt: "Compare Token Bucket, Leaking Bucket, Fixed Window Counter, and Sliding Window Log.",
      hints: ["Token Bucket allows bursts and is memory efficient (O(1)).", "Sliding Window Log prevents boundary spikes but requires high memory."],
      referenceAnswer: "Select the Token Bucket algorithm: it allows natural traffic bursts up to bucket capacity, is mathematically straightforward to calculate on demand via timestamp delta, and requires only 2 numbers in memory per user.",
    },
    {
      stage: "3. Distributed State & Concurrency",
      prompt: "How do you avoid race conditions when multiple gateway nodes check rate limits simultaneously?",
      hints: ["Lua scripts execute atomically in Redis without needing distributed locks."],
      referenceAnswer: "Use Redis Lua scripts. Because Redis executes scripts atomically on a single thread, read-modify-write operations on tokens and timestamps occur with zero race conditions and no distributed locking overhead.",
    },
    {
      stage: "4. Edge Architecture & Multi-Region",
      prompt: "How do you maintain low latency when API gateways are deployed globally?",
      hints: ["Local in-memory counters synced periodically or consistent hash routing."],
      referenceAnswer: "Partition users across Redis clusters using consistent hashing. For multi-region deployments, use local rate limiters with token batching (e.g. reserving 100 tokens locally) to eliminate cross-datacenter round trips.",
    },
  ],
};
