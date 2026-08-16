// Service catalog. Data only, no JSX, so this can be imported by Server
// Components, generateMetadata, generateStaticParams and the sitemap.
//
// Every service gets its own indexable URL. The old single-page site had one URL
// competing for six different search intents; splitting them is the whole point
// of the SEO pass. Body / includes / idealFor copy is Jeff's original wording,
// carried over unchanged.

export type Service = {
  slug: string;
  title: string;
  /** Nav / card label when the full title is too long. */
  short: string;
  /** Lucide icon name, resolved in components/icons.tsx. */
  icon: "building" | "tag" | "truck" | "server" | "fileText" | "globe";
  tagline: string;
  /** One-liner used on cards and in the services grid. */
  desc: string;
  /** Long-form copy, paragraphs split on blank lines. */
  body: string;
  includes: string[];
  idealFor: string[];
  /** <title> for the service page, WITHOUT the brand. app/layout.tsx's title
   * template appends "| OFB of SWFL", so including it here double-brands it. */
  seoTitle: string;
  seoDescription: string;
  /** Drives FAQPage schema on the service page. Real buyer questions only. */
  faqs: { q: string; a: string }[];
};

export const SERVICES: Service[] = [
  {
    slug: "office-decommissioning",
    title: "Full Decommissioning",
    short: "Decommissioning",
    icon: "building",
    tagline: "One call. Empty space. Zero stress.",
    desc: "End-to-end removal of everything in your space: furniture, fixtures, IT equipment. We leave it broom-clean and landlord-ready.",
    body: "When you're vacating an office, the last thing you need is a dozen vendors, missed pickups, and a landlord threatening your security deposit. OFB of SW Florida handles the entire decommissioning process from first walkthrough to final broom-clean, furniture, cubicle systems, fixtures, signage, and IT hardware all handled under one contract.\n\nWe scope the project, build a removal plan, coordinate crew and logistics, and hand you a completed space with full disposal documentation. No surprises, no hidden costs, no leftover junk.",
    includes: [
      "On-site scoping and written project plan",
      "Furniture, cubicles, and fixture removal",
      "IT hardware and server rack teardown",
      "Freight coordination and staging",
      "Disposal certificates for all removed items",
      "Final broom-clean and landlord sign-off packet",
    ],
    idealFor: [
      "Corporate office relocations",
      "Lease expirations and surrenders",
      "Bankruptcy and receivership clearances",
      "Downsizing and space consolidations",
    ],
    seoTitle: "Office Decommissioning Services, Florida & Nationwide",
    seoDescription:
      "Full-service office decommissioning. Furniture, cubicles, fixtures and IT removed under one contract, with disposal certificates and a broom-clean handover. Across Florida and nationwide.",
    faqs: [
      {
        q: "What does office decommissioning actually include?",
        a: "Everything between your last day in the space and the landlord signing off. That covers furniture and cubicle teardown, fixtures and signage, IT hardware and cabling, freight and staging, disposal documentation, and a final broom-clean. You get one contract and one point of contact instead of coordinating five vendors.",
      },
      {
        q: "How far in advance should I book a decommissioning project?",
        a: "Four to six weeks is comfortable for a standard corporate floor. We regularly take on shorter timelines, including same-week emergency clearances, but earlier booking means better liquidation recovery because there is time to find buyers for your assets.",
      },
      {
        q: "Do you handle projects outside Florida?",
        a: "Yes. Naples is home base, but we run projects in 48 states through a national vendor network, all managed under one project plan and one invoice.",
      },
      {
        q: "What size projects do you take?",
        a: "We have handled spaces from roughly 5,000 to 500,000 square feet, including multi-floor and multi-building clearances.",
      },
    ],
  },
  {
    slug: "asset-liquidation",
    title: "Asset Liquidation",
    short: "Liquidation",
    icon: "tag",
    tagline: "Turn your furniture into a check.",
    desc: "Maximize recovery value on outgoing assets. We source buyers, handle transactions, and cut you a check, or apply it to your project cost.",
    body: "Most companies leave money on the table when they vacate a space, dumping or donating assets that have real resale value. OFB of SW Florida runs a full asset liquidation process that sources qualified buyers, handles all negotiations, and processes the transaction on your behalf.\n\nRecovery value gets applied directly to your project cost, reducing what you pay out of pocket. In many cases, liquidation revenue fully offsets the decommissioning fee. We handle everything, you just approve the final numbers.",
    includes: [
      "Full asset inventory and valuation",
      "Buyer sourcing through our national dealer network",
      "Negotiation and transaction handling",
      "Pickup coordination with buyers",
      "Itemized recovery report",
      "Net credit applied to project invoice",
    ],
    idealFor: [
      "Companies with high-quality furniture or large quantities",
      "Projects where budget is a constraint",
      "Bankruptcy trustees managing estate assets",
      "Multi-site clearances with excess inventory",
    ],
    seoTitle: "Office Furniture Liquidation & Asset Recovery",
    seoDescription:
      "Recover real value on outgoing office assets. Inventory, valuation, buyer sourcing and transaction handling, with recovery credited straight against your project cost.",
    faqs: [
      {
        q: "How is liquidation value applied to my project?",
        a: "As a net credit on your invoice. We inventory and value the assets, source buyers, close the transaction, then apply the recovery against your project cost. On projects with good quality furniture in volume, recovery can offset a meaningful share of the decommissioning fee.",
      },
      {
        q: "Which office assets actually hold resale value?",
        a: "Recognized-brand task seating, height-adjustable desks, conference tables, filing and storage in good condition, and recent cubicle systems tend to move. Age, brand, condition and quantity all drive it, and quantity matters more than most people expect because buyers want matching sets.",
      },
      {
        q: "What happens to assets that will not sell?",
        a: "They get routed to donation or certified recycling and disposal, and every route is documented. You receive certificates covering everything that left the building.",
      },
      {
        q: "Do you buy furniture outright?",
        a: "Depending on the assets and the project, yes. Tell us what you have and we will tell you whether an outright purchase or a brokered sale nets you more.",
      },
    ],
  },
  {
    slug: "furniture-logistics",
    title: "Furniture Logistics",
    short: "Logistics",
    icon: "truck",
    tagline: "We move it. You don't touch it.",
    desc: "Coordinated pickup, transport, staging, and delivery. Any quantity. Any location. On your timeline.",
    body: "Whether you're relocating 50 workstations or clearing 500,000 square feet across multiple floors, OFB of SW Florida manages the full logistics chain. We handle freight booking, crew scheduling, permits, elevator reservations, and delivery coordination, so you have one point of contact and one timeline to track.\n\nAll transport is insured and documented. We work with building management to meet move-out requirements and handle any special handling for sensitive or oversized items.",
    includes: [
      "Freight carrier booking and coordination",
      "Crew scheduling and supervision",
      "Building management liaison",
      "Elevator and loading dock reservations",
      "Special handling for oversized or fragile items",
      "Delivery confirmation and chain-of-custody documentation",
    ],
    idealFor: [
      "Office relocations requiring furniture reuse",
      "Storage and staging projects",
      "Furniture donations requiring pickup and delivery",
      "Multi-floor or multi-building moves",
    ],
    seoTitle: "Office Furniture Logistics & Relocation",
    seoDescription:
      "Insured pickup, transport, staging and delivery for office furniture at any quantity. Freight, crew, permits and dock reservations coordinated under one point of contact.",
    faqs: [
      {
        q: "Do you coordinate with building management on move-out rules?",
        a: "Yes, and it is usually the part that sinks projects run in-house. We handle certificates of insurance, elevator and dock reservations, approved move windows, floor and wall protection, and whatever else the building requires before your crew is allowed in.",
      },
      {
        q: "Is transport insured?",
        a: "Yes. All transport is insured and documented, and you receive chain-of-custody paperwork covering delivery confirmation.",
      },
      {
        q: "Can you store furniture between move-out and move-in?",
        a: "Yes. Staging and interim storage are common on relocations where the new space is not ready, and we coordinate the second leg when it is.",
      },
    ],
  },
  {
    slug: "data-center-clearance",
    title: "Data Center Clearance",
    short: "Data Center",
    icon: "server",
    tagline: "Secure teardown. Documented proof.",
    desc: "Secure decommissioning of server rooms and IT infrastructure with full chain-of-custody documentation.",
    body: "IT decommissioning carries risk that standard moving companies aren't equipped to handle, data security, compliance documentation, and proper disposal of hardware that can't just be dropped at a loading dock. OFB of SW Florida provides structured data center clearance with chain-of-custody tracking from teardown to certified final disposition.\n\nWe coordinate with your IT team on data wiping requirements, pull racks and cabling cleanly, and provide disposal certificates that satisfy your compliance and audit requirements.",
    includes: [
      "Pre-teardown walkthrough with your IT team",
      "Rack and server removal",
      "Cable management and structured cabling teardown",
      "Chain-of-custody documentation for all hardware",
      "Certified data destruction coordination",
      "Disposal certificates for compliance and audit",
    ],
    idealFor: [
      "Corporate data center closures",
      "Server room consolidations",
      "Compliance-sensitive IT disposals (HIPAA, SOC 2, etc.)",
      "Co-location facility exits",
    ],
    seoTitle: "Data Center & Server Room Decommissioning",
    seoDescription:
      "Secure server room and data center clearance with chain-of-custody tracking from teardown to certified disposition. Disposal certificates for compliance and audit.",
    faqs: [
      {
        q: "How do you handle data security on decommissioned hardware?",
        a: "We start with a walkthrough with your IT team to agree on what gets wiped, what gets physically destroyed, and what leaves intact. Chain-of-custody tracking follows every asset from the rack to final disposition, and you receive certificates you can hand to an auditor.",
      },
      {
        q: "Can you support a HIPAA or SOC 2 audit trail?",
        a: "Yes. Chain-of-custody documentation and certified destruction records are standard on compliance-sensitive projects, because the paperwork is the deliverable as much as the empty room is.",
      },
      {
        q: "Do you remove structured cabling too?",
        a: "Yes. Cable and structured cabling teardown is included, which matters because most landlords require cabling pulled back to the closet as part of surrender.",
      },
    ],
  },
  {
    slug: "lease-surrender-planning",
    title: "Lease Surrender Planning",
    short: "Lease Surrender",
    icon: "fileText",
    tagline: "Leave clean. Keep your deposit.",
    desc: "We coordinate with your landlord, building management, and legal team to ensure a clean, cost-free lease surrender.",
    body: "A botched lease surrender can cost you tens of thousands in holdover fees, restoration charges, and security deposit forfeitures. OFB of SW Florida works directly with your landlord and building management team to understand the surrender requirements and execute a plan that meets every condition in your lease.\n\nWe document everything, photos, disposal certificates, restoration confirmations, and provide a complete close-out package you can hand directly to your legal team or property manager.",
    includes: [
      "Lease document review for surrender obligations",
      "Landlord and building management coordination",
      "Restoration and patching as required",
      "Full photo documentation of cleared space",
      "Disposal and recycling certificates",
      "Close-out package for legal and property records",
    ],
    idealFor: [
      "Tenants exiting before or at lease end",
      "Companies with complex restoration clauses",
      "Legal teams managing corporate real estate exits",
      "Any project where security deposit recovery matters",
    ],
    seoTitle: "Lease Surrender & Office Restoration Planning",
    seoDescription:
      "Meet every surrender condition in your lease. Document review, landlord coordination, restoration, photo documentation and a close-out package for legal and property records.",
    faqs: [
      {
        q: "What is usually in a surrender clause that tenants miss?",
        a: "Restoration obligations. Removing supplemental HVAC, patching and painting to a specified standard, pulling low-voltage cabling back to the closet, and taking out tenant improvements you paid to install. These clauses are where holdover fees and deposit forfeitures come from, so we read them before scoping the work.",
      },
      {
        q: "Can you help if the landlord has already sent a restoration demand?",
        a: "Yes. We price the demand against what the lease actually requires and execute what is genuinely owed. Demands sometimes ask for more than the document supports.",
      },
      {
        q: "What do I get at the end?",
        a: "A close-out package: photo documentation of the cleared space, disposal and recycling certificates, restoration confirmations, and a summary your legal team or property manager can file as proof of compliant surrender.",
      },
    ],
  },
  {
    slug: "nationwide-coordination",
    title: "Nationwide Coordination",
    short: "Nationwide",
    icon: "globe",
    tagline: "Coast to coast. One call.",
    desc: "Multi-site projects across 48 states. One point of contact. One invoice. One team you can trust to deliver.",
    body: "Managing an office decommissioning across multiple locations is a logistical nightmare when every site has a different vendor, timeline, and point of contact. OFB of SW Florida centralizes the entire operation, we manage all sites, all timelines, and all vendors under a single project plan with one invoice at the end.\n\nWe've run coordinated projects across dozens of simultaneous locations for Fortune 1000 companies. Our national vendor network covers all 48 contiguous states, and our project management process keeps every site on schedule and every stakeholder informed.",
    includes: [
      "Centralized project management across all sites",
      "National vendor network in all 48 contiguous states",
      "Unified timeline and milestone tracking",
      "Single point of contact for all locations",
      "Consolidated invoicing for accounting simplicity",
      "Executive-level reporting and status updates",
    ],
    idealFor: [
      "Fortune 1000 portfolio-wide consolidations",
      "Private equity firms managing multi-site exits",
      "REITs and property managers clearing multiple locations",
      "Any project spanning more than one city or state",
    ],
    seoTitle: "Multi-Site Office Decommissioning in 48 States",
    seoDescription:
      "Portfolio-wide and multi-site office clearances managed under one project plan. One point of contact, unified milestones, consolidated invoicing across 48 states.",
    faqs: [
      {
        q: "How many sites can you run at once?",
        a: "We have coordinated projects across dozens of simultaneous locations. Every site sits under one project plan with unified milestone tracking, so you get one status report rather than one per city.",
      },
      {
        q: "Will I get separate invoices per location?",
        a: "No. Consolidated invoicing is the point. One invoice covering all sites keeps your accounting team out of a reconciliation exercise.",
      },
      {
        q: "Which states do you cover?",
        a: "All 48 contiguous states through our national vendor network, managed centrally from Naples, Florida.",
      },
    ],
  },
];

export const SERVICE_SLUGS = SERVICES.map((s) => s.slug);

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
