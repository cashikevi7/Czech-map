"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm font-medium shadow-sm dark:border-neutral-700 dark:bg-neutral-900"
      aria-label="Přepnout režim"
    >
      {isDark ? "Světlý" : "Tmavý"}
    </button>
  );
}
