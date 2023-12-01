import CountryList, {
  loader as countryLoader,
} from "./components/CountryList/CountryLlist";
import CountryDetails, {
  loader as countryDetailLoader,
} from "./components/CountryDetail/CountryDetails";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./components/Main/Main";
import ThemeProvider from "./store/theme-context";

const router = createBrowserRouter([
  {
    path: "/rest-countries/",
    element: <Main />,
    children: [
      { path: "/rest-countries/", element: <CountryList />, loader: countryLoader },
      {
        path: "/rest-countries/name/:country",
        element: <CountryDetails />,
        loader: countryDetailLoader,
        id: "country-detail",
      },
    ],
  },
]);

function App() {

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
