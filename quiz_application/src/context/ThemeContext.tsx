// file to show the theme for the entire application
"use client";
import React, { createContext, useContext, useState } from "react";

interface Theme {
  theme: string;
  toggle: () => void;
}

const ThemeContext = createContext<Theme>({
  theme: "light",
  toggle: () => {},
});

// custom hook to use this theme
export const useTheme = () => useContext(ThemeContext);

// creating the provider function for the theme context
export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState("light");

  const toggle = () => {
    console.log(theme, "here");

    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggle }}>
      {children}
    </ThemeContext.Provider>
  );
};
