"use client";

import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  return (
    <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">

      {/* Prev */}
      <Link
        href={`${basePath}?page=${currentPage - 1}`}
        className={`px-4 py-2 border rounded ${
          currentPage === 1
            ? "pointer-events-none opacity-40 cursor-not-allowed"
            : "hover:bg-[#FF9C00] hover:text-white"
        }`}
      >
        Prev
      </Link>

      {/* Page Numbers */}
      {Array.from({ length: totalPages }, (_, i) => {
        const page = i + 1;

        return (
          <Link
            key={page}
            href={`${basePath}?page=${page}`}
            className={`px-4 py-2 border rounded ${
              page === currentPage
                ? "bg-[#FF9C00] text-white"
                : "hover:bg-[#FF9C00] hover:text-white"
            }`}
          >
            {page}
          </Link>
        );
      })}

      {/* Next */}
      <Link
        href={`${basePath}?page=${currentPage + 1}`}
        className={`px-4 py-2 border rounded ${
          currentPage === totalPages
            ? "pointer-events-none opacity-40 cursor-not-allowed"
            : "hover:bg-[#FF9C00] hover:text-white"
        }`}
      >
        Next
      </Link>

    </div>
  );
}