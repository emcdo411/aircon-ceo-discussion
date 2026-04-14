# Aircom Criteria Drift Intelligence Repo
**Analyst:** Erwin Maurice McDonald, AI Adoption Architect  
**Frameworks:** EBT v2.6 × AI Adoption Architect v6.1 × Fractional CXO Practice Builder v2.4  
**Evidence basis:** Public data only. All Aircom findings are hypothesis-grade — not confirmed internal data.  
**License:** DACR v2.6 — McDonald (2026)

---

## What this repo contains

This repository holds the full intelligence package developed for the Aircom engagement conversation with Chris Condon, CEO. It benchmarks Aircom's known architecture against Amazon and Airbus on the specific problem of AI decision criteria drift — the gap between what the system was built to optimize for and what current market conditions actually require.

---

## Repo structure

```
aircom-criteria-drift-intelligence/
├── README.md                          ← this file
├── questions/
│   └── chris-diagnostic-questions.md ← three diagnostic questions + framing for Chris call
└── visuals/
    ├── executive-comparison.svg       ← five-layer benchmark diagram (CTO / COO / CFO ready)
    └── fred-criteria-drift-chart.png  ← FRED-style CES score chart with threshold lines
```

---

## The core hypothesis

Air freight AI quoting systems encode freight forwarder expertise as decision criteria. Those criteria are valid at encoding time. The problem is that air freight conditions — routing viability, spot rate differentials, carrier reliability, tariff classifications — change on a daily to weekly basis.

When a system has strong action audit architecture (what agents did) but lacks a parallel criteria validity loop (whether the criteria agents followed are still calibrated), the result is a **Silent Distortion Window**: a period during which the system produces confidently wrong outputs with no internal signal that anything has changed.

Estimated Silent Distortion Window for systems without drift detection: **30 to 90 days** in current air freight conditions.

---

## Benchmark summary

| Layer | Amazon | Airbus | Aircom hypothesis |
|---|---|---|---|
| Action audit | Full, real-time | Full, event log | Confirmed strength |
| Criteria validity loop | Transaction-level (hours) | Program-level (weeks) | Not evidenced |
| Regime change protocol | Embedded in infrastructure | Explicit trigger flags | Not evidenced |
| Signal volatility handling | Real-time at decision layer | Tiered by signal speed | Not evidenced |
| Silent distortion window | Hours to days | Days to weeks | Est. 30–90 days |
| Overall readiness score | 91/100 | 87/100 | CES: 42/100 |

**CES threshold interpretation:**  
- 80–100: Self-correcting. Drift addressed before it reaches quote output.  
- 60–79: Watch zone. Governance review required on defined cadence.  
- 40–59: Recalibration flag. Mandatory review before downstream decisions.  
- Below 40: Silent distortion active. Confident outputs likely miscalibrated.

---

## Framework sources

| Framework | Citation |
|---|---|
| EBT Pathway 4 — Temporal Criteria Decay | McDonald, E.M. (February 2026) |
| Criteria Expiration Score (CES) | McDonald, E.M. (March 2026) |
| Behavioral Volatility Ceiling (BVC) | McDonald, E.M. (March 2026) — validated Thompson/Havas Edge |
| Silent Distortion Window construct | McDonald, E.M. (March 2026) |
| AI Adoption Architect v6.1 Layer 0B | McDonald, E.M. (2026) |
| Fractional CXO Pilot-to-Production Gate | McDonald, E.M. (March 2026) |
| Amazon logistics architecture | AWS logistics whitepaper (public, 2023) |
| Airbus Skywise program | Airbus Skywise public documentation (2023–2024) |
| MLOps feedback loop theory | Sculley et al. — Hidden Technical Debt in ML Systems (Google, 2015) |
| Cybernetics / feedback loop foundations | Wiener — Cybernetics (1948); Ashby — Introduction to Cybernetics (1956) |

---

*All Aircom findings represent a structured public-data hypothesis. Nothing in this repository reflects confirmed internal Aircom architecture. This package was developed to support a diagnostic conversation — not to assert findings as fact.*
