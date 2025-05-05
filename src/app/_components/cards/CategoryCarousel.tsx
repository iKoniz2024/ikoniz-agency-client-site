"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

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

function CategoryCarousel({ data }: { data: any[] }) {
  const sliderRef = useRef<Slider>(null);

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
            return (
              <div key={activity.id} className="py-2">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" // Added zoom effect
                      src={activity.image || "/default-image.jpg"}
                      alt={activity.name || "Activity image"}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={false}
                      loading="lazy"
                    />

                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h2 className="text-lg font-bold mb-2 line-clamp-2">
                      {activity.name || "Untitled"}
                    </h2>
                  </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}

export default CategoryCarousel;
