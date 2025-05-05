import { TicketMinus } from "lucide-react";
import React from "react";

function EmptyHistory() {
  return (
    <div>
      <div className="flex   justify-between mt-4 border-b-2">
        <div>
          <h1 className="text-2xl font-bold mb-2">
            Your Booking History is empty
          </h1>
          <p className="text-gray-500 mb-6 text-[14px]">
            Your booking history is empty, but your adventures are waiting.
          </p>
        </div>
        <div className="flex items-start">
          <button className="bg-red-600 text-white py-2 px-6 rounded-lg flex  hover:bg-red-700 transition">
            Book Now{" "}
            <span className="ml-2 ">
              <TicketMinus />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmptyHistory;
