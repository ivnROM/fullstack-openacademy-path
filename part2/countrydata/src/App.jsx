import { useState, useEffect } from "react";
import axios from "axios";

const weather_api_key = import.meta.env.VITE_WEATHER_KEY;

const CountrySearch = ({ setInput }) => {
  const searchInput = (event) => {
    const newInput = event.target.value;
    setInput(newInput);
  };

  return (
    <div>
      find countries: <input type="text" onChange={searchInput}></input>
    </div>
  );
};

const SingleCountryDisplay = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const weatherContent =
    weather === null ? null : (
      <div>
        <p>Temperature {weather.main.temp} Celsius</p>
        <img
          src={`https://openweathermap.org/payload/api/media/file/${weather.weather[0].icon}.png`}
        ></img>
        <p>Wind {weather.wind.speed} m/s</p>
      </div>
    );
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}&lon=${country.latlng[1]}&appid=${weather_api_key}&units=metric`,
      )
      .then((response) => setWeather(response.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital[0]}</p>
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.keys(country.languages).map((key) => (
          <li key={key}>{country.languages[key]}</li>
        ))}
      </ul>
      <img src={country.flags.png}></img>
      <h2>Weather in {country.capital[0]}</h2>
      {weatherContent}
    </div>
  );
};

const CountryResults = ({ countries, input, setInput }) => {
  if (input.length === 0) {
    return;
  }
  const results = countries.filter((country) =>
    country.name.common.toLowerCase().includes(input.toLowerCase()),
  );

  const displayCountryEvent = (country) => {
    setInput(country.name.common);
  };

  if (results.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (results.length > 1) {
    return results.map((country) => (
      <div key={country.name.common}>
        <p>
          {country.name.common}
          <button type="submit" onClick={() => displayCountryEvent(country)}>
            Show
          </button>
        </p>
      </div>
    ));
  } else if (results.length === 1) {
    return <SingleCountryDisplay country={results[0]} />;
  } else {
    return null;
  }
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [input, setInput] = useState("");
  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((request) => {
        setCountries(request.data);
      });
  }, []);

  return (
    <div>
      <CountrySearch setInput={setInput} />
      <CountryResults countries={countries} input={input} setInput={setInput} />
    </div>
  );
};

export default App;
