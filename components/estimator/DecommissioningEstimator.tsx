"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const CONTACT_API_URL = "/api/contact";
const PHONE = "(816) 304-6755";
const PHONE_HREF = "tel:+18163046755";
const CALENDLY_HREF = "/#contact";

// ─── ESTIMATE MODEL ─────────────────────────────────────────────────────────
// Illustrative recovery value per usable square foot, before adjustments.
// Office decommissioning asset recovery, not furniture retail. These are
// reasonable planning heuristics, clearly labeled as an estimate, not a quote.
const BASE_LOW_PER_SQFT = 0.55;
const BASE_HIGH_PER_SQFT = 1.65;

type AssetKey =
  | "workstations"
  | "privateOffices"
  | "seating"
  | "storage"
  | "conference"
  | "techAV";

const ASSETS: { key: AssetKey; label: string; hint: string; weight: number }[] = [
  { key: "workstations", label: "Workstations & cubicles", hint: "Benching, panel systems, desks", weight: 1.0 },
  { key: "privateOffices", label: "Private offices", hint: "Executive desks, credenzas, casegoods", weight: 1.35 },
  { key: "seating", label: "Seating", hint: "Task chairs, lounge, guest seating", weight: 0.9 },
  { key: "storage", label: "Filing & storage", hint: "Lateral files, lockers, shelving", weight: 0.75 },
  { key: "conference", label: "Conference & collaboration", hint: "Boardroom tables, huddle rooms", weight: 1.15 },
  { key: "techAV", label: "Technology & AV", hint: "Monitors, displays, network gear", weight: 1.6 },
];

const CONDITIONS = [
  { key: "excellent", label: "Like new", hint: "Under 3 years, premium brands", factor: 1.35 },
  { key: "good", label: "Good", hint: "Well kept, current styles", factor: 1.0 },
  { key: "fair", label: "Fair", hint: "Functional, some wear", factor: 0.7 },
  { key: "mixed", label: "Mixed / unsure", hint: "A blend across the floor", factor: 0.85 },
] as const;

const TIMELINES = [
  { key: "asap", label: "ASAP", hint: "Lease is up or space is needed now", urgency: 3 },
  { key: "30days", label: "Within 30 days", hint: "Move-out scheduled", urgency: 2 },
  { key: "90days", label: "Within 90 days", hint: "Planning the transition", urgency: 1 },
  { key: "exploring", label: "Just exploring", hint: "No date set yet", urgency: 0 },
] as const;

type ConditionKey = (typeof CONDITIONS)[number]["key"];
type TimelineKey = (typeof TIMELINES)[number]["key"];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function fmtUSD(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
}

function computeEstimate(
  sqft: number,
  selected: Set<AssetKey>,
  condition: ConditionKey | "",
  timeline: TimelineKey | ""
) {
  if (!sqft || sqft <= 0 || selected.size === 0) return null;

  // Average the weights of the selected asset types so a heavier mix
  // (private offices, tech) lifts the range and a lighter mix lowers it.
  let weightSum = 0;
  ASSETS.forEach((a) => {
    if (selected.has(a.key)) weightSum += a.weight;
  });
  const mixFactor = weightSum / selected.size;

  const conditionFactor =
    CONDITIONS.find((c) => c.key === condition)?.factor ?? 0.85;

  // A tighter timeline slightly compresses recoverable value because there is
  // less runway to place assets with the highest-paying buyers.
  const urgency = TIMELINES.find((t) => t.key === timeline)?.urgency ?? 0;
  const timelineFactor = urgency >= 3 ? 0.92 : urgency === 2 ? 0.97 : 1.0;

  const low = sqft * BASE_LOW_PER_SQFT * mixFactor * conditionFactor * timelineFactor;
  const high = sqft * BASE_HIGH_PER_SQFT * mixFactor * conditionFactor * timelineFactor;

  return {
    low: Math.round(low / 50) * 50,
    high: Math.round(high / 50) * 50,
    urgency,
  };
}

// ─── ICONS ────────────────────────────────────────────────────────────────────
function CheckIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function ArrowRightIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}
function BackIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

