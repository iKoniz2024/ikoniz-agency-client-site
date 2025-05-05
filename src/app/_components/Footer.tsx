import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";

function Footer() {
  return (
    <footer className="text-[#A9AEB9] body-font bg-[#010A15]">
      <div className="max-w-[1440px] mx-auto px-16 py-20 flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col md:overflow-hidden lg:pl-0 pl-7 md:pl-0">
        <div className="flex-grow flex flex-wrap md:pr-20 -mb-10 md:text-left text-center order-first">
          <div className="lg:w-[21%] md:w-1/2 w-full px-4 ">
            <h2 className=" font-bold text-[#DD2509] text-[18px] tracking-widest text-sm mb-3">
              Support
            </h2>
            <nav className="list-none mb-10 text-[15px] font-normal cursor-pointer space-y-2">
              <li>
                <Link href={`/contact-us`} className="text-[#A9AEB9] hover:text-gray-200">Contact</Link>
              </li>
              <li>
                <a className="text-[#A9AEB9] hover:text-gray-200">
                  Legal Notice
                </a>
              </li>
              <li>
                <Link href="/privacy-policy" className="text-[#A9AEB9] hover:text-gray-200">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href={`/privacy-policy`} className="text-[#A9AEB9] hover:text-gray-200">
                  Cookies and Marketing Preferences
                </Link>
              </li>
              <li>
                <Link href="/terms-conditions" className="text-[#A9AEB9] hover:text-gray-200">
                  General Terms and Conditions
                </Link>
              </li>
              <li>
                <Link href={`/about-us`} className="text-[#A9AEB9] hover:text-gray-200">
                  Information according to the DSA
                </Link>
              </li>
              <li>
                <a className="text-[#A9AEB9] hover:text-gray-200">Sitemap</a>
              </li>
            </nav>
          </div>
          <div className="lg:w-[10%] md:w-1/2 w-full px-4">
            <h2 className=" font-bold text-[#DD2509] text-[18px] tracking-widest text-sm mb-3">
              Company
            </h2>
            <nav className="list-none mb-10 text-[15px] font-normal cursor-pointer space-y-2">
              <li>
                <Link href="/about-us" className="text-[#A9AEB9]  hover:text-gray-200">About Us</Link>
              </li>
              <li>
                <a className="text-[#A9AEB9]  hover:text-gray-200">Careers</a>
              </li>
              <li>
                <Link href='/blog' className="text-[#A9AEB9] hover:text-gray-200">Blogs</Link>
              </li>
              <li>
                <Link href={`/about-us`} className="text-[#A9AEB9] hover:text-gray-200">Press</Link>
              </li>
              <li>
                <Link href={`/contact-us`} className="text-[#A9AEB9] hover:text-gray-200">Gift Cards</Link>
              </li>
              <li>
                <Link href={`/about-us`} className="text-[#A9AEB9] hover:text-gray-200">Magazine</Link>
              </li>
              <li>
                <Link href={`/contact-us`} className="text-[#A9AEB9] hover:text-gray-200">
                  Travel Guides
                </Link>
              </li>
            </nav>
          </div>
          <div className="lg:w-[19%] md:w-1/2 w-full px-4">
            <h2 className=" font-bold text-[#DD2509] text-[18px] tracking-widest text-sm mb-3">
              Work With Us
            </h2>
            <nav className="list-none mb-10 text-[15px] font-normal cursor-pointer space-y-2">
              <li>
                <Link href={`/contact-us`} className="text-[#A9AEB9]  hover:text-gray-200">
                  As a Supply Partner
                </Link>
              </li>
              <li>
                <Link href={`/contact-us`} className="text-[#A9AEB9]  hover:text-gray-200">
                  As a Content Creator
                </Link>
              </li>
              <li>
                <Link href={`/contact-us`} className="text-[#A9AEB9] hover:text-gray-200">
                  As a Affiliate Partner
                </Link>
              </li>
            </nav>
            <h2 className=" font-bold text-[#DD2509] text-[18px] tracking-widest text-sm mb-3">
              Ways You can Pay
            </h2>
            <div className="flex flex-col gap-2  items-center md:items-start">
              <div className="flex gap-2">
                <Image
                  src="/Visa.png"
                  width={54}
                  alt="visa"
                  height={32}
                  className="bg-white rounded-sm"
                />
                <Image
                  src="/Mastercard.png"
                  width={54}
                  alt="mastercard"
                  height={32}
                  className="bg-white rounded-sm"
                />
                <Image
                  src="/Amex.png"
                  alt="amex logo"
                  width={54}
                  height={32}
                  className="bg-white rounded-sm"
                />
              </div>
              <div className="flex gap-2">
                <Image
                  src="/PayPal.png"
                  alt="paypal logo"
                  width={54}
                  height={32}
                  className="bg-white rounded-sm"
                />
                <Image
                  src="/GooglePay.png"
                  alt="google pay logo"
                  width={54}
                  height={32}
                  className="bg-white rounded-sm"
                />
                <Image
                  src="/ApplePay.png"
                  alt="apple pay logo"
                  width={54}
                  height={32}
                  className="bg-white rounded-sm"
                />
              </div>
            </div>
          </div>
          <div className="lg:w-[20%] md:w-1/2 w-full px-4">
            <h2 className=" font-bold text-[#DD2509] text-[18px] tracking-widest text-sm mb-3">
              Download Mobile App
            </h2>
            <div className=" mb-10  space-y-4 flex flex-col items-center md:items-start">
              <Image
                src="/playstore.png"
                alt="playstore logo"
                width={180}
                height={50}
                className="rounded-sm"
              />
              <Image
                src="/applestore.png"
                alt="applestore logo"
                width={180}
                height={50}
                className="rounded-sm"
              />
            </div>
          </div>
          <div className="lg:w-[29%]  w-full px-4">
            <h2 className=" font-bold text-[#DD2509] text-[18px] tracking-widest text-sm mb-3 mt-10 lg:mt-0">
              Follow Us
            </h2>
            <div className="flex gap-4 mt-8 justify-center items-center md:justify-start">
              <FaYoutube className="w-6 h-6 text-white" />
              <FaFacebookF className="w-6 h-6 text-white" />
              <FaTwitter className="w-6 h-6 text-white" />
              <FaInstagram className="w-6 h-6 text-white" />
              <FaLinkedin className="w-6 h-6 text-white" />
            </div>
            <h2 className=" font-bold text-[#DD2509] text-[18px] tracking-widest text-sm mb-3 mt-10">
              Subscribe
            </h2>
            <div className="flex items-center rounded-md border border-gray-600 p-2 bg-[#F4F4F40D]">
              <input
                type="email"
                placeholder="Example@yourmail.com"
                className="bg-transparent flex-grow text-gray-300 placeholder-gray-500 p-2 focus:outline-none focus:ring-0 focus:border-transparent"
              />
              <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 ml-2">
                Send Mail
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className=" mx-auto py-2 px-5 text-center text-[#A9AEB9]">
        <hr className="border-[#A9AEB9] border-t-1 my-4 mx-16" />© 2025 All
        Copyright Reserve to TourGeeky.
      </div>
    </footer>
  );
}

export default Footer;
