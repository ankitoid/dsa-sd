import { DSALesson } from "@/types";

export const graphTraversalLesson: DSALesson = {
  id: "dsa-graph-traversal-bfs-dfs",
  slug: "graph-traversal",
  topicSlug: "graph-traversal",
  topicTitle: "Graph Traversal (BFS & DFS)",
  title: "Graph Traversal: Breadth-First & Depth-First Mechanics",
  subtitle: "Systematic graph exploration, shortest paths in unweighted networks, and cycle detection.",
  level: "Intermediate",
  estimatedMinutes: 35,
  prerequisites: ["Stacks, Queues & Ring Buffers", "Recursion & Call Stack Mechanics", "Graph Representations"],

  problemSolved:
    "Unlike linear arrays or trees with unique root-to-leaf paths, general graphs may contain arbitrary cycles, disconnected components, and multiple distinct paths between nodes. A naive traversal gets caught in infinite loops. Graph traversal algorithms (BFS and DFS) use systematic visited state tracking to explore all reachable vertices exactly once in O(V + E) time.",

  intuition:
    "BFS is like dropping a pebble in calm water: ripples expand outward concentrically one hop at a time. Every vertex at distance 1 is visited before any vertex at distance 2. DFS is like exploring a dark maze: you follow a single path as deeply as possible until you hit a dead end, then backtrack to the most recent intersection to explore alternative branches.",

  mechanismSteps: [
    {
      step: 1,
      title: "Choose Frontier Data Structure",
      description: "BFS uses a FIFO Queue to ensure layer-by-layer expansion. DFS uses a LIFO Stack (or implicit call stack frames).",
    },
    {
      step: 2,
      title: "Initialize Visited Set",
      description: "Mark the origin vertex as visited before pushing it to the frontier. Crucial invariant: mark visited *at insertion time* to prevent duplicate queue enqueueing.",
    },
    {
      step: 3,
      title: "Expand Neighbors",
      description: "Pop the next vertex `u`. For every unvisited neighbor `v` in `adj[u]`, record path/distance, mark `v` as visited, and push `v` to frontier.",
    },
    {
      step: 4,
      title: "Exhaust All Components",
      description: "Repeat until frontier is empty. If the graph is disconnected, iterate across all vertices 0 to V-1, launching a traversal from any unvisited node.",
    },
  ],

  visualizationType: "graph-traversal",

  workedExample: {
    problemStatement: "Find the shortest path distance in an unweighted graph from node 0 to node 5 with edges: (0-1), (0-2), (1-3), (2-4), (3-5), (4-5).",
    input: "V = 6, edges = [[0,1],[0,2],[1,3],[2,4],[3,5],[4,5]], start = 0, target = 5",
    output: "Shortest distance = 3 hops (0 -> 1 -> 3 -> 5 or 0 -> 2 -> 4 -> 5)",
    explanation: "BFS Layer 0: {0}. BFS Layer 1: {1, 2}. BFS Layer 2: {3, 4}. BFS Layer 3: {5}. Since node 5 was reached at Layer 3, the shortest path is guaranteed to be 3 edges.",
  },

  pseudocode: `function bfs(graph: AdjacencyList, startNode: Node):
    queue = new Queue()
    visited = new Set()

    queue.enqueue(startNode)
    visited.add(startNode)

    while not queue.isEmpty():
        current = queue.dequeue()
        process(current)

        for neighbor in graph[current]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.enqueue(neighbor)`,

  codeImplementations: [
    {
      language: "TypeScript",
      code: `export function breadthFirstSearch(adj: number[][], start: number): number[] {
  const visited = new Set<number>();
  const queue: number[] = [start];
  const order: number[] = [];

  visited.add(start);

  while (queue.length > 0) {
    const node = queue.shift()!;
    order.push(node);

    for (const neighbor of adj[node] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }

  return order;
}`,
    },
    {
      language: "Python",
      code: `from collections import deque

def bfs(adj: list[list[int]], start: int) -> list[int]:
    visited = {start}
    queue = deque([start])
    order = []

    while queue:
        node = queue.popleft()
        order.append(node)

        for neighbor in adj[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)

    return order`,
    },
  ],

  complexity: {
    time: "O(V + E)",
    timeExplanation: "Every vertex is enqueued/visited at most once O(V), and every edge is traversed across adjacency lists at most twice in undirected graphs or once in directed graphs O(E).",
    space: "O(V)",
    spaceExplanation: "The visited set and queue/recursion stack hold at most V vertices simultaneously.",
  },

  commonMistakes: [
    "Marking visited on pop instead of push: Enqueuing a neighbor without immediately marking it visited causes duplicate queue entries, causing worst-case exponential memory explosion.",
    "Cycle ignorance: Forgetting the visited set entirely on cyclic graphs causes infinite recursive call stack overflows.",
    "Unweighted vs Weighted: Using BFS for shortest paths on graphs with varying edge weights. BFS only computes shortest paths when all edges have uniform weight; use Dijkstra for weighted graphs.",
  ],

  practiceProblems: [
    {
      title: "Number of Islands",
      difficulty: "Medium",
      platform: "LeetCode",
      url: "https://leetcode.com/problems/number-of-islands/",
    },
    {
      title: "Clone Graph",
      difficulty: "Medium",
      platform: "LeetCode",
      url: "https://leetcode.com/problems/clone-graph/",
    },
    {
      title: "Word Ladder (Shortest Path)",
      difficulty: "Hard",
      platform: "LeetCode",
      url: "https://leetcode.com/problems/word-ladder/",
    },
  ],

  interviewInsights: [
    "BFS guarantees shortest path in unweighted graphs because it processes nodes in strictly non-decreasing order of edge distance.",
    "DFS is ideal for topological sorting, cycle detection via back-edges, and connected component labeling.",
  ],

  keyTakeaways: [
    "BFS = Queue (FIFO), layer-by-layer; DFS = Stack/Recursion (LIFO), path-deepening.",
    "Always mark visited at time of enqueue to guard against O(E^2) duplication.",
    "Time complexity is linear with respect to graph size: O(V + E).",
  ],

  relatedConcepts: [
    { title: "Shortest Paths (Dijkstra)", slug: "shortest-paths" },
    { title: "Topological Sorting & DAGs", slug: "graph-traversal" },
    { title: "Disjoint Set Union", slug: "disjoint-set-union" },
  ],
};
