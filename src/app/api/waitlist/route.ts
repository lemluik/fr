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

// ─── Telegram уведомление ─────────────────────────────────────────────────────
const TG_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN ?? "";
const TG_CHAT_ID   = process.env.TELEGRAM_CHAT_ID ?? "";

async function sendTelegramNotification(data: {
  email: string;
  country: string | null;
  city: string | null;
  timezone: string | null;
  locale: string;
  utm_source: string | null;
  referrer: string | null;
  residence: string | null;
  priority: string | null;
}) {
  const flag = data.country ? getFlagEmoji(data.country) : "🌍";
  const location = [data.city, data.country].filter(Boolean).join(", ") || "неизвестно";
  const source = data.utm_source ?? safeReferrerHost(data.referrer);

  const text = [
    `🎯 *Новая регистрация в waitlist*`,
    ``,
    `📧 \`${data.email}\``,
    `${flag} ${location}`,
    `🏠 Живёт: ${data.residence ?? "—"}`,
    `⭐ Приоритет: ${data.priority ?? "—"}`,
    `🕐 ${data.timezone ?? "—"}`,
    `🌐 Язык: ${data.locale}`,
    `📌 Источник: ${source}`,
  ].join("\n");

  await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: TG_CHAT_ID,
      text,
      parse_mode: "Markdown",
    }),
  }).catch((e) => console.error("TG error:", e?.message));
}

function safeReferrerHost(referrer: string | null): string {
  if (!referrer) return "прямой заход";
  try {
    const url = new URL(referrer.startsWith("http") ? referrer : `https://${referrer}`);
    return url.hostname;
  } catch {
    return "некорректный referrer";
  }
}

function safeDecodeCity(raw: string | null): string | null {
  if (!raw) return null;
  try {
    return sanitize(decodeURIComponent(raw), 100);
  } catch {
    return sanitize(raw, 100);
  }
}

function getFlagEmoji(countryCode: string): string {
  return countryCode
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(0x1F1E6 - 65 + c.charCodeAt(0)))
    .join("");
}


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
    const locale       = sanitize(body.locale, 10) ?? "ru";
    const timezone     = sanitize(body.timezone, 60);
    const referrer     = sanitize(body.referrer, 500);
    const utm_source   = sanitize(body.utm_source, 100);
    const utm_medium   = sanitize(body.utm_medium, 100);
    const utm_campaign = sanitize(body.utm_campaign, 100);
    const screen_w     = sanitizeInt(body.screen_w);
    const residence    = sanitize(body.residence, 20); // страна проживания из формы
    const priority     = sanitize(body.priority, 20);  // «Что вам важнее всего?»

    // ── Данные из Vercel headers ───────────────────────────────────────────────
    const country    = sanitize(req.headers.get("x-vercel-ip-country"), 10);
    const city       = safeDecodeCity(req.headers.get("x-vercel-ip-city"));
    const user_agent = sanitize(req.headers.get("user-agent"), 300);

    // ── Запись в Supabase ──────────────────────────────────────────────────────
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error("Missing Supabase env vars: SUPABASE_URL and/or SUPABASE_SERVICE_ROLE_KEY");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const row = {
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
      residence,
      priority,
    };

    const postOpts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": supabaseKey,
        "Authorization": `Bearer ${supabaseKey}`,
        "Prefer": "return=minimal",
      },
    };

    // Новые колонки residence/priority могут отсутствовать в схеме —
    // в этом случае повторяем запись без них.
    let res = await fetch(`${supabaseUrl}/rest/v1/waitlist`, {
      ...postOpts,
      body: JSON.stringify(row),
    });
    if (!res.ok && res.status === 400) {
      const legacyRow = Object.fromEntries(
        Object.entries(row).filter(([k]) => k !== "residence" && k !== "priority")
      );
      res = await fetch(`${supabaseUrl}/rest/v1/waitlist`, {
        ...postOpts,
        body: JSON.stringify(legacyRow),
      });
    }

    if (res.ok) {
      // Позиция в списке = общее число подписчиков (для success-state)
      let position: number | null = null;
      try {
        const countRes = await fetch(
          `${supabaseUrl}/rest/v1/waitlist?select=email&limit=1`,
          {
            headers: {
              "apikey": supabaseKey,
              "Authorization": `Bearer ${supabaseKey}`,
              "Prefer": "count=exact",
              "Range": "0-0",
            },
          }
        );
        const range = countRes.headers.get("content-range");
        const total = range?.split("/")[1];
        if (total && /^\d+$/.test(total)) position = Number(total);
      } catch {
        // позиция не критична
      }

      if (TG_BOT_TOKEN && TG_CHAT_ID) {
        await sendTelegramNotification({ email: rawEmail, country, city, timezone, locale, utm_source, referrer, residence, priority });
      }
      return NextResponse.json({ success: true, position });
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
