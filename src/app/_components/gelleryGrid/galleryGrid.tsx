import React from "react";
import Image from "next/image";

const images = [
  { src: "/Rectangle8.png", title: "Sunset", subtitle: "Subtitle Is Here" }, // Top Left
  { src: "/Rectangle10.png", title: "See Beach", subtitle: "Subtitle Is Here" }, // Bottom Left
  { src: "/Rectangle7.png", title: "Tour Bus", subtitle: "Subtitle Is Here" }, // Center Large
  {
    src: "/Rectangle11.png",
    title: "Attractive Places",
    subtitle: "Subtitle Is Here",
  }, // Top Right
  { src: "/Rectangle9.png", title: "Boat Tour", subtitle: "Subtitle Is Here" }, // Bottom Right (Left)
  { src: "/Rectangle12.png", title: "Sports", subtitle: "Subtitle Is Here" }, // Bottom Right (Right)
];

const GalleryGrid = () => {
  return (
    <div className="pt-5 mb-2  max-h-[540px] overflow-hidden">
      {/* Desktop Layout */}
      <div className="hidden md:grid grid-cols-3 grid-rows-2 gap-4 w-full mx-auto ">
        {/* Left Column */}
        <div className="grid gap-4">
          {images.slice(0, 2).map((img, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-lg h-[242px]"
            >
              <Image
                src={img.src}
                alt={img.title}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-lg font-bold">{img.title}</h3>
                <p className="text-sm">{img.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Center Large Image (Fixed Height Issue) */}
        <div className="row-span-2 relative group overflow-hidden rounded-lg h-[500px]">
          <Image
            src={images[2].src}
            alt={images[2].title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-105"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h3 className="text-lg font-bold">{images[2].title}</h3>
            <p className="text-sm">{images[2].subtitle}</p>
          </div>
        </div>

        {/* Right Column */}
        <div className="grid gap-4">
          {/* Top Image */}
          <div className="relative group overflow-hidden rounded-lg h-[242px]">
            <Image
              src={images[3].src}
              alt={images[3].title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-lg font-bold">{images[3].title}</h3>
              <p className="text-sm">{images[3].subtitle}</p>
            </div>
          </div>

          {/* Bottom Two Small Images */}
          <div className="grid grid-cols-2 gap-4">
            {images.slice(4, 6).map((img, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-lg h-[242px]"
              >
                <Image
                  src={img.src}
                  alt={img.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-lg font-bold">{img.title}</h3>
                  <p className="text-sm">{img.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Layout (Better Image Sizes) */}
      <div className="grid md:hidden grid-cols-1 gap-4 max-w-3xl mx-auto">
        {images.map((img, index) => (
          <div
            key={index}
            className="relative group overflow-hidden rounded-lg h-[250px]"
          >
            <Image
              src={img.src}
              alt={img.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 hover:scale-105"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-lg font-bold">{img.title}</h3>
              <p className="text-sm">{img.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GalleryGrid;
