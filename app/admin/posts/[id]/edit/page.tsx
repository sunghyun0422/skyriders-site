"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "../../../../../lib/supabaseClient";

type Role = "admin" | "user";

type DBPost = {
  id: number;
  title: string;
  content: string;
  is_published: boolean;
  created_at: string;
};

export default function EditPostPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const idNum = Number(params.id);

  const [checking, setChecking] = useState(true);
  const [loadingPost, setLoadingPost] = useState(true);
  const [err, setErr] = useState("");

  const [post, setPost] = useState<DBPost | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublished, setIsPublished] = useState(true);

  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // ✅ admin 체크 + 글 로드
  useEffect(() => {
    (async () => {
      setErr("");
      setChecking(true);

      // 로그인 확인
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) {
        router.replace("/login");
        return;
      }

      // role 확인
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

      // id 검증
      if (!Number.isFinite(idNum) || idNum <= 0) {
        setErr("Invalid post id");
        setLoadingPost(false);
        return;
      }

      // 글 로드
      setLoadingPost(true);
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, content, is_published, created_at")
        .eq("id", idNum)
        .single();

      if (error) {
        setErr(error.message);
        setLoadingPost(false);
        return;
      }

      const row = data as DBPost;
      setPost(row);
      setTitle(row.title ?? "");
      setContent(row.content ?? "");
      setIsPublished(!!row.is_published);
      setLoadingPost(false);
    })();
  }, [router, idNum]);

  async function onSave() {
    setErr("");

    if (!title.trim()) return setErr("제목을 입력해줘.");
    if (!content.trim()) return setErr("본문을 입력해줘.");

    setSaving(true);

    const { error } = await supabase
      .from("posts")
      .update({
        title: title.trim(),
        content: content.trim(),
        is_published: isPublished,
      })
      .eq("id", idNum);

    setSaving(false);

    if (error) {
      setErr(error.message);
      return;
    }

    router.push("/admin/posts");
  }

  async function onDelete() {
    setErr("");

    const ok = confirm("진짜 삭제할까? (되돌릴 수 없음)");
    if (!ok) return;

    setDeleting(true);

    const { error } = await supabase.from("posts").delete().eq("id", idNum);

    setDeleting(false);

    if (error) {
      setErr(error.message);
      return;
    }

    router.push("/admin/posts");
  }

  if (checking || loadingPost) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-16">
        <p className="text-sm text-neutral-600">Loading...</p>
        {err && <p className="mt-2 text-sm text-red-600">{err}</p>}
      </main>
    );
  }

  if (!post) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-16 space-y-4">
        <p className="text-sm text-red-600">Error: {err || "Post not found"}</p>
        <Link href="/admin/posts" className="text-sm underline">
          ← 글 목록
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">글 수정</h1>
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
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">본문</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[240px] w-full rounded-xl border px-4 py-3 text-sm outline-none"
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
            공개(Published)
          </label>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={onSave}
            disabled={saving}
            className="rounded-xl bg-black px-5 py-3 text-sm font-medium text-white hover:opacity-90 disabled:opacity-60"
          >
            {saving ? "저장 중..." : "저장"}
          </button>

          <button
            onClick={onDelete}
            disabled={deleting}
            className="rounded-xl border border-red-300 px-5 py-3 text-sm font-medium text-red-700 hover:bg-red-50 disabled:opacity-60"
          >
            {deleting ? "삭제 중..." : "삭제"}
          </button>
        </div>
      </div>
    </main>
  );
}
