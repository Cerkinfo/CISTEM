import { useEffect, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { LanguageContext } from '../contexts/LanguageContext';
import type { LanguageType } from '@pkg/types/Language';

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState<LanguageType>(() => {

    const savedLanguage = localStorage.getItem('language') as LanguageType;
    return savedLanguage || (i18n.language as LanguageType) || 'fr';
  });
  
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [i18n, language]);
 
  const changeLanguage = (lng: LanguageType) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
    localStorage.setItem('language', lng);
  };

  useEffect(() => {
    if (localStorage.getItem('language') !== language) {
      localStorage.setItem('language', language);
    }
  }, [language]);
 
  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}