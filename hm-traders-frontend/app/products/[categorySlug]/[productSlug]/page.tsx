import { getProductBySlug } from "@/lib/getProducts";
import Container from "@/components/layout/Container";
import ProductGallery from "@/components/common/ProductGallery";

export default async function ProductPage({ params }: any) {
  const { productSlug } = await params;

  const product = await getProductBySlug(productSlug);

  return (
    <Container>
      <div className="productContainer">

        <ProductGallery images={product?.images} name={product?.name} />

        <div className="productDetails">
          <h1>{product?.name}</h1>

          <div className="productDescription">
            {product?.description?.root?.children?.map((block: any, i: number) => (
              <p key={i}>{block.children?.[0]?.text}</p>
            ))}
          </div>
          <div>
            <button className="catalog-btn">Download E-Catalogues</button>
          </div>
        </div>

      </div>
    </Container>
  );
}