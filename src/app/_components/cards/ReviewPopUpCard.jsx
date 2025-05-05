"use client";
import { useState } from "react";
import axiosInstance from "@/lib/AxiosInstance";
import { toast } from "react-toastify";

function ReviewPopUpCard({ onClose, reviewedID }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSetRating = (value) => {
    setRating(value);
  };

  const handleSubmit = async () => {
    if (!rating || !comment) {
      alert("Please provide a rating and review.");
      return;
    }

    try {
      const response = await axiosInstance.post("/shop/reviews/", {
        product_id: reviewedID,
        rating,
        comment,
      });
      if (response?.data) {
        toast.success("Review successfully completed");
        onClose();
      }
    } catch (error) {
      toast.error("Review added Failed");
      throw new Error(`Review Error: ${error?.message}`);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[400px] md:w-[560px]">
        <h2 className="text-gray-800 text-2xl font-bold text-center">
          Write a Review and Give a Rating
        </h2>

        <div className="flex justify-center my-4">
          {[1, 2, 3, 4, 5].map((value) => (
            <svg
              key={value}
              onClick={() => handleSetRating(value)}
              className={`w-12 h-12 cursor-pointer ${
                value <= rating ? "text-yellow-500" : "text-gray-400"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>

        {/* Review Input */}
        <textarea
          rows="3"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="text-gray-500 rounded-md border w-full border-gray-300 p-3"
          placeholder="Write your review here..."
        />

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={onClose}
            className="py-2 px-6 text-black bg-gray-200 rounded-md font-bold"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="py-2 px-6 text-white bg-red-600 rounded-md font-bold"
            // disabled={isPending}
          >
            {/* {isPending ? "Submitting..." : "Done"} */}
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReviewPopUpCard;
