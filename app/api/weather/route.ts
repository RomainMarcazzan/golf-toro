import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/db";

export async function GET() {
  try {
    const weatherData = await prisma.weatherData.findMany({
      orderBy: {
        timestamp: "desc",
      },
    });

    return NextResponse.json(weatherData);
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}
