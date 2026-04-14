<div align="center">

# Prove the Hypothesis Wrong

**Five specific data points that would move the Aircon CES score above 60**

---

![Framework](https://img.shields.io/badge/Framework-EBT_v2.6_×_CES_Methodology-8E9FD5?style=flat-square&labelColor=2D3436)
![Current Score](https://img.shields.io/badge/Current_CES-42_/_100-D85A30?style=flat-square&labelColor=2D3436)
![Target Score](https://img.shields.io/badge/Target_CES-60%2B-1D9E75?style=flat-square&labelColor=2D3436)
![Status](https://img.shields.io/badge/Status-Open_Challenge-BA7517?style=flat-square&labelColor=2D3436)

*This document is not a sales instrument.*  
*It is a structured invitation to disprove the analysis — with precise criteria for what that proof requires.*

</div>

---

## Why this document exists

The Aircon CES score of 42/100 was built entirely from public data — AWS architecture documentation, Airbus Skywise program records, IATA freight volatility data, and publicly available information about Aircon's platform architecture.

Public data has limits. It shows what is visible. It cannot confirm what is not disclosed.

This document identifies the five internal data points that would, if presented, move the CES score from 42 to above 60. Each challenge includes the exact evidence required, the score impact if confirmed, and the implication if the evidence is not available.

If all five challenges can be answered in a single conversation, no engagement is needed. Aircon has a validated governance artifact and a documented CES above 60 — which is itself a competitive differentiator in a market where AI governance is becoming a procurement criterion.

If the answers are not immediately available, that absence is the finding.

---

## The scoring model

The CES (Criteria Expiration Score) is a five-layer architecture assessment. Each layer is scored independently. The Aircon hypothesis scores are shown below alongside the confirmed layer.

| Layer | Description | Aircon hypothesis score | Max available |
|---|---|---|---|
| L1 — Action Audit | Agent decision logging and queryability | **20 / 20** ✅ Confirmed | 20 |
| L2 — Criteria Validity Loop | Mechanism for re-scoring criteria against outcomes | **0 / 25** ⚠️ Not evidenced | 25 |
| L3 — Regime Change Protocol | Named trigger for macro-event-driven criteria review | **0 / 20** ⚠️ Not evidenced | 20 |
| L4 — Signal Volatility Handling | Live market signal injection at the decision layer | **0 / 20** ⚠️ Not evidenced | 20 |
| L5 — Silent Distortion Window | Active drift detection and confidence calibration | **22 / 15** ⚠️ Estimated 30–90 day window | 15 |
| **Total** | | **42 / 100** | **100** |

> L5 scores below zero contribution when the estimated SDW exceeds 30 days, per the CES penalty model. A confirmed 30–90 day window produces a negative adjustment that partially offsets the L1 score.

---

## Challenge 1 — Criteria Review Cadence

**Layer affected:** L2 — Criteria Validity Loop  
**Score impact if confirmed:** +25 points → overall CES rises to ~67 (Watch zone)  
**Score impact if not available:** L2 holds at 0

### The challenge

> *Show a documented cadence — monthly, quarterly, or event-triggered — for reviewing whether the AI quoting system's decision criteria are still calibrated to current air freight market conditions.*

The documentation does not need to be formal. It can be a Confluence page, a Slack channel with a recurring reminder, a quarterly engineering review agenda item, or an email thread. The format is irrelevant. What matters is that a cadence exists, someone owns it, and it has been followed at least once since Q1 2024.

### What confirmation looks like

- A named owner for criteria review
- A defined frequency or trigger condition
- Evidence that at least one review occurred after a market regime event (Red Sea disruption, tariff acceleration, carrier consolidation)

### What confirmation produces

L2 moves from 0 to 25. The overall CES score rises from 42 to approximately 67. At 67, Aircon is in the Watch zone — governance review required on a defined cadence, but no active distortion signal. This is a defensible position for a board or investor audience.

### What absence means

If no cadence exists or can be documented, the criteria validity loop is confirmed open. The system has been operating without a mechanism to ask whether its decision rules are still true. Every quote produced since the last implicit calibration carries undisclosed drift risk.

---

## Challenge 2 — Regime Change Trigger

**Layer affected:** L3 — Regime Change Protocol  
**Score impact if confirmed:** +20 points → overall CES rises toward ~72 (Watch zone, upper bound)  
**Score impact if not available:** L3 holds at 0, SDW penalty deepens

### The challenge

> *Show a named protocol — in any format — that fires when a macro-level event occurs and forces a criteria audit before the system continues producing quotes under the prior criteria set.*

The trigger does not need to be automated. A manual process with a named owner is sufficient to score this layer. What is required is evidence that the organization has defined what constitutes a regime event and has a documented response.

### Regime events that should have triggered this protocol

Between Q4 2023 and Q2 2025, the following events occurred — each one moving the air freight operating environment materially away from any prior criteria baseline:

| Date | Event |
|---|---|
| Oct 2023 | Red Sea escalation — routing viability of 12+ freight lanes changed overnight |
| Jan 2024 | Houthi attack intensification — Asia-Europe air freight spike 22% |
| Mar 2024 | Tariff reclassification wave — HTS code changes across 800+ SKU categories |
| Jan 2025 | Tariff acceleration — new schedule invalidated prior-year classification criteria |
| Mar 2025 | Red Sea partial normalization — routing viability criteria shifted again, opposite direction |

### What confirmation looks like

- A named event type definition (what qualifies as a regime event)
- A named response owner or team
- Evidence the protocol was invoked at least once across the events listed above

### What confirmation produces

L3 moves from 0 to 20. Combined with a confirmed L2, the overall CES score approaches 72. At this score, Aircon is in the upper Watch zone — a strong governance posture that benchmarks favorably against most logistics AI operators.

### What absence means

Without a regime change trigger, each of the five events listed above passed through the system as invisible. The criteria set encoded before the Red Sea escalation continued optimizing without adjustment through 18 months of structural market change. The Silent Distortion Window penalty in L5 deepens accordingly.

---

## Challenge 3 — Feedback Loop Destination

**Layer affected:** L2 — Criteria Validity Loop (additional credit)  
**Score impact if confirmed:** L2 receives supplemental credit, estimated CES rises to 78–82 (Self-correcting threshold)  
**Score impact if not available:** Loop confirmed open at criteria layer

### The challenge

> *Show where quote outcome divergence signals go. When actual cost or routing outcome diverges significantly from what the model predicted, does that signal route back to the criteria layer and update decision weights — or does it go only to the performance log and reporting dashboard?*

This is the architectural distinction between a system that learns from its errors and a system that records them. Both produce audit trails. Only one closes the loop.

### The two architectures

**Loop-closed (criteria layer destination):**
Quote outcome → divergence detected → signal routes to criteria re-scoring → decision weights updated → next quote operates on recalibrated criteria

**Loop-open (reporting layer destination):**
Quote outcome → divergence detected → signal routes to performance log → dashboard shows accuracy metrics → criteria layer unchanged → next quote operates on same criteria

Both architectures produce the same audit trail. Only one prevents criteria drift from compounding.

### What confirmation looks like

- A named data pipeline or process that routes quote outcome signals to the criteria layer
- Evidence that at least one divergence event triggered a criteria update (not just a performance flag)
- Architectural documentation showing the feedback path — even a diagram or engineering ticket is sufficient

### What confirmation produces

L2 receives full credit including the feedback loop component. With L2, L3, and partial L4 confirmed, the overall CES score reaches the 78–82 range — within or approaching the self-correcting threshold. This is a strong competitive position and a board-level governance story.

### What absence means

The performance log receives the signal. The criteria layer does not. This means the system accumulates evidence of its own miscalibration in one database while continuing to produce miscalibrated outputs from another. The divergence is documented but not acted on at the source.

---

## Challenge 4 — Signal Volatility Architecture

**Layer affected:** L4 — Signal Volatility Handling  
**Score impact if confirmed:** +20 points → full CES score approaches 85+ (Self-correcting)  
**Score impact if not available:** L4 holds at 0, BVC exceedance confirmed

### The challenge

> *Show how live spot rate or carrier reliability signals are injected at the decision layer — not the audit log, the performance dashboard, or a weekly reporting cycle. The decision layer specifically.*

Air freight currently operates above the Behavioral Volatility Ceiling (BVC) — the threshold at which signal change velocity exceeds the recalibration capacity of any scheduled review cycle. Spot rates can move 15–30% within a single week during disruption events. A system that ingests these signals at the reporting layer but not the decision layer is operating on stale inputs regardless of how frequently it is reviewed.

### The distinction that matters

**Decision layer injection:**
Live signal → criteria weighting at quote generation time → quote reflects current market conditions

**Reporting layer injection:**
Live signal → dashboard and analytics → visible to operators → does not affect quote generation criteria unless manually updated

Amazon achieves decision layer injection through co-located real-time data infrastructure. Airbus achieves it through tiered signal architecture that separates fast-changing operational signals from slower-moving strategic criteria. Either approach is sufficient to score L4.

### What confirmation looks like

- A named data feed or API that provides live spot rates, carrier reliability scores, or routing viability signals
- Evidence that this feed connects to the criteria or weighting layer used at quote generation — not only to reporting
- Any architectural documentation showing the signal path from ingestion to decision

### What confirmation produces

L4 moves from 0 to 20. Combined with confirmed L2 and L3, the overall CES score reaches 85 or above — in the self-correcting range. Drift is addressed before it reaches quote output. This is the Amazon/Airbus benchmark position.

### What absence means

The system produces quotes using criteria calibrated to conditions that no longer exist. The more volatile the current market — and Q1–Q2 2025 is among the most volatile air freight periods on record — the wider the gap between what the system believes is true and what the market is actually doing.

---

## Challenge 5 — Last Recalibration Date

**Layer affected:** L5 — Silent Distortion Window (penalty reduction)  
**Score impact if confirmed:** Depends on date; within 30 days removes L5 penalty entirely  
**Score impact if not available:** Absence of date is itself a high-confidence confirmation of active distortion

### The challenge

> *State the date the underlying decision criteria — the rules and weightings the AI system uses to generate quotes — were last reviewed and updated against current air freight market conditions.*

This is the simplest challenge in this document. It requires one date. No documentation, no architecture diagrams, no pipeline specifications. Just a date.

### Score interpretation by date

| Last recalibration date | CES interpretation |
|---|---|
| Within the past 30 days | L5 penalty removed. Strong governance signal. |
| 31 to 60 days, with no intervening regime event | Watch zone. Acceptable with defined next review. |
| 31 to 60 days, with an intervening regime event | Recalibration flag. Event should have triggered a review. |
| 61 to 90 days | Recalibration flag confirmed. Silent Distortion Window likely active. |
| Beyond 90 days | Silent distortion active. Confident outputs operating on materially stale criteria. |
| Date unknown | This is the highest-confidence finding in this document. If the date cannot be stated, the criteria validity loop does not exist in a form that produces a traceable record. |

### Why this matters more than it appears

The last recalibration date is a proxy for the entire governance architecture. A team with a functioning criteria validity loop, a regime change protocol, and a live signal pipeline knows this date immediately — because those systems produce it as a natural output. A team without those systems does not know it — not because the information is sensitive, but because nothing in the architecture tracks it.

The question is not a trap. It is a diagnostic instrument. The answer, or the inability to answer, tells the same story as all five layers of the CES assessment combined.

---

## Score trajectory summary

| Challenges confirmed | Layers affected | Estimated CES | Classification |
|---|---|---|---|
| None (current hypothesis) | L1 only | 42 | Recalibration flag |
| Challenge 1 only | L1 + L2 | ~67 | Watch zone |
| Challenges 1 + 2 | L1 + L2 + L3 | ~72 | Watch zone (upper) |
| Challenges 1 + 2 + 3 | L1 + L2 (full) + L3 | ~80 | Self-correcting threshold |
| Challenges 1 + 2 + 3 + 4 | L1–L4 | ~85 | Self-correcting |
| All five confirmed | L1–L5 (penalty removed) | 90+ | Amazon/Airbus benchmark range |

---

## The posture behind this document

This analysis was built without access to Aircon's internal architecture. It may be wrong on any of the four unconfirmed layers. The hypothesis is structured to be falsifiable — and this document is the falsification protocol.

The diagnostic sprint exists to answer these five questions with internal data rather than public inference. If all five can be answered in a single conversation, the sprint is unnecessary and Aircon has a validated governance artifact it did not have before. If the answers require investigation to produce, the sprint is the fastest and most cost-effective path from a 42 to an 85.

Either outcome has value. Neither requires a leap of faith.

---

<div align="center">

![IP Protected](https://img.shields.io/badge/IP_Protected-GitHub_Timestamped-2D3436?style=flat-square)
![Attribution Required](https://img.shields.io/badge/Attribution_Required-McDonald_(2026)-2D3436?style=flat-square)
![License](https://img.shields.io/badge/License-DACR_v2.6-1D9E75?style=flat-square&labelColor=2D3436)

*All Aircon findings represent a structured public-data hypothesis.*  
*Nothing in this document reflects confirmed internal Aircon architecture.*

**Behavioral Intelligence Research / Epoch Frameworks LLC**  
Erwin Maurice McDonald — AI Adoption Architect  
DACR License v2.6 | McDonald (2026)

[← Back to README](../README.md)

</div>
