import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto py-10 border border-red-500">
      <Skeleton className="h-[500px] w-full" />
    </div>
  );
}
