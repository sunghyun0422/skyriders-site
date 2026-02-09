"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "../../../../lib/supabaseClient";

type Role = "admin" | "user";

export default function NewPostPage() {
  const router = useRouter();

  const [checking, setChecking] = useState(true);
  const [err, setErr] = useState("");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const [saving, setSaving] = useState(false);

  // ✅ admin 체크
  useEffect(() => {
    (async () => {
      setErr("");
      setChecking(true);

      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) {
        router.replace("/login");
        return;
      }

      const { data: profile, error: profErr } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profErr) {
        setErr(profErr.message);
        setChecking(false);
        return;
      }

      const role = (profile?.role ?? "user") as Role;
      if (role !== "admin") {
        router.replace("/");
        return;
      }

      setChecking(false);
    })();
  }, [router]);

  async function onSave() {
    setErr("");

    if (!title.trim()) {
      setErr("제목을 입력해줘.");
      return;
    }
    if (!content.trim()) {
      setErr("본문을 입력해줘.");
      return;
    }

    setSaving(true);

    const { error } = await supabase.from("posts").insert({
      title: title.trim(),
      content: content.trim(),
      is_published: isPublished,
    });

    setSaving(false);

    if (error) {
      setErr(error.message);
      return;
    }

    router.push("/admin/posts");
  }

  if (checking) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-sm text-neutral-600">Loading...</p>
        {err && <p className="mt-2 text-sm text-red-600">{err}</p>}
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">새 글 작성</h1>
        <Link href="/admin/posts" className="text-sm underline">
          ← 글 목록
        </Link>
      </div>

      {err && <p className="text-sm text-red-600">Error: {err}</p>}

      <div className="rounded-2xl border bg-white p-6 space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">제목</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border px-4 py-3 text-sm outline-none"
            placeholder="제목을 입력"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">본문</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[240px] w-full rounded-xl border px-4 py-3 text-sm outline-none"
            placeholder="내용을 입력"
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            id="pub"
            type="checkbox"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
          />
          <label htmlFor="pub" className="text-sm">
            바로 공개(Published)
          </label>
        </div>

        <button
          onClick={onSave}
          disabled={saving}
          className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
        >
          {saving ? "저장 중..." : "저장"}
        </button>
      </div>
    </main>
  );
}
