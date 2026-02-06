import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";

export const metadata: Metadata = {
  title: "SKYRIDERS",
  description: "A pilot-driven paragliding project based in Korea.",
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
        {/* ⚠️ 여기 main을 두면 각 페이지가 또 main을 갖고 있을 때 중첩될 수 있어서
            페이지들에 <main>이 이미 있으면 div로 감싸는 게 안전함 */}
        <div className="mx-auto max-w-6xl px-4 py-10">{children}</div>
      </body>
    </html>
  );
}
