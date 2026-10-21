import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { Github, Twitter, BookOpen, Sparkles, Terminal } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-[#101110] text-[#EDEDEB] border-t border-[#232723] pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-[#232723]">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-black font-mono font-bold text-xs tracking-tighter shadow-sm">
                <span className="text-emerald-600 font-extrabold">&gt;</span>
                <span>D</span>
              </div>
              <span className="font-semibold text-lg tracking-tight text-white font-sans">
                {siteConfig.name}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-accent inline-block" />
            </div>
            <p className="text-sm text-neutral-400 max-w-sm leading-relaxed">
              {siteConfig.description} An editorial engineering textbook combined with deterministic interactive visualizers.
            </p>
            <div className="pt-2 text-xs font-mono text-neutral-500">
              Deterministic runtime &middot; No hype &middot; Pure engineering
            </div>
          </div>

          {/* DSA Curriculum */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
              Algorithms & DSA
            </h4>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li>
                <Link href="/learn/dsa" className="hover:text-accent transition-colors">
                  All DSA Topics
                </Link>
              </li>
              <li>
                <Link href="/learn/dsa/algorithms/binary-search" className="hover:text-accent transition-colors">
                  Binary Search Visualizer
                </Link>
              </li>
              <li>
                <Link href="/learn/dsa/algorithms/sliding-window" className="hover:text-accent transition-colors">
                  Sliding Window Mechanics
                </Link>
              </li>
              <li>
                <Link href="/learn/dsa/algorithms/graph-traversal" className="hover:text-accent transition-colors">
                  BFS & DFS Graph Traversal
                </Link>
              </li>
              <li>
                <Link href="/roadmaps/dsa" className="hover:text-accent transition-colors">
                  DSA Progression Roadmap
                </Link>
              </li>
            </ul>
          </div>

          {/* System Design */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
              System Design
            </h4>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li>
                <Link href="/learn/system-design" className="hover:text-accent transition-colors">
                  Foundations Curriculum
                </Link>
              </li>
              <li>
                <Link href="/learn/system-design/case-studies/url-shortener" className="hover:text-accent transition-colors">
                  URL Shortener Architecture
                </Link>
              </li>
              <li>
                <Link href="/learn/system-design/case-studies/rate-limiter" className="hover:text-accent transition-colors">
                  Token Bucket Rate Limiter
                </Link>
              </li>
              <li>
                <Link href="/roadmaps/system-design" className="hover:text-accent transition-colors">
                  System Design Roadmap
                </Link>
              </li>
              <li>
                <Link href="/practice" className="hover:text-accent transition-colors">
                  Monaco Code Studio
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform & Account */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold">
              Platform
            </h4>
            <ul className="space-y-2 text-sm text-neutral-300">
              <li>
                <Link href="/dashboard" className="hover:text-accent transition-colors">
                  Learning Dashboard
                </Link>
              </li>
              <li>
                <Link href="/bookmarks" className="hover:text-accent transition-colors">
                  Saved Lessons & Problems
                </Link>
              </li>
              <li>
                <Link href="/progress" className="hover:text-accent transition-colors">
                  Progress & Analytics
                </Link>
              </li>
              <li>
                <Link href="/resources" className="hover:text-accent transition-colors">
                  Recommended Reading
                </Link>
              </li>
              <li>
                <Link href="/settings" className="hover:text-accent transition-colors">
                  Account & Preferences
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <div>
            &copy; {new Date().getFullYear()} {siteConfig.name}. Designed with engineering rigor and Apple-grade restraint.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/resources" className="hover:text-neutral-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/resources" className="hover:text-neutral-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/resources" className="hover:text-neutral-300 transition-colors">
              Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
