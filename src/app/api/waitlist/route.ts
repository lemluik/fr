import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, locale, referrer, utm_source, utm_medium, utm_campaign, timezone, screen_w } = body;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const supabaseUrl = "https://nkaeqjmcvunyzmjqaigf.supabase.co";
    const supabaseKey = "sb_publishable_zOCZqNFC4DqH_Y8DwTFt0A_jH_EgK_P";

    // Vercel автоматически добавляет geo-заголовки
    const country = req.headers.get("x-vercel-ip-country") ?? null;
    const city = decodeURIComponent(req.headers.get("x-vercel-ip-city") ?? "") || null;
    const user_agent = req.headers.get("user-agent") ?? null;

    const res = await fetch(`${supabaseUrl}/rest/v1/waitlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": supabaseKey,
        "Authorization": `Bearer ${supabaseKey}`,
        "Prefer": "return=minimal",
      },
      body: JSON.stringify({
        email: email.toLowerCase().trim(),
        locale: locale ?? "en",
        country,
        city,
        timezone: timezone ?? null,
        referrer: referrer ?? null,
        utm_source: utm_source ?? null,
        utm_medium: utm_medium ?? null,
        utm_campaign: utm_campaign ?? null,
        user_agent,
        screen_w: screen_w ?? null,
      }),
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
