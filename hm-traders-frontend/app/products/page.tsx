import HomeBanner from "@/components/common/HomeBanner";
import ProductCategories from "@/components/home/ProductCategories";
import Container from "@/components/layout/Container";
import { fetchBannerBySlug } from "@/lib/getBannerData";

export default async function Page({ searchParams }: any) {
  const banner = await fetchBannerBySlug("productsCategory");
  const params = await searchParams;

  const pageNumber = Number(params?.page) || 1;

  return (
    <>
      <HomeBanner slug={banner}/> 
      <Container>
        <div>
          <ProductCategories page={pageNumber} />
        </div>
      </Container>
    </>
  );
}
