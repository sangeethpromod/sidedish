import { C, ex } from './data';
/* ---------- rendering helpers ---------- */
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const hlHtml = (s) => esc(s)
  .replace(/(&lt;!--.*?--&gt;)/g, '<span class=c>$1</span>')
  .replace(/(&lt;\/?)([\w-]+)/g, '$1<span class=k>$2</span>')
  .replace(/([\w-]+)="([^"]*)"/g, '<span class=a>$1</span>=<span class=s>"$2"</span>');
const hlJs = (s) => esc(s).replace(/(\/\/.*)$/gm, '<span class=c>$1</span>').replace(/("[^"\n]*"|'[^'\n]*')/g, '<span class=s>$1</span>');
const code = (s, js?) => `<div class="code"><button class="copy" data-variant="quiet" data-size="sm">Copy</button><pre><code>${js ? hlJs(s) : hlHtml(s)}</code></pre></div>`;

// HTML example → a copy-paste Next.js component. Covers only the markup patterns used in these docs.
const camel = (s) => s.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
const styleObj = (css) => '{{ ' + css.split(';').filter((d) => d.trim()).map((d) => {
  const i = d.indexOf(':'), k = d.slice(0, i).trim(), v = d.slice(i + 1).trim();
  return `${k.startsWith('--') ? `"${k}"` : camel(k)}: "${v}"`;
}).join(', ') + ' }}';
const toJsx = (html) => {
  const s = html
    .replace(/<!--\s*(.*?)\s*-->/g, '{/* $1 */}')
    .replace(/<(input|hr|br|img)\b([^>]*?)\s*\/?>/g, (_, t, a) => `<${t}${t === 'input' ? a.replace(/\schecked(?=[\s>]|$)/, ' defaultChecked').replace(/\svalue="/, ' defaultValue="') : a} />`)
    .replace(/<textarea([^>]*)><\/textarea>/g, '<textarea$1 />')
    .replace(/\sclass="/g, ' className="').replace(/\sfor="/g, ' htmlFor="')
    .replace(/\stabindex="(\d+)"/g, ' tabIndex={$1}')
    .replace(/\s(stroke|fill)-(\w)(\w*)=/g, (_, a, b, c) => ` ${a}${b.toUpperCase()}${c}=`)
    .replace(/\sstyle="([^"]*)"/g, (_, v) => ' style=' + styleObj(v))
    .replace(/\son(\w)(\w+)="([^"]*)"/g, (_, a, b, js) => {
      js = js.replace(/Sidedish\.toast/g, 'toast');
      const fn = /\bevent\b/.test(js) ? `(event) => { ${js.replace(/;(?!\s*$)/g, '; ')}; }` : `() => ${js}`;
      return ` on${a.toUpperCase()}${b}={${fn}}`;
    });
  const head = (/ on[A-Z]\w*=\{/.test(s) ? '"use client";\n\n' : '') + (/\btoast\(/.test(s) ? 'import { toast } from "sidedish";\n\n' : '');
  return `${head}export default function Example() {\n  return (\n    <>\n${s.split('\n').map((l) => '      ' + l).join('\n')}\n    </>\n  );\n}`;
};
const demo = (x) => `<sd-tabs class="demo"><nav><button>Preview</button><button>Next.js</button><button>HTML</button></nav><section class="preview${x.block ? ' block' : ''}">${x.html}</section><section>${code(toJsx(x.html), 1)}</section><section>${code(x.html)}</section></sd-tabs>`;
const api = (rows) => `<div class="table-wrap"><table><thead><tr><th>Name</th><th>Type</th><th>Description</th></tr></thead><tbody>${rows.map(([a, b, c]) => `<tr><td><code>${esc(a)}</code></td><td class="font-mono text-sm">${b}</td><td>${c}</td></tr>`).join('')}</tbody></table></div>`;

const GUIDES = [['', 'Introduction'], ['installation', 'Installation'], ['theming', 'Theming'], ['components', 'All components']];
const ORDER = [...GUIDES.map(([id, name]) => ({ id, name })), ...C];

const pager = (id) => {
  const i = ORDER.findIndex((p) => p.id === id), p = ORDER[i - 1], n = ORDER[i + 1];
  return `<div class="pager">${p ? `<a href="/${p.id}"><small>← Previous</small>${p.name}</a>` : ''}${n ? `<a href="/${n.id}"><small>Next →</small>${n.name}</a>` : ''}</div>`;
};

const compPage = (c) => `
<nav class="breadcrumb" aria-label="Breadcrumb"><ol><li><a href="/">Docs</a></li><li><a href="/components">Components</a></li><li aria-current="page">${c.name}</li></ol></nav>
<h1>${c.name}${c.wc ? ' <span class="badge" data-variant="outline">Web Component</span>' : ''}</h1>
<p class="lead">${c.desc}</p>
<div class="alert"><strong>How it helps</strong><span>${c.why}</span></div>
${c.ex.map((x) => `<h2>${x.t}</h2>${demo(x)}`).join('')}
${c.js ? `<h2>In Next.js</h2>${code(c.js, 1)}` : ''}
<h2>API</h2>${api(c.api)}
${pager(c.id)}`;

const features = [
  ['Native elements first', 'Button, dialog, details, progress, meter and table look right with no classes.'],
  ['Made for Next.js', 'One-command setup, typed JSX tags, toast() and hooks. Works in Server Components.'],
  ['Built on Tailwind', 'Styles sit in Tailwind layers, so your utilities and breakpoints always win.'],
  ['Colours as props', 'Set data-tone or --tone on any component, or retheme everything with one call.'],
  ['Six web components', 'Tabs, dropdown, tag input, upload, sortable table and calendar cover what CSS cannot.'],
  ['Accessible defaults', 'Keyboard support, focus rings, reduced motion and real form controls.'],
];

// One tile of the live wall: working components, with a link to their docs.
const tile = (id, name, body, cls = '') => `<div class="tile ${cls}"><div class="stage">${body}</div><a href="/${id}">${name}</a></div>`;
const sample = (id, i = 0) => C.find((c) => c.id === id).ex[i].html;

const home = () => `
<section class="intro">
  <h1>The parts of a dashboard, already built.</h1>
  <div>
    <p class="lead">Sidedish is a small component kit for Next.js on Tailwind CSS v4. One command installs all of it.</p>
    <div class="code"><button class="copy" data-variant="quiet" data-size="sm">Copy</button><pre><code>pnpm dlx sidedish init</code></pre></div>
    <div class="flex flex-wrap gap-3"><a class="btn" data-size="lg" href="/example">Open the example dashboard</a><a class="btn" data-size="lg" data-variant="ghost" href="/components">Browse components</a></div>
  </div>
</section>

<div class="flex flex-wrap items-center justify-between gap-3 mb-3">
  <p class="m-0">Everything below is live. Click it.</p>
  <label class="picker !flex"><input type="color" data-token="accent" value="${TOKENS[0][1]}"> Try your accent colour</label>
</div>
<div class="wall">
  ${tile('button', 'Button', `<button onclick="Sidedish.toast('Changes saved', {tone:'good'})">Save changes</button><button data-variant="soft">Soft</button><button data-variant="ghost">Ghost</button>`)}
  ${tile('tabs', 'Tabs', `<sd-tabs><nav aria-label="Period"><button>Quarter</button><button>Month</button><button>Week</button></nav><section><div class="stat"><strong>3,412<small>h</small></strong></div></section><section><div class="stat"><strong>1,164<small>h</small></strong></div></section><section><div class="stat"><strong>278<small>h</small></strong></div></section></sd-tabs>`)}
  ${tile('badge', 'Badge', `<span class="badge">↗ 12.4%</span><span class="badge" data-tone="good">Paid</span><span class="badge" data-tone="warn">Pending</span><span class="badge" data-tone="bad">Overdue</span><span class="badge" data-variant="solid">New</span>`)}
  ${tile('bars', 'Bar chart', sample('bars'), 'wide')}
  ${tile('switch', 'Switch', `<div class="flex flex-col gap-3"><label><input type="checkbox" role="switch" checked> Weekly summary</label><label><input type="checkbox" role="switch"> Overdue alerts</label></div>`)}
  ${tile('calendar', 'Calendar', '<sd-calendar value="2026-11-27"></sd-calendar>', 'tall')}
  ${tile('heatmap', 'Heatmap', sample('heatmap'))}
  ${tile('avatar', 'Avatar', sample('avatar', 1))}
  ${tile('progress', 'Progress', `<progress value="72" max="100" aria-label="Storage used"></progress><progress value="40" max="100" data-tone="ink" aria-label="Upload"></progress>`)}
  ${tile('tag-input', 'TagInput', '<sd-tag-input class="w-full" value="design,billing" aria-label="Add label"></sd-tag-input>')}
</div>

<h2 class="section">Three steps to a themed app</h2>
<ol class="steps">
  <li><h3>Install</h3>${code('pnpm dlx sidedish init', 1)}</li>
  <li><h3>Write HTML</h3>${code('<button data-tone="good">Pay</button>')}</li>
  <li><h3>Set your colour</h3>${code('<Sidedish theme={{ accent: "#7c3aed" }} />', 1)}</li>
</ol>

<h2 class="section">What you get</h2>
<dl class="facts">${features.map(([t, d]) => `<div><dt>${t}</dt><dd>${d}</dd></div>`).join('')}</dl>
${pager('')}`;

const install = () => `
<h1>Installation</h1>
<p class="lead">One command in your Next.js project. It installs Tailwind CSS v4 if you don't have it, and nothing is copied component by component.</p>
${code(`pnpm dlx sidedish init`, 1)}
<p>Using npm, yarn or bun? Run <code>npx sidedish init</code>, <code>yarn dlx sidedish init</code> or <code>bunx sidedish init</code>.</p>
<div class="alert" data-tone="good"><strong>That's it.</strong>Every component is ready to use in Server and Client Components. Start the dev server and write <code>&lt;button data-tone="good"&gt;Hello&lt;/button&gt;</code>.</div>
<h2>What <code>init</code> does</h2>
<div class="table-wrap"><table><thead><tr><th>Step</th><th>Detail</th></tr></thead><tbody>
<tr><td>Installs packages</td><td><code>sidedish</code>, <code>tailwindcss</code>, <code>@tailwindcss/postcss</code> and <code>postcss</code>, with pnpm, npm, yarn or bun picked from your lockfile.</td></tr>
<tr><td>Adds <code>postcss.config.mjs</code></td><td>Only if you don't already have a PostCSS config.</td></tr>
<tr><td>Patches <code>globals.css</code></td><td>Adds <code>@import "tailwindcss"</code> (if missing) and <code>@import "sidedish/sidedish.css"</code>.</td></tr>
<tr><td>Patches <code>app/layout.tsx</code></td><td>Imports <code>globals.css</code> and adds <code>&lt;Sidedish /&gt;</code> inside <code>&lt;body&gt;</code>. Works with <code>src/app</code> and .jsx/.js too.</td></tr>
<tr><td>Loads fonts</td><td>DM Sans and Red Hat Mono. Skip with <code>--no-fonts</code>.</td></tr>
<tr><td>TypeScript</td><td>Types for <code>&lt;sd-*&gt;</code> tags and <code>style={{ "--tone": … }}</code> come with the package.</td></tr>
</tbody></table></div>
<h2>Your layout afterwards</h2>
${code(`/* app/globals.css */
@import "sidedish/fonts.css";
@import "tailwindcss";
@import "sidedish/sidedish.css"; /* sits in Tailwind layers: your utilities always win */`)}
${code(`// app/layout.tsx
import "./globals.css";
import { Sidedish } from "sidedish";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Sidedish />
        {children}
      </body>
    </html>
  );
}`, 1)}
<h2>Use it</h2>
<p>Plain HTML tags and classes work in Server Components, and Tailwind utilities go on the same elements. You only need <code>"use client"</code> for <code>toast()</code> or event hooks.</p>
${code(`// app/page.tsx: a Server Component
export default function Page() {
  return (
    <article className="card sm:max-w-md">
      <header>Welcome</header>
      <p>Native elements are already styled.</p>
      <sd-tabs>
        <nav><button>One</button><button>Two</button></nav>
        <section>First panel</section>
        <section>Second panel</section>
      </sd-tabs>
      <button data-tone="good">Continue</button>
    </article>
  );
}`, 1)}
<h2>Sidedish vs shadcn/ui</h2>
<div class="table-wrap"><table><thead><tr><th></th><th>Sidedish</th><th>shadcn/ui</th></tr></thead><tbody>
<tr><td>Setup</td><td><code>pnpm dlx sidedish init</code></td><td><code>init</code>, then <code>add</code> per component</td></tr>
<tr><td>Requires Tailwind</td><td>Yes (v4)</td><td>Yes</td></tr>
<tr><td>Files added to your repo</td><td>None (one layout edit)</td><td>One file per component</td></tr>
<tr><td>Runtime dependencies</td><td>0 (Tailwind is a peer)</td><td>Radix primitives, cva, clsx and others</td></tr>
<tr><td>Works in Server Components</td><td>Yes, it's HTML and CSS</td><td>Interactive ones need <code>"use client"</code></td></tr>
<tr><td>Customise</td><td>CSS variables and props</td><td>Edit the copied source</td></tr>
</tbody></table></div>
<p class="muted text-sm">Pick shadcn when you want to own and rewrite each component's source. Pick Sidedish when you want a full, consistent kit in one step with almost no weight.</p>
<h2>Manual setup</h2>
${code(`pnpm add sidedish`, 1)}
<p>Install <code>tailwindcss @tailwindcss/postcss postcss</code> if you don't have them, then add the CSS imports and <code>&lt;Sidedish /&gt;</code> as shown above. For self-hosted fonts, use <code>next/font</code> in place of <code>fonts.css</code>:</p>
${code(`import { DM_Sans, Red_Hat_Mono } from "next/font/google";
const sans = DM_Sans({ subsets: ["latin"], variable: "--sd-font-sans" });
const mono = Red_Hat_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--sd-font-mono" });

