/* app.js — calendar channel renderer: invite emails in Gmail for iOS, events in Google Calendar for iOS. */
(function () {
  const trunc = (s, n) => (s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s);
  window.RENDER = {
    screen(cell) {
      const S = window.PREVIEW_STATE;
      if (cell.type === "event") return window.GCAL.eventScreen(cell);
      if (cell.type === "threeday") return window.GCAL.threeDayScreen(cell);
      return S.view === "inbox" ? window.GMAIL.inbox(cell) : window.GMAIL.opened(cell);
    },
    screenClass(cell) { return cell.type === "event" || cell.type === "threeday" ? "gcal" : "gmail"; },
    text(cell) {
      if (cell.type === "threeday") return "";
      if (cell.type === "event") return `Title: ${cell.title}\nWhen: ${cell.when}\n${cell.location ? cell.location + "\n" : ""}\n${cell.description || ""}`;
      const subj = cell.subject ? `Subject: ${cell.subject}\n` : "";
      const inv = cell.invite ? `Calendar invite: ${cell.invite.title} · ${cell.invite.when}\n` : "";
      return `${subj}${inv}\n${cell.body}`;
    },
    meta(cell) {
      const core = window.CORE;
      const title = core.sample(cell.title || (cell.invite && cell.invite.title) || "");
      if (cell.type === "threeday") return `title ${title.length} chars · @24 “${trunc(title, 24)}” · @32 “${trunc(title, 32)}” · Day ${cell.day}`;
      if (cell.type === "event") {
        const d = core.sample(cell.description || "");
        return `title ${title.length} chars · @24 “${trunc(title, 24)}” · description ${core.words(d)} words · ${d.length} chars · Day ${cell.day}`;
      }
      const body = core.sample(cell.body || "");
      const subj = core.sample(cell.subject || "");
      return `${core.words(body)} words · ${body.length} chars · subject ${subj.length} chars · Day ${cell.day} · ${core.ampm(cell.time || "10:00 am")}`;
    }
  };
})();
