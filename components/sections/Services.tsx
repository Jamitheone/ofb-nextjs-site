import Image from "next/image";
import Link from "next/link";
import { SERVICES } from "@/lib/services";
import { SERVICE_ICONS, ArrowRight, STROKE } from "@/components/icons";
import { Reveal } from "@/components/Reveal";

// The single biggest SEO change on the site. These six cards used to open a
// client-side modal, so all six service descriptions were invisible to a
// crawler and the whole site was one URL competing for six different search
// intents. They are now real links to real indexable pages, which also gives
// the homepage six internal links pointing at its own money pages.
//
// Six items, exactly six cells: one wide feature with a photo, one tall, three
// standard, one full-width strip. Three cell shapes, no empty tiles.

const CARD =
  "group relative flex flex-col h-full rounded-lg p-6 no-underline overflow-hidden " +
  "bg-white/[0.035] border border-white/[0.09] " +
  "hover:border-[#c7ccd6]/45 hover:bg-white/[0.06] transition-colors duration-300 " +
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c7ccd6]";

function CardTail({ label = "View service" }: { label?: string }) {
  return (
    <span className="mt-auto pt-6 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#c7ccd6]">
      {label}
      <ArrowRight
        size={13}
        strokeWidth={2}
        aria-hidden="true"
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
    </span>
  );
}

export default function Services() {
  const [feature, tall, ...rest] = SERVICES;
  const standard = rest.slice(0, 3);
  const strip = rest[3];
  const FeatureIcon = SERVICE_ICONS[feature.icon];
  const TallIcon = SERVICE_ICONS[tall.icon];
  const StripIcon = SERVICE_ICONS[strip.icon];

  return (
    <section id="services" className="py-24 lg:py-28 px-6 bg-[#0e1530]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-14">
          <p className="label-upper text-[#8b93a6] mb-4">What we do</p>
          <h2 className="text-white text-3xl lg:text-[2.6rem] max-w-2xl text-balance">
            End-to-end office asset management
          </h2>
          <p className="text-white/60 text-base mt-5 max-w-[58ch] leading-relaxed">
            Every phase under one contract, so you are not managing separate vendors, timelines
            and invoices for the same move-out.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-4">
          {/* Feature cell, spans two columns, carries the photo so the grid is
              not six identical text tiles. */}
          <Reveal className="lg:col-span-2" index={0}>
            <Link href={`/services/${feature.slug}`} className={`${CARD} min-h-[300px] lg:p-8`}>
              <Image
                src="/loading-dock.jpg"
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 66vw"
                className="object-cover opacity-[0.22] transition-opacity duration-500 group-hover:opacity-30"
              />
              <span className="absolute inset-0 bg-gradient-to-br from-[#0e1530]/85 via-[#0e1530]/75 to-[#111a36]/60" />

              <span className="relative flex flex-col h-full">
                <FeatureIcon size={30} strokeWidth={STROKE} className="text-[#c7ccd6] mb-7" aria-hidden="true" />
                <h3 className="text-white text-2xl lg:text-[1.9rem] mb-2.5">{feature.title}</h3>
                <p className="text-[#c7ccd6] text-sm font-medium mb-3.5">{feature.tagline}</p>
                <p className="text-white/65 text-[15px] max-w-[48ch] leading-relaxed">{feature.desc}</p>
                <CardTail />
              </span>
            </Link>
          </Reveal>

          <Reveal index={1}>
            <Link href={`/services/${tall.slug}`} className={`${CARD} min-h-[300px]`}>
              <TallIcon size={26} strokeWidth={STROKE} className="text-[#c7ccd6] mb-6" aria-hidden="true" />
              <h3 className="text-white text-lg mb-2">{tall.title}</h3>
              <p className="text-[#c7ccd6]/85 text-[13px] font-medium mb-3">{tall.tagline}</p>
              <p className="text-white/55 text-sm leading-relaxed">{tall.desc}</p>
              <CardTail />
            </Link>
          </Reveal>

          {standard.map((s, i) => {
            const Icon = SERVICE_ICONS[s.icon];
            return (
              <Reveal key={s.slug} index={i + 2}>
                <Link href={`/services/${s.slug}`} className={CARD}>
                  <Icon size={24} strokeWidth={STROKE} className="text-[#c7ccd6] mb-5" aria-hidden="true" />
                  <h3 className="text-white text-base mb-2">{s.title}</h3>
                  <p className="text-white/55 text-sm leading-relaxed">{s.tagline}</p>
                  <CardTail label="Details" />
                </Link>
              </Reveal>
            );
          })}

          <Reveal className="lg:col-span-3" index={5}>
            <Link
              href={`/services/${strip.slug}`}
              className={`${CARD} lg:flex-row lg:items-center lg:justify-between gap-5 lg:py-5`}
            >
              <span className="flex items-center gap-5">
                <StripIcon size={24} strokeWidth={STROKE} className="text-[#c7ccd6] shrink-0" aria-hidden="true" />
                <span>
                  <h3 className="text-white text-base mb-1">{strip.title}</h3>
                  <p className="text-white/55 text-sm m-0">{strip.tagline}</p>
                </span>
              </span>
              <span className="flex items-center gap-8 shrink-0 lg:mt-0 mt-5">
                <span className="hidden xl:flex items-center gap-7 text-[13px] text-white/50">
                  <span>48 states covered</span>
                  <span>One point of contact</span>
                  <span>One invoice</span>
                </span>
                <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#c7ccd6]">
                  View service
                  <ArrowRight
                    size={13}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
