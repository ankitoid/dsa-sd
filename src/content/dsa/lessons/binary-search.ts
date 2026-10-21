import { DSALesson } from "@/types";

export const binarySearchLesson: DSALesson = {
  id: "dsa-binary-search-foundations",
  slug: "binary-search",
  topicSlug: "binary-search",
  topicTitle: "Binary Search & Search Spaces",
  title: "Binary Search: Invariants & Logarithmic Elimination",
  subtitle: "Halving search spaces from linear O(n) scans to 30 CPU cycles over a billion elements.",
  level: "Beginner",
  estimatedMinutes: 25,
  prerequisites: ["Arrays & Contiguous Memory", "Complexity Analysis Basics"],

  problemSolved:
    "When searching for an item in an unsorted collection of size N, your only option is linear examination: inspecting every item one-by-one with worst-case O(N) comparisons. For 1,000,000,000 records, that requires 1 billion memory accesses. Binary Search solves this by taking advantage of monotonic ordering (sorted order or monotonic Boolean predicates), eliminating 50% of remaining candidates in every single step, guaranteeing finding any element or proving its absence in at most 30 comparisons.",

  intuition:
    "Imagine opening a 1,000-page dictionary looking for the word 'Kernel'. You do not begin on page 1 reading every entry until you reach 'K'. Instead, you crack the dictionary open directly at the halfway point (page 500). If page 500 shows words starting with 'M', you know with mathematical certainty that 'K' must precede page 500. Without looking at a single word between pages 501 and 1000, you discard half the book. You repeat this halving on the left half until you land on 'Kernel'. Every step discards an entire universe of impossible answers.",

  mechanismSteps: [
    {
      step: 1,
      title: "Establish Inclusive Bounds",
      description: "Initialize two pointers: `low = 0` and `high = array.length - 1`. The candidate answer is guaranteed to exist inside `[low, high]` if it exists at all.",
    },
    {
      step: 2,
      title: "Calculate Safe Midpoint",
      description: "Compute `mid = low + Math.floor((high - low) / 2)`. This formulation guarantees arithmetic safety in languages with 32-bit signed integers (preventing integer overflow when `low + high > 2^31 - 1`).",
    },
    {
      step: 3,
      title: "Evaluate Target Condition",
      description: "Compare `array[mid]` with `target`. If `array[mid] === target`, return `mid` immediately.",
    },
    {
      step: 4,
      title: "Prune Dead Subspace",
      description: "If `array[mid] < target`, the target cannot exist at `mid` or any index to its left. Set `low = mid + 1`. If `array[mid] > target`, the target cannot exist at `mid` or to its right. Set `high = mid - 1`.",
    },
    {
      step: 5,
      title: "Terminate On Exhaustion",
      description: "Repeat while `low <= high`. If the loop exits without finding the target, the search interval has collapsed to empty (`low > high`). Conclude target is not present (return `-1` or insertion index `low`).",
    },
  ],

  visualizationType: "binary-search",

  workedExample: {
    problemStatement: "Given sorted array nums = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91] and target = 23, locate the index of target.",
    input: "nums = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91], target = 23",
    output: "5",
    explanation: "Iteration 1: low=0, high=9, mid=4 (val=16). Since 16 < 23, prune [0..4], low becomes 5. Iteration 2: low=5, high=9, mid=7 (val=56). Since 56 > 23, prune [7..9], high becomes 6. Iteration 3: low=5, high=6, mid=5 (val=23). Target match found at index 5 in 3 steps!",
  },

  pseudocode: `function binarySearch(nums: Array, target: Integer) -> Integer:
    low = 0
    high = length(nums) - 1

    while low <= high:
        mid = low + floor((high - low) / 2)
        
        if nums[mid] == target:
            return mid
        else if nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1

    return -1 // Target not found`,

  codeImplementations: [
    {
      language: "TypeScript",
      code: `export function binarySearch(nums: number[], target: number): number {
  let low = 0;
  let high = nums.length - 1;

  while (low <= high) {
    // Avoid (low + high) / 2 to guard against 32-bit signed overflow
    const mid = low + Math.floor((high - low) / 2);

    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] < target) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return -1;
}`,
    },
    {
      language: "Python",
      code: `def binary_search(nums: list[int], target: int) -> int:
    low, high = 0, len(nums) - 1

    while low <= high:
        mid = low + (high - low) // 2

        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1

    return -1`,
    },
    {
      language: "Java",
      code: `public class Solution {
    public int binarySearch(int[] nums, int target) {
        int low = 0;
        int high = nums.length - 1;

        while (low <= high) {
            int mid = low + (high - low) / 2;

            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }

        return -1;
    }
}`,
    },
  ],

  complexity: {
    time: "O(log N)",
    timeExplanation: "At each step, the search interval of length K is cut in half to K/2. If initial length is N, after k steps the interval size is N / 2^k. Setting N / 2^k = 1 yields 2^k = N, so k = log2(N). For 1,000,000 items, log2(1,000,000) ≈ 20 steps.",
    space: "O(1)",
    spaceExplanation: "The iterative approach maintains only three pointer variables (`low`, `high`, `mid`), requiring constant stack space independent of array size.",
  },

  commonMistakes: [
    "Integer Overflow: Using `(low + high) / 2` instead of `low + (high - low) / 2`. When `low + high` exceeds 2^31 - 1 in typed languages like C++/Java, it wraps around to a negative number, causing index out-of-bounds.",
    "Loop Invariant Violation: Using `while (low < high)` with `high = mid - 1`. If target is at the very last element where `low == high`, the loop terminates early without testing it.",
    "Infinite Loops: Writing `low = mid` or `high = mid` without proper parity adjustment, trapping pointers in a loop of length 2.",
    "Unsorted Inputs: Attempting binary search on an unsorted array without prior verification or sorting.",
  ],

  practiceProblems: [
    {
      title: "Binary Search (Classic)",
      difficulty: "Easy",
      platform: "LeetCode",
      url: "https://leetcode.com/problems/binary-search/",
    },
    {
      title: "Search in Rotated Sorted Array",
      difficulty: "Medium",
      platform: "LeetCode",
      url: "https://leetcode.com/problems/search-in-rotated-sorted-array/",
    },
    {
      title: "Find First and Last Position of Element in Sorted Array",
      difficulty: "Medium",
      platform: "LeetCode",
      url: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/",
    },
    {
      title: "Koko Eating Bananas (Search on Answer)",
      difficulty: "Medium",
      platform: "LeetCode",
      url: "https://leetcode.com/problems/koko-eating-bananas/",
    },
  ],

  interviewInsights: [
    "Beyond Arrays: Senior interviewers frequently evaluate candidates on 'Binary Search on the Answer Space' (e.g. finding minimum capacity or maximum feasible rate). If a boolean condition F(x) is monotonic (all false then all true), binary search applies even without an explicit array!",
    "Off-by-One Guardrails: Always define your interval invariant upfront: is your search space `[low, high]` (closed) or `[low, high)` (half-open)? Stick to the corresponding loop condition (`low <= high` vs `low < high`).",
  ],

  keyTakeaways: [
    "Logarithmic time scales sub-linearly: doubling the dataset size adds only a single comparison step.",
    "Always guard against arithmetic overflow with `low + (high - low) / 2`.",
    "Binary search applies to any monotonic predicate function, not just sorted numeric arrays.",
  ],

  relatedConcepts: [
    { title: "Two Pointers Strategy", slug: "two-pointers" },
    { title: "Sliding Window Technique", slug: "sliding-window" },
    { title: "Ternary Search & Unimodal Functions", slug: "complexity-analysis" },
  ],
};
