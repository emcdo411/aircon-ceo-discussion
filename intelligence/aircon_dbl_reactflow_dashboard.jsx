import React, { useCallback, useEffect, useMemo, useState } from "react";
import ReactFlow, {
  Background,
  Controls,
  Handle,
  MarkerType,
  Position,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
} from "reactflow";
import "reactflow/dist/style.css";
import { AlertTriangle, CheckCircle2, CircleDot, Target, ShieldAlert, TrendingUp, Activity, Briefcase, ArrowRight, FileText } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";

const STATUS_STYLES = {
  validated: {
    label: "Validated",
    ring: "ring-emerald-500/40",
    border: "border-emerald-500/50",
    bg: "bg-emerald-500/10",
    text: "text-emerald-200",
    badge: "bg-emerald-500/15 text-emerald-200 border-emerald-500/30",
  },
  uncertain: {
    label: "Uncertain",
    ring: "ring-amber-500/40",
    border: "border-amber-500/50",
    bg: "bg-amber-500/10",
    text: "text-amber-200",
    badge: "bg-amber-500/15 text-amber-200 border-amber-500/30",
  },
  risk: {
    label: "Risk",
    ring: "ring-red-500/40",
    border: "border-red-500/50",
    bg: "bg-red-500/10",
    text: "text-red-200",
    badge: "bg-red-500/15 text-red-200 border-red-500/30",
  },
};

const LAYER_ORDER = ["actionAudit", "criteriaValidity", "regimeChange", "signalVolatility", "trustVelocity"];

const LAYER_META = {
  actionAudit: {
    title: "Layer 1 — Action Audit",
    short: "Action Audit",
    subtitle: "Do we know what the system did?",
    icon: CheckCircle2,
  },
  criteriaValidity: {
    title: "Layer 2 — Criteria Validity Loop",
    short: "Criteria Validity",
    subtitle: "Are the rules still right?",
    icon: Target,
  },
  regimeChange: {
    title: "Layer 3 — Regime Change Protocol",
    short: "Regime Change",
    subtitle: "Does major disruption trigger recalibration?",
    icon: ShieldAlert,
  },
  signalVolatility: {
    title: "Layer 4 — Signal Volatility Handling",
    short: "Signal Volatility",
    subtitle: "Do live market signals reach the decision layer?",
    icon: Activity,
  },
  trustVelocity: {
    title: "Layer 5 — Trust Velocity Calibration",
    short: "Trust Velocity",
    subtitle: "Does confidence adjust as conditions change?",
    icon: TrendingUp,
  },
};

const DEFAULT_NOTES = {
  actionAudit: "Confirmed strength from public discussion: Aircon appears to have action audit coverage for what agents do.",
  criteriaValidity: "Use Q1 to test whether drift thresholds, recalibration triggers, and named owners exist.",
  regimeChange: "Use Red Sea or tariff shifts as the real-world trigger example.",
  signalVolatility: "Test whether live market signals feed the decision layer or only reporting and dashboards.",
  trustVelocity: "Use Q3 to test whether confidence changes from day 1 to day 180.",
};

const INITIAL_LAYER_STATE = {
  actionAudit: { status: "validated", score: 88, note: DEFAULT_NOTES.actionAudit },
  criteriaValidity: { status: "uncertain", score: 40, note: DEFAULT_NOTES.criteriaValidity },
  regimeChange: { status: "uncertain", score: 35, note: DEFAULT_NOTES.regimeChange },
  signalVolatility: { status: "uncertain", score: 38, note: DEFAULT_NOTES.signalVolatility },
  trustVelocity: { status: "uncertain", score: 32, note: DEFAULT_NOTES.trustVelocity },
};

const INITIAL_QA = {
  q1: {
    answer: "",
    strong: false,
    ownerNamed: false,
    thresholdDefined: false,
    evidenceLevel: 45,
  },
  q2: {
    answer: "",
    closesLoopAtCriteria: false,
    ownerNamed: false,
    enforcementExists: false,
    evidenceLevel: 40,
  },
  q3: {
    answer: "",
    confidenceDynamic: false,
    simulatesAgedCriteria: false,
    evidenceLevel: 35,
  },
};

