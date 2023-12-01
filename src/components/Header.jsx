import moonIcon from "../assets/icon-moon.svg";
import { useContext } from "react";
import { Theme } from "../store/theme-context";

const Header = () => {
  const { theme, changeTheme } = useContext(Theme);
  return (
    <header className={theme === "dark" ? "dark" : "light"}>
      <h1>Where in the world...</h1>
      {/* <img src={moonIcon} alt="change theme icon" onClick={changeTheme} /> */}
      <button
        className="icon-button"
        onClick={changeTheme}
        style={{
          color: theme === "light" ? "hsl(200, 15%, 8%)" : "hsl(0, 0%, 100%)",
        }}
      >
        {theme === "dark" ? (
          <ion-icon name="moon"></ion-icon>
        ) : (
          <ion-icon name="sunny"></ion-icon>
        )}

        {theme === "dark" ? "   Dark Mode" : "   Light Mode"}
      </button>
    </header>
  );
};

export default Header;
