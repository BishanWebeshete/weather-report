import React from "react";
import { FaWind } from "react-icons/fa6";
import { WiThermometer, WiBarometer, WiDust } from "react-icons/wi";
import { SiMoo } from "react-icons/si";
import { FaRegEye } from "react-icons/fa";

type Prop = {
  icon: "wind" | "feels" | "humidity" | "visibility" | "pressure" | "pop";
  title: string;
  info: string | JSX.Element;
  description: string;
};

const icons = {
  wind: <FaWind />,
  feels: <WiThermometer size={20} />,
  humidity: <WiDust size={25} />,
  visibility: <FaRegEye />,
  pressure: <WiBarometer size={25} />,
  pop: <SiMoo />,
};

export default function Tile({ icon, title, info, description }: Prop) {
  const Icon = icons[icon];

  return (
    <article
      className="w-[140px] h-[130px] text-zinc-700 bg-white/20 backdrop-blur-lg
    rounded drop-shadow-lg p-2 mb-5 flex flex-col justify-between"
    >
      <div className="flex items-center text-sm font-bold">
        {Icon} <h4 className="">{title}</h4>
      </div>
      <h3 className="mt-2 text-lg">{info}</h3>
      <p className="text-xs font-bold">{description}</p>
    </article>
  );
}
