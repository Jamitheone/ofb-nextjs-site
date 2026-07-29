import Image from "next/image";
import { BUSINESS } from "@/lib/site";

// This was previously styled as a customer testimonial: five filled gold stars
// above a quote, over an Unsplash stock office photo. The quote is Jeff's own,
// so the stars were presenting the founder's words as a five-star customer
// review. That is misleading and it is exactly the kind of thing that costs a
// Google review snippet. Restyled as what it actually is, a founder statement,
// which still does the trust job without borrowing credibility it has not earned.
//
// Stock photo replaced with generated project photography per the no-stock rule.

export default function FounderNote() {
  return (
    <section aria-label={`A note from ${BUSINESS.founder}`} className="relative py-24 lg:py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image src="/server-teardown.jpg" alt="" fill sizes="100vw" className="object-cover opacity-[0.16]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e1530] via-[#0e1530]/90 to-[#0e1530]" />
      </div>

      <figure className="relative z-10 max-w-3xl mx-auto m-0 text-center">
        <blockquote className="m-0">
          <p className="font-heading text-white/90 text-[1.4rem] lg:text-[1.85rem] font-light leading-[1.45] tracking-tight text-balance">
            &ldquo;We&rsquo;ve handled projects from 5,000 to 500,000 square feet. Our clients
            don&rsquo;t manage vendors. They call us, and we handle the rest.&rdquo;
          </p>
        </blockquote>

        <figcaption className="flex items-center justify-center gap-4 mt-10">
          <Image
            src="/jeff-moore.jpg"
            alt={BUSINESS.founder}
            width={44}
            height={44}
            className="rounded-full object-cover object-top"
            style={{ aspectRatio: "1/1" }}
          />
          <span className="text-left">
            <span className="block text-white font-heading font-semibold text-sm">{BUSINESS.founder}</span>
            <span className="block text-white/45 text-[13px]">Founder, {BUSINESS.name}</span>
          </span>
        </figcaption>
      </figure>
    </section>
  );
}
