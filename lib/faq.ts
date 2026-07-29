import type { FaqItem } from "@/components/sections/Faq";

// Homepage FAQs. These target the broad commercial queries the old one-page site
// had no text to match: cost, timeline, coverage, what happens to the furniture.
// Per-service FAQs live on each service in lib/services.ts so the two sets do
// not overlap and no two pages compete for the same question.

export const HOME_FAQS: FaqItem[] = [
  {
    q: "What does office decommissioning cost?",
    a: "It depends on square footage, what is being removed, building access and how much of the furniture holds resale value. We quote flat-rate in writing within 24 hours of a walkthrough, and where assets are worth something the liquidation recovery is credited against the project cost, which on furniture-heavy projects can offset a meaningful share of the fee.",
  },
  {
    q: "How quickly can you clear a space?",
    a: "A standard corporate floor is typically a few days on site once the plan is approved. Booking four to six weeks out is comfortable and gets you better liquidation recovery, because there is time to find buyers. We do take short-notice and emergency clearances.",
  },
  {
    q: "Do you only work in Southwest Florida?",
    a: "Naples is home base and where we can walk a space on short notice. Projects run in all 48 contiguous states through our vendor network, managed centrally under one project plan and one invoice.",
  },
  {
    q: "What happens to the furniture you remove?",
    a: "Anything with resale value goes to buyers through our national dealer network and the recovery is credited to you. The rest is routed to donation or certified recycling and disposal. Every route is documented and you receive certificates covering everything that left the building.",
  },
  {
    q: "Can you work around our lease surrender requirements?",
    a: "That is usually the whole point of hiring us. We read the surrender and restoration clauses first, coordinate with the landlord and building management on what they will actually sign off on, then execute to that standard and hand you a close-out package as proof.",
  },
  {
    q: "Do you handle IT equipment and server rooms?",
    a: "Yes, with chain-of-custody documentation from teardown to certified final disposition, plus coordination with your IT team on data wiping. Standard moving companies are not set up for the compliance side of this.",
  },
  {
    q: "Who actually does the work on site?",
    a: "Our crew, supervised by us. We do not broker your project out to a third party you have never spoken to, which is the difference most clients notice first.",
  },
  {
    q: "What size projects do you take on?",
    a: "Roughly 5,000 to 500,000 square feet, including multi-floor, multi-building and multi-site work. Single-office moves and portfolio-wide consolidations both go through the same process.",
  },
];
