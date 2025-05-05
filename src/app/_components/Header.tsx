"use client";
import { Button } from "@/components/ui/button";
import { ChevronDown, Heart, Menu } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useAuth } from "@/Helper/authContext";
import { Icon } from "@iconify/react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useGetBookingList } from "@/hooks/get.hooks";
import { useCurrency } from "@/lib/currencyContext";
import { currencyOptions } from "@/lib/currencyContant";
import { countries } from "@/lib/countryCodes";
import { locations } from "@/lib/locations";

function Header() {
  const { logout } = useAuth();
  const [token, setToken] = useState<string | null>(null);
  const { data: bookingList } = useGetBookingList("Reserved");
  const [cartCount, setCartCount] = useState(0);
  const { currency, setCurrency } = useCurrency();
  const [searchTerm, setSearchTerm] = useState("");
  const [showAllLocations, setShowAllLocations] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("access_token"));
    }
  }, []);

  useEffect(() => {
    if (bookingList?.data?.count !== undefined) {
      setCartCount(bookingList.data.count);
    }
  }, [bookingList]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setToken("");
    logout();
    window.location.reload();
  };

  const handleCurrencyChange = (newCurrency: string) => {
    setCurrency(newCurrency);
  };

  const currentCurrency =
    currencyOptions.find((c) => c.code === currency) || currencyOptions[0];

  const filteredLocations = locations.filter((location) =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedLocations = showAllLocations
    ? filteredLocations
    : filteredLocations.slice(0, 5);

  return (
    <div className="sticky top-0 bg-white z-50 w-full">
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="flex justify-between items-center py-5 font-medium">
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={90} height={44} />
          </Link>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger>
                <Menu className="w-6 h-6" />
              </SheetTrigger>
              <SheetContent side="left" className="p-5">
                <nav className="flex flex-col gap-5 text-lg">
                  <Link href="/">Home</Link>
                  <Link href="/products">Products</Link>
                  <Link href="/blog">Blogs</Link>
                  {token && (
                    <div className="relative inline-block">
                      <Link href="/cart">Cart</Link>
                      {cartCount > 0 && (
                        <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {cartCount}
                        </span>
                      )}
                    </div>
                  )}
                  {token ? (
                    <>
                      <Link href="/profile">Profile</Link>
                      <button onClick={handleLogout} className="text-red-500">
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link href="/login">Log In</Link>
                      <Link href="/signup">Sign Up</Link>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center text-[15px]">
            <Link href="/">Home</Link>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <h2 className="flex gap-1 items-center cursor-pointer">
                  Locations <ChevronDown className="w-5 h-5" />
                </h2>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 max-h-96 overflow-y-auto">
                <div className="px-2 py-1">
                  <input
                    type="text"
                    placeholder="Search locations..."
                    className="w-full p-2 border rounded text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <DropdownMenuSeparator />
                {displayedLocations.length > 0 ? (
                  <>
                    {displayedLocations.map((location) => (
                      <DropdownMenuItem key={location.code}>
                        <Link
                          href={`/category?search=${location.name}`}
                          className="w-full"
                        >
                          {location.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                    {/* {!showAllLocations && filteredLocations.length > 5 && (
                      <DropdownMenuItem
                        className="text-blue-500 cursor-pointer"
                        onClick={() => setShowAllLocations(true)}
                      >
                        Show all locations...
                      </DropdownMenuItem>
                    )} */}
                  </>
                ) : (
                  <DropdownMenuItem disabled>
                    No locations found
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/products">Products</Link>
            <Link href="/blog">Blogs</Link>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <h2 className="flex gap-1 items-center cursor-pointer">
                  {currentCurrency.code}({currentCurrency.symbol})
                  <ChevronDown className="w-5 h-5" />
                </h2>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {currencyOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.code}
                    onClick={() => handleCurrencyChange(option.code)}
                    className={currency === option.code ? "bg-gray-100" : ""}
                  >
                    {option.code} ({option.symbol}) - {option.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Only show cart and wishlist when logged in */}
            <div className="relative">
              <Link href="/cart">
                <Icon icon="carbon:shopping-bag" className="w-5 h-5" />
              </Link>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            {token && (
              <>
                <Link href="/profile/wishlist">
                  <Heart className="w-5 h-5" />
                </Link>
              </>
            )}

            {token ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="flex gap-1 items-center cursor-pointer">
                    <Icon icon="line-md:account" className="w-5 h-5" />
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link href="/profile/wishlist">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex gap-4">
                <Link href="/login">
                  <Button variant="ghost">Log In</Button>
                </Link>
                <Link href="/signup">
                  <Button className="px-5 py-2">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
