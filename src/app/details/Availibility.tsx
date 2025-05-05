"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { bookActivity } from "@/utils/post/post.action";
import { useAuth } from "@/Helper/authContext";
import { toast } from "sonner";
import { currencySymbols } from "@/lib/currencyContant";
import { useCurrency } from "@/lib/currencyContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CustomDatePicker } from "../_components/CustomCalendar";
import { AuthModal } from "./AuthModal";

export default function AvailabilityModal({
  isOpen,
  availabilities,
  onClose,
  selectedDate,
  setSelectedDate,
  handleCheckAvailability,
  product_id,
}: AvailabilityModalProps) {
  const [selectedAvailability, setSelectedAvailability] =
    useState<Availability | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { currency } = useCurrency();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<() => void>(() => {});

  const handleAuthAction = (action: () => void) => {
    if (!isAuthenticated) {
      setPendingAction(() => action);
      setShowLoginModal(true);
      return false;
    }
    return true;
  };

  const handleLoginSuccess = () => {
    if (pendingAction) {
      pendingAction();
    }
  };

  const handleBook = async () => {
    try {
      if (!selectedAvailability || !selectedSlot) {
        console.error("Please select an availability and time slot");
        return;
      }

      if (!validateMinimumQuantity()) return;

      const bookingData = {
        availability_id: selectedAvailability.availability_id,
        start_time: selectedSlot.start_time,
        end_time: selectedSlot.end_time,
        product_id: product_id,
        departure_date: selectedDate,
        items: Object.entries(quantities)
          .filter(([_, quantity]) => quantity > 0)
          .map(([priceId, quantity]) => ({
            price_id: parseInt(priceId, 10),
            quantity,
          })),
      };

      const data = await bookActivity(bookingData, currency);
      toast.success("Reservation Successful", {
        description: "Your booking has been confirmed.",
      });
      router.push("/cart");
    } catch (error) {
      toast.error("Booking Failed", {
        description: "Could not reserve your booking. Please try again.",
      });
    }
  };

  const handleAddToCart = () => {
    if (!validateMinimumQuantity()) return;
    handleBook();
  };

  useEffect(() => {
    if (availabilities.length > 0) {
      const initialAvailability = availabilities[0];
      setSelectedAvailability(initialAvailability);

      if (initialAvailability.time_slots.length > 0) {
        const initialSlot = initialAvailability.time_slots[0];
        setSelectedSlot(initialSlot);

        const initialQuantities: { [key: string]: number } = {};
        initialSlot.prices.forEach((price) => {
          initialQuantities[price.price_id.toString()] = 0;
        });
        setQuantities(initialQuantities);
      }
    }
  }, [availabilities]);

  const handleQuantityChange = (priceId: string, change: number) => {
    const price = selectedSlot?.prices.find(
      (p) => p.price_id.toString() === priceId
    );
    if (!price) return;

    const newQuantity = (quantities[priceId] || 0) + change;

    if (newQuantity < 0 || newQuantity > price.available_capacity) {
      toast.warning("Invalid Quantity", {
        description: `You cannot book more than ${price.available_capacity} participants for ${price.name}.`,
      });
      return;
    }

    setQuantities((prev) => ({
      ...prev,
      [priceId]: newQuantity,
    }));
  };

  const validateMinimumQuantity = () => {
    const totalQuantity = Object.values(quantities).reduce(
      (sum, quantity) => sum + quantity,
      0
    );
    if (totalQuantity < 1) {
      toast.warning("Minimum Quantity Required", {
        description: "You must book at least 1 participant to proceed.",
      });
      return false;
    }
    return true;
  };

  const calculateTotalPrice = () => {
    if (!selectedSlot) return 0;

    const price = selectedSlot.prices.reduce((total, price) => {
      const quantity = quantities[price.price_id.toString()] || 0;
      const priceValue = price.has_discount
        ? price.discounted_price
        : price.price;
      return total + priceValue * quantity;
    }, 0);
    return formatPrice(price, currency);
  };

  const calculateNonFormatterTotalPrice = () => {
    if (!selectedSlot) return 0;

    const price = selectedSlot.prices.reduce((total, price) => {
      const quantity = quantities[price.price_id.toString()] || 0;
      const priceValue = price.has_discount
        ? price.discounted_price
        : price.price;
      return total + priceValue * quantity;
    }, 0);
    return price;
  };

  const formatPrice = (price: number, currencyCode: string) => {
    const symbol = currencySymbols[currencyCode] || currencyCode;
    return `${symbol}${price?.toFixed(2) || "0.00"}`;
  };

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      const formattedDate = format(date, "yyyy-MM-dd");
      setSelectedDate(formattedDate);
      handleCheckAvailability();
    }
  };

  const handleAvailabilitySelection = (availability: Availability) => {
    if (
      selectedAvailability?.availability_id === availability.availability_id
    ) {
      return;
    }

    setSelectedAvailability(availability);
    if (availability.time_slots.length > 0) {
      const newSlot = availability.time_slots[0];
      setSelectedSlot(newSlot);

      const newQuantities: { [key: string]: number } = {};
      newSlot.prices.forEach((price) => {
        const priceId = price.price_id.toString();
        newQuantities[priceId] = quantities[priceId] || 0;
      });
      setQuantities(newQuantities);
    } else {
      setSelectedSlot(null);
      setQuantities({});
    }
  };

  const handleSlotSelection = (slot: TimeSlot) => {
    setSelectedSlot(slot);

    const newQuantities: { [key: string]: number } = {};
    slot.prices.forEach((price) => {
      const priceId = price.price_id.toString();
      newQuantities[priceId] = quantities[priceId] || 0;
    });
    setQuantities(newQuantities);
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0">
          <DialogHeader className="px-6 py-4 border-b">
            <DialogTitle>Check Availability</DialogTitle>
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
            <div className="space-y-4">
              {availabilities.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <p className="text-lg font-medium text-muted-foreground">
                    No availabilities found for this date
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Please try selecting a different date
                  </p>
                </div>
              ) : (
                availabilities.map((availability) => (
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
                      {availability.time_slots.map((slot) => (
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
                            {selectedSlot.prices.map((price) => (
                              <div
                                key={price.price_id}
                                className="flex justify-between items-center"
                              >
                                <div>
                                  <p className="font-medium">
                                    {price.name} ({price.option})
                                  </p>
                                  <div className="flex items-center gap-2 mt-1">
                                    {price.has_discount ? (
                                      <>
                                        <span className="text-muted-foreground line-through text-sm">
                                          {formatPrice(
                                            price.price,
                                            price.currency
                                          )}
                                        </span>
                                        <span className="font-semibold">
                                          {formatPrice(
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
                                        {formatPrice(
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
                ))
              )}
            </div>
          </ScrollArea>

          <div className="p-4 border-t bg-muted/50">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-lg font-semibold">
                {availabilities.length > 0 ? (
                  `Total: ${calculateTotalPrice()}`
                ) : (
                  <span className="text-muted-foreground">
                    No availability selected
                  </span>
                )}
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  onClick={() => {
                    if (handleAuthAction(handleAddToCart)) {
                      handleAddToCart();
                    }
                  }}
                  variant="secondary"
                  className="flex-1"
                  disabled={
                    availabilities.length === 0 ||
                    calculateNonFormatterTotalPrice() === 0
                  }
                >
                  Add to Cart
                </Button>
                <Button
                  onClick={() => {
                    if (handleAuthAction(handleBook)) {
                      handleBook();
                    }
                  }}
                  className="flex-1"
                  disabled={
                    availabilities.length === 0 ||
                    calculateNonFormatterTotalPrice() === 0
                  }
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AuthModal
        isOpen={showLoginModal}
        onOpenChange={setShowLoginModal}
        onLoginSuccess={handleLoginSuccess}
        handleBook={handleBook}
      />
    </>
  );
}
