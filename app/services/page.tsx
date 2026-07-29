import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import Contact from "@/components/sections/Contact";
import { Reveal } from "@/components/Reveal";
import { SERVICES } from "@/lib/services";
import { BUSINESS } from "@/lib/site";
import { BreadcrumbSchema } from "@/components/Schema";
import { SERVICE_ICONS, ArrowRight, STROKE } from "@/components/icons";

// Hub page for the service cluster. Gives the six service pages a single parent
// to link from, gives the nav a real "Services" destination, and gives Google an
// obvious index page for the topic.

export const metadata: Metadata = {
  title: "Office Decommissioning & Liquidation Services",
  description:
    "Six services covering the full office move-out: decommissioning, asset liquidation, furniture logistics, data center clearance, lease surrender planning and multi-site coordination.",
  alternates: { canonical: "/services" },
  openGraph: {
    type: "website",
    title: "Office Decommissioning & Liquidation Services | OFB of SWFL",
    description:
      "The full office move-out under one contract. Decommissioning, liquidation, logistics, data center clearance, lease surrender and multi-site coordination.",
    url: "/services",
    images: [{ url: "/loading-dock.jpg", width: 1200, height: 896, alt: "Office furniture staged for transport on a loading dock" }],
  },
};

export default function ServicesIndex() {
  return (
    <>
      <BreadcrumbSchema
        trail={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
      />

      <div className="noise-overlay" />
      <Nav />

      <main id="main" className="bg-[#0e1530] overflow-x-hidden">
        <header className="pt-36 pb-16 lg:pt-40 lg:pb-20 px-6 border-b border-white/[0.09]">
          <div className="max-w-7xl mx-auto">
            <nav aria-label="Breadcrumb" className="mb-9">
              <ol className="list-none m-0 p-0 flex items-center gap-2 text-[13px] text-white/40">
                <li>
                  <Link href="/" className="hover:text-white no-underline transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li aria-current="page" className="text-white/70">
                  Services
                </li>
              </ol>
            </nav>

            <h1
              className="text-white mb-5 text-balance max-w-3xl"
              style={{ fontSize: "clamp(2.1rem, 4.4vw, 52px)", lineHeight: 1.08 }}
            >
              Everything an office move-out needs, under one contract
            </h1>
            <p className="text-white/65 text-lg max-w-[62ch] leading-relaxed m-0">
              Six services that usually mean six vendors. {BUSINESS.founder} scopes the whole
              project, runs it with our own crew, and hands you one invoice and one set of
              close-out paperwork at the end.
            </p>
          </div>
        </header>

        <div className="px-6 py-20 lg:py-24">
          <ul className="max-w-7xl mx-auto list-none m-0 p-0 grid md:grid-cols-2 gap-4">
            {SERVICES.map((s, i) => {
              const Icon = SERVICE_ICONS[s.icon];
              return (
                <Reveal as="li" key={s.slug} index={i}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group flex flex-col h-full rounded-lg p-7 no-underline bg-white/[0.035] border border-white/[0.09] hover:border-[#c7ccd6]/45 hover:bg-white/[0.06] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c7ccd6]"
                  >
                    <Icon size={26} strokeWidth={STROKE} className="text-[#c7ccd6] mb-6" aria-hidden="true" />
                    <h2 className="text-white text-xl mb-2">{s.title}</h2>
                    <p className="text-[#c7ccd6]/85 text-[13px] font-medium mb-3.5">{s.tagline}</p>
                    <p className="text-white/60 text-sm leading-relaxed max-w-[52ch]">{s.desc}</p>
                    <span className="mt-auto pt-7 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#c7ccd6]">
                      View service
                      <ArrowRight
                        size={13}
                        strokeWidth={2}
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </ul>
        </div>

        <Contact subject="New OFB Inquiry (Services index)" />
      </main>

      <Footer />
    </>
  );
}
