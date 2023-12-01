export const fetchAllCountry = async () => {
  const response = await fetch("https://restcountries.com/v3.1/all");

  if (!response.ok) {
    // ....
  } else {
    const resData = await response.json();
    return resData;
  }
};


export async function fetchCountryByRegion(region) {
  const response = await fetch(
    `https://restcountries.com/v3.1/region/${region}`
  );
  const resData = await response.json();

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not fetch country" }), {
      status: 500,
    });
  }

  return resData;
}

export async function fetchCountryByFullName(countryName) {
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
  );
  const resData = await response.json();

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: "Could not fetch country" }), {
      status: 500,
    });
  }

  return resData;
}
