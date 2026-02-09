"use client";

import { useState } from "react";
import { supabase } from "../../../lib/supabaseClient";

export default function ImageUploader({
  value,
  onChange,
  bucket = "site-assets",
  folder = "content",
}: {
  value?: string;
  onChange: (url: string) => void;
  bucket?: string;
  folder?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setErr(null);
    setUploading(true);

    try {
      const ext = file.name.split(".").pop() || "jpg";
      const name = `${crypto.randomUUID()}.${ext}`;
      const path = `${folder}/${name}`;

      const { error } = await supabase.storage.from(bucket).upload(path, file, {
        upsert: true,
        contentType: file.type,
      });
      if (error) throw error;

      const { data } = supabase.storage.from(bucket).getPublicUrl(path);
      onChange(data.publicUrl);
    } catch (e: any) {
      setErr(e?.message ?? "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <input type="file" accept="image/*" onChange={onPick} disabled={uploading} />
      {uploading && <div className="text-sm text-neutral-600">Uploading…</div>}
      {err && <div className="text-sm text-red-600">{err}</div>}

      {value && (
        <div className="space-y-2">
          <div className="text-xs text-neutral-600 break-all">{value}</div>
          <img
            src={value}
            alt="preview"
            className="h-40 w-auto rounded-xl border bg-white object-contain"
          />
        </div>
      )}
    </div>
  );
}