function getStatusFromScore(score) {
  if (score >= 70) return "validated";
  if (score >= 45) return "uncertain";
  return "risk";
}

function computeLayerState(qa) {
  const actionAuditScore = 88;

  const criteriaValidityScore = Math.max(
    0,
    Math.min(
      100,
      10 +
        (qa.q1.ownerNamed ? 25 : 0) +
        (qa.q1.thresholdDefined ? 25 : 0) +
        (qa.q1.strong ? 15 : 0) +
        qa.q1.evidenceLevel * 0.25
    )
  );

  const regimeChangeScore = Math.max(
    0,
    Math.min(
      100,
      5 +
        (qa.q1.thresholdDefined ? 35 : 0) +
        (qa.q1.ownerNamed ? 15 : 0) +
        qa.q1.evidenceLevel * 0.25
    )
  );

  const signalVolatilityScore = Math.max(
    0,
    Math.min(
      100,
      10 +
        (qa.q2.closesLoopAtCriteria ? 30 : 0) +
        (qa.q2.enforcementExists ? 20 : 0) +
        qa.q2.evidenceLevel * 0.25
    )
  );

  const trustVelocityScore = Math.max(
    0,
    Math.min(
      100,
      10 +
        (qa.q3.confidenceDynamic ? 35 : 0) +
        (qa.q3.simulatesAgedCriteria ? 20 : 0) +
        qa.q3.evidenceLevel * 0.25
    )
  );

  return {
    actionAudit: {
      status: getStatusFromScore(actionAuditScore),
      score: Math.round(actionAuditScore),
      note: DEFAULT_NOTES.actionAudit,
    },
    criteriaValidity: {
      status: getStatusFromScore(criteriaValidityScore),
      score: Math.round(criteriaValidityScore),
      note:
        qa.q1.answer ||
        DEFAULT_NOTES.criteriaValidity,
    },
    regimeChange: {
      status: getStatusFromScore(regimeChangeScore),
      score: Math.round(regimeChangeScore),
      note:
        qa.q1.thresholdDefined
          ? "Threshold-driven recalibration appears to exist or is partially evidenced."
          : "No clearly evidenced regime-change trigger yet.",
    },
    signalVolatility: {
      status: getStatusFromScore(signalVolatilityScore),
      score: Math.round(signalVolatilityScore),
      note:
        qa.q2.answer ||
        DEFAULT_NOTES.signalVolatility,
    },
    trustVelocity: {
      status: getStatusFromScore(trustVelocityScore),
      score: Math.round(trustVelocityScore),
      note:
        qa.q3.answer ||
        DEFAULT_NOTES.trustVelocity,
    },
  };
}

