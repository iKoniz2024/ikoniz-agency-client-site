import { formatCurrency } from "@/lib/currencyContant";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const SelectedContinueItem = ({
  selectedBookingCart,
  hasButton = true,
  profileComplete = true,
  participantComplete = true,
}: {
  selectedBookingCart: any;
  hasButton?: boolean;
  profileComplete: boolean;
  participantComplete?: boolean;
}) => {
  const router = useRouter();

  const handleCheckout = () => {
    if (selectedBookingCart?.api_category && selectedBookingCart?.id) {
      router.push(
        `/confirm-checkout?api-type=${selectedBookingCart.api_category}&id=${selectedBookingCart.id}`
      );
    }
  };

  const calculateOriginalTotal = () => {
    if (!selectedBookingCart?.participants) return 0;
    return selectedBookingCart.participants.reduce(
      (total: number, participant: any) =>
        total + participant.cost_per_unit * participant.quantity,
      0
    );
  };

  const calculateDiscountedTotal = () => {
    if (!selectedBookingCart?.participants) return 0;
    return selectedBookingCart.participants.reduce(
      (total: number, participant: any) =>
        total + participant.discounted_cost_per_unit * participant.quantity,
      0
    );
  };

  const calculateSavings = () => {
    return calculateOriginalTotal() - calculateDiscountedTotal();
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Group participants by type
  const participantGroups = selectedBookingCart?.participants?.reduce(
    (groups: any, participant: any) => {
      const type = participant.participant_type;
      if (!groups[type]) {
        groups[type] = [];
      }
      groups[type].push(participant);
      return groups;
    },
    {}
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h1 className="text-xl font-bold mb-4">Order Summary</h1>

      {selectedBookingCart ? (
        <div className="space-y-4">
          {/* Product Information */}
          <div className="border-b pb-4">
            <div className="flex gap-4">
              <div className="relative w-24 h-24 flex-shrink-0">
                <Image
                  src={
                    selectedBookingCart.product_thumbnail ||
                    "/default-image.jpg"
                  }
                  alt={selectedBookingCart.product_title}
                  fill
                  className="object-cover rounded-md"
                />
              </div>

              <div className="flex-1">
                <h2 className="text-lg font-bold">
                  {selectedBookingCart.product_title}
                </h2>
                <p className="text-sm text-gray-500 mb-2">
                  {selectedBookingCart.departure_from} •{" "}
                  {selectedBookingCart.duration}
                </p>

                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <span className="font-medium">Departure:</span>{" "}
                    {formatDate(selectedBookingCart.departure_date_time)}
                  </p>
                  <p>
                    <span className="font-medium">Booking ID:</span>{" "}
                    {selectedBookingCart.id}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Participants Breakdown */}
          <div className="border-b pb-4">
            <h3 className="font-bold mb-3">Participants</h3>
            <div className="space-y-3">
              {participantGroups &&
                Object.entries(participantGroups).map(
                  ([type, participants]: [string, any]) => (
                    <div key={type}>
                      <h4 className="text-sm font-medium mb-1">
                        {type}
                      </h4>
                      <div className="space-y-2">
                        {participants.map((p: any) => (
                          <div
                            key={p.id}
                            className="flex justify-between text-sm"
                          >
                            <div>
                              {p.quantity}x{" "}
                              {p.option_name !== "Default" ? p.option_name : ""}
                            </div>
                            <div className="text-right">
                              {p.discounted_cost_per_unit > 0 ? (
                                <>
                                  <span className="line-through text-gray-400 mr-2">
                                    {formatCurrency(
                                      p.cost_per_unit,
                                      p.currency_type
                                    )}
                                  </span>
                                  <span className="font-medium">
                                    {formatCurrency(
                                      p.discounted_cost_per_unit,
                                      p.currency_type
                                    )}
                                  </span>
                                </>
                              ) : (
                                <span className="font-medium">
                                  {formatCurrency(
                                    p.cost_per_unit,
                                    p.currency_type
                                  )}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                )}
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>
                {formatCurrency(
                  calculateOriginalTotal(),
                  selectedBookingCart.currency_type
                )}
              </span>
            </div>

            {calculateSavings() > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discounts:</span>
                <span>
                  -
                  {formatCurrency(
                    calculateSavings(),
                    selectedBookingCart.currency_type
                  )}
                </span>
              </div>
            )}

            <div className="flex justify-between border-t pt-2 font-bold">
              <span>Total Amount:</span>
              <span className="text-red-600">
                {formatCurrency(
                  selectedBookingCart.total_amount,
                  selectedBookingCart.currency_type
                )}
              </span>
            </div>

            <div className="text-xs text-gray-500 mt-2">
              <p>Includes all taxes and fees</p>
              {selectedBookingCart.gross_amount && (
                <p>
                  Gross amount:{" "}
                  {formatCurrency(
                    selectedBookingCart.gross_amount,
                    selectedBookingCart.currency_type
                  )}
                </p>
              )}
            </div>
          </div>

          {/* Continue Button */}
          {hasButton && (
            <div className="mt-4 space-y-2">
              <button
                onClick={handleCheckout}
                className={`w-full py-3 rounded-md font-bold transition ${
                  profileComplete
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
                disabled={!profileComplete || !participantComplete}
              >
                {profileComplete && participantComplete
                  ? "Proceed to Payment"
                  : participantComplete
                  ? "Complete Your Profile to Checkout"
                  : "Complete Participant Info to Checkout"}
              </button>

              {!profileComplete && (
                <p className="text-xs text-red-500 text-center">
                  Please complete all required profile information to proceed
                </p>
              )}
              {!participantComplete && (
                <p className="text-xs text-red-500 text-center">
                  Please complete all required participants information to
                  proceed
                </p>
              )}
            </div>
          )}

          {/* {!selectedBookingCart.user && (
            <p className="text-xs text-center text-gray-500 mt-2">
              <Link href="/login" className="text-blue-500 hover:underline">
                Sign in
              </Link>{" "}
              to save your booking details
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

export default SelectedContinueItem;
