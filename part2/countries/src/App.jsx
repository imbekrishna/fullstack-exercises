import { useEffect, useState } from "react";
import axios from "axios";
import CountryDetail from "./services/CountryDetail";
import { CountryList } from "./services/CountryList";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
    getByName(event.target.value);
  };

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setCountries(response.data));
  }, []);

  const getByName = (prefix) => {
    const countryList = countries.filter((country) =>
      country.name.common.toLowerCase().includes(prefix.toLowerCase())
    );
    setFiltered(countryList);
  };

  const handleClilck = (country) => {
    setFiltered([country]);
  };

  const getComponent = () => {
    if (filtered.length == 0) {
      return <p>No match found!</p>;
    } else if (filtered.length == 1) {
      return <CountryDetail country={filtered[0]} />;
    } else if (filtered.length <= 10) {
      return <CountryList countries={filtered} handleClick={handleClilck} />;
    } else if (filtered.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    }
  };

  return (
    <>
      <div>
        Find countries:{" "}
        <input value={search} onChange={handleSearch} type="text" />
        {getComponent()}
      </div>
    </>
  );
}

export default App;
