/* BigHammer.ai COLD CALENDAR OUTREACH — copy + sample merge data.
   Source of truth: Google Doc "UPDATED Calendar Outreach" tab (Variations 1 to 3, the title analysis, and the
   "Cold Calendar Outreach — Playbook" with invite bodies C1 to C3 and the paired email), read 19 Sep 2026.
   Edit copy here. Tokens use {{token}} syntax. SEP renders where the source copy had an em dash.
   Structure: campaigns → columns (steps, left → right in the recipient's timeline) → rows (complete paths) → cells. */
(function () {
  const SEP = " - ";
  const T = (s) => String(s).replace(/\s*—\s*/g, SEP);

  const WEBINAR = "https://webinar.bighammerai.com/";

  const people = {
    sender: { name: "Srinath Reddy", email: "srinath@events.bighammer.ai", initials: "S", color: "#5b3fa0" },
    gcal: { name: "Srinath Reddy", email: "srinath@events.bighammer.ai", initials: "S", color: "#5b3fa0" },
    me: { name: "Sarah Mitchell", email: "sarah.mitchell@meridianhealth.com", initials: "S", color: "#0b6e4f" }
  };
  const inboxFiller = [
    { p: { initials: "J", color: "#8a5a2b" }, name: "James Carter", time: "9:12 AM", subject: "Re: Q4 platform roadmap review", snippet: "Thanks Sarah, I've moved the review to Thursday and added the Unity Catalog item." },
    { p: { initials: "E", color: "#3d5a80" }, name: "Emily Watson", time: "8:40 AM", subject: "dbt Cloud renewal quote", snippet: "Attaching the renewal quote we discussed. The seat count went up slightly because" },
    { p: { initials: "D", color: "#b23a48" }, name: "Databricks", time: "Yesterday", subject: "Your workspace usage summary", snippet: "Here is your weekly usage summary for the meridian-prod workspace." }
  ];

  const tokens = {
    first_name: "Sarah",
    company: "Meridian Health",
    webinar_date: "Thursday 15 October, 12pm ET",
    webinar_url: WEBINAR,
    join_url: WEBINAR,    // no dial-in / join link exists yet; falls back to the registration page so the link works
    replay_url: WEBINAR   // no recording page exists yet
  };

  const previews = {};
  const linkChecks = [
    { url: WEBINAR, status: "warn", label: "200 · stale date in HTML", note: "Registration page loads, but the served HTML still says \"June 18, 2026 · 11:00 AM ET\"; only the in-browser render shows 15 Oct, 12:00 PM ET. Calendar clients that unfurl the link show the June date." },
    { url: "{{join_url}}", status: "pending", label: "not live yet", note: "The playbook asks for \"a dial-in link that works without an app install\". None exists yet; the sample falls back to the registration page." },
    { url: "{{replay_url}}", status: "pending", label: "not live yet", note: "The Day-4 follow-up offers the recording instead. No recording page exists yet." }
  ];
  const linkCheckedAt = "19 Sep 2026";

  const kinds = {
    invite_email: { label: "Calendar invite · email", color: "#0b57d0" },
    event: { label: "Calendar event", color: "#039be5" },
    schedule: { label: "Calendar · 3-day view", color: "#5b3fa0" },
    followup: { label: "Follow-up email", color: "#01754f" },
    registrant: { label: "Registrant invite", color: "#b8860b" }
  };

  /* ---------- event timing (the masterclass itself; a date is unavoidable inside a calendar event) ---------- */
  const WHEN = "Thursday, 15 October · 12:00 – 12:45 PM";
  const WHEN_TZ = "Eastern Time · 45 minutes";
  const GMAIL_WHEN = "Thu 15 Oct 2026 · 12:00 – 12:45 PM (EDT)";
  const INV_SUBJ = (title) => `Invitation: ${title} @ Thu 15 Oct 2026 12pm - 12:45pm (EDT) (${people.me.email})`;

  /* ============================== Cold invite bodies (Playbook Part 6) ============================== */
  const C1_TITLE = "Databricks cost teardown (45 min)";
  const C1 = T(`45 minutes on Databricks cost structure. No product pitch.

Six patterns that inflate a Databricks bill, the order they have to be fixed in, and one healthcare environment walked from discovery to outcome.

Run by Srinath Reddy, who led data platform teams at enterprise scale and has spent the last few years cutting these bills for a living.

Join link: {{join_url}}

Not useful? Decline and you won't hear from us again.`);

  const C2_TITLE = "Idle clusters, Photon, failed runs";
  const C2 = T(`If you can't say which team, project or job drove last quarter's compute increase, this is the session for that.

45 minutes. The six structural patterns behind runaway Databricks spend, how to attribute spend properly using billing system tables, and the governance that stops it recurring.

Run by Srinath Reddy, BigHammer.ai. No product pitch.

Join link: {{join_url}}

Decline and we won't send another.`);

  const C3_TITLE = "Databricks costs w/ Srinath Reddy";
  const C3 = T(`Six patterns inflate most Databricks bills. This is 45 minutes on finding them and fixing them, in the order that works.

Run by Srinath Reddy. No pitch, no slides about us.

Join link: {{join_url}}

Decline and that's the end of it.`);

  /* The paired email that carries the .ics (Playbook Part 7, 85 words) */
  const PAIRED_SUBJ = "45 min on Databricks cost structure, {{webinar_date}}";
  const PAIRED = T(`{{first_name}},

Sending a calendar hold rather than a long email.

On {{webinar_date}} I'm running 45 minutes on why Databricks bills climb: idle clusters at 1-2% CPU, Photon applied by default, failed runs in lower environments, spin-up overhead on micro-batch jobs. Then the order those get fixed in, and a healthcare environment we walked end to end.

No product pitch in the first 40 minutes. The invite is attached, accept it or bin it.

Srinath Reddy
Founder, BigHammer.ai`);

  /* Day-4 follow-up. The playbook specifies it ("one follow-up only, four days later, two sentences, referencing the
     invite and offering the recording instead. Then stop.") but gives no copy, so this draft was written to that spec. */
  const FU_SUBJ = "Re: 45 min on Databricks cost structure, {{webinar_date}}";
  const FU = T(`{{first_name}}, the calendar hold I sent last week is still open if the slot works for you. If it doesn't, reply "recording" and I'll send the session recording instead, no need to attend live.

Srinath`);

  /* ============================== Registrant invite variations (Updated Templates) ============================== */
  const ABOUT = "About Us: BigHammer.ai is the autonomous AI data engineering platform built by data engineers, for data engineers. Its Migrate agent moves workloads off costly premium platforms like Databricks and Snowflake to the right-sized cloud or on-prem compute, cutting costs while preserving performance for analytics and AI. Up to 70% of enterprise workloads run on premium platforms they don't need; BigHammer finds them and fixes it. No vendor lock-in, no cloud lock-in, no LLM lock-in.";

  const V1_TITLE = "Idle clusters, failed runs";
  const V1 = T(`Save your seat: {{webinar_url}}

Databricks was supposed to make data engineering faster. In 2026, for a lot of teams, it made it more expensive instead.

Premium compute on workloads that never needed it. Idle clusters overnight. Jobs right-sized two years ago and never revisited. None of it looks alarming on its own, it just adds up until finance asks why the Databricks line keeps climbing.

This session is about one thing: reducing your Databricks costs by up to 75%, without a painful rip-and-replace or a hit to headcount.

Built for Data Engineering Managers, Heads of Data, VPs of Data Platform, CTOs, CIOs and other senior technical leaders who own the Databricks bill.

In this session, we'll cover how to:
• Spot where Databricks spend leaks, premium compute on workloads that don't need it, idle and underutilised clusters
• Use AI-driven workload routing to send every job to the compute it genuinely requires, based on cost, performance and SLA
• Migrate workloads with zero downtime and full data integrity, no manual rewrites
• Cut Databricks TCO by 40-73% and engineering effort by up to 75%
• Make the case to a cost-conscious CFO with real numbers, not estimates

You'll also see how one client cut Databricks spend by 84% in 18 months, and how a healthcare team stood up a production-ready platform in four months with 75% less engineering effort.

We'll close with a live Q&A for your specific questions.

Save your seat now: {{webinar_url}}

Notifications (select one): Yes or Maybe. You'll receive event details and reminders. No – No further updates will be sent.

${ABOUT} {{webinar_url}}`);

  const V2_TITLE = "Databricks w/ Srinath Reddy";
  const V2 = T(`Save your seat: {{webinar_url}}

Nobody on the data team gets credit for a flat Databricks bill. But everybody feels it when the number goes the other way.

By 2026, most teams treat Databricks spend like weather, something that just happens to them each quarter. It doesn't have to be. The cost is high because workloads are running on infrastructure that was never right for them, not because the work itself is expensive.

This session shows how teams are cutting Databricks costs by up to 75%, and how to walk into your next budget review with a plan instead of an apology.

Designed for Data Engineering Managers, Heads of Data, VPs of Data Platform, CTOs, CIOs and senior technical leaders done treating Databricks as a fixed cost.

In this session, we'll cover how to:
• Understand why Databricks costs keep climbing even when your workloads haven't changed much
• Consolidate and route workloads to the right compute automatically, so you stop paying premium rates for standard jobs
• Migrate off oversized infrastructure with zero disruption and no vendor lock-in
• Cut Databricks TCO by 40-73% while reducing engineering effort by up to 75%
• Turn a cost problem into the case that makes you the leader who fixed it

You'll hear directly from Srinath Reddy, who spent 20+ years running data platforms for enterprises generating billions in revenue and cut his own team's Databricks spend by 70% before building BigHammer.ai to solve this at the source.

We'll close with a live Q&A for your specific questions.

Save your seat now: {{webinar_url}}

Notifications (select one): Yes or Maybe. You'll receive event details and reminders. No – No further updates will be sent.

${ABOUT}`);

  const V3_TITLE = "Databricks teardown";
  const V3 = T(`Save your seat: {{webinar_url}}

If Databricks is one of the bigger numbers you defend every quarter, this session is worth 45 minutes.

Most teams assume a high Databricks bill is just the cost of the work. It usually isn't, it's premium compute on jobs that never needed it, idle clusters, and workloads never revisited since they were right-sized.

This session walks through cutting Databricks costs by up to 75%, without a platform rebuild or touching headcount. Built for Data Engineering Managers, Heads of Data, VPs of Data Platform, CTOs, CIOs and senior technical leaders who own the Databricks line item.

In this session, we'll cover how to:
• See where Databricks spend leaks, across premium, idle and underutilised compute
• Route every workload to the right compute automatically, based on cost, performance and SLA
• Migrate with zero downtime and full data integrity, no manual rewrites
• Cut Databricks TCO by up to 40-73% and engineering effort by up to 75%
• Build the business case to bring the number down, backed by real results

You'll also see how one client cut Databricks spend by up to 84% in 18 months.

Save your seat now: {{webinar_url}}

Notifications: Yes or Maybe. You'll receive event details and reminders. No – No further updates will be sent.

${ABOUT}`);

  const N2_TITLE = "6 leaks in your Databricks bill";   // primary recommendation from the title analysis (weighted 4.80 / 5)

  /* ============================== cell builders ============================== */
  let n = 0;
  const id = () => "c" + (++n);
  const guests = [
    { name: "Srinath Reddy", role: "Organiser", initials: "S", color: "#5b3fa0" },
    { name: "Sarah Mitchell", initials: "S", color: "#0b6e4f" }
  ];
  const filler = (dowWed, dowThu, dowFri, ours) => [
    { dow: "WED", num: dowWed, items: [{ title: "Platform standup", time: "9:30 – 9:45 AM", start: 9.5, dur: .25, color: "#7986cb" }, { title: "Vendor review: dbt Cloud", time: "2 – 3 PM", start: 14, dur: 1, color: "#33b679" }] },
    { dow: "THU", num: dowThu, today: true, items: [ours, { title: "1:1 with James Carter", time: "2 – 2:30 PM", start: 14, dur: .5, color: "#7986cb" }] },
    { dow: "FRI", num: dowFri, items: [{ title: "Sprint review", time: "11 AM – 12 PM", start: 11, dur: 1, color: "#33b679" }] }
  ];
  const ours = (title) => ({ title, time: "12 – 12:45 PM", start: 12, dur: .75, color: "#039be5" });

  const inviteEmail = (title, description, opts) => Object.assign({
    id: id(), kinds: ["invite_email"], from: "sender", time: "10:00 am", day: 0,
    subject: PAIRED_SUBJ, body: PAIRED,
    invite: { title, when: GMAIL_WHEN, icsName: "invite.ics" },
    attachments: ["invite.ics"]
  }, opts || {});
  const eventCell = (title, description, opts) => Object.assign({
    id: id(), kinds: ["event"], type: "event", day: 0, time: "10:00 am",
    title, when: WHEN, whenLine: WHEN_TZ, location: "Join link: {{join_url}}", reminder: "10 minutes before",
    guests, guestSummary: "1 yes, 1 awaiting", description
  }, opts || {});
  const threeDay = (title, opts) => Object.assign({
    id: id(), kinds: ["schedule"], type: "threeday", day: 10, time: "10:00 am", title,
    days: filler("14", "15", "16", ours(title)), subtitle: "Webinar day · 3-day view"
  }, opts || {});
  const followup = () => ({ id: id(), kinds: ["followup"], from: "sender", time: "10:00 am", day: 4, subject: FU_SUBJ, threadSubject: PAIRED_SUBJ, body: FU,
    footnote: "The playbook specifies this follow-up (two sentences, four days later, offer the recording) but gives no copy. This draft was written to that spec and needs the owner's approval." });

  const coldRow = (rid, label, title, body) => ({ id: rid, label, cells: [
    inviteEmail(title, body), eventCell(title, body), followup(), threeDay(title)
  ] });

  const regEmail = (title, body) => ({
    id: id(), kinds: ["registrant", "invite_email"], from: "gcal", time: "10:00 am", day: 0,
    subject: INV_SUBJ(title), body, label: "Inbox",
    invite: { title, when: GMAIL_WHEN, icsName: "invite.ics" }
  });
  const regRow = (rid, label, title, body) => ({ id: rid, label, cells: [regEmail(title, body), eventCell(title, body, { kinds: ["registrant", "event"] }), threeDay(title, { kinds: ["registrant", "schedule"] })] });

  const campaigns = [
    {
      id: "cold", title: "Cold calendar invite (people who never registered)", kinds: ["invite_email", "event", "followup", "schedule"],
      subtitle: "Playbook Path 2: an .ics attached to a real email from a named mailbox on a dedicated subdomain (events.bighammer.ai), sent 8 to 12 days ahead, Tuesday to Thursday 7 to 9 AM local, US Eastern and Central only. Gmail renders the .ics as an invitation card. The join link sits low in the body on purpose. One follow-up at Day 4, then stop. No percentages, dollar figures or \"free\" in titles.",
      columns: [
        { id: "s1", label: "Step 1", title: "invite lands in Gmail", day: "Day 0 · 10 AM" },
        { id: "s2", label: "Step 2", title: "accepted: event in Google Calendar", day: "Day 0" },
        { id: "s3", label: "Step 3", title: "single follow-up", day: "Day 4 · 10 AM" },
        { id: "s4", label: "Step 4", title: "webinar day on the calendar", day: "Day 10 (session at 12 PM ET)" }
      ],
      rows: [
        coldRow("cold-c1", "Variation 1 · C1 agenda tone · title \"Databricks cost teardown (45 min)\"", C1_TITLE, C1),
        coldRow("cold-c2", "Variation 2 · C2 diagnostic opening · title \"Idle clusters, Photon, failed runs\"", C2_TITLE, C2),
        coldRow("cold-c3", "Variation 3 · C3 minimal · title \"Databricks costs w/ Srinath Reddy\"", C3_TITLE, C3)
      ]
    },
    {
      id: "registrant", title: "Registrant calendar invite (people who already registered)", kinds: ["registrant"],
      subtitle: "The three long-form invite bodies from the Updated Templates, sent as a Google Calendar invitation after registration. Gmail's generated subject is \"Invitation: <title> @ <date> (<guest email>)\". The 3-day view shows why the title analysis planned for 24 visible characters on mobile.",
      columns: [
        { id: "s1", label: "Step 1", title: "invitation email in Gmail", day: "Day 0 · 10 AM" },
        { id: "s2", label: "Step 2", title: "event in Google Calendar", day: "Day 0" },
        { id: "s3", label: "Step 3", title: "webinar day on the calendar", day: "Day 10 (session at 12 PM ET)" }
      ],
      rows: [
        regRow("reg-v1", "Variation 1 · title \"Idle clusters, failed runs\"", V1_TITLE, V1),
        regRow("reg-v2", "Variation 2 · title \"Databricks w/ Srinath Reddy\"", V2_TITLE, V2),
        regRow("reg-v3", "Variation 3 (personalised) · title \"Databricks teardown\"", V3_TITLE, V3),
        regRow("reg-n2", "Variation 4 · recommended title from the analysis \"6 leaks in your Databricks bill\" (Variation 1 body)", N2_TITLE, V1)
      ]
    }
  ];

  window.PREVIEW_DATA = { channel: "calendar", SEP, people, inboxFiller, tokens, previews, linkChecks, linkCheckedAt, kinds, campaigns, defaultState: { view: "opened" } };
})();
