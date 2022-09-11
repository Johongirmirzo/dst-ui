import React, { useState } from "react";

interface ThemeColorInterface {
  darkMode: {
    background: string;
    color: string;
    gray: string;
  };
  lightMode: {
    background: string;
    color: string;
    gray: string;
  };
}

interface ThemeContextInterface {
  isLightMode: boolean;
  toggleTheme: () => void;
  theme: ThemeColorInterface;
}

const theme = {
  darkMode: {
    background: "#1a202c",
    color: "#fff",
    gray: "#777",
  },
  lightMode: {
    background: "#fff",
    color: "#1a202c",
    gray: "#777",
  },
};

export const ThemeContext = React.createContext<ThemeContextInterface>({
  isLightMode: true,
  toggleTheme: () => {},
  theme,
});

const ThemeContextProvider = ({ children }: React.PropsWithChildren) => {
  const isThemeLightModeStore = JSON.parse(
    localStorage.getItem("isLightMode") as "true | false"
  );
  const [isLightMode, setIsLightMode] = useState(
    isThemeLightModeStore === null ? true : isThemeLightModeStore
  );

  console.log(isThemeLightModeStore);
  const toggleTheme = () => {
    if (isLightMode) {
      localStorage.setItem("isLightMode", "false");
      setIsLightMode(false);
    } else {
      localStorage.setItem("isLightMode", "true");
      setIsLightMode(true);
    }
  };
  return (
    <ThemeContext.Provider value={{ isLightMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
