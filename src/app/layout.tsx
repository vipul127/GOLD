import type { Metadata } from "next";
import { Inter, Antonio } from "next/font/google";
import "./globals.css";

import ErrorReporter from "@/components/ErrorReporter";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const antonio = Antonio({
  subsets: ["latin"],
  variable: "--font-antonio",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "GOLD | RAIT ACM",
  description: "The premier event for ACM chapters across India.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${antonio.variable}`}>
      <body className="antialiased font-sans">
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        {children}
      </body>
    </html>
  );
}
