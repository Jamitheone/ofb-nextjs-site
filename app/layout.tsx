import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { BUSINESS, SITE_URL } from "@/lib/site";
import { BusinessSchema } from "@/components/Schema";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["500", "700"],
});

// metadataBase is what makes every relative canonical, OG and Twitter URL below
// resolve to an absolute https://ofbswfl.com/... Without it Next emits relative
// og:url values, which most crawlers and every social scraper ignore.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Office Decommissioning & Furniture Liquidation | OFB of SWFL",
    // Per-page titles get the brand appended automatically instead of each page
    // hand-rolling it and drifting.
    template: `%s | ${BUSINESS.shortName}`,
  },
  description:
    "Office furniture decommissioning, liquidation and asset removal for corporate tenants and Fortune 1000 companies. Serving all of Florida statewide, projects in 48 states. Free assessment, 2-hour response.",
  applicationName: BUSINESS.name,
  authors: [{ name: BUSINESS.name, url: SITE_URL }],
  creator: BUSINESS.name,
  publisher: BUSINESS.name,
  keywords: [
    "office decommissioning",
    "office furniture liquidation",
    "office furniture removal",
    "asset liquidation",
    "lease surrender",
    "data center decommissioning",
    "cubicle removal",
    "Florida office decommissioning",
    "Miami office furniture removal",
    "Orlando office decommissioning",
    "Tampa office furniture liquidation",
    "Jacksonville office decommissioning",
    "Naples FL office decommissioning",
    "commercial furniture logistics",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: BUSINESS.name,
    locale: "en_US",
    url: SITE_URL,
    title: "Office Decommissioning & Furniture Liquidation | OFB of SWFL",
    description:
      "Removal, logistics, documentation and asset resale under one contract. All of Florida, projects in 48 states.",
    images: [
      {
        url: "/cleared-office-floor.jpg",
        width: 1376,
        height: 768,
        alt: "A cleared corporate office floor overlooking the Southwest Florida coastline",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Office Decommissioning & Furniture Liquidation | OFB of SWFL",
    description:
      "Removal, logistics, documentation and asset resale under one contract. All of Florida, projects in 48 states.",
    images: ["/cleared-office-floor.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: { icon: "/favicon.ico", apple: "/ofb-logo.png" },
  category: "business",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <BusinessSchema />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-18174858325"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-18174858325');
            gtag('config', 'G-59R11DBQEN');
            window.fireConversion = function(type) {
              gtag('event', 'conversion', {
                'send_to': 'AW-18174858325/QY2oCIuNxrAcENWoudpD',
                'event_category': type
              });
            };
            window.fireFormConversion = function(userData) {
              // Enhanced Conversions: pass first-party data so Google can match to signed-in accounts
              if (userData) {
                var phone = (userData.phone || '').replace(/\D/g, '');
                if (phone.length === 10) phone = '+1' + phone;
                else if (phone.length === 11 && phone[0] === '1') phone = '+' + phone;
                var nameParts = (userData.name || '').trim().split(/\s+/);
                gtag('set', 'user_data', {
                  email: userData.email || undefined,
                  phone_number: phone || undefined,
                  first_name: nameParts[0] || undefined,
                  last_name: nameParts.length > 1 ? nameParts.slice(1).join(' ') : undefined
                });
              }
              // Standard conversion tag — corrected label (was lXcP..., now 1XcP...)
              gtag('event', 'conversion', {
                'send_to': 'AW-18174858325/1XcPCPbPobgcENWoudpD'
              });
              // Named event — covers Manual Event setup in Google Ads
              gtag('event', 'submit_lead_form', {
                'send_to': 'AW-18174858325'
              });
            };
            window.fireContactClick = function(type) {
              // Secondary signal — phone/email clicks (Contact - Email or Call)
              gtag('event', 'conversion', {
                'send_to': 'AW-18174858325/QY2oCIuNxrAcENWoudpD',
                'event_category': type
              });
              gtag('event', 'contact_click', {
                'send_to': 'AW-18174858325',
                'contact_type': type
              });
            };
          `}
        </Script>
        <Script id="clarity-init" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "xwn3ofbfx1");
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-body`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-md focus:bg-[#c7ccd6] focus:text-[#0e1530] focus:font-semibold focus:text-sm"
        >
          Skip to content
        </a>
        {children}
        <Script
          src="https://widgets.leadconnectorhq.com/loader.js"
          data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
          data-widget-id="6a418a1455ef5e64133111a8"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
