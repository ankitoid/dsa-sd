"use client";

import React, { useState } from "react";
import { useProgress } from "@/hooks/useProgress";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { Button } from "@/ui/Button";
import { Badge } from "@/ui/Badge";
import { User, Shield, Sliders, Database, RotateCcw, Check } from "lucide-react";

export default function SettingsPage() {
  const { progress } = useProgress();
  const [dailyGoal, setDailyGoal] = useState<number>(progress.dailyGoalMinutes);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleResetData = () => {
    if (confirm("Reset local demo learning progress and bookmarks to initial state?")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-12">
      <div className="space-y-3 pb-6 border-b border-border">
        <h1 className="text-display text-foreground font-sans font-bold tracking-tight">
          Settings & Preferences
        </h1>
        <p className="text-body-editorial text-foreground-muted leading-relaxed font-sans">
          Manage your learning targets, local storage state, and backend database integrations.
        </p>
      </div>

      <div className="space-y-8">
        {/* Profile Card */}
        <div className="p-6 rounded-xl border border-border bg-surface shadow-subtle space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <User className="w-4 h-4 text-foreground-muted" />
            <span>Learner Profile</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#141414] text-white flex items-center justify-center font-bold text-lg dark:bg-white dark:text-black">
              A
            </div>
            <div>
              <h4 className="font-semibold text-base text-foreground">Alex (Demo Engineer)</h4>
              <p className="text-xs text-foreground-muted font-mono">alex.engineer@example.com</p>
              <div className="pt-1">
                <Badge variant="accent">Demo Mode Active</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Goal Configuration */}
        <div className="p-6 rounded-xl border border-border bg-surface shadow-subtle space-y-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Sliders className="w-4 h-4 text-foreground-muted" />
            <span>Daily Learning Goal</span>
          </div>

          <div className="space-y-2 max-w-sm">
            <label className="text-xs text-foreground-muted font-medium block">
              Target study time per day (minutes):
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min={15}
                max={180}
                step={15}
                value={dailyGoal}
                onChange={(e) => setDailyGoal(Number(e.target.value))}
                className="w-32 px-3 py-2 rounded-lg bg-surface-muted border border-border text-sm font-mono text-foreground focus:outline-none focus:ring-1 focus:ring-accent"
              />
              <Button size="sm" variant="primary" onClick={handleSave}>
                {saved ? (
                  <>
                    <Check className="w-3.5 h-3.5 mr-1 text-accent" /> Saved
                  </>
                ) : (
                  "Update Goal"
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Backend / Supabase Status */}
        <div className="p-6 rounded-xl border border-border bg-surface shadow-subtle space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Database className="w-4 h-4 text-foreground-muted" />
              <span>Backend Synchronization (Supabase)</span>
            </div>
            <Badge variant={isSupabaseConfigured ? "easy" : "default"}>
              {isSupabaseConfigured ? "Connected" : "Local Demo Mode"}
            </Badge>
          </div>

          <p className="text-xs text-foreground-muted leading-relaxed font-sans">
            {isSupabaseConfigured
              ? "Your progress is automatically synced with your remote Supabase PostgreSQL database."
              : "No remote Supabase credentials detected in environment variables. The application operates in high-performance local demo mode with browser persistence."}
          </p>
        </div>

        {/* Reset State */}
        <div className="p-6 rounded-xl border border-rose-500/20 bg-rose-500/5 space-y-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-rose-700 dark:text-rose-400">
            <RotateCcw className="w-4 h-4" />
            <span>Reset Local Demo Data</span>
          </div>
          <p className="text-xs text-foreground-muted">
            Clears locally cached progress, bookmarks, and completed problem history back to factory seed state.
          </p>
          <Button size="sm" variant="outline" onClick={handleResetData} className="text-rose-600 border-rose-300 hover:bg-rose-50 dark:hover:bg-rose-950">
            Reset All Local Data
          </Button>
        </div>
      </div>
    </div>
  );
}
