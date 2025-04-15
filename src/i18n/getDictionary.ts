"use server";

import { defaultLocale } from './config';

type Dictionary = {
  terms: any;
  privacy: any;
  common: any;
};

export async function getDictionary(locale: string): Promise<Dictionary> {
  try {
    // Default to English if locale is not provided or doesn't match our supported locales
    const finalLocale = locale || defaultLocale;
    
    // Import the respective dictionary
    // Next.js handles dynamic imports efficiently
    const dictionary = await import(`./dictionaries/${finalLocale}.json`);
    
    return dictionary.default;
  } catch (error) {
    console.error(`Error loading dictionary for locale "${locale}":`, error);
    
    // Fallback to English dictionary in case of error
    const fallbackDictionary = await import(`./dictionaries/en.json`);
    return fallbackDictionary.default;
  }
}
