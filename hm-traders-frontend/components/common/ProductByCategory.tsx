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
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [price, setPrice] = useState(1000);
  const [showFilters, setShowFilters] = useState(false);

  const [availability, setAvailability] = useState({
    inStock: false,
    outOfStock: false,
  });

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
  const handleAvailabilityChange = (type) => {
    setAvailability((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const filteredProducts = products
    .filter((p: any) => p.name.toLowerCase().includes(query))
    .filter((p: any) =>
      selectedBrands.length > 0 ? selectedBrands.includes(p.brand) : true,
    )
    .filter((p: any) => {
      if (availability.inStock && availability.outOfStock) return true;
      if (availability.inStock) return p.numberOfStock > 0;
      if (availability.outOfStock) return p.numberOfStock === 0;
      return true;
    })
    .filter((p: any) => {
      if (p.price === undefined || p.price === null) return true;
      return p.price <= price;
    })
    .sort((a: any, b: any) => {
      if (sortOption === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    const handleClearFilters = () => {
  setQuery("");
  setSelectedBrands([]);
  setPrice(1000);
  setAvailability({
    inStock: false,
    outOfStock: false,
  });
};
  return (
    <>
      <div className="Productbycategories">
        <div className="productSide">
          <div className="mobileFilterBar">
            <button onClick={() => setShowFilters(true)} className="filterBtn">
              ☰ Filters
            </button>
          </div>
          <div className="productSorting">
            <span>
              Showing {filteredProducts.length} of {products.length} results
            </span>
            {/* Sorting */}
            <SortingProduct onSortChange={setSortOption} />
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
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
          ) : (
            <div className="no-products">No Products to show</div>
          )}
        </div>
        <div className={`productFilters ${showFilters ? "active" : ""}`}>
          <div className="filterHeader">
            <span>Filters</span>
            <button onClick={() => setShowFilters(false)}>✕</button>
          </div>
          <div className="productSearch">
           <input
  value={query}
  onChange={(e) => handleSearch(e.target.value)}
  placeholder="search tools"
  type="text"
/>
          </div>
          <div className="productAvailablility">
            <span>Availability</span>
            <div className="checkboxdiv">
              <input
                type="checkbox"
                checked={availability.inStock}
                onChange={() => handleAvailabilityChange("inStock")}
              />{" "}
              <label htmlFor="">In Stock</label>
            </div>
            <div className="checkboxdiv">
              <input
                type="checkbox"
                checked={availability.outOfStock}
                onChange={() => handleAvailabilityChange("outOfStock")}
              />{" "}
              <label htmlFor="">Out of Stock</label>
            </div>
          </div>
          {/* <div className="productCategory">
            <span>Category</span>
            <div className="checkboxdiv">
              <input type="checkbox" />
              <label htmlFor="">HSS Cutting Tools</label>
            </div>
            <div className="checkboxdiv">
              <input type="checkbox" /> <label htmlFor="">Carbide Tools</label>
            </div>
          </div> */}
          <div className="filterByPrice">
            <span>Filter by Price</span>

            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />

            <p>Price - ₹0 to ₹{price}</p>
          </div>
          <div className="productBrands">
            <span>Brands</span>
            {Brands?.map((brand) => (
              <div className="checkboxdiv" key={brand.id}>
<input
  type="checkbox"
  id={`brand-${brand.id}`}
  checked={selectedBrands.includes(brand.name)}
  onChange={() => handleBrandChange(brand.name)}
/>
                <label htmlFor={`brand-${brand.id}`}>{brand.name}</label>
              </div>
            ))}
          </div>
          <div className="filterFooter">
  <button onClick={handleClearFilters} className="clearBtn">
    Clear
  </button>

  <button onClick={() => setShowFilters(false)} className="applyBtn">
    Apply Filters
  </button>
</div>
        </div>
      </div>
    </>
  );
};

export default ProductByCategory;
