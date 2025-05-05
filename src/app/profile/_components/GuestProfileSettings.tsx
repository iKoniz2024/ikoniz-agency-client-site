"use client";
import { useGetProfile } from "@/hooks/get.hooks";
import { useUpdateProfile } from "@/hooks/post.hook";
import { useState, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import { countries } from "@/lib/countryCodes";
import ReactCountryFlag from "react-country-flag";
import { updateGuestBooking } from "@/utils/get/get.action";
import { toast } from "sonner";

const bloodGroups = [
  "A+",
  "A-",
  "B+",
  "B-",
  "AB+",
  "AB-",
  "O+",
  "O-",
  "Unknown",
];

function GuestProfileSettings({ profileData, refetch }: any) {
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    date_of_birth: "",
    phone: "",
    phoneCode: "+1",
    blood_group: "",
    address: "",
    city: "",
    country: "United States",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    if (profileData) {
      let phoneCode = "+1";
      let phoneNumber = profileData.phone || "";
      let country = profileData.country || "United States";

      if (profileData.phone) {
        const matchedCountry = countries.find((c) =>
          profileData.phone.startsWith(c.phone)
        );
        if (matchedCountry) {
          phoneCode = matchedCountry.phone;
          country = matchedCountry.name;
          phoneNumber = profileData.phone.replace(matchedCountry.phone, "");
        }
      }

      setUserData({
        first_name: profileData.first_name || "",
        last_name: profileData.last_name || "",
        email: profileData.email || "",
        date_of_birth: profileData.date_of_birth || "",
        phone: phoneNumber,
        phoneCode,
        blood_group: profileData.blood_group || "",
        address: profileData.address || "",
        city: profileData.city || "",
        country,
      });
    }
  }, [profileData]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCountrySelect = (country: any) => {
    setUserData((prev) => ({
      ...prev,
      phoneCode: country.phone,
      country: country.name,
    }));
    setIsDropdownOpen(false);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!userData.first_name.trim()) {
      newErrors.first_name = "First name is required";
    }

    if (!userData.last_name.trim()) {
      newErrors.last_name = "Last name is required";
    }

    if (!userData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!userData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d+$/.test(userData.phone)) {
      newErrors.phone = "Phone number should contain only digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = async () => {
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    const dataToSend = {
      first_name: userData.first_name,
      last_name: userData.last_name,
      email: userData.email,
      date_of_birth: userData.date_of_birth,
      phone: `${userData.phoneCode}${userData.phone.replace(/\D/g, "")}`,
      blood_group: userData.blood_group,
      address: userData.address,
      city: userData.city,
      country: userData.country,
    };

    try {
      const response = await updateGuestBooking(profileData.id, dataToSend);
      if (response.status === 200) {
        toast.success("Details updated successfully");
        refetch();
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Details could not be updated");
    }
  };

  const currentCountry =
    countries.find((c) => c.phone === userData.phoneCode) || countries[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100">
          <h1 className="text-2xl font-semibold text-gray-800">
            Profile Settings
          </h1>
        </div>

        {/* Form */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {/* First Name */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                First Name <span className=" text-lg text-red-500">*</span>
              </label>
              <input
                type="text"
                name="first_name"
                value={userData.first_name}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-lg border ${
                  errors.first_name ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                required
              />
              {errors.first_name && (
                <p className="text-sm text-red-500">{errors.first_name}</p>
              )}
            </div>

            {/* Last Name */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Last Name <span className=" text-lg text-red-500">*</span>
              </label>
              <input
                type="text"
                name="last_name"
                value={userData.last_name}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-lg border ${
                  errors.last_name ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                required
              />
              {errors.last_name && (
                <p className="text-sm text-red-500">{errors.last_name}</p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Email Address <span className=" text-lg text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-lg border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                required
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Phone Number <span className=" text-lg text-red-500">*</span>
              </label>
              <div className="flex relative">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center justify-between w-32 px-3 py-2.5 rounded-l-lg border-r-0 border-gray-300 hover:bg-gray-50"
                >
                  <div className="flex items-center">
                    <ReactCountryFlag
                      countryCode={currentCountry.code}
                      svg
                      style={{
                        width: "1.5em",
                        height: "1em",
                      }}
                      className="mr-2"
                    />
                    <span className="text-sm">{userData.phoneCode}</span>
                  </div>
                  <FiChevronDown className="ml-2 text-gray-400" />
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-12 left-0 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                    {countries.map((country) => (
                      <div
                        key={country.code}
                        onClick={() => handleCountrySelect(country)}
                        className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-50"
                      >
                        <ReactCountryFlag
                          countryCode={country.code}
                          svg
                          style={{
                            width: "1.5em",
                            height: "1em",
                          }}
                          className="mr-2"
                        />
                        <span className="text-sm mr-2">{country.phone}</span>
                        <span className="text-sm text-gray-500">
                          {country.name}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <input
                  type="tel"
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                  className={`flex-1 px-4 py-2.5 rounded-r-lg border ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  required
                />
              </div>
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                name="date_of_birth"
                value={userData.date_of_birth}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Blood Group */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Blood Group
              </label>
              <select
                name="blood_group"
                value={userData.blood_group}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Blood Group</option>
                {bloodGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>

            {/* Address */}
            <div className="space-y-1 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={userData.address}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* City */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                name="city"
                value={userData.city}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Country - Readonly as it's determined by phone code */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={userData.country}
                readOnly
                className="w-full px-4 py-2.5 rounded-lg border border-transparent bg-gray-50"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-green-100 hover:bg-green-300 text-black border border-green-500 font-medium rounded-lg shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuestProfileSettings;
