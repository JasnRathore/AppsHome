"use client"

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon } from "./animate-ui/icons/moon";
import { Sun } from "./animate-ui/icons/sun";

export function MobileThemeButton() {
  const [mounted, setMounted] = React.useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  React.useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-16 w-16 items-center justify-center rounded-full border border-mobile-border bg-mobile-surface text-mobile-text/80">
        <Sun />
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      data-cursor="pointer"
      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-mobile-border bg-mobile-surface text-mobile-text backdrop-blur-md transition-colors hover:bg-mobile-surface-strong"
    >
      {isDark ? <Moon animate /> : <Sun animate />}
    </button>
  );
}

export function DesktopThemeButton() {
  const [mounted, setMounted] = React.useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  React.useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <div className="shrink-0 flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-[20px] border border-border/20 bg-card/30 text-foreground backdrop-blur-sm shadow-sm">
        <Sun />
      </div>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      data-cursor="pointer"
      className="group shrink-0 flex h-[3.25rem] w-[3.25rem] items-center justify-center rounded-[20px] border border-border/20 bg-card/30 text-foreground backdrop-blur-sm shadow-sm transition-transform hover:scale-105"
    >
      {isDark ? <Moon animate /> : <Sun animate />}
    </button>
  );
}
