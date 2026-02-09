"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabaseClient";

type Role = "admin" | "user";

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    (async () => {
      setError("");
      setLoading(true);

      const { data: userData, error: userErr } = await supabase.auth.getUser();
      if (userErr) {
        setError(userErr.message);
        setLoading(false);
        return;
      }

      const user = userData.user;
      if (!user) {
        router.replace("/login");
        return;
      }

      setEmail(user.email ?? null);

      const { data: profile, error: profErr } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profErr) {
        setError(profErr.message);
        setLoading(false);
        return;
      }

      const r = (profile?.role ?? "user") as Role;
      setRole(r);

      if (r !== "admin") {
        // 관리자 아니면 홈으로 돌려보내기
        router.replace("/");
        return;
      }

      setLoading(false);
    })();
  }, [router]);

  async function signOut() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-2xl px-6 py-16">
        <p className="text-sm text-neutral-600">Loading admin...</p>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">Admin</h1>

      <div className="mt-4 rounded-xl border border-neutral-200 bg-white p-4">
        <p className="text-sm text-neutral-700">
          로그인: <b>{email}</b>
        </p>
        <p className="mt-1 text-sm text-neutral-700">
          권한: <b>{role}</b>
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
  <Link
    href="/admin/posts/new"
    className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90"
  >
    새 글 작성
  </Link>

  <Link
    href="/admin/posts"
    className="rounded-xl border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-50"
  >
    글 목록/관리
  </Link>

  <Link
    href="/admin/content"
    className="rounded-xl border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-50"
  >
    사이트 내용 편집
  </Link>

  <Link
    href="/admin/users"
    className="rounded-xl border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-50"
  >
    회원 목록
  </Link>

  <button
    onClick={signOut}
    className="rounded-xl border border-neutral-300 px-4 py-2 text-sm font-medium hover:bg-neutral-50"
  >
    로그아웃
  </button>
</div>

    </main>
  );
}
