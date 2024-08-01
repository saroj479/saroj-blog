"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";

export const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="rounded p-4 bg-accent1-10" />;

  const handleThemeToggle = () => {
    if (resolvedTheme === "light") return setTheme("dark");
    return setTheme("light");
  };

  return (
    <button
      onClick={handleThemeToggle}
      aria-label={`Switch to ${resolvedTheme === "light" ? "Dark" : "Light"} mode`}
      title={`Switch to ${resolvedTheme === "light" ? "Dark" : "Light"} mode`}
      className="rounded p-2 bg-accent1-10"
    >
      {resolvedTheme === "light" && <Icon icon="light-mode" />}
      {resolvedTheme === "dark" && <Icon icon="dark-mode" />}
    </button>
  );
};
