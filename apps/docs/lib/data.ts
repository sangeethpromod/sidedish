export type Comp = { id: string; name: string; desc: string; why: string; wc?: number; js?: string; ex: { t: string; html: string; block?: number }[]; api: string[][] };
const plus = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>';
export const ex = (t, html, o = {}) => ({ t, html: html.trim(), ...o });

export const C: Comp[] = [
{ id: 'typography', name: 'Typography', desc: 'Headings, body copy, inline code, keyboard keys, quotes and the mono eyebrow label, styled straight from native tags.',
  why: 'You write plain HTML and it looks finished. No classes on h1 or p, so content from a CMS or Markdown renders on-brand without extra work.',
  ex: [ex('Type scale', `
<p class="eyebrow">Eyebrow · Red Hat Mono</p>
<h1>The quiet ocean floor</h1>
<h2>Heading two</h2>
<h3>Heading three</h3>
<p class="lead">A lead paragraph sets context in a slightly larger size.</p>
<p>Body copy in DM Sans with a <a href="#/typography">link</a>, some <code>inline code</code>, <kbd>⌘</kbd> <kbd>K</kbd> and <small>small print</small>.</p>
<blockquote>Good design is as little design as possible.</blockquote>`, { block: 1 })],
  api: [['h1–h6, p, a', 'tag', 'Styled automatically.'], ['.lead', 'class', 'Larger intro paragraph.'], ['.eyebrow', 'class', 'Mono, uppercase, tracked label.'], ['.muted', 'class', 'Muted text colour.'], ['code, kbd, pre, blockquote, small, hr', 'tag', 'Styled automatically.']] },

{ id: 'accordion', name: 'Accordion', desc: 'Collapsible sections built on the native <code>&lt;details&gt;</code> element. Give them the same <code>name</code> so only one stays open.',
  why: 'Zero JavaScript. Keyboard, screen readers and find-in-page all work because the browser does the work.',
  ex: [ex('Exclusive group', `
<div>
  <details name="faq" open>
    <summary>Is Sidedish really dependency-free?</summary>
    <p>Yes. One CSS file and one JS file, no build step.</p>
  </details>
  <details name="faq">
    <summary>Does it work without JavaScript?</summary>
    <p>Everything except the four web components and toasts is pure CSS.</p>
  </details>
  <details name="faq">
    <summary>Can I change the colours?</summary>
    <p>Every colour is a CSS variable. Pass it as a prop.</p>
  </details>
</div>`, { block: 1 })],
  api: [['details > summary', 'tag', 'One item.'], ['name="group"', 'attr', 'Items with the same name open one at a time.'], ['open', 'attr', 'Start expanded.']] },

{ id: 'alert', name: 'Alert', desc: 'A static callout for important information, coloured by tone.',
  why: 'One class plus a tone. Pass any colour with <code>style="--tone:…"</code> and the tint, border and title all follow it.',
  ex: [ex('Tones', `
<div class="flex flex-col gap-3 w-full">
  <div class="alert"><strong>Heads up</strong>Your statement for November is ready.</div>
  <div class="alert" data-tone="good"><strong>Payment received</strong>₹12,400 credited to HDFC ••4521.</div>
  <div class="alert" data-tone="warn"><strong>Approaching limit</strong>You've used 82% of your dining budget.</div>
  <div class="alert" data-tone="bad" role="alert"><strong>Sync failed</strong>We couldn't reach your bank. Try again later.</div>
  <div class="alert" style="--tone:#7c3aed"><strong>Custom colour</strong>Any hex works through --tone.</div>
</div>`, { block: 1 })],
  api: [['.alert', 'class', 'Container.'], ['strong', 'tag', 'Optional title, uses the tone colour.'], ['data-tone', 'good | warn | bad | info | ink | neutral', 'Preset colour.'], ['--tone', 'CSS var', 'Any custom colour.'], ['role="alert"', 'attr', 'Add for urgent, live messages.']] },

{ id: 'avatar', name: 'Avatar', desc: 'Initials or an image in a circle, with sizes and stacked groups.',
  why: 'Works with an <code>&lt;img&gt;</code> or plain text. Groups overlap with a ring matching the page background.',
  ex: [ex('Sizes & tones', `
<span class="avatar" data-size="sm">AK</span>
<span class="avatar">SR</span>
<span class="avatar" data-size="lg" data-tone="ink">MJ</span>
<span class="avatar" data-tone="warn">PL</span>
<span class="avatar" style="--tone:#b4532a">RB</span>`),
       ex('Group', `
<div class="avatar-group">
  <span class="avatar">AK</span>
  <span class="avatar" data-tone="ink">SR</span>
  <span class="avatar" data-tone="good">MJ</span>
  <span class="avatar" data-tone="neutral">+4</span>
</div>`)],
  api: [['.avatar', 'class', 'Circle; put initials or an &lt;img&gt; inside.'], ['data-size', 'sm | lg', 'Default is 36px.'], ['data-tone / --tone', 'colour', 'Background colour.'], ['.avatar-group', 'class', 'Overlapping stack.']] },

{ id: 'badge', name: 'Badge', desc: 'Small status labels.',
  why: 'Tinted by default from the tone colour, so a single variable gives you matching text and background.',
  ex: [ex('Variants', `
<span class="badge">Default</span>
<span class="badge" data-tone="good">Paid</span>
<span class="badge" data-tone="warn">Pending</span>
<span class="badge" data-tone="bad">Overdue</span>
<span class="badge" data-tone="info">SIP</span>
<span class="badge" data-tone="neutral">Draft</span>
<span class="badge" data-variant="solid">Solid</span>
<span class="badge" data-variant="outline">Outline</span>
<span class="badge" style="--tone:#7c3aed">Custom</span>`)],
  api: [['.badge', 'class', 'Label.'], ['data-variant', 'solid | outline', 'Default is a soft tint.'], ['data-tone / --tone', 'colour', 'Colour.']] },

{ id: 'breadcrumb', name: 'Breadcrumb', desc: 'Shows where the current page sits in the hierarchy.',
  why: 'A semantic ordered list in a <code>&lt;nav&gt;</code>. Separators come from CSS, so screen readers don\'t announce them.',
  ex: [ex('Basic', `
<nav class="breadcrumb" aria-label="Breadcrumb">
  <ol>
    <li><a href="#/">Home</a></li>
    <li><a href="#/components">Components</a></li>
    <li aria-current="page">Breadcrumb</li>
  </ol>
</nav>`)],
  api: [['nav.breadcrumb > ol > li', 'markup', 'Structure.'], ['aria-current="page"', 'attr', 'Marks the current item.']] },

{ id: 'button', name: 'Button', desc: 'Native <code>&lt;button&gt;</code> is styled by default. Add <code>.btn</code> to links that should look like buttons.',
  why: 'No wrapper component and no classes for the common case. Variant, size, tone and loading are plain attributes, so they work from any framework or template.',
  ex: [ex('Variants', `
<button>Primary</button>
<button data-variant="ghost">Ghost</button>
<button data-variant="quiet">Quiet</button>
<button data-variant="soft">Soft</button>
<button data-tone="bad">Delete</button>
<a class="btn" href="#/button" data-tone="ink">Link button</a>`),
       ex('Sizes, icons & states', `
<button data-size="sm">Small</button>
<button>Medium</button>
<button data-size="lg">${plus} Large</button>
<button data-size="icon" aria-label="Add">${plus}</button>
<button aria-busy="true">Saving</button>
<button disabled>Disabled</button>`),
       ex('Any colour', `
<button style="--tone:#7c3aed">Violet</button>
<button style="--tone:#b4532a">Clay</button>
<button data-variant="soft" style="--tone:#3b6fd4">Soft blue</button>`)],
  api: [['data-variant', 'ghost | quiet | soft', 'Default is solid.'], ['data-size', 'sm | lg | icon', 'Default is 36px tall.'], ['data-tone / --tone', 'colour', 'Fill colour.'], ['aria-busy="true"', 'attr', 'Shows a spinner and blocks clicks.'], ['disabled', 'attr', 'Native disabled. Use aria-disabled="true" on .btn links.']] },

{ id: 'card', name: 'Card', desc: 'A surface for grouped content, with an optional mono header strip and a footer.',
  why: 'The header and footer stretch to the card edges automatically. Write <code>&lt;header&gt;</code> and <code>&lt;footer&gt;</code> and the layout is done.',
  ex: [ex('Card with header & footer', `
<article class="card" style="max-width:380px">
  <header>Monthly budget <span class="badge" data-tone="good">On track</span></header>
  <h3 class="m-0">₹42,180</h3>
  <p class="muted">of ₹60,000 spent this month</p>
  <progress value="70" max="100"></progress>
  <footer>
    <button data-variant="ghost" data-size="sm">Details</button>
    <button data-size="sm">Adjust</button>
  </footer>
</article>`, { block: 1 }),
       ex('Variants', `
<div class="grid gap-4 grid-cols-[repeat(auto-fit,minmax(180px,1fr))] w-full">
  <div class="card"><p class="eyebrow">Outline</p><strong>Default</strong></div>
  <div class="card" data-variant="flat"><p class="eyebrow">Flat</p><strong>Tinted</strong></div>
  <div class="card" data-variant="accent"><p class="eyebrow" style="color:inherit">Accent</p><strong>Terracotta</strong></div>
  <a class="card" href="#/card"><p class="eyebrow">Link</p><strong>Hover me</strong></a>
</div>`, { block: 1 })],
  api: [['.card', 'class', 'Surface. Works on article, section, div or a.'], ['> header', 'tag', 'Mono title strip.'], ['> footer', 'tag', 'Right-aligned actions row.'], ['data-variant', 'flat | accent', 'Default is outlined white.']] },

{ id: 'bars', name: 'Bar chart', desc: 'A single-series column chart in plain CSS, with one highlighted bar.',
  why: 'No chart library. Each bar is a span with a <code>--v</code> percentage. Put the values in <code>aria-label</code> so screen readers get them too.',
  ex: [ex('Week', `
<div class="bars" role="img" aria-label="Hours per day: Mon 52, Tue 56, Wed 54, Thu 55, Fri 92, Sat 14, Sun 9">
  <span style="--v:52" data-label="Mon" data-tooltip="52h"></span>
  <span style="--v:56" data-label="Tue" data-tooltip="56h"></span>
  <span style="--v:54" data-label="Wed" data-tooltip="54h"></span>
  <span style="--v:55" data-label="Thu" data-tooltip="55h"></span>
  <span style="--v:92" data-label="Fri" data-tooltip="92h" data-on></span>
  <span style="--v:14" data-label="Sat" data-tooltip="14h"></span>
  <span style="--v:9" data-label="Sun" data-tooltip="9h"></span>
</div>`, { block: 1 })],
  api: [['.bars > span', 'markup', 'One bar each.'], ['--v', 'CSS var', 'Height, 0 to 100.'], ['data-on', 'attr', 'Highlight in the accent colour.'], ['data-label', 'attr', 'Text under the bar.'], ['data-tooltip', 'attr', 'Value on hover.'], ['data-tone / --tone', 'colour', 'Highlight colour.']] },

{ id: 'dialog', name: 'Dialog', desc: 'A modal built on native <code>&lt;dialog&gt;</code>. Open it with <code>data-open="id"</code>.',
  why: 'The browser handles focus trapping, Escape and the top layer. Sidedish adds the styling, opening by attribute and closing on backdrop click.',
  ex: [ex('Modal form', `
<button data-open="demo-dialog">Open dialog</button>
<dialog id="demo-dialog" aria-labelledby="dlg-title">
  <header>
    <h2 id="dlg-title">Edit account</h2>
    <button data-variant="quiet" data-size="icon" data-close aria-label="Close">✕</button>
  </header>
  <form method="dialog" class="flex flex-col gap-3">
    <label>Account name <input value="HDFC Savings"></label>
    <label>Nickname <input placeholder="Optional"></label>
  </form>
  <footer>
    <button data-variant="ghost" data-close>Cancel</button>
    <button data-close onclick="Sidedish.toast('Account saved', {tone:'good'})">Save</button>
  </footer>
</dialog>`)],
  js: `// data-open / data-close work in Server Components, with no "use client" needed.
// To open from code, use the native API with a ref:
"use client";
import { useRef } from "react";

export function EditAccount() {
  const ref = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button onClick={() => ref.current?.showModal()}>Open</button>
      <dialog ref={ref}>…</dialog>
    </>
  );
}`,
  api: [['data-open="id"', 'attr', 'Put on any element to open that dialog.'], ['data-close', 'attr', 'Inside a dialog: closes it.'], ['data-side="right"', 'attr', 'Full-height side panel.'], ['> header, > footer', 'tag', 'Header row and tinted action bar.'], ['form method="dialog"', 'native', 'Submitting closes the dialog.']] },

{ id: 'dropdown', name: 'Dropdown', wc: 1, desc: 'A menu that opens from a button. Arrow keys move between items, Escape or an outside click closes it.',
  why: 'Write a button and a <code>&lt;menu&gt;</code>. The element adds roles, aria-expanded, keyboard support and a <code>select</code> event.',
  ex: [ex('Actions menu', `
<sd-dropdown>
  <button data-variant="ghost">Options ▾</button>
  <menu>
    <li><button value="edit">Edit</button></li>
    <li><button value="duplicate">Duplicate</button></li>
    <li><button value="export">Export CSV</button></li>
    <hr>
    <li><button value="delete" style="color:var(--sd-bad)">Delete</button></li>
  </menu>
</sd-dropdown>
<sd-dropdown align="end">
  <button>Aligned end ▾</button>
  <menu>
    <li><button>Profile</button></li>
    <li><button>Sign out</button></li>
  </menu>
</sd-dropdown>`)],
  js: `"use client";
import { useRef } from "react";
import { useSidedishEvent, toast } from "sidedish";

export function RowActions() {
  const ref = useRef<HTMLElement>(null);
  useSidedishEvent<{ value: string }>(ref, "select", (e) => toast(e.detail.value)); // "edit", "duplicate", …
  return (
    <sd-dropdown ref={ref}>
      <button data-variant="ghost">Options ▾</button>
      <menu>
        <li><button value="edit">Edit</button></li>
        <li><button value="delete">Delete</button></li>
      </menu>
    </sd-dropdown>
  );
}`,
  api: [['<sd-dropdown>', 'element', 'Wraps a trigger &lt;button&gt; and a &lt;menu&gt;.'], ['align="end"', 'attr', 'Right-align the menu.'], ['open', 'attr', 'Reflects the open state.'], ['select', 'event', 'detail.value: the button value or its text.']] },

{ id: 'tag-input', name: 'TagInput', wc: 1, desc: 'Type and press Enter or comma to add a tag. Backspace removes the last one.',
  why: 'It is form-associated, so it submits with a normal <code>&lt;form&gt;</code> as a comma-separated value. You don\'t need a hidden input.',
  ex: [ex('In a form', `
<label class="w-full" style="max-width:420px">
  Categories
  <sd-tag-input name="tags" value="groceries,fuel,rent" placeholder="Add category…"></sd-tag-input>
  <span class="hint">Press Enter or comma to add.</span>
</label>`, { block: 1 })],
  js: `// Server Action: the field submits as one comma-separated value.
export default function Page() {
  async function save(form: FormData) {
    "use server";
    const tags = String(form.get("tags")).split(","); // ["groceries", "fuel", "rent"]
  }
  return (
    <form action={save}>
      <sd-tag-input name="tags" value="groceries,fuel,rent" />
      <button>Save</button>
    </form>
  );
}

// Client side: useSidedishEvent(ref, "change", (e) => e.detail.tags)
// Methods: ref.current.add("travel"), ref.current.remove(0), ref.current.value`,
  api: [['name', 'attr', 'Form field name.'], ['value', 'attr / prop', 'Comma-separated tags.'], ['placeholder', 'attr', 'Input placeholder.'], ['add(tag) / remove(i)', 'method', 'Change tags from code.'], ['change', 'event', 'detail.tags: the current array.']] },

{ id: 'forms', name: 'Form elements', desc: 'Inputs, selects, textareas, checkboxes, radios, ranges and fieldsets. Wrap a field in its <code>&lt;label&gt;</code>.',
  why: 'A label wrapping its field gives you accessible names and layout together. Errors use <code>aria-invalid</code>, which is the attribute assistive tech reads anyway.',
  ex: [ex('Full form', `
<form class="flex flex-col gap-3" style="max-width:440px" onsubmit="event.preventDefault();Sidedish.toast('Submitted',{tone:'good'})">
  <label>Email <input type="email" placeholder="you@example.com" required></label>
  <label>Password <input type="password" aria-invalid="true" value="123"><span class="error">At least 8 characters.</span></label>
  <label>Account type
    <select><option>Savings</option><option>Current</option><option>Credit card</option></select>
  </label>
  <label>Notes <textarea placeholder="Anything we should know?"></textarea><span class="hint">Optional</span></label>
  <fieldset>
    <legend>Notifications</legend>
    <label><input type="checkbox" checked> Email me statements</label>
    <label><input type="radio" name="freq" checked> Weekly</label>
    <label><input type="radio" name="freq"> Monthly</label>
  </fieldset>
  <label>Risk appetite <input type="range" min="0" max="10" value="6"></label>
  <button>Create account</button>
</form>`, { block: 1 })],
  api: [['label > input', 'markup', 'Label wraps its field, stacked.'], ['label > [type=checkbox|radio]', 'markup', 'Inline row.'], ['.hint / .error', 'class', 'Helper and error text.'], ['aria-invalid="true"', 'attr', 'Red border.'], ['fieldset, legend', 'tag', 'Grouped controls.']] },

{ id: 'upload', name: 'Upload', wc: 1, desc: 'A drag-and-drop zone that wraps a real file input and lists the chosen files.',
  why: 'The native <code>&lt;input type="file"&gt;</code> stays inside, so forms submit files normally. Drag-and-drop is extra on top of that.',
  ex: [ex('Drop zone', `
<sd-upload name="statement" accept=".pdf,.csv" multiple label="Drop statements here" hint="PDF or CSV, up to 10 MB" class="w-full"></sd-upload>`, { block: 1 })],
  js: `// Works with Server Actions: the real <input type="file"> is inside.
export default function Page() {
  async function upload(form: FormData) {
    "use server";
    const files = form.getAll("statement") as File[];
  }
  return (
    <form action={upload}>
      <sd-upload name="statement" accept=".pdf,.csv" multiple />
      <button>Upload</button>
    </form>
  );
}

// Client side: useSidedishEvent<{ files: FileList }>(ref, "files", (e) => e.detail.files)`,
  api: [['name, accept, multiple, required', 'attr', 'Passed to the inner file input.'], ['label / hint', 'attr', 'Zone text.'], ['dragging', 'attr', 'Present while a file is dragged over.'], ['files', 'event', 'detail.files: a FileList.']] },

{ id: 'heatmap', name: 'Heatmap', desc: 'A square-dot activity grid, light to dark in one colour.',
  why: 'A CSS grid that fills seven rows per column, so you only output one span per day.',
  ex: [ex('Activity', `
<div class="heatmap" role="img" aria-label="Daily tasks over 10 weeks, quiet at weekends"><span data-level="0"></span><span data-level="2"></span><span data-level="4"></span><span data-level="1"></span><span data-level="3"></span><span data-level="0"></span><span data-level="0"></span><span data-level="4"></span><span data-level="2"></span><span data-level="4"></span><span data-level="1"></span><span data-level="3"></span><span data-level="0"></span><span data-level="0"></span><span data-level="4"></span><span data-level="1"></span><span data-level="4"></span><span data-level="1"></span><span data-level="3"></span><span data-level="0"></span><span data-level="0"></span><span data-level="4"></span><span data-level="1"></span><span data-level="3"></span><span data-level="1"></span><span data-level="3"></span><span data-level="0"></span><span data-level="0"></span><span data-level="4"></span><span data-level="1"></span><span data-level="3"></span><span data-level="0"></span><span data-level="3"></span><span data-level="0"></span><span data-level="0"></span><span data-level="4"></span><span data-level="1"></span><span data-level="3"></span><span data-level="0"></span><span data-level="2"></span><span data-level="0"></span><span data-level="0"></span><span data-level="4"></span><span data-level="1"></span><span data-level="3"></span><span data-level="0"></span><span data-level="2"></span><span data-level="0"></span><span data-level="0"></span><span data-level="4"></span><span data-level="1"></span><span data-level="3"></span><span data-level="0"></span><span data-level="2"></span><span data-level="0"></span><span data-level="0"></span><span data-level="4"></span><span data-level="1"></span><span data-level="3"></span><span data-level="0"></span><span data-level="2"></span><span data-level="0"></span><span data-level="0"></span><span data-level="3"></span><span data-level="1"></span><span data-level="3"></span><span data-level="0"></span><span data-level="2"></span><span data-level="0"></span><span data-level="0"></span></div>`)],
  api: [['.heatmap > span', 'markup', 'One cell per day.'], ['data-level', '0 to 4', 'Intensity.'], ['data-tone / --tone', 'colour', 'Ramp colour.']] },

{ id: 'meter', name: 'Meter', desc: 'Native <code>&lt;meter&gt;</code> for a value inside a known range. It turns green, amber or red from <code>low</code>, <code>high</code> and <code>optimum</code>.',
  why: 'The browser picks the colour from the thresholds you give it, so a budget bar needs no JavaScript.',
  ex: [ex('Budget usage', `
<div class="flex flex-col gap-3 w-full">
  <label>Groceries · 40% <meter min="0" max="100" low="70" high="90" optimum="0" value="40"></meter></label>
  <label>Dining · 78% <meter min="0" max="100" low="70" high="90" optimum="0" value="78"></meter></label>
  <label>Shopping · 96% <meter min="0" max="100" low="70" high="90" optimum="0" value="96"></meter></label>
</div>`, { block: 1 })],
  api: [['value, min, max', 'attr', 'The measurement.'], ['low, high, optimum', 'attr', 'Thresholds that drive the colour.']] },

{ id: 'pagination', name: 'Pagination', desc: 'Page links for long lists.',
  why: 'Plain links with <code>aria-current</code>, so the current page is styled and announced. It works without JavaScript.',
  ex: [ex('Pages', `
<nav class="pagination" aria-label="Pagination">
  <a href="#/pagination" aria-disabled="true">‹</a>
  <a href="#/pagination" aria-current="page">1</a>
  <a href="#/pagination">2</a>
  <a href="#/pagination">3</a>
  <a href="#/pagination">…</a>
  <a href="#/pagination">12</a>
  <a href="#/pagination">›</a>
</nav>`)],
  api: [['nav.pagination > a', 'markup', 'Page links.'], ['aria-current="page"', 'attr', 'Current page.'], ['aria-disabled="true"', 'attr', 'Disabled link.']] },

{ id: 'progress', name: 'Progress', desc: 'Native <code>&lt;progress&gt;</code>. Leave out <code>value</code> to show the indeterminate animation.',
  why: 'Screen readers announce the native element as a progress bar, which a styled div doesn\'t give you.',
  ex: [ex('Determinate & indeterminate', `
<div class="flex flex-col gap-3 w-full">
  <progress value="30" max="100"></progress>
  <progress value="65" max="100" data-tone="info"></progress>
  <progress value="90" max="100" style="--tone:#b4532a"></progress>
  <progress></progress>
</div>`, { block: 1 })],
  api: [['value, max', 'attr', 'Progress. Leave out value for indeterminate.'], ['data-tone / --tone', 'colour', 'Bar colour.']] },

{ id: 'spinner', name: 'Spinner', desc: 'A small loading indicator.',
  why: 'It inherits the tone, and inside buttons <code>aria-busy</code> draws one for you.',
  ex: [ex('Sizes & tones', `
<span class="spinner" data-size="sm" role="status" aria-label="Loading"></span>
<span class="spinner" role="status" aria-label="Loading"></span>
<span class="spinner" data-size="lg" data-tone="ink" role="status" aria-label="Loading"></span>
<span class="spinner" style="--tone:#c98a12" role="status" aria-label="Loading"></span>
<button aria-busy="true">Syncing</button>`)],
  api: [['.spinner', 'class', 'Spinner.'], ['data-size', 'sm | lg', 'Size.'], ['role="status" aria-label', 'attr', 'Add these so it is announced.']] },

{ id: 'skeleton', name: 'Skeleton', desc: 'Shimmering placeholders shown while content loads.',
  why: 'Set the width and height and you have a placeholder that holds the layout steady until data arrives.',
  ex: [ex('Loading card', `
<div class="card w-full" style="max-width:380px" aria-busy="true">
  <div class="flex flex-wrap items-center gap-3">
    <div class="skeleton" style="width:40px;height:40px;border-radius:50%"></div>
    <div class="flex flex-col gap-[6px] grow">
      <div class="skeleton" style="width:60%"></div>
      <div class="skeleton" style="width:40%"></div>
    </div>
  </div>
  <div class="skeleton mt-4" style="height:80px"></div>
</div>`, { block: 1 })],
  api: [['.skeleton', 'class', 'Placeholder; size it with width and height.']] },

{ id: 'sidebar', name: 'Sidebar', desc: 'App layout with a sticky side navigation that slides in as a drawer on small screens. This docs site uses it.',
  why: 'One <code>.layout</code> grid and <code>data-toggle</code> for the mobile drawer. No layout JavaScript.',
  ex: [ex('Layout', `
<div class="layout demo-layout">
  <aside class="sidebar" id="demo-side">
    <p class="eyebrow">Main</p>
    <nav>
      <a href="#/sidebar" aria-current="page">Overview</a>
      <a href="#/sidebar">Transactions</a>
      <a href="#/sidebar">Budgets</a>
    </nav>
    <p class="eyebrow">Settings</p>
    <nav><a href="#/sidebar">Accounts</a></nav>
  </aside>
  <main class="p-4">
    <h3>Overview</h3>
    <p>Main content goes here.</p>
  </main>
</div>`, { block: 1 })],
  js: `// app/(app)/layout.tsx: a Server Component, no client JS of your own
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout">
      <aside className="sidebar" id="side">
        <nav><a href="/" aria-current="page">Overview</a></nav>
      </aside>
      <main>
        {/* Mobile: toggles data-open on the sidebar */}
        <button data-toggle="#side" aria-label="Menu">☰</button>
        {children}
      </main>
    </div>
  );
}`,
  api: [['.layout', 'class', 'Two-column grid that collapses under 860px.'], ['.sidebar', 'class', 'Sticky side panel; a drawer on mobile.'], ['.sidebar nav > a[aria-current]', 'markup', 'Active link.'], ['data-toggle="#id"', 'attr', 'Toggles data-open on the target.']] },

{ id: 'stat', name: 'Stat', desc: 'A headline number with a label, unit and change badge.',
  why: 'Tabular figures keep rows of numbers aligned. Add <code>data-tone</code> to colour the number.',
  ex: [ex('KPI row', `
<div class="grid grid-cols-1 gap-3 sm:grid-cols-3 w-full">
  <div class="card stat"><small>Billable hours</small><strong>3,412<small>h</small></strong><span class="badge justify-self-start">↗ 6.1%</span></div>
  <div class="card stat" style="--tone:var(--sd-accent)"><small>26-week total</small><strong>1,516 <small>tasks</small></strong></div>
  <div class="card stat"><small>Utilization</small><strong>82<small>%</small></strong></div>
</div>`, { block: 1 })],
  api: [['.stat', 'class', 'Combine with .card for a tile.'], ['> small', 'tag', 'Label.'], ['> strong > small', 'tag', 'Value and unit.'], ['data-tone / --tone', 'colour', 'Number colour.']] },

{ id: 'switch', name: 'Switch', desc: 'A checkbox with <code>role="switch"</code>, drawn as a toggle.',
  why: 'It is still a real checkbox, so it submits with forms and is announced as on or off.',
  ex: [ex('Toggles', `
<div class="flex flex-col gap-3">
  <label><input type="checkbox" role="switch" checked> Push notifications</label>
  <label><input type="checkbox" role="switch"> Weekly digest</label>
  <label><input type="checkbox" role="switch" checked data-tone="info"> Auto-categorise</label>
  <label><input type="checkbox" role="switch" disabled> Disabled</label>
</div>`)],
  api: [['input[type=checkbox][role=switch]', 'markup', 'Switch.'], ['data-tone / --tone', 'colour', 'Colour when on.']] },

{ id: 'table', name: 'Table', desc: 'Data tables with quiet headers, hover rows and tabular numbers.',
  why: 'Native table markup. Wrap it in <code>.table</code> for a border and horizontal scroll on phones.',
  ex: [ex('Transactions', `
<div class="table-wrap w-full">
  <table>
    <thead><tr><th>Date</th><th>Payee</th><th>Category</th><th class="num">Amount</th></tr></thead>
    <tbody>
      <tr><td>18 Nov</td><td>Blue Tokai</td><td><span class="badge" data-tone="warn">Dining</span></td><td class="num" style="color:var(--sd-bad)">−₹420</td></tr>
      <tr><td>17 Nov</td><td>Salary</td><td><span class="badge" data-tone="good">Income</span></td><td class="num" style="color:var(--sd-good)">+₹1,20,000</td></tr>
      <tr><td>16 Nov</td><td>Zerodha SIP</td><td><span class="badge" data-tone="info">Invest</span></td><td class="num">−₹10,000</td></tr>
    </tbody>
  </table>
</div>`, { block: 1 })],
  api: [['.table', 'class', 'Bordered, scrollable wrapper.'], ['.num', 'class', 'Right-aligned tabular numbers.']] },

{ id: 'sortable-table', name: 'Sortable table', wc: 1, desc: 'The same table, with click-to-sort column headers.',
  why: 'Wrap any <code>&lt;table&gt;</code> that has a <code>&lt;thead&gt;</code> and <code>&lt;tbody&gt;</code> in <code>&lt;sd-table&gt;</code>. Columns of numbers sort numerically, the rest as text. Add <code>data-sort</code> to a cell to sort by a different value than it shows.',
  ex: [ex('Click a header', `
<sd-table class="w-full">
  <div class="table-wrap">
    <table>
      <thead><tr><th>Date</th><th>Payee</th><th class="num">Amount</th></tr></thead>
      <tbody>
        <tr><td data-sort="2026-11-18">18 Nov</td><td>Blue Tokai</td><td class="num">−₹420</td></tr>
        <tr><td data-sort="2026-11-17">17 Nov</td><td>Salary</td><td class="num">₹1,20,000</td></tr>
        <tr><td data-sort="2026-11-16">16 Nov</td><td>Zerodha SIP</td><td class="num">−₹10,000</td></tr>
      </tbody>
    </table>
  </div>
</sd-table>`, { block: 1 })],
  js: `// Client side: useSidedishEvent<{ column: number; direction: string }>(ref, "sort", (e) => e.detail.direction)`,
  api: [['sort', 'event', 'detail: { column, direction }'], ['data-sort', 'attribute', 'On a <td>: the value to sort by.']] },

{ id: 'calendar', name: 'Calendar', wc: 1, desc: 'A month grid for picking a date. Keyboard friendly, and it works inside a form.',
  why: 'One element, no markup inside. Arrow keys move by day and week, the buttons change month, and <code>change</code> fires with an ISO date. Weeks start on Monday.',
  ex: [ex('Date picker', `
<sd-calendar name="date" value="2026-11-18"></sd-calendar>`, { block: 1 }),
  ex('With a range limit', `
<sd-calendar min="2026-11-10" max="2026-11-25" value="2026-11-18"></sd-calendar>`, { block: 1 })],
  js: `"use client";
import { useRef } from "react";
import { useSidedishEvent } from "sidedish";

export function DatePick() {
  const ref = useRef<HTMLElement>(null);
  useSidedishEvent<{ value: string }>(ref, "change", (e) => console.log(e.detail.value)); // "2026-11-18"
  return <sd-calendar ref={ref} name="date" />;
}`,
  api: [['value', 'attr / prop', 'Selected date, YYYY-MM-DD.'], ['min / max', 'attr', 'Earliest and latest selectable date.'], ['name', 'attr', 'Submits the value with a form.'], ['change', 'event', 'detail: { value }']] },

{ id: 'tabs', name: 'Tabs', wc: 1, desc: 'A segmented control that switches between panels, using the same look as the finance app.',
  why: 'Buttons in a <code>&lt;nav&gt;</code> plus one <code>&lt;section&gt;</code> per tab. The element wires up ARIA roles, arrow keys and hidden panels.',
  ex: [ex('Segmented', `
<sd-tabs class="w-full">
  <nav><button>Overview</button><button>Analytics</button><button>Reports</button></nav>
  <section><p>Overview panel: your month at a glance.</p></section>
  <section><p>Analytics panel: trends and categories.</p></section>
  <section><p>Reports panel: export statements.</p></section>
</sd-tabs>`, { block: 1 })],
  js: `// Works as-is in a Server Component. To react to changes:
"use client";
import { useRef } from "react";
import { useSidedishEvent } from "sidedish";

export function ReportTabs() {
  const ref = useRef<HTMLElement & { select(i: number): void }>(null);
  useSidedishEvent<{ index: number }>(ref, "change", (e) => console.log(e.detail.index));
  return (
    <sd-tabs ref={ref} selected={1}>
      <nav><button>Overview</button><button>Analytics</button></nav>
      <section>…</section>
      <section>…</section>
    </sd-tabs>
  );
}
// ref.current?.select(0) switches tab from code.`,
  api: [['<sd-tabs>', 'element', '&lt;nav&gt; of buttons followed by &lt;section&gt; panels.'], ['selected', 'attr', 'Initial index (0-based).'], ['select(i)', 'method', 'Change tab from code.'], ['change', 'event', 'detail.index.']] },

{ id: 'tooltip', name: 'Tooltip', desc: 'A short hint on hover or keyboard focus, set with <code>data-tooltip</code>.',
  why: 'Pure CSS and one attribute. It also appears on keyboard focus, not only hover.',
  ex: [ex('Positions', `
<button data-variant="ghost" data-tooltip="Saved 2 min ago">Hover me</button>
<button data-variant="ghost" data-tooltip="Below the button" data-tooltip-pos="bottom">Bottom</button>
<span class="badge" data-tooltip="Systematic Investment Plan" tabindex="0">SIP</span>`)],
  api: [['data-tooltip="text"', 'attr', 'Tooltip text.'], ['data-tooltip-pos="bottom"', 'attr', 'Show below (default is above).']] },

{ id: 'toast', name: 'Toast', desc: 'Brief notifications in the bottom-right corner. Import <code>toast</code> from <code>sidedish</code> and call it from any client component.',
  why: 'One function call, with no provider or <code>&lt;Toaster /&gt;</code> to mount. Toasts go into a polite live region so screen readers announce them, and they dismiss themselves or on click.',
  ex: [ex('Try it', `
<button onclick="Sidedish.toast('Changes saved')">Default</button>
<button data-tone="good" onclick="Sidedish.toast('₹12,400 received', {title:'Payment', tone:'good'})">Success</button>
<button data-tone="warn" onclick="Sidedish.toast('82% of budget used', {tone:'warn'})">Warning</button>
<button data-tone="bad" onclick="Sidedish.toast('Could not sync', {title:'Error', tone:'bad', duration:6000})">Error</button>`)],
  js: `"use client";
import { toast } from "sidedish";

toast("Changes saved");
toast("Could not sync", { title: "Error", tone: "bad", duration: 6000 });

// After a Server Action:
const result = await saveAccount(form);
toast(result.ok ? "Saved" : result.error, { tone: result.ok ? "good" : "bad" });`,
  api: [['toast(msg, opts)', 'function', 'Shows a toast and returns its element.'], ['opts.title', 'string', 'Bold first line.'], ['opts.tone', 'good | warn | bad | info | ink', 'Accent colour.'], ['opts.duration', 'ms', 'Default 3500.']] },

{ id: 'utils', name: 'Layout, Tailwind and helpers', desc: 'Layout, spacing and responsive behaviour come from Tailwind. Sidedish adds colour tokens and a few JavaScript helpers.',
  why: 'Tailwind CSS v4 is a peer dependency. Sidedish lives in Tailwind layers, so your utilities always win, and its colours are Tailwind colours: <code>bg-accent</code>, <code>text-muted</code>, <code>border-line</code>, <code>bg-tint</code>, <code>text-good</code>. Use <code>sm:</code>, <code>md:</code> and <code>lg:</code> for responsive layouts, and <code>dark:</code> follows the theme toggle.',
  ex: [ex('Tailwind layout with Sidedish colours', `
<div class="grid grid-cols-1 gap-3 sm:grid-cols-3 w-full">
  <div class="rounded-sm border border-line bg-surface p-4 text-sm text-sub">1 column on phones</div>
  <div class="rounded-sm border border-line bg-surface p-4 text-sm text-sub">3 from <code>sm</code> up</div>
  <div class="rounded-sm bg-accent p-4 text-sm text-on">bg-accent text-on</div>
</div>`, { block: 1 })],
  js: `// Theme from the server, with no flash:   app/layout.tsx
<Sidedish theme={{ accent: "#7c3aed", bg: "#ffffff" }} />

// Theme at runtime, from a client component:
import { theme, toast, useSidedishEvent } from "sidedish";
theme({ accent: "#b4532a" });              // whole page
theme({ accent: "#b4532a" }, element);     // one subtree
toast("Hello");`,
  api: [['bg-* text-* border-*', 'Tailwind colours', 'bg, surface, ink, sub, muted, line, tint, accent, on, good, bad, warn, info.'], ['font-sans / font-mono', 'Tailwind fonts', 'DM Sans and Red Hat Mono.'], ['.tone .surface', 'class', 'Colour text by tone / white bordered box.'], ['.table-wrap', 'class', 'Bordered, scrollable table wrapper.'], ['&lt;Sidedish theme={…} /&gt;', 'component', 'Mount once in the root layout. Optional theme tokens, rendered on the server.'], ['theme(vars, scope?)', 'function', 'Set --sd-* tokens at runtime.'], ['useSidedishEvent(ref, name, fn)', 'hook', 'Listen to select / change / files on a web component.']] },
];

