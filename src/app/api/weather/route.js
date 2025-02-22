import axios from "axios";
import { NextResponse } from "next/server";
import { mockData } from "@/app/mockData";
export async function GET(request) {
  try {
    // Get location from query params
    const { searchParams } = new URL(request.url);
    const location = searchParams.get("location");

    if (!location) {
      return NextResponse.json(
        { error: "Location is required" },
        { status: 400 },
      );
    }

    const API_KEY = process.env.TOMORROW_API_KEY;
    const BASE_URL = process.env.TOMORROW_API_BASE_URL;

    if (!API_KEY || !BASE_URL) {
      return NextResponse.json(
        { error: "Missing API configuration" },
        { status: 500 },
      );
    }

    const url = `${BASE_URL}?location=${encodeURIComponent(location)}&timesteps=1d&apikey=${API_KEY}`;

    const response = await axios.get(url);

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Error fetching weather data:", error);

    return NextResponse.json(
      { error: "Failed to retrieve weather data", details: error.message },
      { status: 500 },
    );
  }
}
