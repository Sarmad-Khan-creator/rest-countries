import "./Country.css";
import { useContext } from "react";
import { Theme } from "../../store/theme-context";

const Country = ({
  flageUrl,
  name,
  nativeName,
  population,
  region,
  subRegion,
  capital,
  topLevelDomain,
  currencies,
  languages,
  borderCountries,
}) => {
  const { theme } = useContext(Theme);
  return (
    <div className="country">
      <img src={flageUrl} alt="country flag" />
      <div
        className={`detail ${
          theme === "dark" ? "detail-dark-color" : "detail-light-color"
        }`}
      >
        <h2>{name}</h2>
        <div className="flex-container">
          <div className="flex-left">
            <p>
              <strong>Native Name: </strong>
              {nativeName !== undefined &&
                Object.values(nativeName).map((name) => {
                  return <span> {name.common}</span>;
                })}
            </p>
            <p>
              <strong>Population: </strong>
              {population}
            </p>
            <p>
              <strong>Region: </strong>
              {region}
            </p>
            <p>
              <strong>Sub Region: </strong>
              {subRegion}
            </p>
            <p>
              <strong>Capital: </strong>
              {capital}
            </p>
          </div>
          <div className="flex-right">
            <p>
              <strong>Top Level Domain: </strong>
              {topLevelDomain}
            </p>
            <p>
              <strong>Currencies: </strong>
              {currencies !== undefined &&
                Object.values(currencies).map((currency) => {
                  return currency.name;
                })}
            </p>
            <p>
              <strong>Languages: </strong>
              {languages !== undefined &&
                Object.values(languages).map((language) => {
                  return language;
                })}
            </p>
          </div>
        </div>
        <div className="border-countries">
          <p>
            <strong>Border Countries:</strong>
          </p>
          <div className="bordrs">
            {borderCountries !== undefined &&
              Object.values(borderCountries).map((border) => {
                return (
                  <button className={theme === "dark" ? "dark" : "light"}>
                    {border}
                  </button>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Country;
