"use client";
import React, { useEffect, useState } from "react";
import { cancelBooking, fetchBookingDetails } from "@/services/booking";
import { Icon } from "@iconify/react";
import BookingLoader from "./BookingLoader";
import { toast } from "sonner";
import { downloadReceipt } from "@/utils/post/post.action";
import Cookies from "js-cookie";

export default function BookingDetailsView({ params }: { params: any }) {
  const { id }: any = params;
  const [bookingDetails, setBookingDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isCancelling, setIsCancelling] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);

  const isCancellationAllowed = () => {
    if (!bookingDetails?.departure_date_time) return false;
    if (bookingDetails?.status == "Refunded") return false;
    if (bookingDetails?.status == "Reserved") return false;
    if (bookingDetails?.status == "Completed") return false;
    if (bookingDetails?.status == "Cancelled") return false;
    const departureDate = new Date(bookingDetails.departure_date_time);
    const now = new Date();
    const diffHours =
      (departureDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    return diffHours > 24;
  };

  const loadBookingData = async () => {
    setLoading(true);
    try {
      const data = await fetchBookingDetails(id);
      setBookingDetails(data);
      setError(null);
    } catch (err) {
      setError("Failed to load booking details.");
      toast.error("Failed to load booking details");
    } finally {
      setLoading(false);
    }
  };

  const handleCancellation = async () => {
    if (!isCancellationAllowed() || !bookingDetails?.id) return;
    const accessToken = Cookies.get("access_token");
    if (!accessToken) {
      toast("Please Log In first!");
      return;
    }
    setIsCancelling(true);
    try {
      await cancelBooking(bookingDetails.id);
      toast.success(
        "Booking cancelled successfully! Refund will be processed."
      );
      await loadBookingData();
    } catch (error) {
      toast.error("Failed to cancel booking. Please try again.");
      console.error("Cancellation error:", error);
    } finally {
      setIsCancelling(false);
      setShowCancelConfirmation(false);
    }
  };

  const handleDownloadReceipt = async () => {
    if (bookingDetails?.id) {
      setIsDownloading(true);
      try {
        await downloadReceipt(bookingDetails.id);
      } finally {
        setIsDownloading(false);
      }
    }
  };

  useEffect(() => {
    loadBookingData();
  }, [id]);

  if (loading) {
    return <BookingLoader />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-100 p-4 rounded-lg flex items-center gap-2">
          <Icon icon="ion:alert-circle" className="h-5 w-5 text-red-600" />
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gradient-to-br  min-h-screen">
      {/* Cancel Confirmation Modal */}
      {showCancelConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <div className="flex items-center gap-3 mb-4">
              <Icon
                icon="mdi:alert-circle-outline"
                className="h-6 w-6 text-rose-600"
              />
              <h3 className="text-xl font-semibold">Confirm Cancellation</h3>
            </div>
            <p className="mb-6 text-gray-600">
              Are you sure you want to cancel this booking? A refund will be
              processed if applicable.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowCancelConfirmation(false)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors"
              >
                No, Keep Booking
              </button>
              <button
                onClick={handleCancellation}
                disabled={isCancelling}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {isCancelling ? (
                  <>
                    <Icon icon="svg-spinners:180-ring" className="h-4 w-4" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Icon icon="mdi:check" className="h-4 w-4" />
                    Yes, Cancel Booking
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="w-full flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          Booking Details
        </h2>

        {bookingDetails?.status === "Confirmed" && (
          <button
            onClick={handleDownloadReceipt}
            className="flex items-center justify-center text-sm gap-2 bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded transition-colors w-48"
            disabled={isDownloading}
          >
            {isDownloading ? (
              <>
                <Icon icon="svg-spinners:180-ring" className="h-5 w-5" />
                <span>Downloading...</span>
              </>
            ) : (
              <>
                <Icon icon="mdi:receipt" className="h-5 w-5" />
                <span>Download Receipt</span>
              </>
            )}
          </button>
        )}
      </div>

      {/* Booking Info Card */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-200">
        <h3 className="text-xl font-semibold mb-6 text-gray-700 flex items-center gap-2">
          <Icon
            icon="mdi:information-outline"
            className="h-6 w-6 text-blue-500"
          />
          Booking Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Product */}
          <InfoCard
            icon="mdi:package-variant"
            title="Product"
            value={bookingDetails.product_title}
            color="text-purple-600"
            bgColor="bg-purple-50"
          />

          {/* Status */}
          <InfoCard
            icon="mdi:check-circle"
            title="Status"
            value={bookingDetails.status}
            color={
              bookingDetails.status === "Confirmed"
                ? "text-green-600"
                : "text-red-600"
            }
            bgColor={
              bookingDetails.status === "Confirmed"
                ? "bg-green-50"
                : "bg-red-50"
            }
          />

          {/* Departure From */}
          <InfoCard
            icon="mdi:airplane-takeoff"
            title="Departure From"
            value={bookingDetails.departure_from}
            color="text-blue-600"
            bgColor="bg-blue-50"
          />

          {/* Departure Date */}
          <InfoCard
            icon="mdi:clock-outline"
            title="Departure Date"
            value={new Date(
              bookingDetails.departure_date_time
            ).toLocaleString()}
            color="text-amber-600"
            bgColor="bg-amber-50"
          />

          {/* Total Amount */}
          <InfoCard
            icon="mdi:cash-multiple"
            title="Total Amount"
            value={`$${bookingDetails.total_amount.toFixed(2)}`}
            color="text-emerald-600"
            bgColor="bg-emerald-50"
          />

          {/* Cancellation */}
          <div className="p-4 rounded-lg border border-gray-200 flex flex-col">
            <div className="flex items-center gap-3 mb-2">
              <Icon icon="mdi:cancel" className="h-5 w-5 text-rose-600" />
              <p className="text-sm font-medium text-gray-600">Cancellation</p>
            </div>
            {isCancellationAllowed() ? (
              <button
                onClick={() => setShowCancelConfirmation(true)}
                disabled={isCancelling}
                className="mt-2 bg-rose-100 hover:bg-rose-200 text-rose-700 px-3 py-1 rounded-md text-sm font-medium transition-colors w-fit flex items-center gap-1 disabled:opacity-50"
              >
                {isCancelling ? (
                  <>
                    <Icon icon="svg-spinners:180-ring" className="h-4 w-4" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Icon icon="mdi:alert-circle-outline" className="h-4 w-4" />
                    Request Cancellation
                  </>
                )}
              </button>
            ) : (
              <p className="text-sm text-gray-500 italic">
                {bookingDetails.status !== "Confirmed"
                  ? "Cancellation not available for this booking status"
                  : "Not available within 24 hours of departure"}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Participants Table */}
      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <h3 className="text-xl font-semibold mb-4 text-gray-700 flex items-center gap-2">
          <Icon icon="mdi:account-group" className="h-6 w-6 text-blue-500" />
          Participants
        </h3>
        {bookingDetails.participants.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-600 uppercase">
                    Cost per Unit
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookingDetails.participants.map((participant: any) => (
                  <tr
                    key={participant.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {participant.option_name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {participant.participant_type}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {participant.quantity}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      ${participant.cost_per_unit.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex items-center justify-center py-8 text-gray-500">
            <Icon icon="mdi:account-remove" className="h-5 w-5 mr-2" />
            No participants available
          </div>
        )}
      </div>
    </div>
  );
}

const InfoCard = ({
  icon,
  title,
  value,
  color,
  bgColor,
}: {
  icon: string;
  title: string;
  value: string;
  color?: string;
  bgColor?: string;
}) => (
  <div
    className={`p-4 rounded-lg border border-gray-200 ${
      bgColor || "bg-gray-50"
    }`}
  >
    <div className="flex items-center gap-3 mb-2">
      <Icon icon={icon} className={`h-5 w-5 ${color || "text-gray-500"}`} />
      <p className="text-sm font-medium text-gray-600">{title}</p>
    </div>
    <p className={`text-lg font-semibold ${color || "text-gray-800"}`}>
      {value}
    </p>
  </div>
);
