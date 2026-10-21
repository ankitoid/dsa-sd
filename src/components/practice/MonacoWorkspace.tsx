"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { PracticeProblem } from "@/types";
import { executeProblemCode, ExecutionResult } from "@/lib/practice-runner/service";
import { useProgress } from "@/hooks/useProgress";
import { Button } from "@/ui/Button";
import { Badge } from "@/ui/Badge";
import {
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ExternalLink,
  Lightbulb,
  Clock,
  Sparkles,
  Terminal,
  ShieldAlert,
} from "lucide-react";

// Dynamic import of Monaco Editor with ssr: false to prevent SSR errors
const Editor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[380px] bg-[#121412] text-neutral-400 flex items-center justify-center font-mono text-xs">
      Initializing Monaco Editor...
    </div>
  ),
});

interface MonacoWorkspaceProps {
  problem: PracticeProblem;
}

export function MonacoWorkspace({ problem }: MonacoWorkspaceProps) {
  const { markProblemSolved, isProblemSolved } = useProgress();
  const [selectedLanguage, setSelectedLanguage] = useState<"typescript" | "javascript" | "python">("typescript");
  const [userCode, setUserCode] = useState<string>(problem.starterCode.typescript);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [executionResult, setExecutionResult] = useState<ExecutionResult | null>(null);
  const [activeTab, setActiveTab] = useState<"description" | "hints" | "solution">("description");
  const [testTab, setTestTab] = useState<"testcases" | "output">("testcases");

  const isSolved = isProblemSolved(problem.id);

  // Sync starter code when language or problem changes
  useEffect(() => {
    setUserCode(problem.starterCode[selectedLanguage] || problem.starterCode.typescript);
    setExecutionResult(null);
  }, [problem.slug, selectedLanguage, problem.starterCode]);

  const handleResetCode = () => {
    setUserCode(problem.starterCode[selectedLanguage] || problem.starterCode.typescript);
    setExecutionResult(null);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setTestTab("output");

    try {
      const result = await executeProblemCode(
        problem.slug,
        selectedLanguage,
        userCode,
        problem.testCases
      );
      setExecutionResult(result);

      if (result.success) {
        markProblemSolved(problem.id);
      }
    } catch (err: any) {
      setExecutionResult({
        success: false,
        status: "RUNTIME_ERROR",
        executionMode: "LOCAL_SANDBOX",
        runtimeMs: 0,
        testCaseResults: [],
        totalPassed: 0,
        totalCases: problem.testCases.length,
        message: err?.message || String(err),
      });
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Left Column: Problem Details / Description / Hints / Solution */}
      <div className="lg:col-span-5 bg-surface border border-border rounded-xl shadow-card overflow-hidden flex flex-col h-[750px]">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-between px-4 py-2.5 border-b border-border bg-surface-muted/60 text-xs font-medium">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab("description")}
              className={`px-3 py-1 rounded-md transition-colors ${
                activeTab === "description"
                  ? "bg-surface text-foreground font-semibold shadow-subtle"
                  : "text-foreground-muted hover:text-foreground"
              }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("hints")}
              className={`px-3 py-1 rounded-md transition-colors ${
                activeTab === "hints"
                  ? "bg-surface text-foreground font-semibold shadow-subtle"
                  : "text-foreground-muted hover:text-foreground"
              }`}
            >
              Hints ({problem.hints.length})
            </button>
            <button
              onClick={() => setActiveTab("solution")}
              className={`px-3 py-1 rounded-md transition-colors ${
                activeTab === "solution"
                  ? "bg-surface text-foreground font-semibold shadow-subtle"
                  : "text-foreground-muted hover:text-foreground"
              }`}
            >
              Solution
            </button>
          </div>

          {isSolved && (
            <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-700 font-bold dark:text-emerald-400">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Solved</span>
            </span>
          )}
        </div>

        {/* Tab Content */}
        <div className="flex-1 p-5 overflow-y-auto space-y-5 text-sm font-sans">
          {activeTab === "description" && (
            <div className="space-y-5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant={problem.difficulty === "Easy" ? "easy" : problem.difficulty === "Medium" ? "medium" : "hard"}>
                    {problem.difficulty}
                  </Badge>
                  <span className="text-xs font-mono text-foreground-muted">
                    {problem.category}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-foreground">{problem.title}</h2>
              </div>

              {/* Problem Description */}
              <div className="text-foreground leading-relaxed whitespace-pre-line text-sm">
                {problem.description}
              </div>

              {/* Examples */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-mono uppercase tracking-wider text-foreground-muted font-bold">
                  Examples:
                </div>
                {problem.examples.map((ex, idx) => (
                  <div key={idx} className="p-3.5 bg-surface-muted rounded-lg border border-border space-y-1 font-mono text-xs">
                    <div>
                      <span className="text-foreground-muted">Input: </span>
                      <span className="text-foreground font-semibold">{ex.input}</span>
                    </div>
                    <div>
                      <span className="text-foreground-muted">Output: </span>
                      <span className="text-accent-text font-bold">{ex.output}</span>
                    </div>
                    {ex.explanation && (
                      <div className="text-foreground-muted text-[11px] pt-1 font-sans">
                        Explanation: {ex.explanation}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Constraints */}
              <div className="space-y-2 pt-2">
                <div className="text-xs font-mono uppercase tracking-wider text-foreground-muted font-bold">
                  Constraints:
                </div>
                <ul className="space-y-1 text-xs font-mono text-foreground-muted">
                  {problem.constraints.map((c, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span>&bull;</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* External Link */}
              {problem.externalUrl && (
                <div className="pt-4 border-t border-border flex items-center justify-between text-xs font-mono text-foreground-muted">
                  <span>External platform:</span>
                  <a
                    href={problem.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-foreground hover:text-accent-text"
                  >
                    <span>Solve on {problem.externalPlatform}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          )}

          {activeTab === "hints" && (
            <div className="space-y-4">
              <h3 className="font-semibold text-base text-foreground flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>Problem Solving Hints</span>
              </h3>
              <div className="space-y-3">
                {problem.hints.map((hint, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-surface-muted border border-border space-y-1 text-xs sm:text-sm">
                    <span className="text-xs font-mono text-foreground-muted font-bold">Hint {idx + 1}:</span>
                    <p className="text-foreground leading-relaxed">{hint}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "solution" && (
            <div className="space-y-4">
              <h3 className="font-semibold text-base text-foreground flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-accent-text" />
                <span>Reference Solution Explanation</span>
              </h3>
              <div className="p-4 rounded-lg bg-surface-muted border border-border text-xs leading-relaxed space-y-2">
                <p>
                  This optimal solution ensures strict algorithmic invariants. Time complexity is optimal and space bounds prevent unnecessary heap allocations.
                </p>
              </div>
              <pre className="p-4 rounded-lg bg-[#101210] text-[#B7F36B] font-mono text-xs overflow-x-auto">
                {problem.solutionCode.typescript}
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Monaco Editor & Test Runner */}
      <div className="lg:col-span-7 bg-[#101210] border border-[#272B27] rounded-xl shadow-elevated flex flex-col h-[750px] overflow-hidden">
        {/* Editor Top Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#171917] border-b border-[#242824] text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="text-neutral-400 font-semibold uppercase text-[11px]">
              Language:
            </span>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value as any)}
              className="bg-[#202420] text-neutral-200 border border-neutral-700 rounded px-2.5 py-1 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-accent"
            >
              <option value="typescript">TypeScript (Local Sandbox)</option>
              <option value="javascript">JavaScript (Local Sandbox)</option>
              <option value="python">Python (External Judge Required)</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetCode}
              className="p-1.5 text-neutral-400 hover:text-white rounded hover:bg-neutral-800 transition-colors"
              title="Reset Code"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>

            <Button
              size="sm"
              variant="accent"
              onClick={handleRunCode}
              isLoading={isRunning}
              className="font-bold text-xs gap-1.5 px-4"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>Run Code</span>
            </Button>
          </div>
        </div>

        {/* Monaco Editor Container */}
        <div className="flex-1 w-full relative">
          <Editor
            height="100%"
            theme="vs-dark"
            language={selectedLanguage === "python" ? "python" : "typescript"}
            value={userCode}
            onChange={(val) => setUserCode(val || "")}
            options={{
              minimap: { enabled: false },
              fontSize: 13,
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              lineNumbers: "on",
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              padding: { top: 12 },
            }}
          />
        </div>

        {/* Bottom Test Case & Results Panel */}
        <div className="h-64 border-t border-[#242824] bg-[#141614] text-[#EDEDEB] flex flex-col">
          {/* Panel Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-[#191B19] border-b border-[#242824] text-xs font-mono">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setTestTab("testcases")}
                className={`transition-colors ${
                  testTab === "testcases" ? "text-white font-bold" : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                Test Cases ({problem.testCases.length})
              </button>
              <button
                onClick={() => setTestTab("output")}
                className={`transition-colors ${
                  testTab === "output" ? "text-white font-bold" : "text-neutral-400 hover:text-neutral-200"
                }`}
              >
                Run Output
              </button>
            </div>

            {executionResult && (
              <span className="text-[11px] font-mono">
                {executionResult.executionMode === "LOCAL_SANDBOX" ? (
                  <span className="text-accent">Local Browser Sandbox &middot; {executionResult.runtimeMs}ms</span>
                ) : (
                  <span className="text-amber-400">Remote Judge Stub</span>
                )}
              </span>
            )}
          </div>

          {/* Panel Body */}
          <div className="flex-1 p-4 overflow-y-auto font-mono text-xs">
            {testTab === "testcases" ? (
              <div className="space-y-2">
                {problem.testCases.map((tc, idx) => (
                  <div key={idx} className="p-2.5 rounded bg-[#0E100E] border border-[#212521] space-y-1">
                    <span className="text-neutral-500 font-bold">Case {idx + 1}:</span>
                    <div>
                      <span className="text-neutral-400">Input: </span>
                      <span className="text-neutral-200">{JSON.stringify(tc.input)}</span>
                    </div>
                    <div>
                      <span className="text-neutral-400">Expected: </span>
                      <span className="text-accent">{JSON.stringify(tc.expected)}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                {!executionResult ? (
                  <div className="text-neutral-500 text-center py-8 font-sans">
                    Click &apos;Run Code&apos; to execute test cases in the local sandbox.
                  </div>
                ) : executionResult.status === "REMOTE_JUDGE_REQUIRED" ? (
                  <div className="p-4 rounded-lg bg-amber-950/40 border border-amber-800 text-amber-200 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-amber-400">
                      <ShieldAlert className="w-4 h-4" />
                      <span>Remote Container Judge Required</span>
                    </div>
                    <p className="text-xs leading-relaxed font-sans">{executionResult.message}</p>
                  </div>
                ) : executionResult.status === "RUNTIME_ERROR" ? (
                  <div className="p-4 rounded-lg bg-rose-950/40 border border-rose-800 text-rose-200 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-rose-400">
                      <XCircle className="w-4 h-4" />
                      <span>Runtime / Evaluation Error</span>
                    </div>
                    <pre className="text-xs text-rose-300 whitespace-pre-wrap">{executionResult.message}</pre>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                      <div className="flex items-center gap-2">
                        {executionResult.success ? (
                          <CheckCircle2 className="w-4 h-4 text-accent" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-500" />
                        )}
                        <span
                          className={`font-bold ${
                            executionResult.success ? "text-accent" : "text-rose-400"
                          }`}
                        >
                          {executionResult.success ? "All Test Cases Passed!" : "Test Cases Failed"}
                        </span>
                      </div>
                      <span className="text-neutral-400">
                        {executionResult.totalPassed} / {executionResult.totalCases} Passed
                      </span>
                    </div>

                    <div className="space-y-2">
                      {executionResult.testCaseResults.map((tc) => (
                        <div
                          key={tc.caseIndex}
                          className={`p-2.5 rounded border text-xs ${
                            tc.passed
                              ? "bg-emerald-950/20 border-emerald-900 text-neutral-300"
                              : "bg-rose-950/20 border-rose-900 text-neutral-300"
                          }`}
                        >
                          <div className="flex items-center justify-between font-bold mb-1">
                            <span>Test Case #{tc.caseIndex}</span>
                            <span className={tc.passed ? "text-accent" : "text-rose-400"}>
                              {tc.passed ? "PASSED" : "FAILED"}
                            </span>
                          </div>
                          <div>Input: {tc.input}</div>
                          <div>Expected: {tc.expected}</div>
                          <div>Actual: {tc.actual}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
