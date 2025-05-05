// "use client";
// import { useGetProfile } from "@/hooks/get.hooks";
// import { useUpdateProfile } from "@/hooks/post.hook";
// import { useState, useEffect } from "react";
// import { LiaUserEditSolid } from "react-icons/lia";
// import { FiChevronDown } from "react-icons/fi";

// const countries = [
//   { name: "Bangladesh", code: "+88", flag: "https://flagcdn.com/w20/bd.png" },
//   { name: "United States", code: "+1", flag: "https://flagcdn.com/w20/us.png" },
//   { name: "United Kingdom", code: "+44", flag: "https://flagcdn.com/w20/gb.png" },
//   { name: "India", code: "+91", flag: "https://flagcdn.com/w20/in.png" },
// ];

// function BookingInfo({ bookingData, handleUpdateParticipants}:any) {
//   const [selectedCountry, setSelectedCountry] = useState(countries[0]);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);



//   const handleCountrySelect = (country:any) => {
//     setSelectedCountry(country);
//     // setBookingData({ ...userData, country: country.name });
//     setIsDropdownOpen(false);
//   };

//   const handleUpdate = () => {

//   };

//   const toggleEdit = () => {
//     setIsEditing(!isEditing);
//   };

//   return (
//     <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//       <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
//         {/* Header */}
//         <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
//           <h1 className="text-2xl font-semibold text-gray-800">Profile Settings</h1>
//           <button 
//             onClick={toggleEdit}
//             className={`flex items-center text-sm font-medium ${isEditing ? 'text-gray-500' : 'text-blue-600 hover:text-blue-700'}`}
//           >
//             <LiaUserEditSolid className="mr-2 text-lg" />
//             {isEditing ? 'Cancel Editing' : 'Edit Profile'}
//           </button>
//         </div>

//         {/* Form */}
//         <div className="p-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
//             {/* First Name */}
//             <div className="space-y-1">
//               <label className="block text-sm font-medium text-gray-700">First Name</label>
//               <input
//                 type="text"
//                 name="first_name"
//                 value={userData.first_name}
//                 onChange={handleChange}
//                 disabled={!isEditing}
//                 className={`w-full px-4 py-2.5 rounded-lg border ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' : 'border-transparent bg-gray-50'}`}
//               />
//             </div>

//             {/* Last Name */}
//             <div className="space-y-1">
//               <label className="block text-sm font-medium text-gray-700">Last Name</label>
//               <input
//                 type="text"
//                 name="last_name"
//                 value={userData.last_name}
//                 onChange={handleChange}
//                 disabled={!isEditing}
//                 className={`w-full px-4 py-2.5 rounded-lg border ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' : 'border-transparent bg-gray-50'}`}
//               />
//             </div>

//             {/* Email */}
//             {/* <div className="space-y-1"> */}
//               <label className="block text-sm font-medium text-gray-700">Email Address</label>
//               <input
//                 type="email"
//                 name="email"
//                 disabled
//                 value={userData.email}
//                 onChange={handleChange}
//                 className={`w-full px-4 py-2.5 rounded-lg border ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' : 'border-transparent bg-gray-50'}`}
//               />
//             </div>

//             {/* Phone Number */}
//             <div className="space-y-1">
//               <label className="block text-sm font-medium text-gray-700">Phone Number</label>
//               <div className="flex relative">
//                 <button
//                   type="button"
//                   onClick={() => isEditing && setIsDropdownOpen(!isDropdownOpen)}
//                   disabled={!isEditing}
//                   className={`flex items-center justify-between w-32 px-3 py-2.5 rounded-l-lg border-r-0 ${isEditing ? 'border-gray-300 hover:bg-gray-50' : 'border-transparent bg-gray-50'} border`}
//                 >
//                   <div className="flex items-center">
//                     <img
//                       src={selectedCountry.flag}
//                       alt={selectedCountry.name}
//                       className="w-5 h-4 mr-2"
//                     />
//                     <span className="text-sm">{selectedCountry.code}</span>
//                   </div>
//                   {isEditing && <FiChevronDown className="ml-2 text-gray-400" />}
//                 </button>

//                 {isDropdownOpen && (
//                   <div className="absolute top-12 left-0 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
//                     {countries.map((country) => (
//                       <div
//                         key={country.code}
//                         onClick={() => handleCountrySelect(country)}
//                         className="flex items-center px-3 py-2 cursor-pointer hover:bg-gray-50"
//                       >
//                         <img
//                           src={country.flag}
//                           alt={country.name}
//                           className="w-5 h-4 mr-2"
//                         />
//                         <span className="text-sm">{country.code}</span>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 <input
//                   type="tel"
//                   name="phone"
//                   value={userData.phone}
//                   onChange={handleChange}
//                   disabled={!isEditing}
//                   className={`flex-1 px-4 py-2.5 rounded-r-lg border-l-0 ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' : 'border-transparent bg-gray-50'} border`}
//                 />
//               </div>
//             </div>

//             {/* Date of Birth */}
//             <div className="space-y-1">
//               <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
//               <input
//                 type="date"
//                 name="date_of_birth"
//                 value={userData.date_of_birth}
//                 onChange={handleChange}
//                 disabled={!isEditing}
//                 className={`w-full px-4 py-2.5 rounded-lg border ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' : 'border-transparent bg-gray-50'}`}
//               />
//             </div>

//             {/* Blood Group */}
//             <div className="space-y-1">
//               <label className="block text-sm font-medium text-gray-700">Blood Group</label>
//               <input
//                 type="text"
//                 name="blood_group"
//                 value={userData.blood_group}
//                 onChange={handleChange}
//                 disabled={!isEditing}
//                 className={`w-full px-4 py-2.5 rounded-lg border ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' : 'border-transparent bg-gray-50'}`}
//               />
//             </div>

//             {/* Address */}
//             <div className="space-y-1 md:col-span-2">
//               <label className="block text-sm font-medium text-gray-700">Address</label>
//               <input
//                 type="text"
//                 name="address"
//                 value={userData.address}
//                 onChange={handleChange}
//                 disabled={!isEditing}
//                 className={`w-full px-4 py-2.5 rounded-lg border ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' : 'border-transparent bg-gray-50'}`}
//               />
//             </div>

//             {/* City */}
//             <div className="space-y-1">
//               <label className="block text-sm font-medium text-gray-700">City</label>
//               <input
//                 type="text"
//                 name="city"
//                 value={userData.city}
//                 onChange={handleChange}
//                 disabled={!isEditing}
//                 className={`w-full px-4 py-2.5 rounded-lg border ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' : 'border-transparent bg-gray-50'}`}
//               />
//             </div>

//             {/* Country */}
//             <div className="space-y-1">
//               <label className="block text-sm font-medium text-gray-700">Country</label>
//               <input
//                 type="text"
//                 name="country"
//                 value={userData.country}
//                 onChange={handleChange}
//                 disabled={!isEditing}
//                 className={`w-full px-4 py-2.5 rounded-lg border ${isEditing ? 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500' : 'border-transparent bg-gray-50'}`}
//               />
//             </div>
//           </div>

//           {/* Save Button */}
//           {isEditing && (
//             <div className="mt-8 flex justify-end">
//               <button
//                 onClick={handleUpdate}
//                 className="px-3 py-2 bg-green-100  hover:bg-green-300 text-black border border-green-500 font-medium rounded-lg shadow-sm transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               >
//                 Save Changes
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BookingInfo;