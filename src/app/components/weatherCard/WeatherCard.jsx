import React from "react";
import styles from "./WeatherCard.module.scss";
import { WeatherCode } from "../../TomorrowApiWeatherCode";
import { getIconFromWeatherCode, formatDate } from "@/app/utils/utils";
import Image from "next/image";

const WeatherCard = ({ time, values, location }) => {
  const {
    temperatureAvg,
    weatherCodeMax,
    humidityAvg,
    windGustAvg,
    precipitationProbabilityAvg,
  } = values;

  const formattedDate = formatDate(time);
  const iconPath = getIconFromWeatherCode(weatherCodeMax);

  return (
    <section
      className={styles.container}
      aria-label="Weather Information for the selected location"
    >
      {/* Left Section - Main Weather Info */}
      <header className={styles.leftSection}>
        <h2 className={styles.date} aria-label="Date of forecast">
          {formattedDate}
        </h2>
        <h2 className={styles.city} aria-label="City">
          {location}
        </h2>
        <h2 className={styles.temperature} aria-label="Average temperature">
          {temperatureAvg}°C
        </h2>
        <Image
          src={iconPath}
          alt={`Weather code ${weatherCodeMax}`}
          width={100}
          height={100}
          aria-label="Weather icon"
        />
        <p className={styles.weatherCode} aria-label="Weather description">
          {WeatherCode[weatherCodeMax]}
        </p>
      </header>
      {/* Right Section - Additional Weather Details */}
      <aside
        className={styles.rightSection}
        aria-label="Additional weather details"
      >
        <article className={styles.infoBox} aria-label="Wind Gust">
          <h3>Wind</h3>
          <span>{windGustAvg} km/h</span>
        </article>
        <article className={styles.infoBox} aria-label="Humidity Level">
          <h3>Humidity</h3>
          <span>{humidityAvg}%</span>
        </article>
        <article
          className={styles.infoBox}
          aria-label="Precipitation Probability"
        >
          <h3>Precipitation</h3>
          <span>{precipitationProbabilityAvg}%</span>
        </article>
      </aside>
    </section>
  );
};

export default WeatherCard;
