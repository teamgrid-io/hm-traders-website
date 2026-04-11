"use client";

import { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import "./SearchBarToggle.css";
import { getProducts } from "@/lib/getProducts";
import Link from "next/link";

export default function SearchBarToggle() {
  const [open, setOpen] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProducts();
      setAllProducts(data);
    }
    fetchProducts();
  }, []);

  const handleChange = (value: any) => setQuery(value.toLowerCase());

  const searchedData = query
    ? allProducts.filter((p: any) =>
        p?.title?.rendered?.toLowerCase().includes(query)
      )
    : [];

  // Check if mobile
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <div className="searchWrapper">
      {/* Show icon only on desktop */}
      {!isMobile && (
        <IoSearchSharp className="searchIcon" onClick={() => setOpen(!open)} />
      )}

      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        className={`searchInput ${open || isMobile ? "open" : ""}`}
      />

      {/* Dropdown shows if query exists and either open (desktop) or mobile */}
      <div
        className={`searchDropdown ${
          query && (open || isMobile) ? "open" : ""
        }`}
      >
        {searchedData.length === 0 ? (
          <div className="noResult">No results found</div>
        ) : (
          searchedData.map((data: any, i: number) => (
            <Link
              onClick={() => {
                setOpen(false);
                setQuery("");
              }}
              href={`/products/${data?.categorySlug}/${data?.slug}`}
              key={i}
              className="dropdownItem"
            >
              {data?.title?.rendered}

            </Link>
          ))
        )}
      </div>
    </div>
  );
}