import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";

// Shared shell for /privacy and /terms so the two pages are one layout, not two.
// Both were missing entirely, which is a gap for corporate buyers running vendor
// checks and for anyone pointing paid traffic at the site.
//
// FLAGGED FOR JAMESON: the copy on these two pages describes what the site
// factually does (form to email plus GHL, Google Ads conversion tags,
// LeadConnector chat widget). It is accurate, not legal advice, and Jeff's
// counsel should read it before he leans on it.

export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="noise-overlay" />
      <Nav />
      <main id="main" className="bg-[#0e1530] overflow-x-hidden">
        <div className="max-w-3xl mx-auto px-6 pt-36 pb-24 lg:pt-40">
          <nav aria-label="Breadcrumb" className="mb-9">
            <ol className="list-none m-0 p-0 flex items-center gap-2 text-[13px] text-white/40">
              <li>
                <Link href="/" className="hover:text-white no-underline transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="text-white/70">
                {title}
              </li>
            </ol>
          </nav>

          <h1 className="text-white text-3xl lg:text-[2.6rem] mb-3">{title}</h1>
          <p className="text-white/40 text-sm mb-14">Last updated {updated}</p>

          <div className="legal-prose">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  );
}
