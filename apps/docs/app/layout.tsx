import type { Metadata } from "next";
import { DM_Sans, Red_Hat_Mono } from "next/font/google";
import { Sidedish } from "sidedish";
import "./globals.css";
import { Shell } from "@/components/shell";
import { Behaviors } from "@/components/behaviors";

const sans = DM_Sans({ subsets: ["latin"], variable: "--sd-font-sans" });
const mono = Red_Hat_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--sd-font-mono" });

export const metadata: Metadata = {
  title: { default: "Sidedish", template: "%s · Sidedish" },
  description: "A small Tailwind CSS v4 component kit for Next.js. One command to install.",
  icons: { icon: "/icon.svg?v=2", apple: "/apple-icon.png" },
};

// Runs before paint so a saved dark theme doesn't flash light.
const themeInit = `try{var t=localStorage.stTheme;if(t)document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeInit }} /></head>
      <body>
        <Sidedish />
        <Shell>{children}</Shell>
        <Behaviors />
      </body>
    </html>
  );
}
