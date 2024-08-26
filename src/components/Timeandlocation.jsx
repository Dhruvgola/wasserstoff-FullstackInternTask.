import React from "react";

const Timeandlocation = ({
  weather: { formattedLocalTime, name, country },
}) => {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center my-6">
        <p className="text-xs tiny:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-extralight">
          {formattedLocalTime}
        </p>
      </div>
      <div className="flex items-center justify-center my-3">
        <p className="text-sm tiny:text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-medium">
          {`${name}, ${country}`}
        </p>
      </div>
    </div>
  );
};

export default Timeandlocation;
