"use client";

import React, { useState, useMemo } from "react";
import { Play, Pause, RotateCcw, ChevronLeft, ChevronRight, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { Button } from "@/ui/Button";

interface StepRecord {
  low: number;
  high: number;
  mid: number;
  explanation: string;
  action: "start" | "prune-left" | "prune-right" | "found" | "not-found";
  comparisons: number;
}

const DEFAULT_ARRAY = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];

export function BinarySearchVisualizer({ initialTarget = 23 }: { initialTarget?: number }) {
  const array = DEFAULT_ARRAY;
  const [target, setTarget] = useState<number>(initialTarget);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Pre-calculate the deterministic execution trace
  const steps: StepRecord[] = useMemo(() => {
    const list: StepRecord[] = [];
    let low = 0;
    let high = array.length - 1;
    let comparisons = 0;

    while (low <= high) {
      comparisons++;
      const mid = low + Math.floor((high - low) / 2);
      const midVal = array[mid];

      if (midVal === target) {
        list.push({
          low,
          high,
          mid,
          explanation: `Target ${target} matches array[${mid}] === ${midVal}. Element found!`,
          action: "found",
          comparisons,
        });
        return list;
      } else if (midVal < target) {
        list.push({
          low,
          high,
          mid,
          explanation: `array[${mid}] (${midVal}) is less than target (${target}). Pruning left subspace [${low}..${mid}]. Updating low = ${mid + 1}.`,
          action: "prune-left",
          comparisons,
        });
        low = mid + 1;
      } else {
        list.push({
          low,
          high,
          mid,
          explanation: `array[${mid}] (${midVal}) is greater than target (${target}). Pruning right subspace [${mid}..${high}]. Updating high = ${mid - 1}.`,
          action: "prune-right",
          comparisons,
        });
        high = mid - 1;
      }
    }

    list.push({
      low,
      high,
      mid: -1,
      explanation: `Search space exhausted (low=${low} > high=${high}). Target ${target} does not exist in array.`,
      action: "not-found",
      comparisons,
    });

    return list;
  }, [array, target]);

  const currentStep = steps[currentStepIndex] || steps[0];

  // Auto-play timer
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev < steps.length - 1) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, 1300);
    }
    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const handleNext = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((i) => i + 1);
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((i) => i - 1);
    }
  };

  return (
    <div className="w-full bg-surface border border-border rounded-xl shadow-card p-5 sm:p-7 space-y-6">
      {/* Visualizer Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <h3 className="font-semibold text-base text-foreground flex items-center gap-2">
            <span>Interactive Binary Search Runner</span>
            <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-accent/20 text-[#1B3604] border border-accent/40">
              O(log N)
            </span>
          </h3>
          <p className="text-xs text-foreground-muted mt-0.5">
            Step through array interval pruning with live pointers.
          </p>
        </div>

        {/* Target Select */}
        <div className="flex items-center gap-2 text-xs">
          <label htmlFor="target-select" className="text-foreground-muted font-medium">
            Search Target:
          </label>
          <select
            id="target-select"
            value={target}
            onChange={(e) => {
              setTarget(Number(e.target.value));
              setCurrentStepIndex(0);
              setIsPlaying(false);
            }}
            className="bg-surface-muted border border-border rounded-md px-2.5 py-1 text-xs font-mono font-semibold focus:outline-none focus:ring-1 focus:ring-accent"
          >
            {array.map((val) => (
              <option key={val} value={val}>
                {val} (Present)
              </option>
            ))}
            <option value={7}>7 (Not Present)</option>
            <option value={40}>40 (Not Present)</option>
            <option value={100}>100 (Not Present)</option>
          </select>
        </div>
      </div>

      {/* Array Elements Display */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-mono text-foreground-muted">
          <span>Array size N = {array.length}</span>
          <span>Max steps = ⌈log₂({array.length})⌉ = 4 steps</span>
        </div>

        <div className="overflow-x-auto py-4">
          <div className="flex items-end justify-center min-w-[540px] gap-2 sm:gap-3 px-2">
            {array.map((val, idx) => {
              const isLow = idx === currentStep.low;
              const isHigh = idx === currentStep.high;
              const isMid = idx === currentStep.mid;
              const isFound = isMid && currentStep.action === "found";
              const isPruned = idx < currentStep.low || idx > currentStep.high;

              return (
                <div key={idx} className="flex flex-col items-center gap-2">
                  {/* Top Pointer Tags */}
                  <div className="h-6 flex items-center justify-center text-[10px] font-mono font-bold">
                    {isMid && (
                      <span className="px-1.5 py-0.5 rounded bg-[#141414] text-white dark:bg-white dark:text-black">
                        MID
                      </span>
                    )}
                  </div>

                  {/* Array Element Box */}
                  <div
                    className={`w-11 h-14 sm:w-13 sm:h-16 rounded-lg flex flex-col items-center justify-center font-mono font-bold text-base transition-all duration-300 border ${
                      isFound
                        ? "bg-accent border-[#84CD27] text-black scale-105 shadow-md"
                        : isMid
                        ? "bg-[#141414] text-white border-transparent scale-105"
                        : isPruned
                        ? "bg-surface-muted/40 text-foreground-subtle/50 border-dashed border-border opacity-35"
                        : "bg-surface text-foreground border-border shadow-subtle hover:border-foreground-muted"
                    }`}
                  >
                    <span>{val}</span>
                  </div>

                  {/* Index Label & Low/High indicator */}
                  <div className="flex flex-col items-center gap-0.5">
                    <span className="text-[10px] font-mono text-foreground-subtle">
                      [{idx}]
                    </span>
                    <div className="h-4 flex items-center gap-1 text-[9px] font-mono font-semibold">
                      {isLow && (
                        <span className="text-blue-600 dark:text-blue-400">LOW</span>
                      )}
                      {isHigh && (
                        <span className="text-amber-600 dark:text-amber-400">HIGH</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Explanation Box */}
      <div className="rounded-lg p-4 bg-surface-muted border border-border space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
            <Info className="w-3.5 h-3.5 text-foreground-muted" />
            <span>Step {currentStepIndex + 1} of {steps.length}</span>
          </div>

          <div className="text-[11px] font-mono text-foreground-muted">
            Interval: [{currentStep.low} .. {currentStep.high}] &middot; Mid: {currentStep.mid !== -1 ? currentStep.mid : "N/A"}
          </div>
        </div>

        <p className="text-sm text-foreground leading-relaxed font-sans">
          {currentStep.explanation}
        </p>

        {currentStep.action === "found" && (
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 dark:text-emerald-400 mt-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Success: Located in {currentStep.comparisons} comparison(s)!</span>
          </div>
        )}

        {currentStep.action === "not-found" && (
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-rose-600 dark:text-rose-400 mt-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Search Complete: Target not found after {currentStep.comparisons} comparison(s).</span>
          </div>
        )}
      </div>

      {/* Control Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Prev
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
            onClick={handleNext}
            disabled={currentStepIndex === steps.length - 1}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        <Button size="sm" variant="ghost" onClick={handleReset}>
          <RotateCcw className="w-3.5 h-3.5 mr-1" />
          Reset
        </Button>
      </div>
    </div>
  );
}
