# Aircon — Diagnostic Questions for Chris Condon
**Prepared by:** Erwin Maurice McDonald, AI Adoption Architect  
**Framework:** EBT v2.6 (Pathway 4 — Temporal Criteria Decay) × AI Adoption Architect v6.4 (Layer 0C — CGM) × Fractional CXO Practice Builder v2.5 (Layer 5 — CES)  
**Date:** April 2026  
**Evidence basis:** Public data only. All Aircon inferences are hypothesis-grade until confirmed.

---

## The core problem we are diagnosing

Aircon has confirmed audit trail architecture for what agents *do*. The open question is whether Aircon has a parallel layer that continuously asks: **are the criteria agents are following still calibrated to current market conditions?**

In air freight right now — Red Sea routing disruptions, accelerated tariff changes, carrier capacity shifts — the gap between when criteria were encoded and when they are being applied can produce confidently wrong outputs with no internal signal that anything has changed. This is what the research calls a **Silent Distortion Window**, and it is the precise gap that the HUMINT Chameleon Governance Model (CGM) Layer B — Criteria Drift Detection — is designed to measure and close.

The deeper diagnosis here is not whether the system is auditable. It is whether the system is **self-correcting**. An audit trail shows you what the agent decided. It cannot tell you whether the criteria governing that decision were still valid for the conditions in which the decision was made. These are two architecturally different questions — and almost every enterprise AI deployment answers only the first one.

---

## Question 1 — Criteria Drift Detection (CGM Layer B)
**For the CTO or VP Engineering**

> "When a macro event changes the routing or pricing landscape — the Red Sea is the obvious example — what is the mechanism that tells the system the criteria it was built on need to be revisited? Is there a documented threshold at which a condition change triggers a recalibration review, and is there a named human owner responsible for executing it?"

### What a strong answer sounds like
A named process, a named owner, and a defined trigger. Something like: "We have a signal monitoring layer that watches for defined threshold breaks in spot-rate variance, and that automatically queues a criteria review with a named owner on the ops team. The baseline conditions at criteria-setting are documented, so we can compare current operating conditions against them explicitly."

### What a concerning answer sounds like
A general statement: "We monitor conditions and update accordingly." No documented baseline. No named drift threshold. No named owner. No recalibration audit trail. This is not a criteria drift detection mechanism — it is a governance meeting cadence. In a domain where signal changes daily, that gap is a structural EBT v2.6 Objectivity Laundering risk: stale criteria are being laundered into production decisions with the appearance of systematic governance.

### Why this question matters to the CFO
Every quote the system produces against miscalibrated criteria is a pricing risk. In air freight at current volatility, a 60-day-old criteria set applied to today's market can produce quotes that either leave margin on the table or price the company out of deals. Neither shows up as an error in the audit trail — it shows up as lost revenue or margin compression. A CDD score below 20/50 on the CGM matrix means this risk is not being managed. It is being assumed away.

---

## Question 2 — Feedback Loop Architecture & CLDA Ownership (Layer 0B × CLDA)
**For the CTO or Chief Product Officer**

> "When a quote goes out and the actual cost or routing outcome diverges significantly from what the model predicted, where does that signal go? Does it close the loop at the criteria layer — triggering a review of whether the criteria were still valid — or does it only flow to a performance log that a human reviews periodically? And critically: who owns the decision to recalibrate, what is the metric that triggers it, and what is the enforcement mechanism if it does not happen?"

### What a strong answer sounds like
The variance signal closes the loop at the criteria layer — the system asks "was this prediction wrong because conditions changed?" before it asks "did the agent execute correctly?" These are architecturally distinct questions. A strong answer also names a specific human owner for recalibration decisions (not a team or a process — a person), a defined metric that triggers the recalibration review, and an enforcement mechanism that ensures the review actually happens. This maps to the CLDA architecture: Ownership (IEA), Metric (AIS), Feedback-Loop Enforcement (APVL).

### What a concerning answer sounds like
The variance goes to a dashboard or performance report that humans review periodically. Humans then decide whether to update criteria. This is a governance meeting cadence, not a feedback loop. If there is no named owner, the Closed-Loop Decision Architecture (CLDA) has a fatal gap: a high-quality recommendation exists on paper with no human accountability for executing it. The failure mode is not bad data — it is responsibility displacement. The system produces the signal; no named person closes the loop.

### Why this question matters to the COO
Amazon's logistics AI closes this loop at the transaction level — within hours. Airbus closes it at the program level — within weeks. A system that only closes it at the governance level — quarterly or less — is running on criteria that may be significantly stale relative to the market it is quoting into. The CLDA sub-module exists precisely to prevent this: high-scoring outputs being generated with no named human owner, no enforced metric, and no feedback-loop accountability. Without it, production AI produces the appearance of governance without the substance.

---

## Question 3 — Trust Velocity Calibration and the Silent Distortion Window (CGM Layer C × CGM Layer B)
**For the CEO or CTO — the hardest question**

