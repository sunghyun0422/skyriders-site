import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";

export const metadata: Metadata = {
  title: "SKYRIDERS",
  description: "A pilot-driven paragliding project based in Korea.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-black">
        <Header />
        <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
      </body>
    </html>
  );
}
