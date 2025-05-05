// "use server";

import axiosInstance from "@/lib/AxiosInstance";
import Cookies from "js-cookie";

export const reviewToDb = async (data: any) => {
  try {
    const res = await axiosInstance.post("/shop/reviews/", data);
    return res?.data;
  } catch (error: any) {
    throw new Error(`Review Error : ${error?.message}`);
  }
};
export const updatedProfileToDb = async (data: any) => {
  try {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (key === 'image' && data[key]) {
        formData.append(key, data[key]);
      } else if (data[key] !== undefined && data[key] !== null) {
        formData.append(key, data[key]);
      }
    });

    const res = await axiosInstance.patch("/auth/users/me/", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return res?.data;
  } catch (error: any) {
    // Pass through the entire error response
    if (error.response) {
      throw error.response.data;
    }
    throw error;
  }
};

export const bookActivity = async (
  data: any,
  currency_type: string = "USD"
) => {
  const accessToken = Cookies.get("access_token");

  try {
    if (accessToken) {
      const response = await axiosInstance.post(
        `/shop/tours/g/create/bookings/?currency_type=${currency_type}`,
        data
      );
      return response.data;
    } else {
      let guestId = Cookies.get("guest_id");
      const response = await axiosInstance.post(
        `/shop/tours/g/create/bookings/?currency_type=${currency_type}`,
        { ...data, guest_id: guestId }
      );
      return response.data;
    }
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const updateActivity = async (
  data: any,
  currency_type: string = "USD"
) => {
  try {
    const response = await axiosInstance.patch(
      `/shop/tours/g/create/bookings/?currency_type=${currency_type}`,
      data
    );
    return response?.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
};

export const downloadReceipt = async (bookingId: string) => {
  try {
    const accessToken = Cookies.get("access_token");
    let response;
    if (accessToken) {
      response = await axiosInstance.post(
        "/shop/download-receipt/",
        { booking: bookingId },
        {
          responseType: "blob",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    } else {
      const guestId = Cookies.get("guest_id");
      if (!guestId) {
        throw new Error("Guest ID not found");
      }

      response = await axiosInstance.post(
        "/shop/download-receipt/",
        { booking: bookingId, guest_id: guestId },
        {
          responseType: "blob",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    if (!response) {
      throw new Error("No response received");
    }

    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `receipt_${bookingId}.pdf`);
    document.body.appendChild(link);
    link.click();

    // Clean up
    window.URL.revokeObjectURL(url);
    link.remove();
  } catch (error: any) {
    console.error("Error downloading receipt:", error);
    throw new Error(error.message || "Failed to download receipt");
  }
};
