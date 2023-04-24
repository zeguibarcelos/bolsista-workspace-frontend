import { ThemeProvider } from "@emotion/react";
import React from "react";
import { Theme } from "../themes/Theme";

// Crie o contexto do tema
export const ThemeContext = React.createContext(Theme);

// Componente Provider do tema
export const AppThemeProvider = ({ children }: any) => {
  return (
    <ThemeProvider theme={Theme}>
      <ThemeContext.Provider value={Theme}>{children}</ThemeContext.Provider>
    </ThemeProvider>
  );
};
