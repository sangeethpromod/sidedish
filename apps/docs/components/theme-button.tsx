"use client";

export function ThemeButton() {
  const toggle = () => {
    const r = document.documentElement, dark = r.dataset.theme !== "dark";
    if (dark) r.dataset.theme = "dark"; else delete r.dataset.theme;
    try { localStorage.stTheme = dark ? "dark" : ""; } catch {}
  };
  return (
    <button onClick={toggle} data-variant="ghost" data-size="icon" aria-label="Toggle dark mode" data-tooltip="Theme" data-tooltip-pos="bottom">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>
    </button>
  );
}
