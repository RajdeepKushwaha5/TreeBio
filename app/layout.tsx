import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

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
  // Remove optional verification that might cause issues
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  try {
    return (
      <ClerkProvider
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      >
        <html lang="en" suppressHydrationWarning>
          <body className={`${poppins.variable} antialiased`}>
            <SimpleErrorBoundary>
              {children}
            </SimpleErrorBoundary>
          </body>
        </html>
      </ClerkProvider>
    );
  } catch (error) {
    // Fallback if even the layout fails
    console.error('Layout error:', error);
    return (
      <html lang="en">
        <body>
          <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="text-center max-w-md mx-auto p-6">
              <h1 className="text-2xl font-bold mb-4 text-gray-800">TreeBio</h1>
              <p className="text-gray-600 mb-6">
                Loading TreeBio... Please wait a moment.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
              >
                Refresh Page
              </button>
            </div>
          </div>
        </body>
      </html>
    );
  }
}

// Simple Error Boundary that doesn't rely on external libraries
function SimpleErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
