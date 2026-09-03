// Required for Next.js static export (output: export)
export async function generateStaticParams() {
  return [];
}

import { Suspense } from "react";

import HomeBanner from "@/components/common/HomeBanner";
import ProductCategories from "@/components/home/ProductCategories";
import Container from "@/components/layout/Container";
import { fetchBannerBySlug } from "@/lib/getBannerData";
import { getCategories } from "@/lib/getCategories";

export default async function Page() {
  const banner = await fetchBannerBySlug(150);
  const categories = await getCategories();

  return (
    <>
      <HomeBanner slug={banner} />

      <Container className="pt-14">
        <Suspense fallback={<div>Loading...</div>}>
          <ProductCategories categories={categories} />
        </Suspense>
      </Container>
    </>
  );
}
