"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Role = "admin" | "user";

const nav = [
  { href: "/", label: "Home" },
  { href: "/our-story", label: "Our Story" },
  { href: "/programs", label: "Programs" },
  { href: "/news", label: "News" },
  { href: "/resources", label: "Pilot Resources" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);

      const { data } = await supabase.auth.getSession();
      const user = data.session?.user ?? null;

      if (!mounted) return;

      setEmail(user?.email ?? null);

      if (!user) {
        setRole(null);
        setLoading(false);
        return;
      }

      // role 조회 (없으면 user로)
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      setRole(((profile?.role ?? "user") as Role) || "user");
      setLoading(false);
    }

    load();

    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      load();
    });

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          SKYRIDERS
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
          {/* 관리자면 Admin 메뉴 노출 */}
          {!loading && role === "admin" && (
            <Link href="/admin" className="text-sm font-semibold text-black">
              Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          {/* 로그인 상태에 따라 버튼 변경 */}
          {!loading && email ? (
            <>
              <button
                onClick={signOut}
                className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
              >
                Logout
              </button>
              <Link
                href="/contact"
                className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
              >
                Apply / Contact
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
              >
                Login
              </Link>
              <Link
                href="/contact"
                className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-50"
              >
                Apply / Contact
              </Link>
            </>
          )}
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
          {!loading && role === "admin" && (
            <Link href="/admin" className="whitespace-nowrap text-sm font-semibold">
              Admin
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
