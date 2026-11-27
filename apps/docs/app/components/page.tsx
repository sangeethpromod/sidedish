import type { Metadata } from "next";
import { Doc } from "@/components/doc";
import { gallery } from "@/lib/render";

export const metadata: Metadata = { title: "All components" };
export default function Page() { return <Doc html={gallery()} wide />; }
