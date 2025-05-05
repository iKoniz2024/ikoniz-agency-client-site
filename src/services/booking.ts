import Cookies from "js-cookie";
import axiosInstance from "@/lib/AxiosInstance";

interface IUser {
  email: string;
}
interface IBooking {
  id?: string;
  user?: IUser;
  product_id?: string;
  total_persons?: number;
  product_title?: string;
  duration?: string;
  departure_from?: string;
  departure_date_time?: any;
  product_thumbnail: string;
  total_amount: number;
  gross_amount: number;
  currency_type: string;
  location?: string;
  status: "Reserved" | "Confirmed" | "Cancelled";
  updated_at: any;
  created_at: any;
  participants: IParticipant[];
}

interface IParticipant {
  id?: string;
  participant_type: string;
  quantity: number;
  cost_per_unit: number;
}

export const fetchBookingDetails = async (id: string): Promise<IBooking> => {
  const accessToken = Cookies.get("access_token");
  try {
    if (accessToken) {
      const response = await axiosInstance.get(`/shop/bookings/${id}`);
      return response.data.data;
    } else {
      let guestId = Cookies.get("guest_id");
      const response = await axiosInstance.get(
        `/shop/bookings/${id}/guest/${guestId}`
      );
      return response.data.data;
    }
  } catch (error) {
    console.error("Error fetching booking details:", error);
    throw new Error("Failed to fetch booking details.");
  }
};

export const cancelBooking = async (id: string) => {
  try {
    const response = await axiosInstance.post(`/shop/refund/${id}/`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching booking details:", error);
    throw new Error("Failed to fetch booking details.");
  }
};

export const updateParticipants = async (data: any) => {
  try {
    const accessToken = Cookies.get("access_token");
    if (accessToken) {
      const response = await axiosInstance.patch(`/shop/participants/`, data);
      return response.data.data;
    }
    let guestId = Cookies.get("guest_id");
    const response = await axiosInstance.patch(`/shop/participants/`, {
      ...data,
      guest_id: guestId,
    });

    return response.data.data;
  } catch (error) {
    console.error("Error fetching booking details:", error);
    throw new Error("Failed to fetch booking details.");
  }
};
