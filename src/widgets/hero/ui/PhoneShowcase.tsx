"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const ROTATE_MS = 5000;
const SCREEN_COUNT = 4;

/* ── Иконки (стиль Phosphor, stroke 1.8) ── */

function Icon({ d, size = 16, className = "" }: { d: string; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

const PATHS = {
  bell: "M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8M10.3 21a1.94 1.94 0 0 0 3.4 0",
  question: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01M12 22a10 10 0 1 1 0-20 10 10 0 0 1 0 20z",
  send: "M12 19V5M5 12l7-7 7 7",
  receive: "M12 5v14M19 12l-7 7-7-7",
  plus: "M12 5v14M5 12h14",
  lock: "M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2zM7 11V7a5 5 0 0 1 10 0v4",
  home: "M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5",
  grid: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z",
  wallet: "M3 6a2 2 0 0 1 2-2h14v4M3 6v12a2 2 0 0 0 2 2h16V8H5a2 2 0 0 1-2-2zM16 14h.01",
  user: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",
  faceId: "M4 7V5a1 1 0 0 1 1-1h2M17 4h2a1 1 0 0 1 1 1v2M20 17v2a1 1 0 0 1-1 1h-2M7 20H5a1 1 0 0 1-1-1v-2M9 9v1M15 9v1M9.5 15a3.5 3.5 0 0 0 5 0",
  chevron: "m9 6 6 6-6 6",
  back: "M15 18l-6-6 6-6",
  check: "M20 6 9 17l-5-5",
};

function LockIcon({ size = 12 }: { size?: number }) {
  return <Icon d={PATHS.lock} size={size} />;
}

/* ── Мелкие детали мокапа ── */

function TxIcon({ label, tone }: { label: string; tone: string }) {
  return (
    <span
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[12px] font-bold"
      style={{ background: `${tone}1A`, color: tone }}
      aria-hidden="true"
    >
      {label}
    </span>
  );
}

function VisaMark() {
  return <span className="text-[13px] font-extrabold italic tracking-wide text-white/90">VISA</span>;
}

function TabBar({ active }: { active: number }) {
  const icons = [PATHS.home, PATHS.grid, null, PATHS.wallet, PATHS.user];
  return (
    <div className="border-t border-[var(--border)] bg-white px-2 pb-1 pt-1.5">
      <div className="flex items-center justify-between">
        {icons.map((d, i) =>
          d === null ? (
            <span
              key={i}
              className="-mt-6 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--primary-end)] text-white shadow-lg shadow-[rgba(74,108,247,0.4)]"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <rect x="2.5" y="5.5" width="19" height="13" rx="2.5" />
                <path d="M2.5 9.5h19" />
              </svg>
            </span>
          ) : (
            <span
              key={i}
              className={`flex h-8 w-8 items-center justify-center ${
                i === active ? "text-[var(--primary)]" : "text-[var(--text-3)]/60"
              }`}
            >
              <Icon d={d} size={17} />
            </span>
          )
        )}
      </div>
    </div>
  );
}

/* ── Экран 1: Home / Баланс ── */

function HomeScreen({ t }: { t: (k: string) => string }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-semibold text-[var(--text)]">{t("homeGreeting")}</p>
        <span className="flex items-center gap-2.5 text-[var(--text-3)]">
          <Icon d={PATHS.bell} size={15} />
          <Icon d={PATHS.question} size={15} />
        </span>
      </div>

      {/* Balance Card — градиент бренда (1 на экран) */}
      <div className="mt-3 rounded-2xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-end)] p-4 text-white shadow-lg shadow-[rgba(74,108,247,0.35)]">
        <p className="text-[10px] font-medium uppercase tracking-wider text-white/70">{t("homeBalanceLabel")}</p>
        <p className="mt-1 font-mono text-[26px] font-bold leading-none tracking-tight">{t("homeBalance")}</p>
        <p className="mt-1.5 text-[11px] font-medium text-white/80">{t("homeDelta")}</p>
        <div className="mt-3 flex gap-1.5">
          <span className="rounded-full bg-white/15 px-2 py-0.5 font-mono text-[10px] text-white/90">{t("homePill1")}</span>
          <span className="rounded-full bg-white/15 px-2 py-0.5 font-mono text-[10px] text-white/90">{t("homePill2")}</span>
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-3 grid grid-cols-4 gap-1">
        {[
          { icon: PATHS.send, label: t("qa1") },
          { icon: PATHS.receive, label: t("qa2") },
          { icon: PATHS.plus, label: t("qa3") },
          { icon: PATHS.wallet, label: t("qa4") },
        ].map((a) => (
          <span key={a.label} className="flex flex-col items-center gap-1">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--bg)] text-[var(--text)]">
              <Icon d={a.icon} size={15} />
            </span>
            <span className="text-[9.5px] font-medium text-[var(--text-3)]">{a.label}</span>
          </span>
        ))}
      </div>

      {/* Налоговое уведомление */}
      <div className="mt-3 flex items-center gap-2 rounded-xl border border-[#FFB800]/30 bg-[#FFB800]/10 px-3 py-2">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFB800]" aria-hidden="true" />
        <p className="flex-1 text-[11px] font-medium text-[var(--text-2)]">{t("homeTax")}</p>
        <Icon d={PATHS.chevron} size={13} className="shrink-0 text-[var(--text-3)]" />
      </div>

      {/* Последние операции */}
      <p className="mt-3 text-[12px] font-semibold text-[var(--text)]">{t("homeTxTitle")}</p>
      <div className="mt-1.5 space-y-1">
        {[
          { label: "G", tone: "#00B14F", title: "Grab Food", sub: t("homeTx1Sub"), amount: "−$12.50", amountClass: "text-[var(--text)]" },
          { label: "e", tone: "#4A6CF7", title: t("homeTx2Title"), sub: t("homeTx2Sub"), amount: "−$7.00", amountClass: "text-[var(--text)]" },
          { label: "Д", tone: "#6C5CE7", title: t("homeTx3Title"), sub: t("homeTx3Sub"), amount: "+$200.00", amountClass: "text-[var(--green)]" },
        ].map((tx) => (
          <div key={tx.title} className="flex items-center gap-2.5 rounded-xl bg-[var(--bg)] px-2.5 py-2">
            <TxIcon label={tx.label} tone={tx.tone} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-[12px] font-semibold text-[var(--text)]">{tx.title}</p>
              <p className="text-[10px] text-[var(--text-3)]">{tx.sub}</p>
            </div>
            <span className={`font-mono text-[12px] font-semibold ${tx.amountClass}`}>{tx.amount}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto">
        <TabBar active={0} />
      </div>
    </div>
  );
}

/* ── Экран 2: Выпуск карты ── */

function CardScreen({ t }: { t: (k: string) => string }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2">
        <Icon d={PATHS.back} size={15} className="text-[var(--text-3)]" />
        <p className="text-[13px] font-semibold text-[var(--text)]">{t("cardTitle")}</p>
      </div>

      {/* Визуал карты — тёмный, по ТЗ */}
      <div className="fcard mt-4 rounded-2xl p-4">
        <div className="flex items-start justify-between">
          <span className="text-[12px] font-bold tracking-widest text-white">FRAMELESS</span>
          <VisaMark />
        </div>
        <span className="mt-4 block h-6 w-8 rounded-[5px] bg-gradient-to-br from-[#e8d9a8] to-[#c9a961]" aria-hidden="true" />
        <p className="mt-3 font-mono text-[15px] tracking-[0.14em] text-white/90">{t("cardNumber")}</p>
        <div className="mt-3 flex items-end justify-between">
          <div>
            <p className="text-[8px] uppercase tracking-wider text-white/40">{t("cardHolderLabel")}</p>
            <p className="text-[11px] font-medium tracking-wide text-white/85">ARTEM PETROV</p>
          </div>
          <div>
            <p className="text-[8px] uppercase tracking-wider text-white/40">{t("cardExpiryLabel")}</p>
            <p className="font-mono text-[11px] text-white/85">09/28</p>
          </div>
        </div>
      </div>

      {/* Праздничный статус — пик лояльности из CJM */}
      <div className="mx-auto mt-4 flex items-center gap-1.5 rounded-full bg-[var(--green)]/10 px-3 py-1.5 text-[11px] font-semibold text-[var(--green)]">
        <Icon d={PATHS.check} size={12} />
        {t("cardDone")}
      </div>

      <div className="mt-auto space-y-2">
        <span className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[var(--primary)] text-[13px] font-semibold text-white shadow-md shadow-[rgba(74,108,247,0.35)]">
          <Icon d={PATHS.wallet} size={15} />
          {t("cardCta")}
        </span>
        <span className="flex h-10 items-center justify-center rounded-xl border border-[var(--border-2)] text-[12px] font-medium text-[var(--text-2)]">
          {t("cardSecondary")}
        </span>
        <p className="pb-1 text-center text-[10px] text-[var(--text-3)]">{t("cardNote")}</p>
      </div>
    </div>
  );
}

