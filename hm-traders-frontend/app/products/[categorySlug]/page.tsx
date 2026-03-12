import { getProductsByCategorySlug,getProducts } from "@/lib/getProducts";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/layout/Container";
import { constructMediaUrl } from "@/lib/constructMediaUrl";

export default async function CategoryPage({ params }: any) {
  const { categorySlug } = await params;
const product = await getProducts();
  const products = await getProductsByCategorySlug(categorySlug);

  return (
    <Container>
      <div className="grid md:grid-cols-3 gap-8 py-10">
        {products?.map((product: any) => {
          const image = product.images?.[0];
          const imageUrl = constructMediaUrl(image?.url);

          return (
            <Link
              key={product.id}
              href={`/products/${categorySlug}/${product.slug}`}
            >
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={product.name}
                  width={400}
                  height={250}
                />
              )}

              <div className="p-4 font-semibold">
                {product.name}
              </div>
            </Link>
          );
        })}
      </div>
    </Container>
  );
}