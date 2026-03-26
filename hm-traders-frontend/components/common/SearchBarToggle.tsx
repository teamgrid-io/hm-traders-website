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

  const handleChange = (value: any) => {
    setQuery(value.toLowerCase());
  };

  const searchedData = query
    ? allProducts.filter((p: any) => p.name.toLowerCase().includes(query))
    : [];

  return (
    <div className="searchWrapper">
      <IoSearchSharp className="searchIcon" onClick={() => setOpen(!open)} />

      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        className={`searchInput ${open ? "open" : ""}`}
      />

      <div className={`searchDropdown ${open && query ? "open" : ""}`}>
        {searchedData.length === 0 ? (
          <div className="noResult">No results found</div>
        ) : (
          searchedData.map((data: any, i: number) => (
            <Link
              onClick={() => {
                setOpen(false); 
                setQuery(""); 
              }}
              href={`/products/${data.category.slug}/${data.slug}`}
              key={i}
              className="dropdownItem"
            >
              {data.name}
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
