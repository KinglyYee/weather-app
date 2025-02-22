import React from "react";
import styles from "./MiniWeatherCard.module.scss";
import { WeatherCode } from "../../TomorrowApiWeatherCode";
import { getIconFromWeatherCode, formatDate } from "@/app/utils/utils";
import Image from "next/image";

const MiniWeatherCard = ({ time, values }) => {
  const { temperatureAvg, weatherCodeMax } = values;
  const formattedNumericDate = formatDate(time);
  const iconPath = getIconFromWeatherCode(weatherCodeMax);

  return (
    <section
      className={styles.miniWeatherCard}
      aria-label="Mini Weather Card with weather details"
    >
      <div className={styles.cell} aria-label="Date">
        <h3 className={styles.date}>{formattedNumericDate}</h3>
      </div>

      <div className={styles.cell} aria-label="Weather icon and description">
        <Image
          src={iconPath}
          alt={`Weather code ${weatherCodeMax}`}
          width={50}
          height={50}
          className={styles.weatherIcon}
        />
        <p className={styles.weatherCode}>{WeatherCode[weatherCodeMax]}</p>
      </div>

      <div className={styles.cell} aria-label="Average temperature">
        <p className={styles.temperature}>{temperatureAvg}°C</p>
      </div>
    </section>
  );
};

export default MiniWeatherCard;
