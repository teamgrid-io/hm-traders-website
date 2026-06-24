// Required for Next.js static export (output: export)
export async function generateStaticParams() {
  return [];
}
import { Suspense } from "react";

import HomeBanner from "@/components/common/HomeBanner";
import ProductCategories from "@/components/home/ProductCategories";
import Container from "@/components/layout/Container";
import { fetchBannerBySlug } from "@/lib/getBannerData";


export default async function Page({ searchParams }: any) {
  const banner = await fetchBannerBySlug(150);
  

  return (
    <>
      <HomeBanner slug={banner}/> 
      <Container className="pt-14">
          <Suspense fallback={<div>Loading...</div>}>
          <ProductCategories  />
        </Suspense>
      </Container>
    </>
  );
}
