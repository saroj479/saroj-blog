"use client";

/* eslint-disable tailwindcss/classnames-order */

import { useLanguage } from "@/providers/LanguageProvider";
import { useEffect, useRef, useState } from "react";

export const LanguageSwitcher = () => {
  const { language, setLanguage, languages, mounted } = useLanguage();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click / escape — only listen when open
  useEffect(() => {
    if (!open) return;
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    const handleEsc = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [open]);

  if (!mounted) {
    return <div className="h-9 w-16 rounded bg-accent1-10" />;
  }

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        aria-label="Switch language"
        aria-expanded={open}
        aria-haspopup="listbox"
        className="flex items-center gap-1.5 rounded px-2 py-1.5 text-sm font-medium transition-colors bg-accent1-10 hover:bg-accent1-20"
      >
        <GlobeIcon />
        <span className="hidden sm:inline">{currentLang.flag}</span>
        <span className="text-xs uppercase tracking-wide">{currentLang.code}</span>
        <ChevronIcon open={open} />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Select language"
          className="absolute right-0 top-full z-50 mt-2 min-w-[160px] overflow-hidden rounded-lg border border-secondary-10 bg-background shadow-lg"
        >
          {languages.map((lang) => (
            <button
              key={lang.code}
              role="option"
              aria-selected={language === lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors hover:bg-accent1-10 ${
                language === lang.code
                  ? "font-semibold text-accent1 bg-accent1-5"
                  : ""
              }`}
            >
              <span className="text-base">{lang.flag}</span>
              <span>{lang.label}</span>
              {language === lang.code && (
                <CheckIcon className="ml-auto" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

function GlobeIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-accent1-50"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function ChevronIcon({ open }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform ${open ? "rotate-180" : ""}`}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function CheckIcon({ className = "" }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`text-accent1 ${className}`}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
