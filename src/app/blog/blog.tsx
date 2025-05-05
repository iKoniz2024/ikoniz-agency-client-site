"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { SearchIcon } from "lucide-react";
import { debounce } from "lodash";
import MainLayout from "@/layout/MainLayout";
import BlogCard from "../_components/cards/BlogCard";
import Pagination from "../_components/LinkPagination";
import { ProductListSkeleton } from "../_components/ProductListLoader";
import { fetchBlogs } from "@/utils/get/get.action";

const MemoizedBlogCard = React.memo(BlogCard);
const MemoizedPagination = React.memo(Pagination);

interface IBlogClientProps {
  initialData: {
    results: any[];
    count: number;
  };
}

const BlogsClient = ({ initialData }: IBlogClientProps) => {
  const router = useRouter();
  const [blogs, setBlogs] = useState(initialData?.results || []);
  const [count, setCount] = useState(initialData?.count || 0);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearch(value);
      setPage(1);
    }, 500),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetchBlogs({ search, page });
        setBlogs(res?.data?.results);
        setCount(res?.data?.count);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (search || page !== 1) {
      fetchData();
    }
  }, [search, page]);

  useEffect(() => {
    const params: any = { search, page };
    const queryString = new URLSearchParams(params).toString();
    router.replace(`?${queryString}`);
  }, [page, search, router]);

  return (
    <MainLayout>
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20 py-10 min-h-screen">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Blogs</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search blogs..."
              defaultValue={search}
              onChange={handleSearchChange}
              className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <SearchIcon className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </header>

        {isLoading ? (
          <ProductListSkeleton />
        ) : (
          <>
            <section aria-label="Blog List">
              <MemoizedBlogCard data={blogs} />
            </section>
            {blogs?.length > 0 && (
              <nav aria-label="Pagination">
                <MemoizedPagination
                  currentPage={page}
                  totalPages={Math.ceil(count / 10)}
                  onPageChange={(newPage: number) => setPage(newPage)}
                />
              </nav>
            )}
          </>
        )}
      </main>
    </MainLayout>
  );
};

export default BlogsClient;
