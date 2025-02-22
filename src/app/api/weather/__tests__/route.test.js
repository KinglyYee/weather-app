import { GET } from "../route";
import axios from "axios";
import { NextResponse } from "next/server";

jest.mock("axios");
jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn(),
  },
}));

describe("Weather API GET function", () => {
  const mockRequest = (location) => ({
    url: `http://localhost?location=${location}`,
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return error if location is missing", async () => {
    const request = mockRequest("");
    await GET(request);

    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: "Location is required" },
      { status: 400 },
    );
  });

  it("should return error if API_KEY or BASE_URL is missing", async () => {
    process.env.TOMORROW_API_KEY = "";
    process.env.TOMORROW_API_BASE_URL = "";

    const request = mockRequest("Toronto");
    await GET(request);

    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: "Missing API configuration" },
      { status: 500 },
    );
  });

  it("should return mocked weather data for a valid location", async () => {
    process.env.TOMORROW_API_KEY = "fake-api-key";
    process.env.TOMORROW_API_BASE_URL = "https://api.tomorrow.io";

    const mockData = {
      temperatureAvg: 25,
      weatherCodeMax: 1000,
      humidityAvg: 60,
      windGustAvg: 10,
      precipitationProbabilityAvg: 20,
    };

    axios.get.mockResolvedValue({ data: mockData });

    const request = mockRequest("Toronto");
    await GET(request);

    expect(NextResponse.json).toHaveBeenCalledWith(mockData, { status: 200 });
  });

  it("should return error if there is an error fetching weather data", async () => {
    axios.get.mockRejectedValue(new Error("Network error"));

    const request = mockRequest("Toronto");
    await GET(request);

    expect(NextResponse.json).toHaveBeenCalledWith(
      { error: "Failed to retrieve weather data", details: "Network error" },
      { status: 500 },
    );
  });
});