> "What would a 60-day-old criteria set produce in today's market — and how would you know? Does your system behave differently on day 1 of deployment versus day 180 — and if it does not, is that because it has earned the right to operate at the same confidence level, or because no one has built the mechanism to adjust it?"

### What a strong answer sounds like
They have a concrete answer to the first part — they have either run this test, built a simulation layer that allows it, or have a monitoring system that would have surfaced the drift before 60 days elapsed. On the second part, they describe a Trust Velocity Calibration (TVC) mechanism: defined confidence tiers (autonomous / recommend+confirm / escalate), an error-cost map tied to each tier, and a documented protocol for expanding autonomous action thresholds as the system builds a validated track record. The system is more assertive on day 180 than day 1 — and there is a defined architecture for why.

### What a concerning answer sounds like
The first question produces a pause. They have not asked it this way before. They may acknowledge that the audit trail would not surface this — because the audit trail shows whether agents followed the criteria, not whether the criteria were right. On the second question: the system behaves identically at all stages of deployment because there is no TVC mechanism. This is either over-assertion early (before trust is earned) or under-assertion late (leaving autonomous value unrealized). A CGM TVC score below 20/50 means confidence calibration is static, not dynamic — and the governance assumption is that the criteria were right at encoding and have remained right since.

### Why this question matters at the board level
The competitive exposure is not a technical failure — it is a market intelligence failure. A system that produces 7,000+ quotes per day against criteria that are no longer calibrated to market conditions is not just a margin risk. It is a market position risk. Competitors with live criteria calibration layers are quoting more accurately on the same lanes. And a board that asks only "is the audit trail clean?" is asking the second question when the first question — "are the criteria the agents are following still valid?" — has not been answered. That is the distinction between an action audit and a criteria validity audit. The CGM Maturity Score exists to make this distinction measurable, not just arguable.

---

## CES / CGM Scoring Context for the Conversation

| CGM Dimension | What Aircon likely has | Risk if absent |
|---|---|---|
| **Criteria Drift Detection (CDD)** | Not evidenced | Silent Distortion Window est. 30–90 days; EBT Objectivity Laundering flag |
| **Trust Velocity Calibration (TVC)** | Not evidenced | Static confidence posture regardless of deployment age or market shift |
| **Stakeholder Persona Mapping (SPM)** | Partial (ops vs. commercial) | Criteria miscalibration masked by role-level output similarity |
| **CLDA — Named Ownership** | Not evidenced | High-quality recommendations with no human accountability to execute them |
| **CLDA — Metric Trigger** | Not evidenced | Recalibration governed by meeting cadence, not signal threshold |

**Benchmark context:**

| Layer | Amazon | Airbus | Aircon hypothesis |
|---|---|---|---|
| Action audit | Full, real-time | Full, event log | Confirmed |
| Criteria validity loop (CDD) | Transaction-level (hours) | Program-level (weeks) | Not evidenced |
| Regime change protocol | Embedded in infrastructure | Explicit post-COVID trigger | Not evidenced |
| Trust velocity calibration (TVC) | Real-time at decision layer | Tiered by signal speed | Not evidenced |
| Silent distortion window | Hours to days | Days to weeks | Est. 30–90 days |
| Named recalibration owner (CLDA) | Automated + named ops team | Program manager layer | Not evidenced |

**Sources:** Amazon AWS logistics architecture (public, 2023); Airbus Skywise program documentation (public); EBT Pathway 4 TCD / CES scoring: McDonald, E.M. (2026); CGM × CLDA architecture: AI Adoption Architect v6.4 × Fractional CXO Practice Builder v2.5 — McDonald (2026).

---

## How to use this in the 20-minute call

Do not lead with the benchmark or the scoring model. Lead with Question 1. Let Chris answer. The CGM framework is context you introduce only if he asks how other organizations handle it — which he likely will, because he already acknowledged the gap is real.

The language shift from v6.1 to v6.4 matters here: you are no longer asking about "criteria governance" in the abstract. You are diagnosing against three specific, nameable sub-layers — CDD, TVC, and CLDA ownership. Each question maps to one. If all three produce the same gap pattern you received on LinkedIn, the engagement conversation is earned — and you can name exactly what layer of the CGM architecture the engagement is designed to build.

Your posture throughout: you are diagnosing together, not auditing him. The three questions are a shared framework for naming what we are both looking at — not a scorecard you are grading him against.

---

*Framework attribution: EBT v2.6 — Temporal Criteria Decay (Pathway 4) × AI Adoption Architect v6.4 — Layer 0C HUMINT Chameleon Governance Model (CGM): CDD, TVC, SPM; Layer 0B MLOps Feedback Loop Architecture; CLDA — Ownership, Metric, Feedback-Loop Enforcement × Fractional CXO Practice Builder v2.5 — Layer 5 CES: Criteria Evaluation Score × CGM Composite. McDonald, E.M. (2026). DACR License v2.6.*
