import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { Navbar } from "@/components/layout/navbar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://padella.app"),
  title: {
    default: "Padella — Turkey's Home for Padel",
    template: "%s · Padella",
  },
  description:
    "Play. Connect. Compete. Padella is the premium digital ecosystem for padel players, clubs, tournaments and brands across Turkey.",
  keywords: [
    "padel",
    "Turkey",
    "padel clubs",
    "padel tournaments",
    "padel community",
    "padel rankings",
  ],
  openGraph: {
    title: "Padella — Turkey's Home for Padel",
    description: "Play. Connect. Compete. The future of padel in Turkey.",
    type: "website",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable} dark`}>
      <body className="min-h-screen bg-ink font-sans text-sand antialiased">
        <SmoothScroll>
          <Navbar />
          <main className="relative">{children}</main>
          <Footer />
          <MobileNav />
          {/* bottom-nav spacer on mobile */}
          <div className="h-20 lg:hidden" aria-hidden />
        </SmoothScroll>
      </body>
    </html>
  );
}
