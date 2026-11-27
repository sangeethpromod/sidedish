/** Docs bodies are generated, trusted HTML strings from lib/render.ts (no user input). */
export function Doc({ html, wide }: { html: string; wide?: boolean }) {
  return <main className={wide ? "doc wide" : "doc"} dangerouslySetInnerHTML={{ __html: html }} />;
}
