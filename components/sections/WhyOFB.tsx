import { BUSINESS } from "@/lib/site";
import { Reveal } from "@/components/Reveal";

// Kept close to the original: same four value props, same guarantee card, same
// copy. The oversized ghost numbers behind each heading are gone (decoration
// that fought the text it sat behind) and the section no longer has a blurred
// glow orb in the corner.

const POINTS = [
  {
    title: "Project completion guarantee",
    desc: "We don't leave until the job is done. Every project comes with our written guarantee.",
  },
  {
    title: "Two-hour response, always",
    desc: `${BUSINESS.founder.split(" ")[0]} personally responds to every inquiry within 2 hours during business hours. No gatekeepers.`,
  },
  {
    title: "Full documentation package",
    desc: "Asset manifests, disposal certificates and landlord sign-off paperwork, all included at no extra charge.",
  },
  {
    title: "One team, one invoice",
    desc: "We don't broker your work to strangers. Our crew handles your project start to finish.",
  },
];

export default function WhyOFB() {
  return (
    <section id="why-ofb" className="py-24 lg:py-28 px-6 bg-[#111a36]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">
        <div>
          <h2 className="text-white text-3xl lg:text-[2.6rem] text-balance">
            The difference is in the details
          </h2>
          <p className="text-white/60 text-base mt-5 mb-10 max-w-[54ch] leading-relaxed">
            Most brokers pass your project to a third party. We don&rsquo;t. {BUSINESS.founder} oversees
            every job personally, and our guarantee means you are never left holding the bag.
          </p>

          <div className="border border-[#c7ccd6]/20 bg-[#c7ccd6]/[0.05] rounded-lg p-6">
            <p className="label-field text-[#c7ccd6] mb-3">Our written guarantee</p>
            <p className="text-white/70 text-sm leading-relaxed m-0">
              If we scope it, we deliver it, on time and within budget. We have never left a
              project unfinished in over 10 years of operation.
            </p>
          </div>
        </div>

        <ul className="list-none m-0 p-0">
          {POINTS.map((p, i) => (
            <Reveal
              as="li"
              key={p.title}
              index={i}
              className="border-t border-white/[0.10] last:border-b py-6"
            >
              <h3 className="text-white text-base mb-2">{p.title}</h3>
              <p className="text-white/55 text-sm leading-relaxed m-0 max-w-[56ch]">{p.desc}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
