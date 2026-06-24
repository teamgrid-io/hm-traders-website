import { getCategories } from "@/lib/getCategories";
// Required for Next.js static export (output: export)
import { getProductsByCategorySlug } from "@/lib/getProducts";
import Container from "@/components/layout/Container";
import HomeBanner from "@/components/common/HomeBanner";
import { fetchBannerBySlug } from "@/lib/getBannerData";
import ProductByCategory from "@/components/common/ProductByCategory";
import { Suspense } from "react";

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories
    .filter((cat: any) => !!cat.slug)
    .map((cat: any) => ({ categorySlug: cat.slug }));
}
export default async function CategoryPage({ params }: any) {
  const banner = await fetchBannerBySlug(150);

  const { categorySlug } =await params;

  const products = await getProductsByCategorySlug(categorySlug);
  return (
    <>
      <HomeBanner slug={banner} />
      <Container>
          <Suspense fallback={<div>Loading...</div>}>
        <ProductByCategory
          products={products}
          categorySlug={categorySlug}
        />
        </Suspense>
      </Container>
    </>
  );
}
