import { weatherCodeMapping } from "../TomorrowApiWeatherCode";

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
};

export const getIconFromWeatherCode = (weatherCode) => {
  const baseURL = "/assets/color/";

  // Retrieve the file name for the given weather code
  const iconFileName = weatherCodeMapping[weatherCode] || "clear_day.svg";

  return `${baseURL}${iconFileName}`;
};
