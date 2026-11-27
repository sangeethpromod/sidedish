"use client";
import "./sidedish.js";
import { createElement, useEffect } from "react";

const sd = () => (typeof window != "undefined" ? window.Sidedish : undefined);

/** Mount once in app/layout.tsx. Ships the web components to the client; `theme` sets --sd-* tokens with no flash (rendered on the server). */
export function Sidedish({ theme: vars } = {}) {
  if (!vars) return null;
  const css = Object.entries(vars).map(([k, v]) => `--sd-${k}:${String(v).replace(/[<>{};]/g, "")}`).join(";");
  return createElement("style", null, `:root{${css}}`);
}

export const toast = (msg, opts) => sd()?.toast(msg, opts);
export const theme = (vars, scope) => sd()?.theme(vars, scope);

/** Listen to a Sidedish web-component event (select, change, files) from React. */
export function useSidedishEvent(ref, name, fn) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.addEventListener(name, fn);
    return () => el.removeEventListener(name, fn);
  }, [ref, name, fn]);
}
