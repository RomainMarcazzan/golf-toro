import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { prisma } from "@/app/lib/db";
import * as cheerio from "cheerio";
import path from "path";

interface WeatherData {
  timestamp: Date;
  temperatureAvg: number | null;
  temperatureMin: number | null;
  temperatureMax: number | null;
  humidityAvg: number | null;
  humidityMin: number | null;
  humidityMax: number | null;
  radiationAvg: number | null;
  radiationMin: number | null;
  radiationMax: number | null;
  windAvg: number | null;
  windMin: number | null;
  windMax: number | null;
  dewPointAvg: number | null;
  dewPointMin: number | null;
  dewPointMax: number | null;
  precipitation: number | null;
  et: number | null;
}

export async function POST(req: NextRequest) {
  try {
    // Ensure request is a multipart form
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json(
        { error: "Invalid content type" },
        { status: 400 }
      );
    }

    // Read formData and get file
    const formData = await req.formData();
    const file = formData.get("htmlFile") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Save the uploaded file temporarily
    const uploadDir = path.join(process.cwd(), "public/uploads");
    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, file.name);
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    await writeFile(filePath, fileBuffer);

    // Parse the HTML file with Cheerio
    const htmlContent = fileBuffer.toString("utf-8");
    const $ = cheerio.load(htmlContent);

    // Helper function to parse numeric values safely
    const parseNumber = (text: string | null | undefined) => {
      if (!text) return null;
      const num = parseFloat(text.replace(/[^\d.-]/g, ""));
      return isNaN(num) ? null : num;
    };

    // Debug table structure
    console.log("Table structure:");
    console.log("Number of tables found:", $("table").length);
    console.log("Number of rows found:", $("tr").length);

    // Extract data from the table
    const weatherData: WeatherData[] = [];
    const START_ROW = 9; // Start with first data row after headers

    console.log("Starting data extraction...");

    // Process all rows after the header
    const rows = $("tr").toArray().slice(START_ROW);

    for (let index = 0; index < rows.length; index++) {
      const row = rows[index];
      if (!row) {
        console.log(`Skipping row ${index} - Row is null`);
        continue;
      }
      // Get all cells including empty ones
      const cells = $(row).find("td");
      const cellContents = cells.map((i, cell) => $(cell).text().trim()).get();

      // Skip rows without enough data
      if (cellContents.length < 24) {
        continue;
      }

      // Get timestamp from the second cell
      const rawTimestamp = cellContents[1];
      if (!rawTimestamp) {
        console.log("Skipping row - empty timestamp");
        continue;
      }

      // Parse timestamp (DD/MM/YYYY HH:mm:ss)
      const [datePart] = rawTimestamp.split(" ");
      const [day, month, year] = datePart.split("/");

      // Create UTC date (to avoid timezone issues)
      const timestamp = new Date(
        Date.UTC(
          parseInt(year),
          parseInt(month) - 1, // Months are 0-based
          parseInt(day),
          0,
          0,
          0
        )
      );

      console.log(`Parsed timestamp: ${timestamp.toISOString()}`);

      // Debug empty cells
      cellContents.forEach((content, i) => {
        if (!content) {
          console.log(`Empty content at cell index ${i}`);
        }
      });

      const entry = {
        timestamp,
        temperatureAvg: parseNumber(cellContents[2] || null),
        temperatureMin: parseNumber(cellContents[3] || null),
        temperatureMax: parseNumber(cellContents[4] || null),
        humidityAvg: parseNumber(cellContents[6] || null),
        humidityMin: parseNumber(cellContents[7] || null),
        humidityMax: parseNumber(cellContents[8] || null),
        radiationAvg: parseNumber(cellContents[10] || null),
        radiationMin: parseNumber(cellContents[11] || null),
        radiationMax: parseNumber(cellContents[12] || null),
        windAvg: parseNumber(cellContents[14] || null),
        windMin: parseNumber(cellContents[15] || null),
        windMax: parseNumber(cellContents[16] || null),
        dewPointAvg: parseNumber(cellContents[18] || null),
        dewPointMin: parseNumber(cellContents[19] || null),
        dewPointMax: parseNumber(cellContents[20] || null),
        precipitation: parseNumber(
          cellContents[cellContents.length - 2] || null
        ), // Use second-to-last cell
        et: parseNumber(cellContents[cellContents.length - 1] || null), // Use last cell
      };

      // Debug output to verify
      console.log("Row values:", {
        precipValue: cellContents[cellContents.length - 2], // Should show values like "0.00", "1.00"
        etValue: cellContents[cellContents.length - 1], // Should show values like "1.7036"
      });

      // Only add if we have valid timestamp
      if (entry.timestamp) {
        weatherData.push(entry);
        console.log(`Successfully processed row ${index}`);
      } else {
        console.log(`Skipping row ${index} - Invalid timestamp`);
      }
    }

    console.log(`\nTotal rows processed: ${weatherData.length}`);

    if (weatherData.length === 0) {
      return NextResponse.json(
        { error: "No valid data found in the file" },
        { status: 400 }
      );
    }

    // Get all existing timestamps from the database
    const existingData = await prisma.weatherData.findMany({
      where: {
        timestamp: {
          in: weatherData.map((entry) => entry.timestamp),
        },
      },
      select: {
        timestamp: true,
      },
    });

    // Create a Set of existing timestamps for faster lookup
    const existingTimestamps = new Set(
      existingData.map((entry) => entry.timestamp.toISOString())
    );

    // Filter out entries that already exist
    const newData = weatherData.filter(
      (entry) => !existingTimestamps.has(entry.timestamp.toISOString())
    );

    console.log(
      `Found ${weatherData.length - newData.length} existing entries`
    );
    console.log(`Inserting ${newData.length} new entries`);

    if (newData.length > 0) {
      // Insert only new data into PostgreSQL via Prisma
      await prisma.weatherData.createMany({ data: newData });
    }

    return NextResponse.json({
      message: "File processed successfully",
      totalProcessed: weatherData.length,
      newEntriesAdded: newData.length,
    });
  } catch (error) {
    console.error("Error processing file:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
