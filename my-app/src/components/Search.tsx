import React, { ChangeEvent, FormEvent } from "react";
import { OptionType } from "../types/index";

type Props = {
  term: string;
  options: [];
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onOptionSelect: (option: OptionType) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
};

export default function Search({
  term,
  options,
  onInputChange,
  onOptionSelect,
  onSubmit,
}: Props) {
  return (
    <section
      className="w-full md:max-w-[500px] p-4 flex flex-col text-center items-center justify-center md:px-10
      lg:p-24 h-full lg:h-[500px] bg-white bg-opacity-20 backdrop-blur-lg drop-shadow-lg rounded text-zinc-700"
    >
      <h1 className="text-4xl font-thin">
        Weather <span className="font-black">Report</span>
      </h1>
      <p className="text-sm mt-2">
        Please Enter a city, and choose an option from the dropdown
      </p>
      <div className="relative flex mt-10 md:mt-4">
        <form onSubmit={onSubmit}>
          <input
            required
            type="text"
            value={term}
            className="px-2 py-1 rounded-l-md border-2 border-white"
            onChange={onInputChange}
          />
          <ul className="absolute top-9 bg-white ml-1 rounded-b-md">
            {options.map((option: OptionType, index: number) => (
              <li key={`${option.name}-${index}`}>
                <button
                  className="text-left text-sm w-full hover:bg-zinc-700 hover:text-white
                px-2 py-1 cursor-pointer"
                  onClick={() => onOptionSelect(option)}
                >
                  {option.name}, {option.state}, {option.country}
                </button>
              </li>
            ))}
          </ul>
          <button
            type="submit"
            className="rounded-r-md border-2 border-zinc-100 hover:border-zinc-500
        text-zinc-100 px-2 py-1 cursor-pointer"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
}
