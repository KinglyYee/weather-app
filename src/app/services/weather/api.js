import axios from "axios";

const GATEWAY_URL = `${process.env.GATEWAY_URL}`;

const WEATHER_URL = (location) =>
  `${GATEWAY_URL}/api/weather?location=${location}`;

export const getWeatherData = async (location) =>
  await axios.get(WEATHER_URL(location));
