import { fetchBlogDetail } from "@/utils/get/get.action";
import MainLayout from "@/layout/MainLayout";
import BlogCard from "../../_components/cards/BlogCard";
import Gallery from "@/app/details/Gallery";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const data = await fetchBlogDetail(params.id);
  const blog = data?.data;

  return {
    title: blog?.title || "Blog Detail | Tour Geeky",
    description: blog?.short_desc || "Read this blog on Tour Geeky",
    openGraph: {
      title: blog?.title,
      description: blog?.short_desc,
      images: [blog?.images[0]?.image],
    },
  };
}

export default async function BlogDetailPage({ params }: { params: { id: string } }) {
  const data = await fetchBlogDetail(params.id);

  if (!data?.success || !data?.data) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-screen">
          <p className="text-red-500 text-xl">Blog not found</p>
        </div>
      </MainLayout>
    );
  }

  const blog = data.data;

  return (
    <MainLayout>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20 py-10 min-h-screen">
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>

        <div className="text-sm text-gray-600 mb-6">
          Category: <span className="font-semibold">{blog.category.name}</span>
        </div>

        <div className="mb-8">
          <Gallery data={blog} />
        </div>
        <p className="text-lg text-gray-700 mb-6">{blog.short_desc}</p>

        <div className="prose max-w-none mb-8">
          <p>{blog.details}</p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {blog.tags.map((tag: any) => (
            <span
              key={tag.id}
              className="bg-gray-200 text-gray-700 text-sm px-3 py-1 rounded-full"
            >
              {tag.name}
            </span>
          ))}
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Related Blogs</h2>
          <BlogCard data={blog.related_blogs} />
        </div>
      </div>
    </MainLayout>
  );
}
