"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CONTACT_API_URL, BUSINESS, PHONE_HREF } from "@/lib/site";
import { CircleCheck, STROKE } from "@/components/icons";

// One form component, two layouts. Previously the hero form and the contact
// form were separate near-duplicate components, so validation and error copy
// drifted between them.
//
// Field NAMES and ORDER are unchanged from the deployed version. The API route
// branches on the presence of `project` to pick its email template, and the
// Google Ads enhanced-conversion payload reads name/phone/email, so renaming
// anything here silently breaks tracking.

type Variant = "compact" | "full";

type Props = {
  variant?: Variant;
  /** Lands in the notification email subject so Jeff knows which page converted. */
  subject?: string;
};

type Status = "idle" | "sending" | "sent" | "error";

const LABEL = "block label-field mb-1.5";
const FIELD =
  "w-full bg-white/[0.05] border border-white/[0.14] text-white text-sm px-3.5 py-2.5 rounded-md " +
  "focus:outline-none focus:border-[#c7ccd6] focus:ring-1 focus:ring-[#c7ccd6]/40 focus:bg-white/[0.08] " +
  "transition-colors duration-200 placeholder:text-white/35";

function Sent({ variant }: { variant: Variant }) {
  return (
    <div
      role="status"
      className={`flex flex-col items-center text-center ${
        variant === "compact"
          ? "bg-white/[0.04] border border-white/[0.09] rounded-xl p-10 backdrop-blur-xl"
          : "py-16"
      }`}
    >
      <span className="w-16 h-16 rounded-full bg-[#c7ccd6]/12 border border-[#c7ccd6]/30 flex items-center justify-center mb-5 text-[#c7ccd6]">
        <CircleCheck size={28} strokeWidth={STROKE} aria-hidden="true" />
      </span>
      <h3 className="text-white text-lg mb-3">Request received</h3>
      <p className="text-white/60 text-sm max-w-xs leading-relaxed">
        {BUSINESS.founder.split(" ")[0]} reviews every inquiry personally and will reach out within
        one business day. For anything urgent, call{" "}
        <a href={PHONE_HREF} className="text-white font-semibold no-underline underline-offset-2 hover:underline">
          {BUSINESS.phone}
        </a>
        .
      </p>
    </div>
  );
}

export default function ContactForm({ variant = "full", subject }: Props) {
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    project: "",
    timeline: "",
    size: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    // The compact form posts `project`; the full form posts timeline/size/message.
    // Sending only the relevant keys keeps the API's template branch working.
    const payload =
      variant === "compact"
        ? { name: form.name, company: form.company, phone: form.phone, email: form.email, project: form.project }
        : {
            name: form.name,
            company: form.company,
            phone: form.phone,
            email: form.email,
            timeline: form.timeline,
            size: form.size,
            message: form.message,
          };

    try {
      const res = await fetch(CONTACT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          ...payload,
          _captcha: "false",
          _subject: subject || (variant === "compact" ? "New OFB Hero Form Inquiry" : "New OFB Project Inquiry (Contact)"),
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStatus("sent");
        window.fireFormConversion?.({ email: form.email, phone: form.phone, name: form.name });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "sent") return <Sent variant={variant} />;

  const compact = variant === "compact";

  return (
    <form
      onSubmit={submit}
      noValidate={false}
      className={
        compact
          ? "bg-white/[0.05] border border-white/[0.10] rounded-xl p-6 backdrop-blur-xl"
          : "space-y-5"
      }
    >
      {compact && (
        <p className="text-white font-semibold mb-5 text-base font-heading tracking-tight">
          Get a free project assessment
        </p>
      )}

      <div className={compact ? "space-y-4" : "space-y-5"}>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={LABEL} htmlFor="cf-name">
              Your name
            </label>
            <input
              id="cf-name"
              name="name"
              autoComplete="name"
              className={FIELD}
              placeholder="First Last"
              value={form.name}
              onChange={set("name")}
              required
            />
          </div>
          <div>
            <label className={LABEL} htmlFor="cf-company">
              Company
            </label>
            <input
              id="cf-company"
              name="company"
              autoComplete="organization"
              className={FIELD}
              placeholder="Company name"
              value={form.company}
              onChange={set("company")}
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={LABEL} htmlFor="cf-phone">
              Phone
            </label>
            <input
              id="cf-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              className={FIELD}
              placeholder="(555) 000-0000"
              value={form.phone}
              onChange={set("phone")}
              required
            />
          </div>
          <div>
            <label className={LABEL} htmlFor="cf-email">
              Work email
            </label>
            <input
              id="cf-email"
              name="email"
              type="email"
              autoComplete="email"
              className={FIELD}
              placeholder="you@company.com"
              value={form.email}
              onChange={set("email")}
              required
            />
          </div>
        </div>

        {!compact && (
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className={LABEL} htmlFor="cf-timeline">
                Timeline
              </label>
              <select id="cf-timeline" name="timeline" className={`${FIELD} cursor-pointer`} value={form.timeline} onChange={set("timeline")}>
                <option value="" className="bg-[#1a2440]">Select a timeline</option>
                <option value="asap" className="bg-[#1a2440]">As soon as possible</option>
                <option value="2weeks" className="bg-[#1a2440]">Within 2 weeks</option>
                <option value="1month" className="bg-[#1a2440]">Within 1 month</option>
                <option value="planning" className="bg-[#1a2440]">Still planning</option>
              </select>
            </div>
            <div>
              <label className={LABEL} htmlFor="cf-size">
                Office size
              </label>
              <select id="cf-size" name="size" className={`${FIELD} cursor-pointer`} value={form.size} onChange={set("size")}>
                <option value="" className="bg-[#1a2440]">Select a size</option>
                <option value="small" className="bg-[#1a2440]">Under 5,000 sq ft</option>
                <option value="medium" className="bg-[#1a2440]">5,000 to 25,000 sq ft</option>
                <option value="large" className="bg-[#1a2440]">25,000 to 100,000 sq ft</option>
                <option value="enterprise" className="bg-[#1a2440]">100,000 sq ft and up</option>
              </select>
            </div>
          </div>
        )}

        <div>
          <label className={LABEL} htmlFor={compact ? "cf-project" : "cf-message"}>
            Project details
          </label>
          <textarea
            id={compact ? "cf-project" : "cf-message"}
            name={compact ? "project" : "message"}
            className={`${FIELD} resize-none ${compact ? "h-20" : "h-28"}`}
            placeholder={compact ? "Office size, timeline, location" : "Location, what needs to be removed, special requirements"}
            value={compact ? form.project : form.message}
            onChange={set(compact ? "project" : "message")}
          />
        </div>

        <motion.button
          type="submit"
          disabled={status === "sending"}
          className="btn-chrome w-full font-semibold py-3 rounded-md disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.985 }}
        >
          {status === "sending" ? "Sending" : "Request free assessment"}
        </motion.button>

        {status === "error" && (
          <p role="alert" className="text-[#ff9d9d] text-xs text-center leading-relaxed">
            We could not send that. Call{" "}
            <a href={PHONE_HREF} className="font-semibold text-white no-underline underline-offset-2 hover:underline">
              {BUSINESS.phone}
            </a>{" "}
            and we will take the details directly.
          </p>
        )}
      </div>
    </form>
  );
}
