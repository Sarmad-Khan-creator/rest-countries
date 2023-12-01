import FalgCard from "./FlagCard";
import {
  Await,
  Link,
  defer,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { fetchCountryByFullName, fetchCountryByRegion } from "../../http";
import { useState, useContext, Suspense, useRef } from "react";
import { Theme } from "../../store/theme-context";
import searchIcon from "../../assets/search.svg";
import "./CountryList.css";
import { fetchAllCountry } from "../../http";

const REGION_DATA = ["All", "Africa", "America", "Asia", "Europe", "Oceania"];

const CountryList = () => {
  const x = window.matchMedia("(max-width: 400px)");
  const { countries } = useLoaderData();
  const [data, setData] = useState(countries);
  const inputRef = useRef();

  const navigation = useNavigation();

  const fetchCountry = async (region) => {
    setData([]);
    let country;

    if (region === "all") {
      country = await fetchAllCountry();
      setData(country);
    } else {
      country = await fetchCountryByRegion(region);
      setData(country);
    }
  };

  const countryByFullName = async (event) => {
    if (event.key === "Enter" && inputRef.current.value !== "") {
      const countryFullName = await fetchCountryByFullName(inputRef.current.value);
      setData(countryFullName);
    }

    if (event.target.value === "") {
      setData(countries);
    }
  };

  const handleSearch = async () => {
    const countryFullName = await fetchCountryByFullName(inputRef.current.value);
    setData(countryFullName);
  }

  const { theme } = useContext(Theme);

  return (
    <div
      className={`background ${
        theme === "dark" ? "background-dark" : "background=light"
      }`}
    >
      <div className="select-container">
        <div>
          <input
            type="text"
            ref={inputRef}
            placeholder="search country"
            onKeyDown={countryByFullName}
            className={theme === "dark" ? "dark" : "light"}
          />
            {x.matches && <img src={searchIcon} alt="search" className="search" onClick={handleSearch} />}
        </div>
        <select
          id="region"
          name="region"
          onChange={(event) => fetchCountry(event.target.value)}
          className={`region ${theme === "dark" ? "dark" : "light"}`}
          disabled={navigation.state === "submitting"}
        >
          <optgroup label="Select by region">
            {REGION_DATA.map((region, index) => (
              <option key={index} value={region.toLowerCase()}>
                {region}
              </option>
            ))}
          </optgroup>
        </select>
      </div>

      {data.length === 0 && (
        <h2
          style={{
            textAlign: "center",
            color: theme === "dark" ? "hsl(0, 0%, 100%)" : "hsl(200, 15%, 8%)",
          }}
        >
          Loading Region...
        </h2>
      )}

      <Suspense
        fallback={
          <h2
            style={{
              textAlign: "center",
              color:
                theme === "dark" ? "hsl(0, 0%, 100%)" : "hsl(200, 15%, 8%)",
            }}
          >
            Loading Countries List...
          </h2>
        }
      >
        <Await resolve={data}>
          {(loadedData) => (
            <div className="grid">
              {loadedData.map((country, index) => (
                <Link
                  key={index}
                  to={`name/${country.name.common}`}
                  style={{ textDecoration: "none" }}
                >
                  <FalgCard
                    flagUrl={country.flags.png}
                    name={country.name.common}
                    population={country.population}
                    region={country.region}
                    capital={country.capital}
                  />
                </Link>
              ))}
            </div>
          )}
        </Await>
      </Suspense>
    </div>
  );
};

export default CountryList;

const loadCountryList = async () => {
  const response = await fetch("https://restcountries.com/v3.1/all");

  if (!response.ok) {
    // ....
  } else {
    const resData = await response.json();
    return resData;
  }
};

export function loader() {
  return defer({
    countries: loadCountryList(),
  });
}