function computeDBL(layerState, qa) {
  const candidates = [];

  if (layerState.criteriaValidity.score < 45) {
    candidates.push({
      type: qa.q1.ownerNamed ? "T2" : "T3",
      name: qa.q1.ownerNamed ? "Criteria Drift Exposure" : "No Named Recalibration Owner",
      impact: 95 - layerState.criteriaValidity.score,
      source: "Q1 / Criteria Drift",
    });
  }

  if (layerState.regimeChange.score < 45) {
    candidates.push({
      type: qa.q1.ownerNamed ? "T2" : "T3",
      name: "Regime Change Recalibration Gap",
      impact: 90 - layerState.regimeChange.score,
      source: "Q1 / Regime Change",
    });
  }

  if (layerState.signalVolatility.score < 45) {
    candidates.push({
      type: qa.q2.ownerNamed ? "T2" : "T3",
      name: qa.q2.ownerNamed ? "Signal Routing Gap" : "Criteria Loop Lacks Ownership",
      impact: 92 - layerState.signalVolatility.score,
      source: "Q2 / Feedback Loop",
    });
  }

  if (layerState.trustVelocity.score < 45) {
    candidates.push({
      type: qa.q3.confidenceDynamic ? "T3" : "T5",
      name: qa.q3.confidenceDynamic ? "Static Confidence Governance Gap" : "Silent Distortion Window Exposure",
      impact: 88 - layerState.trustVelocity.score,
      source: "Q3 / Trust Velocity",
    });
  }

  const selected = candidates.sort((a, b) => b.impact - a.impact)[0] || {
    type: "T3",
    name: "Constraint Not Yet Confirmed",
    impact: 20,
    source: "Pending live answers",
  };

  const blocker =
    selected.type === "T5" ||
    (selected.type === "T3" && (!qa.q1.ownerNamed || !qa.q2.ownerNamed)) ||
    (selected.type === "T2" && (layerState.criteriaValidity.score < 35 || layerState.signalVolatility.score < 35));

  const flag = blocker ? "BLOCKER" : selected.impact > 35 ? "DEGRADER" : "NON-BLOCKING";
  const multiplier = flag === "BLOCKER" ? 0 : flag === "DEGRADER" ? 0.6 : 1;

  const rawPriority = 86;
  const adjustedPriority = Math.round(rawPriority * multiplier);

  const descriptionMap = {
    T2: "The system may be making live decisions against signals or criteria that are no longer calibrated to current freight conditions.",
    T3: "The loop that should trigger recalibration appears to lack a hard owner, trigger, or enforcement path.",
    T5: "The platform may be presenting execution confidence without a governance mechanism that knows when confidence should contract.",
  };

  const immediateActionMap = {
    T2: "Validate whether live market signals reach the quote decision layer for affected lanes and define the current criteria baseline.",
    T3: "Name a single owner for recalibration and define the trigger condition that forces review within 24 hours of breach.",
    T5: "Run a trust calibration review on outputs generated under changed market conditions and define where autonomy must step down.",
  };

  const sprintFocusMap = {
    T2: "4-week sprint: criteria validity and live signal routing",
    T3: "4-week sprint: recalibration ownership and enforcement architecture",
    T5: "4-week sprint: trust calibration and governance containment",
  };

  const boardRisk =
    selected.type === "T5"
      ? "Customer trust and market position risk can remain hidden while the audit trail still looks clean."
      : selected.type === "T2"
      ? "Quotes can drift away from current market conditions without throwing an obvious system error."
      : "The system can surface a problem without any single person being accountable for closing the loop.";

  return {
    ...selected,
    flag,
    multiplier,
    rawPriority,
    adjustedPriority,
    description: descriptionMap[selected.type] || "Constraint still being validated live.",
    immediateAction: immediateActionMap[selected.type] || "Validate the constraint.",
    sprintFocus: sprintFocusMap[selected.type] || "4-week validation sprint",
    boardRisk,
    owner: selected.type === "T3" ? "CTO / VP Engineering" : selected.type === "T5" ? "CEO + CTO" : "Product / Ops Engineering",
  };
}

function scoreSummary(layerState, dbl) {
  const cgmComposite = Math.round(
    (layerState.criteriaValidity.score / 10 + layerState.regimeChange.score / 10 + layerState.trustVelocity.score / 10) * 1
  );
  const ces = Math.round(
    layerState.actionAudit.score * 0.2 +
      layerState.criteriaValidity.score * 0.3 +
      layerState.signalVolatility.score * 0.2 +
      layerState.trustVelocity.score * 0.3
  );
  const viability = dbl.flag === "BLOCKER" ? 68 : dbl.flag === "DEGRADER" ? 77 : 85;
  const adoptionRisk = dbl.flag === "BLOCKER" ? 81 : dbl.flag === "DEGRADER" ? 64 : 48;
  const opportunity = dbl.flag === "BLOCKER" ? 92 : dbl.flag === "DEGRADER" ? 86 : 72;

  let verdict = "Maturing";
  if (ces <= 40) verdict = "Recalibration Flag";
  else if (ces <= 65) verdict = "Watch Zone";
  else if (ces <= 85) verdict = "Maturing";
  else verdict = "Self-Correcting";

  return { cgmComposite, ces, viability, adoptionRisk, opportunity, verdict };
}

