"use client";
import { useEffect, useState, useRef, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { debounce } from "lodash";
import { FaCalendar, FaSearch, FaTimes, FaSpinner } from "react-icons/fa";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Components
import MainLayout from "@/layout/MainLayout";
import Pagination from "../_components/Pagination";
import ActivityList from "../_components/cards/ActivityList";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Utils
import { useCurrency } from "@/lib/currencyContext";
import { fetchData } from "@/services/product";
import { carouselSettings, categoryList, sortOptions } from "./items";

const Content = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currency } = useCurrency();
  const sliderRef = useRef<Slider>(null);
  const isInitialMount = useRef(true);
  const abortControllerRef = useRef<AbortController>();

  // Combined state to minimize re-renders
  const [state, setState] = useState({
    // Filter state
    inputValue: "",
    search: "",
    category: "",
    sort: "",
    tags: [] as string[],
    page: 1,

    // Results state
    isLoading: false,
    productList: [] as any[],
    availableTags: [] as Array<{ name: string; count: number; image?: string }>,
    totalPages: 0,
    totalItems: 0,
  });

  // Destructure state
  const {
    inputValue,
    search,
    category,
    sort,
    tags,
    page,
    isLoading,
    productList,
    availableTags,
    totalPages,
    totalItems,
  } = state;

  // Initialize from URL params (runs only once)
  useEffect(() => {
    if (!searchParams) return;

    const params = {
      search: (searchParams.get("search") || "").replace(/_/g, " "),
      category: searchParams.get("category") || "",
      sort: searchParams.get("sort") || "",
      page: Number(searchParams.get("page")) || 1,
      tags: searchParams.get("tags")?.split(",") || [],
    };

    setState((prev) => ({
      ...prev,
      inputValue: params.search,
      search: params.search,
      category: params.category,
      sort: params.sort,
      page: params.page,
      tags: params.tags,
    }));

    isInitialMount.current = false;
  }, [searchParams]);

  // Memoized fetch parameters
  const fetchParams = useMemo(
    () => ({
      search,
      category: category === "all" ? "" : category,
      sort,
      page,
      tags,
      currency,
    }),
    [search, category, sort, page, tags, currency]
  );

  // Fetch data with debouncing and cleanup
  useEffect(() => {
    if (isInitialMount.current) return;

    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    const fetchProducts = async () => {
      try {
        setState((prev) => ({ ...prev, isLoading: true }));

        const data = await fetchData(fetchParams, () => {}, currency);

        setState((prev) => ({
          ...prev,
          productList: data?.data || prev.productList,
          availableTags: data?.tags || prev.availableTags,
          totalPages: data?.pagination?.total_pages || prev.totalPages,
          totalItems: data?.pagination?.total_items || prev.totalItems,
          isLoading: false,
        }));
      } catch (error: any) {
        if (error.name !== "AbortError") {
          setState((prev) => ({ ...prev, isLoading: false }));
          console.error("Fetch error:", error);
        }
      }
    };

    const timer = setTimeout(fetchProducts, 300);
    return () => clearTimeout(timer);
  }, [fetchParams, currency]);

  // Update URL without causing re-renders
  useEffect(() => {
    if (isInitialMount.current) return;

    const params = new URLSearchParams();
    if (search) params.set("search", search.replace(/ /g, "_"));
    if (category) params.set("category", category);
    if (sort) params.set("sort", sort);
    if (tags.length) params.set("tags", tags.join(","));
    if (page > 1) params.set("page", page.toString());

    router.replace(`/category?${params.toString()}`, { scroll: false });
  }, [search, category, sort, page, tags, router]);

  // Handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setState((prev) => ({ ...prev, inputValue: value }));

    debounce((val: string) => {
      setState((prev) => ({ ...prev, search: val, page: 1 }));
    }, 500)(value);
  };

  const handleCategory = (value: string) => {
    setState((prev) => ({
      ...prev,
      category: value === "all" ? "" : value,
      page: 1,
    }));
  };

  const handleSort = (value: string) => {
    setState((prev) => ({ ...prev, sort: value, page: 1 }));
  };

  const toggleTag = (tagName: string) => {
    setState((prev) => ({
      ...prev,
      tags: prev.tags.includes(tagName)
        ? prev.tags.filter((t) => t !== tagName)
        : [...prev.tags, tagName],
      page: 1,
    }));
  };

  const clearAllTags = () => {
    setState((prev) => ({ ...prev, tags: [], page: 1 }));
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20 py-10 min-h-screen">
      {/* Search Bar */}
      <div className="flex gap-4">
        <div className="w-full bg-[#F0F0F0] rounded-xl shadow-lg p-4 flex items-center space-x-4">
          <input
            type="text"
            placeholder="What Are You Going?"
            value={inputValue}
            onChange={handleSearchChange}
            className="flex-grow text-[#010A15] placeholder-[#010A15] outline-none border-none bg-transparent font-bold text-[15px]"
          />
          <button type="button" className="text-gray-700 hover:text-black">
            <FaCalendar />
          </button>
        </div>
        <button
          type="submit"
          className="bg-[#010A15] px-9 rounded-lg text-white"
        >
          <FaSearch />
        </button>
      </div>

      {/* Filters */}
      <div className="mt-6 flex justify-between items-center">
        <div className="">
          <p className="text-sm font-bold">
            Showing results for: <span className="text-red-600">{search}</span>
          </p>
          <p className="text-xs text-gray-600">Total Results: {totalItems}</p>

          {/* {tags.length > 0 && (
            <div className="mt-5 mb-5">
              <h3 className="font-semibold mb-2">
                Selected categories:{" "}
                <span
                  className="text-red-500 text-sm ml-2 cursor-pointer"
                  onClick={clearAllTags}
                >
                  Clear All
                </span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="default"
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-full"
                  >
                    {tag}
                    <button
                      onClick={() => toggleTag(tag)}
                      className="ml-1 hover:text-gray-200"
                    >
                      <FaTimes size={12} />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )} */}
        </div>

        <div className="flex items-center gap-4 mb-5">
          <div className="w-full sm:w-[200px]">
            <Select value={category} onValueChange={handleCategory}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categoryList.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full sm:w-[200px]">
            <Select value={sort} onValueChange={handleSort}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      {/* Tags Section */}
      {availableTags?.length > 0 && (
        <div className="mt-8 relative mb-10">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h2 className="text-xl font-bold">
                Available categories in this location
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                We are searching the best categories for you
              </p>
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => sliderRef.current?.slickPrev()}
                className="w-8 h-8 bg-gray-200 rounded-md hover:bg-gray-300 flex items-center justify-center"
              >
                <ArrowLeft className="w-4 h-4 text-gray-600" />
              </button>
              <button
                onClick={() => sliderRef.current?.slickNext()}
                className="w-8 h-8 bg-gray-800 rounded-md hover:bg-gray-900 flex items-center justify-center"
              >
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>

          <div className="mt-4">
            <Slider ref={sliderRef} {...carouselSettings}>
              {availableTags?.map((tag) => (
                <div key={tag.name} className="px-2">
                  <div
                    onClick={() => toggleTag(tag.name)}
                    className={`cursor-pointer transition-all rounded-xl text-center ${
                      tags.includes(tag.name)
                        ? "border-red-500 border-b-4 shadow-md"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="rounded-xl overflow-hidden mb-2 h-[150px] w-[200px] p-4 mx-auto">
                      <Image
                        width={160}
                        height={160}
                        className="object-cover w-full h-full rounded-lg"
                        src={
                          tag.image ||
                          `/api/placeholder/160/85?text=${tag.name}`
                        }
                        alt={tag.name}
                      />
                    </div>
                    <h3 className="text-sm font-medium">{tag.name}</h3>
                    <div className="text-xs text-gray-500 mt-0.5 mb-6">
                      Activities · {tag.count}
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}

      {/* Results */}
      <div className="min-h-screen">
        <div className="flex items-center gap-2">
          <h2 className="text-3xl font-bold mb-4">Your Search Activities</h2>
          {isLoading && <FaSpinner className="animate-spin" />}
        </div>
        <ActivityList data={productList} />
        {productList.length > 0 && (
          <Pagination
            totalPages={totalPages}
            totalItems={totalItems}
            page={page}
            setPage={(newPage: any) =>
              setState((prev) => ({ ...prev, page: newPage }))
            }
          />
        )}
      </div>
    </div>
  );
};

const Category = () => {
  return (
    <MainLayout>
      <Suspense
        fallback={
          <div className="flex justify-center items-center h-screen">
            Loading...
          </div>
        }
      >
        <Content />
      </Suspense>
    </MainLayout>
  );
};

export default Category;
