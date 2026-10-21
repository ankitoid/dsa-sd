"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/config";
import { Button } from "@/ui/Button";
import {
  ChevronDown,
  Menu,
  X,
  Binary,
  Layers,
  Code2,
  Map,
  Sparkles,
  BookOpen,
  ArrowRight,
  LayoutDashboard,
  Network,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [learnDropdownOpen, setLearnDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setLearnDropdownOpen(false);
  }, [pathname]);

  const isDarkTrack = pathname.startsWith("/practice");

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 border-b ${
        scrolled
          ? "bg-background/85 backdrop-blur-md border-border shadow-subtle"
          : "bg-background/95 border-border/60"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Wordmark & Logo */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-[#141414] dark:bg-white flex items-center justify-center text-white dark:text-[#101110] font-mono font-bold text-sm tracking-tighter shadow-sm transition-transform group-hover:scale-105">
              <span className="text-accent dark:text-emerald-600 font-extrabold">&gt;</span>
              <span>D</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-lg tracking-tight text-foreground font-sans">
                {siteConfig.name}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-accent inline-block" />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            {/* Learn Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setLearnDropdownOpen(true)}
              onMouseLeave={() => setLearnDropdownOpen(false)}
            >
              <button
                type="button"
                className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-foreground-muted hover:text-foreground hover:bg-surface-muted transition-colors ${
                  pathname.startsWith("/learn") ? "text-foreground font-semibold" : ""
                }`}
                aria-expanded={learnDropdownOpen}
              >
                <span>Learn</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    learnDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {learnDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 mt-1 w-80 rounded-xl bg-surface border border-border shadow-elevated p-3 z-50"
                  >
                    <div className="space-y-1">
                      <Link
                        href="/learn/dsa"
                        className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-surface-muted transition-colors group"
                      >
                        <div className="p-2 rounded-md bg-accent/20 text-[#1E3B05] mt-0.5 group-hover:bg-accent group-hover:text-black transition-colors">
                          <Binary className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-foreground flex items-center gap-1.5">
                            Data Structures & Algos
                            <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                          </div>
                          <div className="text-xs text-foreground-muted mt-0.5">
                            Visual proofs, step-by-step pointers & complexity.
                          </div>
                        </div>
                      </Link>

                      <Link
                        href="/learn/system-design"
                        className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-surface-muted transition-colors group"
                      >
                        <div className="p-2 rounded-md bg-neutral-200 text-neutral-800 mt-0.5 group-hover:bg-[#141414] group-hover:text-white transition-colors">
                          <Layers className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-foreground flex items-center gap-1.5">
                            System Design
                            <ArrowRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                          </div>
                          <div className="text-xs text-foreground-muted mt-0.5">
                            Real-world architecture, scale trade-offs & diagrams.
                          </div>
                        </div>
                      </Link>

                      <Link
                        href="/practice?tab=system-design"
                        className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-surface-muted transition-colors group"
                      >
                        <div className="p-2 rounded-md bg-accent/20 text-[#1E3B05] mt-0.5 group-hover:bg-accent group-hover:text-black transition-colors">
                          <Network className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-foreground flex items-center gap-1.5">
                            System Design Studio
                            <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-accent/30 text-accent-text font-mono font-bold">Simulator</span>
                          </div>
                          <div className="text-xs text-foreground-muted mt-0.5">
                            Interactive architecture compiler &amp; traffic tester.
                          </div>
                        </div>
                      </Link>
                    </div>

                    <div className="mt-2 pt-2 border-t border-border flex items-center justify-between text-xs text-foreground-muted px-2">
                      <Link
                        href="/learn"
                        className="font-medium hover:text-foreground flex items-center gap-1 text-accent-text"
                      >
                        Browse all curricula &rarr;
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/learn/dsa"
              className={`px-3 py-1.5 rounded-md text-foreground-muted hover:text-foreground hover:bg-surface-muted transition-colors ${
                pathname === "/learn/dsa" ? "text-foreground font-semibold" : ""
              }`}
            >
              DSA
            </Link>

            <Link
              href="/learn/system-design"
              className={`px-3 py-1.5 rounded-md text-foreground-muted hover:text-foreground hover:bg-surface-muted transition-colors ${
                pathname.startsWith("/learn/system-design") ? "text-foreground font-semibold" : ""
              }`}
            >
              System Design
            </Link>

            <Link
              href="/practice"
              className={`px-3 py-1.5 rounded-md text-foreground-muted hover:text-foreground hover:bg-surface-muted transition-colors ${
                pathname.startsWith("/practice") ? "text-foreground font-semibold" : ""
              }`}
            >
              Practice
            </Link>

            <Link
              href="/roadmaps"
              className={`px-3 py-1.5 rounded-md text-foreground-muted hover:text-foreground hover:bg-surface-muted transition-colors ${
                pathname.startsWith("/roadmaps") ? "text-foreground font-semibold" : ""
              }`}
            >
              Roadmaps
            </Link>
          </nav>
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-md text-foreground-muted hover:text-foreground hover:bg-surface-muted transition-colors"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/sign-in"
            className="text-xs font-medium text-foreground-muted hover:text-foreground px-2 py-1.5 transition-colors"
          >
            Sign in
          </Link>

          <Link href="/learn/dsa/algorithms/binary-search">
            <Button size="sm" variant="accent" className="font-semibold text-xs tracking-tight">
              Start learning
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md text-foreground-muted hover:text-foreground hover:bg-surface-muted"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-b border-border bg-surface px-4 py-4 space-y-3"
          >
            <div className="space-y-1">
              <Link
                href="/learn/dsa"
                className="flex items-center gap-2.5 p-2 rounded-lg text-sm font-medium text-foreground hover:bg-surface-muted"
              >
                <Binary className="w-4 h-4 text-emerald-600" />
                <span>Data Structures & Algorithms</span>
              </Link>
              <Link
                href="/learn/system-design"
                className="flex items-center gap-2.5 p-2 rounded-lg text-sm font-medium text-foreground hover:bg-surface-muted"
              >
                <Layers className="w-4 h-4 text-blue-600" />
                <span>System Design</span>
              </Link>
              <Link
                href="/practice"
                className="flex items-center gap-2.5 p-2 rounded-lg text-sm font-medium text-foreground hover:bg-surface-muted"
              >
                <Code2 className="w-4 h-4 text-purple-600" />
                <span>Practice Studio</span>
              </Link>
              <Link
                href="/roadmaps"
                className="flex items-center gap-2.5 p-2 rounded-lg text-sm font-medium text-foreground hover:bg-surface-muted"
              >
                <Map className="w-4 h-4 text-amber-600" />
                <span>Roadmaps</span>
              </Link>
              <Link
                href="/dashboard"
                className="flex items-center gap-2.5 p-2 rounded-lg text-sm font-medium text-foreground hover:bg-surface-muted"
              >
                <LayoutDashboard className="w-4 h-4 text-neutral-600" />
                <span>Learning Dashboard</span>
              </Link>
            </div>

            <div className="pt-3 border-t border-border flex flex-col gap-2">
              <Link href="/learn/dsa/algorithms/binary-search">
                <Button className="w-full justify-center" variant="accent" size="sm">
                  Start learning
                </Button>
              </Link>
              <Link href="/sign-in">
                <Button className="w-full justify-center" variant="outline" size="sm">
                  Sign in
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
