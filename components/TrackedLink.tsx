"use client";

import { BUSINESS, PHONE_HREF, EMAIL_HREF } from "@/lib/site";

// Google Ads conversion tracking needs an onClick, which a Server Component
// cannot pass down. Rather than turning whole sections into client bundles for
// the sake of two links, the tracking lives in these two leaves.
//
// Both fire the Contact secondary conversion action. Do not rename the event
// strings, they are the event_category values already reported in Google Ads.

type Props = {
  /** Distinguishes which placement converted, e.g. "phone_click_hero". */
  event: string;
  className?: string;
  children?: React.ReactNode;
};

export function PhoneLink({ event, className, children }: Props) {
  return (
    <a href={PHONE_HREF} className={className} onClick={() => window?.fireContactClick?.(event)}>
      {children ?? BUSINESS.phone}
    </a>
  );
}

export function EmailLink({ event, className, children }: Props) {
  return (
    <a href={EMAIL_HREF} className={className} onClick={() => window?.fireContactClick?.(event)}>
      {children ?? BUSINESS.email}
    </a>
  );
}
