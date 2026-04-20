import { getCategories } from "@/lib/getCategories";
import { getProductBySlug, getProductsByCategorySlug } from "@/lib/getProducts";
import { constructMediaUrl } from "@/lib/constructMediaUrl";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/layout/Container";
import ProductGallery from "@/components/common/ProductGallery";
import ToolSection from "@/components/common/ToolSection";
import ToolsGrid from "@/components/common/ToolsGrid";
import ProductTabs from "@/components/common/ProductTabs";
import { fetchBannerBySlug } from "@/lib/getBannerData";
import HomeBanner from "@/components/common/HomeBanner";
import { getPageById } from "@/lib/api";
// Required for Next.js static export (output: export)
export async function generateStaticParams() {
  const categories = await getCategories();
  const allParams: { categorySlug: string; productSlug: string }[] = [];
  for (const category of categories) {
    if (!category.slug) continue;
    const products = await getProductsByCategorySlug(category.slug);
    for (const product of products) {
      if (product?.slug) {
        allParams.push({ categorySlug: category.slug, productSlug: product.slug });
      }
    }
  }
  return allParams;
}
export default async function ProductPage({ params }: any) {
  const { productSlug } = await params;
  const banner = await fetchBannerBySlug(314);
  const product = await getProductBySlug(productSlug);
  const products = await getProductsByCategorySlug(
    product?.product_category?.slug,
  );
  const relatedProducts = products.filter((p: any) => p.id !== product.id);
  const sections = await getPageById(56);
  const catalogueFileUrl = constructMediaUrl(product?.catalogueUrl);

  return (
    <>
      <HomeBanner slug={banner} />
      <Container>
        <div className="productContainer">
          <ProductGallery
            images={product?.imgUrl}
            name={product?.title?.rendered}
          />

          <div className="productDetails">
            <h1>{product?.title?.rendered}</h1>
            <span className="price">₹{product?.acf?.product_price}</span>
            <div className="reviewCount">
              <span>★★★★★</span>({product?.reviewCount} customer review)
            </div>

            <div className="productDescription lato">
              <p
                dangerouslySetInnerHTML={{ __html: product?.content?.rendered }}
              />
            </div>
            <div className="productBuyOption">
              {catalogueFileUrl &&
                catalogueFileUrl.toLowerCase().endsWith(".pdf") && (
                  <a
                    href={catalogueFileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button"
                  >
                   Download Catelogue
                  </a>
                )}
              <Link href="/contact" className="button">
                Enquire Now
              </Link>
            </div>

            <div className="productExtraInfo">
              <p>
                Categories: <span>{product?.product_category?.name}</span>
              </p>
              <p>
                Brands: <span>{product?.brand?.name}</span>
              </p>
            </div>
          </div>
        </div>
        <ProductTabs
          specifications={product?.acf?.technical_specifications}
          features={product?.acf?.product_features}
        />
        <ToolSection
          sections={sections}
          sectionKey={"featured_products"}
        />
        {relatedProducts.length > 0 && (
          <ToolsGrid
            tools={relatedProducts}
            enableLink={true}
            basePath={`/products/${product?.product_category?.slug}`}
          />
        )}
      </Container>
    </>
  );
}
