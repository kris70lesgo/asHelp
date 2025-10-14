'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface Translations {
  [key: string]: string | Translations;
}

interface UseTranslationsReturn {
  t: (key: string, fallback?: string) => string;
  locale: string;
  isLoading: boolean;
}

export function useTranslations(): UseTranslationsReturn {
  const { locale, isLoading: contextLoading } = useLanguage();
  const [translations, setTranslations] = useState<Translations>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const response = await fetch(`/locales/${locale}/common.json`);
        if (!response.ok) {
          throw new Error(`Failed to load translations for ${locale}`);
        }
        const data = await response.json();
        setTranslations(data);
      } catch (error) {
        console.error('Failed to load translations:', error);
        // Fallback to English
        try {
          const response = await fetch('/locales/en/common.json');
          const data = await response.json();
          setTranslations(data);
        } catch (fallbackError) {
          console.error('Failed to load fallback translations:', fallbackError);
          setTranslations({});
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (!contextLoading) {
      loadTranslations();
    }
  }, [locale, contextLoading]);

  const t = (key: string, fallback?: string): string => {
    if (isLoading || contextLoading) return fallback || key;
    
    const keys = key.split('.');
    let value: string | Translations | undefined = translations;
    
    for (const k of keys) {
      if (typeof value === 'object' && value !== null) {
        value = value[k];
      } else {
        value = undefined;
        break;
      }
    }
    
    return (typeof value === 'string' ? value : fallback) || key;
  };

  return { t, locale, isLoading: isLoading || contextLoading };
}
