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

// ─── Telegram: единственный пункт назначения заявок ───────────────────────────
const TG_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN ?? "";
const TG_CHAT_ID   = process.env.TELEGRAM_CHAT_ID ?? "";

/* Человекочитаемые подписи кодов из формы */
const PRIORITY_LABELS: Record<string, string> = {
  pr1: "Карта",
  pr2: "Переводы",
  pr3: "eSIM и travel",
  pr4: "Налоги",
};
const RESIDENCE_LABELS: Record<string, string> = {
  th: "Таиланд",
  ae: "ОАЭ",
  ge: "Грузия",
  tr: "Турция",
  vn: "Вьетнам",
  other: "Другая страна",
};

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function getFlagEmoji(countryCode: string): string {
  return countryCode
    .toUpperCase()
    .split("")
    .map((c) => String.fromCodePoint(0x1F1E6 - 65 + c.charCodeAt(0)))
    .join("");
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

async function sendTelegramNotification(data: {
  email: string;
  country: string | null;
  city: string | null;
  timezone: string | null;
  locale: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  referrer: string | null;
  residence: string | null;
  priority: string | null;
  screen_w: number | null;
  user_agent: string | null;
}): Promise<boolean> {
  const flag = data.country ? getFlagEmoji(data.country) : "🌍";
  const location = [data.city, data.country].filter(Boolean).join(", ") || "неизвестно";
  const source = data.utm_source ?? safeReferrerHost(data.referrer);
  const utm = [data.utm_source, data.utm_medium, data.utm_campaign].filter(Boolean).join(" / ") || null;
  const stamp = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });

  const lines = [
    "🎯 <b>Новая заявка в waitlist Frameless</b>",
    "",
    `📧 <b>${escapeHtml(data.email)}</b>`,
    `${flag} Гео: ${escapeHtml(location)}`,
    `🏠 Резидентство: ${data.residence ? escapeHtml(RESIDENCE_LABELS[data.residence] ?? data.residence) : "—"}`,
    `⭐ Приоритет: ${data.priority ? escapeHtml(PRIORITY_LABELS[data.priority] ?? data.priority) : "—"}`,
    `🌐 Язык: ${escapeHtml(data.locale)} · 🕐 ${escapeHtml(data.timezone ?? "—")}`,
    `📌 Источник: ${escapeHtml(source)}${utm ? ` (${escapeHtml(utm)})` : ""}`,
  ];
  if (data.screen_w !== null) lines.push(`🖥 Экран: ${data.screen_w}px`);
  if (data.user_agent) lines.push(`🤖 UA: ${escapeHtml(data.user_agent)}`);
  lines.push("", `🕑 ${stamp} МСК`);

  try {
    const res = await fetch(`https://api.telegram.org/bot${TG_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TG_CHAT_ID,
        text: lines.join("\n"),
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
    const json = await res.json().catch(() => null);
    if (!res.ok || !json?.ok) {
      console.error("Telegram sendMessage failed:", res.status, JSON.stringify(json));
      return false;
    }
    return true;
  } catch (e) {
    console.error("Telegram error:", (e as Error)?.message);
    return false;
  }
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

    // ── Отправка в Telegram-группу (единственное хранилище заявок) ────────────
    if (!TG_BOT_TOKEN || !TG_CHAT_ID) {
      console.error("Missing Telegram env vars: TELEGRAM_BOT_TOKEN and/or TELEGRAM_CHAT_ID");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    const sent = await sendTelegramNotification({
      email: rawEmail,
      country,
      city,
      timezone,
      locale,
      utm_source,
      utm_medium,
      utm_campaign,
      referrer,
      residence,
      priority,
      screen_w,
      user_agent,
    });

    if (!sent) {
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    // Без базы данных позиции в очереди нет — фронт показывает successNoPosition
    return NextResponse.json({ success: true });

  } catch (e) {
    console.error("Waitlist error:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
