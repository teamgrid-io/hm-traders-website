import {getBrands} from "@/lib/getBrands";

export default async function BrandSection() {
    const brands = await getBrands();
    console.log("Fetched brands in BrandSection:", brands);
    return (
  <div className="brand-section">
  <h2 className="brand-title">Our Brands</h2>

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
</div>
    );
}