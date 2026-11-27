"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { C } from "@/lib/data";
import { Logo } from "@/components/logo";

const GUIDES: [string, string][] = [["/", "Introduction"], ["/installation", "Installation"], ["/theming", "Theming"], ["/example", "Example dashboard"], ["/components", "All components"]];
const REPO: [string, string][] = [["https://github.com/sangeethpromod/sidedish", "GitHub"], ["https://www.npmjs.com/package/sidedish", "npm"]];

export function Sidebar() {
  const path = usePathname().replace(/\/$/, "") || "/";
  const [q, setQ] = useState("");
  useEffect(() => { document.getElementById("side")?.removeAttribute("data-open"); }, [path]); // close the mobile drawer
  const show = (n: string) => n.toLowerCase().includes(q.toLowerCase());
  const link = (href: string, name: string, wc?: number) => show(name) && (
    <Link key={href} href={href} aria-current={path === href ? "page" : undefined}>
      {name}{wc ? <span className="badge" data-variant="outline" style={{ marginLeft: "auto" }}>WC</span> : null}
    </Link>
  );
  return (
    <aside className="sidebar" id="side">
      <Link className="brand" href="/">
        <Logo />
        <span>Sidedish</span><span className="badge" data-variant="outline">v0.1</span>
      </Link>
      <input id="filter" type="search" placeholder="Search components…" aria-label="Search components" value={q} onChange={(e) => setQ(e.target.value)} />
      <p className="eyebrow">Getting started</p>
      <nav>{[...GUIDES, ...REPO].map(([h, n]) => link(h, n))}</nav>
      <p className="eyebrow">Components</p>
      <nav>{C.map((c) => link("/" + c.id, c.name, c.wc))}</nav>
    </aside>
  );
}
