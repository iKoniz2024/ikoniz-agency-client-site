"use client";
import { useGetBookingById, useGetProfile } from "@/hooks/get.hooks";
import MainLayout from "@/layout/MainLayout";
import { useRouter, useSearchParams } from "next/navigation";
import SelectedContinueItem from "../personal-info/SelectedContinueItem";
import { useState, Suspense } from "react";
import axiosInstance from "@/lib/AxiosInstance";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FiCreditCard, FiLock, FiLoader } from "react-icons/fi";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDiscover,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { formatCurrency } from "@/lib/currencyContant";

const stripePromise = loadStripe(
  "pk_test_51GwbeaINl754AERGy6WB5G8YSGY3WAzomh9rgf39kDbh3gUqhAtLCEuLjl0xRlgCDOOnL9QC5Szgmp8JEveTXFZZ00iogv0t0u"
);

interface BookingData {
  id: string;
  total_amount: number;
}

interface CheckoutFormProps {
  data: BookingData | null;
}

const CheckoutForm = ({
  data,
  isLoading,
}: {
  data: any;
  isLoading: boolean;
}) => {
  const stripe: any = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleStripePayment = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!stripe || !elements || !data) return;

    setLoading(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });

    if (error) {
      setLoading(false);
      toast.error(error.message || "Payment failed");
      return;
    }

    try {
      const { id } = paymentMethod;
      const response = await axiosInstance.post(`/shop/tours/payment/`, {
        api_type: "g",
        id: data.id,
        payment_method: id,
      });

      if (response.data.success) {
        setSuccess(true);
        router.push(
          `/confirm-checkout/success?api-type=G&id=${
            data.id
          }&booking=${encodeURIComponent(JSON.stringify(response.data.data))}`
        );
      } else {
        throw new Error("Payment confirmation failed");
      }
    } catch (error: any) {
      setSuccess(false);
      setLoading(false);
      toast.error(
        error?.response?.data?.error ||
          error?.response?.data?.details?.error ||
          "Booking and Payment could not be confirmed"
      );
      router.push(`/confirm-checkout/failed?api-type=G&id=${data.id}`);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Payment Method</h2>
        <div className="flex space-x-3">
          <FaCcVisa className="text-gray-400 text-2xl" />
          <FaCcMastercard className="text-gray-400 text-2xl" />
          <FaCcAmex className="text-gray-400 text-2xl" />
          <FaCcDiscover className="text-gray-400 text-2xl" />
        </div>
      </div>

      {!success && (
        <form onSubmit={handleStripePayment}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Details
            </label>
            <div className="border border-gray-300 rounded-lg p-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#111827",
                      "::placeholder": {
                        color: "#9CA3AF",
                      },
                      iconColor: "#6B7280",
                    },
                    invalid: {
                      color: "#EF4444",
                    },
                  },
                  hidePostalCode: false,
                }}
              />
            </div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <span className="text-sm font-medium text-gray-500">
              Total Amount
            </span>
            <span className="text-xl font-bold text-gray-800">
              {!isLoading &&
                formatCurrency(data?.total_amount || 0, data?.currency_type)}
            </span>
          </div>

          <button
            type="submit"
            disabled={!data?.total_amount || loading}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white flex items-center justify-center ${
              !data?.total_amount || loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#635BFF] hover:bg-[#611BFF]"
            } transition-colors duration-200`}
          >
            {loading ? (
              <>
                <FiLoader className="animate-spin mr-2" />
                Processing Payment...
              </>
            ) : (
              <>
                <FiLock className="mr-2" />
                Pay Securely
              </>
            )}
          </button>

          <div className="mt-4 flex items-center text-xs text-gray-500">
            <FiLock className="mr-1" />
            <span>Your payment is secured with Stripe</span>
          </div>
        </form>
      )}
    </div>
  );
};

const ConfirmCheckoutContent = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { data: selectedBookingCart, isLoading } = useGetBookingById(id);
  const { data } = useGetProfile();
  const profileData = data?.data || {};
  const is_guest = selectedBookingCart?.is_guest;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6  py-8">
      <div className="flex flex-col lg:flex-row gap-8 justify-between">
        {/* Left Column - Payment and Personal Info */}
        <div className="lg:w-3/5">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">
              Complete Your Booking
            </h1>

            <div className="mb-8">
              <h2 className="text-lg font-medium text-gray-800 mb-4">
                Personal Information
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between border-b pb-3">
                  <span className="text-gray-600">Name</span>
                  <span className="font-medium">
                    {is_guest
                      ? selectedBookingCart?.first_name
                      : profileData?.first_name}{" "}
                    {is_guest
                      ? selectedBookingCart?.last_name
                      : profileData?.last_name}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-3">
                  <span className="text-gray-600">Email</span>
                  <span className="font-medium">
                    {is_guest
                      ? selectedBookingCart?.email
                      : profileData?.email}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone</span>
                  <span className="font-medium">
                    {is_guest
                      ? selectedBookingCart?.phone
                      : profileData?.phone}
                  </span>
                </div>
              </div>
            </div>

            <Elements stripe={stripePromise}>
              <CheckoutForm
                isLoading={isLoading}
                data={selectedBookingCart}
              />
            </Elements>
          </div>
        </div>

        {/* Right Column - Order Summary */}
        <div className="lg:w-1/3">
          {selectedBookingCart ? (
            <SelectedContinueItem
              profileComplete={true}
              participantComplete={true}
              hasButton={false}
              selectedBookingCart={selectedBookingCart}
            />
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <p>Loading booking details...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ConfirmCheckout = () => {
  return (
    <MainLayout>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-64">
            <FiLoader className="animate-spin text-2xl text-blue-500" />
          </div>
        }
      >
        <ConfirmCheckoutContent />
      </Suspense>
    </MainLayout>
  );
};

export default ConfirmCheckout;
