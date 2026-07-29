import { Reveal } from "@/components/Reveal";

// This replaces the old animated counter bar. Two changes worth knowing about.
//
// 1. The counters are gone. Animating a number up from zero on a B2B services
//    page is decoration, and it was animating figures we cannot source.
// 2. Three of the four old figures are not shipped here: "$50M+ assets
//    managed", "100% on-time delivery" and "500+ projects completed" have no
//    source in anything Jeff has given us, and "5-Star Rated" was on the page
//    while the Google Business Profile has zero reviews, which is an FTC
//    endorsement problem and a review-snippet risk. Everything below is a claim
//    Jeff already makes in his own copy: the 48-state network, the 5k-500k sq ft
//    range, 10+ years, and the written guarantee.
//    Flagged for Jameson: if Jeff can source real project counts or recovery
//    dollars, they belong here and they will outperform what is on the page now.

const PROOF = [
  { figure: "48", unit: "states", label: "National vendor network" },
  { figure: "5k-500k", unit: "sq ft", label: "Project range handled" },
  { figure: "10+", unit: "years", label: "Operating since 2014" },
  { figure: "2", unit: "hour", label: "Response, business hours" },
];

export default function ProofStrip() {
  return (
    <section aria-label="Capability at a glance" className="border-y border-white/[0.09] bg-[#111a36]">
      <div className="max-w-7xl mx-auto px-6">
        <dl className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.09] m-0">
          {PROOF.map((p, i) => (
            <Reveal key={p.label} index={i}>
              <div className="py-8 lg:py-10 lg:px-8 lg:first:pl-0 lg:last:pr-0">
                <dd className="m-0 flex items-baseline gap-1.5 mb-1.5">
                  <span className="font-heading text-3xl lg:text-[2.6rem] text-[#c7ccd6] tabular-nums tracking-tight">
                    {p.figure}
                  </span>
                  <span className="text-white/45 text-sm font-medium">{p.unit}</span>
                </dd>
                <dt className="text-white/55 text-sm leading-snug">{p.label}</dt>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
