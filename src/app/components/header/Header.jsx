import React from "react";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header} aria-labelledby="headerTitle">
      <h1 id="headerTitle" className={styles.title}>
        Weather App
      </h1>
      <p className={styles.tagline} aria-label="Description of the weather app">
        Choose a city to view the weather forecast
      </p>
    </header>
  );
};

export default Header;
