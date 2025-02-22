"use client";

import styles from "./styles/page.module.scss";
import WeatherCard from "./components/weatherCard/WeatherCard";
import MiniWeatherCard from "./components/miniWeatherCard/MiniWeatherCard";
import { useEffect, useState } from "react";
import SearchDropdownMenu from "./components/searchDropdownMenu/SearchDropdownMenu";
import { getWeatherData } from "./services/weather/api";
import Header from "./components/header/Header";

export default function Home() {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState("Toronto");

  const [today, ...otherDays] = weatherData?.timelines?.daily ?? [];

  useEffect(() => {
    getWeatherData(location).then((res) => {
      setWeatherData(res.data);
    });
  }, [location]);

  return (
    <main className={styles.container}>
      <section className={styles.header}>
        <Header />
      </section>
      <section className={styles.inputBox}>
        <SearchDropdownMenu
          location={location}
          setLocation={setLocation}
        />
      </section>
      {today && (
        <section className={styles.weatherCardContainer}>
          <WeatherCard {...today} location={location} />
        </section>
      )}
      {otherDays && (
        <section className={styles.miniWeatherCardsContainer}>
          {otherDays.map((data) => (
            <article key={data.time} className={styles.miniWeatherCard}>
              <MiniWeatherCard {...data} />
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
