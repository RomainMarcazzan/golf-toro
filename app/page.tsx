import { WeatherCharts } from "@/components/WeatherCharts";
import { Button } from "@/components/ui/button";
import { getWeatherData } from "@/lib/weather";
import Link from "next/link";

export default async function Home() {
  const weatherData = await getWeatherData();

  if (!weatherData || weatherData.length === 0) {
    return (
      <div className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tight">No Weather Data</h1>
          <p className="text-muted-foreground max-w-md">
            There is no weather data available. Please upload a Toro HTML file
            to get started.
          </p>
          <Button asChild>
            <Link href="/upload">Upload Weather Data</Link>
          </Button>
        </div>
      </div>
    );
  }

  const processedData = weatherData
    .slice(0, 100)
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
    .reverse()
    .map((day) => ({
      date: new Date(day.timestamp).toLocaleDateString(),
      temperature: day.temperatureAvg ?? 0,
      humidity: day.humidityAvg ?? 0,
      precipitation: day.precipitation ?? 0,
      dewPoint: day.dewPointAvg ?? 0,
      wind: day.windAvg ?? 0,
      et: day.et ?? 0,
    }));

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
