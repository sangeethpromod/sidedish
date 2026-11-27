// The /example dashboard: sample data rendered with Sidedish components only (layout is plain Tailwind).
const bars = (label: string, data: [string, number][], on: string, unit = 'h') => {
  const max = Math.max(...data.map(([, v]) => v));
  return `<div class="bars" role="img" aria-label="${label}: ${data.map(([d, v]) => `${d} ${v}${unit}`).join(', ')}">${data
    .map(([d, v]) => `<span style="--v:${Math.round((v / max) * 100)}" data-label="${d}" data-tooltip="${v}${unit}"${d === on ? ' data-on' : ''}></span>`).join('')}</div>`;
};

// 26 weeks of fixed sample activity, quiet at weekends, so server and client render the same.
const heat = `<div class="heatmap" role="img" aria-label="Tasks shipped per day over 26 weeks, quiet at weekends">${Array.from({ length: 182 }, (_, i) =>
  `<span data-level="${i % 7 > 4 ? (i % 3 === 0 ? 1 : 0) : 1 + ((i * 11 + (i >> 2)) % 4)}"></span>`).join('')}</div>`;

const stats = (rows: [string, string, string, string, string?][]) => `<div class="grid grid-cols-2 gap-3 lg:grid-cols-4">${rows.map(([label, value, unit, change, tone]) =>
  `<div class="card stat"><small>${label}</small><strong>${value}<small>${unit}</small></strong><span class="badge justify-self-start" data-tone="${tone ?? 'good'}">${change}</span></div>`).join('')}</div>`;

const TEAM: [string, string, string, number, number, [string, string]][] = [
  ['Aylin Kaya', 'AK', 'Design', 412, 86, ['warn', 'Near capacity']],
  ['Marcus Reed', 'MR', 'Engineering', 386, 92, ['bad', 'Overbooked']],
  ['Priya Nair', 'PN', 'Engineering', 301, 74, ['good', 'On track']],
  ['Jonas Weber', 'JW', 'Product', 244, 58, ['neutral', 'Has room']],
  ['Sofia Marino', 'SM', 'Design', 173, 97, ['bad', 'Overbooked']],
];

