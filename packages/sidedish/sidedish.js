/* Sidedish v0.1 · tiny behaviours + web components · MIT */
(() => {
  if (typeof document == 'undefined') return; // server render (Next.js SSR): nothing to do
  const d = document, uid = () => 'sd' + Math.random().toString(36).slice(2, 8);
  const on = (t, e, f) => t.addEventListener(e, f);
  const el = (tag, props) => Object.assign(d.createElement(tag), props);
  const emit = (t, n, detail) => t.dispatchEvent(new CustomEvent(n, { detail, bubbles: true }));
  const once = t => t._sd ? 0 : (t._sd = 1);

  // data-open="dialogId", data-close (inside a dialog), data-toggle="#selector" (toggles data-open). Backdrop click closes a dialog.
  on(d, 'click', e => {
    const t = e.target.closest('[data-open],[data-close],[data-toggle]');
    if (t?.dataset.open) d.getElementById(t.dataset.open)?.showModal();
    if (t?.hasAttribute('data-close')) t.closest('dialog')?.close();
    if (t?.dataset.toggle) d.querySelector(t.dataset.toggle)?.toggleAttribute('data-open');
    if (e.target.tagName == 'DIALOG') e.target.close();
  });

  let box;
  const toast = (msg, o = {}) => {
    if (!box) { box = d.body.appendChild(el('div', { className: 'toasts' })); box.setAttribute('aria-live', 'polite'); }
    const t = el('div', { className: 'toast', onclick: () => t.remove() });
    if (o.tone) t.dataset.tone = o.tone;
    if (o.title) t.append(el('strong', { textContent: o.title }));
    t.append(el('span', { textContent: msg }));
    box.append(t);
    setTimeout(() => { t.dataset.leaving = ''; setTimeout(() => t.remove(), 200); }, o.duration ?? 3500);
    return t;
  };

  // Sidedish.theme({ accent: '#7c3aed', bg: '#fff' }) sets --sd-* tokens on the root (or on `scope`).
  const theme = (vars, scope = d.documentElement) => Object.entries(vars).forEach(([k, v]) => scope.style.setProperty('--sd-' + k, v));

  class Tabs extends HTMLElement {
    connectedCallback() {
      if (!once(this)) return;
      const nav = this.querySelector(':scope>nav'), tabs = [...nav.children], panels = [...this.querySelectorAll(':scope>section')];
      nav.setAttribute('role', 'tablist');
      const sel = (i, fire) => {
        tabs.forEach((t, j) => { t.setAttribute('aria-selected', i == j); t.tabIndex = i == j ? 0 : -1; if (panels[j]) panels[j].hidden = i != j; });
        this.index = i;
        if (fire) emit(this, 'change', { index: i });
      };
      tabs.forEach((t, i) => {
        const p = panels[i], id = uid();
        t.type = 'button'; t.id = id; t.setAttribute('role', 'tab');
        if (p) { p.id ||= uid(); p.setAttribute('role', 'tabpanel'); p.setAttribute('aria-labelledby', id); t.setAttribute('aria-controls', p.id); }
        on(t, 'click', () => sel(i, 1));
      });
      on(nav, 'keydown', e => {
        const k = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
        if (k) { const n = (this.index + k + tabs.length) % tabs.length; sel(n, 1); tabs[n].focus(); }
      });
      this.select = i => sel(i, 1);
      sel(+this.getAttribute('selected') || 0);
    }
  }

  class Dropdown extends HTMLElement {
    connectedCallback() {
      if (!once(this)) return;
      const btn = this.querySelector(':scope>button'), menu = this.querySelector(':scope>menu');
      const items = () => [...menu.querySelectorAll('button:not(:disabled)')];
      menu.setAttribute('role', 'menu');
      items().forEach(i => { i.setAttribute('role', 'menuitem'); i.type = 'button'; });
      btn.setAttribute('aria-haspopup', 'menu');
      const set = o => { this.toggleAttribute('open', o); btn.setAttribute('aria-expanded', o); if (o) items()[0]?.focus(); };
      set(false);
      on(btn, 'click', () => set(!this.hasAttribute('open')));
      on(menu, 'click', e => {
        const i = e.target.closest('button');
        if (i) { emit(this, 'select', { value: i.value || i.textContent.trim() }); set(false); btn.focus(); }
      });
      on(this, 'keydown', e => {
        if (e.key == 'Escape') { set(false); btn.focus(); }
        const k = { ArrowDown: 1, ArrowUp: -1 }[e.key];
        if (k && this.hasAttribute('open')) { e.preventDefault(); const l = items(); l[(l.indexOf(d.activeElement) + k + l.length) % l.length].focus(); }
      });
      // ponytail: document listener is never removed; fine unless dropdowns are created and destroyed thousands of times.
      on(d, 'click', e => this.hasAttribute('open') && !this.contains(e.target) && set(false));
    }
  }

  class TagInput extends HTMLElement {
    static formAssociated = true;
    constructor() { super(); this.tags = []; this._in = this.attachInternals?.(); }
    get value() { return this.tags.join(','); }
    set value(v) { this.tags = [...new Set(String(v ?? '').split(',').map(s => s.trim()).filter(Boolean))]; this.render(); }
    connectedCallback() {
      if (!once(this)) return;
      this.input = el('input', { placeholder: this.getAttribute('placeholder') || 'Add tag…' });
      this.input.setAttribute('aria-label', this.getAttribute('aria-label') || 'Add tag');
      on(this.input, 'keydown', e => {
        const v = this.input.value.trim().replace(/,$/, '');
        if ((e.key == 'Enter' || e.key == ',') && v) { e.preventDefault(); this.input.value = ''; this.add(v); }
        else if (e.key == 'Backspace' && !this.input.value && this.tags.length) this.remove(this.tags.length - 1);
      });
      on(this, 'click', e => { const x = e.target.closest('[data-i]'); x ? this.remove(+x.dataset.i) : this.input.focus(); });
      this.value = this.getAttribute('value') ?? this.value;
    }
    add(v) { if (this.tags.includes(v)) return; this.tags.push(v); this.render(1); }
    remove(i) { this.tags.splice(i, 1); this.render(1); }
    render(changed) {
      if (!this.input) return;
      this.replaceChildren(...this.tags.map((t, i) => {
        const b = el('button', { type: 'button', textContent: '×' }), s = el('span', { className: 'badge', textContent: t });
        b.dataset.i = i; b.setAttribute('aria-label', 'Remove ' + t); s.append(b); return s;
      }), this.input);
      this._in?.setFormValue(this.value);
      if (changed) { this.input.focus(); emit(this, 'change', { tags: [...this.tags] }); }
    }
  }

  const size = b => b < 1024 ? b + ' B' : b < 1048576 ? (b / 1024).toFixed(1) + ' KB' : (b / 1048576).toFixed(1) + ' MB';
  class Upload extends HTMLElement {
    connectedCallback() {
      if (!once(this)) return;
      const inp = el('input', { type: 'file' }), zone = el('label'), list = el('ul');
      ['name', 'accept', 'multiple', 'required'].forEach(a => this.hasAttribute(a) && inp.setAttribute(a, this.getAttribute(a)));
      zone.append(el('strong', { textContent: this.getAttribute('label') || 'Drop files here or click to browse' }), el('small', { textContent: this.getAttribute('hint') || '' }), inp);
      const show = () => {
        list.replaceChildren(...[...inp.files].map(f => { const li = el('li', { textContent: f.name }); li.append(el('small', { textContent: size(f.size) })); return li; }));
        emit(this, 'files', { files: inp.files });
      };
      on(inp, 'change', show);
      ['dragenter', 'dragover'].forEach(n => on(zone, n, e => { e.preventDefault(); this.setAttribute('dragging', ''); }));
      ['dragleave', 'drop'].forEach(n => on(zone, n, e => { e.preventDefault(); this.removeAttribute('dragging'); }));
      on(zone, 'drop', e => {
        let f = e.dataTransfer.files;
        if (!inp.multiple && f.length > 1) { const dt = new DataTransfer(); dt.items.add(f[0]); f = dt.files; }
        inp.files = f; show();
      });
      this.append(zone, list);
    }
  }

  // <sd-table><table>…</table></sd-table>: click a header to sort. Numbers sort numerically, everything else as text.
  class SortTable extends HTMLElement {
    connectedCallback() {
      if (!once(this)) return;
      const ths = [...this.querySelectorAll('thead th')], body = this.querySelector('tbody');
      const val = (r, i) => r.cells[i]?.dataset.sort ?? r.cells[i]?.textContent.trim() ?? '';
      const num = v => parseFloat(v.replace(/[^\d.\-\u2212]/g, '').replace('\u2212', '-'));
      ths.forEach((th, i) => {
        th.setAttribute('aria-sort', 'none'); th.tabIndex = 0;
        const go = () => {
          const dir = th.getAttribute('aria-sort') == 'ascending' ? -1 : 1;
          ths.forEach(t => t.setAttribute('aria-sort', 'none'));
          th.setAttribute('aria-sort', dir > 0 ? 'ascending' : 'descending');
          const rows = [...body.rows], isNum = rows.every(r => !isNaN(num(val(r, i))));
          rows.sort((a, b) => dir * (isNum ? num(val(a, i)) - num(val(b, i)) : val(a, i).localeCompare(val(b, i), undefined, { numeric: true })));
          body.append(...rows);
          emit(this, 'sort', { column: i, direction: dir > 0 ? 'ascending' : 'descending' });
        };
        on(th, 'click', go);
        on(th, 'keydown', e => (e.key == 'Enter' || e.key == ' ') && (e.preventDefault(), go()));
      });
    }
  }

  // <sd-calendar value="2026-11-18" min="" max="">: month grid, Arrow keys move by day/week. Fires `change` with { value: 'YYYY-MM-DD' }.
  const iso = x => `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, '0')}-${String(x.getDate()).padStart(2, '0')}`;
  const parse = v => { const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v || ''); return m ? new Date(+m[1], m[2] - 1, +m[3]) : null; };
  class Calendar extends HTMLElement {
    static formAssociated = true;
    constructor() { super(); this._in = this.attachInternals?.(); }
    get value() { return this.getAttribute('value') || ''; }
    set value(v) { v ? this.setAttribute('value', v) : this.removeAttribute('value'); this.view = parse(v) || this.view; this.render(); }
    connectedCallback() {
      if (!once(this)) return;
      this.view = parse(this.value) || new Date();
      this.view.setDate(1);
      on(this, 'click', e => {
        const b = e.target.closest('button');
        if (!b) return;
        if (b.dataset.nav) { this.view = new Date(this.view.getFullYear(), this.view.getMonth() + +b.dataset.nav, 1); this.render(); this.querySelector('[tabindex="0"]')?.focus(); }
        else if (b.dataset.date) this.pick(b.dataset.date);
      });
      on(this, 'keydown', e => {
        const k = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 }[e.key], cur = parse(d.activeElement?.dataset?.date);
        if (!k || !cur) return;
        e.preventDefault(); cur.setDate(cur.getDate() + k);
        this.view = new Date(cur.getFullYear(), cur.getMonth(), 1); this.render(); this.querySelector(`[data-date="${iso(cur)}"]`)?.focus();
      });
      this.render();
    }
    pick(v) { this.value = v; this._in?.setFormValue(v); emit(this, 'change', { value: v }); this.querySelector(`[data-date="${v}"]`)?.focus(); }
    render() {
      if (!this.view) return;
      const y = this.view.getFullYear(), m = this.view.getMonth(), sel = this.value, today = iso(new Date());
      const min = this.getAttribute('min'), max = this.getAttribute('max');
      const start = new Date(y, m, 1 - ((new Date(y, m, 1).getDay() + 6) % 7)); // weeks start on Monday
      const focus = sel && parse(sel).getMonth() == m && parse(sel).getFullYear() == y ? sel : iso(new Date(y, m, 1));
      const cells = Array.from({ length: 42 }, (_, i) => {
        const x = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i), v = iso(x);
        const b = el('button', { type: 'button', textContent: x.getDate(), tabIndex: v == focus ? 0 : -1, disabled: (min && v < min) || (max && v > max) });
        b.dataset.date = v; b.setAttribute('aria-selected', v == sel);
        b.setAttribute('aria-label', x.toLocaleDateString(undefined, { dateStyle: 'full' }));
        if (x.getMonth() != m) b.dataset.out = ''; if (v == today) b.dataset.today = '';
        return b;
      });
      const nav = n => { const b = el('button', { type: 'button', textContent: n < 0 ? '‹' : '›' }); b.dataset.nav = n; b.setAttribute('aria-label', n < 0 ? 'Previous month' : 'Next month'); return b; };
      const head = el('header'), title = el('strong', { textContent: this.view.toLocaleDateString(undefined, { month: 'long', year: 'numeric' }) });
      title.setAttribute('aria-live', 'polite'); head.append(nav(-1), title, nav(1));
      const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(t => el('span', { textContent: t }));
      const grid = el('div'); grid.append(...days, ...cells);
      this.replaceChildren(head, grid);
    }
  }

  const def = (n, c) => customElements.get(n) || customElements.define(n, c);
  def('sd-tabs', Tabs); def('sd-dropdown', Dropdown); def('sd-tag-input', TagInput); def('sd-upload', Upload); def('sd-table', SortTable); def('sd-calendar', Calendar);
  window.Sidedish = { toast, theme };
})();
