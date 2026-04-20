// Required for Next.js static export (output: export)
export async function generateStaticParams() {
  return [];
}
import HomeBanner from "@/components/common/HomeBanner";
import ProductCategories from "@/components/home/ProductCategories";
import Container from "@/components/layout/Container";
import { fetchBannerBySlug } from "@/lib/getBannerData";


export default async function Page({ searchParams }: any) {
  const banner = await fetchBannerBySlug(150);
  const pageNumber = Number(searchParams?.page) || 1;

  return (
    <>
      <HomeBanner slug={banner}/> 
      <Container className="pt-14">
        <div>
          <ProductCategories page={pageNumber} />
        </div>
      </Container>
    </>
  );
}
