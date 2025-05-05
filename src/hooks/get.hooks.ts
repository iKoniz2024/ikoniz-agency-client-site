import axiosInstance from "@/lib/AxiosInstance";
import { useCurrency } from "@/lib/currencyContext";
import {
  getBooking,
  getBookingList,
  getProductDetails,
  getProductList,
  getProfile,
} from "@/utils/get/get.action";
import { useQuery } from "@tanstack/react-query";

export const useGetProductDetails = (type: string | null, id: number) => {
  const { currency } = useCurrency();
  
  return useQuery({
    queryKey: ["PRODUCT_DETAILS", type, id, currency],
    queryFn: () => getProductDetails(type, id, currency),
    enabled: !!type && !!id,
  });
};

export const useGetProduct = () => {
  const { currency } = useCurrency();
  
  return useQuery({
    queryKey: ["PRODUCT_LIST", currency],
    queryFn: () => getProductList(currency),
  });
};
export const useGetProfile = () => {
  return useQuery({
    queryKey: ["PROFILE"],
    queryFn: getProfile,
  });
};
export const useGetBookingList = (status?: string) => {
  return useQuery({
    queryKey: ["BOOKING_LIST"], 
    queryFn: () => {
      return getBookingList({ status });
    },
    enabled: true,
  });
};

export const useGetBookingById = (id: string | null) => {
  return useQuery({
    queryKey: ["booking", id],
    queryFn: async () => {
      if (!id) return null;
      const res = await getBooking(id);
      return res.data;
    },
    enabled: !!id,
  });
};
