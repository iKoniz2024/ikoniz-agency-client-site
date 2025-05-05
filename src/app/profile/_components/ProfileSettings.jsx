"use client";
import { useGetProfile } from "@/hooks/get.hooks";
import { useUpdateProfile } from "@/hooks/post.hook";
import { useState, useEffect } from "react";
import { LiaUserEditSolid } from "react-icons/lia";
import { FiChevronDown } from "react-icons/fi";
import { countries } from "@/lib/countryCodes";
import ReactCountryFlag from "react-country-flag";
import Image from "next/image";

function ProfileSettings() {
  const { data } = useGetProfile();
  const profileData = data?.data || {};
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const [backendErrors, setBackendErrors] = useState({});

  const { mutate: handleUpdateProfile } = useUpdateProfile();

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

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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
      if (profileData.image) {
        setPreviewImage(profileData.image);
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });

    // Clear backend errors when user starts typing
    if (backendErrors[name]) {
      setBackendErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleCountrySelect = (country) => {
    setUserData((prev) => ({
      ...prev,
      phoneCode: country.phone,
      country: country.name,
    }));
    setIsDropdownOpen(false);
  };

  const handleUpdate = () => {
    const dataToSend = {
      ...userData,
      phone: `${userData.phoneCode}${userData.phone.replace(/\D/g, "")}`,
      phoneCode: undefined,
      image: selectedImage,
    };

    handleUpdateProfile(dataToSend, {
      onSuccess: () => {
        setIsEditing(false);
        setBackendErrors({});
      },
      onError: (error) => {
        if (error?.details) {
          setBackendErrors(error.details);
        } else {
          toast.error("Failed to update profile");
        }
      },
    });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setBackendErrors({});
  };

  const currentCountry =
    countries.find((c) => c.phone === userData.phoneCode) || countries[0];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-800">
            Profile Settings
          </h1>
          <button
            onClick={toggleEdit}
            className={`flex items-center text-sm font-medium ${
              isEditing ? "text-gray-500" : "text-blue-600 hover:text-blue-700"
            }`}
          >
            <LiaUserEditSolid className="mr-2 text-lg" />
            {isEditing ? "Cancel Editing" : "Edit Profile"}
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          <div className="mb-4">
            {previewImage ? (
              <Image
                width={200}
                height={200}
                src={previewImage}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">No Image</span>
              </div>
            )}
          </div>
          {isEditing && (
            <label className="mb-4 cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mb-4"
              />
            </label>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {/* First Name */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="first_name"
                value={userData.first_name}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-4 py-2.5 rounded-lg border ${
                  isEditing
                    ? "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    : "border-transparent bg-gray-50"
                } ${backendErrors.first_name ? "border-red-500" : ""}`}
              />
              {backendErrors.first_name && (
                <p className="text-sm text-red-500">
                  {backendErrors.first_name[0]}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="last_name"
                value={userData.last_name}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-4 py-2.5 rounded-lg border ${
                  isEditing
                    ? "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    : "border-transparent bg-gray-50"
                } ${backendErrors.last_name ? "border-red-500" : ""}`}
              />
              {backendErrors.last_name && (
                <p className="text-sm text-red-500">
                  {backendErrors.last_name[0]}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                disabled
                value={userData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 rounded-lg border ${
                  isEditing
                    ? "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    : "border-transparent bg-gray-50"
                } ${backendErrors.email ? "border-red-500" : ""}`}
              />
              {backendErrors.email && (
                <p className="text-sm text-red-500">{backendErrors.email[0]}</p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="flex relative">
                <button
                  type="button"
                  onClick={() =>
                    isEditing && setIsDropdownOpen(!isDropdownOpen)
                  }
                  disabled={!isEditing}
                  className={`flex items-center justify-between w-32 px-3 py-2.5 rounded-l-lg border-r-0 ${
                    isEditing
                      ? "border-gray-300 hover:bg-gray-50"
                      : "border-transparent bg-gray-50"
                  } border ${backendErrors.phone ? "border-red-500" : ""}`}
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
                  {isEditing && (
                    <FiChevronDown className="ml-2 text-gray-400" />
                  )}
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
                  disabled={!isEditing}
                  className={`flex-1 px-4 py-2.5 rounded-r-lg border-l-0 ${
                    isEditing
                      ? "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      : "border-transparent bg-gray-50"
                  } border ${backendErrors.phone ? "border-red-500" : ""}`}
                  maxLength={15}
                />
              </div>
              {backendErrors.phone && (
                <p className="text-sm text-red-500">{backendErrors.phone[0]}</p>
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
                disabled={!isEditing}
                className={`w-full px-4 py-2.5 rounded-lg border ${
                  isEditing
                    ? "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    : "border-transparent bg-gray-50"
                } ${backendErrors.date_of_birth ? "border-red-500" : ""}`}
              />
              {backendErrors.date_of_birth && (
                <p className="text-sm text-red-500">
                  {backendErrors.date_of_birth[0]}
                </p>
              )}
            </div>

            {/* Blood Group */}
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-700">
                Blood Group
              </label>
              <input
                type="text"
                name="blood_group"
                value={userData.blood_group}
                onChange={handleChange}
                disabled={!isEditing}
                className={`w-full px-4 py-2.5 rounded-lg border ${
                  isEditing
                    ? "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    : "border-transparent bg-gray-50"
                } ${backendErrors.blood_group ? "border-red-500" : ""}`}
                // maxLength={6} // Added max length for blood group
              />
              {backendErrors.blood_group && (
                <p className="text-sm text-red-500">
                  {backendErrors.blood_group[0]}
                </p>
              )}
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
                disabled={!isEditing}
                className={`w-full px-4 py-2.5 rounded-lg border ${
                  isEditing
                    ? "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    : "border-transparent bg-gray-50"
                } ${backendErrors.address ? "border-red-500" : ""}`}
              />
              {backendErrors.address && (
                <p className="text-sm text-red-500">
                  {backendErrors.address[0]}
                </p>
              )}
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
                disabled={!isEditing}
                className={`w-full px-4 py-2.5 rounded-lg border ${
                  isEditing
                    ? "border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    : "border-transparent bg-gray-50"
                } ${backendErrors.city ? "border-red-500" : ""}`}
              />
              {backendErrors.city && (
                <p className="text-sm text-red-500">{backendErrors.city[0]}</p>
              )}
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
          {isEditing && (
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-green-100 hover:bg-green-300 text-black border border-green-500 font-medium rounded-lg shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileSettings;
