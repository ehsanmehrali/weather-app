import { useState } from "react";
import { useWeather } from "./hooks/useWeather";
import Input from "./components/Input";
import Weather from "./components/Weather";

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

      {error && <p className="error">{error}</p>}

      {}
      {isLoading ? (
        <p className="loader">Loading...</p>
      ) : (
        weather.weathercode && (
          <Weather weather={weather} location={displayLocation} />
        )
      )}
    </div>
  );
}
