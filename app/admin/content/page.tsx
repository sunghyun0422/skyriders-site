"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";

type Role = "admin" | "user";

type ContentKey = "home" | "our_story" | "programs" | "pilot_resources" | "contact";

export default function AdminContentPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<Role | null>(null);
  const [error, setError] = useState("");

  const tabs: { key: ContentKey; label: string }[] = useMemo(
    () => [
      { key: "home", label: "Home" },
      { key: "our_story", label: "Our Story" },
      { key: "programs", label: "Programs" },
      { key: "pilot_resources", label: "Pilot Resources" },
      { key: "contact", label: "Contact" },
    ],
    []
  );


  const [active, setActive] = useState<ContentKey>("home");
  const [jsonText, setJsonText] = useState<string>("{}");
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<string>("");

  // ✅ admin 체크
  useEffect(() => {
    (async () => {
      setError("");
      setLoading(true);

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
        setError(profErr.message);
        setLoading(false);
        return;
      }

      const r = (profile?.role ?? "user") as Role;
      setRole(r);

      if (r !== "admin") {
        router.replace("/");
        return;
      }

      setLoading(false);
    })();
  }, [router]);

  // ✅ active 탭 데이터 로드
  useEffect(() => {
    if (role !== "admin") return;

    (async () => {
      setStatus("");
      setError("");

      const { data, error } = await supabase
        .from("site_content")
        .select("value")
        .eq("key", active)
        .single();

      if (error) {
        setError(error.message);
        setJsonText("{}");
        return;
      }

      setJsonText(JSON.stringify(data?.value ?? {}, null, 2));
    })();
  }, [active, role]);

  async function save() {
    setStatus("");
    setError("");

    let parsed: any;
    try {
      parsed = JSON.parse(jsonText);
    } catch {
      setError("JSON 형식이 깨졌어. 콤마/따옴표 확인!");
      return;
    }

    setSaving(true);

    const { error } = await supabase.from("site_content").upsert(
      {
        key: active,
        value: parsed,
      },
      { onConflict: "key" }
    );

    setSaving(false);

    if (error) {
      setError(error.message);
      return;
    }

    setStatus("✅ 저장 완료!");
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-16">
        <p className="text-sm text-neutral-600">Loading admin content...</p>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">사이트 내용 편집</h1>
      <p className="mt-2 text-sm text-neutral-600">
        Home / Our Story / Programs 문구를 JSON으로 관리합니다.
      </p>

      {/* Tabs */}
      <div className="mt-6 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={`rounded-xl border px-4 py-2 text-sm ${
              active === t.key ? "bg-black text-white" : "hover:bg-neutral-50"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Editor */}
      <div className="mt-6 rounded-2xl border bg-white p-4">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="text-sm text-neutral-700">
            key: <b>{active}</b>
          </div>
          <button
            onClick={save}
            disabled={saving}
            className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
          >
            {saving ? "저장 중..." : "저장"}
          </button>
        </div>

        <textarea
          value={jsonText}
          onChange={(e) => setJsonText(e.target.value)}
          className="h-[420px] w-full rounded-xl border p-3 font-mono text-sm outline-none"
          spellCheck={false}
        />

        {status && <p className="mt-3 text-sm text-green-700">{status}</p>}
        {error && <p className="mt-3 text-sm text-red-600">Error: {error}</p>}

        <p className="mt-3 text-xs text-neutral-500">
          ⚠️ JSON은 반드시 따옴표/콤마가 정확해야 저장됩니다.
        </p>
      </div>

      <div className="mt-6">
        <button
          onClick={() => router.push("/admin")}
          className="text-sm underline"
        >
          ← Admin 홈으로
        </button>
      </div>
    </main>
  );
}
