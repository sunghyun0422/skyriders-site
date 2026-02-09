"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

type DBPost = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  // cover_image 같은 컬럼을 나중에 추가하면 여기에도 추가 가능
};

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
      {children}
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs text-neutral-700">
      {children}
    </span>
  );
}

function toDateString(iso: string) {
  try {
    return new Date(iso).toLocaleDateString();
  } catch {
    return iso;
  }
}

function excerptFrom(content: string, max = 140) {
  const t = (content ?? "").trim();
  if (t.length <= max) return t;
  return t.slice(0, max) + "…";
}

export default function NewsPage() {
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [posts, setPosts] = useState<DBPost[]>([]);

  // ✅ Supabase에서 공개글만 가져오기
useEffect(() => {
  let cancelled = false;

  const fetchPosts = async () => {
    setErr("");
    setLoading(true);

    const { data, error } = await supabase
      .from("posts")
      .select("id, title, content, created_at")
      .eq("is_published", true)
      .order("created_at", { ascending: false });

    if (cancelled) return;

    if (error) {
      setErr(error.message);
      setPosts([]);
      setLoading(false);
      return;
    }

    setPosts((data ?? []) as DBPost[]);
    setLoading(false);
  };

  // 첫 로드
  fetchPosts();

  // 탭 다시 돌아오거나, 화면 포커스 오면 재로딩
  const onFocus = () => fetchPosts();
  window.addEventListener("focus", onFocus);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") fetchPosts();
  });

  return () => {
    cancelled = true;
    window.removeEventListener("focus", onFocus);
  };
}, []);


  // Featured = 최신 글(가장 위)
  const featured = posts[0] ?? null;

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return posts
      .slice(1) // featured 제외
      .filter((p) => {
        if (!query) return true;
        return (
          p.title.toLowerCase().includes(query) ||
          p.content.toLowerCase().includes(query)
        );
      });
  }, [q, posts]);

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-16 space-y-12">
      {/* Hero */}
      <section className="rounded-3xl border bg-white p-8">
        <h1 className="text-4xl font-bold tracking-tight">News</h1>
        <p className="mt-4 max-w-3xl text-neutral-700 leading-7">
          Stories, announcements, and archival records from SKYRIDERS.
        </p>

        {/* Search only */}
        <div className="mt-6 rounded-2xl border px-4 py-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search news by keyword…"
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
      </section>

      {loading && (
        <p className="text-sm text-neutral-600">Loading news...</p>
      )}
      {err && (
        <p className="text-sm text-red-600">Error: {err}</p>
      )}

      {!loading && !err && posts.length === 0 && (
        <p className="text-sm text-neutral-600">No published posts yet.</p>
      )}

      {/* Featured */}
      {!loading && !err && featured && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Featured</h2>

          <Link href={`/news/${featured.id}`}>
            <Card>
              {/* coverImage는 나중에 DB 컬럼 추가하면 여기서 보여주면 됨 */}

              <div className="flex items-center gap-2">
                <Badge>Featured</Badge>
                <p className="text-xs text-neutral-500">
                  {toDateString(featured.created_at)}
                </p>
              </div>

              <h3 className="mt-3 text-2xl font-semibold">{featured.title}</h3>
              <p className="mt-3 text-sm text-neutral-700 leading-7">
                {excerptFrom(featured.content, 220)}
              </p>
              <p className="mt-6 text-sm font-medium">Read more →</p>
            </Card>
          </Link>
        </section>
      )}

      {/* All posts */}
      {!loading && !err && featured && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">All News</h2>

          <div className="grid gap-4 md:grid-cols-2">
            {filtered.map((p) => (
              <Link key={p.id} href={`/news/${p.id}`}>
                <Card>
                  <p className="text-xs text-neutral-500">
                    {toDateString(p.created_at)}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold">{p.title}</h3>
                  <p className="mt-2 text-sm text-neutral-700 leading-7">
                    {excerptFrom(p.content, 140)}
                  </p>
                  <p className="mt-4 text-sm font-medium">Read →</p>
                </Card>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-sm text-neutral-600">No results found.</p>
          )}
        </section>
      )}
    </main>
  );
}
