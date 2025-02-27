"use client";

import { DataTable } from "./data-table";
import { columns } from "./columns";
import { deleteWeatherData } from "../../lib/weather";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { WeatherData } from "@prisma/client";
import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

interface WeatherClientProps {
  weatherData: WeatherData[];
}

export function WeatherClient({ weatherData }: WeatherClientProps) {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const { message } = await deleteWeatherData();
      setDeleteStatus({ message, type: "success" });
      router.refresh();
    } catch (error) {
      setDeleteStatus({
        message:
          error instanceof Error
            ? error.message
            : "Failed to delete weather data",
        type: "error",
      });
    } finally {
      setIsDeleting(false);
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
          {weatherData.length > 0 && (
            <Button
              className="border border-red-500"
              variant="destructive"
              onClick={() => setIsDrawerOpen(true)}
            >
              Delete All Data
            </Button>
          )}
        </div>
      </div>
      <Separator />
      <DataTable columns={columns} data={weatherData} />

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent className="max-w-sm mx-auto">
          <DrawerHeader>
            <DrawerTitle>Delete Weather Data</DrawerTitle>
            <DrawerDescription>
              {deleteStatus
                ? deleteStatus.message
                : "Are you sure you want to delete all weather data? This action cannot be undone."}
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter className="pt-2">
            {!deleteStatus ? (
              <>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete All Data"}
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </>
            ) : (
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
