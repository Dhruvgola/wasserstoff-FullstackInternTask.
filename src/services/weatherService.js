import { DateTime } from "luxon";

const API_KEY = "02f9332ce8ad50b5c59153138fcdbda4";
const BASE_URL = "https://api.openweathermap.org/data/2.5/";

const getWeatherData = async (infoType, searchParams) => {
  try {
    const url = new URL(BASE_URL + infoType);
    url.search = new URLSearchParams({
      appid: API_KEY,
      ...searchParams,
    });

    const response = await fetch(url);

    if (response.status === 429) {
      throw new Error("Too Many Requests. Please try again later.");
    }

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};

const iconUrlFromCode = (icon) =>
  `http://openweathermap.org/img/wn/${icon}@2x.png`;

const formatToLocalTime = (
  secs,
  offset,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs + offset, { zone: "utc" }).toFormat(format);

const formatCurrent = (data) => {
  if (!data || !data.coord) {
    throw new Error("Invalid data received for current weather.");
  }

  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
    timezone,
  } = data;

  const { main: details, icon } = weather[0];
  const formattedLocalTime = formatToLocalTime(dt, timezone);

  return {
    temp,
    feels_like,
    temp_min,
    temp_max,
    humidity,
    name,
    country,
    sunrise: formatToLocalTime(sunrise, timezone, "hh:mm a"),
    sunset: formatToLocalTime(sunset, timezone, "hh:mm a"),
    speed,
    details,
    icon: iconUrlFromCode(icon),
    formattedLocalTime,
    dt,
    timezone,
    lat,
    lon,
  };
};

const formatForecastWeather = (secs, offset, data) => {
  [
    {
      date: "2024-08-23T00:00:00Z",
      temp: 25,
      icon: "/path/to/icon.png",
      description: "Sunny",
    },
    {
      date: "2024-08-24T00:00:00Z",
      temp: 22,
      icon: "/path/to/icon.png",
      description: "Cloudy",
    },
    {
      date: "2024-08-25T00:00:00Z",
      temp: 20,
      icon: "/path/to/icon.png",
      description: "Rainy",
    },
    {
      date: "2024-08-26T00:00:00Z",
      temp: 23,
      icon: "/path/to/icon.png",
      description: "Partly Cloudy",
    },
    {
      date: "2024-08-27T00:00:00Z",
      temp: 24,
      icon: "/path/to/icon.png",
      description: "Showers",
    },
  ];

  if (!data) {
    throw new Error("Invalid data received for forecast weather.");
  }

  // hourly
  const hourly = data
    .filter((f) => f.dt > secs)
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "hh:mm a"),
      icon: iconUrlFromCode(f.weather[0].icon),
      date: f.dt_txt,
    }))
    .slice(0, 5);

  // daily
  const daily = data
    .filter((f) => f.dt_txt.slice(-8) === "00:00:00")
    .map((f) => ({
      temp: f.main.temp,
      title: formatToLocalTime(f.dt, offset, "ccc"),
      icon: iconUrlFromCode(f.weather[0].icon),
      date: f.dt_txt,
    }));

  return { hourly, daily };
};

const getFormattedWeatherData = async (searchParams) => {
  try {
    const formattedCurrentWeather = await getWeatherData(
      "weather",
      searchParams
    ).then(formatCurrent);

    if (!formattedCurrentWeather) {
      throw new Error("Unable to retrieve current weather data.");
    }

    const { dt, lat, lon, timezone } = formattedCurrentWeather;

    const formattedForecastWeather = await getWeatherData("forecast", {
      lat,
      lon,
      units: searchParams.units,
    }).then((d) => formatForecastWeather(dt, timezone, d.list));

    return { ...formattedCurrentWeather, ...formattedForecastWeather };
  } catch (error) {
    console.error("Error getting formatted weather data:", error);
    return null;
  }
};

export default getFormattedWeatherData;
