export const siteConfig = {
  name: "DevMastery",
  tagline: "Understand the engineering behind great software.",
  description:
    "Master algorithms. Learn to design systems. Build the reasoning that makes you a better engineer.",
  promise: {
    headline: "Understand the concept. See how it works. Solve it yourself. Design it at scale.",
    steps: [
      {
        title: "Understand the intuition",
        desc: "Build mental models using crystal-clear prose and real-world engineering analogies.",
      },
      {
        title: "Visualize the mechanism",
        desc: "Watch state mutate in real time through interactive, deterministic visualizers.",
      },
      {
        title: "Compare approaches",
        desc: "Inspect brute-force vs optimal trade-offs side by side with rigorous complexity curves.",
      },
      {
        title: "Analyze complexity",
        desc: "Understand Big-O through memory layouts, CPU cache lines, and hardware constraints.",
      },
      {
        title: "Solve independently",
        desc: "Write and test real code in our integrated Monaco workspace with edge cases.",
      },
      {
        title: "Review and retain",
        desc: "Keep mastery sharp using algorithmic spaced-repetition schedules and revision cues.",
      },
    ],
  },
  links: {
    github: "https://github.com",
    leetcode: "https://leetcode.com",
    geeksforgeeks: "https://www.geeksforgeeks.org",
  },
  author: {
    name: "DevMastery Engineering",
    role: "Senior Engineering & Product Collective",
  },
  navItems: [
    { label: "Learn", href: "/learn", hasDropdown: true },
    { label: "DSA", href: "/learn/dsa" },
    { label: "System Design", href: "/learn/system-design" },
    { label: "Practice", href: "/practice" },
    { label: "Roadmaps", href: "/roadmaps" },
  ],
  announcement: {
    badge: "Interactive 2.0",
    text: "Experience deterministic algorithm step-runners and interactive system design diagrams.",
    href: "/learn/dsa/algorithms/binary-search",
  },
};
