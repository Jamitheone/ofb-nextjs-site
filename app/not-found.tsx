import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import { PhoneLink } from "@/components/TrackedLink";
import { SERVICES } from "@/lib/services";
import { BUSINESS } from "@/lib/site";
import { ArrowRight, Phone, STROKE } from "@/components/icons";

// There was no 404 page, so a bad URL got the bare Next.js default. This one
// keeps the visitor in the funnel: real links out, plus the phone number, since
// most people who land here were looking for a way to contact Jeff.

export const metadata = { title: "Page not found", robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <>
      <div className="noise-overlay" />
      <Nav />
      <main id="main" className="bg-[#0e1530] min-h-[100dvh] flex items-center px-6 pt-32 pb-20">
        <div className="max-w-7xl mx-auto w-full">
          <p className="label-upper text-[#8b93a6] mb-5">404</p>
          <h1
            className="text-white mb-5 text-balance max-w-2xl"
            style={{ fontSize: "clamp(2rem, 4.4vw, 48px)", lineHeight: 1.1 }}
          >
            That page isn&rsquo;t here
          </h1>
          <p className="text-white/60 text-lg max-w-[52ch] leading-relaxed mb-10">
            The link may be out of date. Everything we do is below, or call{" "}
            {BUSINESS.founder.split(" ")[0]} directly and skip the browsing.
          </p>

          <div className="flex flex-wrap gap-3 mb-16">
            <PhoneLink
              event="phone_click_404"
              className="btn-chrome inline-flex items-center gap-2 font-semibold px-7 py-3.5 rounded-md text-base no-underline"
            >
              <Phone size={16} strokeWidth={STROKE} aria-hidden="true" />
              Call {BUSINESS.phone}
            </PhoneLink>
            <Link
              href="/"
              className="inline-flex items-center bg-white/[0.07] hover:bg-white/[0.13] border border-white/[0.18] text-white font-semibold px-7 py-3.5 rounded-md text-base no-underline transition-colors duration-200"
            >
              Back to home
            </Link>
          </div>

          <h2 className="label-field text-white/40 mb-5">Services</h2>
          <ul className="list-none m-0 p-0 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10">
            {SERVICES.map((s) => (
              <li key={s.slug} className="border-t border-white/[0.09]">
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex items-center justify-between gap-4 py-4 text-white/65 hover:text-white text-sm no-underline transition-colors"
                >
                  {s.title}
                  <ArrowRight
                    size={13}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="text-[#c7ccd6] transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}
