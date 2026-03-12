import { getProductBySlug } from "@/lib/getProducts";
import Image from "next/image";
import { constructMediaUrl } from "@/lib/constructMediaUrl";
import Container from "@/components/layout/Container";

export default async function ProductPage({ params }: any) {
  const { productSlug } = params;

  const product = await getProductBySlug(productSlug);

  const image = product.images?.[0];
  const imageUrl = constructMediaUrl(image?.url);

  return (
    <Container>
      <div className="py-10">
        <h1 className="text-3xl font-bold mb-6">{product.name}</h1>

        {imageUrl && (
          <Image
            src={imageUrl}
            alt={product.name}
            width={500}
            height={400}
          />
        )}

        <div className="mt-6">
          {product.description?.root?.children?.map((block: any, i: number) => (
            <p key={i}>{block.children?.[0]?.text}</p>
          ))}
        </div>
      </div>
    </Container>
  );
}