"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { FaCalendar, FaUsers, FaEdit, FaTrash } from "react-icons/fa";
import { TbTicket } from "react-icons/tb";
import ReviewPopUpCard from "./ReviewPopUpCard";
import { formatCurrency } from "@/lib/currencyContant";
import Link from "next/link";
import EditBookingModal from "@/app/cart/EditBookingModal";
import { EditIcon, EyeIcon, TrashIcon } from "lucide-react";

function BookingCard({ booking, onEdit, onDelete, currentTime }: any) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [canEditDelete, setCanEditDelete] = useState(true);

  const [displayTime, setDisplayTime] = useState("");

  useEffect(() => {
    if (booking.status === "Reserved" && booking.created_at) {
      const remaining =
        new Date(booking.created_at).getTime() + 3600000 - currentTime;
      if (remaining > 0) {
        const mins = Math.floor(remaining / 60000);
        const secs = Math.floor((remaining % 60000) / 1000);
        setDisplayTime(`${mins}m ${secs}s`);
      } else {
        setDisplayTime("");
      }
    }
  }, [currentTime, booking.status, booking.created_at]);

  useEffect(() => {
    // Check if departure is within 24 hours
    const checkEditAvailability = () => {
      const departureTime = new Date(booking.departure_date_time).getTime();
      const currentTime = new Date().getTime();
      const hoursUntilDeparture =
        (departureTime - currentTime) / (1000 * 60 * 60);
      setCanEditDelete(hoursUntilDeparture > 24);
    };

    checkEditAvailability();
  }, [booking.departure_date_time]);

  const handleWriteReviewClick = (id: any) => {
    setShowReviewForm(true);
  };

  const handleEditClick = () => {
    setShowEditModal(true);
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (onDelete) onDelete(booking.id);
    setShowDeleteConfirm(false);
  };

  const handleEditSubmit = (updatedBooking: any) => {
    if (onEdit) onEdit(updatedBooking);
    setShowEditModal(false);
  };

  return (
    <div className="group bg-white rounded-lg p-4 shadow-md relative">
      {/* Edit Booking Modal */}
      {showEditModal && (
        <EditBookingModal
          booking={booking}
          onClose={() => setShowEditModal(false)}
          onSubmit={handleEditSubmit}
        />
      )}

      <div className="flex flex-col sm:flex-row justify-between mt-5">
        <div className="flex flex-col sm:flex-row items-start">
          {/* Image */}
          <div className="relative w-full sm:w-32 h-40 sm:h-36 mb-4 sm:mb-0 mr-0 sm:mr-4">
            <Image
              src={booking.product_thumbnail || "/default-image.jpg"}
              alt={booking.product_title}
              layout="fill"
              className="object-cover rounded-md"
            />
            <span
              className={`absolute top-2 left-2 text-white text-xs px-2 bg-opacity-70 font-semibold py-1 rounded-md flex items-center gap-1 ${
                booking.status === "Cancelled"
                  ? "bg-red-600"
                  : booking.status === "Confirmed"
                  ? "bg-green-600"
                  : "bg-yellow-500"
              }`}
            >
              {booking.status}
              <TbTicket />
            </span>
          </div>

          {/* Details */}
          <div>
            <h3 className="text-lg font-bold mb-1">
              <Link href={`/profile/booking-history/${booking.id}`}>
                {booking.product_title}
              </Link>
            </h3>
            <div className="absolute top-0 left-4 text-green-800 text-center py-2 text-sm font-medium rounded-t-lg">
              {displayTime && (
                <div className=" text-xs">
                  <p>
                    {" "}
                    We'll hold your spot for:{" "}
                    <span className="font-bold"> {displayTime}</span>
                  </p>
                </div>
              )}
            </div>
            <p className="text-gray-500 text-sm flex items-center mb-1">
              <span className="mr-2">
                🛫 Departure: {booking.departure_from || "Unknown"}
              </span>
            </p>
            <p className="text-gray-500 text-sm flex items-center mb-1">
              <span className="mr-2">⏳ Duration: {booking.duration}</span>
            </p>
            <p className="text-gray-500 text-sm flex items-center mb-4">
              <span className="mr-2 flex items-center gap-2">
                <FaCalendar />{" "}
                {new Date(booking.departure_date_time).toLocaleDateString()}
              </span>
            </p>
            <div className="flex gap-5">
              <p className="text-gray-900 text-sm">
                <span className="flex gap-1 items-center">
                  <FaUsers /> {booking.total_persons} Persons
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Price Section */}
        <div className="flex flex-col gap-4 items-center justify-center sm:items-end mt-4 sm:mt-0 border-t sm:border-t-0 sm:border-l sm:pl-4 pt-4 sm:pt-0">
          <div className="w-full mx-auto flex justify-center items-center">
            {/* Edit and Delete buttons - only show if canEditDelete is true */}
            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <Link href={`/profile/booking-history/${booking.id}`}>
                <button
                  title="View booking"
                  className="p-2 bg-white shadow-sm rounded-lg hover:shadow-md text-gray-600 hover:text-gray-900 transition-all"
                >
                  <EyeIcon className="h-5 w-5" />
                </button>
              </Link>
              {canEditDelete && (
                <>
                  <button
                    onClick={handleEditClick}
                    className="p-2 bg-white shadow-sm rounded-lg hover:shadow-md text-blue-600 hover:text-blue-800 transition-all"
                    title="Edit booking"
                  >
                    <EditIcon className="h-5 w-5" />
                  </button>
                  <button
                    onClick={handleDeleteClick}
                    className="p-2 bg-white shadow-sm rounded-lg hover:shadow-md text-red-600 hover:text-red-800 transition-all"
                    title="Delete booking"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {/* Rest of your component remains the same */}
            {/* Delete confirmation modal */}
            {showDeleteConfirm && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                  <h3 className="text-lg font-bold mb-4">Confirm Deletion</h3>
                  <p className="mb-6">
                    Are you sure you want to delete this booking?
                  </p>
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={confirmDelete}
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          {booking.status == "Confirmed" && (
            <div
              onClick={() => handleWriteReviewClick(booking.product_id)}
              className=""
            >
              <p className="px-5 py-2 bg-black rounded-md text-white font-bold text-[12px] cursor-pointer">
                Write a Review
              </p>
            </div>
          )}
          <div className="text-center mx-auto">
            <p className="text-xs text-gray-800 ">Total Price</p>
            <p className="text-xl font-extrabold text-gray-900">
              {formatCurrency(booking.total_amount, booking.currency_type)}
            </p>
          </div>
        </div>
        {showReviewForm && booking.status == "Confirmed" && (
          <ReviewPopUpCard
            reviewedID={booking.product_id}
            onClose={() => setShowReviewForm(false)}
          />
        )}
      </div>
    </div>
  );
}

export default BookingCard;
