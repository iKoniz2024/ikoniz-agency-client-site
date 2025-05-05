// "use server";
import { ApiBaseMysql } from "@/Helper/ApiBase";
import axiosInstance from "@/lib/AxiosInstance";
import axios from "axios";
import Cookies from "js-cookie";

export const getProductDetails = async (
  type: string | null,
  id: number,
  currency: string = "USD"
) => {
  try {
    const response = await axios.get(
      `${ApiBaseMysql}/shop/tours/${type}/${id}/?currency_type=${currency}`
    );
    return response?.data;
  } catch (error: any) {
    console.log(error.response?.data?.error?.message);
    throw new Error(
      error.response?.data?.error?.message || "Failed to fetch tour Details"
    );
  }
};

export const getProductList = async (currency: string = "USD") => {
  try {
    const response = await axiosInstance.get(
      `/shop/tours/?currency_type=${currency}`
    );
    return response?.data;
  } catch (error: any) {
    console.log(error);
    // throw new Error(error);
  }
};
export const getProfile = async () => {
  try {
    const accessToken = Cookies.get("access_token");
    if (accessToken) {
      const response = await axiosInstance.get(`/auth/users/me/`);
      return response?.data;
    }
    return {};
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};
export const getBookingList = async (params: Record<string, any> = {}) => {
  const accessToken = Cookies.get("access_token");

  try {
    if (accessToken) {
      const response = await axiosInstance.get(`/shop/bookings/`, { params });
      return response.data;
    } else {
      let guestId = Cookies.get("guest_id");

      if (!guestId || guestId == undefined || guestId == "undefined") {
        const response = await axiosInstance.get(`/shop/bookings/guest/`, {
          params: { ...params },
        });

        const newGuestId = response?.data.data?.guest_id;
        if (newGuestId) {
          Cookies.set("guest_id", newGuestId);
        }
        return response.data;
      }
      const response = await axiosInstance.get(`/shop/bookings/guest/`, {
        params: { ...params, guest_id: guestId },
      });
      return response.data;
    }
  } catch (error: unknown) {
    console.error("Failed to fetch booking list:", error);

    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred");
  }
};

export const getBooking = async (id: any) => {
  const accessToken = Cookies.get("access_token");
  try {
    if (accessToken) {
      const response = await axiosInstance.get(`/shop/bookings/${id}`);
      return response.data;
    } else {
      let guestId = Cookies.get("guest_id");
      const response = await axiosInstance.get(
        `/shop/bookings/${id}/guest/${guestId}/`
      );
      return response.data;
    }
  } catch (error: unknown) {
    console.error("Failed to fetch booking:", error);

    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred");
  }
};
export const updateGuestBooking = async (id: any, data: any) => {
  try {
    let guestId = Cookies.get("guest_id");
    const response = await axiosInstance.patch(
      `/shop/bookings/${id}/guest/${guestId}/`,
      data
    );
    return response;
  } catch (error: unknown) {
    console.error("Failed to update booking:", error);
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred");
  }
};

export const checkAvailibility = async (
  id: any,
  data: any,
  currency: string = "USD"
) => {
  try {
    const response = await axiosInstance.post(
      `/shop/tours/g/${id}/available/?currency_type=${currency}`,
      data
    );
    return response?.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

const fetchBlogs = async (data: any) => {
  try {
    const params = {
      search: data.search ? data.search : "",
      page: data.page ? data.page : "",
      page_size: data.page_size ? data.page_size : 10,
    };
    const response = await axiosInstance.get(`/blog/blogs/`, { params });
    return response.data;
  } catch (error) {
    return error;
  }
};
const fetchBlogDetail = async (id: any) => {
  try {
    const response = await axiosInstance.get(`/blog/blogs/${id}/`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export { fetchBlogs, fetchBlogDetail };
