import { getWeatherData } from "@/app/lib/weather";
import { WeatherCharts } from "@/components/WeatherCharts";

export default async function Home() {
  const weatherData = await getWeatherData();

  const processedData = weatherData
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
    .slice(0, 100)
    .map((day) => ({
      date: new Date(day.timestamp).toLocaleDateString(),
      temperature: day.temperatureAvg ?? 0,
      humidity: day.humidityAvg ?? 0,
      precipitation: day.precipitation ?? 0,
      dewPoint: day.dewPointAvg ?? 0,
      wind: day.windAvg ?? 0,
      et: day.et ?? 0,
    }))
    .reverse();

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Weather Dashboard
          </h1>
          <p className="text-muted-foreground">
            Overview of temperature, humidity and precipitation data
          </p>
        </div>
        <WeatherCharts data={processedData} />
      </div>
    </div>
  );
}
