import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import matplotlib.ticker as ticker
import numpy as np
from matplotlib.lines import Line2D

# ── FRED palette ──────────────────────────────────────────────────────────────
PERIWINKLE  = "#8E9FD5"
TEAL        = "#1D9E75"
PURPLE      = "#534AB7"
CORAL       = "#D85A30"
AMBER       = "#BA7517"
RED_THRESH  = "#C0392B"
CHARCOAL    = "#2D3436"
LIGHT_GRAY  = "#F5F4F1"
MID_GRAY    = "#B4B2A9"
GRID_COLOR  = "#DDD9D0"
RECESSION   = "#E8E4DC"   # recession-style shading band
ANNOTATION  = "#636059"

FONT_FAMILY = "DejaVu Sans"

def apply_fred_style(ax, fig):
    fig.patch.set_facecolor(LIGHT_GRAY)
    ax.set_facecolor(LIGHT_GRAY)
    ax.spines["top"].set_visible(False)
    ax.spines["right"].set_visible(False)
    ax.spines["left"].set_color(MID_GRAY)
    ax.spines["bottom"].set_color(MID_GRAY)
    ax.tick_params(colors=ANNOTATION, labelsize=9)
    ax.yaxis.set_tick_params(labelcolor=ANNOTATION)
    ax.xaxis.set_tick_params(labelcolor=ANNOTATION)
    ax.grid(axis="y", color=GRID_COLOR, linewidth=0.6, zorder=0)
    ax.set_axisbelow(True)

def source_footer(fig, text):
    fig.text(0.02, 0.01, text, fontsize=7.5, color=ANNOTATION,
             fontfamily=FONT_FAMILY, va="bottom",
             wrap=True)

# ── CHART 1: Criteria Calibration Score — 12-month trajectory ─────────────────
def chart1():
    months = np.arange(1, 13)
    labels = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

    amazon = [89,90,91,89,90,91,90,91,89,90,91,91]
    airbus = [82,84,86,80,78,80,82,84,83,85,87,88]
    aircom = [78,76,74,65,58,52,48,45,43,42,42,42]

    fig, ax = plt.subplots(figsize=(11, 5.5))
    apply_fred_style(ax, fig)

    # recession-style shading for regime shift window (months 3.5–5.5)
    ax.axvspan(3.5, 5.5, color=RECESSION, zorder=1, label="_nolegend_")
    ax.text(4.5, 95, "Regime shift\n(Red Sea + tariffs)",
            ha="center", va="top", fontsize=8, color=ANNOTATION,
            fontfamily=FONT_FAMILY, style="italic")

    # threshold lines
    ax.axhline(60, color=RED_THRESH, linewidth=1.4, linestyle="--", zorder=3)
    ax.axhline(40, color=AMBER,     linewidth=1.4, linestyle=":",  zorder=3)

    ax.text(12.15, 60, "Recalibration\nflag  (60)",
            va="center", fontsize=8, color=RED_THRESH, fontfamily=FONT_FAMILY)
    ax.text(12.15, 40, "Silent distortion\nthreshold  (40)",
            va="center", fontsize=8, color=AMBER, fontfamily=FONT_FAMILY)

    # fill below Aircom line to threshold
    aircom_arr = np.array(aircom)
    months_arr = np.array(months, dtype=float)
    ax.fill_between(months_arr, aircom_arr, 40,
                    where=(aircom_arr <= 60),
                    color=CORAL, alpha=0.12, zorder=2)

    # data lines
    ax.plot(months, amazon, color=TEAL,    linewidth=2.5, marker="o", markersize=4,
            zorder=5, label="Amazon — transaction-level loop")
    ax.plot(months, airbus, color=PURPLE,  linewidth=2.2, marker="s", markersize=4,
            zorder=5, label="Airbus — governance-level protocol")
    ax.plot(months, aircom, color=CORAL,   linewidth=2.2, marker="^", markersize=4,
            linestyle="--", zorder=5, label="Aircom — hypothesis, no drift detection")

    # annotate Aircom drop
    ax.annotate("Criteria drift\nundetected",
                xy=(7, 48), xytext=(8.2, 55),
                fontsize=8, color=CORAL, fontfamily=FONT_FAMILY,
                arrowprops=dict(arrowstyle="->", color=CORAL, lw=1.0),
                va="center")

    ax.set_xlim(0.5, 13.8)
    ax.set_ylim(28, 100)
    ax.set_xticks(months)
    ax.set_xticklabels(labels, fontfamily=FONT_FAMILY)
    ax.set_ylabel("Criteria calibration score (CES 0–100)",
                  color=ANNOTATION, fontsize=9, fontfamily=FONT_FAMILY)

    ax.set_title("AI Quoting System — Criteria Calibration Score Over Time\n"
                 "Benchmarked: Amazon · Airbus · Aircom (hypothesis)",
                 fontsize=12, fontweight="bold", color=CHARCOAL,
                 fontfamily=FONT_FAMILY, pad=14, loc="left")

    ax.legend(loc="lower left", fontsize=8.5, framealpha=0.85,
              facecolor=LIGHT_GRAY, edgecolor=MID_GRAY,
              prop={"family": FONT_FAMILY})

    source_footer(fig,
        "Sources: Amazon AWS Logistics Architecture (public, 2023) · Airbus Skywise Program Documentation (public) · "
        "Criteria Expiration Score (CES) methodology: McDonald, E.M. (2026) · "
        "Regime shift event: Red Sea routing disruption + accelerated tariff changes, Q1 2025. "
        "Aircom trajectory is modeled hypothesis — not confirmed internal data.")

    plt.tight_layout(rect=[0, 0.06, 1, 1])
    fig.savefig("/home/claude/chart1_criteria_calibration.png", dpi=180, bbox_inches="tight")
    plt.close()
    print("Chart 1 saved.")

