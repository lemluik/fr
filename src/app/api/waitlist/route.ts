import { NextRequest, NextResponse } from "next/server";

// ─── Rate Limiting (in-memory, сбрасывается при перезапуске функции) ───────────
const RATE_LIMIT_MAX = 3;       // попыток
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 минут в мс

const ipMap = new Map<string, { count: number; firstAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = ipMap.get(ip);
  if (!entry || now - entry.firstAt > RATE_LIMIT_WINDOW) {
    ipMap.set(ip, { count: 1, firstAt: now });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) return true;
  entry.count++;
  return false;
}

// ─── Одноразовые / спам email домены ──────────────────────────────────────────
const BLOCKED_DOMAINS = new Set([
  "mailinator.com", "tempmail.com", "throwam.com", "guerrillamail.com",
  "sharklasers.com", "guerrillamailblock.com", "grr.la", "guerrillamail.info",
  "spam4.me", "trashmail.com", "yopmail.com", "getairmail.com",
  "fakeinbox.com", "dispostable.com", "maildrop.cc", "spamgourmet.com",
  "10minutemail.com", "temp-mail.org", "throwam.com", "mailnull.com",
  "spamex.com", "binkmail.com", "bob.email", "discard.email",
]);

// ─── Санитизация строки ────────────────────────────────────────────────────────
function sanitize(val: unknown, maxLen = 200): string | null {
  if (typeof val !== "string") return null;
  const cleaned = val.trim().replace(/[\x00-\x1F\x7F<>"'`]/g, "").slice(0, maxLen);
  return cleaned || null;
}

function sanitizeInt(val: unknown): number | null {
  const n = parseInt(String(val), 10);
  return isNaN(n) || n < 0 || n > 10000 ? null : n;
}

// ─── Handler ──────────────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    // Rate limit по IP
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
      ?? req.headers.get("x-real-ip")
      ?? "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    let body: Record<string, unknown>;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // ── Honeypot: если заполнено — бот ────────────────────────────────────────
    if (body.website || body.phone_confirm) {
      // Тихо возвращаем success, чтобы бот не знал что заблокирован
      return NextResponse.json({ success: true });
    }

    // ── Валидация email ────────────────────────────────────────────────────────
    const rawEmail = typeof body.email === "string" ? body.email.toLowerCase().trim() : "";

    if (!rawEmail || rawEmail.length > 254) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(rawEmail)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const emailDomain = rawEmail.split("@")[1];
    if (BLOCKED_DOMAINS.has(emailDomain)) {
      return NextResponse.json({ error: "Disposable emails are not allowed" }, { status: 400 });
    }

    // ── Санитизация остальных полей ────────────────────────────────────────────
    const locale       = sanitize(body.locale, 10) ?? "en";
    const timezone     = sanitize(body.timezone, 60);
    const referrer     = sanitize(body.referrer, 500);
    const utm_source   = sanitize(body.utm_source, 100);
    const utm_medium   = sanitize(body.utm_medium, 100);
    const utm_campaign = sanitize(body.utm_campaign, 100);
    const screen_w     = sanitizeInt(body.screen_w);

    // ── Данные из Vercel headers ───────────────────────────────────────────────
    const country    = sanitize(req.headers.get("x-vercel-ip-country"), 10);
    const city       = sanitize(decodeURIComponent(req.headers.get("x-vercel-ip-city") ?? ""), 100);
    const user_agent = sanitize(req.headers.get("user-agent"), 300);

    // ── Запись в Supabase ──────────────────────────────────────────────────────
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
      body: JSON.stringify({
        email: rawEmail,
        locale,
        country,
        city,
        timezone,
        referrer,
        utm_source,
        utm_medium,
        utm_campaign,
        user_agent,
        screen_w,
      }),
    });

    if (res.ok) {
      return NextResponse.json({ success: true });
    }

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
