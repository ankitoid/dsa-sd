import { RoadmapMilestone } from "@/types";

export const dsaRoadmapMilestones: RoadmapMilestone[] = [
  {
    id: "m1-foundations",
    step: 1,
    title: "Algorithmic Foundations & Complexity",
    subtitle: "Establish rigor in runtime boundaries and memory allocation.",
    description: "Learn how modern CPU hardware processes cache lines, RAM access penalties, and master Big-O, Big-Theta, Big-Omega proofs. Build deep recursive intuition without call stack overflow.",
    duration: "1 - 2 Weeks",
    prerequisites: ["Basic Programming in TS/Python/Java/C++"],
    recommendedTopics: [
      { title: "Complexity Analysis & Asymptotics", slug: "complexity-analysis", track: "dsa" },
      { title: "Recursion & Call Stack Mechanics", slug: "recursion-and-backtracking", track: "dsa" },
      { title: "Bit Manipulation & Low-Level Math", slug: "bit-manipulation", track: "dsa" },
    ],
    checkpointProblem: {
      title: "Binary Search (Classic)",
      slug: "binary-search",
    },
  },
  {
    id: "m2-linear-structures",
    step: 2,
    title: "Linear Data Structures & Fast Pointers",
    subtitle: "Contiguous arrays vs linked pointer node networks.",
    description: "Internalize array resizing amortization, two pointers, sliding window caterpillar technique, stacks, queues, and ring buffers for real-time streaming buffers.",
    duration: "2 - 3 Weeks",
    prerequisites: ["Algorithmic Foundations"],
    recommendedTopics: [
      { title: "Arrays & Contiguous Memory", slug: "arrays-and-strings", track: "dsa" },
      { title: "Two Pointers Strategy", slug: "two-pointers", track: "dsa" },
      { title: "Sliding Window Technique", slug: "sliding-window", track: "dsa" },
      { title: "Linked Lists & Pointer Manipulation", slug: "linked-lists", track: "dsa" },
      { title: "Stacks, Queues & Ring Buffers", slug: "stacks-and-queues", track: "dsa" },
    ],
    checkpointProblem: {
      title: "Longest Substring Without Repeating Characters",
      slug: "longest-substring-without-repeating-characters",
    },
  },
  {
    id: "m3-hash-trees",
    step: 3,
    title: "Hash Tables, Binary Trees & Heaps",
    subtitle: "Non-linear hierarchies and constant-time indexing.",
    description: "Hash collision resolution, BST invariants, recursive & iterative tree traversals, and binary heap array representations with Floyd sift-down mechanics.",
    duration: "3 Weeks",
    prerequisites: ["Linear Data Structures"],
    recommendedTopics: [
      { title: "Hash Tables & Collision Resolution", slug: "hash-maps-and-sets", track: "dsa" },
      { title: "Binary Trees & Binary Search Trees", slug: "binary-trees-and-bst", track: "dsa" },
      { title: "Heaps & Priority Queues", slug: "heaps-and-priority-queues", track: "dsa" },
    ],
    checkpointProblem: {
      title: "Merge Two Sorted Lists",
      slug: "merge-two-sorted-lists",
    },
  },
  {
    id: "m4-graphs-advanced",
    step: 4,
    title: "Graph Topologies & Shortest Paths",
    subtitle: "Navigate cyclic graphs, topological DAGs, and network flows.",
    description: "Adjacency structures, BFS for unweighted shortest paths, DFS for topological cycles and strongly connected components, Dijkstra's priority queue relaxation, and Union-Find.",
    duration: "3 - 4 Weeks",
    prerequisites: ["Stacks & Queues", "Trees & Heaps"],
    recommendedTopics: [
      { title: "Graph Traversal (BFS & DFS)", slug: "graph-traversal", track: "dsa" },
      { title: "Disjoint Set Union (DSU / Union-Find)", slug: "disjoint-set-union", track: "dsa" },
      { title: "Shortest Paths (Dijkstra)", slug: "shortest-paths", track: "dsa" },
    ],
    checkpointProblem: {
      title: "Valid Parentheses (Monotonic Stack)",
      slug: "valid-parentheses",
    },
  },
  {
    id: "m5-dynamic-programming",
    step: 5,
    title: "Dynamic Programming & Optimization",
    subtitle: "Overlapping subproblems and state transitions.",
    description: "Deconstruct problems into memoized DAGs. Move from top-down recursion with memoization to bottom-up tabular DP with rolling space compression.",
    duration: "4 Weeks",
    prerequisites: ["Recursion", "Complexity Analysis"],
    recommendedTopics: [
      { title: "Dynamic Programming & Memoization", slug: "dynamic-programming", track: "dsa" },
      { title: "Greedy Choice & Exchange Arguments", slug: "greedy-algorithms", track: "dsa" },
    ],
  },
];
