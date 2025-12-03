"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Fallback to "dark" if resolvedTheme is undefined
  const currentTheme = resolvedTheme || "dark";

  return (
    <button
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className="rounded-full p-2 hover:bg-light-200/20 transition-colors"
      aria-label="Toggle theme"
    >
      {currentTheme === "dark" ? <Sun className="h-5 w-5 text-light-100" /> : <Moon className="h-5 w-5 text-dark-100" />}
    </button>
  );
}
