"use client";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineHeart,
  AiOutlineLeft,
  AiOutlineRight,
} from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import { currencySymbols, formatCurrency } from "@/lib/currencyContant";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

function ActivityCarousel({ data }: { data: any[] }) {
  const router = useRouter();
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "cubic-bezier(0.645, 0.045, 0.355, 1)",
    pauseOnHover: true,
    arrows: false,
    variableWidth: false,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          speed: 400,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          speed: 300,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          speed: 200,
        },
      },
    ],
  };

  return (
    <div className="py-10 relative">
      {/* Custom Navigation Arrows */}
      <div className="absolute -top-20 right-0 z-10 flex space-x-2">
          <button
            aria-label="Previous"
            onClick={() => sliderRef.current?.slickPrev()}
            className="p-2 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            <ArrowLeft className="w-4 h-4 text-gray-600" />
          </button>
          <button className="p-2 bg-gray-800 rounded-md hover:bg-gray-900">
            <ArrowRight
              onClick={() => sliderRef.current?.slickNext()}
              aria-label="Next"
              className="w-4 h-4 text-white"
            />
          </button>
      </div>

      <div className="-mx-2">
        <Slider ref={sliderRef} {...settings}>
          {data.map((activity) => {
            const queryString = `?type=${activity?.api?.api_type}&id=${activity?.api?.id}`;
            const currencyCode = activity?.currency_type || "USD";

            return (
              <div key={activity.id} className="py-2">
                <Link
                  href={`/details${queryString}`}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 flex flex-col h-full mx-2 group" // Added group and transition-all
                >
                  {/* Image Section with Hover Effect */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" // Added zoom effect
                      src={activity.image || "/default-image.jpg"}
                      alt={activity.title || "Activity image"}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={false}
                      loading="lazy"
                    />

                    {/* Favorite Icon with improved hover */}
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
                      <div className="absolute bottom-2 right-2 flex items-center bg-black bg-opacity-50 text-white px-3 py-1 rounded-lg z-20">
                        <AiFillStar size={20} color="#FF9900" />
                        <p className="ml-2 font-bold text-sm">
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
                    <h2 className="text-lg font-bold mb-2 line-clamp-2">
                      {activity.title || "Untitled"}
                    </h2>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {activity.duration || "N/A"}
                    </p>

                    {/* Pricing Section */}
                    <div className="mt-auto">
                      {activity.has_discount ? (
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <span className="text-red-600 font-bold text-xl">
                              {formatCurrency(
                                activity.discounted_price,
                                currencyCode
                              )}
                            </span>
                            <span className="text-xs text-gray-500 line-through">
                              {formatCurrency(activity.price, currencyCode)}
                            </span>
                            <span className="text-xs bg-green-100 text-green-800 px-1 rounded">
                              Save {activity.discount_percent}%
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <p className="text-red-600 font-bold text-xl">
                            {formatCurrency(activity.price, currencyCode)}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}

export default ActivityCarousel;
