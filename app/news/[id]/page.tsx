"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";

type DBPost = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  is_published: boolean;
};

function toDateString(iso: string) {
  try {
    return new Date(iso).toLocaleDateString();
  } catch {
    return iso;
  }
}

export default function NewsDetailPage() {
  const params = useParams<{ id: string }>();
  const idNum = Number(params.id);

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [post, setPost] = useState<DBPost | null>(null);

  useEffect(() => {
    (async () => {
      setErr("");
      setLoading(true);

      if (!Number.isFinite(idNum) || idNum <= 0) {
        setErr("Invalid post id");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("posts")
        .select("id, title, content, created_at, is_published")
        .eq("id", idNum)
        .eq("is_published", true)
        .single();

      if (error) {
        setErr(error.message);
        setLoading(false);
        return;
      }

      setPost(data as DBPost);
      setLoading(false);
    })();
  }, [idNum]);

  if (loading) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-sm text-neutral-600">Loading...</p>
      </main>
    );
  }

  if (err || !post) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-16 space-y-4">
        <p className="text-sm text-red-600">Error: {err || "Not found"}</p>
        <Link href="/news" className="text-sm underline">
          ← Back to News
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 space-y-6">
      <Link href="/news" className="text-sm underline">
        ← Back to News
      </Link>

      <div className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">{post.title}</h1>
        <p className="text-sm text-neutral-500">{toDateString(post.created_at)}</p>
      </div>

      <article className="prose max-w-none">
        <pre className="whitespace-pre-wrap font-sans text-[15px] leading-7">
          {post.content}
        </pre>
      </article>
    </main>
  );
}
