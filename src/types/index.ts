export type Difficulty = "Beginner" | "Intermediate" | "Advanced";
export type ProblemDifficulty = "Easy" | "Medium" | "Hard";

export type ArchitectureNodeType =
  | "client"
  | "cdn"
  | "dns"
  | "load-balancer"
  | "api-gateway"
  | "service"
  | "cache"
  | "database"
  | "nosql"
  | "read-replica"
  | "queue"
  | "worker"
  | "storage";

export interface ArchitectureCanvasNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    label: string;
    sublabel?: string;
    nodeType: ArchitectureNodeType;
    instances?: number;
    description?: string;
  };
}

export interface ArchitectureCanvasEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  animated?: boolean;
}

export interface SystemDesignChallenge {
  id: string;
  slug: string;
  title: string;
  difficulty: ProblemDifficulty;
  category: string;
  estimatedTime: string;
  scenario: string;
  requirements: {
    functional: string[];
    nonFunctional: {
      targetQps: number;
      maxP99LatencyMs: number;
      requiredAvailability: string;
      dataDurability: string;
    };
  };
  architectureRules: {
    requiredNodeTypes: ArchitectureNodeType[];
    forbiddenDirectConnections?: Array<[ArchitectureNodeType, ArchitectureNodeType]>;
    mustHaveCache?: boolean;
    mustHaveLoadBalancer?: boolean;
    mustDecoupleAsync?: boolean;
    minServiceReplicas?: number;
  };
  starterNodes: ArchitectureCanvasNode[];
  starterEdges: ArchitectureCanvasEdge[];
  hints: string[];
  referenceExplanation: string;
}

export interface SimulationReport {
  status: "PASSED" | "FAILED" | "WARNING";
  score: number;
  metrics: {
    throughputQps: number;
    p99LatencyMs: number;
    availability: string;
    cacheHitRate: number;
    spofCount: number;
    costTier: "Low" | "Medium" | "High" | "Enterprise";
  };
  passedChecks: string[];
  warnings: string[];
  errors: string[];
  simulationLogs: string[];
}

export interface DSATopic {
  id: string;
  slug: string;
  title: string;
  category: "Fundamentals" | "Data Structures" | "Algorithms";
  level: Difficulty;
  description: string;
  lessonCount: number;
  duration: string;
  iconName: string;
}

export interface DSALesson {
  id: string;
  slug: string;
  topicSlug: string;
  topicTitle: string;
  title: string;
  subtitle: string;
  level: Difficulty;
  estimatedMinutes: number;
  prerequisites: string[];
  
  problemSolved: string;
  intuition: string;
  mechanismSteps: Array<{
    step: number;
    title: string;
    description: string;
  }>;
  visualizationType?: "binary-search" | "sliding-window" | "graph-traversal";
  workedExample: {
    problemStatement: string;
    input: string;
    output: string;
    explanation: string;
  };
  pseudocode: string;
  codeImplementations: Array<{
    language: string;
    code: string;
  }>;
  complexity: {
    time: string;
    timeExplanation: string;
    space: string;
    spaceExplanation: string;
  };
  commonMistakes: string[];
  practiceProblems: Array<{
    title: string;
    difficulty: ProblemDifficulty;
    platform: "LeetCode" | "GeeksforGeeks" | "DevMastery";
    url: string;
  }>;
  interviewInsights: string[];
  keyTakeaways: string[];
  relatedConcepts: Array<{
    title: string;
    slug: string;
  }>;
}

export interface SystemDesignTopic {
  id: string;
  slug: string;
  title: string;
  category: "Foundations" | "Storage & Caching" | "Distributed Systems" | "Reliability & Scale";
  level: Difficulty;
  description: string;
  duration: string;
  iconName: string;
}

