import React, { createContext, useContext, useState } from "react";

type Theme = "dark" | "light";

const themeJson = localStorage.getItem("theme");
const loadedTheme: Theme = themeJson === "dark" ? "dark" : "light";

export const ThemeContext = createContext<Theme>(loadedTheme);
export const ThemeUpdateContext = createContext<(theme: Theme) => void>(
  {} as any
);
export const useTheme = () => {
  return useContext(ThemeContext);
};
export const useUpdateTheme = () => {
  return useContext(ThemeUpdateContext);
};

const ThemeProvider: React.FC = ({ children }) => {
  const [Theme, setTheme] = useState<Theme>(loadedTheme);

  const changeTheme = (theme: Theme) => {
    setTheme(theme);
    localStorage.setItem("theme", theme);
  };

  return (
    <ThemeContext.Provider value={Theme}>
      <ThemeUpdateContext.Provider value={changeTheme}>
        {children}
      </ThemeUpdateContext.Provider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
