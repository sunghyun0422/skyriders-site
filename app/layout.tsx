import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";

export const metadata: Metadata = {
  title: {
    default: "SKYRIDERS",
    template: "%s | SKYRIDERS",
  },
  description: "International paragliding exchange & flying community in Korea.",
  applicationName: "SKYRIDERS",

  // favicon (구글/브라우저용)
  icons: {
    icon: "/favicon.ico",
  },

  // Open Graph (구글, SNS가 사이트 이름 인식)
  openGraph: {
    title: "SKYRIDERS",
    description:
      "International paragliding exchange & flying community in Korea.",
    siteName: "SKYRIDERS",
    type: "website",
    url: "https://skyriders-site.vercel.app",
  },

  // Google Search Console verification
  other: {
    "google-site-verification": "JQTZUju9TUFmpeW2Q7Q2Vtfy6bhko-MyAtscctjwe9w",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-black">
        <Header />
        <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
      </body>
    </html>
  );
}
