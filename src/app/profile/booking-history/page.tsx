"use client";
import BookingCard from "@/app/_components/cards/BookingCard";
import EmptyHistory from "./EmptyHistory";
import { useGetBookingList } from "@/hooks/get.hooks";
import { TfiEraser } from "react-icons/tfi";

function BookingHistory() {
  const { data: bookingList } = useGetBookingList();

  return (
    <div>
      {bookingList?.data?.results && bookingList?.data?.results.length > 0 ? (
        <div>
          <div className="flex flex-col sm:flex-row items-center justify-between">
            <h1 className="text-2xl font-bold mb-4 sm:mb-0">Booking History</h1>
            <button className="text-gray-500 hover:text-gray-700 flex items-center gap-2 text-sm">
              <TfiEraser />
              Clear All
            </button>
          </div>

          <div className="space-y-4">
            {bookingList?.data?.results.map((booking: any) => {
              return <BookingCard key={booking.id} booking={booking} />;
            })}
          </div>
        </div>
      ) : (
        <EmptyHistory />
      )}
    </div>
  );
}

export default BookingHistory;
