import "./Country.css";
import Country from "./Country";
import { Await, Link, defer, json, useRouteLoaderData } from "react-router-dom";
import { Suspense, useContext } from "react";
import { Theme } from "../../store/theme-context";

const CountryDetails = () => {
  const { theme } = useContext(Theme);

  const { country } = useRouteLoaderData("country-detail");

  return (
    <div
      className={`country-details ${
        theme === "dark" ? "background-dark" : "background-light"
      }`}
    >
      <Link to="..">
        <button className={`back ${theme === "dark" ? "dark" : "light"}`}>
          Go back
        </button>
      </Link>
      <Suspense
        fallback={
          <h2
            style={{
              textAlign: "center",
              color:
                theme === "dark" ? "hsl(0, 0%, 100%)" : "hsl(200, 15%, 8%)",
            }}
          >
            Loading Country Detail
          </h2>
        }
      >
        <Await resolve={country}>
          {(loadedCountry) => (
            <Country
              flageUrl={loadedCountry.flags.png}
              name={loadedCountry.name.common}
              nativeName={loadedCountry.name.nativeName}
              population={loadedCountry.population}
              region={loadedCountry.region}
              subRegion={loadedCountry.subregion}
              capital={loadedCountry.capital}
              topLevelDomain={loadedCountry.tld}
              currencies={loadedCountry.currencies}
              languages={loadedCountry.languages.eng}
              borderCountries={loadedCountry.borders}
            />
          )}
        </Await>
      </Suspense>
    </div>
  );
};

export default CountryDetails;

const loadCountry = async (countryName) => {
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
  );
  const resData = await response.json();

  if (!response) {
    throw json({ message: "Could not fetch country details" }, { status: 500 });
  } else {
    const [country] = resData;
    return country;
  }
};

export const loader = ({ params }) => {
  return defer({
    country: loadCountry(params.country),
  });
};
