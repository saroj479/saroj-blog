"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";

const SUPPORTED_LANGUAGES = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "ne", label: "नेपाली", flag: "🇳🇵" },
];

const LanguageContext = createContext({
  language: "en",
  setLanguage: () => {},
  languages: SUPPORTED_LANGUAGES,
});

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export default function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("preferred-language");
    if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) {
      setLanguageState(saved);
    }
    setMounted(true);
  }, []);

  const setLanguage = useCallback((lang) => {
    setLanguageState(lang);
    localStorage.setItem("preferred-language", lang);
    // Update html lang attribute
    document.documentElement.lang = lang;
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.lang = language;
    }
  }, [language, mounted]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        languages: SUPPORTED_LANGUAGES,
        mounted,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}
