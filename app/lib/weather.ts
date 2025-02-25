import { WeatherData } from "@prisma/client";
import { headers } from "next/headers";

export async function getWeatherData(): Promise<WeatherData[]> {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const response = await fetch(`${protocol}://${host}/api/weather`, {
    //cache: "no-store",
    next: { tags: ["weather"] },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch weather data: ${response.statusText}`);
  }

  return response.json();
}
