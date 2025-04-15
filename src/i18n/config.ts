export const defaultLocale = 'en';

export const locales = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'zh', name: 'Chinese (中文)' },
  { code: 'ja', name: 'Japanese (日本語)' },
  { code: 'ru', name: 'Russian (Русский)' },
  { code: 'es', name: 'Spanish (Español)' },
  { code: 'ko', name: 'Korean (한국어)' },
];

export function getLocaleByCode(code: string) {
  return locales.find(locale => locale.code === code) || locales[0];
}
