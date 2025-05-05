"use client";
import { ApiBaseMysql } from "@/Helper/ApiBase";
import MainLayout from "@/layout/MainLayout";
import axios from "axios";
import Pagination from "../_components/Pagination";
import { useEffect, useState, useCallback, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import ActivityList from "../_components/cards/ActivityList";
import { debounce } from "lodash";
import { FaCalendar, FaSearch } from "react-icons/fa";
import { useCurrency } from "@/lib/currencyContext";
import { ProductListSkeleton } from "../_components/ProductListLoader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetchProductListData } from "@/services/product";

const sortOptions = [
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
  { value: "price-asc", label: "Price (Low to High)" },
  { value: "price-desc", label: "Price (High to Low)" },
];

const ProductListContent = ({ initialData }: any) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { currency } = useCurrency();
  const [categoryList, setCategoryList] = useState([
    "Tour",
    "Attraction ticket",
    "City card",
    "Transfer",
    "Rental",
  ]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [productList, setProductList] = useState(initialData?.data || []);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearch(value);
    }, 500),
    []
  );

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  useEffect(() => {
    const searchQuery = searchParams.get("search");
    if (searchQuery) {
      setSearch(searchQuery.replace(/_/g, " "));
      setInputValue(searchQuery.replace(/_/g, " "));
    }
  }, [searchParams]);

  useEffect(() => {
    const params = {
      search: search,
      category: category,
      sort: sort,
      page: page,
    };
    setIsLoading(true)
    fetchProductListData(params, currency).then((data: any) => {
      if (data?.data) {
        setProductList(data.data);
      }
      if (data?.pagination) {
        setTotalPages(data.pagination.total_pages);
        setTotalItems(data.pagination.total_items);
      }
    });
    setIsLoading(false)

  }, [search, category, sort, page, currency]);

  useEffect(() => {
    const params: any = {
      search: search,
      category: category,
      sort: sort,
      page: page,
    };
    const queryString = Object.keys(params)
      .filter((key) => params[key] !== "")
      .map((key) => `${key}=${encodeURIComponent(params[key])}`)
      .join("&");
    router.push(`/products?${queryString}`);
  }, [search, category, sort, page]);

  const paginationOptions = useMemo(
    () => ({
      totalPages: totalPages,
      totalItems: totalItems,
      page: page,
      setPage: setPage,
    }),
    [totalPages, totalItems, page]
  );

  const handleCategory = useCallback((item: any) => {
    setCategory(item);
    setPage(1);
  }, []);

  const handleSort = useCallback((sortBy: string) => {
    setSort(sortBy);
    setPage(1);
  }, []);

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20 py-10 min-h-screen">
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

      <div className="mt-6 flex justify-between items-center">
        <div className="text-black">
          <p className="text-lg font-bold">
            Showing results for: <span className="text-blue-600">{search}</span>
          </p>
          <p className="text-sm text-gray-600">Total Results: {totalItems}</p>
        </div>

        {/* Right Side: Filters */}
        <div className="flex items-center gap-4">
          {/* Category Filter */}

          <div className="w-full sm:w-[200px]">
            <Select
              value={category}
              onValueChange={(value) => handleCategory(value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"all"}>All Categories</SelectItem>
                {categoryList.map((cat, index) => (
                  <SelectItem key={index} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort By Filter */}
          <div className="w-full sm:w-[200px]">
            <Select value={sort} onValueChange={(value) => handleSort(value)}>
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
      {isLoading ? (
        <div className="min-h-screen">
          <ProductListSkeleton />
        </div>
      ) : (
        <div className="min-h-screen">
          <ActivityList data={productList} />
          <div className="flex justify-center">
            {productList?.length > 0 && <Pagination {...paginationOptions} />}
          </div>
        </div>
      )}
    </div>
  );
};

const ProductList = ({ initialData }: any) => {
  return (
    <MainLayout>
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductListContent initialData={initialData} />
      </Suspense>
    </MainLayout>
  );
};

export default ProductList;
