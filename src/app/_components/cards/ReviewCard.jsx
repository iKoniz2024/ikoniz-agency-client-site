"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaCalendar, FaUsers } from "react-icons/fa6";
import { TfiEraser } from "react-icons/tfi";
import ReviewPopUpCard from "./ReviewPopUpCard";

function ReviewCard({ reviewData }) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewedID, setReviewedID] = useState(0);

  // Extract data from reviewData
  const {
    id,
    user,
    product_title,
    product_image, 
    product_duration,
    created_at,
    product_price,
    rating,
    comment,
  } = reviewData || {};

  // Function to format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Function to handle the button click
  const handleWriteReviewClick = (id) => {
    setReviewedID(id);
    setShowReviewForm(true);
  };

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="flex flex-col sm:flex-row items-start">
            {/* Product Image */}
            <div className="relative w-full sm:w-32 h-40 sm:h-36 mb-4 sm:mb-0 mr-0 sm:mr-4">
              <Image
                src={product_image  || "/default-image.jpg"}
                alt={product_title}
                layout="fill"
                className="object-cover rounded-md"
              />
              {/* <span className="absolute top-2 left-2 bg-[#F8B101] text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                Visited
              </span> */}
            </div>

            {/* Details */}
            <div>
              <h3 className="text-lg font-bold mb-1">{product_title}</h3>
              <p className="text-gray-500 text-sm flex items-center mb-1">
                ⏰ {product_duration}
              </p>
              <p className="text-gray-500 text-sm flex items-center mb-4">
                <FaCalendar className="mr-2" /> {formatDate(created_at)}
              </p>
              <p className="text-gray-900 text-sm font-bold">
                Price: €{product_price}
              </p>
              <p className="text-gray-900 text-sm font-bold">
                Rating: ⭐ {rating}/5
              </p>
              <p className="text-gray-700 text-sm italic">"{comment}"</p>
            </div>
          </div>

          {/* Write Review Button */}
          {/* <div
            onClick={() => handleWriteReviewClick(id)}
            className="flex flex-col justify-center items-end sm:items-end mt-4 sm:mt-0 sm:pl-4 pt-4 sm:pt-0"
          >
            <p className="px-5 py-2 bg-black rounded-md text-white font-bold text-[12px] cursor-pointer">
              Write a Review
            </p>
          </div> */}
        </div>
      </div>

      {/* {showReviewForm && (
        <ReviewPopUpCard
          reviewedID={reviewedID}
          onClose={() => setShowReviewForm(false)}
        />
      )} */}
    </div>
  );
}

export default ReviewCard;
