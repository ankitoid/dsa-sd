/**
 * Supabase Client Abstraction for DevMastery
 * Works seamlessly in DEMO mode when env credentials are not provided.
 */

export const isSupabaseConfigured = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
  judgeApiUrl: process.env.NEXT_PUBLIC_JUDGE_API_URL || "",
  isDemoMode: !isSupabaseConfigured,
};

// Type definitions for future Supabase sync
export interface SupabaseUserProfile {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  role: "learner" | "pro";
  createdAt: string;
}
