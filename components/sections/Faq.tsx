import { Reveal } from "@/components/Reveal";

// Shared by the homepage and every service page. Two deliberate choices:
//
// 1. Not an accordion. Collapsed answers are still in the DOM so Google can read
//    them, but a two-column open list reads faster for a buyer scanning for one
//    specific answer, and it needs zero JavaScript.
// 2. Real questions only. This section exists to catch the long-tail queries the
//    old single-page site could not rank for ("do you handle projects outside
//    Florida", "what is in a surrender clause"), so every Q is phrased the way a
//    facility manager would actually type it.
//
// The FAQPage JSON-LD is emitted by the page that renders this, not here, so a
// page never ships two competing FAQPage blocks.

export type FaqItem = { q: string; a: string };

export default function Faq({
  items,
  heading = "Common questions",
  className = "bg-[#0e1530]",
}: {
  items: FaqItem[];
  heading?: string;
  className?: string;
}) {
  return (
    <section id="faq" className={`py-24 lg:py-28 px-6 ${className}`}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-white text-3xl lg:text-[2.6rem] mb-14 max-w-2xl text-balance">{heading}</h2>

        <dl className="grid md:grid-cols-2 gap-x-14 gap-y-0 m-0">
          {items.map((item, i) => (
            <Reveal key={item.q} index={i} className="border-t border-white/[0.10] py-7">
              <dt className="text-white text-[15px] font-semibold font-heading tracking-tight mb-2.5">
                {item.q}
              </dt>
              <dd className="text-white/60 text-sm leading-relaxed m-0 max-w-[60ch]">{item.a}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
