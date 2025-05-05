"use client";
import { currencySymbols } from "@/lib/currencyContant";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineHeart, AiFillHeart, AiFillStar } from "react-icons/ai";

function ActivityList({ data }: { data: any[] }) {
  const formatPrice = (price: number, currencyCode: string) => {
    const symbol = currencySymbols[currencyCode] || currencyCode;
    return `${symbol}${price.toFixed(2)}`;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-10">
      {data.map((activity) => {
        const queryString = `?type=${activity?.api?.api_type}&id=${activity?.api?.id}`;
        const currencyCode = activity?.currency_type;
        
        return (
          <Link
            key={activity.id}
            href={`/details${queryString}`}
            className="bg-white rounded-lg overflow-hidden cursor-pointer hover:shadow-none transition-all duration-300 flex flex-col group" // Added group class
          >
            {/* Image Section with hover effect */}
            <div className="relative h-56 w-full overflow-hidden">
              <Image
                className="w-full h-full object-cover z-0 transition-transform duration-500 ease-in-out group-hover:scale-110" // Added transform properties
                src={activity.image || "/default-image.jpg"}
                alt={activity.title || "Activity image"}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={false}
              />

              {/* Favorite Icon */}
              <div 
                className="absolute top-2 right-2 p-2 rounded-full z-20 bg-white/30 backdrop-blur-sm hover:bg-white/50 transition-colors duration-200"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  // Handle favorite toggle here
                }}
              >
                {activity.is_favorite ? (
                  <AiFillHeart size={24} color="red" />
                ) : (
                  <AiOutlineHeart
                    size={24}
                    color="white"
                    className="drop-shadow-md"
                  />
                )}
              </div>

              {/* Discount Badge */}
              {activity.has_discount && (
                <div className="absolute top-2 left-2 bg-green-700 bg-opacity-70 text-white text-xs px-2 py-1 rounded-md font-bold z-20">
                  {activity.discount_percent}% OFF
                </div>
              )}

              {/* Rating Section */}
              {activity?.total_reviews > 0 && (
                <div className="absolute bottom-2 right-2 flex items-center bg-black bg-opacity-70 text-white px-2 py-1 rounded-lg z-20">
                  <AiFillStar size={16} color="#FF9900" />
                  <p className="ml-1 font-bold text-sm">
                    {activity?.avg_rating?.toFixed(1)}
                  </p>
                  <p className="ml-1 text-xs opacity-80">
                    ({activity?.total_reviews})
                  </p>
                </div>
              )}

              {/* Category Label */}
              {activity.category && (
                <div className="absolute bottom-2 left-2 bg-red-600 text-white text-xs px-3 py-1 rounded-md font-bold z-20">
                  {activity.category}
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="p-4 flex flex-col flex-grow">
              {/* Title */}
              <h2 className="text-lg font-bold mb-2">
                {activity?.title || "Untitled"}
              </h2>

              {/* Duration and Small group */}
              <p className="text-sm text-gray-600 mb-4">
                {activity?.duration || "N/A"} &bull;{" "}
                {activity?.basePriceFor || "N/A"}
              </p>

              {/* Pricing Section */}
              <div className="mt-auto">
                {activity.has_discount ? (
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-red-600 font-bold text-xl">
                        {formatPrice(activity.discounted_price, currencyCode)}
                      </span>
                      <span className="text-xs text-gray-500 line-through">
                        {formatPrice(activity.price, currencyCode)}
                      </span>
                      <span className="text-xs bg-green-100 text-green-800 px-1 rounded">
                        Save {activity.discount_percent}%
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <p className="text-red-600 font-bold text-xl">
                      {formatPrice(activity.price, currencyCode)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default ActivityList;