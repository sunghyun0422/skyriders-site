export const runtime = "nodejs";

import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

function mustEnv(name: string, value: string | undefined): string {
  if (!value) throw new Error(`Missing env: ${name}`);
  return value;
}

function toErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  try {
    return JSON.stringify(err);
  } catch {
    return String(err);
  }
}

export async function POST(req: Request) {
  try {
    const SUPABASE_URL = mustEnv("SUPABASE_URL", process.env.SUPABASE_URL);
    const SUPABASE_SERVICE_ROLE_KEY = mustEnv(
      "SUPABASE_SERVICE_ROLE_KEY",
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const RESEND_API_KEY = mustEnv("RESEND_API_KEY", process.env.RESEND_API_KEY);
    const ADMIN_EMAIL = mustEnv("ADMIN_EMAIL", process.env.ADMIN_EMAIL);
    const FROM_EMAIL = mustEnv("FROM_EMAIL", process.env.FROM_EMAIL);

    const body = (await req.json().catch(() => null)) as
      | { name?: string; email?: string; message?: string }
      | null;

    const name = body?.name?.trim();
    const email = body?.email?.trim();
    const message = body?.message?.trim();

    if (!name || !email || !message) {
      return Response.json(
        { ok: false, error: "Missing fields (name/email/message)" },
        { status: 400 }
      );
    }

    // 1) DB 저장
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { data, error: dbError } = await supabase
      .from("applications")
      .insert([{ name, email, message }])
      .select("id, created_at")
      .single();

    if (dbError) {
      console.error("[apply][db] insert failed:", dbError);
      return Response.json(
        { ok: false, error: "DB insert failed" },
        { status: 500 }
      );
    }

    // 2) 메일 발송
    const resend = new Resend(RESEND_API_KEY);

    const subject = `[SKYRIDERS] New Apply/Contact from ${name}`;
    const text = [
      `✅ New submission received`,
      ``,
      `Name: ${name}`,
      `Email: ${email}`,
      ``,
      `Message:`,
      message,
      ``,
      `Saved to Supabase`,
      `ID: ${data.id}`,
      `Created: ${data.created_at}`,
    ].join("\n");

    const { error: mailError } = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      replyTo: email, // ✅ 여기!
      subject,
      text,
    });

    if (mailError) {
      console.error("[apply][mail] send failed:", mailError);
      return Response.json(
        { ok: false, error: "Saved, but failed to send email" },
        { status: 502 }
      );
    }

    return Response.json({ ok: true });
  } catch (err: unknown) {
    console.error("[apply] ERROR:", err);
    return Response.json(
      { ok: false, error: toErrorMessage(err) || "Server error" },
      { status: 500 }
    );
  }
}
