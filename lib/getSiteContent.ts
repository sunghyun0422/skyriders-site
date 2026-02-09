// lib/siteContent.ts
import { supabase } from "./supabaseClient";

export async function getSiteContent<T = any>(key: string, fallback: T) {
  const { data, error } = await supabase
    .from("site_content")
    .select("value")
    .eq("key", key)
    .single();

  if (error || !data?.value) return fallback;
  return data.value as T;
}
