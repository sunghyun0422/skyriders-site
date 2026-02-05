"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { posts } from "./posts";

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

export default function NewsPage() {
  const [q, setQ] = useState("");

  const featured = posts.find((p) => p.featured) ?? posts[0];

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return posts
      .filter((p) => p.slug !== featured.slug)
      .filter((p) => {
        if (!query) return true;
        return (
          p.title.toLowerCase().includes(query) ||
          p.excerpt.toLowerCase().includes(query)
        );
      })
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [q, featured.slug]);

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

      {/* Featured */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Featured</h2>

        <Link href={`/news/${featured.slug}`}>
          <Card>
            {featured.coverImage ? (
              <div className="mb-5 overflow-hidden rounded-3xl border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featured.coverImage}
                  alt={featured.title}
                  className="h-64 w-full object-cover"
                />
              </div>
            ) : null}

            <div className="flex items-center gap-2">
              <Badge>Featured</Badge>
              <p className="text-xs text-neutral-500">{featured.date}</p>
            </div>

            <h3 className="mt-3 text-2xl font-semibold">
              {featured.title}
            </h3>
            <p className="mt-3 text-sm text-neutral-700 leading-7">
              {featured.excerpt}
            </p>
            <p className="mt-6 text-sm font-medium">Read more →</p>
          </Card>
        </Link>
      </section>

      {/* All posts */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">All News</h2>

        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((p) => (
            <Link key={p.slug} href={`/news/${p.slug}`}>
              <Card>
                <p className="text-xs text-neutral-500">{p.date}</p>
                <h3 className="mt-2 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-neutral-700 leading-7">
                  {p.excerpt}
                </p>
                <p className="mt-4 text-sm font-medium">Read →</p>
              </Card>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-sm text-neutral-600">
            No results found.
          </p>
        )}
      </section>
    </main>
  );
}
