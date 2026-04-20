"use client";

import { useEffect, useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import "./SearchBarToggle.css";
import { getProducts } from "@/lib/getProducts";
import Link from "next/link";


interface Product {
  id: string;
  slug: string;
  title: {
    rendered: string;
  };
  categorySlug?: string;
}

export default function SearchBarToggle() {
  const [open, setOpen] = useState<boolean>(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    async function fetchProducts() {
      const data = await getProducts();
      setAllProducts(data);
    }
    fetchProducts();
  }, []);

  const handleChange = (value: string) => setQuery(value.toLowerCase());

  const searchedData: Product[] = query
    ? allProducts.filter((p) =>
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
          searchedData.map((data, i) => (
            <Link
              onClick={() => {
                setOpen(false);
                setQuery("");
              }}
              href={`/products/${data?.categorySlug}/${data?.slug}`}
              key={data.id}
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