function LayerNode({ data }) {
  const style = STATUS_STYLES[data.status] || STATUS_STYLES.uncertain;
  const Icon = data.icon || CircleDot;

  return (
    <div className={`min-w-[250px] max-w-[250px] rounded-2xl border ${style.border} ${style.bg} ${style.ring} ring-1 shadow-2xl backdrop-blur-md`}>
      <Handle type="target" position={Position.Top} className="!bg-white/60 !border-none !w-2 !h-2" />
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-white/45">{data.category}</div>
            <div className="mt-1 text-sm font-semibold text-white">{data.label}</div>
          </div>
          <div className={`rounded-xl p-2 ${style.bg} border ${style.border}`}>
            <Icon className={`h-4 w-4 ${style.text}`} />
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between">
          <Badge variant="outline" className={style.badge}>{style.label}</Badge>
          <div className="text-sm font-semibold text-white">{data.score}/100</div>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-white/70">{data.subtitle}</p>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-white/60 !border-none !w-2 !h-2" />
    </div>
  );
}

function DBLNode({ data }) {
  const statusTone = data.flag === "BLOCKER" ? STATUS_STYLES.risk : data.flag === "DEGRADER" ? STATUS_STYLES.uncertain : STATUS_STYLES.validated;

  return (
    <div className={`min-w-[310px] max-w-[310px] rounded-3xl border ${statusTone.border} ${statusTone.bg} ${statusTone.ring} ring-1 shadow-[0_20px_80px_rgba(0,0,0,0.35)]`}>
      <Handle type="target" position={Position.Left} className="!bg-white/60 !border-none !w-2 !h-2" />
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-[11px] uppercase tracking-[0.25em] text-white/45">DBL Live Verdict</div>
            <div className="mt-1 text-base font-semibold text-white">{data.type} — {data.name}</div>
          </div>
          <div className={`rounded-2xl p-2 border ${statusTone.border} ${statusTone.bg}`}>
            <AlertTriangle className={`h-5 w-5 ${statusTone.text}`} />
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <Badge variant="outline" className={statusTone.badge}>{data.flag}</Badge>
          <Badge variant="outline" className="border-white/15 bg-white/5 text-white/80">Owner: {data.owner}</Badge>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-white/80">{data.description}</p>
        <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
            <div className="text-white/45">Raw Priority</div>
            <div className="mt-1 text-lg font-semibold text-white">{data.rawPriority}</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
            <div className="text-white/45">DBL Adjusted</div>
            <div className="mt-1 text-lg font-semibold text-white">{data.adjustedPriority}</div>
          </div>
        </div>
        <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-3">
          <div className="text-xs uppercase tracking-[0.2em] text-white/45">Immediate action</div>
          <p className="mt-2 text-sm text-white/80">{data.immediateAction}</p>
        </div>
      </div>
    </div>
  );
}

function OpportunityNode({ data }) {
  return (
    <div className="min-w-[300px] max-w-[300px] rounded-3xl border border-sky-400/30 bg-sky-500/10 ring-1 ring-sky-500/20 shadow-2xl">
      <Handle type="target" position={Position.Left} className="!bg-white/60 !border-none !w-2 !h-2" />
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-[11px] uppercase tracking-[0.25em] text-white/45">Sprint recommendation</div>
            <div className="mt-1 text-base font-semibold text-white">4-Week Paid Sprint</div>
          </div>
          <div className="rounded-2xl border border-sky-400/30 bg-sky-500/10 p-2">
            <Briefcase className="h-5 w-5 text-sky-200" />
          </div>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-white/80">{data.sprintFocus}</p>
        <div className="mt-4 space-y-2 text-sm text-white/75">
          <div><span className="text-white">Week 1:</span> Validate whether the constraint is actually binding.</div>
          <div><span className="text-white">Week 2–3:</span> Design the recalibration, ownership, and enforcement layer.</div>
          <div><span className="text-white">Week 4:</span> Install the operating model and board-safe summary outputs.</div>
        </div>
      </div>
    </div>
  );
}

const nodeTypes = {
  layerNode: LayerNode,
  dblNode: DBLNode,
  opportunityNode: OpportunityNode,
};

