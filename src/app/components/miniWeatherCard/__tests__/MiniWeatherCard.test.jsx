import React from "react";
import { render, screen } from "@testing-library/react";
import MiniWeatherCard from "../MiniWeatherCard";
import { WeatherCode } from "../../../TomorrowApiWeatherCode";
import { formatDate } from "../../../utils/utils";

jest.mock("../../../utils/utils", () => ({
  formatDate: jest.fn(),
  getIconFromWeatherCode: jest
    .fn()
    .mockReturnValue("public/assets/color/clear_day.svg"),
}));

describe("MiniWeatherCard Component", () => {
  const mockValues = {
    temperatureAvg: 25,
    weatherCodeMax: 1000,
  };
  const mockTime = "2025-02-21T12:00:00Z";

  beforeEach(() => {
    formatDate.mockReturnValue("February 21, 2025");
  });

  it("should render MiniWeatherCard component with date, weather, image, and temperature data", () => {
    render(<MiniWeatherCard time={mockTime} values={mockValues} />);

    const dateElement = screen.getByText("February 21, 2025");
    expect(dateElement).toBeInTheDocument();

    const weatherIcon = screen.getByAltText(`Weather code 1000`);
    expect(weatherIcon).toBeInTheDocument();
    expect(weatherIcon).toHaveAttribute(
      "src",
      "public/assets/color/clear_day.svg",
    );

    const temperatureElement = screen.getByText("25°C");
    expect(temperatureElement).toBeInTheDocument();
  });

  it("should have aria labels for accessibility", () => {
    render(<MiniWeatherCard time={mockTime} values={mockValues} />);

    const miniWeatherCard = screen.getByLabelText(
      "Mini Weather Card with weather details",
    );
    expect(miniWeatherCard).toBeInTheDocument();

    const dateSection = screen.getByLabelText("Date");
    expect(dateSection).toBeInTheDocument();

    const weatherSection = screen.getByLabelText(
      "Weather icon and description",
    );
    expect(weatherSection).toBeInTheDocument();

    const temperatureSection = screen.getByLabelText("Average temperature");
    expect(temperatureSection).toBeInTheDocument();
  });

  it("should display the correct weather code description", () => {
    render(<MiniWeatherCard time={mockTime} values={mockValues} />);

    const weatherDescription = screen.getByText(
      WeatherCode[mockValues.weatherCodeMax],
    );
    expect(weatherDescription).toBeInTheDocument();
  });
});
