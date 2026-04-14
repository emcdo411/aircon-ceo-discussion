<div align="center">

# Aircom Criteria Drift Intelligence

**A structured public-data intelligence package benchmarking AI decision criteria drift architecture**  
**across Amazon, Airbus, and Aircom — prepared for executive diagnostic conversation**

---

![Framework](https://img.shields.io/badge/Framework-EBT_v2.6_×_AI_Adoption_Architect_v6.1-8E9FD5?style=flat-square&labelColor=2D3436)
![CXO Layer](https://img.shields.io/badge/CXO_Layer-Fractional_CXO_Practice_Builder_v2.4-534AB7?style=flat-square&labelColor=2D3436)
![License](https://img.shields.io/badge/License-DACR_v2.6-1D9E75?style=flat-square&labelColor=2D3436)
![Evidence](https://img.shields.io/badge/Evidence_Basis-Public_Data_Only-BA7517?style=flat-square&labelColor=2D3436)
![Status](https://img.shields.io/badge/Status-Hypothesis_Grade-D85A30?style=flat-square&labelColor=2D3436)

---

![Analyst](https://img.shields.io/badge/Analyst-Erwin_Maurice_McDonald-2D3436?style=flat-square&logo=linkedin&logoColor=white)
![Role](https://img.shields.io/badge/Role-AI_Adoption_Architect-2D3436?style=flat-square)
![Org](https://img.shields.io/badge/Org-Behavioral_Intelligence_Research_/_Epoch_Frameworks_LLC-2D3436?style=flat-square)
![Date](https://img.shields.io/badge/Prepared-April_2026-2D3436?style=flat-square)

</div>

---

## What this repo contains

This repository holds the full intelligence package developed for the Aircom engagement conversation with Chris Condon, CEO. It benchmarks Aircom's known architecture against Amazon and Airbus on the specific problem of AI decision criteria drift — the gap between what the system was built to optimize for and what current market conditions actually require.

> **Context:** Chris Condon confirmed in a LinkedIn exchange that the gap between *auditability of action* and *knowing when decision criteria have drifted from market reality* is a real and open problem at Aircom. This package names that problem with precision and benchmarks it against two of the most sophisticated logistics AI operators in the world.

---

## Repo structure

```
aircom-criteria-drift-intelligence/
├── README.md                                        ← this file
├── questions/
│   └── chris-diagnostic-questions.md               ← three diagnostic questions + call framing
└── visuals/
    ├── chart1_criteria_calibration.png              ← CES score over time — 12-month trajectory
    ├── chart2_silent_distortion_window.png          ← confidence vs. accuracy divergence
    ├── chart3_feedback_loop_speed.png               ← days to recalibrate criteria (bar)
    ├── chart4_five_layer_readiness.png              ← five-layer grouped readiness scores
    └── build_charts.py                              ← reproducible FRED-style chart generator
```

---

## The core problem

Air freight AI quoting systems encode freight forwarder expertise as decision criteria. Those criteria are valid at encoding time. The problem is that air freight conditions — routing viability, spot rate differentials, carrier reliability, tariff classifications — change on a daily to weekly basis.

When a system has strong **action audit architecture** (what agents did) but lacks a parallel **criteria validity loop** (whether the criteria agents followed are still calibrated), the result is a **Silent Distortion Window**: a period during which the system produces confidently wrong outputs with no internal signal that anything has changed.

> Estimated Silent Distortion Window for systems without drift detection: **30 to 90 days** in current air freight conditions.

This is not a technology failure. It is a **governance architecture gap** — and it is precisely the gap that Amazon and Airbus have independently solved at different levels of the stack.

---

## Benchmark summary

| Layer | ![Amazon](https://img.shields.io/badge/-Amazon-1D9E75?style=flat-square) | ![Airbus](https://img.shields.io/badge/-Airbus-534AB7?style=flat-square) | ![Aircom](https://img.shields.io/badge/-Aircom_hypothesis-D85A30?style=flat-square) |
|---|---|---|---|
| Action audit | Full, real-time | Full, event log | ✅ Confirmed strength |
| Criteria validity loop | Transaction-level (hours) | Program-level (weeks) | ⚠️ Not evidenced |
| Regime change protocol | Embedded in infrastructure | Explicit trigger flags | ⚠️ Not evidenced |
| Signal volatility handling | Real-time at decision layer | Tiered by signal speed | ⚠️ Not evidenced |
| Silent distortion window | Hours to days | Days to weeks | ⚠️ Est. 30–90 days |
| **Overall readiness score** | **91 / 100** | **87 / 100** | **CES: 42 / 100** |

---

## CES score interpretation

![CES 80-100](https://img.shields.io/badge/CES_80–100-Self--correcting-1D9E75?style=flat-square&labelColor=2D3436)
![CES 60-79](https://img.shields.io/badge/CES_60–79-Watch_zone-BA7517?style=flat-square&labelColor=2D3436)
![CES 40-59](https://img.shields.io/badge/CES_40–59-Recalibration_flag-D85A30?style=flat-square&labelColor=2D3436)
![CES below 40](https://img.shields.io/badge/CES_below_40-Silent_distortion_active-C0392B?style=flat-square&labelColor=2D3436)

| Range | Classification | Action required |
|---|---|---|
| 80–100 | Self-correcting | Drift addressed before it reaches quote output |
| 60–79 | Watch zone | Governance review required on defined cadence |
| 40–59 | Recalibration flag | Mandatory review before downstream decisions |
| Below 40 | Silent distortion active | Confident outputs likely miscalibrated — halt and audit |

> **Aircom hypothesis CES: 42/100** — sits at the boundary between recalibration flag and silent distortion active. One regime event away from confirmed distortion.

---

## Visuals

### Chart 1 — Criteria Calibration Score Over Time
> 12-month trajectory. Amazon holds above 85. Airbus dips and recovers. Aircom slides past both thresholds after the regime shift event. The coral fill below the threshold makes the risk zone unambiguous.

![chart1](visuals/chart1_criteria_calibration.png)

---

### Chart 2 — The Silent Distortion Window
> The CFO chart. System confidence holds flat (periwinkle). Actual accuracy collapses underneath it (dashed coral). The shaded gap is the hidden margin and quote accuracy risk — invisible inside the platform's own reporting.

![chart2](visuals/chart2_silent_distortion_window.png)

---

### Chart 3 — Feedback Loop Closure Speed
> Amazon: 6 hours. Airbus: 7 days. Aircom hypothesis: 75 days. No annotation required. The bar tells the story.

![chart3](visuals/chart3_feedback_loop_speed.png)

---

### Chart 4 — Five-Layer Readiness Scores
> Action audit shows all three roughly matched. Every other layer, Aircom bars sit below the minimum threshold line. The pattern — matched on the one layer that exists, below threshold on the four that don't — is the board-level argument.

![chart4](visuals/chart4_five_layer_readiness.png)

---

## Diagnostic questions for Chris Condon

See [`questions/chris-diagnostic-questions.md`](questions/chris-diagnostic-questions.md) for the full framing.

The three questions in brief:

| # | Question | Aimed at | What you're listening for |
|---|---|---|---|
| 1 | When a macro event changes the routing landscape, what is the mechanism that tells the system its criteria need revisiting? | CTO / VP Engineering | Named process, named owner, defined trigger |
| 2 | When a quote outcome diverges from the model's prediction, where does that signal go — back to the criteria layer or only to the performance log? | CTO / Chief Product Officer | Loop closure at criteria layer, not just reporting layer |
| 3 | What would a 60-day-old criteria set produce in today's market — and how would you know? | CEO / CTO | A concrete answer means they've solved it. A pause means they haven't. |

---

## Framework sources

![EBT](https://img.shields.io/badge/EBT_Pathway_4-Temporal_Criteria_Decay-8E9FD5?style=flat-square&labelColor=2D3436)
![CES](https://img.shields.io/badge/Construct-Criteria_Expiration_Score-8E9FD5?style=flat-square&labelColor=2D3436)
![BVC](https://img.shields.io/badge/Construct-Behavioral_Volatility_Ceiling-8E9FD5?style=flat-square&labelColor=2D3436)
![SDW](https://img.shields.io/badge/Construct-Silent_Distortion_Window-8E9FD5?style=flat-square&labelColor=2D3436)

| Framework | Citation |
|---|---|
| EBT Pathway 4 — Temporal Criteria Decay | McDonald, E.M. (February 2026) |
| Criteria Expiration Score (CES) | McDonald, E.M. (March 2026) |
| Behavioral Volatility Ceiling (BVC) | McDonald, E.M. (March 2026) — validated Thompson/Havas Edge |
| Silent Distortion Window construct | McDonald, E.M. (March 2026) |
| AI Adoption Architect v6.1 Layer 0B | McDonald, E.M. (2026) |
| Fractional CXO Practice Builder v2.4 — Pilot-to-Production Gate | McDonald, E.M. (March 2026) |
| Amazon logistics architecture | AWS Logistics Architecture whitepaper (public, 2023) |
| Airbus Skywise program | Airbus Skywise public documentation (2023–2024) |
| MLOps feedback loop theory | Sculley et al. — Hidden Technical Debt in ML Systems, Google (2015) |
| Cybernetics / feedback loop foundations | Wiener — Cybernetics (1948); Ashby — Introduction to Cybernetics (1956) |

---

## Reproducibility

All four FRED-style charts are fully reproducible. The generator script is at `visuals/build_charts.py`.

```bash
# Requirements
pip install matplotlib numpy

# Generate all four charts
python3 visuals/build_charts.py
```

Charts output to the working directory at 180 DPI. All scoring values are modular — update any score constant at the top of each function and rerun after the Chris call confirms or corrects the internal architecture. No external data dependencies.

---

<div align="center">

![IP Protected](https://img.shields.io/badge/IP_Protected-GitHub_Timestamped-2D3436?style=flat-square)
![Attribution Required](https://img.shields.io/badge/Attribution_Required-McDonald_(2026)-2D3436?style=flat-square)
![Build](https://img.shields.io/badge/Charts-4_passing-1D9E75?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.10%2B-2D3436?style=flat-square&logo=python&logoColor=white)
![matplotlib](https://img.shields.io/badge/matplotlib-3.x-2D3436?style=flat-square)

*All Aircom findings represent a structured public-data hypothesis.*  
*Nothing in this repository reflects confirmed internal Aircom architecture.*  
*This package was developed to support a diagnostic conversation — not to assert findings as fact.*

**Behavioral Intelligence Research / Epoch Frameworks LLC**  
Erwin Maurice McDonald — AI Adoption Architect  
DACR License v2.6 | McDonald (2026)

</div>
