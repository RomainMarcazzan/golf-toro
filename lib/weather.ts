import { WeatherData } from "@prisma/client";

export async function getWeatherData(): Promise<WeatherData[]> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/weather`, {
    cache: "no-store",
    next: { tags: ["weather"] },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch weather data: ${response.statusText}`);
  }

  return response.json();
}

interface DeleteWeatherResponse {
  message: string;
}

export async function deleteWeatherData(): Promise<DeleteWeatherResponse> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/weather`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete weather data: ${response.statusText}`);
  }

  return response.json();
}
