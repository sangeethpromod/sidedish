"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { theme, toast } from "sidedish";

/** Wires up what the server-rendered docs HTML can't: internal links, copy buttons, the theme playground. */
export function Behaviors() {
  const router = useRouter();
  useEffect(() => {
    const click = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const copy = t.closest<HTMLElement>(".copy");
      if (copy) {
        navigator.clipboard?.writeText(copy.nextElementSibling?.textContent ?? "").then(() => toast("Copied to clipboard"), () => toast("Copy failed", { tone: "bad" }));
        return;
      }
      if (t.id === "resetTheme") { document.documentElement.removeAttribute("style"); document.querySelectorAll<HTMLInputElement>("[data-token]").forEach((i) => (i.value = i.defaultValue)); return; }
      // Docs pages are plain HTML strings, so their <a href="/x"> links are upgraded to client-side navigation here.
      const a = t.closest<HTMLAnchorElement>("a[href^='/']");
      if (a && !a.target && !e.metaKey && !e.ctrlKey && !e.shiftKey && e.button === 0) { e.preventDefault(); router.push(a.getAttribute("href")!); }
    };
    const input = (e: Event) => { const el = e.target as HTMLInputElement; if (el.dataset?.token) theme({ [el.dataset.token]: el.value }); };
    const select = (e: Event) => { const v = (e as CustomEvent).detail?.value; if (v) toast("Selected: " + v); };
    document.addEventListener("click", click);
    document.addEventListener("input", input);
    document.addEventListener("select", select);
    return () => { document.removeEventListener("click", click); document.removeEventListener("input", input); document.removeEventListener("select", select); };
  }, [router]);
  return null;
}
