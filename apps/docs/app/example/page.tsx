import type { Metadata } from "next";
import Link from "next/link";
import { ThemeButton } from "@/components/theme-button";
import { dashboard } from "@/lib/example";

export const metadata: Metadata = { title: "Example dashboard" };

export default function Page() {
  return (
    <>
      <div className="flex items-center gap-3 overflow-x-clip border-b border-line bg-surface px-4 py-2 text-sm">
        <span className="mr-auto text-muted">Example dashboard with sample data, built from Sidedish components</span>
        <Link className="btn" data-variant="ghost" data-size="sm" href="/">Back to docs</Link>
        <ThemeButton />
      </div>
      {/* trusted static HTML from lib/example.ts (no user input) */}
      <div dangerouslySetInnerHTML={{ __html: dashboard() }} />
    </>
  );
}
