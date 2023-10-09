import { useEffect, useState } from "react";
import axios from "axios";

const api_key = import.meta.env.VITE_OPENWMP_KEY;

const CountryDetail = ({ country }) => {
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&units=metric&appid=${api_key}`;

    axios.get(url).then((response) => {
      setWeatherData(response.data);
    });
  }, [country]);

  console.log(weatherData);
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
      <h2>Weather in {country.name.common}</h2>

      {Object.keys(weatherData).length !== 0 ? (
        <div>
          <p>Temperature {weatherData.main.temp} Celcius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
            alt=""
          />
          <p>Wind {weatherData.wind.speed} m/s</p>
        </div>
      ) : (
        <p>Loading weather Data</p>
      )}
    </div>
  );
};

export default CountryDetail;
