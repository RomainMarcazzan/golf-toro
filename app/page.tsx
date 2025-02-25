import { getWeatherData } from "./lib/weather";
import { WeatherCharts } from "@/components/WeatherCharts";

export default async function Home() {
  const weatherData = await getWeatherData();

  const processedData = weatherData
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
    .slice(0, 7)
    .map((day) => ({
      date: new Date(day.timestamp).toLocaleDateString(),
      temperature: day.temperatureAvg,
      humidity: day.humidityAvg,
      precipitation: day.precipitation,
    }))
    .reverse();

  return (
    <div className="flex flex-col gap-6 p-8">
      <h1 className="text-3xl font-bold">Weather Dashboard</h1>
      <WeatherCharts data={processedData} />
    </div>
  );
}
