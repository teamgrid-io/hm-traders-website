"use client";
 
import { useEffect, useRef, useState } from "react";
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
  const [open, setOpen] = useState(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
 
  const wrapperRef = useRef<HTMLDivElement>(null);
 
  useEffect(() => {
    async function fetchProducts() {
      const data = await getProducts();
      setAllProducts(data);
    }
 
    fetchProducts();
  }, []);
 
  // CLOSE ON OUTSIDE CLICK
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setQuery("");
      }
    }
 
    document.addEventListener("mousedown", handleClickOutside);
 
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
 
  const handleChange = (value: string) => {
    setQuery(value.toLowerCase());
  };
 
  const searchedData: Product[] = query
    ? allProducts.filter((p) =>
        p?.title?.rendered?.toLowerCase().includes(query)
      )
    : [];
 
  return (
    <div className="searchWrapper" ref={wrapperRef}>
      <IoSearchSharp
        className="searchIcon"
        onClick={() => setOpen((prev) => !prev)}
      />
 
      <div className={`searchContainer ${open ? "active" : ""}`}>
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => handleChange(e.target.value)}
          className="searchInput"
          autoFocus={open}
        />
 
        <div className={`searchDropdown ${query ? "open" : ""}`}>
          {searchedData.length === 0 ? (
            <div className="noResult">No results found</div>
          ) : (
            searchedData.map((data) => (
              <Link
                key={data.id}
                href={`/products/${data?.categorySlug}/${data?.slug}`}
                className="dropdownItem"
                onClick={() => {
                  setOpen(false);
                  setQuery("");
                }}
              >
                {data?.title?.rendered}
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}