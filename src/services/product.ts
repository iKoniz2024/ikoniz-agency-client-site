import { ApiBaseMysql } from "@/Helper/ApiBase";
import axios from "axios";

export const fetchData = async (
  { search, category, sort, page, tags }: any,
  setIsLoading: any,
  currency: string
) => {
  try {
    setIsLoading(true);
    const data = {
      search,
      category: category,
      sort,
      page,
      tags: tags?.join(","), // Convert array to comma-separated string
    };
    const response = await axios.post(
      `${ApiBaseMysql}/shop/tours-filter/?currency_type=${currency}`,
      data
    );
    setIsLoading(false);
    return response.data;
  } catch (error) {
    setIsLoading(false);
    return error;
  }
};
export const fetchProductListData = async (
  params: { search?: string; category?: string; sort?: string; page?: number },
  currency: string = "USD"
) => {
  try {
    const response = await fetch(
      `${ApiBaseMysql}/shop/tours-filter/?currency_type=${currency}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          search: params.search || "",
          category: params.category || "",
          sort: params.sort || "",
          page: params.page || 1,
        }),
        next: { revalidate: 60 }
      }
    );
    
    if (!response.ok) throw new Error("Failed to fetch data");
    return await response.json();
  } catch (error) {
    console.error("Error fetching product data:", error);
    return { data: [], pagination: { total_pages: 0, total_items: 0 } };
  }
};