import Image from "next/image";
import { BUSINESS, FLORIDA_METROS } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

// Replaces the Three.js rotating globe. The globe was ~275 lines of WebGL that
// never rendered in the Chrome MCP sandbox, added the whole three.js bundle to
// the page, and communicated "we are on Earth".
//
// What replaces it does actual SEO work: naming the Florida metros statewide in
// crawlable text is the local relevance signal the old site had none of, since
// "48 states" alone gives Google nothing to match an "Orlando office
// decommissioning" query against. The metro list is also the areaServed in the
// LocalBusiness schema, so the on-page text and the structured data agree.

export default function Coverage() {
  return (
    <section id="coverage" className="relative py-24 lg:py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/swfl-aerial.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e1530] via-[#0e1530]/88 to-[#0e1530]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-14 lg:gap-20 items-start">
          <div>
            <p className="label-upper text-[#8b93a6] mb-4">Coverage</p>
            <h2 className="text-white text-3xl lg:text-[2.6rem] text-balance">
              Every Florida market. Working in 48 states.
            </h2>
            <p className="text-white/60 text-base mt-5 max-w-[54ch] leading-relaxed">
              We cover Florida end to end, from the Panhandle to the Keys, with crews on site for a
              walkthrough on short notice across every major metro. Beyond the state line, our vendor
              network covers the 48 contiguous states under one project plan and one invoice.
            </p>

            <dl className="grid grid-cols-2 gap-x-8 gap-y-6 mt-10 m-0 max-w-md">
              <div>
                <dd className="m-0 font-heading text-3xl text-[#c7ccd6] tabular-nums tracking-tight">48</dd>
                <dt className="text-white/50 text-sm mt-1">Contiguous states</dt>
              </div>
              <div>
                <dd className="m-0 font-heading text-3xl text-[#c7ccd6] tabular-nums tracking-tight">1</dd>
                <dt className="text-white/50 text-sm mt-1">Point of contact</dt>
              </div>
            </dl>
          </div>

          <div>
            <h3 className="label-field text-white/45 mb-5">
              Statewide Florida service area
            </h3>
            <ul className="list-none m-0 p-0 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-0">
              {FLORIDA_METROS.map((metro, i) => (
                <Reveal as="li" key={metro} index={i} className="border-b border-white/[0.08] py-3">
                  <span className="text-white/75 text-sm">{metro}</span>
                </Reveal>
              ))}
            </ul>
            <p className="text-white/40 text-[13px] mt-5 leading-relaxed">
              Outside these metros? Projects anywhere in the continental U.S. are handled through
              the national network.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
