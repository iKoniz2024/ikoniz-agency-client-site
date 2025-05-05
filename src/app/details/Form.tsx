import { checkAvailibility } from "@/utils/get/get.action";
import React, { useState } from "react";
import AvailabilityModal from "./Availibility";
import { useCurrency } from "@/lib/currencyContext";
import { currencySymbols } from "@/lib/currencyContant";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

function Form({ data }: any) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [availabilities, setAvailabilities] = useState([]);
  const { currency } = useCurrency();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const formatPrice = (price: number, currencyCode: string) => {
    const symbol = currencySymbols[currencyCode] || currencyCode;
    return `${symbol}${price?.toFixed(2) || "0.00"}`;
  };

  const handleCheckAvailability = async (selectedDate?: string) => {
    const dateToUse =
      selectedDate || (date ? format(date, "yyyy-MM-dd") : null);

    if (!dateToUse) {
      alert("Please select a date.");
      return;
    }

    try {
      const response = await checkAvailibility(
        data.id,
        { date: dateToUse },
        currency
      );
      setAvailabilities(response.data);
      if (!isModalOpen) setIsModalOpen(true);
    } catch (error) {
      console.error("Error checking availability:", error);
      alert("Failed to check availability. Please try again.");
    }
  };

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    setIsPopoverOpen(false);
  };

  return (
    <div className="shadow-2xl p-4 rounded-xl">
      <h2 className="text-xl font-extrabold text-black">
        Reserve Your Tickets
      </h2>
      <div>
        {/* Price Section */}
        <div className="bg-gray-100 p-4 rounded-md max-w-xs mt-3">
          <p className="font-bold text-[15px] text-[#010A15] mb-1">From:</p>
          <div className="mt-auto">
            {data?.has_discount ? (
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-red-600 font-bold text-xl">
                    {formatPrice(data?.discounted_price, currency)}
                  </span>
                  <span className="text-xs text-gray-500 line-through">
                    {formatPrice(data?.basePrice, currency)}
                  </span>
                  <span className="text-xs bg-green-100 text-green-800 px-1 rounded">
                    Save {data?.discount_percent}%
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <p className="text-red-600 font-bold text-xl">
                  {formatPrice(data?.basePrice, currency)}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Select Language */}
        <div className="mt-3">
          <label className="block font-bold text-[15px] text-[#010A15] mb-1">
            Select Language
          </label>
          <div className="flex items-center bg-gray-100 p-2 rounded-md">
            <select className="bg-transparent w-full focus:outline-none text-[15px] text-[#010A15]">
              <option>English</option>
            </select>
          </div>
        </div>

        {/* Select Date with shadcn Calendar */}
        <div className="mt-3">
          <label className="block font-bold text-[15px] text-[#010A15] mb-1">
            Select Date
          </label>
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className="w-full bg-gray-100 outline-none border-none justify-start text-left font-normal hover:bg-gray-100"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateChange}
                initialFocus
                disabled={(date) =>
                  date < new Date(new Date().setHours(0, 0, 0, 0))
                }
                className="rounded-md border"
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Check Availability Button */}
        <button
          onClick={() => handleCheckAvailability()}
          className="mt-5 w-full bg-red-600 text-white font-semibold py-3 rounded-md hover:bg-red-700 transition-colors"
        >
          Check Availability
        </button>
      </div>

      {/* Availability Modal */}
      <AvailabilityModal
        isOpen={isModalOpen}
        availabilities={availabilities}
        onClose={() => setIsModalOpen(false)}
        selectedDate={date ? format(date, "yyyy-MM-dd") : ""}
        setSelectedDate={(dateStr: string) => {
          setDate(new Date(dateStr));
          handleCheckAvailability(dateStr);
        }}
        handleCheckAvailability={handleCheckAvailability}
        product_id={data?.id}
      />
    </div>
  );
}

export default Form;
