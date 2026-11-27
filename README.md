<img src="apps/docs/public/icon.svg" alt="" width="96">

# Sidedish

A small component kit for **Next.js**, built on **Tailwind CSS v4**, in terracotta, warm off-white and near-black, set in DM Sans.

```bash
pnpm dlx sidedish init   # or: npx sidedish init
```

| Path | What |
|------|------|
| [`packages/sidedish`](packages/sidedish) | The npm package: Tailwind layer CSS, web components, React helpers, `init` CLI |
| [`apps/docs`](apps/docs) | The docs site (Next.js, static export). It uses `sidedish` itself |

## Develop

```bash
pnpm install
pnpm dev          # docs at http://localhost:3000
pnpm build        # static site in apps/docs/out
pnpm size         # CSS + JS gzip budget (10KB)
```

## Deploy the docs

- **Vercel:** import the repo, set *Root Directory* to `apps/docs`. Nothing else.
- **AWS Amplify:** connect the repo; [`amplify.yml`](amplify.yml) already points at `apps/docs`. Set the app root to `apps/docs` when asked.

## Publish the package

```bash
cd packages/sidedish
pnpm publish --access public
```

MIT licensed.
