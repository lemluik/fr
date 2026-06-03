import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, locale } = await req.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const supabaseUrl = "https://nkaeqjmcvunyzmjqaigf.supabase.co";
    const supabaseKey = "sb_publishable_zOCZqNFC4DqH_Y8DwTFt0A_jH_EgK_P";

    const res = await fetch(`${supabaseUrl}/rest/v1/waitlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": supabaseKey,
        "Authorization": `Bearer ${supabaseKey}`,
        "Prefer": "return=minimal",
      },
      body: JSON.stringify({ email: email.toLowerCase().trim(), locale: locale ?? "en" }),
    });

    if (res.ok) {
      return NextResponse.json({ success: true });
    }

    // 409 = дубликат (unique constraint) — уже зарегистрирован
    if (res.status === 409) {
      return NextResponse.json({ duplicate: true }, { status: 409 });
    }

    const err = await res.text();
    console.error("Supabase error:", res.status, err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });

  } catch (e) {
    console.error("Waitlist error:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
