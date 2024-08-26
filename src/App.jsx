import React, { useEffect, useState } from "react";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import Timeandlocation from "./components/Timeandlocation";
import Temprature from "./components/Temprature";
import Forcast from "./components/Forcast";
import getFormattedWeatherData from "./services/weatherService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const capitalizeFirstLatter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const App = () => {
  const [query, setQuery] = useState({ q: "new delhi" });
  const [units, setUnit] = useState("metric");
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    const cityName = query.q ? query.q : "current location";
    toast.info(`Fetching weather data for ${capitalizeFirstLatter(cityName)}`);

    const data = await getFormattedWeatherData({ ...query, units });

    if (data) {
      toast.success(`Successfully fetched weather data for ${data.name}, ${data.country}`);
      setWeather(data);
    }
  };

  useEffect(() => {
    getWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-600 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-600 to-blue-700";
    return "from-yellow-600 to-orange-700";
  };

  return (
    <div
      className={`mx-auto max-w-screen-lg mt-4 py-5 px-8 sm:px-12 md:px-16 lg:px-24 bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground()}`}
    >
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} setUnit={setUnit} />

      {weather && (
        <>
          <Timeandlocation weather={weather} />
          <Temprature weather={weather} units={units} />
          <Forcast title="3 hours step forecast" data={weather.hourly} />
          <Forcast title="Daily forecast" data={weather.daily} />
        </>
      )}

      <ToastContainer autoClose={2000} hideProgressBar={true} theme="colored" />
    </div>
  );
};

export default App;
