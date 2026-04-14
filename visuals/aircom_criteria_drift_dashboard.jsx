import { useState } from "react";

const COLORS = {
  amazon:      { bg: "#085041", border: "#5DCAA5", title: "#9FE1CB", body: "#5DCAA5" },
  airbus:      { bg: "#3C3489", border: "#AFA9EC", title: "#CECBF6", body: "#AFA9EC" },
  aircomGap:   { bg: "#633806", border: "#EF9F27", title: "#FAC775", body: "#EF9F27" },
  aircomGood:  { bg: "#085041", border: "#5DCAA5", title: "#9FE1CB", body: "#5DCAA5" },
  aircomBad:   { bg: "#711B13", border: "#F09B7B", title: "#F5C4B3", body: "#F09B7B" },
  neutral:     { bg: "#262624", border: "rgba(222,220,209,0.18)", title: "#FAF9F5", body: "#C2C0B6" },
};

const layers = [
  {
    id: 1,
    label: "LAYER 1 — ACTION AUDIT",
    amazon:  { title: "Full audit trail",        body: ["Every agent decision logged", "and queryable in real time"],    theme: "amazon" },
    airbus:  { title: "Skywise event log",        body: ["Supplier and ops decisions", "logged across 70+ airlines"],    theme: "airbus" },
    aircom:  { title: "Confirmed strength",       body: ["Chris confirmed audit trail", "for all agent actions exists"],  theme: "aircomGood" },
    detail: "Action audit is the one layer where Aircom matches the benchmarks. Chris explicitly confirmed that an audit trail for agent actions exists. This is the foundation — but it answers only half the question.",
  },
  {
    id: 2,
    label: "LAYER 2 — CRITERIA VALIDITY LOOP",
    amazon:  { title: "Transaction-level loop",   body: ["Every outcome re-scores", "criteria within hours"],            theme: "amazon" },
    airbus:  { title: "Program-level review",     body: ["Multi-horizon tiers; each", "tier has its own cadence"],       theme: "airbus" },
    aircom:  { title: "Not evidenced publicly",   body: ["Gap confirmed by Chris:", "criteria drift unaddressed"],       theme: "aircomGap" },
    detail: "This is the confirmed gap. Amazon closes the loop at the transaction level — within hours. Airbus closes it at the program level — within weeks. Without a criteria validity loop, the system can only tell you what agents did, not whether what they were told to do was still correct.",
  },
  {
    id: 3,
    label: "LAYER 3 — REGIME CHANGE PROTOCOL",
    amazon:  { title: "Embedded in infra",        body: ["Live carrier, weather, and", "demand signals co-located"],     theme: "amazon" },
    airbus:  { title: "Explicit trigger flags",   body: ["Post-COVID: regime shift", "triggers mandatory audit"],        theme: "airbus" },
    aircom:  { title: "Not evidenced publicly",   body: ["Red Sea, tariff shifts, carrier", "changes — no flag system seen"], theme: "aircomGap" },
    detail: "When a macro event changes the operating environment — Red Sea routing, tariff acceleration, carrier consolidations — Amazon and Airbus have explicit mechanisms that force a criteria review. Aircom has no publicly evidenced equivalent. This is Diagnostic Question 1 for the Chris call.",
  },
  {
    id: 4,
    label: "LAYER 4 — SIGNAL VOLATILITY HANDLING",
    amazon:  { title: "Real-time injection",      body: ["Spot rates and carrier data", "at decision layer, not logs"],  theme: "amazon" },
    airbus:  { title: "Tiered by signal speed",   body: ["Fast-changing ops separated", "from strategic criteria"],      theme: "airbus" },
    aircom:  { title: "Not evidenced publicly",   body: ["Air freight BVC is critical —", "signals change faster than cycles"], theme: "aircomGap" },
    detail: "Air freight right now operates above the Behavioral Volatility Ceiling — signals change faster than any structured recalibration cycle can track without explicit architecture. Amazon injects live signals at the decision layer. Airbus separates signal tiers by speed. Neither approach is evidenced in Aircom's public architecture.",
  },
  {
    id: 5,
    label: "LAYER 5 — SILENT DISTORTION WINDOW",
    amazon:  { title: "Hours to days",            body: ["Loop closes fast enough", "that drift is short-lived"],        theme: "amazon" },
    airbus:  { title: "Days to weeks",            body: ["Manufacturing tolerance", "allows longer window"],             theme: "airbus" },
    aircom:  { title: "Est. 30 – 90 days",        body: ["Confident but miscalibrated", "quotes for up to 3 months"],   theme: "aircomBad" },
    detail: "The Silent Distortion Window is the period during which a system produces confidently wrong outputs with no internal signal that anything has changed. For Aircom, without drift detection architecture, this window is estimated at 30–90 days in current air freight conditions. Every quote in that window is a pricing risk.",
  },
];

