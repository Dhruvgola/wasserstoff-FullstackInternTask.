import React from "react";

const Forcast = ({ title, data }) => {
  return (
    <div>
      <div className="flex items-center justify-center mt-6">
        <p className="font-medium uppercase text-sm sm:text-base md:text-lg">
          {title}
        </p>
      </div>
      <hr className="my-1" />
      <div className="flex items-center justify-between flex-wrap">
        {data.map((d, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center m-2 sm:m-3 md:m-4 lg:m-5"
          >
            <p className="font-light text-xs sm:text-sm md:text-base">
              {new Date(d.date).toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' })}
            </p>
            <img
              src={d.icon}
              alt="weather icon"
              className="w-8 sm:w-10 md:w-12 lg:w-14 my-1"
            />
            <p className="font-medium text-xs sm:text-sm md:text-base lg:text-lg">
              {`${d.temp.toFixed()}°`}
            </p>
            <p className="font-light text-xs sm:text-sm md:text-base lg:text-lg">
              {d.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forcast;
