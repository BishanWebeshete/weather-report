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
        `https://api.openweathermap.org/geo/1.0/direct?q=${value},&limit=5&appid=36ce15eca6468e2e57e9d5f009b5a5ba`
      );
      if (!response.ok) {
        throw new Error(`Bad Server Repsonse, ${response.status}`);
      }
      const jsonData = await response.json();
      setOptions(jsonData);
    } catch (e) {
      console.error(e);
    }
  };

  const getForecast = async (city: OptionType) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=imperial&appid=36ce15eca6468e2e57e9d5f009b5a5ba`
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
    const value = e.target.value.trimStart();
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
