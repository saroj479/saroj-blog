"use client";

import { useTranslation } from "@/utils/useTranslation";

/**
 * Client wrapper for translated static UI text.
 * Use in server components to render translated strings.
 */
export const T = ({ k, fallback, as: Tag = "span", className = "" }) => {
  const { t } = useTranslation();
  return <Tag className={className}>{t(k, fallback)}</Tag>;
};
