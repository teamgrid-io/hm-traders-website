"use client";
import "./ProductByCategory.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import SortingProduct from "./SortingProducts";
import { constructMediaUrl } from "@/lib/constructMediaUrl";
import { getBrands } from "@/lib/getBrands";
import Pagination from "./Pagination";

interface Brand {
  id: string;
  name: string;
  logo?: string | null;
  description?: string | null;
  catalogPdf?: string | null;
  updatedAt?: string;
  createdAt?: string;
}

interface Product {
  id: string;
  slug: string;
  title: {
    rendered: string;
  };
  brand?: (number | string | Brand)[];
  imgUrl?: string;
  acf: {
    product_price?: number;
    [key: string]: string | number | undefined;
  };
  numberOfStock: number;
  rating?: number;
  reviewCount?: number;
}

interface ProductByCategoryProps {
  products: Product[];
  categorySlug: string;
  page: number; // ✅ ADDED
}

const ProductByCategory = ({
  products,
  categorySlug,
  page,
}: ProductByCategoryProps) => {
  const [sortOption, setSortOption] = useState<string>("asc");
  const [query, setQuery] = useState<string>("");
  const [Brands, setBrands] = useState<Brand[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<(string | number)[]>([]);
  const [price, setPrice] = useState<number>(1000);
  const [showFilters, setShowFilters] = useState<boolean>(false);
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

  const handleSearch = (value: string) => {
    setQuery(value.toLowerCase());
  };

  const handleBrandChange = (id: string | number) => {
    setSelectedBrands((prev) =>
      prev.includes(id)
        ? prev.filter((b) => b !== id)
        : [...prev, id]
    );
  };

  const handleAvailabilityChange = (type: keyof typeof availability) => {
    setAvailability((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleClearFilters = () => {
    setQuery("");
    setSelectedBrands([]);
    setPrice(1000);
    setAvailability({
      inStock: false,
      outOfStock: false,
    });
  };

  // ✅ FILTER + SORT
  const filteredProducts = products
    ?.filter((p) => p.title.rendered.toLowerCase().includes(query))
    .filter((p) =>
      selectedBrands.length > 0
        ? Array.isArray(p.brand)
          ? p.brand.some((b) => {
              if (typeof b === "object" && b !== null && "id" in b) {
                return selectedBrands.includes((b as Brand).id);
              }
              return selectedBrands.includes(b);
            })
          : false
        : true
    )
    .filter((p) => {
      if (availability.inStock && availability.outOfStock) return true;
      if (availability.inStock) return p.numberOfStock > 0;
      if (availability.outOfStock) return p.numberOfStock === 0;
      return true;
    })
    .filter((p) => {
      if (p.acf.product_price == null) return true;
      return p.acf.product_price <= price;
    })
    .sort((a, b) => {
      if (sortOption === "asc") {
        return (a.acf.product_price ?? 0) - (b.acf.product_price ?? 0);
      } else {
        return (b.acf.product_price ?? 0) - (a.acf.product_price ?? 0);
      }
    });

  // ✅ PAGINATION
  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;

  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <>
      <div className="Productbycategories">
        <div className="productSide">
          <div className="mobileFilterBar">
            <button
              onClick={() => setShowFilters(true)}
              className="filterBtn"
            >
              ☰ Filters
            </button>
          </div>

          <div className="productSorting">
            <span>
              Showing {paginatedProducts.length} of{" "}
              {filteredProducts.length} results
            </span>
            <SortingProduct onSortChange={setSortOption} />
          </div>

          {/* PRODUCT GRID */}
          {filteredProducts.length > 0 ? (
            <div className="featureTools-grid py-10">
              {paginatedProducts.map((product) => {
                const imageUrl = constructMediaUrl(product.imgUrl);

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
                          alt={product.title.rendered}
                          fill
                          className="tool-img"
                        />
                      )}
                    </div>

                    <div className="tool-content">
                      <p className="tool-title">
                        {product.title.rendered}
                      </p>

                      {/* <div className="tool-rating">
                        <span>★★★★★</span>
                        <span>({product.rating})</span>
                        <span> • {product.reviewCount} Reviews</span>
                      </div> */}

                      <p className="tool-price">
                        ₹{product.acf.product_price}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="no-products">No Products to show</div>
          )}
        </div>

        {/* FILTERS */}
        <div className={`productFilters ${showFilters ? "active" : ""}`}>
          <div className="filterHeader">
            <span>Filters</span>
            <button onClick={() => setShowFilters(false)}>✕</button>
          </div>

          <input
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="search tools"
          />

          <div>
            <label>
              <input
                type="checkbox"
                checked={availability.inStock}
                onChange={() => handleAvailabilityChange("inStock")}
              />
              In Stock
            </label>

            <label>
              <input
                type="checkbox"
                checked={availability.outOfStock}
                onChange={() =>
                  handleAvailabilityChange("outOfStock")
                }
              />
              Out of Stock
            </label>
          </div>

          <input
            type="range"
            min="0"
            max="1000"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />

          <p>₹0 - ₹{price}</p>

          {Brands.map((brand) => (
            <label key={brand.id}>
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand.id)}
                onChange={() => handleBrandChange(brand.id)}
              />
              {brand.name}
            </label>
          ))}

          <button onClick={handleClearFilters}>Clear</button>
        </div>
      </div>

      {/* PAGINATION */}
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        basePath={`/products/${categorySlug}`}
      />
    </>
  );
};

export default ProductByCategory;