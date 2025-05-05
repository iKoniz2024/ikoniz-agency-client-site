"use client"; // Mark this as a client component

import React, { useEffect, useState } from "react";
import { TfiEraser } from "react-icons/tfi";
import ReviewCard from "../../_components/cards/ReviewCard";
import ReviewedCard from "../../_components/cards/ReviewedCard";
import axiosInstance from "@/lib/AxiosInstance";

const MyReviews = () => {
  const [reviewsList, setReviewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await axiosInstance.get(`/shop/reviews/`);
        setReviewsList(res?.data?.data?.results || []);
      } catch (error) {
        setReviewsList([]);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold ">My Reviews</h1>
        <button className="text-gray-500 hover:text-gray-700 flex justify-center items-center gap-2 text-[14px]">
          <TfiEraser />
          Clear All
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : reviewsList.length > 0 ? (
        reviewsList.map((review, index) => (
          <ReviewCard key={index + 1} reviewData={review} />
        ))
      ) : (
        <p>No reviews found.</p>
      )}
      {/* <ReviewedCard /> */}
    </div>
  );
};

export default MyReviews;
