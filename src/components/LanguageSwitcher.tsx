"use client";

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { locales } from '@/i18n/config';

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();

  const handleChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;
    
    // Extract the current locale from the pathname
    const pathSegments = pathname.split('/');
    const isRootWithLocale = pathSegments.length === 2; // e.g., /en
    const currentLocale = pathSegments[1];
    
    // Check if the current path has a valid locale
    const hasValidLocale = locales.some(locale => locale.code === currentLocale);
    
    // Create the new path with the selected locale
    let newPath;
    if (hasValidLocale) {
      if (isRootWithLocale) {
        newPath = `/${newLocale}`;
      } else {
        // Replace the current locale with the new one
        pathSegments[1] = newLocale;
        newPath = pathSegments.join('/');
      }
    } else {
      // If the path doesn't have a locale, add the new locale
      newPath = `/${newLocale}${pathname}`;
    }
    
    router.push(newPath);
  };

  // Determine current language (default to 'en' if none is found)
  const currentLocale = pathname.split('/')[1] || 'en';
  const validLocale = locales.some(locale => locale.code === currentLocale) ? currentLocale : 'en';

  return (
    <div className="relative inline-block text-left">
      <select
        value={validLocale}
        onChange={handleChangeLanguage}
        className="block appearance-none bg-transparent border border-[#333333] rounded px-4 py-2 pr-8 text-[#c0c0c0] hover:border-[#555555] focus:outline-none focus:border-[#777777] transition-colors"
      >
        {locales.map((locale) => (
          <option key={locale.code} value={locale.code} className="bg-[#121212] text-[#c0c0c0]">
            {locale.name}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#c0c0c0]">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );
}
