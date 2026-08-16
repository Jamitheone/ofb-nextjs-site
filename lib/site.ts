// Single source of truth for NAP (name / address / phone). Every schema block,
// footer, nav and CTA reads from here so Google never sees an inconsistent
// citation. Changing a number here changes it everywhere, including JSON-LD.

export const SITE_URL = "https://ofbswfl.com";

export const BUSINESS = {
  name: "Office Furniture Brokers of SW Florida",
  shortName: "OFB of SWFL",
  legalName: "Office Furniture Brokers of SW Florida",
  phone: "(816) 304-6755",
  phoneRaw: "+18163046755",
  email: "jmoore@ofbswfl.com",
  founder: "Jeff Moore",
  city: "Naples",
  region: "FL",
  regionName: "Florida",
  postalCode: "34102",
  country: "US",
  logo: `${SITE_URL}/ofb-logo.png`,
  founded: "2014",
} as const;

export const PHONE_HREF = `tel:${BUSINESS.phoneRaw}`;
export const EMAIL_HREF = `mailto:${BUSINESS.email}`;

// Jeff's GHL sub-account, white-labeled onto the TSS domain so it reads as his
// portal rather than GoHighLevel's. Verified live 2026-07-28 (200, serves app).
export const CRM_URL = "https://app.thestaleysocial.com";
export const CONTACT_API_URL = "/api/contact";

// Florida metros Jeff serves, statewide, plus the national reach. Used by the
// coverage section and the areaServed schema. Keep this honest: these are
// service areas, not office locations, and the schema models them as such. Jeff
// runs FL statewide through the same vendor network that covers the 48 states,
// so every market here is genuinely serviceable, not aspirational padding.
export const FLORIDA_METROS = [
  "Miami",
  "Fort Lauderdale",
  "West Palm Beach",
  "Orlando",
  "Tampa",
  "St. Petersburg",
  "Jacksonville",
  "Naples",
  "Fort Myers",
  "Sarasota",
  "Cape Coral",
  "Bradenton",
  "Tallahassee",
  "Gainesville",
  "Ocala",
  "Daytona Beach",
  "Pensacola",
  "Port Charlotte",
  "Bonita Springs",
  "Punta Gorda",
] as const;
