<div align="center">

# Stakeholder Resistance Map

**Where adoption friction will emerge after the diagnostic conversation — and how to sequence past it**

---

![Framework](https://img.shields.io/badge/Framework-AI_Adoption_Architect_v6.1_Layer_1-8E9FD5?style=flat-square&labelColor=2D3436)
![Construct](https://img.shields.io/badge/Construct-Identity_Threat_Mapping-534AB7?style=flat-square&labelColor=2D3436)
![Audience](https://img.shields.io/badge/Audience-CTO_Briefing-BA7517?style=flat-square&labelColor=2D3436)
![License](https://img.shields.io/badge/License-DACR_v2.6-1D9E75?style=flat-square&labelColor=2D3436)

</div>

---

## Why this document exists

The diagnostic conversation is with Chris Condon, CEO. But the criteria drift problem — if confirmed — lives in the engineering and product architecture. The people closest to that architecture are the people who built it.

A CES diagnostic sprint is not an evaluation of the engineering team's performance. But it will be perceived that way by at least a portion of that team unless the framing is managed before the sprint begins.

This document maps where friction will emerge, what form it will take, and how the CTO can sequence the internal conversation to reduce coordination drag before the sprint kicks off.

---

## Stakeholder map

| Role | Relationship to the problem | Resistance type | Intensity |
|---|---|---|---|
| CTO | Primary access point; owns the quoting system architecture | Low resistance if engaged as co-diagnostician | Low — if framed correctly |
| VP Engineering | Day-to-day ownership of the system; will coordinate data access in Week 1 | Moderate — see below | Medium |
| Engineering team (quoting system) | Built and maintains the system; criteria encoding is their work | Identity threat — see below | Medium to high |
| Product team | Owns the quoting product roadmap; may perceive governance gap as a product failure | Defensive posture if sprint is framed as audit | Medium |
| CFO | Controls budget for any follow-on remediation | Low resistance — revenue exposure model is their language | Low |
| Sales / commercial team | Uses quotes daily; any quote accuracy issue affects their numbers | Potential ally if framed as revenue protection | Ally if engaged correctly |

---

## The engineering team resistance dynamic

This is the friction point that will slow the engagement if it is not managed.

The engineering team built the quoting system. They are technically sophisticated. They understand AI systems, data pipelines, and governance architecture. When an outside analyst produces a CES score suggesting the system has a criteria validity gap, the natural interpretation from inside the engineering team is: *someone who has never seen our system is telling us it doesn't work.*

That interpretation is wrong — the CES hypothesis is not a judgment on the system's functionality, it is a governance layer assessment — but it is the predictable cognitive response to an external diagnostic arriving at a score below 60.

### What this looks like in practice

- Information access that is technically available but "not ready to share yet"
- Requests to review the diagnostic methodology before providing architecture documentation
- Alternative explanations for the same data ("that's actually working as designed")
- Escalation to the CTO or VP Engineering of concerns about the sprint's framing

None of these responses are bad faith. They are the standard organizational immune response to an external critique of internal work.

### How the CTO manages this before the sprint begins

The internal framing from the CTO to the engineering team should accomplish three things:

**1. Name the sprint as diagnostic, not evaluative**

The sprint is answering the question: *does the system have a criteria validity layer?* Not: *did the engineering team do their job correctly?* These are different questions. The CES scoring layers assess governance architecture, not engineering execution quality. A system that scores 0 on L2 may be brilliantly engineered — it just may not have been given a criteria validity loop as part of its design requirements.

The reframe: "This is a governance audit, not a performance review. We're assessing what the system was designed to include — not how well the team executed against those requirements."

**2. Position the engineering team as the experts in the room**

The external analyst has framework expertise. The engineering team has system expertise. The sprint works because both are present. The most valuable thing the engineering team brings to Week 1 is their precise knowledge of how the system was built and what it was designed to do. That knowledge is not available from the outside. Without it, the sprint cannot produce a confirmed CES — only a continued hypothesis.

The reframe: "You're not being audited. You're the reason this can produce a real answer instead of a guess."

**3. Confirm the data access conversation is diagnostic, not archival**

Week 1 involves a 60-minute working session with VP Engineering. That session should be framed as a structured conversation about architecture, not a request to produce documentation that doesn't exist. The analyst brings a structured intake framework. The VP Engineering brings system knowledge. The output is a shared architecture map, not a compliance checklist.

---

## Product team resistance dynamic

The product team owns the quoting system roadmap. If the CES diagnostic surfaces governance gaps, those gaps are, from one angle, a product roadmap failure — the product was shipped without certain governance layers in the architecture.

This is a secondary resistance point, less intense than the engineering team dynamic, but worth managing if the product team is in the room for the Week 1 kickoff.

### The reframe for the product team

The governance layers identified by the CES — criteria validity loops, regime change protocols, signal volatility handling — were not standard product requirements in 2022 or 2023. They are emerging as requirements now, driven by AI governance regulatory developments (Colorado AI Act, effective June 2026; California ADMT, effective January 2027) and increasing enterprise procurement scrutiny.

The sprint is not documenting a product failure. It is documenting the delta between a product built to 2022 governance standards and the governance architecture that 2026 market conditions and regulatory requirements demand. That delta is not the product team's fault. It is the reason the sprint is timely.

---

## The sales team as a potential ally

The commercial team using quotes daily is the stakeholder group most directly exposed to the revenue consequence of criteria drift. If quotes are systematically miscalibrated — producing prices that are too high for lanes where market conditions have improved, or too low for lanes where carrier costs have increased — the sales team feels it in their close rates and margin performance.

If the sprint surfaces a confirmed SDW, the commercial team is a natural advocate for remediation. They have a direct financial interest in quote accuracy that supersedes any organizational identity investment in the current system.

**Recommendation:** Do not include the commercial team in the diagnostic sprint sessions. Do brief them on the revenue exposure model once it is complete (Week 3 output). Their response to the revenue exposure quantification will be the strongest internal pressure point for remediation investment.

---

## Resistance intensity by sprint week

| Sprint week | Primary friction point | Management approach |
|---|---|---|
| Week 1 — Architecture Intake | Engineering team — information access | CTO pre-brief; diagnostic framing established before first session |
| Week 2 — Benchmark Mapping | Engineering team — score interpretation | Share draft CES scorecard with CTO before VP Engineering sees it; give 24-hour review window |
| Week 3 — Silent Distortion Audit | CFO or finance team — revenue exposure methodology | Frame as conservative estimate; show assumption set; invite correction |
| Week 4 — Readout | Product team — roadmap implications | Confirm regulatory context before the meeting; frame gaps as market evolution, not product failure |

---

## The single most important action before Week 1

The CTO needs to have a five-minute conversation with the VP Engineering before the kickoff call. That conversation needs to establish one thing: *this is a governance architecture review, not a system performance audit.*

That five minutes reduces Week 1 friction more than any other intervention available.

Without it, the kickoff call opens with the engineering team in a defensive posture, and the first 30 minutes of a 90-minute session are spent managing that posture rather than mapping the architecture.

With it, the engineering team arrives as experts contributing to a shared diagnostic — which is what they are, and what the sprint requires them to be.

---

<div align="center">

![IP Protected](https://img.shields.io/badge/IP_Protected-GitHub_Timestamped-2D3436?style=flat-square)
![Attribution Required](https://img.shields.io/badge/Attribution_Required-McDonald_(2026)-2D3436?style=flat-square)
![License](https://img.shields.io/badge/License-DACR_v2.6-1D9E75?style=flat-square&labelColor=2D3436)

*All Aircom findings represent a structured public-data hypothesis.*  
*Nothing in this document reflects confirmed internal Aircom architecture.*

**Behavioral Intelligence Research / Epoch Frameworks LLC**  
Erwin Maurice McDonald — AI Adoption Architect  
DACR License v2.6 | McDonald (2026)

[← Back to README](../README.md)

</div>
