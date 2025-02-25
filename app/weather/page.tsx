import { Suspense } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getWeatherData } from "../lib/weather";
import Loading from "./loading";

export default async function Weather() {
  const weatherData = await getWeatherData();

  return (
    <div className="container mx-auto py-10 space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Weather Data</h1>
        <p className="text-muted-foreground">
          Historical weather data for the golf course
        </p>
      </div>

      <Suspense fallback={<Loading />}>
        <DataTable columns={columns} data={weatherData} />
      </Suspense>
    </div>
  );
}
