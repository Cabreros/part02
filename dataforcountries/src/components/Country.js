import { useEffect, useState } from "react";
import axios from "axios";

const Country = ({ country }) => {
  const [weather, setWeather] = useState({});
  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          country.capital +
          "&appid=" +
          api_key +
          "&units=metric"
      )
      .then((response) => {
        const current = response.data;
        setWeather({
          temp: current.main.temp,
          image:
            "http://openweathermap.org/img/wn/" +
            current.weather[0].icon +
            "@2x.png",
          wind: current.wind.speed,
        });
      });
  }, []);

  return (
    <>
      <h1>{country.name}</h1>
      <div>capital: {country.capital}</div>
      <div>area: {country.area}</div>
      <h2>languages:</h2>
      {country.languages.map((lang, index) => (
        <li key={index}>{lang.name}</li>
      ))}
      <img src={country.flag}></img>

      <h1>Weather in {country.capital}</h1>
      <div>temperature {weather.temp} Celcius</div>
      <img src={weather.image}></img>
      <div>wind {weather.wind} m/s</div>
    </>
  );
};

export default Country;
