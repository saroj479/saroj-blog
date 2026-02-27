"use client";

import { useLanguage } from "@/providers/LanguageProvider";
import { useEffect, useRef, useState } from "react";

/**
 * Client wrapper for translating arbitrary text strings.
 * Cancels in-flight requests on unmount or language change to prevent stale updates.
 */
export const TranslatedText = ({ text, as: Tag = "span", className = "" }) => {
  const { language, mounted } = useLanguage();
  const [translated, setTranslated] = useState(text);
  const [isTranslating, setIsTranslating] = useState(false);
  const abortRef = useRef(null);

  useEffect(() => {
    // Cancel any previous request
    abortRef.current?.abort();

    if (!mounted || language === "en" || !text) {
      setTranslated(text);
      return;
    }

    // Check cache
    const cacheKey = `t_${language}_${btoa(encodeURIComponent(text)).slice(0, 40)}`;
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      setTranslated(cached);
      return;
    }

    const controller = new AbortController();
    abortRef.current = controller;

    const translateText = async () => {
      setIsTranslating(true);
      try {
        const res = await fetch("/api/translate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text,
            sourceLang: "en",
            targetLang: language,
          }),
          signal: controller.signal,
        });
        const data = await res.json();
        if (!controller.signal.aborted && data.translatedText) {
          setTranslated(data.translatedText);
          localStorage.setItem(cacheKey, data.translatedText);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          // Keep original text on real errors
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsTranslating(false);
        }
      }
    };

    translateText();

    return () => controller.abort();
  }, [language, text, mounted]);

  return (
    <Tag className={className}>
      {isTranslating ? (
        <span className="animate-pulse">{text}</span>
      ) : (
        translated
      )}
    </Tag>
  );
};
