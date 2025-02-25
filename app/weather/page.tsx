import { Suspense } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getWeatherData } from "../lib/weather";
import Loading from "./loading";
import { Separator } from "@/components/ui/separator";

export default async function Weather() {
  const weatherData = await getWeatherData();

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Weather Data</h1>
        <p className="text-muted-foreground">
          Historical weather data for the golf course
        </p>
      </div>
      <Separator />
      <Suspense fallback={<Loading />}>
        <DataTable columns={columns} data={weatherData} />
      </Suspense>
    </div>
  );
}
