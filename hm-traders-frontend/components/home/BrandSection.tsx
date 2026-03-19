import {getBrands} from "@/lib/getBrands";
import Container from "../layout/Container";
export default async function BrandSection() {
    const brands = await getBrands();
    return (
      
  <div className="brand-section">
  <h1 className="brand-title">Supplier For</h1>
<Container>
  <div className="brand-logos">
    {brands?.map((brand: any) => (
      <div key={brand.id} className="brand-card">

        {brand?.logo?.url && (
          <img
            src={`http://localhost:3000${brand.logo.url}`}
            alt={brand.logo.alt || brand.name}
            className="brand-logo"
          />
        )}

        <h3 className="brand-name">{brand.name}</h3>

        {brand?.catalogPdf?.url && (
          <a
            href={`http://localhost:3000${brand.catalogPdf.url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="catalog-btn"
          >
            Download Catalog
          </a>
        )}
      </div>
    ))}
  </div>
  </Container>
</div>
    );
}