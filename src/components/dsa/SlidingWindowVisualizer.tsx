"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, Info } from "lucide-react";
import { Button } from "@/ui/Button";

interface WindowStep {
  left: number;
  right: number;
  currentChar: string;
  duplicateChar?: string;
  explanation: string;
  maxLen: number;
  seenMap: Record<string, number>;
}

const SAMPLE_STRING = "abcabcbb";

export function SlidingWindowVisualizer() {
  const s = SAMPLE_STRING;
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Precomputed steps for Longest Substring Without Repeating Characters
  const steps: WindowStep[] = [
    {
      left: 0,
      right: 0,
      currentChar: "a",
      explanation: "Expand right to index 0 ('a'). 'a' not in window. Window is ['a']. Max length = 1.",
      maxLen: 1,
      seenMap: { a: 0 },
    },
    {
      left: 0,
      right: 1,
      currentChar: "b",
      explanation: "Expand right to index 1 ('b'). 'b' not in window. Window is ['a', 'b']. Max length = 2.",
      maxLen: 2,
      seenMap: { a: 0, b: 1 },
    },
    {
      left: 0,
      right: 2,
      currentChar: "c",
      explanation: "Expand right to index 2 ('c'). 'c' not in window. Window is ['a', 'b', 'c']. Max length = 3.",
      maxLen: 3,
      seenMap: { a: 0, b: 1, c: 2 },
    },
    {
      left: 1,
      right: 3,
      currentChar: "a",
      duplicateChar: "a",
      explanation: "Expand right to index 3 ('a'). Duplicate 'a' detected! Move left pointer past previous 'a' at 0 -> left becomes 1. Window is now ['b', 'c', 'a']. Length = 3.",
      maxLen: 3,
      seenMap: { a: 3, b: 1, c: 2 },
    },
    {
      left: 2,
      right: 4,
      currentChar: "b",
      duplicateChar: "b",
      explanation: "Expand right to index 4 ('b'). Duplicate 'b' detected! Contract left pointer past previous 'b' at 1 -> left becomes 2. Window is ['c', 'a', 'b']. Length = 3.",
      maxLen: 3,
      seenMap: { a: 3, b: 4, c: 2 },
    },
    {
      left: 3,
      right: 5,
      currentChar: "c",
      duplicateChar: "c",
      explanation: "Expand right to index 5 ('c'). Duplicate 'c' detected! Contract left pointer past previous 'c' at 2 -> left becomes 3. Window is ['a', 'b', 'c']. Length = 3.",
      maxLen: 3,
      seenMap: { a: 3, b: 4, c: 5 },
    },
    {
      left: 5,
      right: 6,
      currentChar: "b",
      duplicateChar: "b",
      explanation: "Expand right to index 6 ('b'). Duplicate 'b' detected at index 4! Contract left pointer to 4 + 1 = 5. Window is ['c', 'b']. Length = 2.",
      maxLen: 3,
      seenMap: { a: 3, b: 6, c: 5 },
    },
    {
      left: 7,
      right: 7,
      currentChar: "b",
      duplicateChar: "b",
      explanation: "Expand right to index 7 ('b'). Duplicate 'b' detected at index 6! Contract left to 6 + 1 = 7. Window is ['b']. Length = 1. Traversal complete.",
      maxLen: 3,
      seenMap: { a: 3, b: 7, c: 5 },
    },
  ];

  const current = steps[stepIndex];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setStepIndex((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 1400);
    }
    return () => clearInterval(timer);
  }, [isPlaying, steps.length]);

  return (
    <div className="w-full bg-surface border border-border rounded-xl shadow-card p-5 sm:p-7 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <h3 className="font-semibold text-base text-foreground flex items-center gap-2">
            <span>Dynamic Sliding Window Caterpillar</span>
            <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-accent/20 text-[#1B3604] border border-accent/40">
              O(N) Amortized
            </span>
          </h3>
          <p className="text-xs text-foreground-muted mt-0.5">
            Watch the [left, right] boundary expand and contract dynamically.
          </p>
        </div>

        <div className="text-xs font-mono bg-surface-muted px-3 py-1.5 rounded-md border border-border">
          Max Substring Length: <span className="font-bold text-accent-text">{current.maxLen}</span>
        </div>
      </div>

      {/* String Characters Box */}
      <div className="overflow-x-auto py-4">
        <div className="flex items-center justify-center min-w-[500px] gap-2">
          {s.split("").map((char, idx) => {
            const inWindow = idx >= current.left && idx <= current.right;
            const isLeft = idx === current.left;
            const isRight = idx === current.right;

            return (
              <div key={idx} className="flex flex-col items-center gap-2">
                <div className="h-5 flex items-center text-[10px] font-mono font-bold">
                  {isLeft && <span className="text-blue-600 dark:text-blue-400">LEFT</span>}
                </div>

                <div
                  className={`w-12 h-14 rounded-lg flex flex-col items-center justify-center font-mono font-bold text-lg border transition-all duration-200 ${
                    inWindow
                      ? "bg-accent/30 border-accent text-foreground shadow-sm scale-105"
                      : "bg-surface-muted/40 text-foreground-subtle border-border opacity-50"
                  }`}
                >
                  <span>{char}</span>
                </div>

                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-[10px] font-mono text-foreground-subtle">[{idx}]</span>
                  <div className="h-5 flex items-center text-[10px] font-mono font-bold">
                    {isRight && <span className="text-amber-600 dark:text-amber-400">RIGHT</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Explanation Box */}
      <div className="rounded-lg p-4 bg-surface-muted border border-border space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold text-foreground">
          <div className="flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-foreground-muted" />
            <span>Step {stepIndex + 1} of {steps.length}</span>
          </div>
          <span className="font-mono text-foreground-muted">
            Window bounds: [{current.left} .. {current.right}] (Length: {current.right - current.left + 1})
          </span>
        </div>
        <p className="text-sm text-foreground leading-relaxed">{current.explanation}</p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={stepIndex === 0}
            onClick={() => {
              setIsPlaying(false);
              setStepIndex((i) => i - 1);
            }}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>

          <Button
            size="sm"
            variant={isPlaying ? "secondary" : "primary"}
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 mr-1" /> Pause
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 mr-1 fill-current" /> Auto Play
              </>
            )}
          </Button>

          <Button
            size="sm"
            variant="outline"
            disabled={stepIndex === steps.length - 1}
            onClick={() => {
              setIsPlaying(false);
              setStepIndex((i) => i + 1);
            }}
          >
            Next Step
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <Button
          size="sm"
          variant="ghost"
          onClick={() => {
            setIsPlaying(false);
            setStepIndex(0);
          }}
        >
          <RotateCcw className="w-3.5 h-3.5 mr-1" />
          Reset
        </Button>
      </div>
    </div>
  );
}