<html className={\`\${sans.variable} \${mono.variable}\`}>`, 1)}
${pager('installation')}`;

const TOKENS = [['accent', '#d08873', 'Terracotta: buttons, highlights'], ['bg', '#fdfcf9', 'Warm off-white page background'], ['surface', '#ffffff', 'Cards, inputs, dialogs'], ['ink', '#1a1a1a', 'Near-black text'], ['sub', '#443c35', 'Body text'], ['muted', '#6b5e52', 'Labels'], ['line', '#eeebe7', 'Borders, idle chart bars'], ['tint', '#f7f2ee', 'Muted surfaces, tab tracks'], ['good', '#1f8a5b', 'Success tone'], ['warn', '#b57b08', 'Warning tone'], ['bad', '#c4213f', 'Danger tone'], ['info', '#3b6fd4', 'Info tone']];
const theming = () => `
<h1>Theming</h1>
<p class="lead">Colours are props. Sidedish reads every colour from a CSS variable, so you can change one button, one section or the whole site.</p>
<h2>Per component: tone</h2>
<p>Use <code>data-tone</code> for presets, or set <code>--tone</code> to any colour you like.</p>
${demo(ex('', `
<button data-tone="good">good</button>
<button data-tone="warn">warn</button>
<button data-tone="bad">bad</button>
<button data-tone="ink">ink</button>
<button style="--tone:#7c3aed">--tone:#7c3aed</button>
<span class="badge" style="--tone:#b4532a">clay badge</span>
<progress value="60" max="100" style="--tone:#7c3aed;width:160px"></progress>`))}
<h2>Per section</h2>
<p><code>--tone</code> is inherited, so setting it on a wrapper recolours everything inside.</p>
${demo(ex('', `
<div class="flex flex-wrap items-center gap-3" style="--tone:#3b6fd4">
  <button>Blue</button><span class="badge">Blue</span><input type="checkbox" role="switch" checked>
</div>`))}
<h2>Global: live playground</h2>
<p>Pick colours below and the whole site updates through <code>theme()</code>. To set it from the server, pass <code>&lt;Sidedish theme={{ accent: "#7c3aed" }} /&gt;</code> in your layout.</p>
<div class="card"><div class="grid gap-4 grid-cols-[repeat(auto-fit,minmax(180px,1fr))]">
  ${['accent', 'bg', 'surface', 'ink'].map((k) => `<label class="picker"><input type="color" data-token="${k}" value="${TOKENS.find((t) => t[0] === k)[1]}"> --sd-${k}</label>`).join('')}
