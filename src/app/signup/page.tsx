"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ApiBaseMysql } from "@/Helper/ApiBase";
import { toast } from "sonner";
import { countries } from "@/lib/countryCodes";
import ReactCountryFlag from "react-country-flag";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Signup = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    country: "Italy", // Will be set based on phone code selection
    phoneCode: "+39",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "phone") {
      // Validate phone number format
      if (value && !/^[\d\s-]+$/.test(value)) {
        setPhoneError(
          "Phone number can only contain digits, spaces, or hyphens"
        );
      } else {
        setPhoneError("");
      }
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePhoneCodeChange = (phoneCode: string) => {
    // Find the country that matches this phone code
    const selectedCountry = countries.find((c) => c.phone === phoneCode);

    setFormData({
      ...formData,
      phoneCode,
      country: selectedCountry?.name || "Italy", // Default to Italy if not found
    });
  };

  const validatePhoneNumber = (phone: string, phoneCode: string) => {
    if (!phone) return "Phone number is required";
    if (!/^[\d\s-]+$/.test(phone)) return "Invalid phone number format";

    // Remove all non-digit characters
    const digitsOnly = phone.replace(/\D/g, "");

    // Get country code from phone code
    const country = countries.find((c) => c.phone === phoneCode);
    const countryCode = country?.code || "";

    // Country-specific validation examples
    if (countryCode === "US" && digitsOnly.length !== 10) {
      return "US phone numbers must be 10 digits";
    }
    if (
      countryCode === "GB" &&
      (digitsOnly.length < 10 || digitsOnly.length > 11)
    ) {
      return "UK phone numbers must be 10-11 digits";
    }
    if (countryCode === "IN" && digitsOnly.length !== 10) {
      return "Indian phone numbers must be 10 digits";
    }

    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const phoneErrorMsg = validatePhoneNumber(
      formData.phone,
      formData.phoneCode
    );
    if (phoneErrorMsg) {
      setPhoneError(phoneErrorMsg);
      return;
    }

    const backendData = {
      ...formData,
      phone: `${formData.phoneCode}${formData.phone.replace(/\D/g, "")}`,
      // Remove fields not needed by backend
      phoneCode: undefined,
      confirmPassword: undefined,
    };

    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${ApiBaseMysql}/auth/users/`,
        backendData
      );
      if (response.status === 201) {
        toast.success(`Sign up Successfully`);
        router.push("/login");
      }
    } catch (error: any) {
      console.error("Registration error:", error);
      // Improved error handling
      const errorMessage = () => {
        const errorDetails = error?.response?.data?.details;

        if (errorDetails) {
          // Check each possible field for errors
          if (errorDetails.email?.[0]) {
            return `Email: ${errorDetails.email[0]}`;
          }
          if (errorDetails.password?.[0]) {
            return `Password: ${errorDetails.password[0]}`;
          }
          if (errorDetails.phone?.[0]) {
            return `Phone: ${errorDetails.phone[0]}`;
          }
        }

        // Fallback to general error message
        return "An error occurred. Please try again.";
      };

      // Show the error
      toast.error(errorMessage());
      setError(errorMessage());
    } finally {
      setLoading(false);
    }
  };

  const currentCountry = countries.find((c) => c.phone === formData.phoneCode);

  return (
    <div>
      <div className="bg-gray-50 font-sans min-h-screen flex flex-col items-center justify-center py-6 px-4">
        {error && <div className="text-center text-red-500 py-2">{error}</div>}
        <div className="max-w-lg w-full">
          <div className="p-8 rounded-2xl bg-white shadow">
            <h2 className="text-gray-800 text-center text-2xl font-bold">
              Sign Up
            </h2>
            <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-4">
                <input
                  name="first_name"
                  type="text"
                  placeholder="First Name"
                  required
                  onChange={handleChange}
                  className="w-full border px-4 py-3 rounded-md"
                />
                <input
                  name="last_name"
                  type="text"
                  placeholder="Last Name"
                  required
                  onChange={handleChange}
                  className="w-full border px-4 py-3 rounded-md"
                />
              </div>

              {/* Phone input with country code selector */}
              <div className="flex items-center gap-2">
                <Select
                  onValueChange={handlePhoneCodeChange}
                  value={formData.phoneCode}
                  required
                >
                  <SelectTrigger className="w-1/3 border px-4 py-3 rounded-md">
                    <SelectValue placeholder="Code">
                      {currentCountry && (
                        <div className="flex items-center gap-2">
                          <ReactCountryFlag
                            countryCode={currentCountry.code}
                            svg
                            style={{
                              width: "1.5em",
                              height: "1.5em",
                            }}
                          />
                          {formData.phoneCode}
                        </div>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.phone}>
                        <div className="flex items-center gap-2">
                          <ReactCountryFlag
                            countryCode={country.code}
                            svg
                            style={{
                              width: "1.5em",
                              height: "1.5em",
                            }}
                          />
                          {country.name} ({country.phone})
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border px-4 py-3 rounded-md"
                />
              </div>
              {phoneError && (
                <div className="text-red-500 text-sm">{phoneError}</div>
              )}

              <input
                name="email"
                type="email"
                placeholder="Email"
                required
                onChange={handleChange}
                className="w-full border px-4 py-3 rounded-md"
              />
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  required
                  onChange={handleChange}
                  className="w-full border px-4 py-3 rounded-md"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3"
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>
              <input
                name="address"
                type="text"
                placeholder="Address"
                required
                onChange={handleChange}
                className="w-full border px-4 py-3 rounded-md"
              />

              <button
                type="submit"
                className="w-full py-3 px-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
                disabled={!!phoneError || loading}
              >
                {loading ? "Loading..." : "Sign Up"}
              </button>

              <p className="text-gray-800 text-sm mt-4 text-center">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Sign in here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signup;