import React, { ChangeEvent, useEffect, useState } from "react";
import { optionType } from "./types/index";
import "./App.css";

function App() {
  const [term, setTerm] = useState<string>("");
  const [options, setOptions] = useState<[]>([]);
  const [city, setCity] = useState<optionType | null>(null);

  const getSearchOptions = async (value: string) => {
    try {
      const response = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()},&limit=5&appid=${
          process.env.REACT_APP_API_KEY
        }`
      );
      if (!response.ok) {
        throw new Error(`Bad Server Repsonse, ${response.status}`);
      }
      const jsonData = await response.json();
      setOptions(jsonData);
      console.log(jsonData);
    } catch (e) {
      console.error(e);
    }
  };

  const getForecast = async (city: optionType) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`
      );
      if (!response.ok) {
        throw new Error(`Bad Server Response ${response.status}`);
      }
      const jsonData = await response.json();
      console.log(jsonData);
    } catch (e) {
      console.error(e);
    }
  };

  const onSubmit = () => {
    if (!city) return;
    getForecast(city);
  };

  const onOptionSelect = async (option: optionType) => {
    setCity(option);
  };

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setTerm(value);
    if (value === "") return;
    getSearchOptions(value);
  };

  useEffect(() => {
    if (city) {
      setTerm(city.name);
      setOptions([]);
    }
  }, [city]);

  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-sky-400 via-rose-400 to-lime-400 h-[100vh] w-full">
      <section
        className="w-full md:max-w-[500px] p-4 flex flex-col text-center items-center justify-center md:px-10
      lg:p-24 h-full lg:h-[500px] bg-white bg-opacity-20 backdrop-blur-lg drop-shadow-lg rounded text-zinc-700"
      >
        <h1 className="text-4xl font-thin">
          Weather <span className="font-black">Report</span>
        </h1>
        <p className="text-sm mt-2">
          Please Enter a location, and choose an option from the dropdown
        </p>
        <div className="relative flex mt-10 md:mt-4">
          <input
            type="text"
            value={term}
            className="px-2 py-1 rounded-l-md border-2 border-white"
            onChange={onInputChange}
          />
          <ul className="absolute top-9 bg-white ml-1 rounded-b-md">
            {options.map((option: optionType, index: number) => (
              <li key={`${option.name}-${index}`}>
                <button
                  className="text-left text-sm w-full hover:bg-zinc-700 hover:text-white
                px-2 py-1 cursor-pointer"
                  onClick={() => onOptionSelect(option)}
                >
                  {option.name}
                </button>
              </li>
            ))}
          </ul>
          <button
            className="rounded-r-md border-2 border-zinc-100 hover:border-zinc-500
        text-zinc-100 px-2 py-1 cursor-pointer"
            onClick={onSubmit}
          >
            Search
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;
