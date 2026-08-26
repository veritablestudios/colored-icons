import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SearchContextProvider } from "@/context/SearchContextProvider";
import { plusJakartaSans } from "@/lib/fonts";
import { SITE } from "@/constants/site";
import { Navbar } from "@/components/navbar";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.name,
    template: "%s · Coloured Icons",
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [...SITE.keywords],
  authors: [{ name: SITE.creator }],
  creator: SITE.creator,
  publisher: SITE.creator,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE.name,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og",
        width: 1200,
        height: 630,
        alt: `${SITE.name} – ${SITE.description}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: SITE.twitter,
    creator: SITE.twitter,
    title: SITE.name,
    description: SITE.description,
    images: ["/og"],
  },
  appleWebApp: {
    title: SITE.name,
    statusBarStyle: "default",
    capable: true,
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
  category: "technology",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: SITE.themeColor,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE.name,
  url: SITE.url,
  description: SITE.description,
  sameAs: [SITE.repoUrl, `https://x.com/${SITE.twitter.replace("@", "")}`],
  author: {
    "@type": "Person",
    name: SITE.creator,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth overflow-y-scroll">
      <body className={cn(plusJakartaSans.className, "px-8 antialiased")}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SearchContextProvider>
          <div className="sticky top-0 z-40 -mx-8 px-8 bg-white/90 backdrop-blur-md border-b border-slate-100/80">
            <div className="max-w-7xl mx-auto">
              <Navbar />
            </div>
          </div>
          {children}
        </SearchContextProvider>
      </body>
    </html>
  );
}
