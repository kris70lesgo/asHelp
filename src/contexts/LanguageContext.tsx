'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LanguageContextType {
  locale: string;
  setLocale: (locale: string) => void;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [locale, setLocaleState] = useState('en');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Récupérer la langue depuis localStorage au chargement
    const savedLocale = localStorage.getItem('preferred-language') || 'en';
    setLocaleState(savedLocale);
    setIsLoading(false);
  }, []);

  const setLocale = (newLocale: string) => {
    setLocaleState(newLocale);
    localStorage.setItem('preferred-language', newLocale);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
