interface Slot {
  start_time: string;
  prices: {
    price_id: string;
    name: string;
    option: string;
    price: number;
    capacity: number;
  }[];
}

interface Schedule {
  schedule_id: string;
  schedule_name: string;
  location: string;
  duration: string;
  language: string;
  start_time: string;
  end_time: string;
  available_slots: Slot[];
}

interface AvailabilityPopupProps {
  isOpen: boolean;
  schedules: Schedule[];
  onClose: () => void;
  handleCheckAvailability: () => void;
  selectedDate: any;
  setSelectedDate: any;
  product_id: any;
}
