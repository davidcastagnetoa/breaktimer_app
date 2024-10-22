import React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { IconButton, Tooltip } from "@radix-ui/themes";

export const ThemeToggle = ({ children, ...props }) => {
  // Simulación de useTheme de Next.js para React
  const [theme, setTheme] = React.useState("light"); // Valor por defecto
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

  const toggleTheme = () => {
    const resolvedTheme = theme === "system" ? systemTheme : theme;
    const newTheme = resolvedTheme === "dark" ? "light" : "dark";
    const newThemeMatchesSystem = newTheme === systemTheme;
    setTheme(newThemeMatchesSystem ? "system" : newTheme);

    // Aplicar la clase correspondiente al body del documento
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <>
      <style>{`
        :root, .light, .light-theme {
          --theme-toggle-sun-icon-display: block;
          --theme-toggle-moon-icon-display: none;
        }
        .dark, .dark-theme {
          --theme-toggle-sun-icon-display: none;
          --theme-toggle-moon-icon-display: block;
        }
      `}</style>

      <Tooltip className="radix-themes-custom-fonts" content="Toggle theme">
        <IconButton size="3" variant="ghost" color="gray" aria-label="Toggle theme" onClick={toggleTheme} {...props}>
          <SunIcon width="16" height="16" style={{ display: "var(--theme-toggle-sun-icon-display)" }} />
          <MoonIcon width="16" height="16" style={{ display: "var(--theme-toggle-moon-icon-display)" }} />
        </IconButton>
      </Tooltip>
    </>
  );
};