const scores = [
  { org: "Amazon",          score: "91 / 100", sub: "Architecturally solved",     theme: "amazon" },
  { org: "Airbus",          score: "87 / 100", sub: "Governance-level solved",    theme: "airbus" },
  { org: "Aircom",          score: "CES: 42 / 100", sub: "Mandatory recalibration flag", theme: "neutral" },
];

const diagnosticQs = [
  {
    q: "Q1 — Criteria Governance",
    text: "When a macro event changes the routing or pricing landscape — Red Sea being the obvious example — what is the mechanism that tells the system the criteria it was built on need to be revisited?",
    listen: "Named process, named owner, defined trigger. A general answer means the architecture gap is real.",
    stake: "CFO",
  },
  {
    q: "Q2 — Feedback Loop Architecture",
    text: "When a quote goes out and the actual cost or routing outcome diverges significantly from what the model predicted, where does that signal go? Does it go back to the criteria layer or only to the performance log?",
    listen: "Loop closure at the criteria layer — not just the reporting layer.",
    stake: "COO",
  },
  {
    q: "Q3 — Silent Distortion Window",
    text: "What would a 60-day-old criteria set produce in today's market — and how would you know?",
    listen: "A concrete answer means they've built for it. A pause means they haven't asked it this way before.",
    stake: "CEO / CTO",
  },
];

function Cell({ data }) {
  const c = COLORS[data.theme];
  return (
    <div style={{
      background: c.bg,
      border: `1px solid ${c.border}`,
      borderRadius: 8,
      padding: "12px 14px",
      display: "flex",
      flexDirection: "column",
      gap: 4,
      minHeight: 80,
    }}>
      <span style={{ fontWeight: 600, fontSize: 13, color: c.title, lineHeight: 1.3 }}>{data.title}</span>
      {data.body.map((line, i) => (
        <span key={i} style={{ fontSize: 12, color: c.body, lineHeight: 1.4 }}>{line}</span>
      ))}
    </div>
  );
}

