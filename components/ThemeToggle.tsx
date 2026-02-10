"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Switch } from "@/components/ui/switch";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <div className="toggle">
      <div className="flex items-center gap-3">
        {isDark ? (
          <Moon className="size-5 text-yellow-500" />
        ) : (
          <Sun className="size-5 text-blue-400" />
        )}
        <span className="text-sm font-medium text-gray-700 dark:text-white">
          {isDark ? "Dark Mode" : "Light Mode"}
        </span>
      </div>

      <Switch
        checked={isDark}
        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
        className="
          data-[state=unchecked]:bg-slate-300 
          data-[state=checked]:bg-blue-600
          border-transparent"/>
    </div>
  );
}
