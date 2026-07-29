import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/lib/services";
import { PhoneLink, EmailLink } from "@/components/TrackedLink";
import { BUSINESS, CRM_URL } from "@/lib/site";
import { ArrowUpRight } from "@/components/icons";

// Footer service links now point at the real service pages instead of all
// pointing back at the same #services anchor. That is four wasted internal links
// recovered, and internal linking is most of what tells Google which of your
// pages matter.
//
// Privacy and terms added: they were missing entirely, and the absence is both a
// trust signal problem for corporate buyers and a gap for anyone running ads.

const COL_LINK = "text-white/45 hover:text-white text-sm no-underline transition-colors";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.09] bg-[#0b1128] py-14 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 lg:gap-16 mb-12">
          <div>
            <Image
              src="/ofb-logo.png"
              alt={`${BUSINESS.name} logo`}
              width={59}
              height={48}
              className="mb-5"
            />
            <p className="text-white/40 text-sm max-w-xs leading-relaxed m-0">
              Full-service office decommissioning and asset liquidation for corporate tenants and
              Fortune 1000 companies nationwide.
            </p>
          </div>

          <div>
            <h2 className="label-field text-white/35 mb-5">Services</h2>
            <ul className="list-none m-0 p-0 space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link href={`/services/${s.slug}`} className={COL_LINK}>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="label-field text-white/35 mb-5">Contact</h2>
            <ul className="list-none m-0 p-0 space-y-2.5">
              <li>
                <PhoneLink event="phone_click_footer" className={COL_LINK} />
              </li>
              <li>
                <EmailLink event="email_click_footer" className={COL_LINK} />
              </li>
              <li>
                <span className="text-white/35 text-sm">
                  {BUSINESS.city}, {BUSINESS.region}. Serving nationwide.
                </span>
              </li>
            </ul>

            {/* Jeff asked for a way to reach his CRM from his own site. It used
                to be a 12%-opacity "Client Login" in the copyright bar, which is
                not findable. Same destination, promoted to a real control. */}
            <a
              href={CRM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-chrome label-upper inline-flex items-center gap-2 mt-7 px-4 py-2.5 rounded-sm no-underline"
            >
              Lead CRM
              <ArrowUpRight size={13} strokeWidth={2.5} aria-hidden="true" />
            </a>
            <p className="text-white/30 text-xs mt-2.5 m-0">
              Your leads, calls and quotes, one place.
            </p>
          </div>
        </div>

        <div className="border-t border-white/[0.07] pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs m-0">
            &copy; {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="text-white/30 hover:text-white/60 text-xs no-underline transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-white/30 hover:text-white/60 text-xs no-underline transition-colors">
              Terms
            </Link>
            <p className="text-white/25 text-xs m-0">
              {BUSINESS.city}, {BUSINESS.region} &middot; 48 states
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
