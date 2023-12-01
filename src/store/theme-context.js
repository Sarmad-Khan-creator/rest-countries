import { createContext, useState } from "react";

export const Theme = createContext({
  theme: "light",
  changeTheme: () => {},
});

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const onChangeTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const ctxValue = {
    theme: theme,
    changeTheme: onChangeTheme,
  };

  return <Theme.Provider value={ctxValue}>{children}</Theme.Provider>;
};

export default ThemeProvider;
