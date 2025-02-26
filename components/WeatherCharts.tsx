"use client";

import { Card } from "@/components/ui/card";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import {
  NameType,
  ValueType,
} from "recharts/types/component/DefaultTooltipContent";

interface WeatherData {
  date: string;
  temperature: number | null;
  humidity: number | null;
  precipitation: number | null;
  dewPoint: number | null;
  wind: number | null;
  et: number | null;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: WeatherData;
    dataKey: string;
  }>;
  label?: string;
}

const formatMeasurement = (value: number | null, unit: string) => {
  if (value === null) return "N/A";
  return `${value.toFixed(2)} ${unit}`;
};

const measurementUnits: Record<string, string> = {
  temperature: "°C",
  humidity: "%",
  precipitation: "mm",
  dewPoint: "°C",
  wind: "m/s",
  et: "mm",
};

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    const unit = measurementUnits[data.dataKey];

    return (
      <div className="bg-background border rounded-lg p-2 shadow-sm">
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-sm text-muted-foreground">
          {formatMeasurement(data.value, unit)}
        </p>
      </div>
    );
  }
  return null;
};

export function WeatherCharts({ data }: { data: WeatherData[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="p-4">
        <h3 className="mb-4">Temperature (°C)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="temperature" stroke="#ef4444" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-4">
        <h3 className="mb-4">Humidity (%)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="humidity" stroke="#3b82f6" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-4">
        <h3 className="mb-4">Precipitation (mm)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="precipitation" stroke="#22c55e" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-4">
        <h3 className="mb-4">Dew Point (°C)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="dewPoint" stroke="#a855f7" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-4">
        <h3 className="mb-4">Wind Speed (m/s)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="wind" stroke="#f97316" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-4">
        <h3 className="mb-4">ET (mm)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="et" stroke="#06b6d4" />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
