"use client";

import React, { useState } from "react";
import { SystemDesignCaseStudy } from "@/types";
import { ChevronDown, ChevronRight, CheckCircle2, HelpCircle, Eye, EyeOff, Lightbulb } from "lucide-react";
import { Button } from "@/ui/Button";

interface GuidedInterviewProps {
  caseStudy: SystemDesignCaseStudy;
}

export function GuidedInterview({ caseStudy }: GuidedInterviewProps) {
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleAnswer = (stageIdx: number) => {
    setRevealedAnswers((prev) => ({
      ...prev,
      [stageIdx]: !prev[stageIdx],
    }));
  };

  const toggleCheck = (key: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const currentStage = caseStudy.interviewChecklist[activeStageIndex];

  return (
    <div className="w-full bg-surface border border-border rounded-xl shadow-card p-6 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border">
        <div>
          <h3 className="font-semibold text-lg text-foreground flex items-center gap-2">
            <span>Guided 8-Stage System Design Interview</span>
            <span className="text-xs font-mono font-medium px-2 py-0.5 rounded-full bg-accent/20 text-[#1B3604] border border-accent/40">
              Interactive Interview Mode
            </span>
          </h3>
          <p className="text-xs text-foreground-muted mt-0.5">
            Practice answering real whiteboard prompts with reference solutions and checklists.
          </p>
        </div>

        <div className="text-xs font-mono text-foreground-muted">
          Stage {activeStageIndex + 1} of {caseStudy.interviewChecklist.length}
        </div>
      </div>

      {/* Stage Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {caseStudy.interviewChecklist.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setActiveStageIndex(idx)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 transition-colors border ${
              idx === activeStageIndex
                ? "bg-[#141414] text-white border-transparent dark:bg-white dark:text-black font-semibold"
                : "bg-surface-muted text-foreground-muted border-border hover:text-foreground"
            }`}
          >
            {item.stage.split(".")[0]}. {item.stage.split(".")[1]?.trim() || item.stage}
          </button>
        ))}
      </div>

      {/* Active Stage Content Card */}
      {currentStage && (
        <div className="bg-surface-muted/50 rounded-xl p-5 border border-border space-y-5">
          <div>
            <span className="text-xs font-mono font-semibold text-accent-text uppercase tracking-wider">
              {currentStage.stage}
            </span>
            <h4 className="text-base font-semibold text-foreground mt-1">
              {currentStage.prompt}
            </h4>
          </div>

          {/* Interviewer Thinking & Hints */}
          <div className="space-y-2">
            <div className="text-xs font-mono uppercase tracking-wider text-foreground-muted font-semibold flex items-center gap-1.5">
              <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
              Evaluation Checklist & Key Considerations:
            </div>
            <div className="space-y-2">
              {currentStage.hints.map((hint, hIdx) => {
                const checkKey = `${activeStageIndex}-${hIdx}`;
                const isChecked = checkedItems[checkKey] || false;
                return (
                  <div
                    key={hIdx}
                    onClick={() => toggleCheck(checkKey)}
                    className="flex items-start gap-2.5 p-2.5 rounded-lg bg-surface border border-border/80 text-xs text-foreground cursor-pointer hover:bg-surface-muted transition-colors select-none"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="mt-0.5 rounded border-border text-accent focus:ring-accent"
                    />
                    <span className={isChecked ? "line-through text-foreground-muted" : ""}>
                      {hint}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Model Reasoning / Reference Solution */}
          <div className="pt-2 border-t border-border">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-foreground-muted font-medium">
                Candidate Reference Answer:
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => toggleAnswer(activeStageIndex)}
              >
                {revealedAnswers[activeStageIndex] ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5 mr-1" /> Hide Reference
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5 mr-1" /> Reveal Model Reasoning
                  </>
                )}
              </Button>
            </div>

            {revealedAnswers[activeStageIndex] ? (
              <div className="p-4 rounded-lg bg-[#141414] text-neutral-200 text-xs leading-relaxed font-mono border border-neutral-800 dark:bg-black dark:text-neutral-300">
                <div className="text-accent text-[11px] font-bold mb-2">
                  &#47;&#47; Reference Whiteboard Response:
                </div>
                {currentStage.referenceAnswer}
              </div>
            ) : (
              <div className="p-4 rounded-lg bg-surface border border-dashed border-border text-xs text-center text-foreground-muted">
                Try reasoning through this interview prompt aloud before revealing the model answer.
              </div>
            )}
          </div>
        </div>
      )}

      {/* Stage Step Controls */}
      <div className="flex items-center justify-between pt-2">
        <Button
          size="sm"
          variant="outline"
          disabled={activeStageIndex === 0}
          onClick={() => setActiveStageIndex((i) => i - 1)}
        >
          Previous Stage
        </Button>
        <Button
          size="sm"
          variant="primary"
          disabled={activeStageIndex === caseStudy.interviewChecklist.length - 1}
          onClick={() => setActiveStageIndex((i) => i + 1)}
        >
          Next Stage
        </Button>
      </div>
    </div>
  );
}
