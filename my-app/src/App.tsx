import React from "react";
import Search from "./components/Search";
import Forecast from "./components/Forecast";
import { useForecast } from "./hooks/useForecast";
import "./App.css";

function App() {
  const { term, options, forecast, onInputChange, onOptionSelect, onSubmit } =
    useForecast();

  return (
    <main className="flex justify-center items-center bg-gradient-to-br from-indigo-400 from-30% via-sky-500 via-50% to-emerald-400 to 90% h-[100vh] w-full">
      {forecast ? (
        <Forecast data={forecast} />
      ) : (
        <Search
          term={term}
          options={options}
          onInputChange={onInputChange}
          onOptionSelect={onOptionSelect}
          onSubmit={onSubmit}
        />
      )}
    </main>
  );
}

export default App;
