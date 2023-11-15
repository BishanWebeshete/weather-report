import {useState, useEffect, ChangeEvent} from 'react';
import {OptionType, ForecastType} from '../types/index';

export const useForecast = () => {
  const [term, setTerm] = useState<string>("");
  const [options, setOptions] = useState<[]>([]);
  const [city, setCity] = useState<OptionType | null>(null);
  const [forecast, setForecast] = useState<ForecastType | null>(null);

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

  const getForecast = async (city: OptionType) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`
      );
      if (!response.ok) {
        throw new Error(`Bad Server Response ${response.status}`);
      }
      const jsonData = await response.json();
      const forecastData = {
        ...jsonData.city,
        list: jsonData.list.slice(0,16),
      }
      setForecast(forecastData);
      console.log(forecast);
    } catch (e) {
      console.error(e);
    }
  };

  const onSubmit = () => {
    if (!city) return;
    getForecast(city);
  };

  const onOptionSelect = async (option: OptionType) => {
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

  return {
    term, options, forecast, onInputChange, onOptionSelect, onSubmit
  }
}
