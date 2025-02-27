import { Suspense } from "react";
import { getWeatherData } from "../lib/weather";
import Loading from "./loading";
import { WeatherClient } from "./weather-client";

export default async function Weather() {
  const weatherData = await getWeatherData();

  return (
    <div className="space-y-6 p-6">
      <Suspense fallback={<Loading />}>
        <WeatherClient weatherData={weatherData} />
      </Suspense>
    </div>
  );
}
