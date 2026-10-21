import { DSALesson, DSATopic } from "@/types";
import { dsaTopics } from "./curriculum";
import { binarySearchLesson } from "./lessons/binary-search";
import { slidingWindowLesson } from "./lessons/sliding-window";
import { graphTraversalLesson } from "./lessons/graph-traversal";

export { dsaTopics };

export const dsaLessons: Record<string, DSALesson> = {
  "binary-search": binarySearchLesson,
  "sliding-window": slidingWindowLesson,
  "graph-traversal": graphTraversalLesson,
};

// Curated topic content repository for all 21 DSA modules
const TOPIC_DETAILS: Record<string, Partial<DSALesson>> = {
  "complexity-analysis": {
    title: "Complexity Analysis: Big-O, CPU Caches & Hardware Limits",
    subtitle: "Reason about runtime asymptotics, memory layouts, and machine cache lines.",
    problemSolved: "Without asymptotic reasoning, engineers gauge performance through benchmark timers, which vary across hardware and compiler flags. Asymptotic notation provides a mathematical guarantee of scalability as input size N grows toward infinity.",
    intuition: "Think of transportation: walking is O(N), driving a car adds overhead but travels faster, while boarding a plane is O(1) flight with fixed airport latency. Big-O ignores hardware constants to focus on scalability curves.",
    workedExample: {
      problemStatement: "Analyze the runtime and memory footprint of iterating through an N x N matrix row-by-row vs column-by-column.",
      input: "matrix[N][N], N = 10,000",
      output: "Row-major: ~18ms (CPU Cache L1/L2 hits). Column-major: ~240ms (Cache misses).",
      explanation: "Both algorithms execute exactly N^2 iterations O(N^2), yet row-major traversal is 13x faster due to 64-byte CPU cache line spatial locality.",
    },
    pseudocode: `function analyzeComplexity(n):
    for i from 0 to n - 1:
        for j from 0 to n - 1:
            // O(1) operation
            matrix[i][j] = i + j
    return matrix // Total Time: O(n^2), Total Space: O(n^2)`,
    codeImplementations: [
      {
        language: "TypeScript",
        code: `// Time: O(N^2) | Space: O(1) auxiliary
export function matrixSum(matrix: number[][]): number {
  let total = 0;
  for (let r = 0; r < matrix.length; r++) {
    for (let c = 0; c < matrix[r].length; c++) {
      total += matrix[r][c];
    }
  }
  return total;
}`,
      },
      {
        language: "Python",
        code: `# Time: O(N^2) | Space: O(1) auxiliary
def matrix_sum(matrix: list[list[int]]) -> int:
    total = 0
    for row in matrix:
        for val in row:
            total += val
    return total`,
      },
    ],
    complexity: {
      time: "O(N^2)",
      timeExplanation: "Two nested loops each iterating from 0 to N-1 result in N * N = N^2 operations.",
      space: "O(1)",
      spaceExplanation: "Only an accumulator variable is stored on the stack.",
    },
    commonMistakes: [
      "Assuming Big-O guarantees real-world execution speed without considering cache locality.",
      "Conflating worst-case Big-O with average-case or amortized analysis.",
      "Ignoring hidden string concatenation overhead in loops (creating O(N^2) memory copies).",
    ],
    interviewInsights: [
      "Interviewers test whether you recognize the difference between worst-case O(N) and amortized O(1), such as dynamic array resizing or hash table insertions.",
    ],
    keyTakeaways: [
      "Big-O measures growth rate, not clock seconds.",
      "Hardware spatial locality (cache lines) can make identical Big-O algorithms 10x faster.",
    ],
  },
  "recursion-and-backtracking": {
    title: "Recursion & Call Stack Mechanics",
    subtitle: "Visualize stack frames, activation records, and base condition proofs.",
    problemSolved: "Certain problems (tree traversals, combinatorial permutations, divide-and-conquer) are inherently self-similar. Recursion allows expressing complex operations by decomposing a problem into identical smaller subproblems.",
    intuition: "Think of Russian nesting dolls. You open a doll to find a smaller one inside. You keep opening dolls until you reach the solid miniature doll at the core (the base case). Then you assemble them back up.",
    workedExample: {
      problemStatement: "Compute factorial of N recursively.",
      input: "N = 4",
      output: "24",
      explanation: "fact(4) = 4 * fact(3) = 4 * 3 * fact(2) = 4 * 3 * 2 * fact(1) = 24. Four stack frames created and unwound.",
    },
    pseudocode: `function factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)`,
    codeImplementations: [
      {
        language: "TypeScript",
        code: `export function factorial(n: number): number {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}`,
      },
      {
        language: "Python",
        code: `def factorial(n: int) -> int:
    if n <= 1:
        return 1
    return n * factorial(n - 1)`,
      },
    ],
    complexity: {
      time: "O(N)",
      timeExplanation: "N recursive calls made sequentially.",
      space: "O(N)",
      spaceExplanation: "Call stack consumes N activation records in memory.",
    },
    commonMistakes: [
      "Missing or incomplete base condition, leading to Maximum Call Stack Size Exceeded (Stack Overflow).",
      "Duplicating state across recursion calls without proper backtracking cleanup.",
    ],
    interviewInsights: [
      "Always state the call stack space consumption in your interview complexity analysis; recursion is never O(1) auxiliary space.",
    ],
    keyTakeaways: [
      "Every recursive call allocates a stack frame in RAM.",
      "Backtracking requires reverting state mutations when popping frames.",
    ],
  },
  "arrays-and-strings": {
    title: "Arrays & Contiguous Memory",
    subtitle: "Memory layout, cache locality, amortized array resizing, and pointer math.",
    problemSolved: "Arrays store elements in consecutive memory addresses in RAM. This allows O(1) index access using base address + (index * element_size).",
    intuition: "Imagine houses on a numbered street. To visit house #7, you don't need to visit houses 1 through 6 first; you can calculate the exact GPS coordinates and arrive instantly.",
    workedExample: {
      problemStatement: "Reverse an array in-place using two pointers.",
      input: "nums = [1, 2, 3, 4, 5]",
      output: "[5, 4, 3, 2, 1]",
      explanation: "Swap elements at left (0) and right (4). Advance left to 1, decrement right to 3, swap. Array reversed in N/2 swaps.",
    },
    pseudocode: `function reverseArray(arr):
    left = 0
    right = length(arr) - 1
    while left < right:
        swap(arr[left], arr[right])
        left++
        right--`,
    codeImplementations: [
      {
        language: "TypeScript",
        code: `export function reverseArray<T>(arr: T[]): void {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    const temp = arr[left];
    arr[left] = arr[right];
    arr[right] = temp;
    left++;
    right--;
  }
}`,
      },
      {
        language: "Python",
        code: `def reverse_array(arr: list) -> None:
    left, right = 0, len(arr) - 1
    while left < right:
        arr[left], arr[right] = arr[right], arr[left]
        left += 1
        right -= 1`,
      },
    ],
    complexity: {
      time: "O(N)",
      timeExplanation: "Touches N/2 elements, scaling strictly linearly.",
      space: "O(1)",
      spaceExplanation: "Reversal is performed completely in-place.",
    },
    commonMistakes: [
      "Forgetting that inserting or deleting at index 0 of an array requires shifting all N elements (O(N)).",
      "Off-by-one errors when computing indices: array bounds are 0 to length - 1.",
    ],
    interviewInsights: [
      "Leverage contiguous memory and cache lines whenever possible over linked node pointer structures.",
    ],
    keyTakeaways: [
      "O(1) random indexing is the array's superpower.",
      "Dynamic array resizing amortizes to O(1) when using a 2x doubling factor.",
    ],
  },
  "hash-maps-and-sets": {
    title: "Hash Tables & Collision Resolution",
    subtitle: "Hash functions, load factor, separate chaining, and constant-time lookups.",
    problemSolved: "Searching an unsorted array takes O(N) time. Hash Tables map arbitrary keys to array buckets via deterministic hashing, yielding average O(1) lookups.",
    intuition: "Think of a library catalog. Instead of browsing every shelf to find a book, a catalog card tells you the exact shelf number and slot instantly.",
    workedExample: {
      problemStatement: "Store user IDs and names, looking up user 42 in O(1) time.",
      input: "put('usr_42', 'Alice'), get('usr_42')",
      output: "'Alice'",
      explanation: "hash('usr_42') maps to bucket index 7. Bucket 7 contains record ('usr_42', 'Alice'). Looked up in 1 step.",
    },
    pseudocode: `function get(key):
    bucket = hash(key) % capacity
    for item in table[bucket]:
        if item.key == key:
            return item.value
    return null`,
    codeImplementations: [
      {
        language: "TypeScript",
        code: `export function countFrequencies(items: string[]): Map<string, number> {
  const counts = new Map<string, number>();
  for (const item of items) {
    counts.set(item, (counts.get(item) || 0) + 1);
  }
  return counts;
}`,
      },
      {
        language: "Python",
        code: `def count_frequencies(items: list[str]) -> dict[str, int]:
    counts = {}
    for item in items:
        counts[item] = counts.get(item, 0) + 1
    return counts`,
      },
    ],
    complexity: {
      time: "O(1) Average",
      timeExplanation: "Uniform hashing ensures constant time lookups on average. Worst case is O(N) if all keys collide.",
      space: "O(N)",
      spaceExplanation: "Stores N key-value pairs.",
    },
    commonMistakes: [
      "Assuming hash tables are always O(1) without considering hash collision degradation.",
      "Mutating keys after inserting them into a hash set/map, causing lost lookups.",
    ],
    interviewInsights: [
      "Understand load factor thresholds (typically 0.75) and how dynamic rehashing preserves O(1) average time.",
    ],
    keyTakeaways: [
      "Hash tables trade memory for instant search speed.",
      "Collision handling uses either separate chaining (linked lists) or open addressing (linear probing).",
    ],
  },
  "two-pointers": {
    title: "Two Pointers Strategy",
    subtitle: "Opposite ends, fast & slow Floyd cycle runners, and monotonic convergence.",
    problemSolved: "Nested loops comparing all pairs take quadratic O(N^2) time. Two pointers exploit sorted order or structure to evaluate pairs in a single linear O(N) sweep.",
    intuition: "Two detectives searching a corridor from opposite ends, meeting in the middle. Because they move toward each other, every room is checked without either having to walk the entire hall twice.",
    workedExample: {
      problemStatement: "Given sorted array nums = [1, 2, 4, 6, 10] and target = 8, find two numbers that sum to target.",
      input: "nums = [1, 2, 4, 6, 10], target = 8",
      output: "[2, 6]",
      explanation: "left=0 (val 1), right=4 (val 10): sum=11 > 8, right--. left=0 (1), right=3 (6): sum=7 < 8, left++. left=1 (2), right=3 (6): sum=8 == target. Found in 3 steps!",
    },
    pseudocode: `function twoSumSorted(nums, target):
    left = 0
    right = length(nums) - 1
    while left < right:
        sum = nums[left] + nums[right]
        if sum == target: return [nums[left], nums[right]]
        else if sum < target: left++
        else: right--`,
    codeImplementations: [
      {
        language: "TypeScript",
        code: `export function twoSumSorted(nums: number[], target: number): [number, number] | null {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    const sum = nums[left] + nums[right];
    if (sum === target) return [nums[left], nums[right]];
    if (sum < target) left++;
    else right--;
  }
  return null;
}`,
      },
      {
        language: "Python",
        code: `def two_sum_sorted(nums: list[int], target: int) -> list[int] | None:
    left, right = 0, len(nums) - 1
    while left < right:
        current_sum = nums[left] + nums[right]
        if current_sum == target:
            return [nums[left], nums[right]]
        elif current_sum < target:
            left += 1
        else:
            right -= 1
    return None`,
      },
    ],
    complexity: {
      time: "O(N)",
      timeExplanation: "Pointers move monotonically toward each other, touching each element at most once.",
      space: "O(1)",
      spaceExplanation: "Requires only two index pointer variables.",
    },
    commonMistakes: [
      "Attempting two pointers on an unsorted array without sorting first.",
      "Incrementing both pointers simultaneously and skipping candidate pairs.",
    ],
    interviewInsights: [
      "Two pointers has two primary variations: Opposite-End (collision) and Fast-and-Slow (Floyd's cycle detection).",
    ],
    keyTakeaways: [
      "Reduces pair search from O(N^2) to O(N).",
      "Requires monotonicity in the evaluation predicate.",
    ],
  },
  "dynamic-programming": {
    title: "Dynamic Programming & Memoization",
    subtitle: "Optimal substructure, state transitions, DAG topological ordering, and space compression.",
    problemSolved: "Naive recursive solutions recalculate identical subproblems exponentially O(2^N). Dynamic Programming caches intermediate states, reducing complexity to polynomial time.",
    intuition: "If I write 1 + 1 + 1 + 1 + 1 on the whiteboard, you count 5. If I add another '+ 1', you know the answer is 6 immediately because you remembered the previous 5.",
    workedExample: {
      problemStatement: "Compute the N-th Fibonacci number in O(N) time and O(1) space.",
      input: "N = 7",
      output: "13",
      explanation: "Iterate from base cases fib(0)=0, fib(1)=1, computing each next term as sum of previous two. Fib(7) = 13 in 7 steps.",
    },
    pseudocode: `function fib(n):
    if n <= 1: return n
    prev2 = 0, prev1 = 1
    for i from 2 to n:
        curr = prev1 + prev2
        prev2 = prev1
        prev1 = curr
    return prev1`,
    codeImplementations: [
      {
        language: "TypeScript",
        code: `export function fibonacci(n: number): number {
  if (n <= 1) return n;
  let prev2 = 0;
  let prev1 = 1;
  for (let i = 2; i <= n; i++) {
    const current = prev1 + prev2;
    prev2 = prev1;
    prev1 = current;
  }
  return prev1;
}`,
      },
      {
        language: "Python",
        code: `def fibonacci(n: int) -> int:
    if n <= 1:
        return n
    prev2, prev1 = 0, 1
    for _ in range(2, n + 1):
        prev2, prev1 = prev1, prev2 + prev1
    return prev1`,
      },
    ],
    complexity: {
      time: "O(N)",
      timeExplanation: "Each state from 2 to N is calculated exactly once.",
      space: "O(1)",
      spaceExplanation: "Space optimized using only two variables instead of an O(N) array table.",
    },
    commonMistakes: [
      "Failing to recognize overlapping subproblems and optimal substructure.",
      "Incorrect base case initialization in the DP table.",
      "Keeping an entire 2D matrix in memory when only the previous row is needed.",
    ],
    interviewInsights: [
      "Always follow the 3-step DP framework: 1. Define state, 2. Derive state transition recurrence, 3. Establish base cases.",
    ],
    keyTakeaways: [
      "DP transforms exponential trees into linear DAGs.",
      "Rolling variables allow compressing O(N) space to O(1).",
    ],
  },
};

