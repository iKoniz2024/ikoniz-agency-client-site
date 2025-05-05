import axios from "axios";
import Cookies from "js-cookie";
import { ApiBaseMysql } from "@/Helper/ApiBase";

// Create axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: ApiBaseMysql,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds timeout
});

/**
 * Verifies JWT token validity
 * @param {string} token - JWT token to verify
 * @returns {Promise<boolean>} - Whether token is valid
 */
const verifyToken = async (token: string): Promise<boolean> => {
  try {
    const response = await axios.post(`${ApiBaseMysql}/auth/jwt/verify/`, {
      token,
    });
    return response.status === 200;
  } catch (error) {
    console.error("Token verification failed:", error);
    return false;
  }
};

/**
 * Handles token refresh logic
 * @returns {Promise<string|null>} - New access token or null
 */
const refreshToken = async (): Promise<string | null> => {
  try {
    const refreshToken = Cookies.get("refresh_token");
    if (!refreshToken) return null;

    const response = await axios.post(`${ApiBaseMysql}/auth/jwt/refresh/`, {
      refresh: refreshToken,
    });

    if (response.data?.access) {
      Cookies.set("access_token", response.data.access);
      return response.data.access;
    }
    return null;
  } catch (error) {
    console.error("Token refresh failed:", error);
    return null;
  }
};

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    let accessToken: string | undefined;
    if (typeof window !== "undefined") {
      accessToken =
        Cookies.get("access_token") ||
        localStorage.getItem("access_token") ||
        undefined;
    }

    if (accessToken) {
      const isValid = await verifyToken(accessToken);

      if (!isValid) {
        const newToken = await refreshToken();
        if (newToken) {
          accessToken = newToken;
        } else {
          Cookies.remove("access_token");
          Cookies.remove("refresh_token");
          if (typeof window !== "undefined") {
            localStorage.removeItem("access_token");
            window.location.href = "/login?session_expired=true";
          }
          return Promise.reject(new Error("Session expired"));
        }
      }

      config.headers.Authorization = `JWT ${accessToken}`;
    }

    return config;
  },
  (error) => {
    console.error("Request interceptor error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshToken();
        if (newToken) {
          originalRequest.headers.Authorization = `JWT ${newToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
      }

      // Clear auth data if refresh fails
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      if (typeof window !== "undefined") {
        localStorage.removeItem("access_token");
        window.location.href = "/login?session_expired=true";
      }
    }

    // Enhanced error handling
    // Enhanced error handling - preserve the full error response
    const enhancedError = {
      ...error,
      name: `HTTP_${error.response?.status || "NETWORK_ERROR"}`,
      message:
        error.response?.data?.message || error.message || "Request failed",
      response: error.response, // Keep the full response
      data: error.response?.data, // Keep the response data
    };

    return Promise.reject(enhancedError);
  }
);

export default axiosInstance;
