
import Link from "next/link";
import Image from "next/image";
import { getEcatalogues } from "@/lib/getEcatalogue";
import { getBrands } from "@/lib/getBrands";
import { constructMediaUrl } from "@/lib/constructMediaUrl";

interface Ecatalogue {
  id: string;
  title: string;
  description?: string;
  coverImage?: { url?: string };
  catalogueFile?: { url?: string };
}

interface Brand {
  name: string;
  catalogPdf?: { url?: string };
}

type CataloguePdfMap = Record<string, string>;

export default async function Ecatalogue() {
  const ecatalogues: Ecatalogue[] = await getEcatalogues();
  const brands: Brand[] = await getBrands();

  // Create a map of catalogue PDFs from brands
  const cataloguePdfMap: CataloguePdfMap = brands.reduce((acc, brand) => {
    if (brand.catalogPdf?.url) {
      // Check if the URL has PDF extension
      const url = constructMediaUrl(brand.catalogPdf.url);

      if (url && url.toLowerCase().endsWith(".pdf")) {
        acc[brand.name] = url;
      }
    }
    return acc;
  }, {} as CataloguePdfMap);

  if (!ecatalogues || ecatalogues.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
          Our E-Catalogues
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Explore our comprehensive digital catalogues
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {ecatalogues?.map((eCat) => {
            const coverImage = eCat.coverImage;

            // Construct proper media URLs
            const imageUrl = constructMediaUrl(coverImage?.url);

            // Get catalogue file URL if available
            const catalogueFileUrl = constructMediaUrl(eCat.catalogueFile?.url);

            return (
              <div
                key={eCat.id}
                className="relative rounded-lg overflow-hidden group bg-white shadow-lg hover:shadow-xl transition-shadow"
              >
                {/* IMAGE */}
                <div className="relative w-full h-[280px]">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={eCat.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    // Fallback placeholder
                    <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <span className="text-gray-500 text-center px-4">
                        {eCat.title}
                      </span>
                    </div>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    {eCat.title}
                  </h3>
                  {eCat.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {eCat.description}
                    </p>
                  )}

                  {/* ACTION BUTTON */}
                  {catalogueFileUrl &&
                    catalogueFileUrl.toLowerCase().endsWith(".pdf") && (
                      <a
                        href={catalogueFileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block bg-[#f5a623] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#e09112] transition-colors text-center w-full"
                      >
                        View Catalogue PDF
                      </a>
                    )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