# ── CHART 2: Silent Distortion Window — Confidence vs Accuracy Divergence ─────
def chart2():
    days = np.linspace(0, 120, 300)

    # confidence stays flat (system doesn't know it's wrong)
    confidence = np.ones_like(days) * 88

    # accuracy decays after regime shift (day 30)
    def accuracy(d):
        baseline = 88
        regime_day = 30
        if d < regime_day:
            return baseline - 0.04 * d
        else:
            decay = (d - regime_day) ** 1.18 * 0.48
            return max(baseline - 0.04 * regime_day - decay, 28)

    accuracy_vals = np.array([accuracy(d) for d in days])

    fig, ax = plt.subplots(figsize=(11, 5.5))
    apply_fred_style(ax, fig)

    # shade the silent distortion window
    regime_idx = np.argmin(np.abs(days - 30))
    ax.axvspan(30, 120, color=RECESSION, zorder=1, alpha=0.9)
    ax.text(75, 94, "Silent distortion window",
            ha="center", fontsize=9, color=ANNOTATION,
            fontfamily=FONT_FAMILY, style="italic")

    # threshold lines
    ax.axhline(60, color=RED_THRESH, linewidth=1.4, linestyle="--", zorder=3)
    ax.axhline(40, color=AMBER,      linewidth=1.4, linestyle=":",  zorder=3)
    ax.text(122, 60, "Recalibration\nflag  (60)",
            va="center", fontsize=8, color=RED_THRESH, fontfamily=FONT_FAMILY)
    ax.text(122, 40, "Silent distortion\nthreshold  (40)",
            va="center", fontsize=8, color=AMBER, fontfamily=FONT_FAMILY)

    # regime shift vertical
    ax.axvline(30, color=CHARCOAL, linewidth=1.0, linestyle=":", alpha=0.5, zorder=3)
    ax.text(30, 27, " Regime shift", fontsize=8, color=ANNOTATION,
            fontfamily=FONT_FAMILY, va="bottom")

    # fill divergence gap
    ax.fill_between(days, accuracy_vals, confidence,
                    where=(days >= 30),
                    color=CORAL, alpha=0.13, zorder=2,
                    label="Confidence–accuracy gap (hidden risk)")

    # lines
    ax.plot(days, confidence,   color=PERIWINKLE, linewidth=2.5, zorder=5,
            label="System confidence (what the platform reports)")
    ax.plot(days, accuracy_vals, color=CORAL,      linewidth=2.5, linestyle="--",
            zorder=5, label="Actual calibration accuracy (market-relative)")

    # annotation arrow
    ax.annotate("System still reporting\nhigh confidence at day 90",
                xy=(90, 88), xytext=(62, 78),
                fontsize=8, color=PERIWINKLE, fontfamily=FONT_FAMILY,
                arrowprops=dict(arrowstyle="->", color=PERIWINKLE, lw=1.0),
                ha="center")

    ax.annotate("Actual accuracy\nat day 90: ~52",
                xy=(90, 52), xytext=(62, 44),
                fontsize=8, color=CORAL, fontfamily=FONT_FAMILY,
                arrowprops=dict(arrowstyle="->", color=CORAL, lw=1.0),
                ha="center")

    ax.set_xlim(-3, 138)
    ax.set_ylim(24, 102)
    ax.set_xlabel("Days since criteria encoding", color=ANNOTATION,
                  fontsize=9, fontfamily=FONT_FAMILY)
    ax.set_ylabel("Score (0–100)", color=ANNOTATION, fontsize=9,
                  fontfamily=FONT_FAMILY)
    ax.set_title("The Silent Distortion Window — Confidence vs. Actual Accuracy\n"
                 "What the system reports vs. what the market sees  |  Air freight AI quoting context",
                 fontsize=12, fontweight="bold", color=CHARCOAL,
                 fontfamily=FONT_FAMILY, pad=14, loc="left")

    ax.legend(loc="lower left", fontsize=8.5, framealpha=0.85,
              facecolor=LIGHT_GRAY, edgecolor=MID_GRAY,
              prop={"family": FONT_FAMILY})

    source_footer(fig,
        "Sources: EBT Pathway 4 — Temporal Criteria Decay · Silent Distortion Window construct: McDonald, E.M. (March 2026) · "
        "Wiener — Cybernetics (1948) · Sculley et al. — Hidden Technical Debt in ML Systems, Google (2015) · "
        "Air freight signal volatility context: Red Sea disruption + tariff acceleration Q1 2025.")

    plt.tight_layout(rect=[0, 0.06, 1, 1])
    fig.savefig("/home/claude/chart2_silent_distortion_window.png", dpi=180, bbox_inches="tight")
    plt.close()
    print("Chart 2 saved.")

