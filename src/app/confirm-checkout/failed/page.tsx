"use client";

import { useSearchParams } from "next/navigation";
import MainLayout from "@/layout/MainLayout";
import Link from "next/link";
import { Suspense } from "react";

const FailedPage = () => {
  return (
    <MainLayout>
      <div className="mx-10 lg:mx-20 my-10">
        <h1 className="text-2xl font-bold text-red-600">Payment Failed</h1>
        <p className="mt-4">
          Sorry, your payment could not be processed. Please try again or contact support.
        </p>

        <Suspense fallback={<p>Loading...</p>}>
          <ErrorDetails />
        </Suspense>
      </div>
    </MainLayout>
  );
};

const ErrorDetails = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const apiType = searchParams.get("api-type");

  return (
    <div className="mt-6 p-6 border border-red-200 bg-red-50 rounded-lg">
      <h2 className="text-lg font-semibold">Error Details</h2>
      <p className="mt-2 text-sm text-gray-700">Booking ID: {id || "N/A"}</p>
      <p className="mt-2 text-sm text-gray-700">API Type: {apiType || "N/A"}</p>

      <div className="mt-6">
        <Link
          href={`/confirm-checkout?id=${id}`}
          className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Retry Payment
        </Link>
      </div>
    </div>
  );
};

export default FailedPage;