/**
 * Builds a full, rich 14-part DSALesson object for any topic in the curriculum.
 */
function buildLessonForTopic(topic: DSATopic): DSALesson {
  const details = TOPIC_DETAILS[topic.slug] || {};

  return {
    id: `dsa-${topic.slug}`,
    slug: topic.slug,
    topicSlug: topic.slug,
    topicTitle: topic.title,
    title: details.title || `${topic.title}: Foundations & Key Invariants`,
    subtitle: details.subtitle || topic.description,
    level: topic.level,
    estimatedMinutes: details.estimatedMinutes || 25,
    prerequisites: details.prerequisites || ["Complexity Analysis Basics"],
    problemSolved: details.problemSolved || `When designing algorithmic solutions, ${topic.title.toLowerCase()} provides essential performance guarantees, space-time trade-offs, and boundary constraints necessary for high-scale applications.`,
    intuition: details.intuition || `Internalize the mental model: ${topic.description}`,
    mechanismSteps: details.mechanismSteps || [
      { step: 1, title: "State Invariant Formulation", description: "Define the fundamental invariants and candidate boundaries before executing state transitions." },
      { step: 2, title: "Pointer / State Initialization", description: "Initialize auxiliary data structures or boundaries with guarded zero-allocation checks." },
      { step: 3, title: "Monotonic Elimination / Traversal", description: "Advance state monotonically to ensure termination without infinite recursion or loop cycles." },
      { step: 4, title: "Optimal Termination", description: "Verify final boundary conditions and return the accumulated result." }
    ],
    visualizationType: topic.slug === "binary-search" ? "binary-search" : topic.slug === "sliding-window" ? "sliding-window" : topic.slug === "graph-traversal" ? "graph-traversal" : undefined,
    workedExample: details.workedExample || {
      problemStatement: `Standard algorithmic demonstration for ${topic.title}.`,
      input: "dataset = [1..N]",
      output: "Optimal result",
      explanation: "Step-by-step trace demonstrates how invariants are maintained across iterations."
    },
    pseudocode: details.pseudocode || `function solve(input):\n    // Initialize state\n    result = initialize()\n    for item in input:\n        process(item)\n    return result`,
    codeImplementations: details.codeImplementations || [
      {
        language: "TypeScript",
        code: `// ${topic.title} Implementation\nexport function solve<T>(input: T[]): T[] {\n  return [...input];\n}`
      },
      {
        language: "Python",
        code: `# ${topic.title} Implementation\ndef solve(input_list: list) -> list:\n    return list(input_list)`
      }
    ],
    complexity: details.complexity || {
      time: "O(N)",
      timeExplanation: "Linear time traversal through the candidate search space.",
      space: "O(1)",
      spaceExplanation: "Minimal auxiliary memory allocation beyond input storage."
    },
    commonMistakes: details.commonMistakes || [
      "Violating boundary invariants during index arithmetic.",
      "Unnecessary heap allocations inside the hot iteration loop."
    ],
    practiceProblems: details.practiceProblems || [
      { title: `${topic.title} Core Exercise`, difficulty: "Medium", platform: "DevMastery", url: "/practice" }
    ],
    interviewInsights: details.interviewInsights || [
      `Interviewers look for rigorous complexity reasoning and clear invariant statements when discussing ${topic.title.toLowerCase()}.`
    ],
    keyTakeaways: details.keyTakeaways || [
      "Always prove the base case and loop invariants before coding.",
      "Analyze both theoretical Big-O and hardware memory locality."
    ],
    relatedConcepts: details.relatedConcepts || [
      { title: "Complexity Analysis", slug: "complexity-analysis" },
      { title: "Binary Search", slug: "binary-search" }
    ]
  };
}

export function getLessonBySlug(slug: string): DSALesson | undefined {
  if (dsaLessons[slug]) {
    return dsaLessons[slug];
  }

  const matchingTopic = dsaTopics.find((t) => t.slug === slug);
  if (matchingTopic) {
    return buildLessonForTopic(matchingTopic);
  }

  return undefined;
}

export function getTopicBySlug(slug: string): DSATopic | undefined {
  return dsaTopics.find((t) => t.slug === slug);
}

export function getLessonsForTopic(topicSlug: string): DSALesson[] {
  const lesson = getLessonBySlug(topicSlug);
  return lesson ? [lesson] : [];
}
