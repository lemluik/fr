import { NextRequest, NextResponse } from "next/server";

const SUPABASE_URL = process.env.SUPABASE_URL ?? "https://nkaeqjmcvunyzmjqaigf.supabase.co";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY ?? "sb_publishable_zOCZqNFC4DqH_Y8DwTFt0A_jH_EgK_P";

export async function POST(req: NextRequest) {
  try {
    const { email, locale } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_SERVICE_KEY,
        "Authorization": `Bearer ${SUPABASE_SERVICE_KEY}`,
        "Prefer": "return=minimal",
      },
      body: JSON.stringify({ email: email.toLowerCase().trim(), locale: locale ?? "en" }),
    });

    // 409 = дубликат — не ошибка, уже зарегистрирован
    if (res.ok || res.status === 409) {
      return NextResponse.json({ success: true });
    }

    const err = await res.text();
    console.error("Supabase error:", res.status, err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });

  } catch (e) {
    console.error("Waitlist error:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
