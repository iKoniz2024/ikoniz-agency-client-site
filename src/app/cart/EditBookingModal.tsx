"use client";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { checkAvailibility } from "@/utils/get/get.action";
import { CustomDatePicker } from "../_components/CustomCalendar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCurrency } from "@/lib/currencyContext";
import { formatCurrency } from "@/lib/currencyContant";
import { updateActivity } from "@/utils/post/post.action";
import { toast } from "sonner";

export default function EditBookingModal({ booking, onClose, onSubmit }: any) {
  const { currency } = useCurrency();
  const [selectedDate, setSelectedDate] = useState<string>(
    booking.departure_date_time.split("T")[0]
  );
  const [availabilities, setAvailabilities] = useState<any[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<any>(null);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchInitialAvailability = async () => {
      setIsLoading(true);
      try {
        const response = await checkAvailibility(
          booking.product_id,
          { date: selectedDate },
          currency
        );

        setAvailabilities(response.data);

        const currentAvailability = response.data.find(
          (avail: any) =>
            avail.availability_id === parseInt(booking?.availability_id)
        );

        if (currentAvailability) {
          setSelectedAvailability(currentAvailability);
          const bookingStartTime = booking.departure_date_time
            .split("T")[1]
            .replace("Z", "")
            .split(".")[0];
          const currentSlot = currentAvailability.time_slots.find(
            (slot: any) => slot.start_time === bookingStartTime
          );

          if (currentSlot) {
            setSelectedSlot(currentSlot);
            const initialQuantities: { [key: string]: number } = {};
            currentSlot.prices.forEach((price: any) => {
              initialQuantities[price.price_id.toString()] = 0;
            });

            booking.participants.forEach((participant: any) => {
              const matchingPrice = currentSlot.prices.find(
                (price: any) =>
                  price.price_id.toString() === participant.tier_id ||
                  (price.name === participant.participant_type &&
                    price.option === participant.option_name)
              );

              if (matchingPrice) {
                initialQuantities[matchingPrice.price_id.toString()] =
                  participant.quantity;
              }
            });

            setQuantities(initialQuantities);
          }
        }
      } catch (error) {
        console.error("Error fetching initial availability:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialAvailability();
  }, [booking, currency, selectedDate]);
  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd");
      setSelectedDate(formattedDate);
      checkAvailability(formattedDate);
    }
  };

  const checkAvailability = async (date: string) => {
    setIsLoading(true);
    try {
      const response = await checkAvailibility(
        booking.product_id,
        { date },
        currency
      );
      setAvailabilities(response.data);

      const sameAvailability = response.data.find(
        (avail: any) =>
          avail.availability_id === selectedAvailability?.availability_id
      );

      if (sameAvailability) {
        setSelectedAvailability(sameAvailability);

        if (selectedSlot) {
          const sameSlot = sameAvailability.time_slots.find(
            (slot: any) => slot.start_time === selectedSlot.start_time
          );

          if (sameSlot) {
            setSelectedSlot(sameSlot);

            const newQuantities: { [key: string]: number } = {};
            sameSlot.prices.forEach((price: any) => {
              const priceId = price.price_id.toString();
              newQuantities[priceId] = quantities[priceId] || 0;
            });
            setQuantities(newQuantities);
            return;
          }
        }
      }
      setSelectedAvailability(null);
      setSelectedSlot(null);
      setQuantities({});
    } catch (error) {
      console.error("Error checking availability:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvailabilitySelection = (availability: any) => {
    setSelectedAvailability(availability);
    if (availability.time_slots.length > 0) {
      if (selectedSlot) {
        const sameSlot = availability.time_slots.find(
          (slot: any) => slot.start_time === selectedSlot.start_time
        );
        if (sameSlot) {
          setSelectedSlot(sameSlot);
          const newQuantities: { [key: string]: number } = {};
          sameSlot.prices.forEach((price: any) => {
            const priceId = price.price_id.toString();
            newQuantities[priceId] = quantities[priceId] || 0;
          });
          setQuantities(newQuantities);
          return;
        }
      }
      const newSlot = availability.time_slots[0];
      setSelectedSlot(newSlot);
      const newQuantities: { [key: string]: number } = {};
      newSlot.prices.forEach((price: any) => {
        newQuantities[price.price_id.toString()] = 0;
      });
      setQuantities(newQuantities);
    }
  };

  const handleSlotSelection = (slot: any) => {
    setSelectedSlot(slot);
    const newQuantities: { [key: string]: number } = {};
    slot.prices.forEach((price: any) => {
      const priceId = price.price_id.toString();
      newQuantities[priceId] = quantities[priceId] || 0;
    });
    setQuantities(newQuantities);
  };

  const handleQuantityChange = (priceId: string, change: number) => {
    const price = selectedSlot?.prices.find(
      (p: any) => p.price_id.toString() === priceId
    );
    if (!price) return;

    const newQuantity = (quantities[priceId] || 0) + change;

    if (newQuantity < 0 || newQuantity > (price.available_capacity || 0))
      return;

    setQuantities((prev) => ({
      ...prev,
      [priceId]: newQuantity,
    }));
  };

  const calculateTotalPrice = () => {
    if (!selectedSlot) return 0;
    return selectedSlot.prices.reduce((total: number, price: any) => {
      const quantity = quantities[price.price_id.toString()] || 0;
      const priceValue = price.has_discount
        ? price.discounted_price
        : price.price;
      return total + priceValue * quantity;
    }, 0);
  };

  const handleSubmit = async () => {
    if (!selectedAvailability || !selectedSlot) return;

    const updatedBooking = {
      booking_id: booking.id,
      availability_id: selectedAvailability.availability_id,
      start_time: selectedSlot.start_time,
      end_time: selectedSlot.end_time,
      departure_date: selectedDate,
      items: Object.entries(quantities)
        .filter(([_, quantity]) => quantity > 0)
        .map(([priceId, quantity]) => {
          const price = selectedSlot.prices.find(
            (p: any) => p.price_id.toString() === priceId
          );
          return {
            price_id: parseInt(priceId, 10),
            quantity,
          };
        }),
    };

    try {
      const response = await updateActivity(updatedBooking, currency);
      onSubmit(response.data);
      onClose();
    } catch (error) {
      toast.error("could not update booking")
      console.error("Error updating booking:", error);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle>Edit Booking: {booking.product_title}</DialogTitle>
        </DialogHeader>

        <div className="px-6 py-2">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <CustomDatePicker
              selectedDate={selectedDate}
              handleDateChange={handleDateChange}
            />
          </div>
        </div>

        <ScrollArea className="h-[60vh] px-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <p>Loading availabilities...</p>
            </div>
          ) : availabilities.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <p className="text-lg font-medium text-muted-foreground">
                No availabilities found for this date
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Please try selecting a different date
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {availabilities.map((availability) => (
                <div
                  key={availability.availability_id}
                  onClick={() => handleAvailabilitySelection(availability)}
                  className={`border rounded-lg p-4 transition-all cursor-pointer ${
                    selectedAvailability?.availability_id ===
                    availability.availability_id
                      ? "border-blue-200 shadow-sm bg-blue-50"
                      : "border-muted hover:border-blue-200"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">
                        {availability.schedule_name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {availability.availability_type} •{" "}
                        {availability.price_type}
                      </p>
                    </div>
                    {selectedAvailability?.availability_id ===
                      availability.availability_id && (
                      <Badge variant="outline">Selected</Badge>
                    )}
                  </div>

                  <Separator className="my-3" />

                  <h4 className="text-sm font-medium mb-2">
                    Available Time Slots:
                  </h4>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {availability.time_slots.map((slot: any) => (
                      <Button
                        key={`${availability.availability_id}-${slot.start_time}`}
                        variant={
                          selectedSlot?.start_time === slot.start_time &&
                          selectedAvailability?.availability_id ===
                            availability.availability_id
                            ? "default"
                            : "outline"
                        }
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSlotSelection(slot);
                        }}
                      >
                        {slot.start_time}
                      </Button>
                    ))}
                  </div>

                  {selectedAvailability?.availability_id ===
                    availability.availability_id &&
                    selectedSlot && (
                      <>
                        <Separator className="my-3" />
                        <div
                          className="space-y-4"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {selectedSlot.prices.map((price: any) => (
                            <div
                              key={price.price_id}
                              className="flex justify-between items-center"
                            >
                              <div>
                                <p className="font-medium">
                                  {price.name} ({price.option})
                                  {price.tier_id && ` (Tier ${price.tier_id})`}
                                </p>
                                <div className="flex items-center gap-2 mt-1">
                                  {price.has_discount ? (
                                    <>
                                      <span className="text-muted-foreground line-through text-sm">
                                        {formatCurrency(
                                          price.price,
                                          price.currency
                                        )}
                                      </span>
                                      <span className="font-semibold">
                                        {formatCurrency(
                                          price.discounted_price,
                                          price.currency
                                        )}
                                      </span>
                                      <Badge
                                        variant="secondary"
                                        className="text-xs bg-green-100"
                                      >
                                        Save {price.discount_percent}%
                                      </Badge>
                                    </>
                                  ) : (
                                    <span className="font-semibold">
                                      {formatCurrency(
                                        price.price,
                                        price.currency
                                      )}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                  Available: {price.available_capacity}
                                </p>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleQuantityChange(
                                      price.price_id.toString(),
                                      -1
                                    );
                                  }}
                                  disabled={
                                    !quantities[price.price_id.toString()]
                                  }
                                >
                                  -
                                </Button>
                                <span className="w-8 text-center">
                                  {quantities[price.price_id.toString()] || 0}
                                </span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleQuantityChange(
                                      price.price_id.toString(),
                                      1
                                    );
                                  }}
                                  disabled={
                                    quantities[price.price_id.toString()] >=
                                    price.available_capacity
                                  }
                                >
                                  +
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <div className="p-4 border-t bg-muted/50">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-lg font-semibold">
              {availabilities.length > 0 ? (
                `Total: ${formatCurrency(calculateTotalPrice(), currency)}`
              ) : (
                <span className="text-muted-foreground">
                  No availability selected
                </span>
              )}
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button onClick={onClose} variant="outline" className="flex-1">
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                className="flex-1"
                disabled={
                  availabilities.length === 0 || calculateTotalPrice() === 0
                }
              >
                Update Booking
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
