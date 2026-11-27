# Sidedish

A small component kit for **Next.js**, built on **Tailwind CSS v4**, in terracotta, warm off-white and near-black, set in DM Sans and Red Hat Mono.

```bash
pnpm dlx sidedish init   # or: npx sidedish init
```

This installs `sidedish`, `tailwindcss`, `@tailwindcss/postcss` and `postcss` using your lockfile's package manager, adds `postcss.config.mjs` if you have none, and patches `globals.css` and `app/layout.tsx` (or `src/app/…`):

```css
/* app/globals.css */
@import "sidedish/fonts.css";
@import "tailwindcss";
@import "sidedish/sidedish.css"; /* sits in Tailwind layers: your utilities always win */
```

```tsx
import "./globals.css";
import { Sidedish } from "sidedish";
// …
<body>
  <Sidedish />          {/* optional: theme={{ accent: "#7c3aed" }} */}
  {children}
</body>
```

Flags: `--no-install`, `--no-fonts`.

## Use

- HTML tags and classes work in Server Components: `<button data-tone="good">`, `<article className="card">`, `<sd-tabs>`.
- Client helpers: `import { toast, theme, useSidedishEvent } from "sidedish"`.
- Colours are props: `data-tone="good|warn|bad|info|ink|neutral"`, `style={{ "--tone": "#hex" }}` (typed), or `<Sidedish theme={{ accent }} />`.
- Layout and responsiveness are Tailwind: `grid grid-cols-1 sm:grid-cols-3 gap-4`, `md:flex`, and so on.
- Colours are Tailwind colours too: `bg-accent`, `text-muted`, `border-line`, `bg-tint`, `text-good`.
- Dark mode: `<html data-theme="dark">`; `dark:` variants follow it.

## Package contents

| File | Purpose |
|------|---------|
| `sidedish.css` | All styles, in Tailwind `base`/`components` layers, plus the `@theme` colour tokens |
| `sidedish.js` | Web components + toast/theme (~2.8 KB gz), no-op on the server |
| `index.js` / `index.d.ts` | `<Sidedish />`, `toast`, `theme`, `useSidedishEvent`, JSX types for `sd-*` |
| `fonts.css` | Optional Google Fonts import |
| `bin/sidedish.mjs` | The `init` CLI |

The docs site lives in the repo at `apps/docs` and is not part of the npm package.
