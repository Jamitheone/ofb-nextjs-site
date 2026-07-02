import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["300", "700"],
});

export const metadata: Metadata = {
  title: "Office Furniture Brokers of SW Florida | Decommissioning & Liquidation Experts",
  description:
    "OFB of SWFL manages full-service office furniture decommissioning, liquidation, and asset removal for corporate tenants, facility managers, and Fortune 1000 companies. Any size. Anywhere in the U.S.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
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
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-body`}>
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
