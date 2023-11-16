import React from "react";
import { ForecastType } from "../types/index";
import { BsFillSunriseFill } from "react-icons/bs";
import { TbSunset } from "react-icons/tb";
import { getSunTime } from "../helpers";
// import Tile from "../components/Tile";

type Props = {
  data: ForecastType;
};

const Degree = ({ temp }: { temp: number }) => {
  return (
    <span>
      {temp}
      <sup>o</sup>
    </span>
  );
};

export default function Forecast({ data }: Props) {
  const today = data.list[0];

  return (
    <div
      className="w-full md:max-w-[500px] py-4 md:py-4 md:px-10 lg:px-24 h-full lg:h-auto
    bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg"
    >
      <div className="mx-auto w-[300px]">
        <section className="text-center">
          <h2 className="text-2xl font-black">
            {data.name},<span className="font-thin">{data.country}</span>
          </h2>
          <h1 className="text-4xl font-extrabold">
            <Degree temp={Math.round(today.main.temp)} />
          </h1>
          <p className="text-sm">
            {today.weather[0].main} {today.weather[0].description}
          </p>
          <p className="text-sm">
            H: <Degree temp={Math.ceil(today.main.temp_max)} />
            L: <Degree temp={Math.floor(today.main.temp_min)} />
          </p>
        </section>
        <section className="flex overflow-x-scroll mt-4 pb-2 mb-5">
          {data.list.map((item, i) => (
            <div className="text-center w-[50px] flex-shrink-0" key={i}>
              <p className="text-sm">
                {i === 0 ? "Now" : new Date(item.dt * 1000).getHours()}
              </p>
              <img
                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt={`weather-icon-${item.weather[0].description}`}
              />
              <p className="text-sm font-bold">
                <Degree temp={Math.round(item.main.temp)} />
              </p>
            </div>
          ))}
        </section>
        <section className="flex justify-between">
          <div
            className="w-[140px] text-xs font-bold flex flex-col items-center bg-white/20
          backdrop-blur-lg rounded drop-shadow-lg py-4 mb-5"
          >
            <BsFillSunriseFill size={25} />
            <span className="mt-2">{getSunTime(data.sunrise)}</span>
          </div>
          <div
            className="w-[140px] text-xs font-bold flex flex-col items-center bg-white/20
          backdrop-blur-lg rounded drop-shadow-lg py-4 mb-5"
          >
            <TbSunset size={25} />
            <span className="mt-2">{getSunTime(data.sunset)}</span>
          </div>
          {/* <Tile icon="wind" /> */}
        </section>
      </div>
    </div>
  );
}
