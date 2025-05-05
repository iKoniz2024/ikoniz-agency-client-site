"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { ApiBaseMysql } from "@/Helper/ApiBase";
import axiosInstance from "@/lib/AxiosInstance";
import { Suspense } from "react";

const ForgotPasswordContent = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [uid, setUid] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isResetLink, setIsResetLink] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const uidParam = searchParams.get('uid');
    const tokenParam = searchParams.get('token');
    
    if (uidParam && tokenParam) {
      setUid(uidParam);
      setToken(tokenParam);
      setIsResetLink(true);
    }
  }, [searchParams]);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleSendResetLink = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return toast.error("Please enter a valid email address.");
    }

    setLoading(true);
    try {
      const response = await axiosInstance.post(
        `/auth/users/reset_password/`,
        { email }
      );

      if (response.status === 204) {
        toast.success("Password reset link has been sent to your email!");
      }
    } catch (error: any) {
      console.error("Reset error:", error);
      const errorMessage =
        error.response?.data?.email?.[0] ||
        error.response?.data?.detail ||
        "Failed to send reset link. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePassword(newPassword)) {
      return toast.error("Password must be at least 8 characters long.");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${ApiBaseMysql}/auth/users/reset_password_confirm/`,
        {
          uid,
          token,
          new_password: newPassword,
          re_new_password: confirmPassword,
        }
      );

      if (response.status === 204) {
        toast.success("Password has been reset successfully!");
        router.push("/login");
      }
    } catch (error: any) {
      console.error("Password reset error:", error);
      const errorMessage =
        error.response?.data?.token?.[0] ||
        error.response?.data?.uid?.[0] ||
        error.response?.data?.non_field_errors?.[0] ||
        "Failed to reset password. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          {isResetLink ? "Create New Password" : "Reset Your Password"}
        </h2>

        {!isResetLink ? (
          <form onSubmit={handleSendResetLink} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md disabled:opacity-50 transition-colors"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

            <div className="text-center text-sm text-gray-600 mt-4">
              Remember your password?{" "}
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Sign in
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition"
                placeholder="At least 8 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition"
                placeholder="Re-enter your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md disabled:opacity-50 transition-colors"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

const ForgotPassword = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    }>
      <ForgotPasswordContent />
    </Suspense>
  );
};

export default ForgotPassword;