function DashboardInner() {
  const [qa, setQa] = useState(INITIAL_QA);
  const layerState = useMemo(() => computeLayerState(qa), [qa]);
  const dbl = useMemo(() => computeDBL(layerState, qa), [layerState, qa]);
  const summary = useMemo(() => scoreSummary(layerState, dbl), [layerState, dbl]);

  const baseNodes = useMemo(() => {
    return [
      {
        id: "actionAudit",
        type: "layerNode",
        position: { x: 80, y: 40 },
        data: {
          category: "Layer 1",
          label: LAYER_META.actionAudit.short,
          subtitle: LAYER_META.actionAudit.subtitle,
          status: layerState.actionAudit.status,
          score: layerState.actionAudit.score,
          icon: LAYER_META.actionAudit.icon,
        },
      },
      {
        id: "criteriaValidity",
        type: "layerNode",
        position: { x: 80, y: 220 },
        data: {
          category: "Layer 2",
          label: LAYER_META.criteriaValidity.short,
          subtitle: LAYER_META.criteriaValidity.subtitle,
          status: layerState.criteriaValidity.status,
          score: layerState.criteriaValidity.score,
          icon: LAYER_META.criteriaValidity.icon,
        },
      },
      {
        id: "regimeChange",
        type: "layerNode",
        position: { x: 80, y: 400 },
        data: {
          category: "Layer 3",
          label: LAYER_META.regimeChange.short,
          subtitle: LAYER_META.regimeChange.subtitle,
          status: layerState.regimeChange.status,
          score: layerState.regimeChange.score,
          icon: LAYER_META.regimeChange.icon,
        },
      },
      {
        id: "signalVolatility",
        type: "layerNode",
        position: { x: 80, y: 580 },
        data: {
          category: "Layer 4",
          label: LAYER_META.signalVolatility.short,
          subtitle: LAYER_META.signalVolatility.subtitle,
          status: layerState.signalVolatility.status,
          score: layerState.signalVolatility.score,
          icon: LAYER_META.signalVolatility.icon,
        },
      },
      {
        id: "trustVelocity",
        type: "layerNode",
        position: { x: 80, y: 760 },
        data: {
          category: "Layer 5",
          label: LAYER_META.trustVelocity.short,
          subtitle: LAYER_META.trustVelocity.subtitle,
          status: layerState.trustVelocity.status,
          score: layerState.trustVelocity.score,
          icon: LAYER_META.trustVelocity.icon,
        },
      },
      {
        id: "dbl",
        type: "dblNode",
        position: { x: 470, y: 330 },
        data: dbl,
      },
      {
        id: "opportunity",
        type: "opportunityNode",
        position: { x: 860, y: 345 },
        data: dbl,
      },
    ];
  }, [layerState, dbl]);

  const baseEdges = useMemo(
    () => [
      ...LAYER_ORDER.slice(0, -1).map((id, index) => ({
        id: `${id}-${LAYER_ORDER[index + 1]}`,
        source: id,
        target: LAYER_ORDER[index + 1],
        animated: true,
        style: { stroke: "rgba(255,255,255,0.28)", strokeWidth: 2 },
        markerEnd: { type: MarkerType.ArrowClosed, color: "rgba(255,255,255,0.28)" },
      })),
      ...LAYER_ORDER.map((id) => ({
        id: `${id}-dbl`,
        source: id,
        target: "dbl",
        animated: id !== "actionAudit",
        style: { stroke: "rgba(125, 211, 252, 0.35)", strokeWidth: 1.5 },
        markerEnd: { type: MarkerType.ArrowClosed, color: "rgba(125, 211, 252, 0.35)" },
      })),
      {
        id: "dbl-opportunity",
        source: "dbl",
        target: "opportunity",
        animated: true,
        style: { stroke: "rgba(56, 189, 248, 0.55)", strokeWidth: 2.5 },
        markerEnd: { type: MarkerType.ArrowClosed, color: "rgba(56, 189, 248, 0.55)" },
      },
    ],
    []
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(baseNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(baseEdges);

  useEffect(() => setNodes(baseNodes), [baseNodes, setNodes]);
  useEffect(() => setEdges(baseEdges), [baseEdges, setEdges]);

  const updateQa = (question, patch) => {
    setQa((prev) => ({
      ...prev,
      [question]: {
        ...prev[question],
        ...patch,
      },
    }));
  };

  const resetBoard = useCallback(() => {
    setQa(INITIAL_QA);
  }, []);

  return (
    <div className="min-h-screen bg-[#070b14] text-white">
      <div className="mx-auto max-w-[1700px] p-6 md:p-8">
        <div className="mb-6 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <Card className="border-white/10 bg-white/[0.03] backdrop-blur-xl">
            <CardHeader className="pb-2">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-[0.25em] text-white/45">Epoch Frameworks LLC</div>
                  <CardTitle className="mt-1 text-2xl font-semibold">Aircon CEO Live Constraint Map</CardTitle>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/70">
                    Built for a 20-minute CEO conversation: validate the 3 governance questions, light up the 5-layer map, surface one DBL verdict, and make the 4-week sprint feel like the rational next step.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="border-white/15 bg-white/5 text-white/80">MOC v4.5 / DBL</Badge>
                  <Badge variant="outline" className="border-white/15 bg-white/5 text-white/80">AI Adoption Architect v6.4</Badge>
                  <Badge variant="outline" className="border-white/15 bg-white/5 text-white/80">Fractional CXO v2.5</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="grid gap-3 md:grid-cols-4">
                <MetricCard label="CGM Composite" value={`${summary.cgmComposite}/30`} sub={summary.verdict} />
                <MetricCard label="CES" value={`${summary.ces}/100`} sub="Governance maturity" />
                <MetricCard label="Adoption Risk" value={`${summary.adoptionRisk}/100`} sub="Current signal" />
                <MetricCard label="Engagement Opportunity" value={`${summary.opportunity}/100`} sub="Paid sprint strength" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-white/10 bg-white/[0.03] backdrop-blur-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Call close language</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-white/80">
              <p>
                “Based on what you just said, the system looks strong operationally, but <span className="text-white font-medium">{dbl.name.toLowerCase()}</span> appears to be the binding constraint.”
              </p>
              <p>
                “If that’s real, this is usually a <span className="text-white font-medium">3–4 week fix</span>, not a long consulting engagement.”
              </p>
              <p>
                “Week 1 validates whether the constraint is actually binding. Weeks 2–3 design the ownership and recalibration layer. Week 4 installs it so it runs without you thinking about it.”
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <Card className="min-h-[900px] border-white/10 bg-white/[0.03] backdrop-blur-xl">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between gap-3">
                <CardTitle className="text-lg">Live ReactFlow board</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white/10" onClick={resetBoard}>Reset</Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-[830px]">
              <div className="h-full w-full overflow-hidden rounded-3xl border border-white/10 bg-[#050914]">
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  onNodesChange={onNodesChange}
                  onEdgesChange={onEdgesChange}
                  nodeTypes={nodeTypes}
                  fitView
                  fitViewOptions={{ padding: 0.18 }}
                  proOptions={{ hideAttribution: true }}
                >
                  <Background gap={20} size={1} color="rgba(255,255,255,0.06)" />
                  <Controls className="!bg-black/30 !border !border-white/10 !rounded-xl !backdrop-blur" />
                </ReactFlow>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-white/10 bg-white/[0.03] backdrop-blur-xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">3 live questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <QuestionBlock
                  title="Q1 — Criteria Drift Detection"
                  prompt="When macro conditions shift, what tells the system the criteria need to be revisited, and who owns that?"
                  value={qa.q1}
                  onToggle={(field, val) => updateQa("q1", { [field]: val })}
                  onAnswer={(text) => updateQa("q1", { answer: text })}
                  onEvidence={(val) => updateQa("q1", { evidenceLevel: val })}
                  toggles={[
                    { key: "strong", label: "Strong answer" },
                    { key: "ownerNamed", label: "Named owner" },
                    { key: "thresholdDefined", label: "Defined threshold" },
                  ]}
                />
                <Separator className="bg-white/10" />
                <QuestionBlock
                  title="Q2 — Feedback Loop + Ownership"
                  prompt="When quotes diverge from reality, does the signal close the loop at the criteria layer, and who is accountable?"
                  value={qa.q2}
                  onToggle={(field, val) => updateQa("q2", { [field]: val })}
                  onAnswer={(text) => updateQa("q2", { answer: text })}
                  onEvidence={(val) => updateQa("q2", { evidenceLevel: val })}
                  toggles={[
                    { key: "closesLoopAtCriteria", label: "Closes loop at criteria layer" },
                    { key: "ownerNamed", label: "Named owner" },
                    { key: "enforcementExists", label: "Enforcement exists" },
                  ]}
                />
                <Separator className="bg-white/10" />
                <QuestionBlock
                  title="Q3 — Trust Velocity Calibration"
                  prompt="How would they know if 60-day-old criteria were still being used today, and does confidence evolve from day 1 to day 180?"
                  value={qa.q3}
                  onToggle={(field, val) => updateQa("q3", { [field]: val })}
                  onAnswer={(text) => updateQa("q3", { answer: text })}
                  onEvidence={(val) => updateQa("q3", { evidenceLevel: val })}
                  toggles={[
                    { key: "confidenceDynamic", label: "Confidence is dynamic" },
                    { key: "simulatesAgedCriteria", label: "Can test aged criteria" },
                  ]}
                />
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/[0.03] backdrop-blur-xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">DBL summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm text-white/80">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className={dbl.flag === "BLOCKER" ? STATUS_STYLES.risk.badge : dbl.flag === "DEGRADER" ? STATUS_STYLES.uncertain.badge : STATUS_STYLES.validated.badge}>{dbl.flag}</Badge>
                  <Badge variant="outline" className="border-white/15 bg-white/5 text-white/80">{dbl.type}</Badge>
                  <Badge variant="outline" className="border-white/15 bg-white/5 text-white/80">Owner: {dbl.owner}</Badge>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.2em] text-white/45">Constraint</div>
                  <div className="mt-1 text-base font-semibold text-white">{dbl.name}</div>
                </div>
                <p>{dbl.description}</p>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-white/45">Board-safe risk statement</div>
                  <p className="mt-2">{dbl.boardRisk}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-white/45">4-week sprint focus</div>
                  <p className="mt-2">{dbl.sprintFocus}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/[0.03] backdrop-blur-xl">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Meeting notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  className="min-h-[140px] border-white/10 bg-white/5 text-white placeholder:text-white/35"
                  placeholder="Use this space to capture exact phrases Chris uses. Those phrases will help you tighten the sprint ask right after the call."
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function QuestionBlock({ title, prompt, value, onToggle, onAnswer, onEvidence, toggles }) {
  return (
    <div className="space-y-3">
      <div>
        <div className="text-sm font-semibold text-white">{title}</div>
        <p className="mt-1 text-sm leading-relaxed text-white/70">{prompt}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {toggles.map((toggle) => (
          <Button
            key={toggle.key}
            type="button"
            variant="outline"
            onClick={() => onToggle(toggle.key, !value[toggle.key])}
            className={`${value[toggle.key] ? "border-sky-400/40 bg-sky-500/15 text-sky-100" : "border-white/15 bg-white/5 text-white/70"} hover:bg-white/10`}
          >
            {value[toggle.key] ? <CheckCircle2 className="mr-2 h-4 w-4" /> : <ArrowRight className="mr-2 h-4 w-4" />}
            {toggle.label}
          </Button>
        ))}
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/45">
          <span>Evidence level</span>
          <span>{value.evidenceLevel}/100</span>
        </div>
        <Slider value={[value.evidenceLevel]} min={0} max={100} step={1} onValueChange={(vals) => onEvidence(vals[0])} />
      </div>
      <Textarea
        value={value.answer}
        onChange={(e) => onAnswer(e.target.value)}
        className="min-h-[96px] border-white/10 bg-white/5 text-white placeholder:text-white/35"
        placeholder="Capture the strongest phrase or answer you hear live."
      />
    </div>
  );
}

function MetricCard({ label, value, sub }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="text-xs uppercase tracking-[0.2em] text-white/45">{label}</div>
      <div className="mt-2 text-2xl font-semibold text-white">{value}</div>
      <div className="mt-1 text-sm text-white/65">{sub}</div>
    </div>
  );
}

export default function AirconDBLDashboard() {
  return (
    <ReactFlowProvider>
      <DashboardInner />
    </ReactFlowProvider>
  );
}
