"use client";
import "./ProductByCategory.css";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import SortingProduct from "./SortingProducts";
import { constructMediaUrl } from "@/lib/constructMediaUrl";
import { getBrands } from "@/lib/getBrands";
import Pagination from "./Pagination";
import { useSearchParams } from "next/navigation";
import Loader from "./Loader";
const ProductByCategory = ({ products, categorySlug }: any) => {
  const [sortOption, setSortOption] = useState("asc");
  const [priceRange, setPriceRange] = useState([200, 800]);
  const [query, setQuery] = useState("");
  const [Brands, setBrands] = useState<any[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [price, setPrice] = useState(200000);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
const searchParams = useSearchParams();

const currentPage = Number(searchParams.get("page")) || 1;
  const [availability, setAvailability] = useState({
    inStock: false,
    outOfStock: false,
  });
 useEffect(() => {
  async function fetchBrands() {
    try {
      setLoading(true);

      const data = await getBrands();

      setBrands(data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  fetchBrands();
}, []);


  const handleChange = (range: any) => {
    setPriceRange(range);
  };
  const handleSearch = (value: any) => {
    setQuery(value.toLowerCase());
  };
 const handleBrandChange = (id: any) => {
  const stringId = String(id);
  setSelectedBrands((prev) =>
    prev.includes(stringId)
      ? prev.filter((b) => b !== stringId)
      : [...prev, stringId]
  );
};
 
  const filteredProducts = (products ?? [])
  .filter((p: any) => p?.title?.rendered?.toLowerCase()?.includes(query))
  .filter((p: any) => {
    if (selectedBrands.length === 0) return true;
    if (!p.brand) return false;
    return p.brand.some((b: number) => selectedBrands.includes(String(b)));
  })
  .filter((p: any) => {
    if (availability.inStock && availability.outOfStock) return true;
    if (availability.inStock) return p.numberOfStock > 0;
    if (availability.outOfStock) return p.numberOfStock === 0;
    return true;
  })
  .filter((p: any) => {
    if (p.acf.product_price == null) return true;
    return p.acf.product_price <= price;
  })
  .sort((a: any, b: any) =>
    sortOption === "asc"
      ? a.acf.product_price - b.acf.product_price
      : b.acf.product_price - a.acf.product_price
  );
  const handleClearFilters = () => {
    setQuery("");
    setSelectedBrands([]);
    setPrice(1000);
    setAvailability({
      inStock: false,
      outOfStock: false,
    });
  };
  const ITEMS_PER_PAGE = 9;

const totalPages = Math.ceil(
  filteredProducts.length / ITEMS_PER_PAGE
);

const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

const paginatedProducts = filteredProducts.slice(
  startIndex,
  startIndex + ITEMS_PER_PAGE
);
if (loading) {
  return <Loader />;
}
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
              Showing {paginatedProducts?.length} of {products?.length} results
            </span>
            {/* Sorting */}
            <SortingProduct onSortChange={setSortOption} />
          </div>

          {/* Product Grid */}
          {paginatedProducts?.length > 0 ? (
            <div className="featureTools-grid py-10">
             {paginatedProducts.map((product: any) => {
                const image = product.imgUrl;
                const imageUrl = constructMediaUrl(image);

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
                      <p className="tool-title">{product.title.rendered}</p>

                      {/* <div className="tool-rating">
                        <span className="stars">★★★★★</span>
                        <span className="rating">({product.rating})</span>
                        <span className="reviews">
                          • {product.reviewCount} Reviews
                        </span>
                      </div> */}

                      <p className="tool-price">₹{product.acf.product_price}</p>
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
         
          <div className="filterByPrice">
            <span>Filter by Price</span>

            <input
              type="range"
              min="0"
              max="200000"
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
                  checked={selectedBrands.includes(String(brand.id))}
                  onChange={() => handleBrandChange(brand.id)}
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
          <Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  basePath={`/products/${categorySlug}`}
/>

    </>
  );
};

export default ProductByCategory;