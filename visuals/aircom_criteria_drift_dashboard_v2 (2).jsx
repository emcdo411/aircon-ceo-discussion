import { useState } from "react";

// ─── COLOR TOKENS ────────────────────────────────────────────────────────────
const C = {
  amazon:     { bg: "#073D31", border: "#4DB896", title: "#9FE1CB", body: "#5DCAA5" },
  airbus:     { bg: "#2E2870", border: "#9B95E0", title: "#CECBF6", body: "#AFA9EC" },
  aircomGap:  { bg: "#4A2A04", border: "#EF9F27", title: "#FAC775", body: "#EF9F27" },
  aircomGood: { bg: "#073D31", border: "#4DB896", title: "#9FE1CB", body: "#5DCAA5" },
  aircomBad:  { bg: "#5A1510", border: "#F09B7B", title: "#F5C4B3", body: "#F09B7B" },
  neutral:    { bg: "#1E1E22", border: "rgba(222,220,209,0.15)", title: "#FAF9F5", body: "#C2C0B6" },
  danger:     { bg: "#4A0E0E", border: "#E24B4A", title: "#F5AFAF", body: "#E24B4A" },
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const layers = [
  {
    id: 1, label: "LAYER 1 — ACTION AUDIT",
    amazon: { title: "Full audit trail",      body: ["Every agent decision logged", "and queryable in real time"],     theme: "amazon" },
    airbus: { title: "Skywise event log",     body: ["Supplier and ops decisions", "logged across 70+ airlines"],     theme: "airbus" },
    aircom: { title: "Confirmed strength",    body: ["Chris confirmed audit trail", "for all agent actions exists"],  theme: "aircomGood" },
    detail: "Action audit is the one layer where Aircon matches the benchmarks. Chris explicitly confirmed an audit trail for agent actions exists. This is the foundation — but it answers only half the question.",
  },
  {
    id: 2, label: "LAYER 2 — CRITERIA VALIDITY LOOP",
    amazon: { title: "Transaction-level loop", body: ["Every outcome re-scores", "criteria within hours"],           theme: "amazon" },
    airbus: { title: "Program-level review",   body: ["Multi-horizon tiers; each", "tier has its own cadence"],      theme: "airbus" },
    aircom: { title: "Not evidenced publicly", body: ["Gap confirmed by Chris:", "criteria drift unaddressed"],      theme: "aircomGap" },
    detail: "This is the confirmed gap. Amazon closes the loop at transaction level — within hours. Airbus at program level — within weeks. Without a criteria validity loop, the system tells you what agents did, not whether what they were told to do was still correct.",
  },
  {
    id: 3, label: "LAYER 3 — REGIME CHANGE PROTOCOL",
    amazon: { title: "Embedded in infra",       body: ["Live carrier, weather, and", "demand signals co-located"],   theme: "amazon" },
    airbus: { title: "Explicit trigger flags",  body: ["Post-COVID: regime shift", "triggers mandatory audit"],      theme: "airbus" },
    aircom: { title: "Not evidenced publicly",  body: ["Red Sea, tariff shifts, carrier", "changes — no flag seen"], theme: "aircomGap" },
    detail: "When a macro event changes the operating environment, Amazon and Airbus have explicit mechanisms that force a criteria review. Aircon has no publicly evidenced equivalent. This is Diagnostic Question 1.",
  },
  {
    id: 4, label: "LAYER 4 — SIGNAL VOLATILITY HANDLING",
    amazon: { title: "Real-time injection",     body: ["Spot rates and carrier data", "at decision layer, not logs"], theme: "amazon" },
    airbus: { title: "Tiered by signal speed",  body: ["Fast-changing ops separated", "from strategic criteria"],    theme: "airbus" },
    aircom: { title: "Not evidenced publicly",  body: ["Air freight BVC is critical —", "signals change daily"],     theme: "aircomGap" },
    detail: "Air freight operates above the Behavioral Volatility Ceiling — signals change faster than any structured recalibration cycle without explicit architecture. Amazon injects live signals at decision layer. Airbus separates signal tiers by speed.",
  },
  {
    id: 5, label: "LAYER 5 — SILENT DISTORTION WINDOW",
    amazon: { title: "Hours to days",           body: ["Loop closes fast enough", "that drift is short-lived"],      theme: "amazon" },
    airbus: { title: "Days to weeks",           body: ["Manufacturing tolerance", "allows longer window"],           theme: "airbus" },
    aircom: { title: "Est. 30 – 90 days",       body: ["Confident but miscalibrated", "quotes for up to 3 months"], theme: "aircomBad" },
    detail: "The Silent Distortion Window is the period during which a system produces confidently wrong outputs with no internal signal anything has changed. For Aircon, without drift detection, this window is estimated at 30–90 days in current air freight conditions.",
  },
];

const scores = [
  { org: "Amazon",  score: "91 / 100", sub: "Architecturally solved",        theme: "amazon" },
  { org: "Airbus",  score: "87 / 100", sub: "Governance-level solved",       theme: "airbus" },
  { org: "Aircon",  score: "CES: 42",  sub: "Mandatory recalibration flag",  theme: "neutral" },
];

const diagnosticQs = [
  {
    q: "Q1 — Criteria Governance", stake: "CFO",
    text: "When a macro event changes the routing or pricing landscape — Red Sea being the obvious example — what is the mechanism that tells the system the criteria it was built on need to be revisited?",
    listen: "Named process, named owner, defined trigger. A general answer means the architecture gap is real.",
  },
  {
    q: "Q2 — Feedback Loop Architecture", stake: "COO",
    text: "When a quote goes out and the actual cost or routing outcome diverges significantly from what the model predicted, where does that signal go — back to the criteria layer or only to the performance log?",
    listen: "Loop closure at the criteria layer — not just the reporting layer.",
  },
  {
    q: "Q3 — Silent Distortion Window", stake: "CEO / CTO",
    text: "What would a 60-day-old criteria set produce in today's market — and how would you know?",
    listen: "A concrete answer means they've built for it. A pause means they haven't asked it this way before.",
  },
];

const regimeEvents = [
  { date: "Oct 2023",  event: "Red Sea escalation begins",           impact: "Routing viability of 12+ freight lanes changes overnight",    severity: "high" },
  { date: "Jan 2024",  event: "Houthi attacks intensify",            impact: "Suez Canal diversions — Asia-Europe air freight spike 22%",   severity: "critical" },
  { date: "Mar 2024",  event: "Tariff reclassification wave",        impact: "HTS code changes affect 800+ SKU categories",                 severity: "high" },
  { date: "Jun 2024",  event: "Carrier consolidation announcements", impact: "Capacity signals shift; spot vs contract spread widens",      severity: "medium" },
  { date: "Sep 2024",  event: "Peak season demand surge",            impact: "Rate volatility exceeds model training baseline",             severity: "high" },
  { date: "Jan 2025",  event: "Tariff acceleration — new schedule",  impact: "Classification criteria from prior year now partially invalid", severity: "critical" },
  { date: "Mar 2025",  event: "Red Sea partial normalization",       impact: "Routing viability criteria again shift — opposite direction", severity: "high" },
  { date: "Apr 2025",  event: "Q1 earnings + rate reset",           impact: "Carrier pricing floors reset; quote models operating on stale data", severity: "critical" },
];

const sprintScope = [
  { week: "Week 1", title: "Architecture Intake", items: ["Map the criteria encoding process — who set the rules, when, how", "Identify what triggers a criteria review today", "Review quote outcome data for divergence patterns"] },
  { week: "Week 2", title: "Benchmark Mapping", items: ["Map Aircon architecture against Amazon/Airbus five-layer framework", "Score each layer against CES methodology", "Identify confirmed gaps vs. public-data hypothesis gaps"] },
  { week: "Week 3", title: "Silent Distortion Audit", items: ["Quantify actual Silent Distortion Window from internal data", "Model revenue exposure against confirmed CES score", "Identify the highest-priority recalibration trigger missing"] },
  { week: "Week 4", title: "Deliverable + Roadmap", items: ["Confirmed CES scorecard — updated from hypothesis to fact", "Governance remediation roadmap — three-layer priority sequence", "Board-ready risk summary with go/no-go on remediation engagement"] },
];

const proveWrongItems = [
  { label: "Criteria Review Cadence", challenge: "Show us a documented cadence — monthly, quarterly, event-triggered — for reviewing whether your AI's decision criteria are still calibrated to current market conditions.", ifTrue: "CES Layer 2 upgrades from 0 to 25. Overall score rises to ~67. Watch zone, not distortion.", ifFalse: "Gap confirmed. Layer 2 score holds at 0." },
  { label: "Regime Change Trigger", challenge: "Show us a named protocol — any format — that fires when a macro event (routing shift, tariff change, carrier consolidation) occurs and forces a criteria audit.", ifTrue: "CES Layer 3 upgrades from 0 to 20. Score rises further toward 72.", ifFalse: "No trigger = no floor on distortion window duration." },
  { label: "Feedback Loop Destination", challenge: "Show us where quote outcome divergence signals go. If they route back to the criteria layer and update decision weights, the loop is closed.", ifTrue: "CES Layer 2 gets additional credit. Estimated score: 78–82.", ifFalse: "Signal goes to reporting only = loop open. Drift accumulates silently." },
  { label: "Signal Volatility Architecture", challenge: "Show us how live spot rate or carrier reliability signals are injected into the decision layer — not the audit log, the decision layer.", ifTrue: "CES Layer 4 upgrades. Full score approaches 85+.", ifFalse: "Static criteria in a volatile market = Silent Distortion Window confirmed." },
  { label: "Last Recalibration Date", challenge: "Tell us the date the underlying decision criteria were last reviewed and updated against current market conditions.", ifTrue: "Within 30 days = strong signal. Within 60 days with a regime event = watch zone. Beyond 90 days = distortion likely active.", ifFalse: "If the date is unknown, that itself is the finding." },
];

// ─── REVENUE IMPACT ESTIMATOR ─────────────────────────────────────────────────
function RevenueEstimator() {
  const [quotes, setQuotes]   = useState(500);
  const [avgDeal, setAvgDeal] = useState(8500);
  const [closeRate, setClose] = useState(28);

  const mispriceRate = 0.18; // estimated at CES 42 — 18% of quotes mispriced
  const marginImpact = 0.09; // avg margin erosion per mispriced quote
  const monthly = Math.round(quotes * avgDeal * (closeRate / 100) * mispriceRate * marginImpact);
  const annual = monthly * 12;
  const window90 = monthly * 3;

  const fmt = (n) => "$" + n.toLocaleString();

  return (
    <div style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 13, color: "#C2C0B6", lineHeight: 1.8, margin: "0 0 20px" }}>
          At CES 42, an estimated <strong style={{ color: "#EF9F27" }}>18% of quotes</strong> carry miscalibrated criteria. Enter Aircon's operating parameters to model the revenue exposure from a confirmed Silent Distortion Window.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 24 }}>
          {[
            { label: "Monthly quote volume", value: quotes,    setter: setQuotes,   min: 50,   max: 5000, step: 50  },
            { label: "Avg deal size ($)",     value: avgDeal,  setter: setAvgDeal,  min: 1000, max: 100000, step: 500 },
            { label: "Close rate (%)",        value: closeRate, setter: setClose,   min: 5,    max: 60,   step: 1   },
          ].map(({ label, value, setter, min, max, step }) => (
            <div key={label}>
              <div style={{ fontSize: 11, color: "#888780", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>{label}</div>
              <input
                type="range" min={min} max={max} step={step} value={value}
                onChange={e => setter(Number(e.target.value))}
                style={{ width: "100%", accentColor: "#EF9F27", marginBottom: 6 }}
              />
              <div style={{ fontSize: 16, fontWeight: 700, color: "#FAF9F5" }}>
                {label.includes("$") ? fmt(value) : label.includes("%") ? value + "%" : value.toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
        {[
          { label: "Monthly exposure", value: fmt(monthly), sub: "At current CES 42 drift rate", color: "#EF9F27", bg: "rgba(74,42,4,0.6)" },
          { label: "90-day window cost", value: fmt(window90), sub: "One Silent Distortion cycle", color: "#F09B7B", bg: "rgba(90,21,16,0.6)" },
          { label: "Annual exposure", value: fmt(annual), sub: "If no recalibration occurs", color: "#E24B4A", bg: "rgba(74,14,14,0.6)" },
        ].map(({ label, value, sub, color, bg }) => (
          <div key={label} style={{ background: bg, border: `1px solid ${color}40`, borderRadius: 10, padding: "18px 20px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 8 }}>{label}</div>
            <div style={{ fontSize: 24, fontWeight: 700, color, marginBottom: 4 }}>{value}</div>
            <div style={{ fontSize: 11, color: "#888780" }}>{sub}</div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20, padding: "14px 18px", background: "rgba(93,202,165,0.05)", border: "1px solid rgba(93,202,165,0.15)", borderRadius: 8 }}>
        <span style={{ fontSize: 12, color: "#5DCAA5", fontWeight: 600 }}>Diagnostic sprint ROI: </span>
        <span style={{ fontSize: 12, color: "#C2C0B6" }}>
          A $10,000 diagnostic sprint that confirms or refutes the {fmt(window90)} 90-day exposure estimate
          returns {Math.round(window90 / 10000)}x on confirmation alone — before remediation savings are counted.
          If the hypothesis is wrong, the sprint produces a governance validation worth more than the fee.
        </span>
      </div>

      <div style={{ marginTop: 10, fontSize: 11, color: "#555452", lineHeight: 1.7 }}>
        Model assumptions: 18% misprice rate at CES 42 (EBT Pathway 4 — Temporal Criteria Decay, McDonald 2026); 9% average margin erosion per mispriced quote (air freight forwarder benchmark). All figures are hypothesis-grade estimates pending internal data confirmation.
      </div>
    </div>
  );
}

// ─── REGIME TIMELINE ──────────────────────────────────────────────────────────
function RegimeTimeline() {
  const [hovered, setHovered] = useState(null);
  const sevColor = { critical: "#E24B4A", high: "#EF9F27", medium: "#AFA9EC" };
  const sevLabel = { critical: "CRITICAL", high: "HIGH", medium: "MEDIUM" };

  return (
    <div>
      <p style={{ fontSize: 13, color: "#C2C0B6", lineHeight: 1.8, margin: "0 0 24px" }}>
        Every event below is a criteria invalidation signal. Each one required an AI quoting system to ask: <em style={{ color: "#FAC775" }}>"Are the rules we're optimizing against still true?"</em> Without a regime change protocol, none of these events triggered a mandatory criteria review.
      </p>

      <div style={{ position: "relative", paddingLeft: 24 }}>
        <div style={{ position: "absolute", left: 7, top: 0, bottom: 0, width: 2, background: "linear-gradient(to bottom, #E24B4A, #EF9F27, #AFA9EC)", borderRadius: 2 }} />

        {regimeEvents.map((ev, i) => (
          <div
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              position: "relative",
              marginBottom: 16,
              cursor: "default",
              transition: "transform 0.15s",
              transform: hovered === i ? "translateX(4px)" : "translateX(0)",
            }}
          >
            <div style={{
              position: "absolute", left: -20, top: 10, width: 10, height: 10,
              borderRadius: "50%", background: sevColor[ev.severity],
              boxShadow: hovered === i ? `0 0 8px ${sevColor[ev.severity]}` : "none",
              transition: "box-shadow 0.15s",
            }} />
            <div style={{
              background: hovered === i ? "rgba(30,30,34,0.9)" : "#1A1A1E",
              border: `1px solid ${hovered === i ? sevColor[ev.severity] + "60" : "rgba(222,220,209,0.08)"}`,
              borderRadius: 8,
              padding: "12px 16px",
              transition: "border-color 0.15s, background 0.15s",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontSize: 12, color: "#888780", fontFamily: "'IBM Plex Mono', monospace" }}>{ev.date}</span>
                <span style={{
                  fontSize: 10, fontWeight: 700, color: sevColor[ev.severity],
                  background: sevColor[ev.severity] + "18", borderRadius: 4, padding: "2px 8px",
                  letterSpacing: "0.06em",
                }}>{sevLabel[ev.severity]}</span>
              </div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#FAF9F5", marginBottom: 4 }}>{ev.event}</div>
              <div style={{ fontSize: 12, color: "#888780", lineHeight: 1.6 }}>{ev.impact}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 16, padding: "14px 18px", background: "rgba(226,75,74,0.06)", border: "1px solid rgba(226,75,74,0.2)", borderRadius: 8 }}>
        <div style={{ fontSize: 12, color: "#E24B4A", fontWeight: 600, marginBottom: 4 }}>The accumulation problem</div>
        <div style={{ fontSize: 12, color: "#C2C0B6", lineHeight: 1.7 }}>
          8 regime-level events in 18 months. Each one moved the market away from the criteria baseline. A system without drift detection absorbed all 8 silently. The question for Chris is not whether this happened — it's how much of the gap is still open today.
        </div>
      </div>
    </div>
  );
}

// ─── DIAGNOSTIC SPRINT ────────────────────────────────────────────────────────
function DiagnosticSprint() {
  const [open, setOpen] = useState(null);

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 28 }}>
        {[
          { label: "Engagement type",  value: "Fixed-fee diagnostic sprint" },
          { label: "Duration",         value: "3 to 4 weeks" },
          { label: "Price",            value: "$8,500 – $12,000 flat" },
          { label: "Access required",  value: "CTO + 2 hrs VP Engineering" },
          { label: "Primary deliverable", value: "Confirmed CES scorecard" },
          { label: "Secondary deliverable", value: "Governance remediation roadmap" },
        ].map(({ label, value }) => (
          <div key={label} style={{ background: "#1A1A1E", border: "1px solid rgba(222,220,209,0.08)", borderRadius: 8, padding: "12px 16px" }}>
            <div style={{ fontSize: 11, color: "#555452", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>{label}</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#FAF9F5" }}>{value}</div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#C2C0B6", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 14 }}>Week-by-week scope</div>
        {sprintScope.map((wk, i) => (
          <div
            key={i}
            onClick={() => setOpen(open === i ? null : i)}
            style={{ cursor: "pointer", marginBottom: 8 }}
          >
            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              background: open === i ? "rgba(93,202,165,0.08)" : "#1A1A1E",
              border: `1px solid ${open === i ? "rgba(93,202,165,0.3)" : "rgba(222,220,209,0.08)"}`,
              borderRadius: open === i ? "8px 8px 0 0" : 8,
              padding: "12px 16px",
              transition: "all 0.15s",
            }}>
              <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <span style={{ fontSize: 11, color: "#5DCAA5", fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600 }}>{wk.week}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#FAF9F5" }}>{wk.title}</span>
              </div>
              <span style={{ fontSize: 16, color: "#555452" }}>{open === i ? "−" : "+"}</span>
            </div>
            {open === i && (
              <div style={{
                background: "rgba(93,202,165,0.04)", border: "1px solid rgba(93,202,165,0.15)",
                borderTop: "none", borderRadius: "0 0 8px 8px", padding: "14px 16px",
              }}>
                {wk.items.map((item, j) => (
                  <div key={j} style={{ display: "flex", gap: 10, marginBottom: 6, alignItems: "flex-start" }}>
                    <span style={{ color: "#5DCAA5", marginTop: 1, flexShrink: 0 }}>→</span>
                    <span style={{ fontSize: 13, color: "#C2C0B6", lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ padding: "16px 20px", background: "rgba(175,169,236,0.06)", border: "1px solid rgba(175,169,236,0.2)", borderRadius: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#AFA9EC", marginBottom: 6 }}>What both outcomes produce</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <div>
            <div style={{ fontSize: 11, color: "#5DCAA5", fontWeight: 600, marginBottom: 4 }}>If hypothesis confirmed</div>
            <div style={{ fontSize: 12, color: "#C2C0B6", lineHeight: 1.7 }}>Board-ready risk quantification. Remediation roadmap with estimated ROI. Clear path to a 90-day governance engagement.</div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: "#EF9F27", fontWeight: 600, marginBottom: 4 }}>If hypothesis disproved</div>
            <div style={{ fontSize: 12, color: "#C2C0B6", lineHeight: 1.7 }}>Documented governance validation. CES score above 60. Competitive differentiation artifact for board and investor reporting.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PROVE ME WRONG ───────────────────────────────────────────────────────────
function ProveMeWrong() {
  const [open, setOpen] = useState(null);

  return (
    <div>
      <p style={{ fontSize: 13, color: "#C2C0B6", lineHeight: 1.8, margin: "0 0 20px" }}>
        The Aircon CES hypothesis is built entirely from public data. Below are the five specific data points that would move the score. This is not a sales document. It is an invitation to prove the analysis wrong — and a precise description of what that proof requires.
      </p>

      {proveWrongItems.map((item, i) => (
        <div key={i} style={{ marginBottom: 10 }}>
          <div
            onClick={() => setOpen(open === i ? null : i)}
            style={{
              cursor: "pointer",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              background: open === i ? "rgba(226,75,74,0.07)" : "#1A1A1E",
              border: `1px solid ${open === i ? "rgba(226,75,74,0.35)" : "rgba(222,220,209,0.08)"}`,
              borderRadius: open === i ? "8px 8px 0 0" : 8,
              padding: "13px 16px",
              transition: "all 0.15s",
            }}
          >
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <span style={{
                width: 22, height: 22, borderRadius: "50%", background: "rgba(226,75,74,0.15)",
                border: "1px solid rgba(226,75,74,0.4)", display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#E24B4A", flexShrink: 0,
              }}>{i + 1}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: "#FAF9F5" }}>{item.label}</span>
            </div>
            <span style={{ fontSize: 16, color: "#555452" }}>{open === i ? "−" : "+"}</span>
          </div>

          {open === i && (
            <div style={{
              background: "rgba(226,75,74,0.03)", border: "1px solid rgba(226,75,74,0.2)",
              borderTop: "none", borderRadius: "0 0 8px 8px", padding: "16px 18px",
            }}>
              <div style={{ fontSize: 12, color: "#888780", textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>The challenge</div>
              <p style={{ fontSize: 13, color: "#C2C0B6", lineHeight: 1.7, margin: "0 0 16px", fontStyle: "italic" }}>"{item.challenge}"</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div style={{ background: "rgba(8,80,65,0.3)", border: "1px solid rgba(77,184,150,0.25)", borderRadius: 6, padding: "10px 14px" }}>
                  <div style={{ fontSize: 11, color: "#5DCAA5", fontWeight: 600, marginBottom: 5 }}>If you can show this</div>
                  <div style={{ fontSize: 12, color: "#C2C0B6", lineHeight: 1.6 }}>{item.ifTrue}</div>
                </div>
                <div style={{ background: "rgba(74,14,14,0.3)", border: "1px solid rgba(226,75,74,0.25)", borderRadius: 6, padding: "10px 14px" }}>
                  <div style={{ fontSize: 11, color: "#E24B4A", fontWeight: 600, marginBottom: 5 }}>If you can't</div>
                  <div style={{ fontSize: 12, color: "#C2C0B6", lineHeight: 1.6 }}>{item.ifFalse}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      <div style={{ marginTop: 20, padding: "16px 20px", background: "rgba(239,159,39,0.06)", border: "1px solid rgba(239,159,39,0.2)", borderRadius: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "#EF9F27", marginBottom: 6 }}>The posture behind this</div>
        <div style={{ fontSize: 12, color: "#C2C0B6", lineHeight: 1.7 }}>
          The diagnostic sprint exists precisely to answer these five questions with internal data rather than public inference. If Chris's team can answer all five in the next conversation, no engagement is needed and Aircon has a validated governance artifact. If the answers aren't available, that itself is the finding — and the sprint is the fastest path from hypothesis to certainty.
        </div>
      </div>
    </div>
  );
}

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
function Cell({ data }) {
  const c = C[data.theme];
  return (
    <div style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 8, padding: "12px 14px", display: "flex", flexDirection: "column", gap: 4, minHeight: 80 }}>
      <span style={{ fontWeight: 600, fontSize: 13, color: c.title, lineHeight: 1.3 }}>{data.title}</span>
      {data.body.map((line, i) => <span key={i} style={{ fontSize: 12, color: c.body, lineHeight: 1.4 }}>{line}</span>)}
    </div>
  );
}

function ScoreCard({ s }) {
  const c = C[s.theme];
  return (
    <div style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 10, padding: "14px 18px", textAlign: "center", flex: 1, minWidth: 130 }}>
      <div style={{ fontSize: 11, color: c.body, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.org}</div>
      <div style={{ fontSize: 20, fontWeight: 700, color: c.title, marginBottom: 3 }}>{s.score}</div>
      <div style={{ fontSize: 11, color: c.body }}>{s.sub}</div>
    </div>
  );
}

// ─── MAIN DASHBOARD ───────────────────────────────────────────────────────────
export default function Dashboard() {
  const [activeLayer, setActiveLayer] = useState(null);
  const [activeTab, setActiveTab] = useState("benchmark");

  const tabs = [
    { id: "benchmark",  label: "Architecture Benchmark" },
    { id: "diagnostic", label: "Diagnostic Questions" },
    { id: "revenue",    label: "Revenue Impact" },
    { id: "regime",     label: "Regime Timeline" },
    { id: "sprint",     label: "Diagnostic Sprint" },
    { id: "prove",      label: "Prove Me Wrong" },
    { id: "context",    label: "Framework & Sources" },
  ];

  return (
    <div style={{ fontFamily: "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif", background: "#111114", minHeight: "100vh", color: "#F0EFE9", paddingBottom: 60 }}>

      {/* ── HEADER ── */}
      <div style={{ background: "linear-gradient(135deg, #0D1F1A 0%, #111114 50%, #1A0D1A 100%)", borderBottom: "1px solid rgba(222,220,209,0.08)", padding: "32px 32px 28px" }}>
        <div style={{ maxWidth: 900 }}>
          <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
            {["EBT v2.6", "AI Adoption Architect v6.1", "DACR License v2.6", "Evidence Basis: Public Data Only", "Status: Hypothesis Grade"].map(badge => (
              <span key={badge} style={{ fontSize: 10, color: "#888780", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 4, padding: "3px 9px", letterSpacing: "0.05em" }}>{badge}</span>
            ))}
          </div>
          <h1 style={{ margin: "0 0 8px", fontSize: 26, fontWeight: 700, color: "#FAF9F5", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            Aircon Criteria Drift Intelligence
          </h1>
          <p style={{ margin: "0 0 20px", fontSize: 14, color: "#888780", lineHeight: 1.6 }}>
            A structured public-data intelligence package benchmarking AI decision criteria drift architecture across Amazon, Airbus, and Aircon — prepared for executive diagnostic conversation with Chris Condon, CEO.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {scores.map(s => <ScoreCard key={s.org} s={s} />)}
          </div>
        </div>
      </div>

      {/* ── TABS ── */}
      <div style={{ borderBottom: "1px solid rgba(222,220,209,0.07)", padding: "0 32px", overflowX: "auto" }}>
        <div style={{ display: "flex", gap: 0, minWidth: "max-content" }}>
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                padding: "14px 18px", fontSize: 13, fontWeight: 500,
                color: activeTab === t.id ? "#FAF9F5" : "#666462",
                borderBottom: activeTab === t.id ? "2px solid #5DCAA5" : "2px solid transparent",
                transition: "color 0.15s",
                whiteSpace: "nowrap",
              }}
            >{t.label}</button>
          ))}
        </div>
      </div>

      {/* ── TAB CONTENT ── */}
      <div style={{ padding: "32px 32px 0", maxWidth: 900 }}>

        {/* BENCHMARK */}
        {activeTab === "benchmark" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "180px 1fr 1fr 1fr", gap: 8, marginBottom: 8 }}>
              <div />
              {["Amazon", "Airbus", "Aircon (hypothesis)"].map(h => (
                <div key={h} style={{ fontSize: 11, color: "#888780", textTransform: "uppercase", letterSpacing: "0.07em", textAlign: "center", padding: "6px 0" }}>{h}</div>
              ))}
            </div>
            {layers.map(layer => (
              <div key={layer.id} style={{ marginBottom: 8 }}>
                <div
                  onClick={() => setActiveLayer(activeLayer === layer.id ? null : layer.id)}
                  style={{ display: "grid", gridTemplateColumns: "180px 1fr 1fr 1fr", gap: 8, cursor: "pointer" }}
                >
                  <div style={{ display: "flex", alignItems: "center", padding: "0 8px 0 0" }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: "#888780", textTransform: "uppercase", letterSpacing: "0.05em", lineHeight: 1.4 }}>{layer.label}</span>
                  </div>
                  <Cell data={layer.amazon} />
                  <Cell data={layer.airbus} />
                  <Cell data={layer.aircom} />
                </div>
                {activeLayer === layer.id && (
                  <div style={{ margin: "6px 0 2px 188px", background: "rgba(93,202,165,0.05)", border: "1px solid rgba(93,202,165,0.15)", borderRadius: 6, padding: "12px 16px", fontSize: 13, color: "#C2C0B6", lineHeight: 1.7 }}>
                    {layer.detail}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* DIAGNOSTIC QUESTIONS */}
        {activeTab === "diagnostic" && (
          <div style={{ maxWidth: 760 }}>
            <p style={{ fontSize: 14, color: "#C2C0B6", lineHeight: 1.8, margin: "0 0 24px" }}>
              These three questions are designed to be asked in sequence. Each one is a criteria governance diagnostic. Together they map the full Silent Distortion Window problem. The call posture is curious, not confrontational.
            </p>
            {diagnosticQs.map((q, i) => (
              <div key={i} style={{ background: "#1A1A1E", border: "1px solid rgba(222,220,209,0.08)", borderRadius: 10, padding: "20px 22px", marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#8E9FD5" }}>{q.q}</span>
                  <span style={{ background: "rgba(93,202,165,0.1)", border: "1px solid rgba(93,202,165,0.25)", borderRadius: 20, padding: "2px 10px", fontSize: 11, color: "#5DCAA5" }}>Aimed at: {q.stake}</span>
                </div>
                <p style={{ margin: "0 0 14px", fontSize: 14, color: "#FAF9F5", lineHeight: 1.7, fontStyle: "italic" }}>"{q.text}"</p>
                <div style={{ background: "rgba(142,159,213,0.06)", borderLeft: "3px solid #8E9FD5", padding: "10px 14px", borderRadius: "0 6px 6px 0" }}>
                  <span style={{ fontSize: 11, color: "#8E9FD5", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Listen for: </span>
                  <span style={{ fontSize: 13, color: "#C2C0B6" }}>{q.listen}</span>
                </div>
              </div>
            ))}
            <div style={{ background: "rgba(93,202,165,0.05)", border: "1px solid rgba(93,202,165,0.15)", borderRadius: 8, padding: "14px 18px", marginTop: 8, fontSize: 13, color: "#888780", lineHeight: 1.7 }}>
              <strong style={{ color: "#5DCAA5" }}>Call posture: </strong>
              If all three questions land with the same response received on LinkedIn — acknowledgment without a concrete answer — the engagement conversation is earned. You are the person who named the problem correctly.
            </div>
          </div>
        )}

        {/* REVENUE IMPACT */}
        {activeTab === "revenue" && (
          <div style={{ maxWidth: 760 }}>
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontSize: 16, fontWeight: 600, color: "#FAF9F5", margin: "0 0 4px" }}>Revenue Exposure Estimator</h2>
              <p style={{ fontSize: 12, color: "#555452", margin: 0 }}>Hypothesis-grade model · McDonald (2026) · Update inputs with confirmed Aircon operating data</p>
            </div>
            <RevenueEstimator />
          </div>
        )}

        {/* REGIME TIMELINE */}
        {activeTab === "regime" && (
          <div style={{ maxWidth: 760 }}>
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontSize: 16, fontWeight: 600, color: "#FAF9F5", margin: "0 0 4px" }}>Regime Event Timeline — Q4 2023 to Q2 2025</h2>
              <p style={{ fontSize: 12, color: "#555452", margin: 0 }}>Air freight criteria invalidation events · Each one required a governance response · Hover to highlight</p>
            </div>
            <RegimeTimeline />
          </div>
        )}

        {/* DIAGNOSTIC SPRINT */}
        {activeTab === "sprint" && (
          <div style={{ maxWidth: 760 }}>
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontSize: 16, fontWeight: 600, color: "#FAF9F5", margin: "0 0 4px" }}>Criteria Drift Diagnostic Sprint</h2>
              <p style={{ fontSize: 12, color: "#555452", margin: 0 }}>Fixed-fee engagement scope · Erwin Maurice McDonald · Behavioral Intelligence Research / Epoch Frameworks LLC</p>
            </div>
            <DiagnosticSprint />
          </div>
        )}

        {/* PROVE ME WRONG */}
        {activeTab === "prove" && (
          <div style={{ maxWidth: 760 }}>
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontSize: 16, fontWeight: 600, color: "#FAF9F5", margin: "0 0 4px" }}>Prove the Hypothesis Wrong</h2>
              <p style={{ fontSize: 12, color: "#555452", margin: 0 }}>Five specific data points that would move the CES score above 60 · Click each to expand</p>
            </div>
            <ProveMeWrong />
          </div>
        )}

        {/* FRAMEWORK & SOURCES */}
        {activeTab === "context" && (
          <div style={{ maxWidth: 760 }}>
            <div style={{ marginBottom: 28 }}>
              <h2 style={{ fontSize: 16, fontWeight: 600, color: "#FAF9F5", marginBottom: 12 }}>The core problem</h2>
              <p style={{ fontSize: 14, color: "#C2C0B6", lineHeight: 1.8, margin: "0 0 12px" }}>
                Air freight AI quoting systems encode freight forwarder expertise as decision criteria. Those criteria are valid at encoding time. The problem is that air freight conditions — routing viability, spot rate differentials, carrier reliability, tariff classifications — change on a daily to weekly basis.
              </p>
              <p style={{ fontSize: 14, color: "#C2C0B6", lineHeight: 1.8, margin: 0 }}>
                When a system has strong action audit architecture but lacks a parallel criteria validity loop, the result is a <strong style={{ color: "#FAC775" }}>Silent Distortion Window</strong> — a period during which the system produces confidently wrong outputs with no internal signal anything has changed. Estimated at <strong style={{ color: "#F09B7B" }}>30–90 days</strong> in current conditions.
              </p>
            </div>

            <div style={{ marginBottom: 28 }}>
              <h2 style={{ fontSize: 16, fontWeight: 600, color: "#FAF9F5", marginBottom: 14 }}>CES score interpretation</h2>
              {[
                { range: "80–100", label: "Self-correcting",          desc: "Drift addressed before it reaches quote output",                color: "#5DCAA5", bg: "rgba(7,61,49,0.4)" },
                { range: "60–79",  label: "Watch zone",               desc: "Governance review required on defined cadence",                 color: "#EF9F27", bg: "rgba(74,42,4,0.4)" },
                { range: "40–59",  label: "Recalibration flag",       desc: "Mandatory review before downstream decisions",                  color: "#F09B7B", bg: "rgba(90,21,16,0.4)" },
                { range: "< 40",   label: "Silent distortion active", desc: "Confident outputs likely miscalibrated — halt and audit",       color: "#E24B4A", bg: "rgba(74,14,14,0.4)" },
              ].map(tier => (
                <div key={tier.range} style={{ background: tier.bg, border: `1px solid ${tier.color}30`, borderLeft: `3px solid ${tier.color}`, borderRadius: "0 8px 8px 0", padding: "10px 16px", marginBottom: 8, display: "flex", gap: 16, alignItems: "center" }}>
                  <span style={{ minWidth: 50, fontSize: 13, fontWeight: 700, color: tier.color }}>{tier.range}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#FAF9F5", minWidth: 180 }}>{tier.label}</span>
                  <span style={{ fontSize: 12, color: "#C2C0B6" }}>{tier.desc}</span>
                </div>
              ))}
              <div style={{ marginTop: 10, fontSize: 13, color: "#888780", fontStyle: "italic" }}>
                Aircon hypothesis CES: 42/100 — at the boundary of recalibration flag and silent distortion active. One regime event away from confirmed distortion.
              </div>
            </div>

            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontSize: 16, fontWeight: 600, color: "#FAF9F5", marginBottom: 14 }}>Framework sources</h2>
              {[
                ["EBT Pathway 4 — Temporal Criteria Decay",       "McDonald, E.M. (February 2026)"],
                ["Criteria Expiration Score (CES)",               "McDonald, E.M. (March 2026)"],
                ["Behavioral Volatility Ceiling (BVC)",           "McDonald, E.M. (March 2026) — validated Thompson/Havas Edge"],
                ["Silent Distortion Window construct",            "McDonald, E.M. (March 2026)"],
                ["AI Adoption Architect v6.1 Layer 0B",           "McDonald, E.M. (2026)"],
                ["Fractional CXO Practice Builder v2.4",          "McDonald, E.M. (March 2026)"],
                ["Amazon logistics architecture",                 "AWS Logistics Architecture whitepaper (public, 2023)"],
                ["Airbus Skywise program",                        "Airbus Skywise public documentation (2023–2024)"],
                ["MLOps feedback loop theory",                    "Sculley et al. — Hidden Technical Debt in ML Systems, Google (2015)"],
                ["Cybernetics / feedback loop foundations",       "Wiener (1948); Ashby (1956)"],
              ].map(([fw, cite]) => (
                <div key={fw} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", gap: 16, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 13, color: "#C2C0B6" }}>{fw}</span>
                  <span style={{ fontSize: 12, color: "#888780", textAlign: "right" }}>{cite}</span>
                </div>
              ))}
            </div>

            <div style={{ padding: "14px 18px", background: "#1A1A1E", border: "1px solid rgba(222,220,209,0.06)", borderRadius: 8, fontSize: 12, color: "rgba(194,192,182,0.45)", lineHeight: 1.7 }}>
              All Aircon findings represent a structured public-data hypothesis. Nothing in this dashboard reflects confirmed internal Aircon architecture. This package was developed to support a diagnostic conversation — not to assert findings as fact. · DACR License v2.6 · Behavioral Intelligence Research / Epoch Frameworks LLC · Erwin Maurice McDonald
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
