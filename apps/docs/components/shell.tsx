"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sidebar } from "./sidebar";
import { ThemeButton } from "./theme-button";

export function Shell({ children }: { children: React.ReactNode }) {
  if (usePathname().startsWith("/example")) return <>{children}</>; // the example is a full-screen app with its own sidebar
  return (
    <div className="layout">
      <Sidebar />
      <div className="shell">
        <header className="topbar">
          <button data-variant="ghost" data-size="icon" data-toggle="#side" className="menu" aria-label="Open navigation">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          </button>
          <Link className="btn" data-variant="quiet" data-size="sm" href="/installation">Install</Link>
          <Link className="btn" data-variant="quiet" data-size="sm" href="/components">Components</Link>
          <Link className="btn" data-variant="quiet" data-size="sm" href="/example">Example</Link>
          <ThemeButton />
        </header>
        {children}
      </div>
    </div>
  );
}
