import React from "react";
import { ForecastType } from "../types/index";

type Props = {
  data: ForecastType;
};

export default function Forecast({ data }: Props) {
  return (
    <div>
      <p>Forecast</p>
    </div>
  );
}
