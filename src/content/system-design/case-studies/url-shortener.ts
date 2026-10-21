import { SystemDesignCaseStudy } from "@/types";

export const urlShortenerCaseStudy: SystemDesignCaseStudy = {
  id: "sd-url-shortener",
  slug: "url-shortener",
  title: "Design a Scalable URL Shortener (TinyURL / Bitly)",
  subtitle: "High-throughput, sub-10ms redirect latency, and petabyte-scale key generation.",
  level: "Intermediate",
  readTime: "25 mins",
  description:
    "Design a web service that takes long URLs and produces short, unique 7-character aliases that redirect users with ultra-low latency.",

  functionalRequirements: [
    "Given a long URL, generate a unique, short alias (e.g. https://dev.sh/7aB9xQ).",
    "When a user accesses the short link, redirect them via HTTP 301 or 302 to the original destination URL in < 15ms.",
    "Support custom aliases (vanity URLs) with validation and uniqueness enforcement.",
    "Links can have an optional expiration date (TTL) after which they are reclaimed or deactivated.",
    "Record click analytics (timestamp, country, referer) without slowing down the primary redirect path.",
  ],

  nonFunctionalRequirements: [
    "High availability: The system must be 99.99% available; redirect failures severely degrade user trust.",
    "Ultra-low latency: Read redirects must execute with P99 < 15ms globally.",
    "Read-heavy ratio: 100:1 read-to-write ratio (100 redirects for every 1 short link created).",
    "Unpredictability: Short keys should not be trivially guessable or sequentially enumerable to protect private shared links.",
  ],

  capacityEstimates: [
    {
      metric: "Write QPS",
      value: "~115 writes / second",
      rationale: "100 million new URLs / month / (30 days * 86,400s) ≈ 38 writes/sec average. Peak traffic (3x) ≈ 115 writes/sec.",
    },
    {
      metric: "Read QPS",
      value: "~11,500 reads / second",
      rationale: "100:1 read ratio. 38 * 100 = 3,800 reads/sec average. Peak traffic (3x) ≈ 11,500 reads/sec.",
    },
    {
      metric: "5-Year Storage",
      value: "~3 TB",
      rationale: "100M URLs/month * 12 months * 5 years = 6 billion records. At ~500 bytes per record (ID + shortURL + longURL + metadata), 6B * 500B = 3 Terabytes.",
    },
    {
      metric: "Memory Cache (20% Pareto Rule)",
      value: "~170 GB RAM",
      rationale: "Daily reads = 330 million requests. 20% of hot URLs = 66 million URLs. 66M * 500 bytes = 33 GB per day. Caching 5 days of hot keys = ~165 GB RAM.",
    },
  ],

  apiDesign: [
    {
      method: "POST",
      endpoint: "/api/v1/urls",
      description: "Generates a new short URL alias for a submitted long URL.",
      requestBody: JSON.stringify(
        {
          originalUrl: "https://engineering.googleblog.com/2026/02/advances-in-distributed-systems.html",
          customAlias: "dist-sys-26",
          expiresAt: "2027-01-01T00:00:00Z",
        },
        null,
        2
      ),
      responseBody: JSON.stringify(
        {
          shortUrl: "https://dev.sh/dist-sys-26",
          shortCode: "dist-sys-26",
          createdAt: "2026-03-01T12:00:00Z",
        },
        null,
        2
      ),
    },
    {
      method: "GET",
      endpoint: "/:shortCode",
      description: "Redirects the client to the canonical destination URL.",
      responseBody: "HTTP 302 Found\nLocation: https://engineering.googleblog.com/...\nCache-Control: private, max-age=90",
    },
  ],

  dataModel: [
    {
      entity: "UrlMapping",
      fields: ["short_code (VARCHAR(7), PK)", "original_url (VARCHAR(2048))", "user_id (UUID)", "created_at (TIMESTAMP)", "expires_at (TIMESTAMP)"],
      dbChoice: "NoSQL Key-Value / Wide-Column (DynamoDB or Cassandra) or Relational (PostgreSQL with B-tree index)",
      rationale: "Data has no complex relational joins. Key-value lookup on short_code is O(1). DynamoDB or Cassandra scale horizontally with zero downtime.",
    },
    {
      entity: "ClickAnalytics",
      fields: ["event_id (UUID, PK)", "short_code (VARCHAR(7))", "timestamp (TIMESTAMP)", "ip_hash (VARCHAR(64))", "country (CHAR(2))", "user_agent (VARCHAR(256))"],
      dbChoice: "Time-series OLAP (ClickHouse or Apache Pinot) via Kafka",
      rationale: "Analytics writes should never touch the operational OLTP database; stream to Kafka and ingest in batches.",
    },
  ],

  diagramNodes: [
    {
      id: "client",
      label: "Clients (Web / Mobile)",
      type: "client",
      description: "Browsers and apps requesting short link redirections or creating new shortened links.",
      tradeoffs: "Global distribution causes varying network latency without edge routing.",
      bottlenecks: "DNS lookup latency and last-mile cellular packet loss.",
    },
    {
      id: "dns-cdn",
      label: "Anycast DNS & CDN Edge",
      type: "gateway",
      description: "Cloudflare/Route 53 terminating SSL at the edge and executing 301/302 redirects for ultra-hot links directly from edge workers.",
      tradeoffs: "Edge caching means link deactivation can take up to TTL duration to propagate.",
      bottlenecks: "Cache invalidation synchronization across 300+ edge PoPs.",
    },
    {
      id: "load-balancer",
      label: "L7 Reverse Proxy & Load Balancer",
      type: "gateway",
      description: "NGINX / AWS ALB balancing HTTP/3 traffic across application instances with health check polling.",
      tradeoffs: "Adds 1-2ms hop overhead but provides DDoS shielding and rate limiting.",
      bottlenecks: "Single point of failure if not configured across multiple availability zones.",
    },
    {
      id: "app-service",
      label: "URL Application Service",
      type: "service",
      description: "Stateless containerized Go/Node microservice handling encoding, validation, and cache lookups.",
      tradeoffs: "Completely stateless: allows horizontal scaling from 2 to 200 nodes during traffic spikes.",
      bottlenecks: "Connection pool exhaustion to cache or database under sudden burst traffic.",
    },
    {
      id: "keygen-service",
      label: "Key Generation Service (KGS)",
      type: "service",
      description: "Pre-generates unique 7-character base62 strings in advance and allocates batches (e.g. 100,000 keys) to app nodes in memory.",
      tradeoffs: "If a server restarts, its allocated batch is burned/skipped, but collisions are mathematically 100% prevented.",
      bottlenecks: "ZooKeeper coordination if worker nodes constantly request key ranges.",
    },
    {
      id: "redis-cache",
      label: "Distributed Redis Cluster",
      type: "cache",
      description: "In-memory LRU key-value cache holding the top 20% most accessed URLs with sub-millisecond read latency.",
      tradeoffs: "Volatile memory; requires Redis replication and persistence (RDB/AOF) to survive cold boots.",
      bottlenecks: "Cache penetration / stampede if thousands of requests hit a newly expired key simultaneously.",
    },
    {
      id: "primary-db",
      label: "Primary Database (DynamoDB / PostgreSQL)",
      type: "database",
      description: "Durable persistent store holding URL mappings partitioned by hash of short_code.",
      tradeoffs: "High durability with multi-AZ replication at the cost of slight write latency.",
      bottlenecks: "Hot partitions if an influencer posts a single viral link without cache buffering.",
    },
    {
      id: "kafka-queue",
      label: "Kafka Event Stream",
      type: "queue",
      description: "Asynchronous log pipeline decoupling redirect responses from click tracking and analytics computation.",
      tradeoffs: "Eventual consistency for analytics dashboards in exchange for zero impact on redirect speed.",
      bottlenecks: "Consumer lag if analytical processing pipeline slows down.",
    },
  ],

  readFlow: [
    "1. User navigates to https://dev.sh/7aB9xQ in browser.",
    "2. Request hits Anycast CDN Edge; if cached at edge, returns 302 immediately (latency < 10ms).",
    "3. CDN misses and forwards request to Layer 7 Load Balancer, routing to an App Service node.",
    "4. App Service queries Redis cache by key `short_code:7aB9xQ`.",
    "5. Cache Hit: Returns long URL from RAM (< 1ms).",
    "6. Cache Miss: Queries Primary Database by primary key `short_code`, populates Redis, and returns URL.",
    "7. App Service issues HTTP 302 Found redirect with `Location: <destination>`.",
    "8. Asynchronously fires click event payload to Kafka topic `link-clicks`.",
  ],

  writeFlow: [
    "1. Client sends POST /api/v1/urls with original long URL.",
    "2. App Service checks if custom alias is requested: if yes, checks uniqueness in DB; if no, claims a pre-generated token from its local KGS memory buffer.",
    "3. App Service writes record to Database with short code, original URL, user ID, and TTL.",
    "4. App Service writes key to Redis cache.",
    "5. App Service returns HTTP 201 Created with shortened link.",
  ],

  scalingBottlenecks: [
    "Hot Partitions: A single viral URL receiving 50,000 requests/second hits one cache node. Solution: Multi-tier local in-process cache (L1 LRU cache on application nodes) + Redis Cluster (L2).",
    "Cache Stampede: When a hot key expires, 10,000 concurrent requests miss cache and slam the database simultaneously. Solution: Mutex locking (probabilistic early expiration via XFetch algorithm).",
  ],

  failureModes: [
    "Redis Cluster Crash: Requests fall back to database. To prevent database collapse, implement circuit breakers and aggressive DB read-replicas.",
    "KGS Crashes: Application nodes retain a buffer of 100,000 keys; standby KGS instances recover key ranges using ZooKeeper leases.",
  ],

  interviewChecklist: [
    {
      stage: "1. Clarify Requirements & Scope",
      prompt: "Confirm functional capabilities, scale expectations, traffic patterns, and redirect semantics (301 vs 302).",
      hints: ["301 is permanent redirect (browser caches locally, losing analytics); 302 is temporary (browser always queries server, preserving analytics).", "Clarify whether custom aliases and expiration TTLs are needed."],
      referenceAnswer: "State clearly: 'We will target 100M writes/month and 10B reads/month (~11k read QPS). We will use HTTP 302 redirects to guarantee reliable click analytics tracking. System must have P99 < 15ms latency and 99.99% availability.'",
    },
    {
      stage: "2. Back-of-the-Envelope Estimation",
      prompt: "Calculate QPS, storage footprint for 5 years, and memory needed for 80/20 caching.",
      hints: ["100M / (30 * 86,400) ≈ 38 write QPS. Peak 3x = ~115 QPS.", "100:1 read ratio gives 11,500 read QPS.", "6B links * 500 bytes = 3TB storage; 20% daily reads cached = ~170GB RAM."],
      referenceAnswer: "Present the numbers cleanly on the whiteboard: Storage is modest (3TB), but read throughput is high (11,500 QPS). Caching is the primary architectural lever, requiring ~170GB RAM across a 3-node Redis cluster.",
    },
    {
      stage: "3. API & Data Model Definition",
      prompt: "Define RESTful or gRPC interfaces and choose between SQL vs NoSQL schema.",
      hints: ["Primary key is short_code.", "NoSQL Key-Value (DynamoDB) avoids relational join overhead and offers automatic multi-region partitioning."],
      referenceAnswer: "Specify POST /api/v1/urls and GET /:shortCode. Choose DynamoDB or Cassandra: primary key is short_code string. The schema has no relational dependencies, maximizing single-key lookup throughput.",
    },
    {
      stage: "4. Key Generation Strategy",
      prompt: "Address how to generate unique 7-character Base62 keys without collisions or race conditions.",
      hints: ["MD5/SHA-256 truncation causes hash collisions.", "Pre-generating keys with a dedicated Key Generation Service (KGS) completely eliminates collision detection overhead at write time."],
      referenceAnswer: "Using 62 characters ([a-z, A-Z, 0-9]), 62^7 = ~3.5 trillion unique combinations. Rather than computing hashes and resolving collisions at write time, implement a Key Generation Service (KGS) that generates sequential IDs using ZooKeeper ranges and base62-encodes them in advance.",
    },
    {
      stage: "5. High-Level Architecture",
      prompt: "Draw the component topology from Client to CDN, Load Balancer, App Services, Cache, and Storage.",
      hints: ["Show asynchronous analytics pipeline via Kafka to avoid blocking the user redirect response."],
      referenceAnswer: "Walk through the diagram: Client -> CDN -> ALB -> Stateless App Nodes -> Redis Cluster -> DynamoDB. Offload click tracking to Kafka to guarantee sub-15ms redirects.",
    },
    {
      stage: "6. Deep Dives & Bottlenecks",
      prompt: "Explain how to handle hot links, cache stampedes, and database partition hotspots.",
      hints: ["Mention L1 memory cache on web workers.", "Mention probabilistic early expiration (XFetch algorithm) for cache stamps."],
      referenceAnswer: "Mitigate hot spots with a 2-tier caching strategy: local memory cache (L1) on Go application instances to absorb extreme bursts (100k QPS for a single key) without network hops to Redis (L2). Use XFetch to refresh cache before keys expire.",
    },
    {
      stage: "7. Failure Modes & Resilience",
      prompt: "What happens if Redis fails? What if the database region goes offline?",
      hints: ["Circuit breaker with fallback.", "Multi-region active-active database replication."],
      referenceAnswer: "If Redis fails, circuit breakers throttle traffic to database read replicas to avoid cascading failure. For disaster recovery, deploy across two active AWS regions using DynamoDB Global Tables with Anycast routing.",
    },
    {
      stage: "8. Trade-offs & Review",
      prompt: "Summarize final architectural trade-offs: 301 vs 302, KGS key burning on crash, and eventual consistency for analytics.",
      hints: ["Every engineering decision has a cost; articulate why your trade-offs are optimal for this problem."],
      referenceAnswer: "Conclude by reiterating: We chose 302 redirects for analytics precision despite slightly higher server load; we accepted key loss on KGS crashes because 3.5 trillion key space makes wasted keys inconsequential.",
    },
  ],
};
