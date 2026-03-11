import ProductCategories from "@/components/home/ProductCategories";
import Container from "@/components/layout/Container";
const page = () => {
  return (
    <Container >
        <div className="py-8">
      <ProductCategories />
      </div>
    </Container>
  )
}

export default page