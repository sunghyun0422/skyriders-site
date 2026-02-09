"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";

type Role = "admin" | "user";

type ProfileRow = {
  id: string;
  role: Role;
  email?: string | null;
  created_at?: string;
};

export default function AdminUsersPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<Role | null>(null);
  const [error, setError] = useState("");
  const [rows, setRows] = useState<ProfileRow[]>([]);

  // ✅ admin 체크 + 목록 로드
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

      const { data: me, error: meErr } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (meErr) {
        setError(meErr.message);
        setLoading(false);
        return;
      }

      const r = (me?.role ?? "user") as Role;
      setRole(r);

      if (r !== "admin") {
        router.replace("/");
        return;
      }

      // ✅ 회원 목록: profiles 기반
      const { data, error: listErr } = await supabase
        .from("profiles")
        .select("id, role, email, created_at")
        .order("created_at", { ascending: false });

      if (listErr) {
        setError(listErr.message);
        setRows([]);
        setLoading(false);
        return;
      }

      setRows((data ?? []) as ProfileRow[]);
      setLoading(false);
    })();
  }, [router]);

  if (loading) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-16">
        <p className="text-sm text-neutral-600">Loading users...</p>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">회원 목록</h1>
      <p className="mt-2 text-sm text-neutral-600">
        현재는 <b>profiles</b> 테이블 기준으로 표시합니다.
      </p>

      {error && <p className="mt-4 text-sm text-red-600">Error: {error}</p>}

      <div className="mt-6 overflow-hidden rounded-2xl border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-neutral-50">
            <tr className="text-left">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t">
                <td className="px-4 py-3 font-mono text-xs">{r.id}</td>
                <td className="px-4 py-3">{r.email ?? "-"}</td>
                <td className="px-4 py-3">{r.role}</td>
                <td className="px-4 py-3">
                  {r.created_at ? new Date(r.created_at).toLocaleString() : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {rows.length === 0 && (
          <p className="p-4 text-sm text-neutral-600">No users.</p>
        )}
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
