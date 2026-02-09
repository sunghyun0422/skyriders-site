"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../../lib/supabaseClient";
import ImageUploader from "../_components/ImageUploader";




type FieldType = "text" | "textarea" | "image";
type FieldDef = { key: string; label: string; type: FieldType; placeholder?: string };

const schemas: Record<string, { title: string; fields: FieldDef[] }> = {
  home: {
    title: "Home",
    fields: [
      { key: "brand", label: "Brand", type: "text" },
      { key: "title", label: "Hero Title", type: "text" },
      { key: "subtitle", label: "Hero Subtitle", type: "textarea" },
      { key: "tagline", label: "Tagline", type: "text" },
      { key: "heroImage", label: "Hero Image", type: "image" },
      { key: "ctaPrimary", label: "CTA Primary Text", type: "text" },
      { key: "ctaSecondary", label: "CTA Secondary Text", type: "text" },
    ],
  },
  our_story: {
    title: "Our Story",
    fields: [
      { key: "title", label: "Page Title", type: "text" },
      { key: "date", label: "Date", type: "text", placeholder: "YYYY-MM-DD" },
      { key: "heroImage", label: "Top Image", type: "image" },
      { key: "body", label: "Main Text", type: "textarea" },
    ],
  },
  programs: {
    title: "Programs",
    fields: [
      { key: "title", label: "Page Title", type: "text" },
      { key: "intro", label: "Intro", type: "textarea" },
      { key: "heroImage", label: "Top Image", type: "image" },
    ],
  },
  pilot_resources: {
    title: "Pilot Resources",
    fields: [
      { key: "title", label: "Page Title", type: "text" },
      { key: "intro", label: "Intro", type: "textarea" },
    ],
  },
  contact: {
    title: "Contact",
    fields: [
      { key: "title", label: "Page Title", type: "text" },
      { key: "intro", label: "Intro", type: "textarea" },
      { key: "heroImage", label: "Top Image", type: "image" },
    ],
  },
};

type Json = Record<string, any>;

export default function ContentEditor({ contentKey }: { contentKey: string }) {
  const schema = schemas[contentKey];
  const [form, setForm] = useState<Json>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      setStatus("");
      setError("");

      const { data, error } = await supabase
        .from("site_content")
        .select("value")
        .eq("key", contentKey)
        .single();

      if (!mounted) return;

      if (error) {
        setError(error.message);
        setForm({});
        setLoading(false);
        return;
      }

      setForm((data?.value as Json) ?? {});
      setLoading(false);
    })();

    return () => {
      mounted = false;
    };
  }, [contentKey]);

  const fields = useMemo(() => schema?.fields ?? [], [schema]);

  async function save() {
    setSaving(true);
    setStatus("");
    setError("");

    const { error } = await supabase.from("site_content").upsert(
      { key: contentKey, value: form },
      { onConflict: "key" }
    );

    setSaving(false);

    if (error) {
      setError(error.message);
      return;
    }

    setStatus("✅ 저장 완료!");
  }

  if (!schema) return <div className="text-sm">Unknown key: {contentKey}</div>;
  if (loading) return <div className="text-sm text-neutral-600">Loading…</div>;

  return (
    <div className="mt-6 rounded-2xl border bg-white p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="text-sm text-neutral-700">
          key: <b>{contentKey}</b>
        </div>
        <button
          onClick={save}
          disabled={saving}
          className="rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-50"
        >
          {saving ? "저장 중..." : "저장"}
        </button>
      </div>

      <div className="space-y-5">
        {fields.map((f) => {
          const v = form[f.key] ?? "";
          return (
            <div key={f.key} className="space-y-2">
              <label className="text-sm font-medium">{f.label}</label>

              {f.type === "text" ? (
                <input
                  value={v}
                  onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                  placeholder={f.placeholder}
                  className="w-full rounded-xl border px-3 py-2 text-sm"
                />
              ) : f.type === "textarea" ? (
                <textarea
                  value={v}
                  onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                  placeholder={f.placeholder}
                  rows={8}
                  className="w-full rounded-xl border p-3 text-sm outline-none"
                />
              ) : (
                <ImageUploader
                  value={v}
                  onChange={(url: string) => setForm((p) => ({ ...p, [f.key]: url }))}
                  folder={contentKey}
                />
              )}
            </div>
          );
        })}
      </div>

      {status && <p className="mt-3 text-sm text-green-700">{status}</p>}
      {error && <p className="mt-3 text-sm text-red-600">Error: {error}</p>}
    </div>
  );
}
