# Aircom — Diagnostic Questions for Chris Condon
**Prepared by:** Erwin Maurice McDonald, AI Adoption Architect  
**Framework:** EBT v2.6 (Pathway 4 — Temporal Criteria Decay) × AI Adoption Architect v6.1  
**Date:** April 2026  
**Evidence basis:** Public data only. All Aircom inferences are hypothesis-grade until confirmed.

---

## The core problem we are diagnosing

Aircom has confirmed audit trail architecture for what agents *do*. The open question is whether Aircom has a parallel layer that continuously asks: **are the criteria agents are following still calibrated to current market conditions?**

In air freight right now — Red Sea routing disruptions, accelerated tariff changes, carrier capacity shifts — the gap between when criteria were encoded and when they are being applied can produce confidently wrong outputs with no internal signal that anything has changed. This is what the research calls a **Silent Distortion Window**.

---

## Question 1 — Criteria Governance
**For the CTO or VP Engineering**

> "When a macro event changes the routing or pricing landscape — the Red Sea is the obvious example — what is the mechanism that tells the system the criteria it was built on need to be revisited?"

### What a strong answer sounds like
A named process, a named owner, and a defined trigger. Something like: "We have a signal monitoring layer that watches for defined threshold breaks in spot-rate variance, and that automatically queues a criteria review with a named owner on the ops team."

### What a concerning answer sounds like
A general statement: "We monitor conditions and update accordingly." No named process. No named owner. No trigger definition.

### Why this question matters to the CFO
Every quote the system produces against miscalibrated criteria is a pricing risk. In air freight at current volatility, a 60-day-old criteria set applied to today's market can produce quotes that either leave margin on the table or price the company out of deals. Neither shows up as an error in the audit trail — it shows up as lost revenue or margin compression.

---

## Question 2 — Feedback Loop Architecture
**For the CTO or Chief Product Officer**

> "When a quote goes out and the actual cost or routing outcome diverges significantly from what the model predicted, where does that signal go? Does it go back to the criteria layer or only to the performance log?"

### What a strong answer sounds like
The variance signal closes the loop at the criteria layer — meaning the system asks "was this prediction wrong because conditions changed?" before it asks "did the agent execute correctly?" These are two different questions requiring two different architectures.

### What a concerning answer sounds like
The variance goes to a dashboard or performance report that humans review periodically. Humans then decide whether to update criteria. This is a governance meeting cadence, not a feedback loop. In a domain where signal changes daily, that gap is the problem.

### Why this question matters to the COO
Amazon's logistics AI closes this loop at the transaction level — within hours. Airbus closes it at the program level — within weeks. A system that only closes it at the governance level — quarterly or less — is running on criteria that may be significantly stale relative to the market it is quoting into.

---

## Question 3 — Silent Distortion Window
**For the CEO or CTO — the hardest question**

> "What would a 60-day-old criteria set produce in today's market — and how would you know?"

### What a strong answer sounds like
They have a concrete answer. They have either run this test, built a simulation layer that allows it, or have a monitoring system that would have surfaced the drift before 60 days elapsed.

### What a concerning answer sounds like
The question produces a pause. They have not asked it this way before. They may acknowledge that the audit trail would not surface this — because the audit trail shows whether agents followed the criteria, not whether the criteria were right.

### Why this question matters at the board level
The competitive exposure here is not a technical failure — it is a market intelligence failure. A system that produces 7,000+ quotes per day against criteria that are no longer calibrated to market conditions is not just a margin risk. It is a market position risk. Competitors with live criteria calibration layers are quoting more accurately on the same lanes.

---

## Benchmark context for the conversation

| Layer | Amazon | Airbus | Aircom hypothesis |
|---|---|---|---|
| Action audit | Full, real-time | Full, event log | Confirmed |
| Criteria validity loop | Transaction-level (hours) | Program-level (weeks) | Not evidenced |
| Regime change protocol | Embedded in infrastructure | Explicit post-COVID trigger | Not evidenced |
| Signal volatility handling | Real-time at decision layer | Tiered by signal speed | Not evidenced |
| Silent distortion window | Hours to days | Days to weeks | Est. 30–90 days |

**Sources:** Amazon AWS logistics architecture (public, 2023); Airbus Skywise program documentation (public); EBT Pathway 4 TCD / CES scoring: McDonald, E.M. (2026).

---

## How to use this in the 20-minute call

Do not lead with the benchmark. Lead with Question 1. Let Chris answer. The benchmark is context you introduce only if he asks how other organizations handle it — which he likely will, because he already acknowledged the gap is real.

Your posture throughout: you are diagnosing together, not auditing him. The three questions are a shared framework for naming what we are both looking at — not a scorecard you are grading him against.

If all three questions land with the same answer you received on LinkedIn, the engagement conversation is earned.

---

*Framework attribution: EBT v2.6 — Temporal Criteria Decay (Pathway 4) × AI Adoption Architect v6.1 — MLOps Operationalization Audit (Layer 0B) × Fractional CXO Practice Builder v2.4 — Pilot-to-Production Gate. McDonald, E.M. (2026). DACR License v2.6.*
