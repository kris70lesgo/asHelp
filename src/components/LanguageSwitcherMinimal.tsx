'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

interface LanguageSwitcherMinimalProps {
  className?: string;
}

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' }
];

export default function LanguageSwitcherMinimal({ className = '' }: LanguageSwitcherMinimalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(languages[0]);
  const { locale, setLocale } = useLanguage();

  const handleLanguageChange = (lang: typeof languages[0]) => {
    setSelectedLang(lang);
    setIsOpen(false);
    setLocale(lang.code);
  };

  useEffect(() => {
    const lang = languages.find(l => l.code === locale);
    if (lang) {
      setSelectedLang(lang);
    }
  }, [locale]);

  return (
    <div className={`relative z-50 ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-7 h-7 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/15 transition-all duration-200 group"
        title={`Switch to ${selectedLang.code === 'en' ? 'Français' : 'English'}`}
      >
        <span className="text-xs group-hover:scale-110 transition-transform duration-200">
          {selectedLang.flag}
        </span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full right-0 mt-2 w-28 bg-white/95 backdrop-blur-sm border border-white/20 rounded-lg shadow-lg z-50 overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang)}
                className={`w-full px-2 py-2 text-left hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2 text-xs ${
                  selectedLang.code === lang.code ? 'bg-gray-100 font-medium' : ''
                }`}
              >
                <span className="text-sm">{lang.flag}</span>
                <span className="text-xs text-gray-700 truncate">{lang.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
