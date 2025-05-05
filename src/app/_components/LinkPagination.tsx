import React, { useEffect, useState } from "react";

// DownArrowSvg Component
function DownArrowSvg({ className }: any) {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="arrow-up-01-round">
        <path
          id="Vector"
          d="M4 6C4 6 6.94593 9.99999 8 10C9.05413 10 12 6 12 6"
          stroke="#141B34"
          strokeWidth="1.5"
          strokeLinecap="round"
          fillOpacity="round"
        />
      </g>
    </svg>
  );
}

// PaginationNumber Component
const PaginationNumber = ({ children, active = false, ...props }: any) => {
  return (
    <button
      {...props}
      className={`px-3.5 py-[9px] rounded shadow flex-col justify-center items-center inline-flex ${
        active ? "bg-red-500 text-white" : "bg-white text-gray-700"
      } hover:bg-red-500 hover:text-white transition-colors duration-200`}
    >
      <div className="w-4 text-center text-[16px] font-normal leading-none">
        {children}
      </div>
    </button>
  );
};

// Pagination Component
const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => {
  const [pages, setPages] = useState<number[]>([]);

  useEffect(() => {
    const generatePages = () => {
      let pages: number[] = [];
      const maxVisiblePages = 5; // Adjust how many page numbers to show
      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      // Adjust if we're at the start or end
      if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      setPages(pages);
    };

    generatePages();
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 p-4 mt-6">
      {/* Previous Button */}
      <button
        disabled={currentPage === 1}
        className={`w-8 h-8 py-[11px] flex justify-center items-center rounded transition-colors duration-200 ${
          currentPage === 1
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer hover:bg-gray-200"
        }`}
        onClick={() => onPageChange(currentPage - 1)}
      >
        <DownArrowSvg className="rotate-90" />
      </button>

      {/* First Page */}
      {pages[0] > 1 && (
        <>
          <PaginationNumber
            active={1 === currentPage}
            onClick={() => onPageChange(1)}
          >
            1
          </PaginationNumber>
          {pages[0] > 2 && <span className="px-2">...</span>}
        </>
      )}

      {/* Pagination Numbers */}
      {pages.map((pageNum) => (
        <PaginationNumber
          key={pageNum}
          active={pageNum === currentPage}
          onClick={() => onPageChange(pageNum)}
        >
          {pageNum}
        </PaginationNumber>
      ))}

      {/* Last Page */}
      {pages[pages.length - 1] < totalPages && (
        <>
          {pages[pages.length - 1] < totalPages - 1 && (
            <span className="px-2">...</span>
          )}
          <PaginationNumber
            active={totalPages === currentPage}
            onClick={() => onPageChange(totalPages)}
          >
            {totalPages}
          </PaginationNumber>
        </>
      )}

      {/* Next Button */}
      <button
        disabled={currentPage === totalPages}
        className={`w-8 h-8 py-[11px] flex justify-center items-center rounded transition-colors duration-200 ${
          currentPage === totalPages
            ? "cursor-not-allowed opacity-50"
            : "cursor-pointer hover:bg-gray-200"
        }`}
        onClick={() => onPageChange(currentPage + 1)}
      >
        <DownArrowSvg className="-rotate-90" />
      </button>
    </div>
  );
};
export default Pagination;