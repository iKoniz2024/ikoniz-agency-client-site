"use client";
import { useGetProfile } from "@/hooks/get.hooks";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menuItems = [
  {
    icon: "/wishlist.png",
    label: "Wishlist",
    href: "/profile/wishlist",
  },
  {
    icon: "/profilesettings.png",
    label: "Profile Settings",
    href: "/profile/settings",
  },
  {
    icon: "/booking.png",
    label: "Booking History",
    href: "/profile/booking-history",
  },
  {
    icon: "/reviews.png",
    label: "My Reviews",
    href: "/profile/my-reviews",
  },
  {
    icon: "/logout.png",
    label: "Log Out",
    href: "/logout",
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const { data } = useGetProfile();
  const profileData = data?.data || {};
  return (
    <aside className="bg-gray-100 p-3 rounded-sm shadow-lg bg-[#010A1508]">
      <div className="flex flex-col items-center text-center mb-4 bg-white py-6 rounded-lg">
        {profileData?.image ? (
          <Image
            width={200}
            height={200}
            src={profileData?.image}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-200"
          />
        ) : (
          <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
        <h2 className="text-xl font-bold py-2">{profileData?.first_name} {profileData?.last_name}</h2>
        <p className="text-gray-700 text-[14px]">{profileData?.city}</p>
      </div>
      <nav className="space-y-1 text-[16px] text-black">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`flex items-center font-medium p-3 rounded-lg ${
              pathname === item.href ? "bg-white" : ""
            }`}
          >
            <span className="mr-3">
              <Image
                src={item.icon}
                width={18}
                height={18}
                alt={`${item.label} icon`}
              />
            </span>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
