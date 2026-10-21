import { DSALesson } from "@/types";

export const slidingWindowLesson: DSALesson = {
  id: "dsa-sliding-window-mechanics",
  slug: "sliding-window",
  topicSlug: "sliding-window",
  topicTitle: "Sliding Window Technique",
  title: "Sliding Window: Amortized O(n) Contiguous Subarrays",
  subtitle: "Transforming quadratic O(n^2) nested loops into smooth two-pointer caterpillar scans.",
  level: "Intermediate",
  estimatedMinutes: 30,
  prerequisites: ["Arrays & Contiguous Memory", "Two Pointers Strategy", "Hash Tables"],

  problemSolved:
    "Many subarray problems ask for the longest, shortest, or optimal contiguous slice satisfying a condition (e.g. sum >= K, or containing at most K distinct characters). A naive brute-force checks all N*(N+1)/2 possible subarrays, running in O(N^2) or O(N^3) time. The Sliding Window technique maintains an active window bounded by [left, right], incrementally adding elements as the right pointer expands and subtracting elements as the left pointer contracts, solving the problem in a single O(N) pass.",

  intuition:
    "Picture an inchworm or caterpillar crawling across a branch. The head (right pointer) stretches forward to consume new leaf nodes. When the caterpillar gets too full or exceeds its capacity constraint (such as exceeding maximum allowed distinct elements), the tail (left pointer) contracts forward to shed elements until balance is restored. Because the head and tail each visit each element at most once, the total number of pointer movements is at most 2N.",

  mechanismSteps: [
    {
      step: 1,
      title: "Initialize Window & Aggregates",
      description: "Set `left = 0`, initialize auxiliary state (such as running window sum, character frequency map, or set of unique elements).",
    },
    {
      step: 2,
      title: "Expand Right Boundary",
      description: "Iterate `right` from 0 to `N - 1`. Absorb `nums[right]` into your running aggregate state.",
    },
    {
      step: 3,
      title: "Check Invariant Violation",
      description: "While the window condition is violated (e.g., duplicate detected or sum exceeds capacity), shrink the window from the left by subtracting `nums[left]` from the aggregate and incrementing `left++`.",
    },
    {
      step: 4,
      title: "Record Candidate Answer",
      description: "Once the window is valid, evaluate window length `(right - left + 1)` or aggregate property and update global answer.",
    },
    {
      step: 5,
      title: "Return Optimal Result",
      description: "After `right` reaches end of array, return the accumulated optimal value.",
    },
  ],

  visualizationType: "sliding-window",

  workedExample: {
    problemStatement: "Find the length of the longest substring without repeating characters in s = 'abcabcbb'.",
    input: "s = 'abcabcbb'",
    output: "3",
    explanation: "Expand right: 'a' (len 1), 'ab' (len 2), 'abc' (len 3). Next right is 'a' (duplicate!). Left pointer contracts past the first 'a' to yield 'bca' (len 3). Continuing through string keeps max length at 3 ('abc').",
  },

  pseudocode: `function longestSubstringWithoutRepeating(s: String) -> Integer:
    charMap = new Map()
    left = 0
    maxLen = 0

    for right from 0 to length(s) - 1:
        currentChar = s[right]
        if charMap.has(currentChar) and charMap.get(currentChar) >= left:
            left = charMap.get(currentChar) + 1
        
        charMap.set(currentChar, right)
        maxLen = max(maxLen, right - left + 1)

    return maxLen`,

  codeImplementations: [
    {
      language: "TypeScript",
      code: `export function lengthOfLongestSubstring(s: string): number {
  const lastSeen = new Map<string, number>();
  let left = 0;
  let maxLength = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];
    
    if (lastSeen.has(char) && lastSeen.get(char)! >= left) {
      left = lastSeen.get(char)! + 1;
    }

    lastSeen.set(char, right);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}`,
    },
    {
      language: "Python",
      code: `def length_of_longest_substring(s: str) -> int:
    last_seen = {}
    left = 0
    max_len = 0

    for right, char in enumerate(s):
        if char in last_seen and last_seen[char] >= left:
            left = last_seen[char] + 1
        
        last_seen[char] = right
        max_len = max(max_len, right - left + 1)

    return max_len`,
    },
  ],

  complexity: {
    time: "O(N)",
    timeExplanation: "Even though there is a nested while loop or pointer shifts, both `left` and `right` only move from 0 to N-1 and never move backward. Therefore, each element is touched at most twice, resulting in amortized O(N) operations.",
    space: "O(min(N, M))",
    spaceExplanation: "Where M is the size of the alphabet/character set (e.g. 26 lowercase English letters or 128 ASCII symbols) stored in the frequency map.",
  },

  commonMistakes: [
    "Resetting left pointer backwards: Forgetting to check `lastSeen.get(char) >= left` when using index-jump optimization, which would incorrectly move `left` to the left!",
    "Using nested slices: Calling string slices or array copies inside the loop, turning an O(N) algorithm into an accidental O(N^2) memory bottleneck.",
    "Off-by-one window length: The count of elements in `[left, right]` inclusive is `right - left + 1`, not `right - left`.",
  ],

  practiceProblems: [
    {
      title: "Longest Substring Without Repeating Characters",
      difficulty: "Medium",
      platform: "LeetCode",
      url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    },
    {
      title: "Minimum Size Subarray Sum",
      difficulty: "Medium",
      platform: "LeetCode",
      url: "https://leetcode.com/problems/minimum-size-subarray-sum/",
    },
    {
      title: "Max Consecutive Ones III",
      difficulty: "Medium",
      platform: "LeetCode",
      url: "https://leetcode.com/problems/max-consecutive-ones-iii/",
    },
  ],

  interviewInsights: [
    "Fixed vs Dynamic Windows: Categorize immediately in your interview. If the window size is constant K (e.g., maximum sum subarray of size K), you slide both pointers together. If the constraint is variable (e.g., sum <= target), expand right and contract left dynamically.",
  ],

  keyTakeaways: [
    "Sliding window applies exclusively to contiguous sequences where the validity property changes monotonically as you add or remove elements.",
    "Amortized O(N) guarantee holds because pointers only increment forward.",
  ],

  relatedConcepts: [
    { title: "Two Pointers Strategy", slug: "two-pointers" },
    { title: "Prefix Sums & Running Totals", slug: "complexity-analysis" },
    { title: "Hash Tables & Collision Resolution", slug: "hash-maps-and-sets" },
  ],
};
