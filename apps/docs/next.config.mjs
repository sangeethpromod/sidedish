/** @type {import('next').NextConfig} */
export default {
  reactStrictMode: true,
  output: "export", // pure static site: deploys anywhere (Vercel, Amplify, S3, GitHub Pages)
  trailingSlash: true, // /button/index.html, so static hosts need no rewrite rules
  images: { unoptimized: true },
};
