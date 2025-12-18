import { useState, useEffect } from "react";
import { convertToFlag } from "../App";

export function useWeather(location) {
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
