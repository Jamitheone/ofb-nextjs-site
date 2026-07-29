import ContactForm from "@/components/ContactForm";
import { PhoneLink, EmailLink } from "@/components/TrackedLink";
import { BUSINESS } from "@/lib/site";
import { Phone, Mail, MapPin, STROKE } from "@/components/icons";

// Structurally the same as before, minus the two glow orbs. The phone and email
// links keep their existing conversion events.

const LINK = "text-white font-semibold text-base no-underline underline-offset-2 hover:underline";

export default function Contact({
  subject,
  heading = "Let's talk about your project",
}: {
  subject?: string;
  heading?: string;
}) {
  return (
    <section id="contact" className="py-24 lg:py-28 px-6 bg-[#0e1530]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 lg:gap-20">
        <div>
          <h2 className="text-white text-3xl lg:text-[2.6rem] text-balance">{heading}</h2>
          <p className="text-white/60 text-base mt-5 mb-10 max-w-[52ch] leading-relaxed">
            Whether the project starts next week or six months out, reach out. {BUSINESS.founder} responds
            to every inquiry personally.
          </p>

          <dl className="m-0 space-y-6 mb-10">
            <div className="flex items-start gap-4">
              <Phone size={18} strokeWidth={STROKE} className="text-[#c7ccd6] shrink-0 mt-1" aria-hidden="true" />
              <div>
                <dt className="label-field text-white/40 mb-0.5">
                  Phone, call {BUSINESS.founder.split(" ")[0]} directly
                </dt>
                <dd className="m-0">
                  <PhoneLink event="phone_click_contact" className={LINK} />
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail size={18} strokeWidth={STROKE} className="text-[#c7ccd6] shrink-0 mt-1" aria-hidden="true" />
              <div>
                <dt className="label-field text-white/40 mb-0.5">Email</dt>
                <dd className="m-0">
                  <EmailLink event="email_click_contact" className={LINK} />
                </dd>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin size={18} strokeWidth={STROKE} className="text-[#c7ccd6] shrink-0 mt-1" aria-hidden="true" />
              <div>
                <dt className="label-field text-white/40 mb-0.5">Base and service area</dt>
                <dd className="m-0 text-white font-semibold text-base">
                  {BUSINESS.city}, {BUSINESS.region}. Projects nationwide.
                </dd>
              </div>
            </div>
          </dl>

          <div className="border border-[#c7ccd6]/20 bg-[#c7ccd6]/[0.05] rounded-lg p-6">
            <p className="label-field text-[#c7ccd6] mb-3">Our guarantee</p>
            <p className="text-white/70 text-sm leading-relaxed m-0">
              Every project comes with our written completion guarantee. If we scope it, we finish
              it, on time and on budget.
            </p>
          </div>
        </div>

        <div className="bg-white/[0.035] border border-white/[0.09] rounded-lg p-6 lg:p-8">
          <h3 className="text-white text-xl mb-7">Request a free project assessment</h3>
          <ContactForm variant="full" subject={subject} />
        </div>
      </div>
    </section>
  );
}
