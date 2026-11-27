import type { Metadata } from "next";
import { Doc } from "@/components/doc";
import { install } from "@/lib/render";

export const metadata: Metadata = { title: "Installation" };
export default function Page() { return <Doc html={install()} />; }
