import { RoadmapMilestone } from "@/types";

export const systemDesignRoadmapMilestones: RoadmapMilestone[] = [
  {
    id: "sd-m1-foundations",
    step: 1,
    title: "Networking, Client-Server & Scaling Basics",
    subtitle: "How packets travel across the Internet and hit web servers.",
    description: "Understand TCP vs UDP, HTTP/2 multiplexing, DNS resolution, Layer 4 vs Layer 7 load balancers, and vertical vs horizontal scaling trade-offs.",
    duration: "1 - 2 Weeks",
    prerequisites: ["Basic Web Development / Backend Architecture"],
    recommendedTopics: [
      { title: "Client-Server & Networking Fundamentals", slug: "client-server-networking", track: "system-design" },
      { title: "Latency, Throughput & High Availability", slug: "latency-throughput-availability", track: "system-design" },
      { title: "Horizontal vs Vertical Scaling & Load Balancing", slug: "scaling-principles", track: "system-design" },
    ],
    checkpointProblem: {
      title: "System Design Fundamentals Check",
      slug: "url-shortener",
    },
  },
  {
    id: "sd-m2-caching-storage",
    step: 2,
    title: "Polyglot Storage & Caching Topologies",
    subtitle: "Relational tables, document stores, key-value caches and CDNs.",
    description: "Master cache-aside, write-through, LRU evictions, Redis clustering, and learn when to choose PostgreSQL vs Cassandra vs DynamoDB with index optimization.",
    duration: "2 Weeks",
    prerequisites: ["Networking & Scaling Basics"],
    recommendedTopics: [
      { title: "Caching Layers & Eviction Policies", slug: "caching-strategies", track: "system-design" },
      { title: "SQL vs NoSQL & Polyglot Persistence", slug: "sql-vs-nosql", track: "system-design" },
      { title: "Blob Object Storage & Edge CDNs", slug: "object-storage-cdns", track: "system-design" },
    ],
    checkpointProblem: {
      title: "Design a Scalable URL Shortener",
      slug: "url-shortener",
    },
  },
  {
    id: "sd-m3-distributed-systems",
    step: 3,
    title: "Distributed Data, Replication & Consistency",
    subtitle: "Handling network partitions, quorum reads/writes, and the CAP theorem.",
    description: "Primary-replica lag, multi-datacenter replication, consistent hashing rings, CAP/PACELC trade-offs, and distributed consensus (Raft/Paxos).",
    duration: "3 Weeks",
    prerequisites: ["Polyglot Storage & Caching"],
    recommendedTopics: [
      { title: "Database Replication, Partitioning & Sharding", slug: "replication-sharding", track: "system-design" },
      { title: "CAP Theorem & Consistency Models", slug: "cap-theorem-consistency", track: "system-design" },
      { title: "Distributed Locks & Idempotency", slug: "distributed-locks-idempotency", track: "system-design" },
    ],
    checkpointProblem: {
      title: "Design an API Rate Limiter",
      slug: "rate-limiter",
    },
  },
  {
    id: "sd-m4-streaming-reliability",
    step: 4,
    title: "Event-Driven Queues & Resilient Architectures",
    subtitle: "Kafka streaming, backpressure, circuit breakers, and zero-loss pipelines.",
    description: "Decouple synchronous APIs using Kafka and RabbitMQ. Design circuit breakers, exponential backoff with jitter, dead letter queues, and observability tracing.",
    duration: "2 - 3 Weeks",
    prerequisites: ["Distributed Data & Replication"],
    recommendedTopics: [
      { title: "Message Queues & Event-Driven Architecture", slug: "message-queues-events", track: "system-design" },
      { title: "Observability: Metrics, Logs & Distributed Tracing", slug: "observability-monitoring", track: "system-design" },
      { title: "Fault Tolerance, Circuit Breakers & DR", slug: "fault-tolerance-disaster-recovery", track: "system-design" },
    ],
  },
];
