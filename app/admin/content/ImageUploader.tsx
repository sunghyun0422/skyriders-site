"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

type Props = {
  bucket?: string;
  folder?: string;
  value?: string;               // 현재 이미지 경로/URL
  onChange: (pathOrUrl: string) => void;
};

export default function ImageUploader({
  bucket = "site-assets",
  folder = "hero",
  value,
  onChange,
}: Props) {
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setErr(null);
    setUploading(true);

    try {
      const ext = file.name.split(".").pop() || "jpg";
      const fileName = `${crypto.randomUUID()}.${ext}`;
      const path = `${folder}/${fileName}`;

      const { error } = await supabase.storage
        .from(bucket)
        .upload(path, file, { upsert: true });

      if (error) throw error;

      // Public bucket이면 getPublicUrl로 URL 생성
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
      <div className="flex items-center gap-3">
        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          disabled={uploading}
        />
        {uploading && <span className="text-sm text-gray-600">Uploading...</span>}
      </div>

      {err && <div className="text-sm text-red-600">{err}</div>}

      {value && (
        <div className="space-y-2">
          <div className="text-xs text-gray-600 break-all">{value}</div>
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