</div><footer><button data-variant="ghost" data-size="sm" id="resetTheme">Reset</button></footer></div>
${code(`// app/layout.tsx: rendered on the server, no flash
<Sidedish theme={{ accent: "#7c3aed", bg: "#ffffff" }} />

// or at runtime in a client component
import { theme } from "sidedish";
theme({ accent: "#7c3aed" });`, 1)}
<h2>Tokens</h2>
${code(`:root {
  --sd-accent: #d08873;   /* terracotta */
  --sd-bg: #fdfcf9;       /* warm off-white */
  --sd-surface: #ffffff;  /* white */
  --sd-ink: #1a1a1a;      /* near-black */
  --sd-r: 2px;            /* corner radius */
  --sd-font: "DM Sans", system-ui, sans-serif;
}`)}
<div class="table-wrap"><table><thead><tr><th>Token</th><th>Default</th><th>Used for</th></tr></thead><tbody>
${TOKENS.map(([k, v, d]) => `<tr><td><code>--sd-${k}</code></td><td class="font-mono text-sm"><span class="swatch" style="background:${v}"></span>${v}</td><td>${d}</td></tr>`).join('')}
</tbody></table></div>
<h2>Dark mode</h2>
${code(`<html lang="en" data-theme="dark">`, 1)}
<p>Use the moon button in the header to see it.</p>
${pager('theming')}`;

// Components whose demo needs a full row; the rest pair up two per row.
const WIDE = ['typography', 'alert', 'card', 'forms', 'table', 'sidebar', 'utils'];
const gallery = () => `
<h1>All components</h1>
<p class="lead">Every component on one page. Open a card for its docs, code and API.</p>
<div class="grid gap-4 grid-cols-1 sm:grid-cols-2 gallery">
${C.map((c) => `<article class="card${WIDE.includes(c.id) ? ' col-span-full' : ''}"><header>${c.name}${c.wc ? ' <span class="badge" data-variant="outline">WC</span>' : ''}</header><div class="stage">${c.ex[0].html}</div><footer><small class="muted">${c.api.length} API entries</small><a class="btn" data-size="sm" data-variant="ghost" href="/${c.id}">Docs →</a></footer></article>`).join('')}
</div>
${pager('components')}`;


export { compPage, home, install, theming, gallery, GUIDES, ORDER };
