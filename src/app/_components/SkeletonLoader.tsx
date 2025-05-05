import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function SkeletonLoader() {
  return (
    <div>
       <Skeleton className="h-8 w-2/4 mb-2" />
       <Skeleton className="h-4 w-1/4 mb-4" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-[200px] w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
    </div>
  );
}

export default SkeletonLoader;
