"use client";
import { useSearchParams } from "next/navigation";
import MainLayout from "@/layout/MainLayout";
import Itinerary from "./Itinerary";
import Form from "./Form";
import Gallery from "./Gallery";
import Heading from "./Heading";
import MeetingPoint from "./MeetingPoint";
import Overview from "./Overview";
import Queries from "./Queries";
import { useGetProductDetails } from "@/hooks/get.hooks";
import { Suspense } from "react";
import RelatedProduct from "./RelatedProducts";
import { ProductDetailSkeleton } from "./ProductDetailLoader";
import ProductReview from "./ProductReview";

function DetailsContent() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const id = searchParams.get("id");

  const { data: tourData, isLoading } = useGetProductDetails(type, id as any);

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (!tourData?.data) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 md:px-20 flex justify-center items-center min-h-screen">
        <p className="text-xl text-gray-700">No data available.</p>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-20 max-w-[1440px] mx-auto">
      <Heading data={tourData?.data} />
      <Gallery data={tourData?.data} />

      {/* Mobile: Form first */}
      <div className="block md:hidden mb-8">
        <Form data={tourData?.data} />
      </div>

      <div className="flex flex-col md:flex-row w-full gap-8">
        <div className="w-full md:w-3/4 order-2 md:order-1">
          <Overview data={tourData?.data} />
          <MeetingPoint
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
            data={tourData?.data}
          />
          <Itinerary
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
            data={tourData?.data}
          />
          <Queries data={tourData?.data} />
        </div>

        {/* Desktop: Form in sidebar */}
        <div className="w-full md:w-1/4 order-1 md:order-2 mb-8">
          <div className="hidden md:block sticky top-28">
            <Form data={tourData?.data} />
          </div>
        </div>
      </div>

      {/* Related Products - Full width section */}
      <div className="w-full mt-6">
        <RelatedProduct data={tourData?.data} />
      </div>
      {/* Product Reviews */}
      <div className="w-full mt-2">
        <ProductReview product={tourData?.data} />
      </div>

    </div>
  );
}

function Details() {
  return (
    <MainLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <DetailsContent />
      </Suspense>
    </MainLayout>
  );
}

export default Details;
