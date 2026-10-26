import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import { BUSINESS, SITE_URL } from "@/lib/site";

// Jeff's own copy, lifted from his Carrd profile and set in the site's brand.
// Jeff's bio names a prior company; that name is left out here per the standing client rule,
// while keeping his experience narrative intact.

export const metadata: Metadata = {
  title: "About OFB of SW Florida | Office Decommissioning & Asset Brokerage",
  description:
    "Office Furniture Brokers of SW Florida handles office decommissioning and asset brokerage for corporate tenants, facility managers and Fortune 1000 companies. Led by Jeff Moore, 35+ years in the industry.",
  alternates: { canonical: `${SITE_URL}/about` },
};

const PARA = "text-white/60 text-[1.02rem] leading-[1.8] font-light";
const H2 = "font-heading text-white text-2xl lg:text-[2.1rem] tracking-tight text-balance";
const LABEL = "text-[#c7ccd6] text-xs font-semibold uppercase tracking-[0.18em]";

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main id="main" className="bg-[#0e1530] overflow-x-hidden">
        {/* Intro */}
        <section className="pt-36 lg:pt-44 pb-16 px-6">
          <div className="max-w-3xl mx-auto">
            <p className={LABEL}>About the company</p>
            <h1 className="font-heading text-white text-[2.3rem] lg:text-[3.1rem] font-medium leading-[1.1] tracking-tight text-balance mt-4">
              Office Furniture Brokers of SW Florida
            </h1>
            <p className={`${PARA} mt-6`}>
              OFB of SWFL specializes in office furniture decommissioning and asset brokerage for
              commercial tenants, landlords, office furniture dealers, facility managers, Fortune 1000
              businesses, private businesses and corporate real estate teams. We help organizations
              close out spaces on time, reduce liability, and handle the removal of unneeded assets in
              the most responsible and cost-effective way possible.
            </p>
          </div>
        </section>

        {/* Company story */}
        <section className="py-16 px-6 border-t border-white/[0.07] bg-[#111a36]">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className={H2}>End-to-end, not just removal</h2>
            <p className={PARA}>
              Our work goes far beyond simple removal. OFB of SWFL manages the entire decommissioning
              process from start to finish, including assessment, coordination, removal,
              transportation, resale, recycling, donation, and the documentation required for landlord
              sign-off. We ensure projects are completed within your required timeline so your team can
              focus on business continuity, not logistics.
            </p>
            <p className={PARA}>
              We maintain a nationwide network of trusted partners, including movers, installers,
              transport companies, and resale channels. This lets us handle projects of any size,
              anywhere in the country, while keeping a consistent, reliable process for our clients.
            </p>
            <p className={PARA}>
              Sustainability is a core part of how we operate. Whenever possible, we prioritize resale,
              reuse, recycling, and donation to reduce landfill impact and maximize asset value. Our
              brokerage model connects usable furniture and equipment with buyers, dealers, and end
              users across the U.S., extending the life of commercial assets and minimizing waste.
            </p>
          </div>
        </section>

        {/* Leadership & experience */}
        <section className="py-16 lg:py-20 px-6 border-t border-white/[0.07]">
          <div className="max-w-3xl mx-auto">
            <p className={LABEL}>Leadership &amp; experience</p>
            <div className="flex items-center gap-4 mt-5 mb-8">
              <Image
                src="/jeff-moore.jpg"
                alt={BUSINESS.founder}
                width={56}
                height={56}
                className="rounded-full object-cover object-top"
                style={{ aspectRatio: "1/1" }}
              />
              <span>
                <span className="block text-white font-heading font-semibold">{BUSINESS.founder}</span>
                <span className="block text-white/45 text-sm">President, {BUSINESS.shortName}</span>
              </span>
            </div>
            <div className="space-y-6">
              <p className={PARA}>
                Jeff Moore, President of OFB of SWFL, brings more than 35 years of experience in the
                office furniture industry, both in business ownership and vendor relations. His
                background includes decades of work with customers, vendors, employees, manufacturers,
                remanufacturers, office furniture dealers, brokers, facilities managers, Fortune 1000
                companies and business owners of large, medium and small private companies. That
                experience gives him a deep understanding of the operational and financial sides of
                asset liquidation and decommissioning.
              </p>
              <p className={PARA}>
                For three decades, Jeff built and led an office furniture company in Kansas City,
                Missouri, serving both Fortune 1000 companies and small to mid-sized businesses across
                the United States. Over those years he was directly involved in hundreds of
                decommissioning and liquidation projects of varying scale and complexity.
              </p>
              <p className={PARA}>
                Jeff founded OFB of SW Florida, bringing with him a nationwide network of
                dealers, brokers, commercial movers, installation companies, logistics partners, and
                resale channels. That network lets OFB of SWFL move quickly, solve problems
                efficiently, and adapt to the specific needs of each client.
              </p>
              <p className={PARA}>
                Jeff understands the challenges business owners, facilities managers, and corporate
                real estate teams face when relocating, downsizing, or exiting a space. OFB of SWFL was
                built to remove friction from that process and deliver results on your timeline, period.
              </p>
            </div>
          </div>
        </section>

        {/* What we do */}
        <section className="py-16 px-6 border-t border-white/[0.07] bg-[#0b1128]">
          <div className="max-w-3xl mx-auto">
            <h2 className={H2}>What we do</h2>
            <ul className="mt-8 space-y-4 list-none p-0 m-0">
              {[
                "Solve problems related to office furniture liquidation and decommissioning.",
                "Remove unneeded assets responsibly.",
                "Manage logistics, documentation, and compliance.",
                "Reduce cost, risk, and landfill impact.",
              ].map((item) => (
                <li key={item} className="flex gap-3 text-white/70 text-[1.02rem] leading-relaxed">
                  <span className="text-[#c7ccd6] mt-1 shrink-0" aria-hidden="true">&mdash;</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className={`${PARA} mt-8`}>
              If you have an upcoming move, closure, or asset liquidation project, OFB of SW Florida is
              positioned to handle it from start to finish, any size and anywhere in the U.S.
            </p>
            <div className="mt-10">
              <Link
                href="/#contact"
                className="btn-chrome inline-flex items-center font-semibold px-6 py-3 rounded-md no-underline"
              >
                Request a free assessment
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
