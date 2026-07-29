import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { BUSINESS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms governing use of the ${BUSINESS.name} website.`,
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function Terms() {
  return (
    <LegalPage title="Terms of Use" updated="July 29, 2026">
      <p>
        These terms govern your use of ofbswfl.com. They cover the website only. They are not the
        agreement for a project. Project work is governed by the written scope and proposal signed
        for that project.
      </p>

      <h2>Information on this site</h2>
      <p>
        Service descriptions, timelines and capability statements on this site are general. They are
        not an offer, a quote, or a guarantee of a specific outcome on your project. Pricing and
        scope come from a written quote issued after we understand your space and requirements.
      </p>

      <h2>Estimates and the project estimator</h2>
      <p>
        Any figure produced by a calculator or estimator on this site is an indicative range for
        planning only. It is not a quote and is not binding on either party. Actual pricing depends
        on the site walkthrough, building access, asset condition and the scope agreed in writing.
      </p>

      <h2>Submitting an inquiry</h2>
      <p>
        Submit accurate information and only submit information you are authorized to share.
        Submitting a form does not create a contract or a client relationship. It starts a
        conversation.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The content, layout and branding on this site belong to {BUSINESS.name}. You may view and
        share it. You may not republish it as your own or use it to represent another business.
      </p>

      <h2>Third-party links and tools</h2>
      <p>
        This site links to third-party services, including our client CRM portal, and loads
        third-party analytics and chat tools. We are not responsible for the content or practices of
        third-party services.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        This site is provided as is. To the fullest extent permitted by law, {BUSINESS.name} is not
        liable for any indirect or consequential loss arising from your use of this website or from
        reliance on general information published on it. Nothing here limits liability that cannot be
        limited by law.
      </p>

      <h2>Governing law</h2>
      <p>
        These terms are governed by the laws of the State of Florida.
      </p>

      <h2>Changes</h2>
      <p>
        We may update these terms. The date at the top reflects the current version.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about these terms: <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> or{" "}
        {BUSINESS.phone}.
      </p>
    </LegalPage>
  );
}
