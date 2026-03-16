import ProductCategories from "@/components/home/ProductCategories";
import Container from "@/components/layout/Container";

export default async function Page({ searchParams }: any) {

  const params = await searchParams;

  const pageNumber = Number(params?.page) || 1;

  console.log("Current page number:", pageNumber);

  return (
    <Container>
      <div className="py-8">
        <ProductCategories page={pageNumber} />
      </div>
    </Container>
  );
}