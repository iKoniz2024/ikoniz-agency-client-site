export const sortOptions = [
  { value: "name-asc", label: "Name (A-Z)" },
  { value: "name-desc", label: "Name (Z-A)" },
  { value: "price-asc", label: "Price (Low to High)" },
  { value: "price-desc", label: "Price (High to Low)" },
];

export const categoryList = [
  "Tour",
  "Attraction ticket",
  "City card",
  "Transfer",
  "Rental",
];

export const carouselSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 1,
  // autoplay: true,
  autoplaySpeed: 3000,
  cssEase: "cubic-bezier(0.645, 0.045, 0.355, 1)",
  pauseOnHover: true,
  arrows: false,
  variableWidth: false,
  centerMode: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        speed: 400,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        speed: 300,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        speed: 200,
      },
    },
  ],
};
