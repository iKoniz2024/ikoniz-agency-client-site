import Footer from "@/app/_components/Footer";
import Header from "@/app/_components/Header";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Study and Tourism",
  description: "Ikoniz Agency",
  icons: "/TourGeekyLogo.svg",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="">
      <Header />
      <div className="">
        {children}
      </div>
      <div className="">
        <Footer />
      </div>
    </div>
  );
}
