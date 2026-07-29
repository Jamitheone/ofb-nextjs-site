import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/sections/Footer";
import Contact from "@/components/sections/Contact";
import Faq from "@/components/sections/Faq";
import { Reveal } from "@/components/Reveal";
import { PhoneLink } from "@/components/TrackedLink";
import { SERVICES, getService } from "@/lib/services";
import { BUSINESS } from "@/lib/site";
import { ServiceSchema, FaqSchema, BreadcrumbSchema } from "@/components/Schema";
import { SERVICE_ICONS, CircleCheck, ArrowRight, Phone, STROKE } from "@/components/icons";

// Six statically generated pages, one per service. This is the core of the SEO
// pass: the old site had one URL trying to rank for six distinct commercial
// intents at once, which is a fight it loses to any competitor with a dedicated
// page. Each of these carries its own title, description, canonical, H1,
// long-form body, FAQ block and Service + FAQPage + BreadcrumbList schema.

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

// Next 16: params is a Promise and must be awaited.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  return {
    title: service.seoTitle,
    description: service.seoDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      type: "article",
      title: service.seoTitle,
      description: service.seoDescription,
      url: `/services/${service.slug}`,
      images: [{ url: "/cleared-office-floor.jpg", width: 1376, height: 768, alt: service.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: service.seoTitle,
      description: service.seoDescription,
    },
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const Icon = SERVICE_ICONS[service.icon];
  const others = SERVICES.filter((s) => s.slug !== service.slug);

  return (
    <>
      <ServiceSchema name={service.title} description={service.seoDescription} slug={service.slug} />
      <FaqSchema items={service.faqs} />
      <BreadcrumbSchema
        trail={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.title, path: `/services/${service.slug}` },
        ]}
      />

      <div className="noise-overlay" />
      <Nav />

      <main id="main" className="bg-[#0e1530] overflow-x-hidden">
        <article>
          <header className="pt-36 pb-16 lg:pt-40 lg:pb-20 px-6 border-b border-white/[0.09]">
            <div className="max-w-7xl mx-auto">
              {/* Visible breadcrumb, matching the BreadcrumbList schema. The old
                  site had no way back from anywhere. */}
              <nav aria-label="Breadcrumb" className="mb-9">
                <ol className="list-none m-0 p-0 flex items-center gap-2 text-[13px] text-white/40">
                  <li>
                    <Link href="/" className="hover:text-white no-underline transition-colors">
                      Home
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link href="/services" className="hover:text-white no-underline transition-colors">
                      Services
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page" className="text-white/70">
                    {service.title}
                  </li>
                </ol>
              </nav>

              <div className="grid lg:grid-cols-[1fr_auto] gap-10 items-end">
                <div>
                  <Icon size={32} strokeWidth={STROKE} className="text-[#c7ccd6] mb-7" aria-hidden="true" />
                  <h1
                    className="text-white mb-4 text-balance max-w-3xl"
                    style={{ fontSize: "clamp(2.1rem, 4.4vw, 52px)", lineHeight: 1.08 }}
                  >
                    {service.title}
                  </h1>
                  <p className="text-[#c7ccd6] text-lg font-medium m-0">{service.tagline}</p>
                </div>

                <div className="flex flex-wrap gap-3 shrink-0">
                  <PhoneLink
                    event="phone_click_service_page"
                    className="btn-chrome inline-flex items-center gap-2 font-semibold px-6 py-3 rounded-md text-[15px] no-underline"
                  >
                    <Phone size={15} strokeWidth={STROKE} aria-hidden="true" />
                    Call {BUSINESS.phone}
                  </PhoneLink>
                  <a
                    href="#contact"
                    className="inline-flex items-center bg-white/[0.07] hover:bg-white/[0.13] border border-white/[0.18] text-white font-semibold px-6 py-3 rounded-md text-[15px] no-underline transition-colors duration-200"
                  >
                    Get a quote
                  </a>
                </div>
              </div>
            </div>
          </header>

          <div className="px-6 py-20 lg:py-24">
            <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_360px] gap-14 lg:gap-20 items-start">
              <div>
                {service.body.split("\n\n").map((para, i) => (
                  <p
                    key={i}
                    className="text-white/70 text-[17px] leading-[1.75] mb-6 max-w-[68ch] last:mb-0"
                  >
                    {para}
                  </p>
                ))}

                <h2 className="text-white text-2xl mt-16 mb-7">What&rsquo;s included</h2>
                <ul className="list-none m-0 p-0 grid sm:grid-cols-2 gap-x-10">
                  {service.includes.map((item, i) => (
                    <Reveal
                      as="li"
                      key={item}
                      index={i}
                      className="flex items-start gap-3 border-t border-white/[0.09] py-4"
                    >
                      <CircleCheck
                        size={16}
                        strokeWidth={STROKE}
                        className="text-[#c7ccd6] shrink-0 mt-[3px]"
                        aria-hidden="true"
                      />
                      <span className="text-white/70 text-sm leading-relaxed">{item}</span>
                    </Reveal>
                  ))}
                </ul>
              </div>

              <aside className="lg:sticky lg:top-24">
                <div className="border border-white/[0.09] bg-white/[0.035] rounded-lg p-6 mb-4">
                  <h2 className="label-field text-white/45 mb-5">Ideal for</h2>
                  <ul className="list-none m-0 p-0 space-y-3.5">
                    {service.idealFor.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <ArrowRight
                          size={13}
                          strokeWidth={2}
                          className="text-[#c7ccd6] shrink-0 mt-[5px]"
                          aria-hidden="true"
                        />
                        <span className="text-white/70 text-sm leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border border-[#c7ccd6]/20 bg-[#c7ccd6]/[0.05] rounded-lg p-6">
                  <p className="label-field text-[#c7ccd6] mb-3">Response time</p>
                  <p className="text-white/70 text-sm leading-relaxed m-0">
                    {BUSINESS.founder} reviews every inquiry personally and responds within 2 hours
                    during business hours.
                  </p>
                </div>
              </aside>
            </div>
          </div>

          <Faq
            items={service.faqs}
            heading={`${service.title}: common questions`}
            className="bg-[#141c33]"
          />
        </article>

        {/* Sibling links. Every service page links to the other five, which is
            what turns six orphan pages into a crawlable topic cluster. */}
        <section aria-labelledby="other-services" className="px-6 py-20 lg:py-24 bg-[#111a36]">
          <div className="max-w-7xl mx-auto">
            <h2 id="other-services" className="text-white text-2xl lg:text-3xl mb-10">
              Other services
            </h2>
            <ul className="list-none m-0 p-0 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {others.map((s, i) => {
                const OtherIcon = SERVICE_ICONS[s.icon];
                return (
                  <Reveal as="li" key={s.slug} index={i}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="group flex flex-col h-full rounded-lg p-5 no-underline bg-white/[0.035] border border-white/[0.09] hover:border-[#c7ccd6]/45 hover:bg-white/[0.06] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c7ccd6]"
                    >
                      <OtherIcon
                        size={22}
                        strokeWidth={STROKE}
                        className="text-[#c7ccd6] mb-4"
                        aria-hidden="true"
                      />
                      <h3 className="text-white text-[15px] mb-1.5">{s.title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed m-0">{s.tagline}</p>
                      <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#c7ccd6]">
                        View
                        <ArrowRight
                          size={12}
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
        </section>

        <Contact
          subject={`New OFB Inquiry (${service.title})`}
          heading={`Start a ${service.title.toLowerCase()} project`}
        />
      </main>

      <Footer />
    </>
  );
}
