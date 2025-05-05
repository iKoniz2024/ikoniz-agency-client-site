import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { StarIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import Heading from "../_components/Heading";
import axiosInstance from "@/lib/AxiosInstance";
import { toast } from "sonner";
import React from "react";
import Pagination from "../_components/LinkPagination";

interface Review {
  id: number;
  user: {
    first_name: string;
    last_name: string;
    avatar?: string;
  };
  created_at: string;
  rating: number;
  comment: string;
  product_title: string;
}

const StarRating = ({ count }: { count: number }) => (
  <div className="flex gap-1">
    {Array.from({ length: 5 }).map((_, i) => (
      <StarIcon
        key={i}
        className={`w-4 h-4 ${i < count ? "text-[#FF9900]" : "text-gray-300"}`}
        fill={i < count ? "#FF9900" : "none"}
      />
    ))}
  </div>
);

function ProductReview({ product }: any) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("recommended");
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);

  const [page, setPage] = useState(1);
  const [count, setCount] = useState(0);
  const [pageSize] = useState(10);

  useEffect(() => {
    fetchReviews();
  }, [product.id, sortBy, ratingFilter, page]);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append("sort_by", sortBy);
      if (ratingFilter) params.append("rating", ratingFilter.toString());
      params.append("page", page.toString());
      params.append("page_size", pageSize.toString());

      const response = await axiosInstance.get(
        `/shop/reviews/product/${product.id}/`,
        { params }
      );

      setReviews(response.data.data.results || []);
      setCount(response.data.data.count || 0);
    } catch (error) {
      toast("Failed to fetch reviews");
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const handleRatingFilterChange = (stars: number) => {
    if (stars === 0) {
      setRatingFilter(null);
    } else if (ratingFilter === stars) {
      setRatingFilter(null);
    } else {
      setRatingFilter(stars);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  return (
    <section className="">
      <Heading
        title="Customer reviews"
        description="All reviews are from verified customers who purchased the activity. Reviews can only be submitted after the activity takes place."
        showButtons={false}
      />

      {/* Overall Rating Card */}
      <div className="my-10 w-2/5">
        <Card className="border-none rounded-xl">
          <CardContent className="p-6 bg-[#F4F4F4] rounded-xl flex justify-between gap-4 items-start">
            {/* Left side - Overall rating */}
            <div className="text-center w-1/3 py-2 border-r pr-6">
              <p className="text-sm font-semibold text-muted-foreground mb-10">
                Overall rating
              </p>
              <div className="space-y-2">
                <div className="text-4xl font-bold text-black">
                  {product?.avg_rating || 0}
                </div>
                <div className="flex justify-center my-1">
                  <StarRating count={Math.round(product?.avg_rating) || 0} />
                </div>
                <p className="text-sm text-muted-foreground">
                  {product?.total_reviews || 0} Reviews
                </p>
              </div>
            </div>

            {/* Right side - Star distribution */}
            <div className="w-2/3 space-y-4">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-3">
                  <p className="w-4 text-right">{star}</p>
                  <StarIcon
                    className="text-[#FF9900] text-xs w-5"
                    fill="#FF9900"
                  />
                  <div className="w-full h-2 bg-[#ddd] rounded">
                    <div
                      className="h-2 bg-[#FF9900] rounded"
                      style={{
                        width: `${product?.star_distribution?.[star] || 0}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 w-8 text-right">
                    {product?.star_distribution?.[star] || 0}%
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="my-10 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filters Section */}
        <div className="col-span-1 space-y-6">
          <>
            <div>
              <p className="font-semibold mb-2">Sort by:</p>
              <RadioGroup
                value={sortBy}
                onValueChange={handleSortChange}
                defaultValue="recommended"
              >
                {[
                  { label: "Recommended", value: "recommended" },
                  { label: "Most Recent", value: "most_recent" },
                  { label: "Highest Rated", value: "highest_rated" },
                  { label: "Lowest Rated", value: "lowest_rated" },
                ].map((opt) => (
                  <div
                    key={opt.value}
                    className="flex items-center space-x-2 my-1"
                  >
                    <RadioGroupItem value={opt.value} id={opt.value} />
                    <Label htmlFor={opt.value}>{opt.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            <div>
              <p className="font-semibold mb-4">Filter Star Rating</p>
              <div className="space-y-4">
                {[
                  { label: "All Star Ratings", stars: 0 },
                  { label: "5 Star Rating", stars: 5 },
                  { label: "4 Star Rating", stars: 4 },
                  { label: "3 Star Rating", stars: 3 },
                  { label: "2 Star Rating", stars: 2 },
                  { label: "1 Star Rating", stars: 1 },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id={`star-check-${i}`}
                        checked={
                          ratingFilter === item.stars ||
                          (item.stars === 0 && ratingFilter === null)
                        }
                        onCheckedChange={() =>
                          handleRatingFilterChange(item.stars)
                        }
                      />
                      <Label htmlFor={`star-check-${i}`}>{item.label}</Label>
                    </div>
                    {item.stars > 0 && (
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <StarIcon
                            key={index}
                            className={`w-4 h-4 ${
                              index < item.stars
                                ? "text-[#FF9900]"
                                : "text-gray-300"
                            }`}
                            fill={index < item.stars ? "#FF9900" : "none"}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </>
        </div>

        {/* Reviews Section */}
        <div className="col-span-1 md:col-span-3 space-y-4">
          {loading ? (
            <>
              {[1, 2, 3].map((i) => (
                <Card key={i} className="border-none">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <div className="flex items-center gap-1">
                          <div className="flex gap-1">
                            {Array.from({ length: 5 }).map((_, idx) => (
                              <Skeleton key={idx} className="h-4 w-4" />
                            ))}
                          </div>
                          <Skeleton className="h-4 w-24" />
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-4/5" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </>
          ) : reviews.length === 0 ? (
            <div className="flex justify-center items-center h-64">
              <p>No reviews found</p>
            </div>
          ) : (
            <>
              {reviews?.map((review) => (
                <Card key={review.id} className="border-none">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage
                          src={
                            review.user.avatar ||
                            "https://i.pravatar.cc/40?u=user"
                          }
                        />
                        <AvatarFallback>
                          {review.user.first_name?.[0]}
                          {review.user.last_name?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {review.user.first_name} {review.user.last_name}
                        </p>
                        <div className="flex items-center gap-1">
                          <StarRating count={review.rating} />
                          <p className="text-sm text-muted-foreground">
                            | {formatDate(review.created_at)}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="mt-2 text-sm text-muted-foreground leading-6">
                        {review.comment}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Pagination
                currentPage={page}
                totalPages={Math.ceil(count / pageSize)}
                onPageChange={(newPage: number) => setPage(newPage)}
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductReview;
