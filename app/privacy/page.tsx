import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { BUSINESS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${BUSINESS.name} collects and uses information submitted through ofbswfl.com.`,
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy" updated="July 29, 2026">
      <p>
        This policy covers ofbswfl.com, operated by {BUSINESS.name}. It describes what the site
        collects, why, and who it is shared with.
      </p>

      <h2>What we collect</h2>
      <p>
        When you submit a form on this site we collect the information you enter: your name,
        company, phone number, email address, and the project details you provide. We do not ask for
        and do not want payment details, government identifiers, or any sensitive personal
        information through this website.
      </p>
      <p>
        The site also uses Google Ads conversion tracking and Google Analytics tags, which collect
        standard analytics information such as pages viewed, referring source, approximate location,
        and device type. When you submit a form, the name, email and phone number you entered may be
        transmitted to Google in hashed form so Google can attribute the conversion to an ad click.
        A LeadConnector chat widget is loaded on the site; if you use it, your messages are processed
        by that provider.
      </p>

      <h2>How we use it</h2>
      <p>
        Form submissions are emailed to {BUSINESS.email} and stored in our customer relationship
        management system so we can respond to your inquiry and manage the project. Analytics and
        conversion data are used to understand which marketing channels produce inquiries.
      </p>
      <p>
        We do not sell your information. We do not send marketing email to addresses collected
        through this site unless you asked us to.
      </p>

      <h2>Who it is shared with</h2>
      <p>
        Only the service providers that operate this site and our inquiry handling: our email
        delivery provider, our CRM and chat provider, our hosting provider, and Google for
        advertising measurement. Where a project requires it, project details may be shared with the
        crew, carriers or buyers working on that specific project.
      </p>

      <h2>Retention</h2>
      <p>
        Inquiry records are retained for as long as needed to serve the client relationship and to
        meet our record-keeping obligations. You can ask us to delete your inquiry record at any
        time.
      </p>

      <h2>Your choices</h2>
      <p>
        You can opt out of Google&rsquo;s advertising cookies through Google&rsquo;s Ads Settings, and most
        browsers let you block cookies. Blocking them will not prevent you from using this site or
        submitting a form.
      </p>
      <p>
        To ask what we hold about you, to correct it, or to have it deleted, email{" "}
        <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a> or call {BUSINESS.phone}.
      </p>

      <h2>Contact</h2>
      <p>
        {BUSINESS.name}
        <br />
        {BUSINESS.city}, {BUSINESS.region} {BUSINESS.postalCode}
        <br />
        <a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a>
        <br />
        {BUSINESS.phone}
      </p>
    </LegalPage>
  );
}
