"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

interface Blog {
  id: number;
  title: string;
  slug: string;
  short_desc: string;
  category: {
    id: number;
    name: string;
  };
  created_at: string;
  images: {
    id: number;
    image: string;
  }[];
  tags: {
    id: number;
    name: string;
  }[];
}

function BlogCard({ data }: { data: Blog[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {data?.map((blog) => (
        <Link
          key={blog.id}
          href={`/blog/${blog.id}`}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 group" // Changed to transition-all and added group
        >
          {/* Blog Image with Hover Effect */}
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110" // Added zoom effect
              src={blog.images[0]?.image || "/default-blog-image.jpg"}
              alt={blog.title || "Blog post image"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
              loading="lazy"
            />
            {/* Category Badge with improved styling */}
            <div className="absolute top-2 left-2 bg-black/70 text-white px-3 py-1 rounded-lg text-sm backdrop-blur-sm z-10">
              {blog.category.name}
            </div>
          </div>

          {/* Blog Content */}
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2 hover:text-blue-600 transition-colors duration-300">
              {blog.title}
            </h2>
            <p className="text-gray-600 mb-4 line-clamp-3">{blog?.short_desc}</p>

            {/* Tags with hover effects */}
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.tags.map((tag) => (
                <span
                  key={tag.id}
                  className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm hover:bg-gray-300 transition-colors duration-200"
                >
                  {tag.name}
                </span>
              ))}
            </div>

            {/* Date */}
            <p className="text-sm text-gray-500">
              {new Date(blog.created_at).toLocaleDateString()}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default BlogCard;