/* ── Экран 3: Подтверждение оплаты (bottom sheet) ── */

function PayScreen({ t }: { t: (k: string) => string }) {
  const rows = [
    { label: t("payRow1Label"), value: t("payRow1Value") },
    { label: t("payRow2Label"), value: t("payRow2Value") },
    { label: t("payRow3Label"), value: t("payRow3Value"), strong: true },
  ];

  return (
    <div className="flex h-full flex-col bg-[var(--bg)]">
      {/* Затемнённый фон приложения под sheet */}
      <div className="relative flex-1 overflow-hidden rounded-b-2xl bg-[#0D1117]/90 px-4 pt-3">
        <p className="text-[11px] font-medium text-white/60">{t("payTitle")}</p>
        <div className="mt-2 space-y-1.5" aria-hidden="true">
          <div className="h-2 w-2/3 rounded-full bg-white/15" />
          <div className="h-2 w-1/2 rounded-full bg-white/10" />
          <div className="h-2 w-3/4 rounded-full bg-white/10" />
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-[10px] font-medium text-white/50">
          <LockIcon size={11} />
          Face ID
        </div>
      </div>

      {/* Bottom sheet — основной паттерн подтверждений */}
      <div className="-mt-3 rounded-t-3xl bg-white px-4 pb-3 pt-2 shadow-[0_-8px_24px_rgba(26,31,54,0.12)]">
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-[var(--border-2)]" aria-hidden="true" />
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--bg)] text-[16px]" aria-hidden="true">☕</span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] font-semibold text-[var(--text)]">{t("payMerchant")}</p>
            <p className="text-[10px] text-[var(--text-3)]">{t("payTitle")}</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[16px] font-bold leading-none text-[var(--text)]">{t("payAmount")}</p>
            <p className="mt-1 font-mono text-[10px] text-[var(--text-3)]">{t("payAmountUsd")}</p>
          </div>
        </div>

        {/* Три строки Mono — комиссия видна ДО подтверждения */}
        <div className="mt-3 space-y-1.5 rounded-xl bg-[var(--bg)] p-3">
          {rows.map((r) => (
            <div key={r.label} className="flex items-center justify-between">
              <span className="text-[11px] text-[var(--text-3)]">{r.label}</span>
              <span className={`font-mono ${r.strong ? "text-[13px] font-bold text-[var(--text)]" : "text-[11px] text-[var(--text-2)]"}`}>
                {r.value}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-2.5 flex w-fit items-center gap-1.5 rounded-full bg-[var(--green)]/10 px-2.5 py-1 text-[10.5px] font-semibold text-[var(--green)]">
          <LockIcon size={11} />
          {t("payLock")}
        </div>

        <span className="mt-3 flex h-11 items-center justify-center gap-2 rounded-xl bg-[var(--primary)] text-[13px] font-semibold text-white shadow-md shadow-[rgba(74,108,247,0.35)]">
          <Icon d={PATHS.faceId} size={15} />
          {t("payCta")}
        </span>
      </div>
    </div>
  );
}

/* ── Экран 4: eSIM ── */

function EsimScreen({ t }: { t: (k: string) => string }) {
  const plans = [
    { size: t("esimPlan1Size"), price: t("esimPlan1Price") },
    { size: t("esimPlan2Size"), price: t("esimPlan2Price"), popular: true },
    { size: t("esimPlan3Size"), price: t("esimPlan3Price") },
  ];

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2">
        <Icon d={PATHS.back} size={15} className="text-[var(--text-3)]" />
        <p className="text-[13px] font-semibold text-[var(--text)]">{t("esimTitle")}</p>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <p className="text-[15px] font-bold text-[var(--text)]">{t("esimCountry")}</p>
        <span className="rounded-md border border-[var(--border)] bg-[var(--bg)] px-1.5 py-0.5 text-[10px] font-bold text-[var(--text-3)]">🇹🇭 TH</span>
      </div>

      {/* Тарифы — опорные пакеты $3.50/$7/$12 из CJM */}
      <div className="mt-3 space-y-2">
        {plans.map((p) => (
          <div
            key={p.size}
            className={`rounded-2xl border p-3 ${
              p.popular ? "border-[var(--primary)]/45 bg-[var(--primary)]/5" : "border-[var(--border)] bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-[12.5px] font-semibold text-[var(--text)]">{p.size}</p>
                  {p.popular && (
                    <span className="rounded-full bg-[var(--primary)]/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-[var(--primary)]">
                      {t("esimPopular")}
                    </span>
                  )}
                </div>
                <p className="mt-0.5 font-mono text-[15px] font-bold text-[var(--text)]">{p.price}</p>
              </div>
              <span
                className={`rounded-full px-3.5 py-1.5 text-[11px] font-semibold ${
                  p.popular ? "bg-[var(--primary)] text-white" : "bg-[var(--bg)] text-[var(--text-2)]"
                }`}
              >
                {t("esimBuy")}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Статусы установки — Aha-момент CJM */}
      <div className="mt-auto rounded-xl bg-[var(--bg)] px-3 py-2.5">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-1 text-[10px] font-semibold text-[var(--green)]">
            <Icon d={PATHS.check} size={11} />
            {t("esimStatus1")}
          </span>
          <span className="h-px w-3 bg-[var(--border-2)]" aria-hidden="true" />
          <span className="flex items-center gap-1 text-[10px] font-semibold text-[var(--primary)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--primary)] pulse-dot" aria-hidden="true" />
            {t("esimStatus2")}
          </span>
          <span className="h-px w-3 bg-[var(--border-2)]" aria-hidden="true" />
          <span className="text-[10px] font-medium text-[var(--text-3)]">{t("esimStatus3")}</span>
        </div>
        <p className="mt-1.5 text-center text-[10px] text-[var(--text-3)]">{t("esimNote")}</p>
      </div>
    </div>
  );
}

/* ── Виджет ── */

export function PhoneShowcase() {
  const t = useTranslations("hero.demo");
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Автосмена экранов; пауза при наведении, отключение при reduced motion
  useEffect(() => {
    if (paused || reduced) return;
    const id = setInterval(() => setActive((a) => (a + 1) % SCREEN_COUNT), ROTATE_MS);
    return () => clearInterval(id);
  }, [paused, reduced, active]);

  const tabs = [t("tab1"), t("tab2"), t("tab3"), t("tab4")];
  const badges = [t("badge1"), t("badge2"), t("badge3"), t("badge4")];

  const screens = [
    <HomeScreen key="home" t={t} />,
    <CardScreen key="card" t={t} />,
    <PayScreen key="pay" t={t} />,
    <EsimScreen key="esim" t={t} />,
  ];

  return (
    <div
      className="relative mx-auto w-[300px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Мягкое свечение за телефоном */}
      <div aria-hidden="true" className="absolute -inset-10 -z-10 rounded-full bg-gradient-to-br from-[var(--primary)]/15 to-[var(--primary-end)]/10 blur-3xl" />

      {/* Плавающий бейдж активного экрана */}
      <div
        key={active}
        className="float-badge absolute -right-8 top-16 z-20 hidden items-center rounded-full border border-[var(--border)] bg-white px-3.5 py-2 text-xs font-semibold text-[var(--text)] shadow-lg sm:flex"
      >
        {badges[active]}
      </div>

      <div className="phone-frame" aria-label={t("aria")} role="group">
        {/* Статус-бар */}
        <div className="relative flex items-center justify-between bg-white px-6 pb-1 pt-3 text-[11px] font-semibold text-[var(--text)]">
          <span>{t("statusTime")}</span>
          <div aria-hidden="true" className="absolute left-1/2 top-2 h-[22px] w-[74px] -translate-x-1/2 rounded-full bg-[#1A1F36]" />
          <span aria-hidden="true" className="flex items-center gap-1.5">
            <span className="flex items-end gap-[2px]">
              <span className="block h-1.5 w-[3px] rounded-sm bg-[var(--text)]" />
              <span className="block h-2 w-[3px] rounded-sm bg-[var(--text)]" />
              <span className="block h-2.5 w-[3px] rounded-sm bg-[var(--text)]" />
              <span className="block h-3 w-[3px] rounded-sm bg-[var(--text)]" />
            </span>
            <span className="block h-3 w-6 rounded-[3px] border border-[var(--text)]/40 p-[1.5px]">
              <span className="block h-full w-3/4 rounded-[1px] bg-[var(--text)]" />
            </span>
          </span>
        </div>

        {/* Экраны приложения */}
        <div className="relative h-[560px] overflow-hidden bg-white">
          {screens.map((s, i) => (
            <div
              key={i}
              className={`phone-screen absolute inset-0 px-4 pb-3 pt-3 ${i === active ? "active" : ""}`}
              aria-hidden={i !== active}
            >
              {s}
            </div>
          ))}
        </div>

        {/* Home indicator */}
        <div className="bg-white pb-2.5" aria-hidden="true">
          <div className="mx-auto h-1 w-24 rounded-full bg-[var(--text)]/20" />
        </div>
      </div>

      {/* Точки-переключатели с прогрессом */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {tabs.map((label, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            aria-label={label}
            aria-current={i === active}
            className={`relative h-2 overflow-hidden rounded-full transition-all duration-300 ${
              i === active
                ? "w-10 bg-[var(--primary)]/20"
                : "w-2 bg-[var(--border-2)] hover:bg-[var(--text-3)]/50"
            }`}
          >
            {i === active &&
              (reduced ? (
                <span className="absolute inset-0 rounded-full bg-[var(--primary)]" />
              ) : (
                <span
                  key={`${active}-${paused ? "p" : "r"}`}
                  className="demo-progress absolute inset-y-0 left-0 rounded-full bg-[var(--primary)]"
                  style={{ animationPlayState: paused ? "paused" : "running" }}
                />
              ))}
          </button>
        ))}
      </div>
      <p className="mt-3 text-center text-sm font-semibold text-[var(--text-2)]">{tabs[active]}</p>
    </div>
  );
}
