"use client";
import ActivityList from "./_components/cards/ActivityList";
import ActivityCarousel from "./_components/cards/ActivityCarousel";
import HeroSlider from "./_components/HeroSlider";
import MainLayout from "@/layout/MainLayout";
import Heading from "./_components/Heading";
import BlogCard from "./_components/cards/BlogCard";
import GalleryGrid from "./_components/gelleryGrid/galleryGrid";
import SkeletonLoader from "./_components/SkeletonLoader";
import { useQuery } from "@tanstack/react-query";
import { useCurrency } from "@/lib/currencyContext";
import { getProductList } from "@/utils/get/get.action";
import ReelsCard from "./_components/cards/ReelsCard";

export default function Home({ initialData }: { initialData: any }) {
  const { currency } = useCurrency();
  const {
    data = initialData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["PRODUCT_LIST", currency],
    queryFn: () => getProductList(currency),
    initialData,
  });
  
  if (isLoading) {
    return (
      <MainLayout>
        <HeroSlider />
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20 pt-40 space-y-10">
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
        </div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <HeroSlider />
        <div className="flex justify-center items-center min-h-[60vh]">
          <p className="text-red-500 text-center">
            Error loading data. Please try again later.
          </p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <HeroSlider />
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20 pt-40">
        {data?.data?.popular_products?.length > 0 ? (
          data.data.popular_products.length < 4 ? (
            <>
              <Heading
                title="Trending 2023"
                description="Sost Brilliant Reasons Entrada should be your one-stop-one"
                showButtons={false}
              />
              <ActivityList data={data.data.popular_products} />
            </>
          ) : (
            <>
              <Heading
                title="Trending 2023"
                description="Sost Brilliant Reasons Entrada should be your one-stop-one"
                showButtons={false}
              />
              <ActivityCarousel data={data.data.popular_products} />
            </>
          )
        ) : null}

        {data?.data?.tours?.data && (
          <>
            <Heading
              title="Unforgettable cultural experiences"
              description="Sost Brilliant Reasons Entrada should be your one-stop-one"
              showButtons={false}
            />
            <ActivityList data={data.data.tours.data} />
          </>
        )}
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20 py-10">
        <Heading
          title="All Top sights you can't miss"
          description="Iconic Landmarks and Hidden Gems Awaiting Discovery"
          showButtons={false}
        />
        <GalleryGrid />
      </div>

      {/* {data?.data?.reels?.length > 0 && (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20 py-10">
          <Heading
            title="Reels"
            description="Check out our latest reels"
            showButtons={false}
          />
          {data?.data?.reels && <ReelsCard data={data?.data?.reels} />}
        </div>
      )} */}
      {data?.data?.blogs?.length > 0 && (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20 py-10">
          <Heading
            title="Blogs"
            description="Check out our latest blogs"
            showButtons={false}
          />
          {data?.data?.blogs && <BlogCard data={data?.data?.blogs} />}
        </div>
      )}
    </MainLayout>
  );
}
