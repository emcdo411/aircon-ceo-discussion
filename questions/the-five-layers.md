<div align="center">

# The Five Layers — Plain Language Guide

**What the architecture benchmark means in business terms**  
**For CFO, COO, CPO, and non-technical executive audiences**

---

![Audience](https://img.shields.io/badge/Audience-C--Suite_Non--Technical-8E9FD5?style=flat-square&labelColor=2D3436)
![Context](https://img.shields.io/badge/Context-Aircon_Criteria_Drift_Diagnostic-534AB7?style=flat-square&labelColor=2D3436)
![Framework](https://img.shields.io/badge/Framework-EBT_v2.6_×_CES_×_CGM_v2.5-2D3436?style=flat-square)
![Date](https://img.shields.io/badge/Prepared-April_2026-2D3436?style=flat-square)

*This document translates the five-layer architecture benchmark into business language.*  
*No technical background is required to understand the risk each layer describes.*

</div>

---

## How to read this document

The architecture benchmark compares Aircon's AI quoting system against Amazon and Airbus across five governance layers. Each layer answers a different question about how well the system keeps itself calibrated to current market conditions.

The five layers are organized under two governing questions. The first question — *is the system doing what it was told to do?* — is answered by the Action Audit. The remaining four layers address the second, harder question: *is what the system is being told to do still correct?*

That second question is what the **Criteria Evaluation Score (CES)** is designed to measure. CES is a 0-100 governance benchmark built on three dimensions: whether the system is observing the right signals (Telemetry Capture), whether its decision rules are still valid for current conditions (Criteria Validity), and whether it has a mechanism to update itself when conditions shift (the Recalibration Loop — which, when a full governance audit is run, is scored through the **HUMINT Chameleon Governance Model**, or CGM). Layers 2 through 5 in this document each correspond to one of those dimensions, or to the sub-layers within them.

This document explains what each layer means, why it matters to your business, and what a real-world failure looks like when the layer is missing. Every example uses an analogy from a business context you already understand.

---

## Layer 1 — Action Audit
*CES dimension: Foundation (prerequisite to all scoring)*

### What the technical language means

The system keeps a complete record of every decision it makes — every quote it generates, every routing option it selected, every price it calculated — and that record is queryable in real time.

### The business analogy

Think of it as a security camera system for your AI. Every transaction is recorded. If a quote goes wrong, you can rewind the tape and see exactly what the system did, when it did it, and what inputs it was working from at the time.

### Why it matters

Without an action audit, when something goes wrong you have no way to determine whether the error was a one-time anomaly or a systematic pattern. You cannot defend a pricing decision to a customer, cannot identify where a margin leak started, and cannot demonstrate to a regulator or auditor that the system behaved as intended.

### Where Aircon stands

**Confirmed strength.** Chris Condon confirmed that Aircon has full action audit architecture. The system records what it does. This is the foundation everything else is built on.

### The key insight

An action audit tells you **what the system did**. It does not tell you whether **what the system was told to do** was still the right thing to do. The CES framework — and Layers 2 through 5 — exist to answer that question. A system can have a perfect action audit and a CES score of zero. The audit shows compliance. CES shows whether the criteria being complied with were still valid.

---

## Layer 2 — Criteria Validity Loop
*CES dimension: Criteria Validity (35%) + Recalibration Loop (30%)*

### What the technical language means

A mechanism that continuously checks whether the rules and weightings the AI uses to make decisions are still accurate given current market conditions — and a defined process that updates them when they are not. In the CGM framework, this is **Criteria Drift Detection (CDD)**: an active feedback loop that continuously asks whether the criteria governing decisions were set under conditions that still resemble today's operating environment.

### The business analogy

Imagine you hire a team of expert freight forwarders and spend six months interviewing them to capture everything they know — their rules of thumb, their lane preferences, their pricing instincts, their carrier relationships. You encode all of that knowledge into your AI system. On day one, the system is exceptionally well-calibrated because it reflects the best thinking of your best people at that moment in time.

Now imagine those experts go on a two-year sabbatical. The market moves. Red Sea routes close. Tariff schedules change. Three carriers consolidate into two. But the AI keeps quoting based on what the experts knew two years ago — because nobody has gone back to update its knowledge.

A criteria validity loop is the mechanism that brings those experts back into the room on a regular basis — or better yet, builds a system that updates automatically when market conditions shift beyond a defined threshold. **CDD is the named architecture for that mechanism.** Without it, the AI is permanently quoting from a snapshot of the market that no longer exists — and producing that output with full confidence because nothing inside the system knows the snapshot is stale.

This is what the CES framework calls an **Objectivity Laundering** risk: stale criteria being applied to current decisions with the appearance of systematic governance. The system is not malfunctioning. It is functioning exactly as designed. The design is the problem.

### Why it matters to the CFO

Every quote the system produces against outdated criteria carries hidden margin risk. The quotes do not look wrong — the system is highly confident in them. But confident and correct are two different things when the underlying rules have not kept pace with the market. The financial exposure compounds silently across every quote in the portfolio until someone notices that win rates are declining or margins are compressing — by which point months of drift have already accumulated.

A CDD score below 20/50 on the CGM diagnostic matrix means this risk is not being managed. It is being assumed away.

### Where Aircon stands

**Not evidenced publicly.** The diagnostic conversation will determine whether a criteria validity loop — and a named recalibration owner — exist in any form: automated, manual, or hybrid.

### The key question for your team

*When did we last formally review whether the rules our AI is following still match what our best freight forwarders would recommend today — and who was named as the owner of that review?* If the answer requires investigation to produce, the loop is open and ownership is diffuse.

---

## Layer 3 — Regime Change Protocol
*CES dimension: Criteria Validity (35%) — high-severity trigger condition*

### What the technical language means

A named, documented process that fires automatically — or is triggered by a defined event — when a major market disruption occurs, forcing a review of the AI's decision criteria before it continues quoting under the prior rules. In the CGM framework, this is the highest-severity activation of **Criteria Drift Detection**: a threshold breach so significant that normal drift monitoring is insufficient and a full recalibration review is mandatory before the system continues operating.

### The business analogy

Think of this as a circuit breaker for your AI's rule set.

Every experienced freight forwarder knows that certain events change everything — not gradually, but overnight. The Red Sea closure was one. A major carrier bankruptcy is another. A new tariff schedule that reclassifies hundreds of product categories is another. When those events happen, a skilled human would not keep quoting using last week's assumptions. They would stop, reassess, and update their mental model before going back to the market.

A regime change protocol gives your AI the equivalent of that instinct. It defines in advance: *these are the events that require us to pause and recalibrate before continuing to quote.* Without it, the AI has no concept of "the world just changed significantly." It keeps quoting at full confidence using rules that were written for a world that no longer exists.

The CGM framework adds a critical dimension here: a regime change protocol is only effective if there is a **named human owner** responsible for executing it. A documented process with no named owner is not a protocol — it is a policy document. In the Closed-Loop Decision Architecture (CLDA), every recalibration trigger must map to a specific person, a defined metric that fires the trigger, and an enforcement mechanism that confirms the review actually happened.

### Why it matters to the COO

Between October 2023 and April 2025, the air freight market experienced at least eight events that materially changed the operating environment — routing disruptions, tariff accelerations, carrier consolidations, and demand surges that exceeded historical baselines. Each one moved the market away from whatever criteria baseline was in place at the time. A system without a regime change protocol — and without a named owner accountable for recalibration — absorbed all eight events silently and kept quoting.

The operational risk is not just margin. It is customer trust. A quote that wins the business but cannot be executed at the promised price is worse than a quote that loses the deal.

### Where Aircon stands

**Not evidenced publicly.** The diagnostic conversation will determine whether any trigger mechanism exists — formal or informal — for regime-level market events, and whether a named owner is attached to that trigger.

### The key question for your team

*When the Red Sea disruption hit in late 2023, did anyone formally review whether our AI's routing and pricing criteria needed to be updated before we continued quoting on affected lanes — and can you name the person who owned that review?* A yes with a named owner and a documented outcome means the protocol exists informally. A no — or an "I'm not sure" — means the AI quoted through a major regime event without recalibration and without accountability.

---

## Layer 4 — Signal Volatility Handling
*CES dimension: Telemetry Capture (35%)*

### What the technical language means

The architecture that determines whether live market data — current spot rates, real-time carrier reliability scores, up-to-the-minute routing viability — is fed into the AI at the point where it makes decisions, or only captured afterward in reports and dashboards. In CES terms, this is **Telemetry Capture**: not just whether the system is observing signals, but whether it is observing the *right* signals for the conditions it is currently operating in — and routing those signals to the decision layer rather than the reporting layer.

### The business analogy

Imagine two versions of your sales team.

Version A receives a live market feed on their laptops. When they sit down to quote a customer, they can see today's spot rates, this week's carrier capacity, and current routing conditions. Every quote they produce reflects the market as it exists right now.

Version B works from a weekly briefing document. The document is accurate as of the day it was written. By the time a salesperson in Version B quotes a customer on Thursday, they are working from Monday's data — or last month's data if the briefing cadence slips. They are confident in their quotes because the briefing told them to be. But their confidence is calibrated to a market snapshot that is already stale.

Signal volatility handling is the architecture that determines which version your AI is. A system with strong signal handling is Version A — live data at the point of decision. A system without it is Version B — historical data dressed up as current intelligence.

The CES framework adds one layer of precision here: **signal relevance matters as much as signal freshness.** A system can ingest live data and still have a low Telemetry Capture score if the signals it is observing are not the right proxies for the conditions that actually drive its decisions. The diagnostic question is not just "how fresh is the data?" It is "are we measuring what actually drives quote accuracy in the current operating environment — and does that measurement reach the decision layer before the quote is produced?"

### Why it matters to the CPO

Air freight is one of the most signal-volatile markets in global logistics. Spot rates can move 15 to 30 percent within a single week during disruption events. Carrier reliability scores shift with weather, labor actions, and equipment availability in near real time. A quoting system that ingests these signals into a weekly report but does not feed them to the decision layer is systematically behind the market — not because the data does not exist, but because the architecture does not route it to the right place.

The competitive implication is direct. Carriers and forwarders with live signal architecture are quoting on the same lanes with better information. Over thousands of quotes, that information asymmetry produces measurable win rate and margin differences.

### Where Aircon stands

**Not evidenced publicly.** The diagnostic conversation will determine how live market signals currently flow through the system — specifically whether they reach the quoting criteria layer or only the reporting layer, and whether the signals being observed are appropriately matched to current operating conditions.

### The key question for your team

*When spot rates on a key lane move significantly on a Tuesday, does that movement affect the quotes our system produces on Wednesday — automatically — or does it wait for a human to update the system based on a report they reviewed at some point? And are the signals we are measuring still the right ones for how the market is behaving right now?* The answer to both parts of that question defines the Telemetry Capture score.

---

## Layer 5 — Silent Distortion Window
*CES composite: Telemetry (35%) + Criteria Validity (35%) + CGM Recalibration (30%) — the integrated failure mode when all three are insufficient*

### What the technical language means

The period of time during which an AI system is producing outputs — quotes, recommendations, decisions — that are confidently wrong, with no internal signal that anything has changed. The system reports high confidence. The market has moved on. The gap between them is invisible inside the platform's own reporting.

In CES terms, the Silent Distortion Window is what happens when the three dimensions — Telemetry Capture, Criteria Validity, and the Recalibration Loop — are all insufficient simultaneously. Each one can fail independently and produce partial distortion. When all three fail together, the result is a system in full drift with no self-correcting mechanism and no visibility into the gap. The CGM framework names this a **Governance Blind Spot**: a state in which criteria validity is assumed rather than verified, and the system continues operating with full institutional confidence in decisions it is no longer equipped to make correctly.

### The business analogy

This is the layer that brings all four previous layers together — and it is best understood through a story.

Imagine a highly experienced pricing analyst who goes on an extended leave of absence. Before she leaves, she writes a detailed pricing guide — every lane, every carrier, every seasonal adjustment, every tariff rule — based on everything she knows. It is the best pricing guide the company has ever produced. She is proud of it. Her team trusts it completely.

She is gone for ninety days.

During those ninety days, the Red Sea situation escalates. Two carriers consolidate. A tariff reclassification affects thirty percent of your most profitable SKU categories. Spot rates on Asia-Europe lanes spike twenty-two percent.

Her pricing guide says nothing about any of this. But her team keeps using it — because it is the guide, it has always been reliable, and there is no mechanism that tells them it has become unreliable. Every quote they produce is generated with full confidence. The guide does not know it is wrong. The team does not know it is wrong. The customers do not know it is wrong until the shipment arrives and the actual cost is materially different from the quote.

The ninety days between when the guide was accurate and when the team finally notices the quotes are off is the Silent Distortion Window.

Now scale that to seven thousand quotes per day.

### The CGM dimension: why the window stays open

The Silent Distortion Window does not just open because signals are stale or criteria have drifted. It stays open — sometimes for months — because of a specific governance failure the CGM framework is designed to diagnose: **Trust Velocity Calibration (TVC)** is absent.

TVC is the mechanism that adjusts how confidently the system acts based on how much of its validated track record is still applicable to current conditions. A system with strong TVC becomes *less* assertive when operating conditions shift significantly from its deployment baseline — it recognizes that its historical track record was built under conditions that may no longer apply, and it signals that uncertainty rather than suppressing it.

A system without TVC does the opposite. It applies day-1 confidence to day-180 conditions, regardless of how much the environment has changed. The audit trail looks clean. The confidence indicators are green. The Silent Distortion Window is open and the system has no internal language for describing it.

This is the governance distinction the board-level diagnostic is designed to surface: not whether the system is functioning, but whether the system knows when to distrust itself.

### Why it matters at the board level

The Silent Distortion Window is not a technology problem. It is a governance problem. The system is functioning exactly as designed. It is doing precisely what it was told to do. The issue is that what it was told to do is no longer aligned with market reality — and the system has no mechanism to surface that misalignment.

The board-level exposure is threefold. First, revenue: quotes that underprice the actual cost compress margin on every deal closed in the window. Second, market position: quotes that overprice relative to current market conditions lose deals to competitors with better-calibrated systems. Third, customer trust: if a quote diverges significantly from the final invoice, that is a relationship problem regardless of the contractual fine print.

A CES score in the 0-40 range — Recalibration Flag — means all three dimensions are insufficient. The system is not self-correcting. The window is open. The question for the board is not whether this risk exists. It is how much of it has already materialized, what the confirmed revenue impact is, and what governance architecture is required to close the window.

### Where Aircon stands

**Estimated at 30 to 90 days** based on public architecture data and the not-evidenced status of Layers 2, 3, and 4. This is a hypothesis. The diagnostic sprint will produce the confirmed window duration from internal quote outcome data — and will generate a full CES score with CGM composite to give the board a measurable, repeatable governance baseline.

### The key question for your team

*If I showed you a quote our system produced ninety days ago on a lane that has been significantly affected by recent market changes, how confident would you be that the quote reflects current conditions — and what would you show me to support that confidence?* The answer to that question, mapped against the CES framework, is the diagnostic.

---

## Summary — what each layer protects

| Layer | CES / CGM Mapping | The risk it prevents | The business cost if missing |
|---|---|---|---|
| L1 — Action Audit | Foundation (prerequisite) | No record of what the system did | Cannot diagnose errors, defend decisions, or satisfy auditors |
| L2 — Criteria Validity Loop | Criteria Validity (35%) + CDD sub-layer | Rules drift silently from market reality | Margin erosion and win rate decline across the full quote portfolio |
| L3 — Regime Change Protocol | Criteria Validity (35%) — high-severity trigger | Major market events pass without recalibration | Systematic mispricing during the highest-volatility periods — exactly when accuracy matters most |
| L4 — Signal Volatility Handling | Telemetry Capture (35%) | Live market data never reaches the decision layer | Quotes reflect last week's market on a platform quoting today's freight |
| L5 — Silent Distortion Window | CES composite (all three dimensions) + TVC sub-layer | No mechanism to detect when confidence has decoupled from accuracy | The system reports everything is fine while the market has already moved |

---

## The one thing to remember

An AI quoting system has two jobs. The first job is to do what it is told. The second job is to make sure what it is being told is still correct.

Most governance conversations focus on the first job. Action audits, agent logs, and performance dashboards all measure whether the system executed correctly against its rules.

The CES framework — and the five layers in this benchmark — measure the second job: whether the rules themselves are still right, whether the system knows when they have stopped being right, and whether there is a named human owner accountable for correcting them when they drift.

Aircon has confirmed architecture for the first job. The diagnostic conversation is about whether the second job has an owner.

---

## Appendix — the governance scoring instruments

For readers who want to understand how the diagnostic produces a measurable number, the two instruments used are:

**CES — Criteria Evaluation Score (0-100)**  
Measures criteria governance maturity across three dimensions: Telemetry Capture (35%), Criteria Validity (35%), and the Recalibration Loop (30% — replaced by the CGM composite when a full governance audit is run). A score of 0-40 is a Recalibration Flag. 86-100 is Self-Correcting (Amazon-tier).

**CGM — HUMINT Chameleon Governance Model**  
Three sub-layers scored 0-10 each. Stakeholder Persona Mapping (SPM): does the system adapt its outputs to different decision contexts and audiences? Criteria Drift Detection (CDD): does the system have an active mechanism to flag when its governing rules were set under conditions that no longer exist? Trust Velocity Calibration (TVC): does the system modulate its confidence based on how much of its validated track record is still applicable to current conditions?

Together, CES and CGM produce a single composite governance score — and, more importantly, a specific diagnosis of which layer is the binding constraint and what closing that constraint requires.

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

[← Back to README](../README.md) · [Diagnostic Questions →](chris-diagnostic-questions.md) · [Prove the Hypothesis Wrong →](../hypothesis/prove-me-wrong.md)

</div>
