"use client";

import { useTranslations } from "next-intl";
import { useScrollReveal } from "@/shared/hooks/useScrollReveal";

type Screen = "card" | "travel" | "send" | "save";

/* Мокап iPhone со стилизованным экраном приложения.
   До пересборки дизайн-макетов экранов используем CSS-реконструкцию. */
function PhoneMockup({ screen }: { screen: Screen }) {
  return (
    <div className="phone-frame mx-auto aspect-[9/19] w-[260px] sm:w-[280px]">
      <div className="flex h-full flex-col bg-white p-4">
        {/* Статус-бар */}
        <div className="flex items-center justify-between px-1 text-[10px] text-[var(--text-3)]">
          <span className="font-semibold text-[var(--text)]">9:41</span>
          <span>●●●</span>
        </div>

        {screen === "card" && (
          <div className="mt-4 space-y-3">
            <p className="text-[11px] text-[var(--text-3)]">Баланс</p>
            <p className="font-mono text-2xl font-bold text-[var(--text)]">$12,450</p>
            <div className="fcard rounded-2xl p-4 text-white">
              <div className="flex items-center justify-between text-[9px] tracking-wider opacity-80">
                <span>frameless</span>
                <span>VISA</span>
              </div>
              <p className="mt-5 font-mono text-xs tracking-widest opacity-70">•••• 4829</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {["Pay", "Send", "Top up"].map((a) => (
                <div key={a} className="rounded-xl bg-[var(--bg)] py-2 text-center text-[10px] font-medium text-[var(--text-2)]">
                  {a}
                </div>
              ))}
            </div>
          </div>
        )}

        {screen === "travel" && (
          <div className="mt-4 space-y-3">
            <p className="text-[11px] font-semibold text-[var(--text)]">Путешествия</p>
            <div className="rounded-xl bg-gradient-to-br from-[var(--primary)] to-[var(--primary-end)] p-3 text-white">
              <p className="text-[9px] opacity-80">eSIM · Таиланд</p>
              <p className="font-mono text-sm font-bold">10 GB · 30 дней</p>
              <p className="mt-1 text-[9px] opacity-80">активация за 30 сек</p>
            </div>
            <div className="rounded-xl border border-[var(--border)] p-3">
              <p className="text-[10px] font-semibold text-[var(--text)]">Отель · Пхукет</p>
              <p className="text-[9px] text-[var(--text-3)]">4 ночи · оплата с баланса</p>
              <p className="mt-1 font-mono text-xs font-bold text-[var(--green)]">−18% к агрегаторам</p>
            </div>
            <div className="rounded-xl border border-[var(--border)] p-3">
              <p className="text-[10px] font-semibold text-[var(--text)]">Перелёт BKK → DXB</p>
              <p className="text-[9px] text-[var(--text-3)]">оплата в долларах</p>
            </div>
          </div>
        )}

        {screen === "send" && (
          <div className="mt-4 space-y-3">
            <p className="text-[11px] font-semibold text-[var(--text)]">Перевод</p>
            <div className="rounded-xl bg-[var(--bg)] p-3 text-center">
              <p className="text-[9px] text-[var(--text-3)]">Сумма</p>
              <p className="font-mono text-xl font-bold text-[var(--text)]">$250.00</p>
              <p className="mt-1 text-[9px] text-[var(--green)]">комиссия ~ $0</p>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-[var(--border)] p-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--primary)]/10 text-[10px] font-bold text-[var(--primary)]">
                АК
              </div>
              <div>
                <p className="text-[10px] font-semibold text-[var(--text)]">Анна К.</p>
                <p className="text-[9px] text-[var(--text-3)]">получит мгновенно</p>
              </div>
            </div>
            <div className="rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--primary-end)] py-2 text-center text-[10px] font-semibold text-white">
              Отправить
            </div>
          </div>
        )}

        {screen === "save" && (
          <div className="mt-4 space-y-3">
            <p className="text-[11px] font-semibold text-[var(--text)]">Кошелёк</p>
            <div className="rounded-xl border border-[var(--border)] p-3">
              <p className="text-[9px] text-[var(--text-3)]">Ваш баланс — под вашим контролем</p>
              <p className="mt-1 font-mono text-lg font-bold text-[var(--text)]">$8,200</p>
              <p className="text-[9px] font-medium text-[var(--green)]">никто не может заморозить</p>
            </div>
            <div className="rounded-xl bg-[var(--bg)] p-3">
              <p className="text-[9px] font-semibold text-[var(--text)]">Tax Day Tracker</p>
              <p className="mt-1 text-[9px] text-[var(--text-3)]">Таиланд: 156 из 183 дней</p>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[var(--border)]">
                <div className="h-full w-[85%] rounded-full bg-[var(--primary)]" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

type VerbSectionProps = {
  ns: "pay" | "travel" | "send" | "save";
  screen: Screen;
  flip: boolean;
};

function VerbSection({ ns, screen, flip }: VerbSectionProps) {
  const t = useTranslations("verbs");
  const ref = useScrollReveal();

  return (
    <div ref={ref} className="fade-up grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className={flip ? "lg:order-2" : ""}>
        <h3 className="text-[22px] font-semibold text-[var(--text)] sm:text-[28px]">{t(`${ns}.title`)}</h3>
        <p className="mt-3 max-w-md text-base leading-relaxed text-[var(--text-3)]">{t(`${ns}.lead`)}</p>
        <ul className="mt-6 space-y-3">
          {["b1", "b2", "b3"].map((b) => (
            <li key={b} className="flex items-start gap-3 text-sm text-[var(--text-2)]">
              <svg
                className="mt-0.5 h-5 w-5 flex-shrink-0 text-[var(--primary)]"
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {t(`${ns}.${b}`)}
            </li>
          ))}
        </ul>
        <a href="#cta" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[var(--primary)] transition-colors hover:text-[var(--primary-end)]">
          {t("cta")}
          <span aria-hidden="true">→</span>
        </a>
      </div>
      <div className={flip ? "lg:order-1" : ""}>
        <PhoneMockup screen={screen} />
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
        </div>
        <VerbSection ns="pay" screen="card" flip={false} />
        <VerbSection ns="travel" screen="travel" flip={true} />
        <VerbSection ns="send" screen="send" flip={false} />
        <VerbSection ns="save" screen="save" flip={true} />
      </div>
    </section>
  );
}
