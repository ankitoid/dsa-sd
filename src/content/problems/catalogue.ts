import { PracticeProblem } from "@/types";

export const practiceProblems: PracticeProblem[] = [
  {
    id: "prob-binary-search",
    slug: "binary-search",
    title: "Binary Search",
    difficulty: "Easy",
    category: "Binary Search",
    acceptanceRate: "58.4%",
    description: `Given an array of integers \`nums\` which is sorted in ascending order, and an integer \`target\`, write a function to search \`target\` in \`nums\`. If \`target\` exists, then return its index. Otherwise, return \`-1\`.

You must write an algorithm with \`O(log n)\` runtime complexity.`,
    examples: [
      {
        input: "nums = [-1,0,3,5,9,12], target = 9",
        output: "4",
        explanation: "9 exists in nums and its index is 4.",
      },
      {
        input: "nums = [-1,0,3,5,9,12], target = 2",
        output: "-1",
        explanation: "2 does not exist in nums so return -1.",
      },
    ],
    constraints: [
      "1 <= nums.length <= 10^4",
      "-10^4 < nums[i], target < 10^4",
      "All the integers in nums are unique.",
      "nums is sorted in ascending order.",
    ],
    starterCode: {
      typescript: `function search(nums: number[], target: number): number {\n  // Write your O(log n) solution here\n  let low = 0;\n  let high = nums.length - 1;\n\n  while (low <= high) {\n    const mid = low + Math.floor((high - low) / 2);\n    if (nums[mid] === target) return mid;\n    if (nums[mid] < target) low = mid + 1;\n    else high = mid - 1;\n  }\n\n  return -1;\n}`,
      javascript: `function search(nums, target) {\n  // Write your code here\n  let low = 0;\n  let high = nums.length - 1;\n  while (low <= high) {\n    let mid = Math.floor((low + high) / 2);\n    if (nums[mid] === target) return mid;\n    if (nums[mid] < target) low = mid + 1;\n    else high = mid - 1;\n  }\n  return -1;\n}`,
      python: `class Solution:\n    def search(self, nums: list[int], target: int) -> int:\n        low, high = 0, len(nums) - 1\n        while low <= high:\n            mid = (low + high) // 2\n            if nums[mid] == target:\n                return mid\n            elif nums[mid] < target:\n                low = mid + 1\n            else:\n                high = mid - 1\n        return -1`,
    },
    solutionCode: {
      typescript: `function search(nums: number[], target: number): number {\n  let low = 0;\n  let high = nums.length - 1;\n  while (low <= high) {\n    const mid = low + Math.floor((high - low) / 2);\n    if (nums[mid] === target) return mid;\n    if (nums[mid] < target) low = mid + 1;\n    else high = mid - 1;\n  }\n  return -1;\n}`,
      python: `def search(nums: list[int], target: int) -> int:\n    low, high = 0, len(nums) - 1\n    while low <= high:\n        mid = (low + high) // 2\n        if nums[mid] == target:\n            return mid\n        elif nums[mid] < target:\n            low = mid + 1\n        else:\n            high = mid - 1\n    return -1`,
    },
    hints: [
      "Use two pointers (low, high) to represent the current search interval.",
      "Calculate the midpoint using `low + Math.floor((high - low) / 2)` to avoid integer overflow.",
      "If the element at mid is less than target, the target must reside in the right half: set `low = mid + 1`.",
    ],
    externalUrl: "https://leetcode.com/problems/binary-search/",
    externalPlatform: "LeetCode",
    isLocalExecutable: true,
    testCases: [
      { input: [[-1, 0, 3, 5, 9, 12], 9], expected: 4 },
      { input: [[-1, 0, 3, 5, 9, 12], 2], expected: -1 },
      { input: [[5], 5], expected: 0 },
    ],
  },
  {
    id: "prob-longest-substring",
    slug: "longest-substring-without-repeating-characters",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: "Sliding Window",
    acceptanceRate: "34.8%",
    description: `Given a string \`s\`, find the length of the longest substring without repeating characters.`,
    examples: [
      {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: 'The answer is "abc", with the length of 3.',
      },
      {
        input: 's = "bbbbb"',
        output: "1",
        explanation: 'The answer is "b", with the length of 1.',
      },
      {
        input: 's = "pwwkew"',
        output: "3",
        explanation: 'The answer is "wke", with the length of 3. Note that "pwke" is a subsequence and not a substring.',
      },
    ],
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces.",
    ],
    starterCode: {
      typescript: `function lengthOfLongestSubstring(s: string): number {\n  // Implement sliding window with hash map\n  const lastSeen = new Map<string, number>();\n  let left = 0;\n  let maxLen = 0;\n\n  for (let right = 0; right < s.length; right++) {\n    const char = s[right];\n    if (lastSeen.has(char) && lastSeen.get(char)! >= left) {\n      left = lastSeen.get(char)! + 1;\n    }\n    lastSeen.set(char, right);\n    maxLen = Math.max(maxLen, right - left + 1);\n  }\n\n  return maxLen;\n}`,
      javascript: `function lengthOfLongestSubstring(s) {\n  let charMap = new Map();\n  let left = 0, maxLen = 0;\n  for (let right = 0; right < s.length; right++) {\n    if (charMap.has(s[right]) && charMap.get(s[right]) >= left) {\n      left = charMap.get(s[right]) + 1;\n    }\n    charMap.set(s[right], right);\n    maxLen = Math.max(maxLen, right - left + 1);\n  }\n  return maxLen;\n}`,
      python: `class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        char_map = {}\n        left = max_len = 0\n        for right, c in enumerate(s):\n            if c in char_map and char_map[c] >= left:\n                left = char_map[c] + 1\n            char_map[c] = right\n            max_len = max(max_len, right - left + 1)\n        return max_len`,
    },
    solutionCode: {
      typescript: `function lengthOfLongestSubstring(s: string): number {\n  const lastSeen = new Map<string, number>();\n  let left = 0, maxLen = 0;\n  for (let right = 0; right < s.length; right++) {\n    if (lastSeen.has(s[right]) && lastSeen.get(s[right])! >= left) {\n      left = lastSeen.get(s[right])! + 1;\n    }\n    lastSeen.set(s[right], right);\n    maxLen = Math.max(maxLen, right - left + 1);\n  }\n  return maxLen;\n}`,
      python: `def length_of_longest_substring(s: str) -> int:\n    last_seen = {}\n    left = max_len = 0\n    for right, c in enumerate(s):\n        if c in last_seen and last_seen[c] >= left:\n            left = last_seen[c] + 1\n        last_seen[c] = right\n        max_len = max(max_len, right - left + 1)\n    return max_len`,
    },
    hints: [
      "Use two pointers to define a dynamic window [left, right].",
      "Store the most recent index of each visited character in a Map.",
      "When a duplicate is encountered within the current window, advance the left pointer past the previous occurrence.",
    ],
    externalUrl: "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
    externalPlatform: "LeetCode",
    isLocalExecutable: true,
    testCases: [
      { input: ["abcabcbb"], expected: 3 },
      { input: ["bbbbb"], expected: 1 },
      { input: ["pwwkew"], expected: 3 },
      { input: [""], expected: 0 },
    ],
  },
  {
    id: "prob-valid-parentheses",
    slug: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stacks & Queues",
    acceptanceRate: "41.2%",
    description: `Given a string \`s\` containing just the characters \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` and \`']'\`, determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    examples: [
      { input: 's = "()"', output: "true" },
      { input: 's = "()[]{}"', output: "true" },
      { input: 's = "(]"', output: "false" },
    ],
    constraints: [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'.",
    ],
    starterCode: {
      typescript: `function isValid(s: string): boolean {\n  const stack: string[] = [];\n  const map: Record<string, string> = { ')': '(', '}': '{', ']': '[' };\n\n  for (const char of s) {\n    if (char in map) {\n      if (stack.pop() !== map[char]) return false;\n    } else {\n      stack.push(char);\n    }\n  }\n\n  return stack.length === 0;\n}`,
      javascript: `function isValid(s) {\n  let stack = [];\n  let map = { ')': '(', '}': '{', ']': '[' };\n  for (let c of s) {\n    if (map[c]) {\n      if (stack.pop() !== map[c]) return false;\n    } else {\n      stack.push(c);\n    }\n  }\n  return stack.length === 0;\n}`,
      python: `class Solution:\n    def isValid(self, s: str) -> bool:\n        stack = []\n        mapping = {")": "(", "}": "{", "]": "["}\n        for char in s:\n            if char in mapping:\n                if not stack or stack.pop() != mapping[char]:\n                    return False\n            else:\n                stack.append(char)\n        return not stack`,
    },
    solutionCode: {
      typescript: `function isValid(s: string): boolean {\n  const stack: string[] = [];\n  const map: Record<string, string> = { ')': '(', '}': '{', ']': '[' };\n  for (const char of s) {\n    if (char in map) {\n      if (stack.pop() !== map[char]) return false;\n    } else {\n      stack.push(char);\n    }\n  }\n  return stack.length === 0;\n}`,
      python: `def is_valid(s: str) -> bool:\n    stack = []\n    mapping = {')': '(', '}': '{', ']': '['}\n    for c in s:\n        if c in mapping:\n            if not stack or stack.pop() != mapping[c]:\n                return False\n        else:\n            stack.append(c)\n    return not stack`,
    },
    hints: [
      "Use a LIFO Stack to remember recently opened bracket types.",
      "When encountering a closing bracket, the top of the stack must be its matching open counterpart.",
      "At the end, verify that the stack is completely empty.",
    ],
    externalUrl: "https://leetcode.com/problems/valid-parentheses/",
    externalPlatform: "LeetCode",
    isLocalExecutable: true,
    testCases: [
      { input: ["()"], expected: true },
      { input: ["()[]{}"], expected: true },
      { input: ["(]"], expected: false },
      { input: ["([)]"], expected: false },
      { input: ["{[]}"], expected: true },
    ],
  },
  {
    id: "prob-two-sum",
    slug: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Hash Tables",
    acceptanceRate: "52.8%",
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice.`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1].",
      },
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
    ],
    starterCode: {
      typescript: `function twoSum(nums: number[], target: number): number[] {\n  const map = new Map<number, number>();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement)!, i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}`,
      javascript: `function twoSum(nums, target) {\n  let map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    let comp = target - nums[i];\n    if (map.has(comp)) return [map.get(comp), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}`,
      python: `class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        seen = {}\n        for i, num in enumerate(nums):\n            comp = target - num\n            if comp in seen:\n                return [seen[comp], i]\n            seen[num] = i\n        return []`,
    },
    solutionCode: {
      typescript: `function twoSum(nums: number[], target: number): number[] {\n  const map = new Map<number, number>();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) return [map.get(complement)!, i];\n    map.set(nums[i], i);\n  }\n  return [];\n}`,
      python: `def two_sum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        if target - num in seen:\n            return [seen[target - num], i]\n        seen[num] = i\n    return []`,
    },
    hints: [
      "Instead of checking all pairs O(n^2), store previously seen numbers in a Hash Table.",
      "For each element x, check if (target - x) already exists in the table.",
    ],
    externalUrl: "https://leetcode.com/problems/two-sum/",
    externalPlatform: "LeetCode",
    isLocalExecutable: true,
    testCases: [
      { input: [[2, 7, 11, 15], 9], expected: [0, 1] },
      { input: [[3, 2, 4], 6], expected: [1, 2] },
      { input: [[3, 3], 6], expected: [0, 1] },
    ],
  },
];

export function getProblemBySlug(slug: string): PracticeProblem | undefined {
  return practiceProblems.find((p) => p.slug === slug);
}
