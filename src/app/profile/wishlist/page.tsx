"use client";
import Image from "next/image";
import { HiOutlineTicket } from "react-icons/hi2";
import { TfiEraser } from "react-icons/tfi";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/AxiosInstance";

function WishlistPage() {
  const [wishList, setWishList] = useState<{ id: number; wishitems: any[] }[]>(
    []
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchWishList() {
      try {
        const res = await axiosInstance.get(`/shop/wishlists/`);
        setWishList(res?.data?.data || []);
      } catch (error) {
        setWishList([]);
      } finally {
        setLoading(false);
      }
    }
    fetchWishList();
  }, []);

  const toggleWishlist = async (productId: string) => {
    try {
      await axiosInstance.post("/shop/wishlists/toggle-wishlist/", {
        product_id: productId,
      });

      // Optimistically update UI
      setWishList(
        (prevList: any) =>
          prevList
            .map((wishlist: any) => ({
              ...wishlist,
              wishitems: wishlist.wishitems.filter(
                (item: any) => item.product_id !== productId
              ),
            }))
            .filter((wishlist: any) => wishlist.wishitems.length > 0) // Remove empty wishlists
      );
    } catch (error) {
      console.error("Error toggling wishlist", error);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-3xl font-bold">
          Wishlist{" "}
          <span className="text-red-500">
            ({wishList[0]?.wishitems?.length || 0})
          </span>
        </h1>
        {wishList.length > 0 && (
          <button className="text-gray-500 hover:text-gray-700 flex items-center gap-2 text-sm">
            <TfiEraser /> Clear All
          </button>
        )}
      </div>

      {loading ? (
        <p className="text-center mt-10 text-gray-500">Loading...</p>
      ) : wishList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {wishList.map((wishlist: any) =>
            wishlist?.wishitems?.map((item: any) => (
              <div
                key={item.id}
                className="border p-4 rounded-lg shadow-md flex gap-4 relative"
              >
                <Image
                  src={item.product_image || "/default-image.png"}
                  width={100}
                  height={100}
                  alt={item.product_title}
                  className="rounded-md object-cover"
                />
                <div>
                  <h2 className="text-lg font-semibold">
                    {item.product_title}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {item.product_duration}
                  </p>
                  <p className="text-gray-500 text-sm">
                    Location: {item.product_location}
                  </p>
                  <p className="text-red-500 font-bold mt-2">
                    ${item.product_price}
                  </p>
                </div>
                {/* Wishlist Toggle Button */}
                <button
                  className="absolute top-2 right-2 text-red-500"
                  onClick={() => toggleWishlist(item.product_id)}
                >
                  <FaHeart size={22} className="cursor-pointer" />
                </button>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center mt-20">
          <Image
            src="/wishlist-empty.png"
            width={280}
            height={160}
            alt="empty-wishlist"
          />
          <h2 className="text-lg font-semibold mt-4">Your wishlist is empty</h2>
          <p className="text-gray-500 text-center mt-2">
            Save activities to your wishlist by clicking on the heart icon.
          </p>
          <button className="mt-6 px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 flex items-center gap-2">
            See All Tickets <HiOutlineTicket size={15} />
          </button>
        </div>
      )}
    </div>
  );
}

export default WishlistPage;
