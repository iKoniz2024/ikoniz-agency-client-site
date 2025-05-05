"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BsDashLg } from "react-icons/bs";
import { FaYoutube, FaFacebookF, FaLinkedinIn, FaSearch } from "react-icons/fa";
import { FaCalendar, FaInstagram, FaTwitter } from "react-icons/fa6";
import { IoMdArrowBack } from "react-icons/io";
import { IoArrowForward } from "react-icons/io5";

const slides = [
  "/hero-img-1.jpg",
  "/hero-img-2.jpg",
  "/hero-img-3.jpg",
  "https://media.architecturaldigest.com/photos/66a951edce728792a48166e6/master/pass/GettyImages-955441104.jpg",
];

const HeroSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      const formattedSearch = searchTerm.trim().replace(/\s+/g, "_");
      router.push(`/products?search=${formattedSearch}`);
    }
  };

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Reset transitioning state after animation completes
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 500); // Match this with your CSS transition duration
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  return (
    <div className="w-full overflow- ">
      <div className="relative w-full mx-auto h-[500px] sm:h-[580px]">
        {/* Background slides container */}
        <div className="absolute inset-0 overflow-hidden">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
              style={{ backgroundImage: `url(${slide})` }}
            />
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 to-gray-900/40"></div>

        <div className="relative pt-28 max-w-7xl mx-auto px-4 sm:px-6 flex flex-col text-white h-full">
          <div className="mb-6">
            <p className="text-[14px] sm:text-[18px] uppercase mt-6 sm:mt-10 font-normal">
              — Blue Mountain Country Club And Resort
            </p>
            <h1 className="text-[42px] sm:text-[74px] font-extrabold">
              Treebo Tryst
            </h1>
            <div className="flex items-center flex-wrap">
              <p className="text-[12px] sm:text-[14px] mr-3 font-bold">
                Follow Us On
              </p>
              <BsDashLg className="font-bold mr-3" />
              <FaYoutube className="w-4 h-4 sm:h-3 mr-3" />
              <FaFacebookF className="w-4 h-4 sm:h-3 mr-3" />
              <FaTwitter className="w-4 h-4 sm:h-3 mr-3" />
              <FaInstagram className="w-4 h-4 sm:h-3 mr-3" />
              <FaLinkedinIn className="w-4 h-4 sm:h-3 mr-3" />
            </div>
          </div>

          <div className="absolute bottom-6 left-4 flex gap-3">
            <button
              onClick={prevSlide}
              disabled={isTransitioning}
              className="bg-black w-[35px] h-[35px] flex items-center justify-center rounded-full border-2 border-black disabled:opacity-50"
            >
              <IoMdArrowBack />
            </button>
            <button
              onClick={nextSlide}
              disabled={isTransitioning}
              className="border-2 border-black w-[35px] h-[35px] flex items-center justify-center rounded-full disabled:opacity-50"
            >
              <IoArrowForward />
            </button>
          </div>

          <form
            onSubmit={handleSearch}
            className="absolute w-full max-w-[90%] sm:max-w-[850px] shadow-lg bottom-[-70px] sm:bottom-[-90px] left-1/2 transform -translate-x-1/2 flex flex-col bg-white p-4 sm:p-5 mx-auto rounded-lg"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="w-full bg-[#FFFFFF] rounded-xl shadow-lg p-4 flex items-center space-x-4">
                <input
                  type="text"
                  placeholder="What Are You Going?"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-grow text-[#010A15] placeholder-[#010A15] outline-none border-none bg-transparent font-bold text-[15px]"
                />
                <button
                  type="button"
                  className="text-gray-700 hover:text-black"
                >
                  <FaCalendar />
                </button>
              </div>
              <button
                type="submit"
                className="bg-[#010A15] px-6 sm:px-9 py-2 sm:py-0 rounded-lg"
              >
                <FaSearch className="text-white" />
              </button>
            </div>

            <div className="mt-4 sm:mt-6 flex flex-col text-black">
              <p className="text-xs mb-3 font-bold">Popular Searches:</p>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {[
                  "Italy",
                  "Hop on hop off",
                  "Colosseum",
                  "Entry Tickets",
                  "Museums",
                  "open bus",
                ].map((item, index) => (
                  <button
                    key={index}
                    className="bg-[#F4F4F4] hover:bg-gray-300 text-black px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm"
                    onClick={() => {
                      const formattedItem = item.replace(/\s+/g, "_");
                      setSearchTerm(formattedItem);
                      router.push(`/products?search=${formattedItem}`);
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;