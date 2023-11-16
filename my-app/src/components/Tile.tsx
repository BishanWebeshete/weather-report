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
  feels: <WiThermometer />,
  humidity: <WiDust />,
  visibility: <FaRegEye />,
  pressure: <WiBarometer />,
  pop: <SiMoo />,
};

export default function Tile({ icon, title, info, description }: Prop) {
  const Icon = icons[icon];

  return (
    <div>
      <p>{Icon}</p>
    </div>
  );
}
