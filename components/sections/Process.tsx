import { Reveal } from "@/components/Reveal";
import { ClipboardList, FileText, Truck, Building2, CircleCheck, STROKE } from "@/components/icons";

// Same five steps as before. Two things changed: this was previously two
// completely separate markup trees (a desktop horizontal timeline and a mobile
// vertical one, ~170 lines of near-duplicate JSX), now it is one list whose
// connector rail flips orientation in CSS. And the rail no longer animates its
// own width on scroll, which was motion with nothing to communicate.

const STEPS = [
  { n: "01", title: "Free assessment", icon: ClipboardList, desc: "Tell us your scope, location and timeline. We respond within 2 hours with questions or a call." },
  { n: "02", title: "Custom quote", icon: FileText, desc: "Flat-rate pricing in writing within 24 hours. No hidden fees, no surprise charges." },
  { n: "03", title: "Logistics plan", icon: Truck, desc: "We coordinate trucks, crew, scheduling and permits. You approve the plan before anything moves." },
  { n: "04", title: "Full execution", icon: Building2, desc: "Our crew handles everything on site, with progress updates so you are never left guessing." },
  { n: "05", title: "Close-out report", icon: CircleCheck, desc: "Full asset manifest, disposal certificates and landlord-ready sign-off. Project complete." },
];

export default function Process() {
  return (
    <section id="process" className="py-24 lg:py-28 px-6 bg-[#141c33]">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mb-16 lg:mb-20">
          <h2 className="text-white text-3xl lg:text-[2.6rem] text-balance">
            From first call to final sign-off
          </h2>
          <p className="text-white/60 text-base mt-5 max-w-[58ch] leading-relaxed">
            Five steps, no jargon, no runaround. A documented project from start to finish.
          </p>
        </div>

        <div className="relative">
          {/* One rail, two orientations: a vertical spine on mobile, a
              horizontal track behind the nodes from lg up. */}
          <div
            aria-hidden="true"
            className="absolute bg-white/[0.10] left-[19px] top-2 bottom-2 w-px lg:left-0 lg:right-0 lg:top-[19px] lg:bottom-auto lg:h-px lg:w-auto"
          />

          <ol className="relative list-none m-0 p-0 grid gap-10 lg:grid-cols-5 lg:gap-6">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const isLast = i === STEPS.length - 1;
              return (
                <Reveal as="li" key={step.n} index={i} className="relative pl-14 lg:pl-0">
                  <span
                    className={`absolute left-0 top-0 lg:static flex items-center justify-center w-[39px] h-[39px] rounded-full lg:mb-7 ${
                      isLast
                        ? "bg-[#c7ccd6] border border-[#c7ccd6] text-[#0e1530]"
                        : "bg-[#141c33] border border-white/[0.22] text-[#c7ccd6]"
                    }`}
                  >
                    <Icon size={17} strokeWidth={STROKE} aria-hidden="true" />
                  </span>

                  <span className="block font-heading text-[11px] tabular-nums tracking-[0.14em] text-white/35 mb-2">
                    {step.n}
                  </span>
                  <h3 className="text-white text-base mb-2">{step.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed lg:pr-4">{step.desc}</p>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
