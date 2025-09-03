import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

import { ThemeProvider } from "@/components/theme-provider";
import { RealtimeProvider } from "@/components/realtime-provider-fallback";
import { Toaster } from "sonner";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "TreeBio - Your Link in Bio Solution",
    template: "%s | TreeBio"
  },
  description: "Create beautiful link-in-bio pages, manage your links, and track analytics with TreeBio - the modern alternative to Linktree.",
  keywords: ["link in bio", "social media links", "bio page", "linktree alternative", "link management"],
  authors: [{ name: "TreeBio" }],
  creator: "TreeBio",
  publisher: "TreeBio",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://treebio.vercel.app'),
  openGraph: {
    type: "website",
    siteName: "TreeBio",
    title: "TreeBio - Your Link in Bio Solution",
    description: "Create beautiful link-in-bio pages and manage your social media presence.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "TreeBio - Link in Bio Solution",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TreeBio - Your Link in Bio Solution",
    description: "Create beautiful link-in-bio pages and manage your social media presence.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${poppins.variable} antialiased`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <RealtimeProvider>
              <Toaster />
              {children}
            </RealtimeProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
