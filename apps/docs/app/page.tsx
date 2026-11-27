import { Doc } from "@/components/doc";
import { home } from "@/lib/render";

export default function Page() { return <Doc html={home()} wide />; }
