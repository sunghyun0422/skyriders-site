"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import ContentEditor from "./ContentEditor";

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

  // ✅ admin 체크 (그대로 유지)
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
        이제 JSON 직접 수정 대신, 폼으로 간단하게 수정합니다.
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

      {/* ✅ 여기 한 줄로 교체 */}
      <ContentEditor contentKey={active} />

      <div className="mt-6">
        <button onClick={() => router.push("/admin")} className="text-sm underline">
          ← Admin 홈으로
        </button>
      </div>
    </main>
  );
}
