import { fetchProductListData } from '@/services/product';
import { Metadata } from 'next';
import ProductListing from './ProductListing';


export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Tour Geeky | Explore Our Products",
    description: "Discover our wide range of tours, attractions, and activities.",
    openGraph: {
      title: "Explore Our Products | Tour Geeky",
      description: "Discover our wide range of tours, attractions, and activities",
      images: [
        {
          url: "/images/products-og-image.jpg",
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function ProductsPage() {
  const initialData = await fetchProductListData({ page: 1, search: "" });
  return <ProductListing serverData={initialData} />;
}