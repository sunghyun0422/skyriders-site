"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();

  async function signUp() {
    setMsg("");
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) return setMsg(error.message);
    setMsg("가입 완료! 이제 로그인 해줘.");
  }

  async function signIn() {
    setMsg("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return setMsg(error.message);
    router.push("/admin");
  }

  return (
    <main style={{ maxWidth: 420, margin: "80px auto", padding: 16 }}>
      <h1 style={{ fontSize: 26, fontWeight: 800 }}>Login</h1>

      <div style={{ display: "grid", gap: 10, marginTop: 16 }}>
        <input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: 12, border: "1px solid #ddd", borderRadius: 10 }}
        />
        <input
          placeholder="password (6자 이상)"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: 12, border: "1px solid #ddd", borderRadius: 10 }}
        />

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={signIn} style={{ flex: 1, padding: 12 }}>
            로그인
          </button>
          <button onClick={signUp} style={{ flex: 1, padding: 12 }}>
            회원가입
          </button>
        </div>

        {msg && <p>{msg}</p>}
      </div>
    </main>
  );
}
