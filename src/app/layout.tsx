import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import TanStackProviders from "@/providers/TanStackProvider";
import { AuthProvider } from "@/Helper/authContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Toaster } from "sonner";
import { CurrencyProvider } from "@/lib/currencyContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Tour Geeky",
  description: "Tour Geeky app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <CurrencyProvider>
          <TanStackProviders>
            <ToastContainer />
            <Toaster />
            <AuthProvider>{children}</AuthProvider>
          </TanStackProviders>
        </CurrencyProvider>
      </body>
    </html>
  );
}
