import { getBrands } from "../../lib/getBrands";
export default async function Home() {
  const brands = await getBrands();
  console.log("Page brands:", brands);

  return (
    <div>
      <h1>Brands</h1>

      {brands.map((brand: any) => (
        <div key={brand.id}>
          <h1>{brand.name}</h1>
          {/* <h2>{brand.logo}</h2>
          <p>{brand.catalogPdf}</p> */}
        </div>
      ))}
    </div>
  );
}
