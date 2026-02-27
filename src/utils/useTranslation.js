"use client";

import { translations } from "@/constants/translations";
import { useLanguage } from "@/providers/LanguageProvider";
import { useCallback } from "react";

export function useTranslation() {
  const { language } = useLanguage();

  const t = useCallback(
    (key, fallback) => {
      const dict = translations[language] || translations.en;
      return dict[key] || translations.en[key] || fallback || key;
    },
    [language]
  );

  return { t, language };
}