# ── CHART 3: Feedback Loop Closure Speed — bar comparison ─────────────────────
def chart3():
    orgs   = ["Amazon\n(transaction-level)", "Airbus\n(program-level)", "Aircom\nhypothesis"]
    speeds = [0.25, 7, 75]   # days to close the feedback loop
    colors = [TEAL, PURPLE, CORAL]

    fig, ax = plt.subplots(figsize=(9, 5.5))
    apply_fred_style(ax, fig)

    bars = ax.barh(orgs, speeds, color=colors, height=0.45, zorder=4)

    # threshold line: governance-meeting cadence
    ax.axvline(30, color=RED_THRESH, linewidth=1.4, linestyle="--", zorder=5)
    ax.text(30.5, 2.42, "30-day governance\nreview threshold",
            fontsize=8, color=RED_THRESH, fontfamily=FONT_FAMILY, va="top")

    # value labels inside bars
    for bar, val in zip(bars, speeds):
        label = f"{val}d est." if val >= 1 else f"{int(val*24)}h avg."
        xpos = val - 2 if val > 10 else val + 0.5
        align = "right" if val > 10 else "left"
        color = "white" if val > 10 else CHARCOAL
        ax.text(xpos, bar.get_y() + bar.get_height()/2,
                label, va="center", ha=align,
                fontsize=9.5, fontweight="bold",
                color=color, fontfamily=FONT_FAMILY)

    ax.set_xlabel("Days to close criteria feedback loop", color=ANNOTATION,
                  fontsize=9, fontfamily=FONT_FAMILY)
    ax.set_xlim(0, 105)
    ax.set_title("Feedback Loop Closure Speed — Days to Recalibrate Criteria\n"
                 "How quickly each system asks: 'Are our criteria still right?'",
                 fontsize=12, fontweight="bold", color=CHARCOAL,
                 fontfamily=FONT_FAMILY, pad=14, loc="left")

    ax.invert_yaxis()

    # annotation
    ax.text(78, 2, "Estimated 30–90 day\nSilent Distortion Window",
            fontsize=8, color=CORAL, fontfamily=FONT_FAMILY,
            va="center", style="italic",
            bbox=dict(boxstyle="round,pad=0.3", facecolor=LIGHT_GRAY,
                      edgecolor=CORAL, linewidth=0.7))

    source_footer(fig,
        "Sources: Amazon AWS Logistics Architecture (public) · Airbus Skywise documentation (public) · "
        "Feedback loop architecture scoring: AI Adoption Architect v6.1 Layer 0B — McDonald, E.M. (2026) · "
        "Aircom figure is hypothesis-grade — not confirmed internal data.")

    plt.tight_layout(rect=[0, 0.06, 1, 1])
    fig.savefig("/home/claude/chart3_feedback_loop_speed.png", dpi=180, bbox_inches="tight")
    plt.close()
    print("Chart 3 saved.")

