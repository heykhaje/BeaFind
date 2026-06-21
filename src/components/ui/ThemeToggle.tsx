"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MaterialIcon } from "./MaterialIcon";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button className="rounded-full p-2 transition-all hover:bg-surface-container-low" aria-label="Toggle theme">
        <MaterialIcon name="dark_mode" className="text-on-surface-variant" />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="rounded-full p-2 transition-all hover:bg-surface-container-low dark:hover:bg-[#334155]"
      aria-label="Toggle dark mode"
    >
      <MaterialIcon
        name={theme === "dark" ? "light_mode" : "dark_mode"}
        className="text-on-surface-variant dark:text-[#cbd5e1]"
      />
    </button>
  );
}

