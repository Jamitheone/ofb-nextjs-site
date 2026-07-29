import { BUSINESS, SITE_URL, FLORIDA_METROS } from "@/lib/site";
import { SERVICES } from "@/lib/services";
import type { FaqItem } from "@/components/sections/Faq";

// All structured data lives here so a page can never ship two competing blocks
// of the same @type. Rendered as plain <script> from Server Components, which
// puts the JSON in the server HTML where a crawler will actually see it.
//
// Rule for this file: nothing gets asserted in schema that is not also visible
// on the page. No invented aggregateRating (the Business Profile has no reviews,
// and a rating in schema without reviews is a manual-action risk), no invented
// opening hours, no invented price range.

function Ld({ id, data }: { id: string; data: object }) {
  return (
    <script
      id={id}
      type="application/ld+json"
      // Structured data is authored here, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Sitewide identity. One per page, emitted from the root layout. */
export function BusinessSchema() {
  return (
    <Ld
      id="ld-business"
      data={{
        "@context": "https://schema.org",
        "@type": "MovingCompany",
        "@id": `${SITE_URL}/#business`,
        name: BUSINESS.name,
        alternateName: BUSINESS.shortName,
        legalName: BUSINESS.legalName,
        url: SITE_URL,
        logo: BUSINESS.logo,
        image: `${SITE_URL}/cleared-office-floor.jpg`,
        telephone: BUSINESS.phoneRaw,
        email: BUSINESS.email,
        foundingDate: BUSINESS.founded,
        founder: { "@type": "Person", name: BUSINESS.founder },
        description:
          "Full-service office furniture decommissioning, liquidation and asset removal for corporate tenants, facility managers and Fortune 1000 companies.",
        address: {
          "@type": "PostalAddress",
          addressLocality: BUSINESS.city,
          addressRegion: BUSINESS.region,
          postalCode: BUSINESS.postalCode,
          addressCountry: BUSINESS.country,
        },
        // Cities are the near-field service area, the state list is the network
        // reach. Both are stated on the Coverage section in visible text.
        areaServed: [
          ...FLORIDA_METROS.map((city) => ({
            "@type": "City",
            name: `${city}, ${BUSINESS.region}`,
          })),
          { "@type": "Country", name: "United States" },
        ],
        knowsAbout: [
          "office decommissioning",
          "office furniture liquidation",
          "asset recovery",
          "lease surrender",
          "data center decommissioning",
          "commercial furniture logistics",
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Office asset management services",
          itemListElement: SERVICES.map((s) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: s.title,
              description: s.desc,
              url: `${SITE_URL}/services/${s.slug}`,
            },
          })),
        },
      }}
    />
  );
}

export function WebSiteSchema() {
  return (
    <Ld
      id="ld-website"
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: BUSINESS.name,
        publisher: { "@id": `${SITE_URL}/#business` },
      }}
    />
  );
}

export function FaqSchema({ items }: { items: FaqItem[] }) {
  return (
    <Ld
      id="ld-faq"
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }}
    />
  );
}

export function ServiceSchema({
  name,
  description,
  slug,
}: {
  name: string;
  description: string;
  slug: string;
}) {
  return (
    <Ld
      id="ld-service"
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        url: `${SITE_URL}/services/${slug}`,
        serviceType: name,
        provider: { "@id": `${SITE_URL}/#business` },
        areaServed: [
          ...FLORIDA_METROS.map((city) => ({ "@type": "City", name: `${city}, ${BUSINESS.region}` })),
          { "@type": "Country", name: "United States" },
        ],
      }}
    />
  );
}

export function BreadcrumbSchema({ trail }: { trail: { name: string; path: string }[] }) {
  return (
    <Ld
      id="ld-breadcrumb"
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: trail.map((step, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: step.name,
          item: `${SITE_URL}${step.path}`,
        })),
      }}
    />
  );
}