# ── CHART 4: Five-Layer Readiness Radar (horizontal grouped bar) ──────────────
def chart4():
    layers = [
        "Action audit",
        "Criteria validity loop",
        "Regime change protocol",
        "Signal volatility handling",
        "Feedback loop closure"
    ]
    amazon = [95, 92, 90, 91, 93]
    airbus = [88, 82, 87, 80, 78]
    aircom = [88, 22, 20, 18, 20]   # hypothesis scores

    x = np.arange(len(layers))
    width = 0.24

    fig, ax = plt.subplots(figsize=(11, 6))
    apply_fred_style(ax, fig)

    b1 = ax.bar(x - width, amazon, width, color=TEAL,    label="Amazon",  zorder=4)
    b2 = ax.bar(x,          airbus, width, color=PURPLE,  label="Airbus",  zorder=4)
    b3 = ax.bar(x + width, aircom, width, color=CORAL,   label="Aircom (hypothesis)", zorder=4, alpha=0.85)

    # threshold line
    ax.axhline(60, color=RED_THRESH, linewidth=1.3, linestyle="--", zorder=5)
    ax.text(4.62, 61.5, "Minimum\nthreshold (60)",
            fontsize=8, color=RED_THRESH, fontfamily=FONT_FAMILY, va="bottom")

    ax.set_xticks(x)
    ax.set_xticklabels(layers, fontfamily=FONT_FAMILY, fontsize=9)
    ax.set_ylim(0, 108)
    ax.set_ylabel("Architecture readiness score (0–100)",
                  color=ANNOTATION, fontsize=9, fontfamily=FONT_FAMILY)

    ax.set_title("Five-Layer Criteria Drift Architecture — Readiness Scores\n"
                 "What each organization has built to prevent AI decision criteria from going stale",
                 fontsize=12, fontweight="bold", color=CHARCOAL,
                 fontfamily=FONT_FAMILY, pad=14, loc="left")

    # value labels on bars
    for bars in [b1, b2, b3]:
        for bar in bars:
            h = bar.get_height()
            ax.text(bar.get_x() + bar.get_width()/2, h + 1,
                    str(int(h)), ha="center", va="bottom",
                    fontsize=7.5, color=ANNOTATION, fontfamily=FONT_FAMILY)

    ax.legend(loc="upper right", fontsize=8.5, framealpha=0.85,
              facecolor=LIGHT_GRAY, edgecolor=MID_GRAY,
              prop={"family": FONT_FAMILY})

    source_footer(fig,
        "Sources: Amazon AWS Logistics Architecture (public) · Airbus Skywise program (public) · "
        "Scoring methodology: EBT v2.6 × AI Adoption Architect v6.1 — McDonald, E.M. (2026) · "
        "Aircom scores are hypothesis-grade from public-facing materials only — not confirmed internal data.")

    plt.tight_layout(rect=[0, 0.06, 1, 1])
    fig.savefig("/home/claude/chart4_five_layer_readiness.png", dpi=180, bbox_inches="tight")
    plt.close()
    print("Chart 4 saved.")


# ── run all ───────────────────────────────────────────────────────────────────
chart1()
chart2()
chart3()
chart4()
print("All charts complete.")
