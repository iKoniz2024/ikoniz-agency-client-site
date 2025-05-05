import { getProductList } from "@/utils/get/get.action";
import Home from "./home";

export const metadata = {
  title: "Tour Geeky | Explore Tours & Activities",
  description:
    "Discover unforgettable cultural experiences, trending tours, and top sights with Entrada. Book your next adventure today.",
  keywords: [
    "travel",
    "tours",
    "activities",
    "cultural experiences",
    "geeky",
    "vacation",
    "tour geeky",
  ],
  openGraph: {
    title: "Tour Geeky | Explore Tours & Activities",
    description:
      "Explore trending tours, cultural experiences, and hidden gems worldwide.",
    url: "https://tourgeeky.com",
    siteName: "Tour Geeky",
    images: [
      {
        url: "https://tourgeeky.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tour Geeky Tours",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tour Geeky | Explore Tours & Activities",
    description:
      "Explore trending tours and top cultural experiences with Entrada.",
    images: ["https://tourgeeky.com/og-image.jpg"],
  },
};

export default async function Page() {
  const data = await getProductList();
  return <Home initialData={data} />;
}
