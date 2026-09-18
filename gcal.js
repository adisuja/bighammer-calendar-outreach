/* gcal.js — Google Calendar for iOS (2026) screens: event detail (with RSVP bar) and the schedule (agenda) view.
   Exposes window.GCAL. Cells: { type:"gcal_event"|"gcal_schedule", title, when, whenLine, description, organizer, guests:[...], meet, location } */
(function () {
  const C = window.CORE, esc = C.esc;
  const D = new Proxy({}, { get: (_, k) => C.D[k] });
  const I = {
    x: '<svg width="24" height="24" viewBox="0 0 24 24" fill="#444746"><path d="M19 6.4L17.6 5 12 10.6 6.4 5 5 6.4l5.6 5.6L5 17.6 6.4 19l5.6-5.6 5.6 5.6 1.4-1.4-5.6-5.6z"/></svg>',
    pencil: '<svg width="22" height="22" viewBox="0 0 24 24" fill="#444746"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>',
    more: '<svg width="24" height="24" viewBox="0 0 24 24" fill="#444746"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>',
    bell: '<svg width="22" height="22" viewBox="0 0 24 24" fill="#444746"><path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z"/></svg>',
    people: '<svg width="22" height="22" viewBox="0 0 24 24" fill="#444746"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>',
    notes: '<svg width="22" height="22" viewBox="0 0 24 24" fill="#444746"><path d="M3 18h12v-2H3v2zM3 6v2h18V6H3zm0 7h18v-2H3v2z"/></svg>',
    cal: '<svg width="22" height="22" viewBox="0 0 24 24" fill="#444746"><path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/></svg>',
    mail: '<svg width="20" height="20" viewBox="0 0 24 24" fill="#444746"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>',
    chat: '<svg width="20" height="20" viewBox="0 0 24 24" fill="#444746"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/></svg>',
    chevUp: '<svg width="20" height="20" viewBox="0 0 24 24" fill="#444746"><path d="M7.4 15.4L12 10.8l4.6 4.6L18 14l-6-6-6 6z"/></svg>',
    menu: '<svg width="24" height="24" viewBox="0 0 24 24" fill="#444746"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>',
    search: '<svg width="24" height="24" viewBox="0 0 24 24" fill="#444746"><path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>',
    day: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#444746" stroke-width="2"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18"/><text x="12" y="18" text-anchor="middle" font-size="9" fill="#444746" stroke="none" font-weight="700">15</text></svg>',
    meet: '<svg width="20" height="20" viewBox="0 0 24 24"><path fill="#00832d" d="M13.6 12l2.3 2.7 3.1 2 .6-4.7-.6-4.6-3.2 1.7z"/><path fill="#0066da" d="M2 15.3v4c0 .9.7 1.7 1.7 1.7h4l.8-3-.8-2.7-2.7-.8z"/><path fill="#e94235" d="M7.7 3L2 8.7l2.9.8 2.8-.8.8-2.7z"/><path fill="#2684fc" d="M7.7 8.7H2v6.6h5.7z"/><path fill="#00ac47" d="M21.1 6.1l-2.1 1.9v8.4l2.1 1.8c.3.2.9 0 .9-.5V6.5c0-.4-.6-.7-.9-.4zM13.6 12v3.3H7.7V21h9.6c.9 0 1.7-.7 1.7-1.7v-2.6z"/><path fill="#ffba00" d="M17.3 3H7.7v5.7h5.9V12l5.4-4.5V4.7c0-.9-.8-1.7-1.7-1.7z"/></svg>',
    share: '<svg width="22" height="22" viewBox="0 0 24 24" fill="#444746"><path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92-1.31-2.92-2.92-2.92z"/></svg>'
  };
  const av = (p, size) => `<span class="av" style="width:${size}px;height:${size}px;background:${p.color};font-size:${Math.round(size * .42)}px">${esc(p.initials)}</span>`;

  function eventScreen(cell) {
    const title = C.fill(cell.title, C.state.mode);
    const guests = cell.guests || [];
    const desc = cell.description ? C.rich(cell.description, "gc-link").replace(/\n/g, "<br>") : "";
    return `${C.statusBar()}
      <div class="gc-top"><span class="gc-ic">${I.x}</span><span class="gc-sp"></span><span class="gc-ic">${I.pencil}</span><span class="gc-ic">${I.more}</span></div>
      <div class="scroll gc-scroll">
        <div class="gc-title-row"><span class="gc-color" style="background:${cell.color || "#039be5"}"></span><div><div class="gc-title">${esc(title)}</div><div class="gc-when">${esc(cell.when)}</div>${cell.whenLine ? `<div class="gc-when2">${esc(cell.whenLine)}</div>` : ""}</div></div>
        ${cell.meet ? `<div class="gc-row"><span class="gc-ic">${I.meet}</span><div><div class="gc-link-line">Join with Google Meet</div><div class="gc-sub">${esc(cell.meet)}</div></div><span class="gc-ic tail">${I.share}</span></div>` : ""}
        ${cell.location ? `<div class="gc-row"><span class="gc-ic">${I.cal}</span><div class="gc-line">${C.rich(cell.location, "gc-link")}</div></div>` : ""}
        <div class="gc-row"><span class="gc-ic">${I.bell}</span><div class="gc-line">${esc(cell.reminder || "10 minutes before")}</div></div>
        <div class="gc-row"><span class="gc-ic">${I.people}</span><div style="flex:1"><div class="gc-line">${guests.length} guests</div><div class="gc-sub">${esc(cell.guestSummary || "")}</div>
          ${guests.map(g => `<div class="gc-guest">${av(g, 32)}<div><div class="gc-gname">${esc(g.name)}</div>${g.role ? `<div class="gc-sub">${esc(g.role)}</div>` : ""}</div></div>`).join("")}</div><span class="gc-ic tail">${I.chat}</span><span class="gc-ic tail">${I.mail}</span></div>
        ${desc ? `<div class="gc-row"><span class="gc-ic">${I.notes}</span><div class="gc-desc">${desc}</div></div>` : ""}
        <div class="gc-row"><span class="gc-ic">${I.cal}</span><div><div class="gc-line">${esc(D.people.me.name)}</div><div class="gc-sub">${esc(D.people.me.email)}</div></div></div>
        <div style="height:16px"></div>
      </div>
      <div class="gc-rsvp"><span class="gc-rsvp-lbl">Going?</span><b class="gc-pill on">Yes</b><b class="gc-pill">No</b><b class="gc-pill">Maybe</b><span class="gc-ic">${I.chevUp}</span></div>
      ${C.home()}`;
  }

  function scheduleScreen(cell) {
    const title = C.fill(cell.title, C.state.mode);
    const rows = (cell.agenda || []).map(a => {
      if (a.event) return `<div class="gc-day"><div class="gc-daycol"><div class="gc-dow">${esc(a.dow)}</div><div class="gc-dnum${a.today ? " today" : ""}">${esc(a.num)}</div></div><div class="gc-events">${(a.items || []).map(it => `<div class="gc-chip" style="background:${it.color}"><div class="gc-chip-t">${esc(it.title)}</div><div class="gc-chip-s">${esc(it.time)}</div></div>`).join("")}</div></div>`;
      return "";
    }).join("");
    return `${C.statusBar()}
      <div class="gc-bar"><span class="gc-ic">${I.menu}</span><span class="gc-month">${esc(cell.month || "October")} <svg width="18" height="18" viewBox="0 0 24 24" fill="#1f1f1f"><path d="M7 10l5 5 5-5z"/></svg></span><span class="gc-sp"></span><span class="gc-ic">${I.search}</span><span class="gc-ic">${I.day}</span>${av(D.people.me, 32)}</div>
      <div class="scroll gc-sched">${rows}</div>
      <div class="gc-fab">+</div>
      ${C.home()}`;
  }

  /* 3-day view: the surface where titles truncate hardest (the doc's 20 to 26 visible characters on mobile). */
  function threeDayScreen(cell) {
    const title = C.fill(cell.title, C.state.mode);
    const days = cell.days || [];
    const hours = ["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM"];
    const H = 56;
    const cols = days.map(d => `<div class="gc3-col"><div class="gc3-head"><div class="gc-dow">${esc(d.dow)}</div><div class="gc-dnum${d.today ? " today" : ""}">${esc(d.num)}</div></div><div class="gc3-grid" style="height:${hours.length * H}px">${(d.items || []).map(it => `<div class="gc3-ev" style="top:${(it.start - 9) * H + 1}px;height:${it.dur * H - 2}px;background:${it.color}"><div class="gc3-t">${esc(it.title)}</div><div class="gc3-s">${esc(it.time)}</div></div>`).join("")}${hours.map((h, i) => `<div class="gc3-line" style="top:${i * H}px"></div>`).join("")}</div></div>`).join("");
    return `${C.statusBar()}
      <div class="gc-bar"><span class="gc-ic">${I.menu}</span><span class="gc-month">${esc(cell.month || "October")} <svg width="18" height="18" viewBox="0 0 24 24" fill="#1f1f1f"><path d="M7 10l5 5 5-5z"/></svg></span><span class="gc-sp"></span><span class="gc-ic">${I.search}</span><span class="gc-ic">${I.day}</span>${av(D.people.me, 32)}</div>
      <div class="scroll gc3"><div class="gc3-wrap"><div class="gc3-gutter"><div class="gc3-head"></div>${hours.map(h => `<div class="gc3-hour" style="height:${H}px">${h}</div>`).join("")}</div>${cols}</div></div>
      <div class="gc-fab">+</div>
      ${C.home()}`;
  }

  window.GCAL = { eventScreen, scheduleScreen, threeDayScreen, I, av };
})();
