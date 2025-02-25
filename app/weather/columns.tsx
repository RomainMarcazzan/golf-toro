"use client";

import { ColumnDef } from "@tanstack/react-table";
import { WeatherData } from "@prisma/client";

export const columns: ColumnDef<WeatherData>[] = [
  {
    accessorKey: "timestamp",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("timestamp"));
      return date.toLocaleDateString();
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
