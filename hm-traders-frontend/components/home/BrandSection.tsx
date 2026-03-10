import {getBrands} from "@/lib/getBrands";

export default async function BrandSection() {
    const brands = await getBrands();
    return (
        <div className="brand-section">
            <h2>Our Brands</h2>
            <div className="brand-logos">
                {brands?.docs?.map((brand: any) => (
                    <div key={brand.name} className="brand-logo">
                        <img src={brand.logo?.url} alt={brand.name} />
                    </div>
                ))}
            </div>
        </div>
    );
}