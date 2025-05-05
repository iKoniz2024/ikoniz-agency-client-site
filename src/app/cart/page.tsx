"use client";
import { useGetBookingList } from "@/hooks/get.hooks";
import MainLayout from "@/layout/MainLayout";
import React, { useState, useEffect } from "react";
import BookingCard from "../_components/cards/BookingCard";
import EmptyHistory from "../profile/booking-history/EmptyHistory";
import SelectedCartItem from "./SelectedCartItem";
import { toast } from "sonner";

const CartPage = () => {
  const { data: bookingList, refetch } = useGetBookingList("Reserved");
  const [selectedBookingCart, setSelectedBookingCart] = useState<any>(null);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (bookingList?.data?.results?.length > 0 && !selectedBookingCart) {
      setSelectedBookingCart(bookingList.data.results[0]);
    }
  }, [bookingList, selectedBookingCart]);

  const onDeleteHandler = () => {
    toast.success("deleted");
    refetch();
  };
  const onEditHandler = () => {
    toast.success("updated successfully");
    refetch();
  };

  return (
    <MainLayout>
      <div className="mx-10 lg:mx-20 my-10 lg:grid grid-cols-3 gap-5">
        <div className="col-span-2">
          {bookingList?.data?.results?.length > 0 ? (
            <div className="space-y-4">
              {bookingList.data.results.map((booking: any) => (
                <div
                  key={booking.id}
                  onClick={() => setSelectedBookingCart(booking)}
                  className={`cursor-pointer ${
                    selectedBookingCart?.id === booking.id
                      ? "border border-green-800 rounded-md"
                      : ""
                  }`}
                >
                  <BookingCard
                    onEdit={onEditHandler}
                    onDelete={onDeleteHandler}
                    booking={booking}
                    currentTime={now} 

                  />
                </div>
              ))}
            </div>
          ) : (
            <EmptyHistory />
          )}
        </div>

        <div className="col-span-1 bg-white p-4 rounded-md shadow-md border">
          <SelectedCartItem selectedBookingCart={selectedBookingCart} />
        </div>
      </div>
    </MainLayout>
  );
};

export default CartPage;
