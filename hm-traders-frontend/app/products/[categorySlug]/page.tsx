CategoryPage
import { getProductsByCategorySlug } from "@/lib/getProducts";
import Container from "@/components/layout/Container";
import HomeBanner from "@/components/common/HomeBanner";
import { fetchBannerBySlug } from "@/lib/getBannerData";
import Pagination from "@/components/common/Pagination";
import ProductByCategory from "@/components/common/ProductByCategory";
const banner = await fetchBannerBySlug("products");

export default async function CategoryPage({ params, searchParams }: any) {
  const { categorySlug } = await params;
     const page = Number(searchParams?.page) || 1; 
  const data = await getProductsByCategorySlug(
    categorySlug,
  );
  const products = data;
    return (
    <>
      {/* <HomeBanner slug={banner} /> */}
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
