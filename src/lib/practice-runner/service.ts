export interface ExecutionResult {
  success: boolean;
  status: "PASSED" | "FAILED" | "RUNTIME_ERROR" | "TIMEOUT" | "REMOTE_JUDGE_REQUIRED";
  executionMode: "LOCAL_SANDBOX" | "REMOTE_JUDGE_STUB";
  runtimeMs: number;
  testCaseResults: Array<{
    caseIndex: number;
    passed: boolean;
    input: string;
    expected: string;
    actual: string;
    error?: string;
  }>;
  totalPassed: number;
  totalCases: number;
  stdout?: string;
  message?: string;
}

/**
 * Sandboxed Worker Code Template
 * Disables access to network and storage APIs, executing user code inside an isolated background thread.
 */
const WORKER_SCRIPT = `
self.onmessage = function(e) {
  var data = e.data;
  var code = data.code;
  var funcName = data.funcName;
  var testCases = data.testCases;

  // Disarm browser network & external script loading APIs
  self.fetch = undefined;
  self.XMLHttpRequest = undefined;
  self.WebSocket = undefined;
  self.EventSource = undefined;
  self.importScripts = undefined;

  try {
    var fnHarness = '"use strict";\\n' + code + '\\nif (typeof ' + funcName + ' !== "function") throw new Error("Function \'" + ' + JSON.stringify(funcName) + ' + "\' was not defined."); return ' + funcName + ';';
    var solutionFn = new Function(fnHarness)();

    var results = [];
    var passedCount = 0;

    for (var i = 0; i < testCases.length; i++) {
      var tc = testCases[i];
      var clonedInput = JSON.parse(JSON.stringify(tc.input));
      var expectedStr = JSON.stringify(tc.expected);

      try {
        var actualResult = solutionFn.apply(null, clonedInput);
        var actualStr = JSON.stringify(actualResult);
        var isMatch = actualStr === expectedStr;
        if (isMatch) passedCount++;

        results.push({
          caseIndex: i + 1,
          passed: isMatch,
          input: JSON.stringify(tc.input),
          expected: expectedStr,
          actual: actualStr !== undefined ? actualStr : "undefined"
        });
      } catch (err) {
        results.push({
          caseIndex: i + 1,
          passed: false,
          input: JSON.stringify(tc.input),
          expected: expectedStr,
          actual: "ERROR",
          error: err ? (err.message || String(err)) : "Runtime execution error"
        });
      }
    }

    self.postMessage({
      success: passedCount === testCases.length,
      status: passedCount === testCases.length ? "PASSED" : "FAILED",
      testCaseResults: results,
      totalPassed: passedCount
    });
  } catch (parseErr) {
    self.postMessage({
      success: false,
      status: "RUNTIME_ERROR",
      message: parseErr ? (parseErr.message || String(parseErr)) : "Evaluation error",
      testCaseResults: [],
      totalPassed: 0
    });
  }
};
`;

/**
 * Clean, safe execution-service abstraction.
 * Executes JavaScript/TypeScript algorithms inside a sandboxed Web Worker with a strict 2500ms timeout
 * to prevent infinite loops, DOM manipulation, or UI thread freezing.
 */
