import { getProductsByCategorySlugPagination} from "@/lib/getProducts";
import Link from "next/link";
import Image from "next/image";

import Container from "@/components/layout/Container";
import { constructMediaUrl } from "@/lib/constructMediaUrl";
import HomeBanner from "@/components/common/HomeBanner";
import { fetchBannerBySlug } from "@/lib/getBannerData";
import Pagination from "@/components/common/Pagination";
const banner = await fetchBannerBySlug("products");

export default async function CategoryPage({ params, searchParams }: any) {
  const { categorySlug } = await params;
  const resolvedSearchParams = await searchParams;

  const pageNumber =  Number(await resolvedSearchParams?.page) || 1;
console.log("Current page number:", pageNumber);
  const data = await getProductsByCategorySlugPagination(categorySlug, pageNumber, 8);
console.log("Fetched category products data:", data); 
  const products = data.products;

  return (
    <>
    <HomeBanner slug={banner}/>
    <Container>
      <div className="featureTools-grid py-10">

        {products?.map((product: any) => {

          const image = product.images?.[0];
          const imageUrl = constructMediaUrl(image?.url);
          console.log("product",product)

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
                  <span className="rating">{product.rating}</span>
                  <span className="reviews">• {product.reviewCount} Reviews</span>
                </div>

                <p className="tool-price">₹{product.price}</p>

              </div>

            </Link>
          );
        })}

      </div>
      <Pagination
  currentPage={data.page}
  totalPages={data.totalPages}
  basePath={`/products/${categorySlug}`}
/>
    </Container>
    </>
  );
}