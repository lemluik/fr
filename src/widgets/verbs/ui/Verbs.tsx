"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useScrollReveal } from "@/shared/hooks/useScrollReveal";

type Verb = "pay" | "travel" | "send" | "save";

/* Deep-link каждого глагола на следующий релевантный блок */
const CTA_HREF: Record<Verb, string> = {
  pay: "#card",
  travel: "#pricing",
  send: "#cta",
  save: "#security",
};

/* ─── Примитивы мокапов ─────────────────────────────────────────────── */

function TabRow({
  tabs,
  active,
  onChange,
}: {
  tabs: string[];
  active: number;
  onChange: (i: number) => void;
}) {
  return (
    <div className="flex rounded-full bg-[var(--bg)] p-0.5">
      {tabs.map((label, i) => (
        <button
          key={label}
          type="button"
          onClick={() => onChange(i)}
          className={`flex-1 rounded-full py-1 text-[9px] font-semibold transition-colors ${
            i === active
              ? "bg-white text-[var(--text)] shadow-sm"
              : "text-[var(--text-3)] hover:text-[var(--text-2)]"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

/* Иконки сервисов/виджетов (stroke в духе Phosphor), по одной на тайл */
const TILE_ICONS: Record<string, string[]> = {
  grab: ["M15 3.5a8.5 8.5 0 1 0 8.5 8.5", "M15 3.5 12 12l8.5-3"],
  gojek: ["M12 21.5a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19Z", "M12 12h9.5", "M12 15.5a3.5 3.5 0 1 1 3.3-4.6"],
  bolt: ["M13 2 3 14h7l-1 8 10-12h-7l1-8Z"],
  careem: ["M5 14.5 7.5 7h9L19 14.5", "M5 14.5h14v3a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-3Z", "M7 18.5v1.5", "M17 18.5v1.5"],
  phone: ["M7.5 3h9A1.5 1.5 0 0 1 18 4.5v15a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19.5v-15A1.5 1.5 0 0 1 7.5 3Z", "M10.5 18h3"],
  boltHome: ["M3 11.5 12 4l9 7.5", "M5.5 10v9.5h13V10"],
  wifi: ["M5 12.55a11 11 0 0 1 14.08 0", "M8.53 16.11a6 6 0 0 1 6.95 0", "M12 19.5v.01"],
  fine: ["M4 6h16", "M6 6v13.5h12V6", "M9.5 10h5", "M9.5 13.5h5"],
  coffee: ["M4 8.5h13v6a4.5 4.5 0 0 1-4.5 4.5h-4A4.5 4.5 0 0 1 4 14.5v-6Z", "M17 9.5h1.5a2.5 2.5 0 0 1 0 5H17"],
  cart: ["M3 4.5h2l2.4 11.5h11.2L21 8H6", "M9 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z", "M17 20a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"],
  game: ["M6.5 7h11A4.5 4.5 0 0 1 22 11.5v2a4.5 4.5 0 0 1-4.5 4.5c-1.6 0-2.4-1-3.5-1h-4c-1.1 0-1.9 1-3.5 1A4.5 4.5 0 0 1 2 13.5v-2A4.5 4.5 0 0 1 6.5 7Z", "M8 10.5v3", "M6.5 12h3", "M16 10.5v.01", "M18 13v.01"],
  book: ["M4 4.5h13a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H4v-17Z", "M4 16.5h15", "M8 4.5v12"],
  play: ["M8 5.5v13l11-6.5L8 5.5Z"],
  calendar: ["M4.5 5h15A1.5 1.5 0 0 1 21 6.5v13a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19.5v-13A1.5 1.5 0 0 1 4.5 5Z", "M3 10h18", "M8 2.5V7", "M16 2.5V7"],
  plus: ["M12 5v14", "M5 12h14"],
  minus: ["M5 12h14"],
  swap: ["M4 8h14", "M15 4.5 18.5 8 15 11.5", "M20 16H6", "M9 12.5 5.5 16 9 19.5"],
  snow: ["M12 3v18", "M4.2 7.5l15.6 9", "M19.8 7.5l-15.6 9"],
  target: ["M12 21.5a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19Z", "M12 17.5a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z", "M12 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"],
};

function TileIcon({ name, className = "h-[14px] w-[14px]" }: { name: string; className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      {(TILE_ICONS[name] ?? []).map((d) => (
        <path key={d} strokeLinecap="round" strokeLinejoin="round" d={d} />
      ))}
    </svg>
  );
}

/* Семантические иконки буллетов секции (b1–b3 каждого глагола) */
const BULLET_ICONS: Record<Verb, string[][]> = {
  pay: [
    ["M4 5.5h16A1.5 1.5 0 0 1 21.5 7v10a1.5 1.5 0 0 1-1.5 1.5H4A1.5 1.5 0 0 1 2.5 17V7A1.5 1.5 0 0 1 4 5.5Z", "M2.5 10h19"],
    ["M7.5 3h9A1.5 1.5 0 0 1 18 4.5v15a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 19.5v-15A1.5 1.5 0 0 1 7.5 3Z", "M10.5 18h3"],
    ["M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z", "M12 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"],
  ],
  travel: [
    ["M5 12.55a11 11 0 0 1 14.08 0", "M8.53 16.11a6 6 0 0 1 6.95 0", "M12 19.5v.01"],
    ["M3 20v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8", "M5 10V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4", "M3 18h18"],
    ["M3 8.5h18V12H3Z", "M5 12v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8", "M12 8.5V21", "M12 8.5C10 8.5 7.5 8 7.5 6S10 3.5 12 8.5c2-5 4.5-2.5 4.5-.5s-2.5 1-4.5 1Z"],
  ],
  send: [
    ["M13 2 3 14h7l-1 8 10-12h-7l1-8Z"],
    ["M12 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z", "M5 20.5c0-3.6 3.1-6 7-6s7 2.4 7 6"],
    ["M12 21.5a9.5 9.5 0 1 0 0-19 9.5 9.5 0 0 0 0 19Z", "M8.5 12.5 11 15l4.5-5"],
  ],
  save: [
    ["M8 10.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z", "M11.9 12.1 21 3", "M17.5 3 21 6.5"],
    ["M4.5 5h15A1.5 1.5 0 0 1 21 6.5v13a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19.5v-13A1.5 1.5 0 0 1 4.5 5Z", "M3 10h18", "M8 2.5V7", "M16 2.5V7"],
    ["M12 2.5v19", "M16.5 6.5c0-1.7-2-3-4.5-3s-4.5 1.3-4.5 3 1.8 2.6 4.5 3.3 4.5 1.5 4.5 3.2-2 3-4.5 3-4.5-1.3-4.5-3"],
  ],
};

function BulletIcon({ paths }: { paths: string[] }) {
  return (
    <svg
      className="mt-0.5 h-5 w-5 flex-shrink-0 text-[var(--primary)]"
      fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8"
      aria-hidden="true"
    >
      {paths.map((d) => (
        <path key={d} strokeLinecap="round" strokeLinejoin="round" d={d} />
      ))}
    </svg>
  );
}

/* ─── Экран «Плати»: сервисы и gift cards ───────────────────────────── */

function PayScreen() {
  const t = useTranslations("verbs.mock.pay");
  const [tab, setTab] = useState(0);
  const [pay, setPay] = useState(1);

  const services = [
    { key: "grab", badge: t("localBadge") },
    { key: "gojek", badge: t("localBadge") },
    { key: "bolt", badge: t("localBadge") },
    { key: "careem", badge: t("localBadge") },
    { key: "phone" },
    { key: "boltHome" },
    { key: "wifi" },
    { key: "fine" },
  ];

  return (
    <>
      <p className="text-[11px] font-semibold text-[var(--text)]">{t("title")}</p>
      <TabRow tabs={[t("tabServices"), t("tabGifts")]} active={tab} onChange={setTab} />

      {tab === 0 && (
        <>
          <div className="flex items-center gap-1.5 rounded-xl border border-[var(--border)] px-2.5 py-1.5 text-[9px] text-[var(--text-3)]">
            <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.3-4.3" />
            </svg>
            {t("search")}
          </div>
          <p className="text-[8px] font-semibold uppercase tracking-wider text-[var(--text-3)]">{t("localTitle")}</p>
          <div className="grid grid-cols-4 gap-1.5">
            {services.map((s) => (
              <div key={s.key} className="rounded-xl border border-[var(--border)] p-1.5 pb-1 transition-colors hover:border-[var(--primary)]/50">
                <div className="mx-auto flex h-6 w-6 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
                  <TileIcon name={s.key} />
                </div>
                <p className="mt-0.5 truncate text-center text-[7px] font-medium text-[var(--text)]">{t(`svc.${s.key}`)}</p>
                {s.badge ? (
                  <p className="truncate text-center text-[6px] font-semibold text-[var(--green)]">{s.badge}</p>
                ) : (
                  <p className="text-center text-[6px] text-transparent">·</p>
                )}
              </div>
            ))}
          </div>
          <p className="text-[8px] font-semibold uppercase tracking-wider text-[var(--text-3)]">{t("recentTitle")}</p>
          <div className="space-y-1.5">
            {[
              { name: "rec1Name", value: "rec1Value" },
              { name: "rec2Name", value: "rec2Value" },
              { name: "rec3Name", value: "rec3Value" },
            ].map((r) => (
              <div key={r.name} className="flex items-center justify-between rounded-xl border border-[var(--border)] px-2.5 py-1.5 transition-colors hover:border-[var(--primary)]/50">
                <p className="min-w-0 flex-1 truncate text-[8px] font-medium text-[var(--text)]">{t(r.name)}</p>
                <p className="font-mono text-[8px] font-bold text-[var(--text-2)]">{t(r.value)}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5 rounded-xl bg-[var(--primary)]/5 px-2.5 py-1.5">
            <svg className="h-2.5 w-2.5 flex-shrink-0 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-[8px] font-medium text-[var(--text-2)]">{t("noteCheck")}</p>
          </div>
          <div className="flex gap-1">
            {["mCard", "mApple", "mQr"].map((m, i) => (
              <button
                key={m}
                type="button"
                onClick={() => setPay(i)}
                className={`flex-1 rounded-full py-1 text-center text-[7px] font-semibold transition-colors ${
                  pay === i ? "bg-[var(--primary)] text-white" : "bg-[var(--bg)] text-[var(--text-3)] hover:text-[var(--text-2)]"
                }`}
              >
                {t(m)}
              </button>
            ))}
          </div>
        </>
      )}

      {tab === 1 && (
        <>
          <div className="flex gap-1">
            {[t("catAll"), t("catFood"), t("catMarket"), t("catGames"), t("catBooks")].map((c, i) => (
              <span
                key={c}
                className={`whitespace-nowrap rounded-full px-1.5 py-0.5 text-[7px] font-semibold ${
                  i === 0 ? "bg-[var(--primary)]/10 text-[var(--primary)]" : "bg-[var(--bg)] text-[var(--text-3)]"
                }`}
              >
                {c}
              </span>
            ))}
          </div>
          <div className="space-y-1.5">
            {[
              { icon: "coffee", brand: "gcCoffee", value: "gcCoffeeValue" },
              { icon: "cart", brand: "gcMarket", value: "gcMarketValue" },
              { icon: "game", brand: "gcGame", value: "gcGameValue" },
              { icon: "book", brand: "gcBooks", value: "gcBooksValue" },
              { icon: "play", brand: "gcStream", value: "gcStreamValue" },
            ].map((g) => (
              <div key={g.icon} className="flex items-center gap-2 rounded-xl border border-[var(--border)] p-2 transition-colors hover:border-[var(--primary)]/50">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
                  <TileIcon name={g.icon} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[9px] font-semibold text-[var(--text)]">{t(g.brand)}</p>
                  <p className="font-mono text-[8px] text-[var(--text-3)]">{t(g.value)}</p>
                </div>
                <span className="rounded-full bg-[var(--primary)] px-2 py-0.5 text-[7px] font-semibold text-white">{t("gcBuy")}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5 rounded-xl bg-[var(--primary)]/5 px-2.5 py-1.5">
            <svg className="h-2.5 w-2.5 flex-shrink-0 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-[8px] font-medium text-[var(--text-2)]">{t("gcNote")}</p>
          </div>
        </>
      )}
    </>
  );
}

/* ─── Экран «Путешествуй»: отели / поездки / eSIM ───────────────────── */

function TravelScreen() {
  const t = useTranslations("verbs.mock.travel");
  const [tab, setTab] = useState(0);

  return (
    <>
      <p className="text-[11px] font-semibold text-[var(--text)]">{t("title")}</p>
      <TabRow tabs={[t("tabHotels"), t("tabTrips"), t("tabEsim")]} active={tab} onChange={setTab} />

      {tab === 0 && (
        <>
          <div className="flex items-center justify-between rounded-xl border border-[var(--border)] px-2.5 py-1.5">
            <div className="min-w-0">
              <p className="truncate text-[9px] font-semibold text-[var(--text)]">{t("searchWhere")}</p>
              <p className="text-[7px] text-[var(--text-3)]">{t("searchDates")}</p>
            </div>
            <svg className="h-2.5 w-2.5 flex-shrink-0 text-[var(--text-3)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM21 21l-4.3-4.3" />
            </svg>
          </div>
          <div className="flex gap-1">
            {[t("fAll"), t("fPrice"), t("fRating")].map((c, i) => (
              <span
                key={c}
                className={`rounded-full px-2 py-0.5 text-[7px] font-semibold ${
                  i === 0 ? "bg-[var(--primary)]/10 text-[var(--primary)]" : "bg-[var(--bg)] text-[var(--text-3)]"
                }`}
              >
                {c}
              </span>
            ))}
          </div>
          <div className="space-y-1.5">
            {["h1", "h2", "h3", "h4"].map((h) => (
              <div key={h} className="flex gap-2 rounded-xl border border-[var(--border)] p-2 transition-colors hover:border-[var(--primary)]/50">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--primary)]/80 to-[var(--primary-end)] text-white">
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 20v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8M5 10V6a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4M3 18h18" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[9px] font-semibold text-[var(--text)]">{t(`${h}Name`)}</p>
                  <p className="text-[7px] text-[var(--text-3)]">{t(`${h}Meta`)}</p>
                  <p className="text-[7px] font-semibold text-[var(--green)]">{t(`${h}Rating`)}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-[9px] font-bold text-[var(--text)]">{t(`${h}Price`)}</p>
                  <p className="text-[6px] text-[var(--text-3)]">{t("perNight")}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-[7px] text-[var(--text-3)]">{t("foundNote")}</p>
          <div className="rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-end)] py-1.5 text-center text-[9px] font-semibold text-white">
            {t("bookCta")}
          </div>
        </>
      )}

      {tab === 1 && (
        <>
          {[
            { route: "flightRoute", sub: "flightSub", price: "flightPrice" },
            { route: "tourTitle", sub: "tourSub", price: "tourPrice" },
            { route: "bikeTitle", sub: "bikeSub", price: "bikePrice" },
            { route: "insTitle", sub: "insSub", price: "insPrice" },
            { route: "giftTitle", sub: "giftSub", price: "giftPrice" },
          ].map((f) => (
            <div key={f.route} className="flex items-center gap-2 rounded-xl border border-[var(--border)] p-2 transition-colors hover:border-[var(--primary)]/50">
              <div className="min-w-0 flex-1">
                <p className="font-mono text-[9px] font-semibold text-[var(--text)]">{t(f.route)}</p>
                <p className="text-[7px] text-[var(--text-3)]">{t(f.sub)}</p>
              </div>
              <p className="font-mono text-[9px] font-bold text-[var(--text)]">{t(f.price)}</p>
            </div>
          ))}
          <div className="rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-end)] p-2.5 text-white">
            <p className="text-[8px] opacity-80">{t("bannerTitle")}</p>
            <p className="mt-0.5 text-[9px] font-bold leading-snug">{t("bannerSub")}</p>
          </div>
        </>
      )}

      {tab === 2 && (
        <>
          <div className="flex gap-1">
            {["esimTh", "esimAe", "esimGeo", "esimGlobal"].map((c, i) => (
              <span
                key={c}
                className={`rounded-full px-2 py-0.5 text-[8px] font-semibold ${
                  i === 0 ? "bg-[var(--primary)] text-white" : "bg-[var(--bg)] text-[var(--text-3)]"
                }`}
              >
                {t(c)}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between rounded-xl bg-[var(--bg)] px-2.5 py-1.5">
            <p className="text-[8px] font-medium text-[var(--text-2)]">{t("esimPeriodLabel")}</p>
            <p className="font-mono text-[8px] font-bold text-[var(--text)]">{t("esimPeriodValue")}</p>
          </div>
          <div className="space-y-1.5">
            {[
              { size: "plan1Size", price: "plan1Price" },
              { size: "plan2Size", price: "plan2Price", popular: true },
              { size: "plan3Size", price: "plan3Price" },
            ].map((p) => (
              <div key={p.size} className="flex items-center gap-2 rounded-xl border border-[var(--border)] p-2 transition-colors hover:border-[var(--primary)]/50">
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[9px] font-semibold text-[var(--text)]">{t(p.size)}</p>
                  <p className="text-[7px] text-[var(--text-3)]">{t("planFast")}</p>
                </div>
                {p.popular && (
                  <span className="rounded-full bg-[var(--primary)]/10 px-1.5 py-0.5 text-[6px] font-semibold text-[var(--primary)]">{t("popular")}</span>
                )}
                <p className="font-mono text-[9px] font-bold text-[var(--text)]">{t(p.price)}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="h-2.5 w-2.5 flex-shrink-0 text-[var(--green)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <p className="text-[7px] text-[var(--text-3)]">{t("esimNote")}</p>
          </div>
          <div className="rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-end)] py-1.5 text-center text-[9px] font-semibold text-white">
            {t("buyCta")}
          </div>
        </>
      )}
    </>
  );
}

/* ─── Экран «Отправляй»: пошаговый перевод ──────────────────────────── */

function SendScreen() {
  const t = useTranslations("verbs.mock.send");
  const [step, setStep] = useState(0);

  return (
    <>
      <p className="text-[11px] font-semibold text-[var(--text)]">{t("title")}</p>
      {/* Шаги: активный подсвечен, пройденные — с галочкой */}
      <div className="flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            type="button"
            onClick={() => setStep(i)}
            className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-[7px] font-bold transition-colors ${
              step === i
                ? "bg-[var(--primary)] text-white"
                : step > i
                  ? "bg-[var(--primary)]/20 text-[var(--primary)]"
                  : "bg-[var(--bg)] text-[var(--text-3)]"
            }`}
          >
            {step > i ? (
              <svg className="h-2 w-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              i + 1
            )}
          </button>
        ))}
        <p className="ml-1 flex-1 text-[8px] text-[var(--text-3)]">{t(`step${step + 1}`)}</p>
      </div>

      {step === 0 && (
        <>
          <div className="flex items-center justify-between rounded-xl bg-[var(--bg)] px-2.5 py-1.5">
            <p className="text-[8px] font-medium text-[var(--text-2)]">{t("fromLabel")}</p>
            <span className="rounded-full bg-[var(--primary)]/10 px-1.5 py-0.5 font-mono text-[7px] font-bold text-[var(--primary)]">
              {t("fromValue")}
            </span>
          </div>
          <div className="rounded-xl border border-[var(--border)] p-3 text-center">
            <p className="text-[8px] text-[var(--text-3)]">{t("amountLabel")}</p>
            <p className="mt-0.5 font-mono text-2xl font-bold text-[var(--text)]">$250.00</p>
            <p className="mt-0.5 text-[8px] font-medium text-[var(--green)]">{t("feeNote")}</p>
          </div>
          <div className="flex gap-1">
            {[t("chip1"), t("chip2"), t("chip3")].map((c) => (
              <span key={c} className="flex-1 rounded-full bg-[var(--bg)] py-1 text-center font-mono text-[8px] font-semibold text-[var(--text-2)]">
                {c}
              </span>
            ))}
          </div>
          <div className="rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-end)] py-2 text-center text-[10px] font-semibold text-white">
            {t("next")}
          </div>
        </>
      )}

      {step === 1 && (
        <>
          <p className="text-[8px] font-semibold uppercase tracking-wider text-[var(--text-3)]">{t("recentTitle")}</p>
          <div className="flex items-center rounded-xl border border-[var(--border)] px-2.5 py-1.5 text-[8px] text-[var(--text-3)]">{t("findRecipient")}</div>
          <div className="space-y-1.5">
            {[
              { initials: "r1Initials", name: "r1Name", sub: "r1Sub", active: true },
              { initials: "r2Initials", name: "r2Name", sub: "r2Sub" },
              { initials: "r3Initials", name: "r3Name", sub: "r3Sub" },
            ].map((r) => (
              <div
                key={r.initials}
                className={`flex items-center gap-2 rounded-xl border p-2 transition-colors ${
                  r.active ? "border-[var(--primary)] bg-[var(--primary)]/5" : "border-[var(--border)]"
                }`}
              >
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[var(--primary)]/10 text-[8px] font-bold text-[var(--primary)]">
                  {t(r.initials)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[9px] font-semibold text-[var(--text)]">{t(r.name)}</p>
                  <p className="text-[7px] text-[var(--text-3)]">{t(r.sub)}</p>
                </div>
                {r.active && (
                  <svg className="h-3 w-3 flex-shrink-0 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            ))}
          </div>
          <div className="rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-end)] py-2 text-center text-[10px] font-semibold text-white">
            {t("next")}
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div className="space-y-1.5 rounded-xl border border-[var(--border)] p-2.5">
            {[
              { label: "cTo", value: "cToValue" },
              { label: "cAmount", value: "cAmountValue" },
              { label: "cFee", value: "cFeeValue" },
              { label: "cTime", value: "cTimeValue" },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-2">
                <p className="text-[8px] text-[var(--text-3)]">{t(row.label)}</p>
                <p className="truncate font-mono text-[8px] font-semibold text-[var(--text)]">{t(row.value)}</p>
              </div>
            ))}
          </div>
          <div className="rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-end)] py-2 text-center text-[10px] font-semibold text-white">
            {t("confirm")}
          </div>
          <div className="flex items-center gap-1.5 rounded-xl bg-[var(--green)]/10 px-2.5 py-1.5">
            <svg className="h-3 w-3 flex-shrink-0 text-[var(--green)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <p className="min-w-0 flex-1 text-[8px] font-medium text-[var(--green)]">{t("successNote")}</p>
          </div>
          <p className="text-center text-[7px] text-[var(--text-3)]">{t("confirmNote")}</p>
          <div className="rounded-xl border border-dashed border-[var(--primary)]/40 bg-[var(--primary)]/5 p-2 text-center">
            <p className="font-mono text-[9px] font-bold text-[var(--text)]">{t("receiptTitle")}</p>
            <p className="mt-0.5 text-[7px] text-[var(--text-3)]">{t("receiptSub")}</p>
          </div>
        </>
      )}
    </>
  );
}

/* ─── Экран «Сохраняй»: дашборд сбережений ──────────────────────────── */

function SaveScreen() {
  const t = useTranslations("verbs.mock.save");

  return (
    <>
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold text-[var(--text)]">{t("title")}</p>
        <span className="rounded-full bg-[var(--primary)]/10 px-2 py-0.5 text-[7px] font-bold text-[var(--primary)]">USDT</span>
      </div>

      <p className="text-[8px] text-[var(--text-3)]">{t("balanceLabel")}</p>
      <p className="font-mono text-[26px] font-bold leading-tight text-[var(--text)]">$8,200.00</p>
      {/* Спарклайн баланса за месяц */}
      <div className="h-5 w-full">
        <svg className="h-full w-full" viewBox="0 0 100 24" preserveAspectRatio="none" aria-hidden="true">
          <path d="M0 18 L12 16 L24 17 L36 12 L48 14 L60 9 L72 11 L84 6 L100 3" fill="none" stroke="var(--primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M0 18 L12 16 L24 17 L36 12 L48 14 L60 9 L72 11 L84 6 L100 3 L100 24 L0 24 Z" fill="var(--primary)" opacity="0.08" />
        </svg>
      </div>
      <div className="flex items-center gap-1">
        <svg className="h-2.5 w-2.5 text-[var(--green)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
        <p className="text-[8px] font-medium text-[var(--green)]">{t("controlNote")}</p>
      </div>

      {/* Быстрые действия */}
      <div className="grid grid-cols-3 gap-1.5">
        {[
          { icon: "plus", label: "actTopUp" },
          { icon: "minus", label: "actWithdraw" },
          { icon: "swap", label: "actSwap" },
        ].map((a) => (
          <div key={a.icon} className="rounded-xl bg-[var(--bg)] py-1.5 text-center transition-colors hover:bg-[var(--primary)]/10">
            <div className="mx-auto flex h-5 w-5 items-center justify-center text-[var(--primary)]">
              <TileIcon name={a.icon} />
            </div>
            <p className="mt-0.5 text-[7px] font-medium text-[var(--text-2)]">{t(a.label)}</p>
          </div>
        ))}
      </div>

      {/* Замороженные средства */}
      <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] p-2.5 transition-colors hover:border-[var(--primary)]/50">
        <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg bg-[var(--primary)]/10 text-[var(--primary)]">
          <TileIcon name="snow" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[9px] font-semibold text-[var(--text)]">{t("freezeTitle")}</p>
          <p className="text-[7px] text-[var(--text-3)]">{t("freezeSub")}</p>
        </div>
        <p className="font-mono text-[9px] font-bold text-[var(--text)]">{t("freezeValue")}</p>
      </div>

      {/* Ставка */}
      <div className="flex items-center justify-between rounded-xl bg-[var(--primary)]/5 px-2.5 py-2">
        <p className="text-[9px] font-semibold text-[var(--text)]">{t("yieldTitle")}</p>
        <p className="font-mono text-[10px] font-bold text-[var(--primary)]">{t("yieldValue")}</p>
      </div>

      {/* Цели накоплений */}
      <div className="rounded-xl border border-[var(--border)] p-2.5 transition-colors hover:border-[var(--primary)]/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <TileIcon name="target" className="h-2.5 w-2.5 text-[var(--primary)]" />
            <p className="text-[9px] font-semibold text-[var(--text)]">{t("goalTitle")}</p>
          </div>
          <p className="font-mono text-[8px] font-semibold text-[var(--text-2)]">{t("goalValue")}</p>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[var(--border)]">
          <div className="h-full w-[69%] rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-end)]" />
        </div>
        <p className="mt-1 text-right font-mono text-[7px] text-[var(--text-3)]">{t("goalPct")}</p>
      </div>

      {/* Налоговый трекер — киллер-фича бренда */}
      <div className="rounded-xl bg-[var(--bg)] p-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <TileIcon name="calendar" className="h-2.5 w-2.5 text-[var(--primary)]" />
            <p className="text-[9px] font-semibold text-[var(--text)]">{t("trackerTitle")}</p>
          </div>
          <p className="font-mono text-[8px] font-semibold text-[var(--text-2)]">{t("trackerValue")}</p>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[var(--border)]">
          <div className="h-full w-[85%] rounded-full bg-[var(--primary)]" />
        </div>
      </div>

      {/* История начислений */}
      <p className="text-[8px] font-semibold uppercase tracking-wider text-[var(--text-3)]">{t("histTitle")}</p>
      <div className="space-y-1.5">
        {[
          { label: "hist1Label", date: "hist1Date", value: "hist1Value" },
        ].map((h) => (
          <div key={h.label} className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="truncate text-[8px] font-medium text-[var(--text)]">{t(h.label)}</p>
              <p className="text-[7px] text-[var(--text-3)]">{t(h.date)}</p>
            </div>
            <p className="font-mono text-[8px] font-bold text-[var(--green)]">{t(h.value)}</p>
          </div>
        ))}
      </div>
    </>
  );
}

/* ─── Мокап iPhone: рамка + статус-бар + активный экран ─────────────── */

function PhoneMockup({ verb }: { verb: Verb }) {
  return (
    <div className="phone-frame mx-auto aspect-[9/19] w-[260px] sm:w-[270px]" aria-hidden="true">
      <div className="flex h-full flex-col bg-white p-4">
        {/* Статус-бар */}
        <div className="flex items-center justify-between px-1 text-[10px] text-[var(--text-3)]">
          <span className="font-semibold text-[var(--text)]">9:41</span>
          <span>●●●</span>
        </div>
        <div className="mt-4 space-y-2.5">
          {verb === "pay" && <PayScreen />}
          {verb === "travel" && <TravelScreen />}
          {verb === "send" && <SendScreen />}
          {verb === "save" && <SaveScreen />}
        </div>
      </div>
    </div>
  );
}

/* ─── Секция глагола ────────────────────────────────────────────────── */

type VerbSectionProps = {
  verb: Verb;
  flip: boolean;
};

function VerbSection({ verb, flip }: VerbSectionProps) {
  const t = useTranslations("verbs");
  const ref = useScrollReveal();

  return (
    <div id={verb} ref={ref} className="fade-up grid scroll-mt-24 items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className={flip ? "lg:order-2" : ""}>
        <h3 className="text-[22px] font-semibold text-[var(--text)] sm:text-[28px]">{t(`${verb}.title`)}</h3>
        <p className="mt-3 max-w-md text-base leading-relaxed text-[var(--text-3)]">{t(`${verb}.lead`)}</p>
        {/* Цифра-доказательство глагола */}
        <div className="mt-5 inline-flex items-baseline gap-2 rounded-xl bg-[var(--primary)]/10 px-3.5 py-2">
          <span className="font-mono text-lg font-bold text-[var(--primary)]">{t(`${verb}.statValue`)}</span>
          <span className="text-xs text-[var(--text-3)]">{t(`${verb}.statLabel`)}</span>
        </div>
        <ul className="mt-6 space-y-3">
          {(["b1", "b2", "b3"] as const).map((b, i) => (
            <li key={b} className="flex items-start gap-3 text-sm text-[var(--text-2)]">
              <BulletIcon paths={BULLET_ICONS[verb][i]} />
              {t(`${verb}.${b}`)}
            </li>
          ))}
        </ul>
        <a href={CTA_HREF[verb]} className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[var(--primary)] transition-colors hover:text-[var(--primary-end)]">
          {t(`${verb}.cta`)}
          <span aria-hidden="true">→</span>
        </a>
      </div>
      <div className={flip ? "lg:order-1" : ""}>
        <PhoneMockup verb={verb} />
      </div>
    </div>
  );
}

export function Verbs() {
  const t = useTranslations("verbs");

  return (
    <section id="product" className="py-16 sm:py-24">
      <div className="mx-auto max-w-[1200px] space-y-20 px-6 sm:space-y-28">
        <div className="max-w-2xl">
          <span className="section-label">{t("label")}</span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--text)] sm:text-4xl">{t("heading")}</h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--text-3)] sm:text-lg">{t("sub")}</p>
        </div>
        <VerbSection verb="pay" flip={false} />
        <VerbSection verb="travel" flip={true} />
        <VerbSection verb="send" flip={false} />
        <VerbSection verb="save" flip={true} />
      </div>
    </section>
  );
}
