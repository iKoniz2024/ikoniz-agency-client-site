"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function ProductDetailSkeleton() {
  return (
    <div className="px-4 md:px-20 max-w-[1440px] mx-auto mb-10">
      {/* Heading Skeleton */}
      <div className="my-5 space-y-3">
        <Skeleton className="h-9 w-3/4" />
        <div className="flex gap-4 items-center">
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-6 w-64" />
        </div>
      </div>

      {/* Gallery Skeleton */}
      <div className="my-5 w-full grid grid-cols-2 gap-4">
        <Skeleton className="col-span-2 md:col-span-1 h-96 rounded-lg" />
        <div className="col-span-2 md:col-span-1 grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-44 rounded-lg" />
          ))}
        </div>
      </div>

      {/* Mobile Form Skeleton */}
      <div className="block md:hidden mb-8">
        <Skeleton className="h-96 w-full rounded-xl" />
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row w-full gap-8">
        {/* Left Content (3/4 width) */}
        <div className="w-full md:w-3/4 order-2 md:order-1 space-y-8">
          {/* Overview Skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-7 w-32" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-4/5" />
            <Skeleton className="h-7 w-32 mt-6" />
            <div className="flex flex-wrap gap-4">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="sm:w-[calc(50%-1rem)] w-full flex gap-4 p-4"
                >
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Meeting Point Skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-7 w-40" />
            <Skeleton className="h-80 w-full rounded-lg" />
          </div>

          {/* Itinerary Skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-7 w-32" />
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-64 w-full rounded-lg mt-2" />
              </div>
            ))}
          </div>

          {/* Queries Skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-7 w-40" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton className="h-48 w-full rounded-xl" />
              <Skeleton className="h-48 w-full rounded-xl" />
            </div>
          </div>
        </div>

        {/* Right Sidebar Form (1/4 width) */}
        <div className="w-full md:w-1/4 order-1 md:order-2 mb-8">
          <div className="hidden md:block sticky top-28">
            <Skeleton className="h-[500px] w-full rounded-xl" />
          </div>
        </div>
      </div>

      {/* Related Products Skeleton */}
      <div className="w-full mt-8 space-y-4">
        <Skeleton className="h-7 w-48" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-64 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}
