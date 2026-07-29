import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import ProofStrip from "@/components/sections/ProofStrip";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import FounderNote from "@/components/sections/FounderNote";
import WhyOFB from "@/components/sections/WhyOFB";
import Coverage from "@/components/sections/Coverage";
import Faq from "@/components/sections/Faq";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import { WebSiteSchema, FaqSchema } from "@/components/Schema";
import { HOME_FAQS } from "@/lib/faq";

// This page used to be a single 1,640-line "use client" component: every section,
// every icon, all six service descriptions and two GSAP timelines shipped to the
// browser as one client bundle. It is now a Server Component that composes
// sections, and only the four pieces that genuinely need interactivity (Nav,
// ContactForm, Reveal, TrackedLink) are client leaves.

export default function Page() {
  return (
    <>
      <WebSiteSchema />
      <FaqSchema items={HOME_FAQS} />
      <div className="noise-overlay" />
      <Nav />
      <main id="main" className="bg-[#0e1530] overflow-x-hidden">
        <Hero />
        <ProofStrip />
        <Services />
        <Process />
        <FounderNote />
        <WhyOFB />
        <Coverage />
        <Faq items={HOME_FAQS} />
        <Contact subject="New OFB Project Inquiry (Contact)" />
      </main>
      <Footer />
    </>
  );
}
