// The Google Ads conversion helpers are defined in the inline gtag script in
// app/layout.tsx. This declaration used to live inside app/page.tsx, which meant
// only that one file could see it; now every component that fires a conversion
// gets the types.

declare global {
  interface Window {
    /** Generic secondary conversion. `type` becomes event_category. */
    fireConversion?: (type: string) => void;
    /** Phone / email click conversion. `type` becomes contact_type. */
    fireContactClick?: (type: string) => void;
    /** Primary form conversion, with enhanced-conversion first-party data. */
    fireFormConversion?: (userData?: {
      email?: string;
      phone?: string;
      name?: string;
    }) => void;
  }
}

export {};
