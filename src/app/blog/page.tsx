import { fetchBlogs } from '@/utils/get/get.action';
import BlogsClient from './blog';

export const metadata = {
  title: "Travel Blogs | Tour Geeky",
  description: "Read our latest travel blogs for inspiration, tips, and stories from around the world.",
  keywords: ["travel blog", "travel stories", "vacation tips", "Tour Geeky blogs"],
  openGraph: {
    title: "Travel Blogs | Tour Geeky",
    description: "Discover travel stories, tips, and destination guides.",
    url: "https://tourgeeky.com/blogs",
    type: "website",
    images: [
      {
        url: "https://tourgeeky.com/images/blogs-og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tour Geeky Travel Blogs",
      },
    ],
    siteName: "Tour Geeky",
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel Blogs | Tour Geeky",
    description: "Discover travel stories, tips, and destination guides.",
    images: ["https://tourgeeky.com/images/blogs-og-image.jpg"],
  },
  alternates: {
    canonical: "https://tourgeeky.com/blogs",
  },
};

export default async function BlogsPage() {
  const initialData = await fetchBlogs({ page: 1, search: "" });

  return <BlogsClient initialData={initialData?.data} />;
}