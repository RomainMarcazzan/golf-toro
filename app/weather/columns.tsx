"use client";

import { ColumnDef } from "@tanstack/react-table";
import { WeatherData } from "@prisma/client";

function formatDate(date: Date): string {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${day}/${month}/${year}`;
}

export const columns: ColumnDef<WeatherData>[] = [
  {
    accessorKey: "timestamp",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("timestamp"));
      return formatDate(date);
    },
  },
  {
    accessorKey: "temperatureAvg",
    header: "Temp Avg (°C)",
  },
  {
    accessorKey: "humidityAvg",
    header: "Humidity Avg (%)",
  },
  {
    accessorKey: "windAvg",
    header: "Wind Avg (km/h)",
  },
  {
    accessorKey: "precipitation",
    header: "Precipitation (mm)",
  },
  {
    accessorKey: "et",
    header: "ET",
  },
];