export interface SystemDesignCaseStudy {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  level: Difficulty;
  readTime: string;
  description: string;
  functionalRequirements: string[];
  nonFunctionalRequirements: string[];
  capacityEstimates: Array<{
    metric: string;
    value: string;
    rationale: string;
  }>;
  apiDesign: Array<{
    method: "GET" | "POST" | "PUT" | "DELETE";
    endpoint: string;
    description: string;
    requestBody?: string;
    responseBody: string;
  }>;
  dataModel: Array<{
    entity: string;
    fields: string[];
    dbChoice: string;
    rationale: string;
  }>;
  diagramNodes: Array<{
    id: string;
    label: string;
    type: "client" | "gateway" | "service" | "cache" | "database" | "queue";
    description: string;
    tradeoffs: string;
    bottlenecks: string;
  }>;
  readFlow: string[];
  writeFlow: string[];
  scalingBottlenecks: string[];
  failureModes: string[];
  interviewChecklist: Array<{
    stage: string;
    prompt: string;
    hints: string[];
    referenceAnswer: string;
  }>;
}

export interface PracticeProblem {
  id: string;
  slug: string;
  title: string;
  difficulty: ProblemDifficulty;
  category: string;
  acceptanceRate: string;
  description: string;
  examples: Array<{
    input: string;
    output: string;
    explanation?: string;
  }>;
  constraints: string[];
  starterCode: {
    typescript: string;
    python: string;
    javascript: string;
  };
  solutionCode: {
    typescript: string;
    python: string;
  };
  hints: string[];
  externalUrl?: string;
  externalPlatform?: "LeetCode" | "GeeksforGeeks";
  isLocalExecutable: boolean;
  testCases: Array<{
    input: any[];
    expected: any;
  }>;
}

export interface RoadmapMilestone {
  id: string;
  step: number;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  prerequisites: string[];
  recommendedTopics: Array<{
    title: string;
    slug: string;
    track: "dsa" | "system-design";
  }>;
  checkpointProblem?: {
    title: string;
    slug: string;
  };
}

export interface UserProgressState {
  completedLessons: string[];
  bookmarkedItems: Array<{
    id: string;
    title: string;
    href: string;
    type: "dsa-lesson" | "sd-case-study" | "problem";
    dateAdded: string;
  }>;
  solvedProblems: string[];
  solvedSdChallenges: string[];
  revisionQueue: Array<{
    id: string;
    title: string;
    href: string;
    intervalDays: number;
    nextReviewDate: string;
    reason: string;
  }>;
  dailyGoalMinutes: number;
  minutesSpentToday: number;
  streakDays: number;
}

// -------------------------------------------------------------
// Interactive System Design Studio & Architecture Simulator Types
// -------------------------------------------------------------

export type ArchitectureNodeType =
  | "client"
  | "cdn"
  | "dns"
  | "load_balancer"
  | "api_gateway"
  | "service"
  | "cache"
  | "database"
  | "read_replica"
  | "nosql"
  | "queue"
  | "worker"
  | "storage";

export interface ArchitectureNodeData {
  label: string;
  nodeType: ArchitectureNodeType;
  sublabel?: string;
  capacityQps?: number;
  baseLatencyMs?: number;
  isSpofRisk?: boolean;
  status?: "healthy" | "overloaded" | "offline" | "idle";
  description?: string;
  config?: Record<string, any>;
  [key: string]: unknown;
}

export interface ArchitectureCanvasNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: ArchitectureNodeData;
}

export interface ArchitectureCanvasEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  animated?: boolean;
  style?: Record<string, any>;
}

export interface SystemDesignChallenge {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  level: Difficulty;
  category: string;
  estimatedMinutes: number;
  targetQps: number;
  maxLatencyP99Ms: number;
  minAvailabilityPct: number;
  description: string;
  functionalRequirements: string[];
  nonFunctionalRequirements: string[];
  constraints: string[];
  hints: string[];
  requiredComponents: ArchitectureNodeType[];
  forbiddenPatterns?: string[];
  starterNodes: ArchitectureCanvasNode[];
  starterEdges: ArchitectureCanvasEdge[];
  referenceSolution: {
    nodes: ArchitectureCanvasNode[];
    edges: ArchitectureCanvasEdge[];
    explanation: string;
  };
}

export interface SimulationReport {
  success: boolean;
  score: number;
  achievedQps: number;
  targetQps: number;
  latencyP99Ms: number;
  maxAllowedLatencyMs: number;
  availabilityPct: number;
  spofCount: number;
  spofNodes: string[];
  cacheHitRatioPct: number;
  bottlenecks: string[];
  passedChecks: string[];
  failedChecks: string[];
  logs: Array<{
    timestamp: string;
    level: "info" | "warn" | "error" | "success";
    message: string;
  }>;
}

