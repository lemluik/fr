import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['ru', 'en'],
  defaultLocale: 'ru',
  // Язык релиза — русский: не переключать по Accept-Language
  localeDetection: false,
});
