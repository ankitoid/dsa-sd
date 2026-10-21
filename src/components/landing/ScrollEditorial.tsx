"use client";

import React, { useState } from "react";
import { siteConfig } from "@/lib/config";
import { Check, Eye, GitCompare, Activity, Code, Clock, Sparkles } from "lucide-react";

export function ScrollEditorial() {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const stepIcons = [
    <Eye key={0} className="w-5 h-5 text-accent" />,
    <Activity key={1} className="w-5 h-5 text-blue-500" />,
    <GitCompare key={2} className="w-5 h-5 text-purple-500" />,
    <Clock key={3} className="w-5 h-5 text-amber-500" />,
    <Code key={4} className="w-5 h-5 text-emerald-500" />,
    <Sparkles key={5} className="w-5 h-5 text-rose-500" />,
  ];

  const stepVisuals = [
    {
      title: "Mental Model Invariant",
      content: (
        <div className="font-mono text-xs space-y-2">
          <div className="text-neutral-400">&#47;&#47; Establish invariant before writing code</div>
          <div className="p-3 bg-[#0B0C0B] rounded border border-neutral-800 text-neutral-200">
            Search interval: [low, high]<br />
            Invariant: target ∈ nums[low..high] if target exists in nums.
          </div>
        </div>
      ),
    },
    {
      title: "Interactive Pointer Mutation",
      content: (
        <div className="font-mono text-xs space-y-2">
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-accent/20 text-accent rounded font-bold">low: 0</span>
            <span className="px-2 py-1 bg-white/10 text-white rounded font-bold">mid: 4</span>
            <span className="px-2 py-1 bg-neutral-800 text-neutral-300 rounded font-bold">high: 9</span>
          </div>
          <div className="text-neutral-400 text-[11px]">
            nums[4] = 16 &lt; target (23) &rarr; prune [0..4], low = 5
          </div>
        </div>
      ),
    },
    {
      title: "Trade-off Spectrum",
      content: (
        <div className="font-mono text-xs space-y-2">
          <div className="flex justify-between text-neutral-400">
            <span>Brute Force: O(N)</span>
            <span>Binary Search: O(log N)</span>
          </div>
          <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
            <div className="bg-accent h-full w-[12%]" />
          </div>
          <div className="text-right text-[10px] text-accent">99.9% fewer CPU cycles</div>
        </div>
      ),
    },
    {
      title: "Hardware & Memory Layout",
      content: (
        <div className="font-mono text-xs space-y-2">
          <div className="text-neutral-300 font-semibold">64-byte CPU Cache Line:</div>
          <div className="grid grid-cols-4 gap-1 text-center text-[10px]">
            <span className="bg-emerald-950 text-emerald-400 p-1 rounded border border-emerald-800">L1 Hit (1ns)</span>
            <span className="bg-emerald-950 text-emerald-400 p-1 rounded border border-emerald-800">L2 (4ns)</span>
            <span className="bg-amber-950 text-amber-400 p-1 rounded border border-amber-800">L3 (10ns)</span>
            <span className="bg-rose-950 text-rose-400 p-1 rounded border border-rose-800">RAM (100ns)</span>
          </div>
        </div>
      ),
    },
    {
      title: "Monaco Test Execution",
      content: (
        <div className="font-mono text-xs space-y-1.5 text-neutral-300">
          <div className="text-emerald-400 font-bold">&check; Test 1 passed (0.2ms)</div>
          <div className="text-emerald-400 font-bold">&check; Test 2 passed (0.1ms)</div>
          <div className="text-neutral-500 text-[11px]">Memory allocated: 4.2 MB</div>
        </div>
      ),
    },
    {
      title: "Spaced Repetition Schedule",
      content: (
        <div className="font-mono text-xs space-y-2">
          <div className="text-neutral-300">Next active recall cue:</div>
          <div className="flex items-center gap-2 text-accent">
            <Clock className="w-4 h-4" />
            <span className="font-bold">Scheduled in 3 days</span>
          </div>
          <div className="text-[11px] text-neutral-400">SuperMemo SM-2 interval algorithm</div>
        </div>
      ),
    },
  ];

  return (
    <section className="py-20 md:py-28 border-b border-border/80 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="max-w-3xl space-y-4">
          <div className="text-xs font-mono uppercase tracking-wider text-foreground-muted font-semibold">
            The Learning Methodology
          </div>
          <h2 className="text-title-1 text-foreground font-sans tracking-tight">
            Learn by understanding, not by memorization.
          </h2>
          <p className="text-foreground-muted text-base leading-relaxed">
            Every concept on DevMastery follows a structured six-step pedagogical framework designed for enduring retention and whiteboard fluency.
          </p>
        </div>

        {/* Interactive 6-step progression */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Steps List */}
          <div className="lg:col-span-7 space-y-3">
            {siteConfig.promise.steps.map((step, idx) => {
              const isActive = idx === activeStepIndex;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`p-5 rounded-xl border transition-all duration-200 cursor-pointer select-none ${
                    isActive
                      ? "bg-[#141414] text-white border-transparent shadow-card dark:bg-white dark:text-black"
                      : "bg-surface-muted/50 border-border hover:border-foreground-muted/60 text-foreground"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-2 rounded-lg mt-0.5 ${
                        isActive
                          ? "bg-white/10 dark:bg-black/10"
                          : "bg-surface border border-border"
                      }`}
                    >
                      {stepIcons[idx]}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider opacity-60">
                          Step 0{idx + 1}
                        </span>
                        <h4 className="font-semibold text-base font-sans">{step.title}</h4>
                      </div>
                      <p
                        className={`text-sm leading-relaxed ${
                          isActive
                            ? "text-neutral-300 dark:text-neutral-600"
                            : "text-foreground-muted"
                        }`}
                      >
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sticky Step Visual Preview Card */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="rounded-2xl border border-[#272B27] bg-[#121412] text-[#EDEDEB] p-6 shadow-card space-y-4">
              <div className="flex items-center justify-between border-b border-[#232723] pb-3">
                <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
                  Live Mechanism Inspection
                </span>
                <span className="text-xs font-mono text-neutral-500">
                  Step {activeStepIndex + 1} of 6
                </span>
              </div>

              <div>
                <h4 className="text-base font-semibold text-white font-sans">
                  {stepVisuals[activeStepIndex].title}
                </h4>
                <div className="mt-4 p-4 rounded-xl bg-[#0D0E0D] border border-[#202420]">
                  {stepVisuals[activeStepIndex].content}
                </div>
              </div>

              <div className="text-[11px] font-mono text-neutral-500 pt-2 border-t border-[#232723]">
                Deterministic execution ensures reproducibility across every device and browser.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
