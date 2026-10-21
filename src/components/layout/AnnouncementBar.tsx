import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { ArrowRight, Sparkles } from "lucide-react";

export function AnnouncementBar() {
  return (
    <aside aria-label="Announcement" className="w-full bg-[#141414] text-white border-b border-[#252525] py-2 px-4 text-xs font-mono transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between sm:justify-center gap-3">
        <div className="flex items-center gap-2 text-neutral-300">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          <span className="font-semibold text-white tracking-wide uppercase text-[10px] bg-neutral-800 px-1.5 py-0.5 rounded border border-neutral-700">
            {siteConfig.announcement.badge}
          </span>
          <span className="truncate max-w-[280px] sm:max-w-none text-neutral-300 font-sans">
            {siteConfig.announcement.text}
          </span>
        </div>
        <Link
          href={siteConfig.announcement.href}
          className="inline-flex items-center gap-1 text-accent hover:text-white transition-colors shrink-0 font-medium group"
        >
          <span>Try visualizer</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </aside>
  );
}
