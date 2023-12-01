import { useContext } from "react";
import { Theme } from "../../store/theme-context";

const FalgCard = ({ flagUrl, name, population, region, capital }) => {
  const { theme } = useContext(Theme);

  return (
    <div className={`flag-card ${theme === "dark" ? "dark" : "light"}`}>
      <img src={flagUrl} alt={name} />
      <div className="country-detail">
        <h2>{name}</h2>
        <p>
          <strong>Population:</strong> {population}
        </p>
        <p>
          <strong>Region:</strong> {region}
        </p>
        <p>
          <strong>Capital:</strong> {capital}
        </p>
      </div>
    </div>
  );
};

export default FalgCard;
