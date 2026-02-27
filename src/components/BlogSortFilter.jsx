"use client";

import { useTranslation } from "@/utils/useTranslation";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

/**
 * Toggle filter for Recent / Popular blog sorting.
 * Uses URL searchParams so the page stays server-rendered
 * and the active sort persists on refresh / share.
 */
export const BlogSortFilter = ({ category }) => {
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const currentSort = searchParams.get("sort") || "recent";

  const buildHref = (sort) => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (sort !== "recent") params.set("sort", sort);
    const qs = params.toString();
    return `/blogs${qs ? `?${qs}` : ""}`;
  };

  return (
    <div className="mb-5 flex items-center gap-2">
      <SortButton
        href={buildHref("recent")}
        active={currentSort === "recent"}
        label={t("blog.sortRecent", "Recent")}
        icon={<ClockIcon />}
      />
      <SortButton
        href={buildHref("popular")}
        active={currentSort === "popular"}
        label={t("blog.sortPopular", "Popular")}
        icon={<FireIcon />}
      />
    </div>
  );
};

function SortButton({ href, active, label, icon }) {
  return (
    <Link
      href={href}
      scroll={false}
      className={`flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
        active
          ? "border-accent1 bg-accent1 text-white"
          : "bg-transparent text-secondary border-secondary-20 hover:text-accent1 hover:border-accent1-40"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}

function ClockIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function FireIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 12c2-2.96 0-7-1-8 0 3.038-1.773 4.741-3 6-1.226 1.26-2 3.24-2 5a6 6 0 1 0 12 0c0-1.532-1.056-3.94-2-5-1.786 3-2.791 3-4 2z" />
    </svg>
  );
}
