import type { LanguageType } from "@pkg/types/Language";
import { createContext, useContext } from "react";

export type LanguageContextType = {
  language: LanguageType;
  changeLanguage: (lng: LanguageType) => void;
  t: (key: string) => string;
};

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
