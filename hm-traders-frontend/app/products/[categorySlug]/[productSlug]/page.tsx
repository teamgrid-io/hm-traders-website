import { getProductBySlug, getProductsByCategorySlug } from "@/lib/getProducts";
import { constructMediaUrl } from "@/lib/constructMediaUrl";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/layout/Container";
import ProductGallery from "@/components/common/ProductGallery";
import FeaturedTool from "@/components/home/FeaturedTool";
import ToolSection from "@/components/common/ToolSection";
import ToolsGrid from "@/components/common/ToolsGrid";
import ProductTabs from "@/components/common/ProductTabs";
import { fetchBannerBySlug } from "@/lib/getBannerData";
import HomeBanner from "@/components/common/HomeBanner";

export default async function ProductPage({ params }: any) {
  const { productSlug } = await params;
  const banner = await fetchBannerBySlug(314);
  const product = await getProductBySlug(productSlug);
  const products = await getProductsByCategorySlug(product?.product_category[0]);

  return (
    <>
      <HomeBanner slug={banner} />
      <Container>
        <div className="productContainer">
          <ProductGallery images={product?.imgUrl} name={product?.title?.rendered} />

          <div className="productDetails">
            <h1>{product?.title?.rendered}</h1>
            <span className="price">₹{product?.acf?.product_price}</span>
            <div className="reviewCount">
              <span>★★★★★</span>({product?.reviewCount} customer review)
            </div>

          <div className="productDescription lato">
                <p dangerouslySetInnerHTML={{ __html: product?.content?.rendered }} />
          </div>
          <div className="productBuyOption">
            <button className="button">Download Catelogue</button>
            <button className="button">Enquire Now</button>
          </div>

          <div className="productExtraInfo">
            <p>
              Categories: <span>{product?.category?.name}</span>
            </p>
            <p>
              Brands: <span>{product?.brand}</span>
            </p>
          </div>
        </div>
      </div>
      <ProductTabs
        specifications={product?.acf?.technical_specifications}
        features={product?.acf?.product_features}
      />
      <ToolSection slug={"product details"} sectionKey={"Related Products"} />
      <ToolsGrid
        tools={products?.filter((p: any) => p.id !== product.id)}
        enableLink={true}
        basePath={`/products/${product?.category?.slug}`}
      />
    </Container>
    </>
  );
}
