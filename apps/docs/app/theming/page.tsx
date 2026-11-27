import type { Metadata } from "next";
import { Doc } from "@/components/doc";
import { theming } from "@/lib/render";

export const metadata: Metadata = { title: "Theming" };
export default function Page() { return <Doc html={theming()} />; }
