"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";

type Role = "admin" | "user";

type PostRow = {
  id: number;
  title: string;
  created_at: string;
  is_published: boolean;
};

export default function AdminPostsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [posts, setPosts] = useState<PostRow[]>([]);

  useEffect(() => {
    (async () => {
      setErr("");
      setLoading(true);

      // ✅ 로그인 확인
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) {
        router.replace("/login");
        return;
      }

      // ✅ role 확인 (admin만)
      const { data: profile, error: profErr } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profErr) {
        setErr(profErr.message);
        setLoading(false);
        return;
      }

      const role = (profile?.role ?? "user") as Role;
      if (role !== "admin") {
        router.replace("/");
        return;
      }

      // ✅ posts 로드
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, created_at, is_published")
        .order("created_at", { ascending: false });

      if (error) {
        setErr(error.message);
        setPosts([]);
        setLoading(false);
        return;
      }

      setPosts((data ?? []) as PostRow[]);
      setLoading(false);
    })();
  }, [router]);

  async function togglePublish(id: number, next: boolean) {
    setErr("");
    const { error } = await supabase
      .from("posts")
      .update({ is_published: next })
      .eq("id", id);

    if (error) {
      setErr(error.message);
      return;
    }

    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, is_published: next } : p))
    );
  }

  if (loading) {
    return (
      <main className="mx-auto w-full max-w-4xl px-6 py-16">
        <p className="text-sm text-neutral-600">Loading posts...</p>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-16 space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold tracking-tight">글 목록/관리</h1>
        <Link
          href="/admin/posts/new"
          className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          + 새 글 작성
        </Link>
      </div>

      {err && <p className="text-sm text-red-600">Error: {err}</p>}

      <div className="rounded-2xl border bg-white">
        <div className="grid grid-cols-12 gap-2 border-b px-4 py-3 text-xs font-semibold text-neutral-600">
          <div className="col-span-6">제목</div>
          <div className="col-span-3">작성일</div>
          <div className="col-span-2">상태</div>
          <div className="col-span-1">액션</div>
        </div>

        {posts.map((p) => (
          <div
            key={p.id}
            className="grid grid-cols-12 gap-2 px-4 py-3 items-center hover:bg-neutral-50"
          >
            <div className="col-span-6">
              <Link
                href={`/admin/posts/${p.id}/edit`}
                className="text-sm font-medium underline-offset-2 hover:underline"
              >
                {p.title}
              </Link>
            </div>

            <div className="col-span-3 text-sm text-neutral-600">
              {new Date(p.created_at).toLocaleDateString()}
            </div>

            <div className="col-span-2 text-sm">
              {p.is_published ? "Published" : "Draft"}
            </div>

            <div className="col-span-1">
              <button
                onClick={() => togglePublish(p.id, !p.is_published)}
                className="rounded-lg border px-2 py-1 text-xs hover:bg-neutral-100"
              >
                {p.is_published ? "내림" : "공개"}
              </button>
            </div>
          </div>
        ))}

        {posts.length === 0 && (
          <div className="px-4 py-6 text-sm text-neutral-600">
            아직 글이 없습니다.
          </div>
        )}
      </div>

      <Link href="/admin" className="text-sm underline">
        ← Admin 홈으로
      </Link>
    </main>
  );
}
