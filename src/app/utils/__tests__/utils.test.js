import { formatDate, getIconFromWeatherCode } from "../utils";

describe("Utility functions", () => {
  it("should format date correctly", () => {
    const inputDate = "2025-02-21T12:00:00Z";
    const expectedDate = "Friday, February 21, 2025";

    const formattedDate = formatDate(inputDate);
    expect(formattedDate).toBe(expectedDate);
  });

  it("should get correct icon from weather code", () => {
    const weatherCode = 1000;
    const expectedIconPath = "/assets/color/clear_day.svg";

    const iconPath = getIconFromWeatherCode(weatherCode);
    expect(iconPath).toBe(expectedIconPath);
  });

  it("should returns default sunny if weather code does not exist", () => {
    const invalidWeatherCode = 1; // Invalid weather code
    const expectedIconPath = "/assets/color/clear_day.svg";

    const iconPath = getIconFromWeatherCode(invalidWeatherCode);
    expect(iconPath).toBe(expectedIconPath);
  });

  test("should return icon for a different valid weather code", () => {
    const weatherCode = 1101;
    const expectedIconPath = "/assets/color/partly_cloudy_day.svg";

    const iconPath = getIconFromWeatherCode(weatherCode);
    expect(iconPath).toBe(expectedIconPath);
  });
});