const dashboard = () => `
<div class="layout">
  <aside class="sidebar" id="ex-side">
    <div class="flex items-center gap-3 px-2 pb-4">
      <span class="avatar" data-tone="ink">NW</span>
      <div><strong class="block text-sm">Northwind</strong><small>Studio workspace</small></div>
    </div>
    <nav aria-label="Dashboard">
      <a href="#overview" aria-current="page" data-toggle="#ex-side">Overview</a>
      <a href="#team" data-toggle="#ex-side">Team <span class="badge" data-tone="neutral">${TEAM.length}</span></a>
      <a href="#schedule" data-toggle="#ex-side">Schedule</a>
      <a href="#settings" data-toggle="#ex-side">Settings</a>
    </nav>
    <div class="card stat mt-2">
      <small>Storage, 36 of 50 GB used</small>
      <progress value="72" max="100" data-tone="ink" aria-label="Storage used"></progress>
    </div>
  </aside>

  <main class="min-w-0 flex flex-col gap-6 p-4 sm:p-8">
    <div class="flex flex-wrap items-center gap-2">
      <button class="min-[861px]:!hidden" data-variant="ghost" data-size="sm" data-toggle="#ex-side">Menu</button>
      <nav class="breadcrumb mr-auto" aria-label="Breadcrumb"><ol><li>Workspace</li><li aria-current="page">Analytics</li></ol></nav>
      <sd-dropdown align="end">
        <button data-variant="ghost" data-size="sm">Export ▾</button>
        <menu><li><button>CSV file</button></li><li><button>PDF report</button></li></menu>
      </sd-dropdown>
      <button data-size="sm" data-open="invite">Invite member</button>
    </div>

    <section id="overview" class="flex flex-col gap-4">
      <div><h1 class="m-0">Analytics</h1><p class="m-0">Revenue, workload and delivery across 14 projects.</p></div>
      <div class="alert" data-tone="warn"><strong>2 invoices are overdue</strong>Atlas Mobile and Billing Revamp, $12,400 in total.</div>
      <sd-tabs>
        <nav aria-label="Period"><button>Quarter</button><button>Month</button><button>Week</button></nav>
        <section>${stats([['Revenue', '$248,610', '', '↗ 12.4%'], ['Billable hours', '3,412', 'h', '↗ 6.1%'], ['Utilization', '82', '%', '↗ 2.0%'], ['Open invoices', '9', '', '2 overdue', 'bad']])}</section>
        <section>${stats([['Revenue', '$86,200', '', '↗ 4.8%'], ['Billable hours', '1,164', 'h', '↗ 3.2%'], ['Utilization', '79', '%', '↘ 1.1%', 'warn'], ['Open invoices', '6', '', '1 overdue', 'bad']])}</section>
        <section>${stats([['Revenue', '$19,940', '', '↗ 1.9%'], ['Billable hours', '278', 'h', '↗ 5.4%'], ['Utilization', '84', '%', '↗ 3.6%'], ['Open invoices', '2', '', 'None overdue']])}</section>
      </sd-tabs>
      <div class="grid gap-4 grid-cols-1 xl:grid-cols-2">
        <article class="card">
          <header>Billable hours this week <span class="badge">Friday peak</span></header>
          ${bars('Billable hours this week', [['Mon', 52], ['Tue', 56], ['Wed', 54], ['Thu', 55], ['Fri', 61], ['Sat', 8], ['Sun', 4]], 'Fri')}
        </article>
        <article class="card">
          <header>Tasks shipped <button data-variant="ghost" data-size="sm" data-open="shipped">View details</button></header>
          <div class="stat mb-3"><strong>1,516 <small>in 26 weeks</small></strong></div>
          <div class="overflow-x-auto">${heat}</div>
        </article>
      </div>
    </section>

    <section id="team">
      <h2>Team</h2>
      <sd-table>
        <div class="table-wrap"><table>
          <thead><tr><th>Member</th><th>Team</th><th class="num">Shipped</th><th>Utilization</th><th>Status</th></tr></thead>
          <tbody>${TEAM.map(([name, initials, team, shipped, use, [tone, status]]) => `
            <tr><td data-sort="${name}"><span class="flex items-center gap-2 whitespace-nowrap"><span class="avatar" data-size="sm" data-tone="neutral" aria-hidden="true">${initials}</span>${name}</span></td><td>${team}</td><td class="num">${shipped}</td>
            <td data-sort="${use}"><span class="flex items-center gap-2"><meter class="!w-24" min="0" max="100" low="80" high="90" optimum="0" value="${use}" aria-label="${name} utilization"></meter>${use}%</span></td>
            <td><span class="badge" data-tone="${tone}">${status}</span></td></tr>`).join('')}
          </tbody>
        </table></div>
      </sd-table>
    </section>

    <section id="schedule" class="grid gap-4 grid-cols-1 md:grid-cols-[auto_minmax(0,1fr)] items-start">
      <sd-calendar value="2026-11-27"></sd-calendar>
      <article class="card">
        <header>Project progress</header>
        <div class="flex flex-col gap-4">
          <label>Billing Revamp, due 4 Dec <progress value="86" max="100"></progress></label>
          <label>Atlas Mobile App, due 18 Dec <progress value="54" max="100"></progress></label>
          <label>Analytics Hub, due 8 Jan <progress value="23" max="100"></progress></label>
        </div>
      </article>
    </section>

    <section id="settings">
      <h2>Settings</h2>
      <div class="grid gap-4 grid-cols-1 md:grid-cols-2">
        <article class="card">
          <header>Notifications</header>
          <div class="flex flex-col gap-3">
            <label class="!flex justify-between">Weekly summary <input type="checkbox" role="switch" checked></label>
            <label class="!flex justify-between">Overdue invoice alerts <input type="checkbox" role="switch" checked></label>
            <label class="!flex justify-between">New member joins <input type="checkbox" role="switch"></label>
          </div>
          <footer><button data-size="sm" onclick="Sidedish.toast('Notifications saved', {tone:'good'})">Save notifications</button></footer>
        </article>
        <article class="card">
          <header>Import timesheets</header>
          <sd-upload label="Drop timesheets here" hint="CSV or XLSX" accept=".csv,.xlsx" multiple></sd-upload>
        </article>
      </div>
    </section>
  </main>
</div>

<dialog id="invite" aria-labelledby="invite-title">
  <header><h2 id="invite-title">Invite member</h2><button data-variant="quiet" data-size="icon" data-close aria-label="Close">✕</button></header>
  <form method="dialog" class="flex flex-col gap-3">
    <label>Email <input type="email" placeholder="name@company.com"></label>
    <label>Role <select><option>Member</option><option>Admin</option><option>Viewer</option></select></label>
    <label>Projects <sd-tag-input value="Billing Revamp" placeholder="Add project…" aria-label="Add project"></sd-tag-input></label>
  </form>
  <footer><button data-variant="ghost" data-close>Cancel</button><button data-close onclick="Sidedish.toast('Sample dashboard: no email was sent')">Send invite</button></footer>
</dialog>

<dialog id="shipped" data-side="right" aria-labelledby="shipped-title">
  <header><h2 id="shipped-title">Tasks shipped</h2><button data-variant="quiet" data-size="icon" data-close aria-label="Close">✕</button></header>
  <div class="flex flex-col gap-4">
    <div class="grid grid-cols-3 gap-3">
      <div class="stat" data-tone="neutral"><small>26-week total</small><strong class="!text-accent">1,516</strong></div>
      <div class="stat"><small>Busiest day</small><strong>34</strong></div>
      <div class="stat"><small>Longest streak</small><strong>16<small>days</small></strong></div>
    </div>
    <article class="card">
      <header>Average per weekday</header>
      ${bars('Average tasks per weekday', [['Mon', 11], ['Tue', 14], ['Wed', 13], ['Thu', 12], ['Fri', 10], ['Sat', 2], ['Sun', 1]], 'Tue', ' tasks')}
    </article>
    <article class="card">
      <header>By project</header>
      <div class="flex flex-col gap-3">
        <label>Billing Revamp, 612 <progress value="612" max="1516"></progress></label>
        <label>Atlas Mobile App, 498 <progress value="498" max="1516"></progress></label>
        <label>Analytics Hub, 406 <progress value="406" max="1516" data-tone="ink"></progress></label>
      </div>
    </article>
  </div>
</dialog>`;

export { dashboard };
