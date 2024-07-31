/* eslint-disable react/display-name */
"use client";

import { memo, useEffect, useState } from "react";

export const ThemeToggle = memo(() => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    setTheme(savedTheme);
  }, []);

  const handleToggle = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme); // Save the new theme
      return newTheme;
    });
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={
        theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"
      }
      className="rounded bg-gray-200 p-2 dark:bg-gray-700"
    >
      {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
    </button>
  );
});