// ─── STEP SHELL ─────────────────────────────────────────────────────────────
const stepVariants = {
  enter: { opacity: 0, y: 16 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
};

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function DecommissioningEstimator() {
  const [step, setStep] = useState(0); // 0..3 questions, 4 = result
  const [sqft, setSqft] = useState("");
  const [assets, setAssets] = useState<Set<AssetKey>>(new Set());
  const [timeline, setTimeline] = useState<TimelineKey | "">("");
  const [condition, setCondition] = useState<ConditionKey | "">("");

  // Capture form
  const [lead, setLead] = useState({ name: "", company: "", email: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const sqftNum = useMemo(() => parseInt(sqft.replace(/[^0-9]/g, ""), 10) || 0, [sqft]);

  const estimate = useMemo(
    () => computeEstimate(sqftNum, assets, condition, timeline),
    [sqftNum, assets, condition, timeline]
  );

  const toggleAsset = (key: AssetKey) => {
    setAssets((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const canAdvance =
    (step === 0 && sqftNum > 0) ||
    (step === 1 && assets.size > 0) ||
    (step === 2 && timeline !== "") ||
    (step === 3 && condition !== "");

  const urgencyRead = (() => {
    if (!estimate) return null;
    if (estimate.urgency >= 3)
      return {
        tag: "Move now",
        color: "#c8102e",
        line: "A tight timeline is the biggest risk to your recovery value. The faster we scope it, the more buyers we can line up before the space has to clear.",
      };
    if (estimate.urgency === 2)
      return {
        tag: "Plan this month",
        color: "#b8972e",
        line: "Thirty days is workable but the clock matters. Locking a plan now protects the top of your recovery range.",
      };
    if (estimate.urgency === 1)
      return {
        tag: "Good runway",
        color: "#3e63e4",
        line: "You have room to place assets with the highest paying buyers. This is the window where recovery value is strongest.",
      };
    return {
      tag: "Early planning",
      color: "#7b9fd4",
      line: "No date yet is fine. Getting the numbers now means you move with a plan instead of scrambling later.",
    };
  })();

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    const rangeText = estimate
      ? `${fmtUSD(estimate.low)} to ${fmtUSD(estimate.high)}`
      : "n/a";
    const assetList = ASSETS.filter((a) => assets.has(a.key)).map((a) => a.label).join(", ");
    const timelineLabel = TIMELINES.find((t) => t.key === timeline)?.label ?? "";
    const conditionLabel = CONDITIONS.find((c) => c.key === condition)?.label ?? "";
    try {
      const res = await fetch(CONTACT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: lead.name,
          company: lead.company,
          email: lead.email,
          size: `${sqftNum.toLocaleString("en-US")} sq ft`,
          timeline: timelineLabel,
          message: `Decommissioning Value Estimator result.\nEstimated recovery range: ${rangeText}\nAsset mix: ${assetList}\nCondition: ${conditionLabel}\nTimeline: ${timelineLabel}`,
          _captcha: "false",
          _subject: "New OFB Estimator Lead",
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("sent");
        (window as unknown as { fireFormConversion?: (u: { email?: string; name?: string }) => void }).fireFormConversion?.({
          email: lead.email,
          name: lead.name,
        });
      } else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  const lc = "block text-[10px] font-semibold text-white/40 uppercase tracking-widest mb-1.5";
  const ic =
    "w-full bg-white/[0.05] border border-white/[0.09] text-white text-sm px-3.5 py-2.5 rounded-lg focus:outline-none focus:border-[#3e63e4]/50 focus:bg-white/[0.07] transition-all duration-200 placeholder:text-white/20";

  const totalSteps = 4;
  const progress = step >= totalSteps ? 100 : Math.round((step / totalSteps) * 100);

  return (
    <section className="relative min-h-screen px-6 py-24 overflow-hidden">
      {/* ambient glow, matches site */}
      <div className="glow-orb absolute top-1/4 right-1/4 w-[600px] h-[400px] bg-[#3e63e4]/10" style={{ filter: "blur(130px)" }} />
      <div className="glow-orb absolute bottom-1/4 left-1/4 w-[400px] h-[300px] bg-[#0d1d4a]/18" style={{ filter: "blur(100px)" }} />

      <div className="relative max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <a href="/" className="inline-flex items-center gap-1.5 text-white/40 hover:text-white text-xs no-underline mb-8 transition-colors">
            <BackIcon size={14} /> Back to site
          </a>
          <p className="label-upper text-[#3e63e4]/70 mb-4">Decommissioning Value Estimator</p>
          <h1 className="text-3xl lg:text-5xl text-white mb-4">What is your office worth on the way out?</h1>
          <p className="text-white/45 text-base max-w-xl mx-auto" style={{ lineHeight: 1.8 }}>
            Answer four quick questions. Get an illustrative asset recovery range and a read on how urgent your project is. No account, no obligation.
          </p>
        </div>

        {/* Progress */}
        {step < totalSteps && (
          <div className="mb-10">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-semibold text-white/35 uppercase tracking-widest">
                Step {step + 1} of {totalSteps}
              </span>
              <span className="text-[10px] font-semibold text-white/35 uppercase tracking-widest">{progress}%</span>
            </div>
            <div className="h-1 w-full bg-white/[0.06] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#3e63e4] rounded-full"
                initial={false}
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 200, damping: 30 }}
              />
            </div>
          </div>
        )}

        {/* Card */}
        <div className="bg-white/[0.03] border border-white/[0.08] rounded-3xl p-8 lg:p-10 backdrop-blur-sm">
          <AnimatePresence mode="wait">
            {/* STEP 0 — SQ FT */}
            {step === 0 && (
              <motion.div key="s0" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
                <h2 className="text-2xl text-white mb-2">How large is the space?</h2>
                <p className="text-white/40 text-sm mb-7" style={{ lineHeight: 1.7 }}>
                  Total usable square footage being cleared. A rough number is fine.
                </p>
                <label className={lc}>Square footage</label>
                <div className="relative">
                  <input
                    className={`${ic} pr-16 text-lg`}
                    inputMode="numeric"
                    placeholder="25,000"
                    value={sqft}
                    onChange={(e) => setSqft(e.target.value)}
                    autoFocus
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 text-sm font-semibold">sq ft</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {[5000, 25000, 75000, 150000].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setSqft(v.toLocaleString("en-US"))}
                      className="text-xs text-white/50 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] rounded-full px-3 py-1.5 transition-colors cursor-pointer"
                    >
                      {v.toLocaleString("en-US")} sq ft
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* STEP 1 — ASSET MIX */}
            {step === 1 && (
              <motion.div key="s1" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
                <h2 className="text-2xl text-white mb-2">What is in the space?</h2>
                <p className="text-white/40 text-sm mb-7" style={{ lineHeight: 1.7 }}>
                  Select everything that applies. This shapes what buyers will pay.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {ASSETS.map((a) => {
                    const active = assets.has(a.key);
                    return (
                      <button
                        key={a.key}
                        type="button"
                        onClick={() => toggleAsset(a.key)}
                        className={`text-left rounded-xl border p-4 transition-all cursor-pointer ${
                          active
                            ? "bg-[#3e63e4]/12 border-[#3e63e4]/45"
                            : "bg-white/[0.03] border-white/[0.08] hover:border-white/20 hover:bg-white/[0.05]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-white text-sm font-semibold mb-0.5" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                              {a.label}
                            </p>
                            <p className="text-white/35 text-xs" style={{ lineHeight: 1.5 }}>{a.hint}</p>
                          </div>
                          <span
                            className={`flex-shrink-0 w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                              active ? "bg-[#3e63e4] border-[#3e63e4] text-white" : "border-white/20 text-transparent"
                            }`}
                          >
                            <CheckIcon size={12} />
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 2 — TIMELINE */}
            {step === 2 && (
              <motion.div key="s2" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
                <h2 className="text-2xl text-white mb-2">When does it need to happen?</h2>
                <p className="text-white/40 text-sm mb-7" style={{ lineHeight: 1.7 }}>
                  Timing drives how much value we can recover for you.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {TIMELINES.map((t) => {
                    const active = timeline === t.key;
                    return (
                      <button
                        key={t.key}
                        type="button"
                        onClick={() => setTimeline(t.key)}
                        className={`text-left rounded-xl border p-4 transition-all cursor-pointer ${
                          active ? "bg-[#3e63e4]/12 border-[#3e63e4]/45" : "bg-white/[0.03] border-white/[0.08] hover:border-white/20 hover:bg-white/[0.05]"
                        }`}
                      >
                        <p className="text-white text-sm font-semibold mb-0.5" style={{ fontFamily: "var(--font-space-grotesk)" }}>{t.label}</p>
                        <p className="text-white/35 text-xs" style={{ lineHeight: 1.5 }}>{t.hint}</p>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 3 — CONDITION */}
            {step === 3 && (
              <motion.div key="s3" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.25 }}>
                <h2 className="text-2xl text-white mb-2">What kind of shape is it in?</h2>
                <p className="text-white/40 text-sm mb-7" style={{ lineHeight: 1.7 }}>
                  Condition is one of the biggest levers on recovery value.
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {CONDITIONS.map((c) => {
                    const active = condition === c.key;
                    return (
                      <button
                        key={c.key}
                        type="button"
                        onClick={() => setCondition(c.key)}
                        className={`text-left rounded-xl border p-4 transition-all cursor-pointer ${
                          active ? "bg-[#3e63e4]/12 border-[#3e63e4]/45" : "bg-white/[0.03] border-white/[0.08] hover:border-white/20 hover:bg-white/[0.05]"
                        }`}
                      >
                        <p className="text-white text-sm font-semibold mb-0.5" style={{ fontFamily: "var(--font-space-grotesk)" }}>{c.label}</p>
                        <p className="text-white/35 text-xs" style={{ lineHeight: 1.5 }}>{c.hint}</p>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* STEP 4 — RESULT */}
            {step === 4 && estimate && urgencyRead && (
              <motion.div key="s4" variants={stepVariants} initial="enter" animate="center" exit="exit" transition={{ duration: 0.3 }}>
                {status === "sent" ? (
                  <div className="text-center py-6">
                    <div className="w-16 h-16 mx-auto rounded-full bg-[#3e63e4]/12 border border-[#3e63e4]/25 flex items-center justify-center mb-5 text-[#3e63e4]">
                      <CheckIcon size={28} />
                    </div>
                    <h2 className="text-2xl text-white mb-3">Your estimate is on its way</h2>
                    <p className="text-white/45 text-sm max-w-md mx-auto mb-8" style={{ lineHeight: 1.8 }}>
                      Jeff will review your project and reach out within 1 business day with a firm recovery plan. Need to move faster? Call{" "}
                      <a href={PHONE_HREF} className="text-white font-semibold no-underline">{PHONE}</a>.
                    </p>
                    <a
                      href={CALENDLY_HREF}
                      className="inline-flex items-center gap-2 bg-[#3e63e4] hover:bg-[#2d4fc7] text-white font-semibold px-7 py-3 rounded-lg text-sm no-underline shadow-xl shadow-[#3e63e4]/25 transition-colors cursor-pointer"
                    >
                      Book a call with Jeff <ArrowRightIcon size={14} />
                    </a>
                  </div>
                ) : (
                  <>
                    <p className="label-upper text-[#3e63e4]/70 mb-3 text-center">Estimated asset recovery</p>
                    <div className="text-center mb-2">
                      <span className="text-4xl lg:text-5xl text-white font-bold" style={{ fontFamily: "var(--font-space-grotesk)", letterSpacing: "-0.04em" }}>
                        {fmtUSD(estimate.low)}
                      </span>
                      <span className="text-white/30 text-2xl mx-2">to</span>
                      <span className="text-4xl lg:text-5xl text-white font-bold" style={{ fontFamily: "var(--font-space-grotesk)", letterSpacing: "-0.04em" }}>
                        {fmtUSD(estimate.high)}
                      </span>
                    </div>
                    <p className="text-center text-white/35 text-xs mb-7">
                      Illustrative range for {sqftNum.toLocaleString("en-US")} sq ft. This is an estimate, not a quote.
                    </p>

                    {/* Urgency read */}
                    <div
                      className="rounded-2xl border p-5 mb-8"
                      style={{ backgroundColor: `${urgencyRead.color}12`, borderColor: `${urgencyRead.color}33` }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: urgencyRead.color }} />
                        <span className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: urgencyRead.color }}>
                          {urgencyRead.tag}
                        </span>
                      </div>
                      <p className="text-white/55 text-sm" style={{ lineHeight: 1.7 }}>{urgencyRead.line}</p>
                    </div>

                    {/* Capture */}
                    <div className="border-t border-white/[0.07] pt-7">
                      <h3 className="text-white text-lg mb-1" style={{ fontFamily: "var(--font-space-grotesk)", letterSpacing: "-0.02em" }}>
                        Get your detailed recovery plan
                      </h3>
                      <p className="text-white/40 text-sm mb-5" style={{ lineHeight: 1.7 }}>
                        We will send a project breakdown and reach out to lock your numbers.
                      </p>
                      <form onSubmit={submitLead} className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label className={lc}>Your name</label>
                            <input className={ic} placeholder="First Last" value={lead.name} onChange={(e) => setLead((l) => ({ ...l, name: e.target.value }))} required />
                          </div>
                          <div>
                            <label className={lc}>Company</label>
                            <input className={ic} placeholder="Acme Corp" value={lead.company} onChange={(e) => setLead((l) => ({ ...l, company: e.target.value }))} />
                          </div>
                        </div>
                        <div>
                          <label className={lc}>Work email</label>
                          <input className={ic} type="email" placeholder="you@company.com" value={lead.email} onChange={(e) => setLead((l) => ({ ...l, email: e.target.value }))} required />
                        </div>
                        <motion.button
                          type="submit"
                          disabled={status === "sending"}
                          className="w-full bg-[#3e63e4] hover:bg-[#2d4fc7] text-white font-semibold py-3.5 rounded-lg shadow-xl shadow-[#3e63e4]/20 transition-colors disabled:opacity-60 cursor-pointer flex items-center justify-center gap-2"
                          whileHover={{ scale: 1.01, y: -1 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {status === "sending" ? "Sending..." : "Send my recovery plan"}
                          {status !== "sending" && <ArrowRightIcon size={14} />}
                        </motion.button>
                        {status === "error" && (
                          <p className="text-red-400 text-xs text-center">
                            Something went wrong. Please call us at{" "}
                            <a href={PHONE_HREF} className="underline">{PHONE}</a>.
                          </p>
                        )}
                      </form>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Nav buttons */}
          {step < totalSteps && (
            <div className="flex items-center justify-between mt-9">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="inline-flex items-center gap-1.5 text-white/40 hover:text-white text-sm transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
              >
                <BackIcon size={14} /> Back
              </button>
              <button
                type="button"
                onClick={() => setStep((s) => s + 1)}
                disabled={!canAdvance}
                className="inline-flex items-center gap-2 bg-[#3e63e4] hover:bg-[#2d4fc7] text-white font-semibold px-7 py-3 rounded-lg text-sm shadow-xl shadow-[#3e63e4]/25 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                {step === totalSteps - 1 ? "See my estimate" : "Continue"} <ArrowRightIcon size={14} />
              </button>
            </div>
          )}

          {step === totalSteps && status !== "sent" && (
            <div className="flex items-center justify-center mt-9">
              <button
                type="button"
                onClick={() => setStep(0)}
                className="inline-flex items-center gap-1.5 text-white/40 hover:text-white text-sm transition-colors cursor-pointer"
              >
                <BackIcon size={14} /> Start over
              </button>
            </div>
          )}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-white/25 text-xs mt-8 max-w-lg mx-auto" style={{ lineHeight: 1.7 }}>
          This estimate is illustrative and based on the details you provide. It is not a quote and not financial or legal advice. Actual recovery value depends on a full on site assessment.
        </p>
      </div>
    </section>
  );
}
