import { Skeleton } from "@/components/ui/skeleton";
import React from "react";


const BookingLoader = () => {
  return (
    <div className="p-6 space-y-8">
      <div className="flex justify-between items-center">
        <Skeleton className="h-9 w-48 rounded-lg" />
        <Skeleton className="h-10 w-32 rounded-lg" />
      </div>

      <div className="space-y-4">
        <Skeleton className="h-7 w-64 rounded-lg" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-24 rounded-lg" />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <Skeleton className="h-7 w-64 rounded-lg" />
        <div className="space-y-2">
          <div className="grid grid-cols-4 gap-4">
            <Skeleton className="h-10 rounded-lg" />
            <Skeleton className="h-10 rounded-lg" />
            <Skeleton className="h-10 rounded-lg" />
            <Skeleton className="h-10 rounded-lg" />
          </div>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="grid grid-cols-4 gap-4">
              <Skeleton className="h-12 rounded-lg" />
              <Skeleton className="h-12 rounded-lg" />
              <Skeleton className="h-12 rounded-lg" />
              <Skeleton className="h-12 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BookingLoader;
