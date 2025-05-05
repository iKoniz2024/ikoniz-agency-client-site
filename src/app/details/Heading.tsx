"use client";
import React, { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import { FaStar } from "react-icons/fa6";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import axiosInstance from "@/lib/AxiosInstance";
import { useAuth } from "@/Helper/authContext";

function Heading({ data }: any) {
  const [isFvorite, setIsFvorite] = useState(false);
  const { isAuthenticated } = useAuth();
  useEffect(() => {
    if (data) {
      setIsFvorite(data?.is_favorite);
    }
  }, [data]);

  const handleWishlist = async () => {
    try {
      if (!isAuthenticated) {
        alert("Login first");
        return;
      }
      if (data.id) {
        const postData = {
          product_id: data.id,
        };
        const res = await axiosInstance.post(
          `/shop/wishlists/toggle-wishlist/`,
          postData
        );
        setIsFvorite(res?.data?.created);
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
      return;
    }
  };

  return (
    <div className="my-5">
      <h2 className="text-[34px] font-bold">{data?.title || ""}</h2>
      <div className="flex gap-4 items-center justify-between mt-2 text-[15px]">
        <div className="flex items-center gap-5">
          <p className=" pr-4 bg-[#DD2509] py-[4px] px-2  text-white rounded-lg">
            Best Seller
          </p>

          <p className="flex gap-[10px] items-center justify-center border-l-2 pl-4 border-[#010A15B2] text-[#010A15B2]">
            <FaStar color="#FF9900" /> <span className="font-bold ">{data?.avg_rating}</span>{" "}
            <span className="">({data?.total_reviews}) Reviews</span>
          </p>
          <p className="border-l-2 pl-4 border-[#010A15B2]">
            {" "}
            <span className="font-bold">Activity provider: </span>{" "}
            <span className="underline">Geeky Tours</span>
          </p>
        </div>
        <div className="py-2 px-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger onClick={handleWishlist}>
                <AiFillHeart size={24} color={isFvorite ? "red" : "gray"} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Add to Wishlist</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}

export default Heading;
