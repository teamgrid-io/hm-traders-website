import { getProductBySlug, getProductsByCategorySlug } from "@/lib/getProducts";
import { constructMediaUrl } from "@/lib/constructMediaUrl";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/layout/Container";
import ProductGallery from "@/components/common/ProductGallery";
import ProductCounter from "@/components/common/ProductCounter";
import FeaturedTool from "@/components/home/FeaturedTool";
import ToolSection from "@/components/common/ToolSection";
import ToolsGrid from "@/components/common/ToolsGrid";


export default async function ProductPage({ params }: any) {
  const { productSlug } = await params;

  const product = await getProductBySlug(productSlug);
  console.log("product", product);
  const products = await getProductsByCategorySlug(product?.category?.slug);

  return (
    <Container>
      <div className="productContainer">
        <ProductGallery images={product?.images} name={product?.name} />

        <div className="productDetails">
          <h1>{product?.name}</h1>
          <span className="price">₹{product?.price}</span>
          <div className="reviewCount">
            <span>★★★★★</span>({product.reviewCount} customer review)
          </div>

          <div className="productDescription">
            {product?.description?.root?.children?.map(
              (block: any, i: number) => (
                <p key={i}>{block.children?.[0]?.text}</p>
              ),
            )}
          </div>
          <div className="productBuyOption">
            <ProductCounter />
            <button className="button">CONTACT US</button>
          </div>

          <div className="productExtraInfo">
            <p>
              Categories: <span>{product?.category?.name}</span>
            </p>
            <p>
              Brands: <span>{product.brand}</span>
            </p>
          </div>
        </div>
      </div>
      <div className="productSpecs">
        <span className="productSpecstitle">SPECIFICATION</span>
        <p>{product.specifications}</p>
      </div>
      <ToolSection slug={"product details"} />
      <ToolsGrid tools={products?.filter((p: any) => p.id !== product.id)} />
      {/* <div className="featureTools-grid">
        {products?.slice(0, 4).map((product: any) => {
          const image = product.images?.[0];
          const imageUrl = constructMediaUrl(image?.url);

          return (
            <Link key={product.id} href="#" className="tool-card">
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
                  <span className="reviews">
                    • {product.reviewCount} Reviews
                  </span>
                </div>

                <p className="tool-price">₹{product.price}</p>
              </div>
            </Link>
          );
        })}
      </div> */}
    </Container>
  );
}
