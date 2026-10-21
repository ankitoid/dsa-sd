import React from "react";
import Link from "next/link";
import { BinarySearchVisualizer } from "@/components/dsa/BinarySearchVisualizer";
import { ArrowRight, Binary } from "lucide-react";
import { Button } from "@/ui/Button";

export function BinarySearchPreview() {
  return (
    <section className="py-20 md:py-28 border-b border-border/80 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-foreground-muted font-semibold uppercase tracking-wider">
              <Binary className="w-4 h-4 text-emerald-600" />
              <span>Interactive Concept Preview</span>
            </div>
            <h2 className="text-title-1 text-foreground font-sans tracking-tight">
              Binary Search in action: Halving the universe.
            </h2>
            <p className="text-foreground-muted text-base leading-relaxed">
              Watch how binary search eliminates half of all remaining candidates on every comparison. No guesswork, no magic—just strict logarithmic invariants.
            </p>
          </div>

          <Link href="/learn/dsa/algorithms/binary-search">
            <Button variant="secondary" size="md" className="group text-xs font-semibold">
              <span>View Full Lesson & Edge Cases</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {/* The Working Functional Visualizer */}
        <div className="w-full">
          <BinarySearchVisualizer initialTarget={23} />
        </div>
      </div>
    </section>
  );
}
