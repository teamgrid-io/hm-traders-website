import { getCategories } from "@/lib/getCategories";
// Required for Next.js static export (output: export)
import { getProductsByCategorySlug } from "@/lib/getProducts";
import Container from "@/components/layout/Container";
import HomeBanner from "@/components/common/HomeBanner";
import { fetchBannerBySlug } from "@/lib/getBannerData";
import ProductByCategory from "@/components/common/ProductByCategory";
export async function generateStaticParams() {
  const categories = await getCategories();
  return categories
    .filter((cat: any) => !!cat.slug)
    .map((cat: any) => ({ categorySlug: cat.slug }));
}
export default async function CategoryPage({ params, searchParams }: any) {
  const banner = await fetchBannerBySlug(150);

  const { categorySlug } =await params;
  const page =await Number(searchParams?.page) || 1;

  const products = await getProductsByCategorySlug(categorySlug);

  return (
    <>
      <HomeBanner slug={banner} />
      <Container>
        <ProductByCategory
          products={products}
          categorySlug={categorySlug}
          page={page}
        />
      </Container>
    </>
  );
}
