import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import { PhoneLink } from "@/components/TrackedLink";
import { BUSINESS } from "@/lib/site";
import { Phone, STROKE } from "@/components/icons";

// The old hero loaded a Spline WebGL scene plus two blurred "glow orbs" behind
// the copy. It never rendered in the Chrome MCP sandbox, it was the single
// largest chunk on the page, and a rotating abstract 3D object says nothing
// about clearing an office. Replaced with a real photograph of the deliverable:
// a cleared floor. The image is the LCP element, hence `priority`.
//
// Hero text elements are capped at four (eyebrow, headline, subtext, CTAs). The
// old trust row that lived here moved down into the proof strip.

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/cleared-office-floor.jpg"
          alt="An emptied corporate office floor with polished concrete swept clean, floor-to-ceiling windows overlooking the Southwest Florida coastline"
          fill
          priority
          sizes="100vw"
          className="object-cover object-right"
        />
        {/* Scrims, not decoration: they buy WCAG-safe contrast for the copy
            column while leaving the photo readable. Tuned so the cleared floor
            and the coastline are legible past the headline. Stacking two heavier
            gradients here flattened the image into a navy wash. */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e1530] via-[#0e1530]/72 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e1530] via-[#0e1530]/25 to-[#0e1530]/55" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-[1fr_400px] gap-x-14 gap-y-12 items-center">
          <div>
            <p className="label-upper text-[#c7ccd6] mb-6">
              Serving Fortune 1000 and business owners nationwide
            </p>

            {/* Two lines at desktop. The earlier wording ("Office furniture
                decommissioning and liquidation") ran to three lines at every
                width, so "furniture" moved down into the subtext where it still
                does its keyword job. */}
            <h1
              className="text-white mb-6"
              style={{ fontSize: "clamp(2.35rem, 5vw, 58px)", lineHeight: 1.06 }}
            >
              {/* The trailing space matters: without it the accessible name and
                  the text a crawler reads run together as "decommissioningand". */}
              Office decommissioning{" "}
              <br />
              and <span className="text-chrome">liquidation</span>.
            </h1>

            <p className="text-white/75 text-lg mb-9 max-w-[46ch] leading-relaxed">
              Moving out, downsizing, or clearing a space? We handle office furniture removal,
              logistics, documentation and asset resale under one contract.
            </p>

            <div className="flex flex-wrap gap-3">
              <PhoneLink
                event="phone_click_hero"
                className="btn-chrome inline-flex items-center gap-2 font-semibold px-7 py-3.5 rounded-md text-base no-underline"
              >
                <Phone size={16} strokeWidth={STROKE} aria-hidden="true" />
                Call {BUSINESS.phone}
              </PhoneLink>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-white/[0.07] hover:bg-white/[0.13] border border-white/[0.18] text-white font-semibold px-7 py-3.5 rounded-md text-base no-underline backdrop-blur-sm transition-colors duration-200"
              >
                Request free assessment
              </a>
            </div>
          </div>

          <div>
            <ContactForm variant="compact" subject="New OFB Hero Form Inquiry" />
          </div>
        </div>
      </div>
    </section>
  );
}
