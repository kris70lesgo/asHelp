'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface LanguageSwitcherProps {
  className?: string;
}

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' }
];

export default function LanguageSwitcher({ className = '' }: LanguageSwitcherProps) {
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
        className="flex items-center gap-1 px-2 py-1 rounded-md bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-200"
      >
        <span className="text-xs font-medium whitespace-nowrap">
          {selectedLang.flag} {selectedLang.name}
        </span>
        <ChevronDown 
          size={10} 
          className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full right-0 mt-1 w-36 bg-white/95 backdrop-blur-sm border border-white/20 rounded-lg shadow-lg z-50 overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang)}
                className={`w-full px-3 py-2 text-left hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2 text-sm ${
                  selectedLang.code === lang.code ? 'bg-gray-100 font-medium' : ''
                }`}
              >
                <span className="text-base">{lang.flag}</span>
                <span className="text-xs text-gray-700">{lang.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
