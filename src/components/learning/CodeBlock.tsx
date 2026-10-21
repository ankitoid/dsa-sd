"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({ code, language = "typescript", showLineNumbers = true }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const lines = code.trim().split("\n");

  return (
    <div className="rounded-xl border border-[#272B27] bg-[#101210] text-[#EDEDEB] overflow-hidden my-4 shadow-card">
      <div className="flex items-center justify-between px-4 py-2 bg-[#171917] border-b border-[#242824] text-xs font-mono text-neutral-400">
        <span className="uppercase text-[11px] font-semibold text-neutral-300">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors text-[11px]"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-accent" />
              <span className="text-accent font-semibold">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <div className="p-4 overflow-x-auto font-mono text-xs leading-relaxed">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-white/[0.03]">
                {showLineNumbers && (
                  <td className="pr-4 text-right text-neutral-600 select-none text-[11px] w-8 align-top">
                    {idx + 1}
                  </td>
                )}
                <td className="text-neutral-200 whitespace-pre font-mono">
                  {line}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