export async function executeProblemCode(
  problemSlug: string,
  language: string,
  userCode: string,
  testCases: Array<{ input: any[]; expected: any }>
): Promise<ExecutionResult> {
  const startTime = performance.now();

  // If language is not JS/TS, clearly notify user that a secure remote container judge is required
  if (language !== "typescript" && language !== "javascript") {
    return {
      success: false,
      status: "REMOTE_JUDGE_REQUIRED",
      executionMode: "REMOTE_JUDGE_STUB",
      runtimeMs: 0,
      testCaseResults: [],
      totalPassed: 0,
      totalCases: testCases.length,
      message: `Direct local browser sandbox execution is only supported for JavaScript and TypeScript. ${language.toUpperCase()} execution requires an external containerized Judge0 / Piston runner (configured via NEXT_PUBLIC_JUDGE_API_URL).`,
    };
  }

  // Strip TypeScript type annotations for parsing
  let executableJs = userCode;
  if (language === "typescript") {
    executableJs = userCode
      .replace(/:\s*number\[\]/g, "")
      .replace(/:\s*string\[\]/g, "")
      .replace(/:\s*boolean\[\]/g, "")
      .replace(/:\s*number/g, "")
      .replace(/:\s*string/g, "")
      .replace(/:\s*boolean/g, "")
      .replace(/:\s*void/g, "")
      .replace(/:\s*any/g, "")
      .replace(/as\s+[a-zA-Z<>\[\]]+/g, "");
  }

  // Determine function name
  const funcMatch = executableJs.match(/function\s+([a-zA-Z0-9_]+)\s*\(/);
  if (!funcMatch) {
    return {
      success: false,
      status: "RUNTIME_ERROR",
      executionMode: "LOCAL_SANDBOX",
      runtimeMs: Math.round(performance.now() - startTime),
      testCaseResults: [],
      totalPassed: 0,
      totalCases: testCases.length,
      message: "No valid function definition found. Please declare your solution as 'function <name>(...)'.",
    };
  }

  const funcName = funcMatch[1];

  // If running in browser with Web Worker support, execute in isolated background thread with timeout
  if (typeof window !== "undefined" && typeof Worker !== "undefined" && typeof Blob !== "undefined") {
    return new Promise((resolve) => {
      let isSettled = false;
      const TIMEOUT_MS = 2500;
      let blobUrl: string | null = null;
      let worker: Worker | null = null;

      const cleanup = () => {
        if (worker) {
          worker.terminate();
          worker = null;
        }
        if (blobUrl) {
          URL.revokeObjectURL(blobUrl);
          blobUrl = null;
        }
      };

      const timeoutTimer = setTimeout(() => {
        if (!isSettled) {
          isSettled = true;
          cleanup();
          resolve({
            success: false,
            status: "TIMEOUT",
            executionMode: "LOCAL_SANDBOX",
            runtimeMs: TIMEOUT_MS,
            testCaseResults: [],
            totalPassed: 0,
            totalCases: testCases.length,
            message: `Execution timed out (${TIMEOUT_MS}ms limit). Your code may contain an infinite loop or excessive recursion.`,
          });
        }
      }, TIMEOUT_MS);

      try {
        const blob = new Blob([WORKER_SCRIPT], { type: "application/javascript" });
        blobUrl = URL.createObjectURL(blob);
        worker = new Worker(blobUrl);

        worker.onmessage = (event: MessageEvent) => {
          if (isSettled) return;
          isSettled = true;
          clearTimeout(timeoutTimer);
          const data = event.data;
          const duration = Math.round(performance.now() - startTime);
          cleanup();

          resolve({
            success: data.success,
            status: data.status,
            executionMode: "LOCAL_SANDBOX",
            runtimeMs: duration,
            testCaseResults: data.testCaseResults || [],
            totalPassed: data.totalPassed || 0,
            totalCases: testCases.length,
            message: data.message,
          });
        };

        worker.onerror = (err: ErrorEvent) => {
          if (isSettled) return;
          isSettled = true;
          clearTimeout(timeoutTimer);
          const duration = Math.round(performance.now() - startTime);
          cleanup();

          resolve({
            success: false,
            status: "RUNTIME_ERROR",
            executionMode: "LOCAL_SANDBOX",
            runtimeMs: duration,
            testCaseResults: [],
            totalPassed: 0,
            totalCases: testCases.length,
            message: err.message || "Worker runtime evaluation error",
          });
        };

        worker.postMessage({
          code: executableJs,
          funcName,
          testCases,
        });
      } catch (workerInitErr: any) {
        if (!isSettled) {
          isSettled = true;
          clearTimeout(timeoutTimer);
          cleanup();
          resolve({
            success: false,
            status: "RUNTIME_ERROR",
            executionMode: "LOCAL_SANDBOX",
            runtimeMs: Math.round(performance.now() - startTime),
            testCaseResults: [],
            totalPassed: 0,
            totalCases: testCases.length,
            message: workerInitErr?.message || "Failed to initialize execution sandbox",
          });
        }
      }
    });
  }

  // Non-browser / fallback environment
  return {
    success: false,
    status: "RUNTIME_ERROR",
    executionMode: "LOCAL_SANDBOX",
    runtimeMs: 0,
    testCaseResults: [],
    totalPassed: 0,
    totalCases: testCases.length,
    message: "Web Worker sandbox execution is only available in browser environments.",
  };
}
