import Link from "next/link";

const nav = [
  { href: "/", label: "Home" },
  { href: "/programs", label: "Programs" },
  { href: "/news", label: "News" },
  { href: "/resources", label: "Pilot Resources" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        
        {/* ✅ 로고 */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/globe.png"
            alt="SKYRIDERS Logo"
            width={28}
            height={28}
          />
          <span className="text-lg font-semibold tracking-tight">
            SKYRIDERS
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-gray-700 hover:text-black"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
          >
            Apply / Contact
          </Link>
        </div>
      </div>

      {/* 모바일 */}
      <div className="border-t md:hidden">
        <div className="mx-auto flex max-w-6xl items-center gap-4 overflow-x-auto px-4 py-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-sm text-gray-700"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
