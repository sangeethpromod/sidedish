import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Doc } from "@/components/doc";
import { C } from "@/lib/data";
import { compPage } from "@/lib/render";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export const generateStaticParams = () => C.map((c) => ({ slug: c.id }));

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = C.find((x) => x.id === slug);
  return { title: c?.name, description: c?.desc.replace(/<[^>]+>/g, "") };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const c = C.find((x) => x.id === slug);
  if (!c) notFound();
  return <Doc html={compPage(c)} />;
}
