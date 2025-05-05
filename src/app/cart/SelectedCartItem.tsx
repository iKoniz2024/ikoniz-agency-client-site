"use client";
import { formatCurrency } from "@/lib/currencyContant";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const SelectedCartItem = ({ selectedBookingCart }: any) => {
  const router = useRouter();

  const handleCheckout = () => {
    if (selectedBookingCart?.api_category && selectedBookingCart?.id) {
      router.push(
        `/personal-info?api-type=${selectedBookingCart.api_category}&id=${selectedBookingCart.id}`
      );
    }
  };

  const calculateOriginalTotal = () => {
    if (!selectedBookingCart?.participants) return 0;
    return selectedBookingCart.participants.reduce(
      (total: number, participant: any) => 
        total + (participant.cost_per_unit * participant.quantity),
      0
    );
  };

  const calculateDiscountedTotal = () => {
    if (!selectedBookingCart?.participants) return 0;
    return selectedBookingCart.participants.reduce(
      (total: number, participant: any) => 
        total + (participant.discounted_cost_per_unit * participant.quantity),
      0
    );
  };

  const calculateSavings = () => {
    return calculateOriginalTotal() - calculateDiscountedTotal();
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4">Booking Details</h1>

      {selectedBookingCart ? (
        <div className="space-y-4 bg-white rounded-lg shadow-md p-4">
          {/* Product Info */}
          <div className="border-b pb-4">
            <div className="flex gap-4">
              <div className="relative w-24 h-24 flex-shrink-0">
                <Image
                  src={selectedBookingCart.product_thumbnail || "/default-image.jpg"}
                  alt={selectedBookingCart.product_title}
                  fill
                  className="object-cover rounded-md"
                />
              </div>

              <div className="flex-1">
                <h2 className="text-lg font-bold">{selectedBookingCart.product_title}</h2>
                <p className="text-sm text-gray-500">
                  Booking ID: {selectedBookingCart.id}
                </p>
                <p className="text-sm text-gray-500">
                  Status: <span className="capitalize">{selectedBookingCart.status}</span>
                </p>

                <div className="text-sm text-gray-600 mt-2 space-y-1">
                  <p>
                    <span className="font-semibold">Departure:</span> {selectedBookingCart.departure_from}
                  </p>
                  <p>
                    <span className="font-semibold">Date:</span> {formatDate(selectedBookingCart.departure_date_time)}
                  </p>
                  <p>
                    <span className="font-semibold">Duration:</span> {selectedBookingCart.duration}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Participants Details */}
          <div className="border-b pb-4">
            <h3 className="font-bold mb-2">Participants</h3>
            <div className="space-y-2">
              {selectedBookingCart.participants?.map((participant: any) => (
                <div key={participant.id} className="flex justify-between text-sm">
                  <div>
                    <span className="font-medium">{participant.quantity}x </span>
                    {participant.participant_type}
                  </div>
                  <div className="text-right">
                    {participant.discounted_cost_per_unit > 0 ? (
                      <>
                        <span className="line-through text-gray-400 mr-2">
                          {formatCurrency(participant.cost_per_unit, participant.currency_type)}
                        </span>
                        <span className="font-medium">
                          {formatCurrency(participant.discounted_cost_per_unit, participant.currency_type)}
                        </span>
                      </>
                    ) : (
                      <span className="font-medium">
                        {formatCurrency(participant.cost_per_unit, participant.currency_type)}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>{formatCurrency(calculateOriginalTotal(),selectedBookingCart.currency_type)}</span>
            </div>
            
            {calculateSavings() > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discounts:</span>
                <span>-{formatCurrency(calculateSavings(),selectedBookingCart.currency_type)}</span>
              </div>
            )}

            <div className="flex justify-between font-bold border-t pt-2">
              <span>Total Amount:</span>
              <span className="text-red-600">
                {formatCurrency(selectedBookingCart.total_amount,selectedBookingCart.currency_type)}
              </span>
            </div>

            <div className="text-xs text-gray-500 mt-1">
              <p>Gross Amount: {formatCurrency(selectedBookingCart.gross_amount, selectedBookingCart.currency_type)}</p>
              <p>Total Persons: {selectedBookingCart.total_persons}</p>
              <p>Booked on: {formatDate(selectedBookingCart.created_at)}</p>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            className="w-full bg-red-600 text-white py-3 rounded-md font-bold hover:bg-red-700 transition mt-4"
          >
            Proceed to Checkout
          </button>

          {/* {!selectedBookingCart.user && (
            <p className="text-xs text-center text-gray-500 mt-2">
              <Link href="/login" className="text-blue-500 hover:underline">
                Sign in
              </Link> to save your booking details
            </p>
          )} */}
        </div>
      ) : (
        <p className="text-gray-500 text-center py-8">
          Select a booking to view details
        </p>
      )}
    </div>
  );
};

export default SelectedCartItem;