import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";

export const CustomDatePicker = ({ selectedDate, handleDateChange }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="relative">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Button
          ref={triggerRef}
          variant="outline"
          className="w-full justify-start text-left font-normal"
          onClick={() => setIsOpen(!isOpen)}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {selectedDate ? format(new Date(selectedDate), "PPP") : "Select date"}
        </Button>

        {isOpen && (
          <div
            ref={popoverRef}
            className="absolute top-full left-0 mt-1 z-[1000] bg-white border rounded-md shadow-lg p-2 w-auto"
          >
            <Calendar
              mode="single"
              selected={new Date(selectedDate)}
              onSelect={(date) => {
                handleDateChange(date);
                setIsOpen(false);
              }}
              disabled={(date) =>
                date < new Date(new Date().setHours(0, 0, 0, 0))
              }
              initialFocus
            />
          </div>
        )}
      </div>
    </div>
  );
};