function ScoreCard({ s }) {
  const c = COLORS[s.theme];
  return (
    <div style={{
      background: c.bg,
      border: `1px solid ${c.border}`,
      borderRadius: 10,
      padding: "14px 18px",
      textAlign: "center",
      flex: 1,
      minWidth: 140,
    }}>
      <div style={{ fontSize: 11, color: c.body, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.org}</div>
      <div style={{ fontSize: 20, fontWeight: 700, color: c.title, marginBottom: 3 }}>{s.score}</div>
      <div style={{ fontSize: 11, color: c.body }}>{s.sub}</div>
    </div>
  );
}

export default function Dashboard() {
  const [activeLayer, setActiveLayer] = useState(null);
  const [activeTab, setActiveTab] = useState("benchmark");

  const tabs = [
    { id: "benchmark", label: "Architecture Benchmark" },
    { id: "diagnostic", label: "Diagnostic Questions" },
    { id: "context",   label: "Framework & Sources" },
  ];

  return (
    <div style={{
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      background: "#18181A",
      minHeight: "100vh",
      color: "#F0EFE9",
      padding: "0 0 48px",
    }}>

      {/* Header */}
      <div style={{
        background: "linear-gradient(180deg, #1E1E20 0%, #18181A 100%)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        padding: "28px 32px 20px",
      }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, color: "#5DCAA5", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
              Aircom Criteria Drift Intelligence · April 2026
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 700, margin: "0 0 6px", color: "#FAF9F5", lineHeight: 1.2 }}>
              Criteria Drift Architecture Benchmark
            </h1>
            <p style={{ margin: 0, fontSize: 13, color: "#888780", maxWidth: 580 }}>
              How Amazon, Airbus, and Aircom handle the gap between AI decision criteria and current market conditions. Public data only — all Aircom findings are hypothesis-grade.
            </p>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {["EBT v2.6", "AI Adoption Architect v6.1", "McDonald (2026)"].map(tag => (
              <span key={tag} style={{
                background: "rgba(142,159,213,0.12)",
                border: "1px solid rgba(142,159,213,0.3)",
                borderRadius: 20,
                padding: "3px 10px",
                fontSize: 11,
                color: "#8E9FD5",
              }}>{tag}</span>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, marginTop: 20 }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              background: activeTab === t.id ? "rgba(255,255,255,0.08)" : "transparent",
              border: activeTab === t.id ? "1px solid rgba(255,255,255,0.12)" : "1px solid transparent",
              borderRadius: 6,
              padding: "6px 14px",
              fontSize: 13,
              color: activeTab === t.id ? "#FAF9F5" : "#888780",
              cursor: "pointer",
              transition: "all 0.15s",
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: "24px 32px" }}>

        {/* ── BENCHMARK TAB ── */}
        {activeTab === "benchmark" && (
          <div>
            {/* Column headers */}
            <div style={{ display: "grid", gridTemplateColumns: "180px 1fr 1fr 1fr", gap: 10, marginBottom: 8 }}>
              <div />
              {[
                { label: "Amazon", color: "#5DCAA5" },
                { label: "Airbus", color: "#AFA9EC" },
                { label: "Aircom", sub: "hypothesis — public data only", color: "#B4B2A9" },
              ].map(col => (
                <div key={col.label} style={{
                  background: col.label === "Amazon" ? "#085041" : col.label === "Airbus" ? "#3C3489" : "#444441",
                  border: `1px solid ${col.label === "Amazon" ? "#5DCAA5" : col.label === "Airbus" ? "#AFA9EC" : "#B4B2A9"}`,
                  borderRadius: 8,
                  padding: "10px 14px",
                  textAlign: "center",
                }}>
                  <div style={{ fontWeight: 600, fontSize: 14, color: col.color }}>{col.label}</div>
                  {col.sub && <div style={{ fontSize: 11, color: "#888780", marginTop: 2 }}>{col.sub}</div>}
                </div>
              ))}
            </div>

            {/* Layer rows */}
            {layers.map(layer => (
              <div key={layer.id} style={{ marginBottom: 6 }}>
                <div style={{
                  fontSize: 10,
                  color: "rgba(194,192,182,0.55)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  marginBottom: 4,
                  paddingLeft: 2,
                }}>{layer.label}</div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "180px 1fr 1fr 1fr",
                    gap: 10,
                    cursor: "pointer",
                  }}
                  onClick={() => setActiveLayer(activeLayer === layer.id ? null : layer.id)}
                >
                  {/* Layer label cell */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    padding: "0 10px",
                    fontSize: 12,
                    color: activeLayer === layer.id ? "#FAF9F5" : "#888780",
                    borderLeft: `2px solid ${activeLayer === layer.id ? "#8E9FD5" : "transparent"}`,
                    transition: "all 0.15s",
                  }}>
                    <span style={{ marginRight: 6, fontSize: 10, color: "#8E9FD5" }}>
                      {activeLayer === layer.id ? "▼" : "▶"}
                    </span>
                    Click to expand
                  </div>
                  <Cell data={layer.amazon} />
                  <Cell data={layer.airbus} />
                  <Cell data={layer.aircom} />
                </div>

                {/* Expanded detail panel */}
                {activeLayer === layer.id && (
                  <div style={{
                    background: "rgba(142,159,213,0.06)",
                    border: "1px solid rgba(142,159,213,0.2)",
                    borderRadius: 8,
                    padding: "14px 18px",
                    marginTop: 6,
                    fontSize: 13,
                    color: "#C2C0B6",
                    lineHeight: 1.7,
                  }}>
                    <span style={{ color: "#8E9FD5", fontWeight: 600, marginRight: 8 }}>Analysis:</span>
                    {layer.detail}
                  </div>
                )}
              </div>
            ))}

            {/* Separator */}
            <div style={{ height: 1, background: "rgba(222,220,209,0.1)", margin: "20px 0 16px" }} />

            {/* Overall readiness label */}
            <div style={{ fontSize: 10, color: "rgba(194,192,182,0.55)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>
              OVERALL CRITERIA DRIFT READINESS
            </div>

            {/* Score cards */}
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {scores.map(s => <ScoreCard key={s.org} s={s} />)}
            </div>

            {/* Gap callout */}
            <div style={{
              marginTop: 20,
              background: "#1E1E20",
              border: "1px solid rgba(222,220,209,0.12)",
              borderRadius: 10,
              padding: "16px 20px",
            }}>
              <div style={{ fontWeight: 600, fontSize: 14, color: "#FAF9F5", marginBottom: 6 }}>
                The architecture gap Chris confirmed
              </div>
              <p style={{ margin: 0, fontSize: 13, color: "#C2C0B6", lineHeight: 1.7 }}>
                Aircom audits what agents <strong style={{ color: "#FAF9F5" }}>DO</strong>. What it does not yet have is a parallel layer that continuously asks: <em style={{ color: "#9FE1CB" }}>are the criteria agents are following still calibrated to current market conditions?</em>
              </p>
            </div>

            {/* Sources */}
            <div style={{ marginTop: 16, fontSize: 11, color: "rgba(194,192,182,0.4)", lineHeight: 1.6 }}>
              Sources: Amazon AWS logistics architecture (public) · Airbus Skywise program (public) · Aircom platform (public-facing materials) · EBT Pathway 4 TCD / CES scoring: McDonald (2026)
            </div>
          </div>
        )}

        {/* ── DIAGNOSTIC QUESTIONS TAB ── */}
        {activeTab === "diagnostic" && (
          <div style={{ maxWidth: 760 }}>
            <p style={{ fontSize: 14, color: "#888780", marginBottom: 24, lineHeight: 1.7 }}>
              These three questions are designed for the 20-minute call with Chris Condon. Do not lead with the benchmark. Lead with Question 1 and let Chris answer. The posture throughout is diagnostic — you are naming the problem together, not grading him against a scorecard.
            </p>
            {diagnosticQs.map((q, i) => (
              <div key={i} style={{
                background: "#1E1E20",
                border: "1px solid rgba(222,220,209,0.1)",
                borderRadius: 10,
                padding: "20px 22px",
                marginBottom: 14,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#8E9FD5" }}>{q.q}</span>
                  <span style={{
                    background: "rgba(93,202,165,0.1)",
                    border: "1px solid rgba(93,202,165,0.25)",
                    borderRadius: 20,
                    padding: "2px 10px",
                    fontSize: 11,
                    color: "#5DCAA5",
                  }}>Aimed at: {q.stake}</span>
                </div>
                <p style={{ margin: "0 0 14px", fontSize: 14, color: "#F0EFE9", lineHeight: 1.7, fontStyle: "italic" }}>
                  "{q.text}"
                </p>
                <div style={{
                  background: "rgba(142,159,213,0.06)",
                  borderLeft: "3px solid #8E9FD5",
                  padding: "10px 14px",
                  borderRadius: "0 6px 6px 0",
                }}>
                  <span style={{ fontSize: 11, color: "#8E9FD5", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>Listen for: </span>
                  <span style={{ fontSize: 13, color: "#C2C0B6" }}>{q.listen}</span>
                </div>
              </div>
            ))}
            <div style={{
              background: "rgba(93,202,165,0.05)",
              border: "1px solid rgba(93,202,165,0.15)",
              borderRadius: 8,
              padding: "14px 18px",
              marginTop: 8,
              fontSize: 13,
              color: "#888780",
              lineHeight: 1.7,
            }}>
              <strong style={{ color: "#5DCAA5" }}>Call posture: </strong>
              If all three questions land with the same response you received on LinkedIn — acknowledgment without a concrete answer — the engagement conversation is earned. You are the person who named the problem correctly.
            </div>
          </div>
        )}

        {/* ── CONTEXT TAB ── */}
        {activeTab === "context" && (
          <div style={{ maxWidth: 760 }}>
            <div style={{ marginBottom: 28 }}>
              <h2 style={{ fontSize: 16, fontWeight: 600, color: "#FAF9F5", marginBottom: 12 }}>The core problem</h2>
              <p style={{ fontSize: 14, color: "#C2C0B6", lineHeight: 1.8, margin: 0 }}>
                Air freight AI quoting systems encode freight forwarder expertise as decision criteria. Those criteria are valid at encoding time. The problem is that air freight conditions — routing viability, spot rate differentials, carrier reliability, tariff classifications — change on a daily to weekly basis.
              </p>
              <p style={{ fontSize: 14, color: "#C2C0B6", lineHeight: 1.8, marginTop: 12, marginBottom: 0 }}>
                When a system has strong action audit architecture but lacks a parallel criteria validity loop, the result is a <strong style={{ color: "#FAC775" }}>Silent Distortion Window</strong> — a period during which the system produces confidently wrong outputs with no internal signal that anything has changed. Estimated at <strong style={{ color: "#F09B7B" }}>30–90 days</strong> in current air freight conditions.
              </p>
            </div>

            <div style={{ marginBottom: 28 }}>
              <h2 style={{ fontSize: 16, fontWeight: 600, color: "#FAF9F5", marginBottom: 14 }}>CES score interpretation</h2>
              {[
                { range: "80–100", label: "Self-correcting", desc: "Drift addressed before it reaches quote output", color: "#5DCAA5", bg: "rgba(8,80,65,0.4)" },
                { range: "60–79",  label: "Watch zone",      desc: "Governance review required on defined cadence",  color: "#EF9F27", bg: "rgba(99,56,6,0.4)" },
                { range: "40–59",  label: "Recalibration flag", desc: "Mandatory review before downstream decisions", color: "#F09B7B", bg: "rgba(113,43,19,0.4)" },
                { range: "< 40",   label: "Silent distortion active", desc: "Confident outputs likely miscalibrated — halt and audit", color: "#E24B4A", bg: "rgba(120,30,30,0.4)" },
              ].map(tier => (
                <div key={tier.range} style={{
                  background: tier.bg,
                  border: `1px solid ${tier.color}30`,
                  borderLeft: `3px solid ${tier.color}`,
                  borderRadius: "0 8px 8px 0",
                  padding: "10px 16px",
                  marginBottom: 8,
                  display: "flex",
                  gap: 16,
                  alignItems: "center",
                }}>
                  <span style={{ minWidth: 50, fontSize: 13, fontWeight: 700, color: tier.color }}>{tier.range}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#FAF9F5", minWidth: 160 }}>{tier.label}</span>
                  <span style={{ fontSize: 12, color: "#C2C0B6" }}>{tier.desc}</span>
                </div>
              ))}
              <div style={{ marginTop: 10, fontSize: 13, color: "#888780", fontStyle: "italic" }}>
                Aircom hypothesis CES: 42/100 — at the boundary of recalibration flag and silent distortion active. One regime event away from confirmed distortion.
              </div>
            </div>

            <div>
              <h2 style={{ fontSize: 16, fontWeight: 600, color: "#FAF9F5", marginBottom: 14 }}>Framework sources</h2>
              {[
                ["EBT Pathway 4 — Temporal Criteria Decay",    "McDonald, E.M. (February 2026)"],
                ["Criteria Expiration Score (CES)",             "McDonald, E.M. (March 2026)"],
                ["Behavioral Volatility Ceiling (BVC)",         "McDonald, E.M. (March 2026) — validated Thompson/Havas Edge"],
                ["Silent Distortion Window construct",          "McDonald, E.M. (March 2026)"],
                ["AI Adoption Architect v6.1 Layer 0B",         "McDonald, E.M. (2026)"],
                ["Fractional CXO Practice Builder v2.4",        "McDonald, E.M. (March 2026)"],
                ["Amazon logistics architecture",               "AWS Logistics Architecture whitepaper (public, 2023)"],
                ["Airbus Skywise program",                      "Airbus Skywise public documentation (2023–2024)"],
                ["MLOps feedback loop theory",                  "Sculley et al. — Hidden Technical Debt in ML Systems, Google (2015)"],
                ["Cybernetics / feedback loop foundations",     "Wiener (1948); Ashby (1956)"],
              ].map(([fw, cite]) => (
                <div key={fw} style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "9px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  gap: 16,
                  flexWrap: "wrap",
                }}>
                  <span style={{ fontSize: 13, color: "#C2C0B6" }}>{fw}</span>
                  <span style={{ fontSize: 12, color: "#888780", textAlign: "right" }}>{cite}</span>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: 24,
              padding: "14px 18px",
              background: "#1E1E20",
              border: "1px solid rgba(222,220,209,0.08)",
              borderRadius: 8,
              fontSize: 12,
              color: "rgba(194,192,182,0.5)",
              lineHeight: 1.7,
            }}>
              All Aircom findings represent a structured public-data hypothesis. Nothing in this dashboard reflects confirmed internal Aircom architecture. This package was developed to support a diagnostic conversation — not to assert findings as fact. · DACR License v2.6 · Behavioral Intelligence Research / Epoch Frameworks LLC
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
