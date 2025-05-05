"use client";

import { useSearchParams } from "next/navigation";
import MainLayout from "@/layout/MainLayout";
import Link from "next/link";
import { Suspense, useState } from "react";
import {
  FiCheckCircle,
  FiClock,
  FiDownload,
  FiLoader,
  FiMail,
  FiPhone,
} from "react-icons/fi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { downloadReceipt } from "@/utils/post/post.action";
import { formatCurrency } from "@/lib/currencyContant";
import { toast } from "sonner";

const SuccessPage = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Suspense
          fallback={
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          }
        >
          <BookingDetails />
        </Suspense>
      </div>
    </MainLayout>
  );
};

const BookingDetails = () => {
  const searchParams = useSearchParams();
  const booking = searchParams.get("booking");
  const bookingDetails = booking
    ? JSON.parse(decodeURIComponent(booking))
    : null;

  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadReceipt = async () => {
    if (bookingDetails?.id) {
      setIsDownloading(true);
      try {
        await downloadReceipt(bookingDetails.id);
        toast("downloaded successfully");
      } catch (error) {
        console.error(error);
        toast("could not download");
      } finally {
        setIsDownloading(false);
      }
    }
  };

  const calculateOriginalTotal = () => {
    if (!bookingDetails?.data?.participants) return 0;
    return bookingDetails.participants.reduce(
      (total: number, participant: any) =>
        total + participant.cost_per_unit * participant.quantity,
      0
    );
  };

  const calculateDiscountedTotal = () => {
    if (!bookingDetails?.data?.participants) return 0;
    return bookingDetails.participants.reduce(
      (total: number, participant: any) =>
        total +
        (participant.discounted_cost_per_unit || participant.cost_per_unit) *
          participant.quantity,
      0
    );
  };

  const calculateSavings = () => {
    return calculateOriginalTotal() - calculateDiscountedTotal();
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <>
      {/* Success Header */}
      <div className="text-center mb-10">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
          <FiCheckCircle className="h-6 w-6 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Payment Successful!
        </h1>
        <p className="text-lg text-gray-600">
          Your booking has been confirmed. A confirmation has been sent to your
          email.
        </p>
        <div className="mt-4">
          <button
            onClick={handleDownloadReceipt}
            disabled={isDownloading}
            className="inline-flex items-center text-blue-600 hover:text-blue-800 disabled:opacity-50"
          >
            {isDownloading ? (
              <>
                <FiLoader className="animate-spin mr-2" />
                Downloading...
              </>
            ) : (
              <>
                <FiDownload className="mr-2" />
                Download Receipt
              </>
            )}
          </button>
        </div>
      </div>

      {bookingDetails && (
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Booking Summary */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Booking Summary
            </h2>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {bookingDetails.product_title}
                </h3>
                <div className="flex items-center text-gray-600 mb-1">
                  <FaRegCalendarAlt className="mr-2" />
                  <span>{formatDate(bookingDetails.departure_date_time)}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FiClock className="mr-2" />
                  <span>{bookingDetails.duration}</span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="text-sm text-gray-500">Booking Reference</div>
                <div className="text-lg font-mono font-bold">
                  {bookingDetails.id}
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Payment Details
            </h3>

            <div className="space-y-3">
              {/* Participants */}
              {bookingDetails.participants.map((participant: any) => (
                <div key={participant.id} className="flex justify-between">
                  <div>
                    <span className="font-medium">
                      {participant.quantity}x{" "}
                    </span>
                    {participant.participant_type}
                    {participant.option_name !== "Default" &&
                      ` (${participant.option_name})`}
                  </div>
                  <div className="text-right">
                    {participant.discounted_cost_per_unit > 0 ? (
                      <>
                        <span className="line-through text-gray-400 mr-2">
                          {formatCurrency(
                            participant.cost_per_unit,
                            participant?.currency_type
                          )}
                        </span>
                        <span className="font-medium">
                          {formatCurrency(
                            participant.discounted_cost_per_unit,
                            participant?.currency_type
                          )}
                        </span>
                      </>
                    ) : (
                      <span className="font-medium">
                        {formatCurrency(
                          participant.cost_per_unit,
                          participant?.currency_type
                        )}
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {/* Divider */}
              <div className="border-t border-gray-200 my-2"></div>

              {/* Subtotal */}
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>
                  {formatCurrency(
                    calculateOriginalTotal(),
                    bookingDetails?.currency_type
                  )}
                </span>
              </div>

              {/* Discounts */}
              {calculateSavings() > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discounts</span>
                  <span>
                    -
                    {formatCurrency(
                      calculateSavings(),
                      bookingDetails?.currency_type
                    )}
                  </span>
                </div>
              )}

              {/* Total */}
              <div className="flex justify-between font-bold text-lg pt-2">
                <span>Total Paid</span>
                <span>
                  {formatCurrency(
                    bookingDetails.total_amount,
                    bookingDetails?.currency_type
                  )}
                </span>
              </div>

              {/* Gross Amount */}
              {bookingDetails.gross_amount && (
                <div className="text-sm text-gray-500 mt-1 text-right">
                  Includes taxes and fees:{" "}
                  {formatCurrency(
                    bookingDetails.gross_amount,
                    bookingDetails?.currency_type
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Customer Information */}
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Customer Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <div className="bg-gray-100 p-2 rounded-full mr-3">
                  <FiMail className="text-gray-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Email</div>
                  <div className="font-medium">
                    {bookingDetails.user?.email}
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <div className="bg-gray-100 p-2 rounded-full mr-3">
                  <FiPhone className="text-gray-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-500">Phone</div>
                  <div className="font-medium">
                    {bookingDetails.user?.phone}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Status and Next Steps */}
          <div className="bg-blue-50 p-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <FiCheckCircle className="h-5 w-5 text-blue-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  Booking Status
                </h3>
                <div className="mt-1 text-sm text-blue-700">
                  <p>
                    Your booking is{" "}
                    <span className="font-bold capitalize">
                      {bookingDetails.status.toLowerCase()}
                    </span>
                    . You'll receive a confirmation email with all the details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SuccessPage;
