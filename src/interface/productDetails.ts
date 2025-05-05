interface Price {
  price_id: number;
  name: string;
  option: string;
  price: number;
  currency: string;
  capacity: number;
  available_capacity: number;
  has_discount: boolean;
  discounted_price: number;
  discount_percent: number;
}

interface TimeSlot {
  start_time: string;
  end_time: string;
  total_capacity: number;
  total_booked: number;
  available_capacity: number;
  prices: Price[];
}

interface Availability {
  availability_id: number;
  availability_type: string;
  price_type: string;
  schedule_name: string;
  start_date: string;
  end_date: string | null;
  time_slots: TimeSlot[];
}

interface AvailabilityModalProps {
  isOpen: boolean;
  availabilities: Availability[];
  onClose: () => void;  
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  handleCheckAvailability: () => void;
  product_id: string;
}
