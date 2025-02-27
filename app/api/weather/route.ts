import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

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

export async function DELETE() {
  try {
    await prisma.weatherData.deleteMany({});
    return NextResponse.json({
      message: "All weather data deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete weather data:", error);
    return NextResponse.json(
      { error: "Failed to delete weather data" },
      { status: 500 }
    );
  }
}
