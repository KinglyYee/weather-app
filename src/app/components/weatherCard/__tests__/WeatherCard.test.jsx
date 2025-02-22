import React from "react";
import { render, screen } from "@testing-library/react";
import WeatherCard from "../WeatherCard";
import { WeatherCode } from "../../../TomorrowApiWeatherCode";
import { formatDate } from "../../../utils/utils";

jest.mock("../../../utils/utils", () => ({
  formatDate: jest.fn(),
  getIconFromWeatherCode: jest
    .fn()
    .mockReturnValue("public/assets/color/clear_day.svg"),
}));

describe("WeatherCard Component", () => {
  const mockValues = {
    temperatureAvg: 25,
    weatherCodeMax: 1000,
    humidityAvg: 60,
    windGustAvg: 15,
    precipitationProbabilityAvg: 40,
  };
  const mockTime = "2025-02-21T12:00:00Z";
  const mockLocation = "Toronto";

  beforeEach(() => {
    formatDate.mockReturnValue("February 21, 2025");
  });

  it("should render WeatherCard component with correct information", () => {
    render(
      <WeatherCard
        time={mockTime}
        values={mockValues}
        location={mockLocation}
      />,
    );

    const locationElement = screen.getByText(mockLocation);
    const dateElement = screen.getByText("February 21, 2025");
    const temperatureElement = screen.getByText("25°C");

    expect(locationElement).toBeInTheDocument();
    expect(dateElement).toBeInTheDocument();
    expect(temperatureElement).toBeInTheDocument();

    const weatherIcon = screen.getByAltText("Weather code 1000");
    expect(weatherIcon).toBeInTheDocument();
    expect(weatherIcon).toHaveAttribute(
      "src",
      "public/assets/color/clear_day.svg",
    );

    const weatherDescription = screen.getByText(
      WeatherCode[mockValues.weatherCodeMax],
    );
    expect(weatherDescription).toBeInTheDocument();
  });

  it("should check the aria-labels for accessibility", () => {
    render(
      <WeatherCard
        time={mockTime}
        values={mockValues}
        location={mockLocation}
      />,
    );

    const weatherCardSection = screen.getByLabelText(
      "Weather Information for the selected location",
    );
    expect(weatherCardSection).toBeInTheDocument();

    const dateSection = screen.getByLabelText("Date of forecast");
    expect(dateSection).toBeInTheDocument();

    const locationSection = screen.getByLabelText("City");
    expect(locationSection).toBeInTheDocument();

    const temperatureSection = screen.getByLabelText("Average temperature");
    expect(temperatureSection).toBeInTheDocument();

    const weatherIconSection = screen.getByLabelText("Weather icon");
    expect(weatherIconSection).toBeInTheDocument();

    const weatherDescriptionSection = screen.getByLabelText(
      "Weather description",
    );
    expect(weatherDescriptionSection).toBeInTheDocument();

    const windSection = screen.getByLabelText("Wind Gust");
    expect(windSection).toBeInTheDocument();

    const humiditySection = screen.getByLabelText("Humidity Level");
    expect(humiditySection).toBeInTheDocument();

    const precipitationSection = screen.getByLabelText(
      "Precipitation Probability",
    );
    expect(precipitationSection).toBeInTheDocument();
  });

  it("should display the correct weather description based on weatherCodeMax", () => {
    render(
      <WeatherCard
        time={mockTime}
        values={mockValues}
        location={mockLocation}
      />,
    );

    const weatherDescription = screen.getByText(
      WeatherCode[mockValues.weatherCodeMax],
    );
    expect(weatherDescription).toBeInTheDocument();
  });
});
