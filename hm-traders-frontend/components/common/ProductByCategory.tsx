"use client";
import "./ProductByCategory.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import SortingProduct from "./SortingProducts";
import { constructMediaUrl } from "@/lib/constructMediaUrl";
import { getBrands } from "@/lib/getBrands";

const ProductByCategory = ({ products, categorySlug }: any) => {
  const [sortOption, setSortOption] = useState("asc");
  const [priceRange, setPriceRange] = useState([200, 800]);
  const [query, setQuery] = useState("");
  const [Brands, setBrands] = useState<any[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<number[]>([]);

  useEffect(() => {
    async function fetchBrands() {
      const data = await getBrands();
      setBrands(data || []);
    }
    fetchBrands();
  }, []);

  const handleChange = (range: any) => {
    setPriceRange(range);
  };
  const handleSearch = (value: any) => {
    setQuery(value.toLowerCase());
  };
  const handleBrandChange = (name: string) => {
    setSelectedBrands(
      (prev) =>
        prev.includes(name)
          ? prev.filter((b) => b !== name) // uncheck
          : [...prev, name], // check
    );
  };
const filteredProducts = products
  .filter((p: any) => p.name.toLowerCase().includes(query))
  .filter((p: any) =>
    selectedBrands.length > 0 ? selectedBrands.includes(p.brand) : true
  ); 

  return (
    <>
      <div className="Productbycategories">
        <div className="productSide">
          <div className="productSorting">
            <span>Showing 10 of 10 results</span>
            {/* Sorting */}
            <SortingProduct onSortChange={setSortOption} />
          </div>

          {/* Product Grid */}
          <div className="featureTools-grid py-10">
            {filteredProducts.map((product: any) => {
              const image = product.images?.[0];
              const imageUrl = constructMediaUrl(image?.url);

              return (
                <Link
                  key={product.id}
                  href={`/products/${categorySlug}/${product.slug}`}
                  className="tool-card"
                >
                  <div className="tool-image-wrapper">
                    {imageUrl && (
                      <Image
                        src={imageUrl}
                        alt={product.name}
                        fill
                        className="tool-img"
                      />
                    )}
                  </div>

                  <div className="tool-content">
                    <p className="tool-title">{product.name}</p>

                    <div className="tool-rating">
                      <span className="stars">★★★★★</span>
                      <span className="rating">({product.rating})</span>
                      <span className="reviews">
                        • {product.reviewCount} Reviews
                      </span>
                    </div>

                    <p className="tool-price">₹{product.price}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        <div className="productFilters">
          <div className="productSearch">
            <input
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="search tools"
              type="text"
            />
          </div>
          <div className="productAvailablility">
            <span>Availability</span>
            <div className="checkboxdiv">
              <input type="checkbox" /> <label htmlFor="">In Stock</label>
            </div>
            <div className="checkboxdiv">
              <input type="checkbox" /> <label htmlFor="">Out of Stock</label>
            </div>
          </div>
          <div className="productCategory">
            <span>Category</span>
            <div className="checkboxdiv">
              <input type="checkbox" />
              <label htmlFor="">HSS Cutting Tools</label>
            </div>
            <div className="checkboxdiv">
              <input type="checkbox" /> <label htmlFor="">Carbide Tools</label>
            </div>
          </div>
          <div className="filterByPrice">
            <span>Filter by Price</span>

            <input
              type="range"
              id="price"
              name="price"
              min="0"
              max="1000"
              step="10"
              oninput="priceValue.innerText = this.value"
            ></input>
            <p id="priceValue">Price- ₹0 to ₹1000</p>
          </div>
          <div className="productBrands">
            <span>Brands</span>
            {Brands?.map((brand) => (
              <div className="checkboxdiv" key={brand.id}>
                <input
                  type="checkbox"
                  id={`brand-${brand.id}`}
                  onChange={() => handleBrandChange(brand.name)}
                />
                <label htmlFor={`brand-${brand.id}`}>{brand.name}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductByCategory;
