import React, { useState } from "react";
import { BiSearch, BiCurrentLocation } from "react-icons/bi";
import { toast } from "react-toastify";

const Inputs = ({ setQuery, setUnit }) => {
  const [city, setCity] = useState("");

  const handleSerchClick = async () => {
    if (city.trim() === "") {
      toast.error("Please enter a city name.");
      return;
    }

    try {
      const result = await setQuery({ q: city });

      if (result.success) {
        toast.success("City data fetched successfully.");
      } else {
        toast.error("City not found. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching city data:", error);
      toast.error("Invalid city name. Please enter a valid city name.");
    }
    if (error === result ) {
    }
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setQuery({ lat: latitude, lon: longitude });
      });
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-center my-6 space-y-4 md:space-y-0 md:space-x-4 px-4 md:px-8 lg:px-16">
      <div className="flex flex-row w-full md:w-3/4 items-center justify-center space-x-4">
        <input
          value={city}
          onChange={(e) => setCity(e.currentTarget.value)}
          type="text"
          placeholder="search by city..."
          className="text-gray-500 text-lg md:text-xl font-light p-2 w-full shadow-xl capitalize focus:outline-none placeholder:lowercase"
        />
        <BiSearch
          size={25}
          className="cursor-pointer transition ease-out hover:scale-125"
          onClick={handleSerchClick}
        />
        <BiCurrentLocation
          size={25}
          className="cursor-pointer transition ease-out hover:scale-125"
          onClick={handleLocationClick}
        />
      </div>
      <div className="flex flex-row w-full md:w-1/4 items-center justify-center space-x-2">
        <button
          className="text-xl md:text-2xl font-medium transition ease-out hover:scale-125"
          onClick={() => setUnit("metric")}
        >
          °C
        </button>
        <p className="text-xl md:text-2xl font-medium">|</p>
        <button
          className="text-xl md:text-2xl font-medium transition ease-out hover:scale-125"
          onClick={() => setUnit("imperial")}
        >
          °F
        </button>
      </div>
    </div>
  );
};
export default Inputs;
