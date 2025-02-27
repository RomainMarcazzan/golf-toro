"use client";

import { DataTable } from "./data-table";
import { columns } from "./columns";
import { deleteWeatherData } from "../lib/weather";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { WeatherData } from "@prisma/client";

interface WeatherClientProps {
  weatherData: WeatherData[];
}

export function WeatherClient({ weatherData }: WeatherClientProps) {
  const router = useRouter();

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete all weather data?")) {
      try {
        const { message } = await deleteWeatherData();
        alert(message);
        router.refresh();
      } catch (error) {
        console.error("Failed to delete weather data:", error);
        alert("Failed to delete weather data");
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Weather Data</h1>
          <p className="text-muted-foreground">
            Historical weather data for the golf course
          </p>
          <Button
            className="border border-red-500"
            variant="destructive"
            onClick={handleDelete}
          >
            Delete All Data
          </Button>
        </div>
      </div>
      <Separator />
      <DataTable columns={columns} data={weatherData} />
    </>
  );
}
