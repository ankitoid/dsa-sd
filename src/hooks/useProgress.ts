"use client";

import { useState, useEffect, useCallback } from "react";
import { UserProgressState } from "@/types";
import { getStoredProgress, saveStoredProgress } from "@/lib/progress";

export function useProgress() {
  const [progress, setProgress] = useState<UserProgressState>(getStoredProgress);

  useEffect(() => {
    // Sync on mount
    setProgress(getStoredProgress());

    const handleStorage = () => {
      setProgress(getStoredProgress());
    };

    window.addEventListener("devmastery_progress_updated", handleStorage);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("devmastery_progress_updated", handleStorage);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const toggleLessonComplete = useCallback((lessonId: string) => {
    setProgress((prev) => {
      const exists = prev.completedLessons.includes(lessonId);
      const updated: UserProgressState = {
        ...prev,
        completedLessons: exists
          ? prev.completedLessons.filter((id) => id !== lessonId)
          : [...prev.completedLessons, lessonId],
      };
      saveStoredProgress(updated);
      return updated;
    });
  }, []);

  const toggleBookmark = useCallback((item: { id: string; title: string; href: string; type: "dsa-lesson" | "sd-case-study" | "problem" }) => {
    setProgress((prev) => {
      const exists = prev.bookmarkedItems.some((b) => b.id === item.id);
      const updated: UserProgressState = {
        ...prev,
        bookmarkedItems: exists
          ? prev.bookmarkedItems.filter((b) => b.id !== item.id)
          : [...prev.bookmarkedItems, { ...item, dateAdded: new Date().toISOString().split("T")[0] }],
      };
      saveStoredProgress(updated);
      return updated;
    });
  }, []);

  const markProblemSolved = useCallback((problemId: string) => {
    setProgress((prev) => {
      if (prev.solvedProblems.includes(problemId)) return prev;
      const updated: UserProgressState = {
        ...prev,
        solvedProblems: [...prev.solvedProblems, problemId],
      };
      saveStoredProgress(updated);
      return updated;
    });
  }, []);

  const isLessonCompleted = useCallback(
    (lessonId: string) => progress.completedLessons.includes(lessonId),
    [progress.completedLessons]
  );

  const isBookmarked = useCallback(
    (itemId: string) => progress.bookmarkedItems.some((b) => b.id === itemId),
    [progress.bookmarkedItems]
  );

  const isProblemSolved = useCallback(
    (problemId: string) => progress.solvedProblems.includes(problemId),
    [progress.solvedProblems]
  );

  const markSdChallengeSolved = useCallback((challengeId: string) => {
    setProgress((prev) => {
      const currentList = prev.solvedSdChallenges || [];
      if (currentList.includes(challengeId)) return prev;
      const updated: UserProgressState = {
        ...prev,
        solvedSdChallenges: [...currentList, challengeId],
      };
      saveStoredProgress(updated);
      return updated;
    });
  }, []);

  const isSdChallengeSolved = useCallback(
    (challengeId: string) => (progress.solvedSdChallenges || []).includes(challengeId),
    [progress.solvedSdChallenges]
  );

  return {
    progress,
    toggleLessonComplete,
    toggleBookmark,
    markProblemSolved,
    markSdChallengeSolved,
    isLessonCompleted,
    isBookmarked,
    isProblemSolved,
    isSdChallengeSolved,
  };
}
