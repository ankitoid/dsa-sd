import { UserProgressState } from "@/types";

const PROGRESS_STORAGE_KEY = "devmastery_user_progress_v1";

export const initialProgress: UserProgressState = {
  completedLessons: ["dsa-binary-search-foundations"],
  bookmarkedItems: [
    {
      id: "bm-1",
      title: "Binary Search: Invariants & Logarithmic Elimination",
      href: "/learn/dsa/algorithms/binary-search",
      type: "dsa-lesson",
      dateAdded: "2026-03-15",
    },
    {
      id: "bm-2",
      title: "Design a Scalable URL Shortener",
      href: "/learn/system-design/case-studies/url-shortener",
      type: "sd-case-study",
      dateAdded: "2026-03-16",
    },
    {
      id: "bm-3",
      title: "Longest Substring Without Repeating Characters",
      href: "/practice?problem=longest-substring-without-repeating-characters",
      type: "problem",
      dateAdded: "2026-03-18",
    },
  ],
  solvedProblems: ["prob-binary-search", "prob-two-sum"],
  solvedSdChallenges: ["sd-url-shortener"],
  revisionQueue: [
    {
      id: "rev-1",
      title: "Binary Search Invariants & Safe Midpoint",
      href: "/learn/dsa/algorithms/binary-search",
      intervalDays: 3,
      nextReviewDate: "Tomorrow",
      reason: "Recently completed lesson due for 1st spaced repetition cycle",
    },
    {
      id: "rev-2",
      title: "Token Bucket vs Sliding Window Rate Limiting",
      href: "/learn/system-design/case-studies/rate-limiter",
      intervalDays: 7,
      nextReviewDate: "In 3 days",
      reason: "High-yield system design concept marked for interview revision",
    },
  ],
  dailyGoalMinutes: 45,
  minutesSpentToday: 32,
  streakDays: 6,
};

export function getStoredProgress(): UserProgressState {
  if (typeof window === "undefined") {
    return initialProgress;
  }

  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(initialProgress));
      return initialProgress;
    }
    return JSON.parse(raw);
  } catch (e) {
    return initialProgress;
  }
}

export function saveStoredProgress(progress: UserProgressState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
    window.dispatchEvent(new Event("devmastery_progress_updated"));
  } catch (e) {
    console.error("Failed to save progress", e);
  }
}
