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
            window.fireFormConversion = function() {
              gtag('event', 'conversion', {
                'send_to': 'AW-18174858325/1XcPCPbPobgcENWoudpD'
              });
            };
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-body`}>{children}</body>
    </html>
  );
}
