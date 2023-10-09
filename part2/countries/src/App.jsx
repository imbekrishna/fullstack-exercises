import { useEffect, useState } from "react";
import axios from "axios";

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

  const getComponent = () => {
    if (filtered.length == 0) {
      return <p>No match found!</p>;
    } else if (filtered.length == 1) {
      return <CountryDetail country={filtered[0]} />;
    } else if (filtered.length <= 10) {
      return <CountryList countries={filtered} />;
    } else if (filtered.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    }
  };

  return (
    <>
      <div>
        find countries:{" "}
        <input value={search} onChange={handleSearch} type="text" />
        {getComponent()}
      </div>
    </>
  );
}

const CountryList = ({ countries, handleClick }) => {
  return (
    <>
      {countries.map((country) => (
        <p key={country.ccn3}>
          {country.name.common}{" "}
          <button onClick={() => handleClick(country.name.common)}>show</button>
        </p>
      ))}
    </>
  );
};

const CountryDetail = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital {country.capital[0]}</p>
      <p>Area {country.area}</p>

      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages).map((e) => (
          <li key={e}>{e}</li>
        ))}
      </ul>
      <img src={country.flags.svg} alt={country.flags.alt} />
    </div>
  );
};

export default App;
