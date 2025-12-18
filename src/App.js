import { useState, useEffect, memo } from "react";

function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "⛅️"],
    [[3], "☁️"],
    [[45, 48], "🌫"],
    [[51, 56, 61, 66, 80], "🌦"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌧"],
    [[71, 73, 75, 77, 85, 86], "🌨"],
    [[95], "🌩"],
    [[96, 99], "⛈"],
  ]);
  const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}

function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function formatDay(dateStr) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
}

function useWeather(location) {
  const [weather, setWeather] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [displayLocation, setDisplayLocation] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();
      const signal = controller.signal;

      async function fetchWeather() {
        if (location.length < 3) {
          setWeather({});
          setError("");
          return;
        }

        try {
          setIsLoading(true);
          setError("");
          // 1) Getting location (geocoding)
          const geoRes = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${location}`,
            { signal }
          );
          const geoData = await geoRes.json();
          // console.log(geoData);

          if (!geoData.results) throw new Error("Location not found");

          const { latitude, longitude, timezone, name, country_code } =
            geoData.results.at(0);

          setDisplayLocation(`${name} ${convertToFlag(country_code)}`);

          // 2) Getting actual weather
          const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`,
            { signal }
          );
          const weatherData = await weatherRes.json();
          // console.log(weatherData.daily);
          setWeather(weatherData.daily);
          localStorage.setItem("lastLocation", location);
        } catch (err) {
          if (err.name !== "AbortError") {
            console.error(err);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }
      const timer = setTimeout(() => {
        fetchWeather();
      }, 500);

      return () => {
        clearTimeout(timer);
        controller.abort();
      };
    },
    [location]
  );

  return { weather, isLoading, error, displayLocation };
}

export default function App() {
  const [location, setLocation] = useState(
    () => localStorage.getItem("lastLocation") || ""
  );

  const { weather, isLoading, error, displayLocation } = useWeather(location);

  function handleLocationChange(e) {
    setLocation(e.target.value);
  }

  return (
    <div className="app">
      <h1>Classy Weather</h1>
      <Input location={location} onLocationChange={handleLocationChange} />

      {isLoading && <p className="loader">Loading...</p>}

      {error && <p className="error">{error}</p>}

      {weather.weathercode && (
        <Weather weather={weather} location={displayLocation} />
      )}
    </div>
  );
}

function Input({ location, onLocationChange }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search from location..."
        value={location}
        onChange={onLocationChange}
      />
    </div>
  );
}

const Weather = memo(function Weather({ weather, location }) {
  const {
    temperature_2m_max: max,
    temperature_2m_min: min,
    time: dates,
    weathercode: codes,
  } = weather;
  //   console.log(dates);
  //   console.log(location);
  return (
    <div>
      <h2>Weather {location}</h2>
      <ul className="weather">
        {dates.map((date, i) => (
          <Day
            date={date}
            max={max.at(i)}
            min={min.at(i)}
            code={codes.at(i)}
            key={date}
            isToday={i === 0}
          />
        ))}
      </ul>
    </div>
  );
});

function Day({ date, max, min, code, isToday }) {
  return (
    <li className="day">
      <span>{getWeatherIcon(code)}</span>
      <p>{isToday ? "Today" : formatDay(date)}</p>
      <p>
        {Math.floor(min)}&deg; &mdash; <strong>{Math.ceil(max)}&deg;</strong>
      </p>
    </li>
  );
}
