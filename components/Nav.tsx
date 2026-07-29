"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { BUSINESS, PHONE_HREF } from "@/lib/site";
import { Phone, STROKE } from "@/components/icons";

// Anchors are absolute (/#process) so the same nav works from a service page.
const LINKS = [
  { label: "Services", href: "/services" },
  { label: "Process", href: "/#process" },
  { label: "Coverage", href: "/#coverage" },
  { label: "Contact", href: "/#contact" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  // useScroll drives this off Motion's internal rAF batching. A raw
  // window.addEventListener("scroll") would run unbatched on every frame.
  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  const isActive = (href: string) =>
    href.startsWith("/#") ? false : pathname.startsWith(href);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
        scrolled || open
          ? "bg-[#0e1530]/92 backdrop-blur-xl border-b border-white/[0.07]"
          : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Main"
        className="max-w-7xl mx-auto px-6 h-[68px] flex items-center justify-between gap-6"
      >
        <Link href="/" className="shrink-0" aria-label={`${BUSINESS.shortName} home`}>
          {/* The source shield is 1206x975, so a square box squashes it. These
              dimensions keep its real 1.24:1 aspect. */}
          <Image
            src="/ofb-logo.png"
            alt={`${BUSINESS.name} logo`}
            width={57}
            height={46}
            priority
          />
        </Link>

        <ul className="hidden md:flex items-center gap-7 list-none m-0 p-0">
          {LINKS.map((l) => (
            <li key={l.label}>
              <Link
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`text-sm no-underline transition-colors duration-200 ${
                  isActive(l.href)
                    ? "text-white font-medium"
                    : "text-white/55 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={PHONE_HREF}
            onClick={() => window?.fireConversion?.("phone_click_nav")}
            className="hidden lg:flex items-center gap-1.5 text-white/60 hover:text-white text-sm font-medium no-underline transition-colors"
          >
            <Phone size={14} strokeWidth={STROKE} aria-hidden="true" />
            {BUSINESS.phone}
          </a>

          <motion.a
            href="/#contact"
            className="btn-chrome inline-flex items-center font-semibold text-sm px-5 h-9 rounded-md no-underline whitespace-nowrap"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            Get a quote
          </motion.a>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="md:hidden w-9 h-9 -mr-1.5 flex flex-col items-center justify-center gap-[5px] rounded-md text-white/70 hover:text-white"
          >
            <span
              className={`block w-[18px] h-[1.5px] bg-current transition-transform duration-200 ${
                open ? "translate-y-[3.25px] rotate-45" : ""
              }`}
            />
            <span
              className={`block w-[18px] h-[1.5px] bg-current transition-transform duration-200 ${
                open ? "-translate-y-[3.25px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {open && (
        <ul
          id="mobile-menu"
          className="md:hidden list-none m-0 px-6 pb-5 pt-1 space-y-1 border-t border-white/[0.06]"
        >
          {LINKS.map((l) => (
            <li key={l.label}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-2.5 text-white/70 hover:text-white text-base no-underline"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={PHONE_HREF}
              onClick={() => window?.fireConversion?.("phone_click_nav_mobile")}
              className="flex items-center gap-2 py-2.5 text-white font-semibold text-base no-underline"
            >
              <Phone size={15} strokeWidth={STROKE} aria-hidden="true" />
              {BUSINESS.phone}
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
